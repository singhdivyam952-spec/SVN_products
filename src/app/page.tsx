import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { TrustStrip } from "@/components/TrustStrip";
import { categoryLabels, type ProductCategory } from "@/data/products";
import { getSite } from "@/lib/get-site";
import { listProducts, toPublicProduct } from "@/lib/store";

const categories = Object.entries(categoryLabels) as [
  ProductCategory,
  string,
][];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const site = await getSite();
  const featured = (await listProducts({ featuredOnly: true })).map(
    toPublicProduct,
  );

  return (
    <>
      <Hero
        brand={site.brand}
        company={site.company}
        subtitle={site.subtitle}
        catalogueYear={site.catalogueYear}
        location={site.location}
      />
      <TrustStrip />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
            Perfect for every space
          </p>
          <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl">
            Wholesale catalog categories
          </h2>
          <p className="mt-3 text-sm text-muted md:text-base">
            Browse LION hooks, hangers, and kitchen essentials — packing details
            ready for dealers and distributors.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(([key, label], i) => (
            <Link
              key={key}
              href={`/products?category=${key}`}
              className="product-rise border border-navy/10 bg-white/70 px-4 py-6 text-center transition hover:border-gold/50 hover:shadow-lg"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="font-serif text-lg text-navy">{label}</p>
              <p className="mt-2 text-[0.65rem] tracking-[0.16em] text-gold uppercase">
                View range
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-navy/8 bg-white/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
                Featured
              </p>
              <h2 className="mt-2 font-serif text-3xl text-navy">
                Catalogue highlights
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold tracking-[0.16em] text-navy uppercase hover:text-gold"
            >
              View full catalog →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="navy-glow px-4 py-16 text-cream md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-script text-3xl text-gold">by {site.company}</p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">
            Ready for wholesale partnership
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/75 md:text-base">
            Send your requirements to Our management team.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-gold px-8 py-3 text-xs font-bold tracking-[0.18em] text-navy-deep uppercase transition hover:bg-gold-bright"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
