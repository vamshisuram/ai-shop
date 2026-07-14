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
    `You are answering questions about ONE product. Be helpful, brief, and concrete.`,
    `Answer ONLY from the product information below. If the answer is not in the product information, say you don't know and suggest checking with the shop.`,
    `Do not invent measurements, materials, or policies. Keep answers to a few sentences.`,
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
