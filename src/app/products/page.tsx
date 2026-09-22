import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsCatalog } from "@/components/ProductsCatalog";
import { listProducts, toPublicProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Product Catalog",
  description:
    "Browse LION wall hooks, hangers, tape hooks, Kesari heavy hooks, and kitchen essentials from SVN PRODUCT.",
};

export default async function ProductsPage() {
  const products = (await listProducts()).map(toPublicProduct);

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted">
          Loading catalog…
        </div>
      }
    >
      <ProductsCatalog products={products} />
    </Suspense>
  );
}
