"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { ProductTile } from "@/components/product-tile";

export function CartView() {
  const { items, setQty, remove, clear, subtotal } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  if (items.length === 0) {
    return (
      <div className="rise mt-10 border-t border-line pt-10 text-center">
        <p className="font-[family-name:var(--font-fraunces)] text-2xl italic text-ink-soft">
          Nothing here yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-sm bg-moss px-6 py-2.5 font-medium text-paper transition-colors hover:bg-moss-deep"
        >
          Browse the goods
        </Link>
      </div>
    );
  }

  return (
    <div className="rise mt-8" style={{ animationDelay: "80ms" }}>
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <li key={item.productId} className="flex gap-5 py-5">
              <Link href={`/products/${product.id}`} className="group w-24 shrink-0">
                <ProductTile product={product} />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-baseline justify-between gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-[family-name:var(--font-fraunces)] text-lg hover:underline"
                  >
                    {product.name}
                  </Link>
                  <span className="font-medium tabular-nums">
                    ${product.price * item.qty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-sm border border-line text-sm">
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => setQty(item.productId, item.qty - 1)}
                      className="px-3 py-1.5 hover:bg-paper-deep"
                    >
                      −
                    </button>
                    <span className="min-w-7 text-center tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => setQty(item.productId, item.qty + 1)}
                      className="px-3 py-1.5 hover:bg-paper-deep"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.productId)}
                    className="text-sm text-ink-soft underline-offset-4 hover:text-clay hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-baseline justify-between">
        <button
          type="button"
          onClick={clear}
          className="text-sm text-ink-soft underline-offset-4 hover:text-clay hover:underline"
        >
          Clear cart
        </button>
        <p className="text-lg">
          Subtotal{" "}
          <span className="ml-2 font-[family-name:var(--font-fraunces)] text-2xl font-black tabular-nums">
            ${subtotal}
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCheckedOut(true)}
        className="mt-6 w-full rounded-sm bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-moss-deep"
      >
        Checkout
      </button>
      <p className="mt-3 text-center text-sm text-ink-soft">
        {checkedOut
          ? "This is a demo storefront — checkout is where the AI feature goes next."
          : "Demo store — no payment is taken, no goods will ship."}
      </p>
    </div>
  );
}
