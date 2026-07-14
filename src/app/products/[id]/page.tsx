import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductTile } from "@/components/product-tile";
import { ProductCard } from "@/components/product-card";
import { AddToCart } from "@/components/add-to-cart";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <nav className="mb-8 text-sm text-ink-soft">
        <Link href="/" className="hover:text-ink hover:underline">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/?category=${product.category}`}
          className="hover:text-ink hover:underline"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="rise group">
          <ProductTile product={product} size="lg" />
        </div>

        <div className="rise" style={{ animationDelay: "100ms" }}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">
            {product.category}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-fraunces)] text-4xl font-black leading-tight tracking-tight md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 font-[family-name:var(--font-fraunces)] text-lg italic text-ink-soft">
            {product.tagline}
          </p>
          <p className="mt-4 text-3xl font-medium tabular-nums">
            ${product.price}
          </p>

          <div className="mt-8">
            <AddToCart productId={product.id} />
          </div>

          <p className="mt-8 leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
            {product.details.map((d) => (
              <li key={d} className="flex items-baseline gap-3">
                <span aria-hidden className="text-moss">
                  —
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {product.attributes && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="mb-6 font-[family-name:var(--font-fraunces)] text-2xl font-black">
            Specifications
          </h2>
          <dl className="grid gap-x-10 md:grid-cols-2">
            {product.attributes.map((a) => (
              <div
                key={a.label}
                className="flex gap-4 border-b border-line py-3 text-sm"
              >
                <dt className="w-36 shrink-0 font-medium uppercase tracking-wide text-ink-soft">
                  {a.label}
                </dt>
                <dd className="leading-relaxed">{a.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {product.sizing && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="mb-2 font-[family-name:var(--font-fraunces)] text-2xl font-black">
            Sizing
          </h2>
          {product.sizing.note && (
            <p className="mb-6 text-sm italic text-ink-soft">
              {product.sizing.note}
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-lg border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  {product.sizing.columns.map((col) => (
                    <th
                      key={col}
                      className="py-2.5 pr-6 font-medium uppercase tracking-wide"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.sizing.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-line">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`py-2.5 pr-6 tabular-nums ${
                          i === 0
                            ? "font-[family-name:var(--font-fraunces)] font-bold"
                            : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-10">
          <h2 className="mb-8 font-[family-name:var(--font-fraunces)] text-2xl font-black">
            More from {product.category}
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
