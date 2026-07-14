"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-fraunces)] text-2xl font-black tracking-tight"
        >
          Alder<span className="italic text-moss"> Goods</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hidden text-ink-soft hover:text-ink sm:block">
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative rounded-sm border border-ink px-4 py-1.5 font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-xs font-bold text-paper">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
