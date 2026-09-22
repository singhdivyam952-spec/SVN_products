"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import {
  categoryLabels,
  type Product,
  type ProductCategory,
} from "@/data/products";

const filters: Array<{ key: "all" | ProductCategory; label: string }> = [
  { key: "all", label: "All Products" },
  ...(Object.entries(categoryLabels) as [ProductCategory, string][]).map(
    ([key, label]) => ({ key, label }),
  ),
];

export function ProductsCatalog({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") || "all") as
    | "all"
    | ProductCategory;

  const list = useMemo(() => {
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [category, products]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
          Digital Catalog 2026
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy md:text-5xl">
          LION Product Range
        </h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Browse wall hooks, hangers, and kitchen essentials with retail and
          wholesale packing details.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = category === f.key;
          const href =
            f.key === "all" ? "/products" : `/products?category=${f.key}`;
          return (
            <Link
              key={f.key}
              href={href}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition ${
                active
                  ? "bg-navy text-cream"
                  : "border border-navy/15 bg-white/70 text-navy hover:border-gold/50"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
