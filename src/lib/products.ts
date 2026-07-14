export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Kitchen" | "Home" | "Outdoor" | "Stationery";
  tagline: string;
  description: string;
  details: string[];
  emoji: string;
  tile: { from: string; to: string };
};

export const products: Product[] = [
  {
    id: "cast-iron-skillet",
    name: "Field Cast-Iron Skillet",
    price: 68,
    category: "Kitchen",
    tagline: "Pre-seasoned, pours clean, outlives you.",
    description:
      "A 10-inch skillet cast in a single pour with a polished cooking face that takes seasoning fast. Even heat from stovetop to campfire, with a helper handle for full-pan lifts.",
    details: ["10\" cooking surface", "Pre-seasoned with flaxseed oil", "Oven safe to 500°F", "Made in a single foundry pour"],
    emoji: "🍳",
    tile: { from: "#3e3a33", to: "#6b5d48" },
  },
  {
    id: "walnut-serving-board",
    name: "Walnut Serving Board",
    price: 54,
    category: "Kitchen",
    tagline: "End-grain walnut, kind to knives.",
    description:
      "An end-grain board glued up from offcuts of American black walnut. Self-healing surface, juice groove on the flip side, and a leather hang loop.",
    details: ["End-grain construction", "16\" × 10\" × 1.5\"", "Food-safe mineral oil finish", "Leather hang loop"],
    emoji: "🪵",
    tile: { from: "#5c4433", to: "#8a6a4f" },
  },
  {
    id: "stoneware-mug-set",
    name: "Kiln Stoneware Mugs, Set of 4",
    price: 46,
    category: "Kitchen",
    tagline: "Heavy in the hand, warm past the last sip.",
    description:
      "Wheel-thrown stoneware mugs in a speckled oat glaze. Thick walls keep coffee hot; the unglazed foot rings like a bell when you set them down.",
    details: ["12 oz each", "Speckled oat glaze", "Dishwasher and microwave safe", "Set of four"],
    emoji: "☕",
    tile: { from: "#7a6f5d", to: "#a89a80" },
  },
  {
    id: "copper-pour-over",
    name: "Copper Pour-Over Kettle",
    price: 89,
    category: "Kitchen",
    tagline: "A gooseneck that pours like handwriting.",
    description:
      "Hammered copper kettle with a precision gooseneck spout for slow, even pour-overs. The patina deepens with every brew.",
    details: ["900 ml capacity", "Hammered copper body", "Gas and induction compatible", "Develops natural patina"],
    emoji: "🫖",
    tile: { from: "#8a4a2c", to: "#c4622d" },
  },
  {
    id: "wool-throw-blanket",
    name: "Highland Wool Throw",
    price: 120,
    category: "Home",
    tagline: "Loomed heavy, herringbone weave.",
    description:
      "A full-weight throw loomed from undyed highland wool in a herringbone pattern. Substantial enough for a porch in October, handsome enough for the back of the good chair.",
    details: ["100% highland wool", "55\" × 78\"", "Undyed natural fleece tones", "Fringed ends"],
    emoji: "🧣",
    tile: { from: "#4a4438", to: "#7d7466" },
  },
  {
    id: "beeswax-taper-candles",
    name: "Beeswax Taper Candles, Pair",
    price: 22,
    category: "Home",
    tagline: "Slow-burning, honey-scented light.",
    description:
      "Hand-dipped tapers of pure beeswax from a single apiary. They burn bright and nearly dripless for eight hours, with a faint honey scent.",
    details: ["Pure filtered beeswax", "10\" tapers, pair", "~8 hour burn each", "Cotton wicks"],
    emoji: "🕯️",
    tile: { from: "#9a7b2d", to: "#d4a936" },
  },
  {
    id: "ceramic-planter",
    name: "Terrace Ceramic Planter",
    price: 38,
    category: "Home",
    tagline: "Drains right, ages better.",
    description:
      "A high-fired planter with a matte moss glaze, integrated drainage, and a matching saucer. Sized for herbs on a sill or a fern that means business.",
    details: ["7\" diameter", "Integrated drainage + saucer", "Matte moss glaze", "Frost-resistant stoneware"],
    emoji: "🪴",
    tile: { from: "#2c4530", to: "#3e5c41" },
  },
  {
    id: "linen-apron",
    name: "Workshop Linen Apron",
    price: 64,
    category: "Home",
    tagline: "Cross-back straps, no neck strain.",
    description:
      "Stonewashed European linen apron with cross-back straps that put the weight on your shoulders, not your neck. Three pockets sized for tools, pens, and a phone you'll forget is there.",
    details: ["Stonewashed European linen", "Cross-back strap design", "Three front pockets", "One size, adjustable"],
    emoji: "🧵",
    tile: { from: "#5d5a4e", to: "#8f8a76" },
  },
  {
    id: "enamel-camp-set",
    name: "Enamel Camp Dinnerware Set",
    price: 58,
    category: "Outdoor",
    tagline: "Rim-rolled steel, campfire-proof.",
    description:
      "Classic enamelware for two: plates, bowls, and mugs in cream with a moss rim. Goes from open flame to river-rinse without complaint.",
    details: ["Service for two", "Porcelain enamel on steel", "Open-fire safe", "Nests for packing"],
    emoji: "🏕️",
    tile: { from: "#3e5c41", to: "#6e8a5e" },
  },
  {
    id: "waxed-canvas-tote",
    name: "Waxed Canvas Field Tote",
    price: 76,
    category: "Outdoor",
    tagline: "Stands open, shrugs off rain.",
    description:
      "A stiff-bottomed tote in waxed duck canvas that stands open on its own — for the market, the woodpile, or the beach. Copper rivets at every stress point.",
    details: ["18 oz waxed duck canvas", "Copper-riveted seams", "Interior slip pocket", "Stands upright when empty"],
    emoji: "🧺",
    tile: { from: "#6b5d3a", to: "#96854f" },
  },
  {
    id: "brass-pocket-knife",
    name: "Brass Friction Folder",
    price: 92,
    category: "Outdoor",
    tagline: "One blade, no springs, all patina.",
    description:
      "A simple friction-folding knife with a brass handle and a high-carbon blade that takes a wicked edge. No springs, no locks — just a tool that gets better looking with use.",
    details: ["High-carbon steel blade", "Solid brass scales", "2.75\" blade length", "Leather slip included"],
    emoji: "🔪",
    tile: { from: "#8a6a2c", to: "#b8963e" },
  },
  {
    id: "field-notebook-trio",
    name: "Surveyor Notebooks, Trio",
    price: 18,
    category: "Stationery",
    tagline: "Graph, ruled, blank — pick your poison.",
    description:
      "Three pocket notebooks with waxed kraft covers and stitched spines: one graph, one ruled, one blank. Paper that takes fountain pen without bleed.",
    details: ["3.5\" × 5.5\", 48 pages each", "Fountain-pen friendly paper", "Stitched binding", "Waxed kraft covers"],
    emoji: "📓",
    tile: { from: "#57503f", to: "#7d7460" },
  },
];

export const categories = ["Kitchen", "Home", "Outdoor", "Stationery"] as const;

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
