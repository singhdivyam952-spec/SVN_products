import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { categoryLabels } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const title = product.design
    ? `${product.name} — ${product.design}`
    : product.name;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-navy/10 bg-white/70 shadow-[0_12px_40px_rgba(0,27,61,0.06)] transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_50px_rgba(0,27,61,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
        <Image
          src={product.image}
          alt={title}
          fill
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-navy/8 px-4 py-4">
        <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-gold uppercase">
          {categoryLabels[product.category]}
        </p>
        <h3 className="font-serif text-xl text-navy">{title}</h3>
        <p className="text-xs tracking-wide text-muted uppercase">
          {product.tagline}
        </p>
        <span className="mt-auto pt-3 text-xs font-semibold tracking-[0.14em] text-navy uppercase group-hover:text-gold">
          View packing details →
        </span>
      </div>
    </Link>
  );
}
