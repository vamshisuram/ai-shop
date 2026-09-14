/**
 * Drives the real "Ask Alder" UI in a browser (WebGPU required) against the golden
 * question set and reports pass/fail. Needs `npm run dev` running first.
 *
 * Usage: npm run eval:assistant [-- --base-url http://localhost:3000]
 */
import { chromium } from "playwright";
import { goldenCases, looksLikeDecline } from "../src/lib/assistant.golden";

const baseUrl = process.argv.includes("--base-url")
  ? process.argv[process.argv.indexOf("--base-url") + 1]
  : "http://localhost:3000";

async function main() {
  const res = await fetch(baseUrl).catch(() => null);
  if (!res || !res.ok) {
    console.error(`Dev server not reachable at ${baseUrl}. Run \`npm run dev\` first.`);
    process.exit(1);
  }

  // Headless Chromium gets no real WebGPU adapter on macOS; run headed unless forced.
  const browser = await chromium.launch({
    headless: process.env.HEADLESS === "1",
    args: ["--enable-unsafe-webgpu", "--enable-features=Vulkan"],
  });
  const page = await browser.newPage();

  let pass = 0;
  let fail = 0;
  let lastProductId: string | null = null;

  for (const testCase of goldenCases) {
    if (testCase.productId !== lastProductId) {
      await page.goto(`${baseUrl}/products/${testCase.productId}`);
      await page.getByRole("button", { name: /load assistant/i }).click();
      // The load button unmounts the moment loading starts, so waiting for it to
      // hide proves nothing — wait for the input that only exists once ready, and
      // race it against the two phases that never get there.
      const ready = page.getByPlaceholder(/ask about/i);
      const broke = page.getByText(/doesn.t support WebGPU|Couldn.t load the model/i);
      await Promise.race([
        ready.waitFor({ timeout: 300_000 }),
        broke.waitFor({ timeout: 300_000 }),
      ]);
      if (await broke.isVisible()) {
        console.error(`Assistant never loaded: ${await broke.innerText()}`);
        await browser.close();
        process.exit(1);
      }
      lastProductId = testCase.productId;
    }

    const input = page.getByPlaceholder(/ask about/i);
    await input.fill(testCase.question);
    await input.press("Enter");

    const askButton = page.getByRole("button", { name: /^ask$/i });
    await askButton.waitFor({ state: "visible", timeout: 60_000 }); // re-enabled once reply finishes

    const bubbles = page.locator(".max-w-\\[85\\%\\]");
    const reply = (await bubbles.last().innerText()).trim();

    const ok = testCase.expectDecline
      ? looksLikeDecline(reply)
      : (testCase.mustIncludeAny ?? []).some((needle) =>
          reply.toLowerCase().includes(needle.toLowerCase())
        );

    console.log(`${ok ? "PASS" : "FAIL"}  [${testCase.productId}] ${testCase.question}`);
    if (!ok) {
      console.log(`      reply: ${reply.slice(0, 200)}`);
      fail++;
    } else {
      pass++;
    }
  }

  await browser.close();
  console.log(`\n${pass} passed, ${fail} failed, ${goldenCases.length} total`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
