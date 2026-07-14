import Image from "next/image";
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
      {product.image ? (
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={size === "lg" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
          priority={size === "lg"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
