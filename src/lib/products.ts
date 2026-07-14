export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Kitchen" | "Home" | "Outdoor" | "Stationery" | "Clothing" | "Furniture";
  tagline: string;
  description: string;
  details: string[];
  emoji: string;
  tile: { from: string; to: string };
  /** Structured spec sheet — fabric, color, finish, dimensions, care, etc. */
  attributes?: { label: string; value: string }[];
  /** Sizing chart for apparel */
  sizing?: {
    note?: string;
    columns: string[];
    rows: string[][];
  };
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
  {
    id: "harbor-flannel-overshirt",
    name: "Harbor Flannel Overshirt",
    price: 128,
    category: "Clothing",
    tagline: "A shirt-jacket for the eight months of almost-cold.",
    description:
      "An overshirt cut from heavyweight Portuguese cotton flannel, brushed on both faces until it feels like a blanket you're allowed to wear to dinner. The ember-plaid pattern is yarn-dyed, so the color runs through the cloth rather than sitting on it — it fades the way denim does, not the way prints do. Cut roomy enough to layer over a heavy hoodie, structured enough to wear over a tee without looking borrowed. Corozo-nut buttons, double-needle felled seams, and two chest pockets that actually fit a phone and a notebook.",
    details: [
      "Heavyweight 11 oz Portuguese cotton flannel",
      "Yarn-dyed ember plaid — fades, never peels",
      "Corozo-nut buttons, felled seams",
      "Two chest pockets + two hidden side-seam pockets",
    ],
    emoji: "👔",
    tile: { from: "#7a3327", to: "#a85438" },
    attributes: [
      { label: "Fabric", value: "100% long-staple Portuguese cotton flannel, 11 oz/yd²" },
      { label: "Color", value: "Ember plaid — rust red and charcoal check on an oat ground" },
      { label: "Texture", value: "Double-brushed on both faces; dense, blanket-soft nap with visible twill diagonal" },
      { label: "Weave", value: "3/1 twill, yarn-dyed before weaving" },
      { label: "Fit", value: "Relaxed overshirt fit — order true size to layer over a tee, size down for a trim fit" },
      { label: "Weight & drape", value: "Heavy with structure; holds its shape at the collar and hem rather than draping" },
      { label: "Closures", value: "7 corozo-nut buttons, cross-stitched" },
      { label: "Pockets", value: "2 buttoned chest pockets, 2 hidden side-seam pockets" },
      { label: "Season", value: "Three-season layer: 40–65°F on its own, colder under a shell" },
      { label: "Care", value: "Machine wash cold with like colors, line dry; warm iron if you must. Expect ~2% shrink on first wash" },
      { label: "Origin", value: "Woven in Guimarães, Portugal; sewn in Porto" },
    ],
    sizing: {
      note: "Garment measurements, taken flat, in inches. Between sizes? Size up — it's meant to layer.",
      columns: ["Size", "Chest", "Body length", "Sleeve", "Shoulder"],
      rows: [
        ["S", "42", "28", "33.5", "18"],
        ["M", "44", "29", "34.5", "18.75"],
        ["L", "46", "30", "35.5", "19.5"],
        ["XL", "49", "31", "36.5", "20.5"],
        ["XXL", "52", "32", "37.5", "21.5"],
      ],
    },
  },
  {
    id: "meridian-merino-crew",
    name: "Meridian Merino Crew",
    price: 145,
    category: "Clothing",
    tagline: "One sweater from September to April.",
    description:
      "A crewneck knit from 18.5-micron extra-fine merino spun in Biella, Italy — fine enough to wear against bare skin, warm enough to replace a jacket in shoulder season. The moss-heather color is melange-spun from three fiber shades, so it reads as a solid across the room and shows depth up close. Fully-fashioned knitting means the sleeves and body are shaped on the machine, not cut and sewn, so there are no bulky seams at the shoulder. It regulates temperature the way only merino does: warm on a cold platform, never clammy on a heated train.",
    details: [
      "18.5-micron extra-fine Italian merino",
      "Fully-fashioned — no cut seams, no shoulder bulk",
      "Melange moss-heather, three-shade spun",
      "Naturally odor-resistant; wear it for days",
    ],
    emoji: "🧶",
    tile: { from: "#3d4f38", to: "#66795a" },
    attributes: [
      { label: "Fabric", value: "100% extra-fine merino wool, 18.5 micron, spun in Biella, Italy" },
      { label: "Color", value: "Moss heather — a green-grey melange spun from moss, sage, and slate fibers" },
      { label: "Texture", value: "Smooth 12-gauge jersey knit face; soft with a dry, matte hand — no itch at the neck" },
      { label: "Knit", value: "12-gauge, fully-fashioned (shaped on the machine, linked at the seams)" },
      { label: "Fit", value: "Classic fit with a slightly trimmed waist; true to size" },
      { label: "Weight & drape", value: "Midweight (~380 g in size M); drapes close without clinging" },
      { label: "Collar & cuffs", value: "1×1 ribbed crew collar, cuffs, and hem; collar recovers after stretching" },
      { label: "Performance", value: "Temperature-regulating and naturally odor-resistant — airs out overnight" },
      { label: "Season", value: "September through April as a mid-layer; winter base under a coat" },
      { label: "Care", value: "Hand wash cold or machine wool cycle in a bag; dry flat, never hang wet. De-pill with a comb, not a razor" },
      { label: "Origin", value: "Yarn spun in Biella; knit in Emilia-Romagna, Italy" },
    ],
    sizing: {
      note: "Garment measurements, taken flat, in inches. Knit has natural stretch — for a relaxed fit, go one size up.",
      columns: ["Size", "Chest", "Body length", "Sleeve", "Shoulder"],
      rows: [
        ["XS", "38", "25.5", "32.5", "16.5"],
        ["S", "40", "26.5", "33.5", "17"],
        ["M", "42", "27.5", "34.5", "17.75"],
        ["L", "44", "28.5", "35.5", "18.5"],
        ["XL", "47", "29.5", "36.5", "19.25"],
      ],
    },
  },
  {
    id: "ledger-oak-bookshelf",
    name: "Ledger Oak Bookshelf",
    price: 890,
    category: "Furniture",
    tagline: "Five shelves that will outlast your lease, and the next four.",
    description:
      "A tall open bookshelf in solid quartersawn white oak — no veneer, no particleboard, anywhere. Quartersawing exposes the oak's medullary rays, the silvery flecks that furniture makers have prized for a century, and makes each shelf dramatically more resistant to cupping. Joinery is traditional: shelves join the sides with through-wedged tenons you can see (and admire) from the outside. The hardwax-oil finish is matte, repairable, and safe to touch food to. Ships flat; assembles with a mallet and the included hardwood wedges in about twenty minutes — no cam locks, no allen keys, no regrets.",
    details: [
      "Solid quartersawn white oak throughout",
      "Through-wedged tenon joinery — no metal fasteners",
      "Hardwax-oil finish, repairable at home",
      "Includes wall anchor kit for tip safety",
    ],
    emoji: "📚",
    tile: { from: "#6e4f2f", to: "#9c7a4a" },
    attributes: [
      { label: "Materials", value: "Solid quartersawn American white oak; hardwood wedges in walnut" },
      { label: "Finish", value: "Natural hardwax oil — matte, open-pore; spot-repairable with a supplied touch-up cloth" },
      { label: "Color & grain", value: "Pale straw to light honey; quartersawn ray fleck visible across shelf faces" },
      { label: "Texture", value: "Open-grain satin feel; you can feel the wood, not a plastic film" },
      { label: "Overall dimensions", value: "72\" H × 34\" W × 13\" D" },
      { label: "Shelf clearances", value: "Five bays: 13.5\", 13.5\", 12\", 12\", 10.5\" (bottom to top)" },
      { label: "Load capacity", value: "65 lb per shelf; 300 lb total" },
      { label: "Weight", value: "84 lb assembled" },
      { label: "Assembly", value: "Flat-packed; mallet-driven wedged tenons, ~20 min, one person. No tools beyond the included mallet" },
      { label: "Safety", value: "Anti-tip wall anchor kit included and strongly recommended" },
      { label: "Care", value: "Dust dry; re-oil high-wear spots yearly. Sand out scratches with 320 grit and re-oil" },
      { label: "Origin", value: "Oak from Appalachian forests (FSC-certified); built in Pennsylvania" },
    ],
  },
  {
    id: "haven-lounge-chair",
    name: "Haven Lounge Chair",
    price: 1240,
    category: "Furniture",
    tagline: "The chair the whole house argues over.",
    description:
      "A low-slung lounge chair with a steam-bent ash frame and a deep, feather-wrapped cushion upholstered in bouclé wool. The frame's continuous bent arms are formed from single lengths of white ash — steamed, bent over a form, and left to set for a week — so the grain follows the curve and the arm is far stronger than a cut joint. The bouclé is woven in a heavy loop pile that reads ivory across the room and reveals flecks of oat and grey up close. Sit is reclined and enveloping: a reading posture, not a laptop posture. The seat and back cushions zip off for cleaning, and the whole cover is replaceable — this chair is built to be recovered twice, not landfilled once.",
    details: [
      "Steam-bent solid ash frame, single-piece arms",
      "Feather-wrapped foam cushions, zip-off covers",
      "Heavy wool bouclé upholstery",
      "Designed for recovery — fully replaceable covers",
    ],
    emoji: "🛋️",
    tile: { from: "#8d8578", to: "#bdb3a0" },
    attributes: [
      { label: "Frame", value: "Steam-bent solid white ash, continuous single-piece arms; webbed beech seat platform" },
      { label: "Upholstery", value: "78% wool / 22% polyamide bouclé, 620 g/m² heavy loop pile" },
      { label: "Color", value: "Ivory bouclé with oat and grey flecks; ash frame in a natural matte lacquer" },
      { label: "Texture", value: "Dense, nubby loop pile — soft but dry to the touch; smooth satin frame" },
      { label: "Cushion fill", value: "High-resilience foam core wrapped in duck-feather chambers; sink-in top, supportive base" },
      { label: "Overall dimensions", value: "30\" H × 33\" W × 36\" D" },
      { label: "Seat", value: "Seat height 15.5\", seat depth 23\", arm height 20.5\"" },
      { label: "Recline", value: "Fixed 108° back angle — reading and conversation posture" },
      { label: "Weight & capacity", value: "48 lb; supports up to 350 lb" },
      { label: "Assembly", value: "Arrives assembled; legs thread on in 5 minutes" },
      { label: "Care", value: "Vacuum bouclé weekly with upholstery brush; covers zip off for professional cleaning. Blot spills, never rub" },
      { label: "Durability", value: "Frame guaranteed 10 years; replacement cover sets available in four colorways" },
      { label: "Origin", value: "Frame bent and finished in Denmark; upholstered in Lithuania" },
    ],
  },
];

export const categories = [
  "Kitchen",
  "Home",
  "Outdoor",
  "Stationery",
  "Clothing",
  "Furniture",
] as const;

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
