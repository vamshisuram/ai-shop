import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/header";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alder Goods — Well-made things for everyday life",
  description:
    "A demo general store: kitchen, home, outdoor, and stationery goods built to last.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-sm text-ink-soft">
              <p className="font-[family-name:var(--font-fraunces)] italic">
                Alder Goods — a demo storefront.
              </p>
              <p>No real orders. No real regrets.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
