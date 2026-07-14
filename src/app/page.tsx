import Link from "next/link";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = categories.find((c) => c === category);
  const shown = active ? products.filter((p) => p.category === active) : products;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="border-b border-line py-14 md:py-20">
        <p className="rise text-sm font-medium uppercase tracking-[0.2em] text-clay">
          Est. today · Ships never · Demo always
        </p>
        <h1
          className="rise mt-4 max-w-3xl font-[family-name:var(--font-fraunces)] text-5xl font-black leading-[1.05] tracking-tight md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Well-made things for <span className="italic text-moss">everyday</span> life.
        </h1>
        <p
          className="rise mt-5 max-w-xl text-lg text-ink-soft"
          style={{ animationDelay: "160ms" }}
        >
          Kitchen, home, outdoor, and stationery goods that earn their keep —
          picked for the demo shelf of Alder Goods.
        </p>
      </section>

      <section className="py-10">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !active
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            All goods
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/?category=${c}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === c
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
