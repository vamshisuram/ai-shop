"use client";

import { useEffect, useRef, useState } from "react";
import type { MLCEngine } from "@mlc-ai/web-llm";
import type { Product } from "@/lib/products";
import {
  ASSISTANT_MODELS,
  type AssistantModelKey,
  buildSystemPrompt,
  suggestedQuestions,
} from "@/lib/assistant";

type Msg = { role: "user" | "assistant"; content: string };

type Status =
  | { phase: "idle" }
  | { phase: "unsupported" }
  | { phase: "loading"; model: AssistantModelKey; progress: number; text: string }
  | { phase: "ready"; model: AssistantModelKey }
  | { phase: "error"; message: string };

// One engine per page load, swapped when the model changes.
let enginePromise: Promise<MLCEngine> | null = null;
let engineModel: string | null = null;

async function getEngine(
  modelId: string,
  onProgress: (progress: number, text: string) => void
): Promise<MLCEngine> {
  if (enginePromise && engineModel === modelId) return enginePromise;
  const prior = enginePromise;
  engineModel = modelId;
  enginePromise = (async () => {
    if (prior) {
      await (await prior).unload();
    }
    const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
    return CreateMLCEngine(modelId, {
      initProgressCallback: (r) => onProgress(r.progress, r.text),
    });
  })();
  return enginePromise;
}

export function ProductChat({ product }: { product: Product }) {
  const [status, setStatus] = useState<Status>({ phase: "idle" });
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, thinking]);

  const load = async (model: AssistantModelKey) => {
    if (!("gpu" in navigator)) {
      setStatus({ phase: "unsupported" });
      return;
    }
    setStatus({ phase: "loading", model, progress: 0, text: "Starting…" });
    try {
      await getEngine(ASSISTANT_MODELS[model].id, (progress, text) =>
        setStatus({ phase: "loading", model, progress, text })
      );
      setStatus({ phase: "ready", model });
    } catch (err) {
      // Small model failed (low VRAM, network) — surface a retry, not a dead end.
      setStatus({
        phase: "error",
        message: err instanceof Error ? err.message : "Failed to load the model.",
      });
    }
  };

  const ask = async (question: string) => {
    if (status.phase !== "ready" || thinking || !question.trim()) return;
    const history = [...messages, { role: "user" as const, content: question.trim() }];
    setMessages(history);
    setInput("");
    setThinking(true);
    try {
      const engine = await getEngine(ASSISTANT_MODELS[status.model].id, () => {});
      const chunks = await engine.chat.completions.create({
        messages: [
          { role: "system", content: buildSystemPrompt(product) },
          ...history,
        ],
        stream: true,
        temperature: 0.3,
        max_tokens: 256,
      });
      let reply = "";
      setMessages([...history, { role: "assistant", content: "" }]);
      for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta?.content ?? "";
        setMessages([...history, { role: "assistant", content: reply }]);
      }
    } catch (err) {
      setMessages([
        ...history,
        {
          role: "assistant",
          content: `Something went wrong on this device: ${
            err instanceof Error ? err.message : "unknown error"
          }`,
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <section className="mt-10 rounded-sm border border-line bg-paper-deep/50">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-black">
            ✦ Ask Alder
          </h2>
          <p className="text-xs text-ink-soft">
            On-device AI — runs in your browser, nothing leaves this page.
          </p>
        </div>
        {status.phase === "ready" && (
          <ModelBadge current={status.model} onSwitch={load} />
        )}
      </div>

      <div className="px-5 py-4">
        {status.phase === "idle" && (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-ink-soft">
              Load a small AI model to ask about sizing, materials, care, and fit —
              answered from this product&apos;s spec sheet.
            </p>
            <button
              type="button"
              onClick={() => load("small")}
              className="rounded-sm bg-moss px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-moss-deep"
            >
              Load assistant ({ASSISTANT_MODELS.small.downloadSize}, one time)
            </button>
          </div>
        )}

        {status.phase === "unsupported" && (
          <p className="text-sm text-ink-soft">
            Your browser doesn&apos;t support WebGPU, which the on-device assistant
            needs. Try a recent Chrome, Edge, or Safari.
          </p>
        )}

        {status.phase === "loading" && (
          <div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-moss transition-[width] duration-300"
                style={{ width: `${Math.round(status.progress * 100)}%` }}
              />
            </div>
            <p className="mt-2 truncate text-xs text-ink-soft">
              Loading {ASSISTANT_MODELS[status.model].label} — {status.text}
            </p>
          </div>
        )}

        {status.phase === "error" && (
          <div className="text-sm">
            <p className="text-clay">Couldn&apos;t load the model: {status.message}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => load("small")}
                className="rounded-sm border border-ink px-4 py-1.5 text-sm hover:bg-ink hover:text-paper"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={() => load("large")}
                className="rounded-sm border border-line px-4 py-1.5 text-sm text-ink-soft hover:border-ink hover:text-ink"
              >
                Try {ASSISTANT_MODELS.large.label}
              </button>
            </div>
          </div>
        )}

        {status.phase === "ready" && (
          <div>
            {messages.length === 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestedQuestions(product).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-moss hover:text-moss"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.length > 0 && (
              <div
                ref={scrollRef}
                className="mb-3 max-h-80 space-y-3 overflow-y-auto pr-1"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "ml-auto bg-ink text-paper"
                        : "bg-paper border border-line"
                    }`}
                  >
                    {m.content ||
                      (thinking && i === messages.length - 1 ? "…" : "")}
                  </div>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about the ${product.name.toLowerCase()}…`}
                className="flex-1 rounded-sm border border-line bg-paper px-3.5 py-2 text-sm outline-none placeholder:text-ink-soft/60 focus:border-moss"
              />
              <button
                type="submit"
                disabled={thinking || !input.trim()}
                className="rounded-sm bg-moss px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-moss-deep disabled:opacity-40"
              >
                {thinking ? "…" : "Ask"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

function ModelBadge({
  current,
  onSwitch,
}: {
  current: AssistantModelKey;
  onSwitch: (m: AssistantModelKey) => void;
}) {
  const other: AssistantModelKey = current === "small" ? "large" : "small";
  return (
    <div className="text-right text-xs">
      <p className="font-medium">{ASSISTANT_MODELS[current].label}</p>
      <button
        type="button"
        onClick={() => onSwitch(other)}
        className="text-ink-soft underline underline-offset-2 hover:text-moss"
      >
        Switch to {ASSISTANT_MODELS[other].label} ({ASSISTANT_MODELS[other].downloadSize})
      </button>
    </div>
  );
}
