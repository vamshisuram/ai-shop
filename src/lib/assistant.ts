import type { Product } from "@/lib/products";

export const ASSISTANT_MODELS = {
  small: {
    id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
    label: "Quick (Qwen 0.5B)",
    downloadSize: "~500 MB",
  },
  large: {
    id: "gemma-2-2b-it-q4f16_1-MLC",
    label: "Sharper (Gemma 2 2B)",
    downloadSize: "~1.9 GB",
  },
} as const;

export type AssistantModelKey = keyof typeof ASSISTANT_MODELS;

/** Flatten a product's full spec sheet into grounding context for the model. */
export function buildSystemPrompt(product: Product): string {
  const lines: string[] = [
    `You are Alder, the shop assistant for Alder Goods, a small general store.`,
    `You answer questions about ONE product, using only the information below.`,
    `Answer from these facts alone. Never guess a number, material, or measurement.`,
    ``,
    `PRODUCT INFORMATION`,
    `Name: ${product.name}`,
    `Price: $${product.price}`,
    `Category: ${product.category}`,
    `Tagline: ${product.tagline}`,
    `Description: ${product.description}`,
    `Highlights: ${product.details.join("; ")}`,
  ];

  if (product.attributes) {
    lines.push(``, `SPECIFICATIONS`);
    for (const a of product.attributes) {
      lines.push(`${a.label}: ${a.value}`);
    }
  }

  if (product.sizing) {
    lines.push(``, `SIZING CHART (${product.sizing.note ?? "measurements"})`);
    lines.push(product.sizing.columns.join(" | "));
    for (const row of product.sizing.rows) {
      lines.push(row.join(" | "));
    }
  }

  // Rules go after the data, not above it: attention favors the end of the prompt,
  // so an instruction sitting on top of a wall of specs competes with all of it.
  // Measured on Qwen 0.5B at temperature 0 (npm run eval:assistant): this explicit
  // wording scores 8/12, a terser three-line version of the same rules 6/12. Being
  // long-winded here is load-bearing — don't tidy it down without re-running.
  lines.push(
    ``,
    `RULES`,
    `Be helpful, brief, and concrete. Keep answers to a few sentences.`,
    `Every fact you state must appear in PRODUCT INFORMATION above. Never guess or estimate a number, material, or measurement that is not written there.`,
    `The information above is ONLY about this one product. It says nothing about returns, refunds, exchanges, shipping, delivery times, warranties, guarantees, stock, discounts, or other colors, sizes, finishes, or variants.`,
    `If you are asked about any of those, or about anything else not written above, reply with exactly this sentence and nothing more:`,
    `"I don't know — that isn't in this product's details, so it's worth checking with the shop."`
  );

  return lines.join("\n");
}

export function suggestedQuestions(product: Product): string[] {
  if (product.sizing) {
    return [
      "What size should I get if I'm usually a medium?",
      "How do I wash it?",
      "What does the fabric feel like?",
    ];
  }
  if (product.category === "Furniture") {
    return [
      "Will it fit in a small apartment?",
      "How hard is assembly?",
      "How do I clean it?",
    ];
  }
  return [
    "What is it made of?",
    "How do I take care of it?",
    "Is this a good gift?",
  ];
}
