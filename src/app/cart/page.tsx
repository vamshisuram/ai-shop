import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart — Alder Goods",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="rise font-[family-name:var(--font-fraunces)] text-4xl font-black tracking-tight">
        Your cart
      </h1>
      <CartView />
    </div>
  );
}
