"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export function AddToCart({ productId }: { productId: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(productId, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex items-stretch gap-3">
      <div className="flex items-center rounded-sm border border-ink">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 hover:bg-paper-deep"
        >
          −
        </button>
        <span className="min-w-8 text-center tabular-nums">{qty}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 hover:bg-paper-deep"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 rounded-sm bg-moss px-6 py-2 font-medium text-paper transition-colors hover:bg-moss-deep"
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}
