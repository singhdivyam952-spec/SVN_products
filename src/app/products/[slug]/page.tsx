import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PackingDetails } from "@/components/PackingDetails";
import { TrustStrip } from "@/components/TrustStrip";
import { categoryLabels } from "@/data/products";
import { getSite } from "@/lib/get-site";
import { whatsappUrlFrom } from "@/lib/site";
import {
  getProductBySlug,
  toPublicProduct,
} from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  const title = product.design
    ? `${product.name} — ${product.design}`
    : product.name;
  return {
    title,
    description: `${title}. ${product.tagline}. Wholesale packing available from SVN PRODUCT.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const raw = await getProductBySlug(slug);
  if (!raw) notFound();
  const product = toPublicProduct(raw);
  const site = await getSite();

  const title = product.design
    ? `${product.name} — ${product.design}`
    : product.name;

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
        <div className="relative aspect-square overflow-hidden border border-navy/10 bg-white/80">
          <Image
            src={product.image}
            alt={title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {categoryLabels[product.category] || product.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-navy md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm font-semibold tracking-[0.08em] text-gold uppercase">
            Premium Quality
          </p>
          <span className="pill mt-4">{product.tagline}</span>

          {product.weightCapacity ? (
            <p className="mt-6 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-navy">
              <span className="font-semibold">Weight capacity: </span>
              {product.weightCapacity}
            </p>
          ) : null}

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {product.features.map((f) => (
              <li
                key={f}
                className="border border-navy/10 bg-white/60 px-3 py-3 text-center text-xs font-semibold tracking-[0.08em] text-navy uppercase"
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?product=${product.slug}`}
              className="rounded-full bg-navy px-6 py-3 text-xs font-bold tracking-[0.16em] text-cream uppercase transition hover:bg-navy-soft"
            >
              Request Quote
            </Link>
            <a
              href={whatsappUrlFrom(
                site.whatsapp,
                site.email,
                `Hello SVN PRODUCT, I am interested in wholesale pricing for ${title}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-navy/30 px-6 py-3 text-xs font-semibold tracking-[0.16em] text-navy uppercase transition hover:border-gold hover:text-gold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <PackingDetails packing={product.packing} />
      </div>

      <TrustStrip />
    </>
  );
}
