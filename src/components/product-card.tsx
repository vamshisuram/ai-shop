import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductTile } from "@/components/product-tile";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="rise group block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <ProductTile product={product} />
      <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3">
        <div>
          <h3 className="font-[family-name:var(--font-fraunces)] text-lg leading-snug group-hover:underline group-hover:decoration-clay group-hover:underline-offset-4">
            {product.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-medium tabular-nums">${product.price}</span>
      </div>
    </Link>
  );
}
