import type { Product } from "@/lib/products";

export function ProductTile({
  product,
  size = "md",
}: {
  product: Product;
  size?: "md" | "lg";
}) {
  return (
    <div
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm"
      style={{
        background: `linear-gradient(145deg, ${product.tile.from}, ${product.tile.to})`,
      }}
    >
      <span
        aria-hidden
        className={`select-none drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${
          size === "lg" ? "text-8xl md:text-9xl" : "text-6xl"
        }`}
      >
        {product.emoji}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-2 font-[family-name:var(--font-fraunces)] text-8xl font-black italic leading-none text-white/10"
      >
        {product.name.charAt(0)}
      </span>
    </div>
  );
}
