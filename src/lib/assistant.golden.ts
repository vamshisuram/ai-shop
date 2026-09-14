/**
 * Golden questions for the on-device "Ask Alder" assistant.
 *
 * Each case is graded against the model's actual reply text:
 * - `mustIncludeAny`: grounded facts — the reply should mention at least one of these.
 * - `expectDecline`: out-of-scope questions — the reply should decline rather than invent an answer.
 *
 * Run with `npm run eval:assistant` (needs a running `npm run dev` and a WebGPU-capable browser).
 */
export type GoldenCase = {
  productId: string;
  question: string;
  mustIncludeAny?: string[];
  expectDecline?: boolean;
};

const DECLINE_PHRASES = [
  "don't know",
  "do not know",
  "not sure",
  "not specified",
  "no information",
  "doesn't say",
  "does not say",
  "check with the shop",
  "not mentioned",
  "not listed",
];

export function looksLikeDecline(reply: string): boolean {
  const lower = reply.toLowerCase();
  return DECLINE_PHRASES.some((phrase) => lower.includes(phrase));
}

export const goldenCases: GoldenCase[] = [
  // Grounded facts — should answer from the spec sheet.
  {
    productId: "cast-iron-skillet",
    question: "What temperature is it oven safe to?",
    mustIncludeAny: ["500"],
  },
  {
    productId: "cast-iron-skillet",
    question: "What size is the cooking surface?",
    mustIncludeAny: ["10"],
  },
  {
    productId: "meridian-merino-crew",
    question: "How do I wash it?",
    mustIncludeAny: ["hand wash", "wool cycle", "dry flat"],
  },
  {
    productId: "meridian-merino-crew",
    question: "What's it made of?",
    mustIncludeAny: ["merino"],
  },
  {
    productId: "harbor-flannel-overshirt",
    question: "I usually wear a large, what size should I get?",
    mustIncludeAny: ["l", "46", "large"],
  },
  {
    productId: "harbor-flannel-overshirt",
    question: "What are the buttons made of?",
    mustIncludeAny: ["corozo"],
  },
  {
    productId: "ledger-oak-bookshelf",
    question: "How much weight can each shelf hold?",
    mustIncludeAny: ["65"],
  },
  {
    productId: "ledger-oak-bookshelf",
    question: "How long does assembly take?",
    mustIncludeAny: ["20 min", "twenty min"],
  },

  // Out-of-scope — nothing in the spec sheet covers these, so the model should decline
  // rather than invent a policy or number.
  {
    productId: "cast-iron-skillet",
    question: "What's your return policy if I don't like it?",
    expectDecline: true,
  },
  {
    productId: "meridian-merino-crew",
    question: "How long is the warranty?",
    expectDecline: true,
  },
  {
    productId: "harbor-flannel-overshirt",
    question: "How many days does shipping take?",
    expectDecline: true,
  },
  {
    productId: "ledger-oak-bookshelf",
    question: "Can I get this in a walnut finish instead?",
    expectDecline: true,
  },
];
