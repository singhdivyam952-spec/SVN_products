import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/get-site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "About",
    description: `About ${site.company} — manufacturers of LION wall hooks and hangers in ${site.location}.`,
  };
}

const values = [
  {
    title: "Built to Last",
    text: "Every LION product is made for daily use — strong materials, reliable finish, lasting performance.",
  },
  {
    title: "Wholesale Ready",
    text: "Clear retail cards and wholesaler packs so dealers can stock, sell, and reorder with confidence.",
  },
  {
    title: "Perfect for Every Space",
    text: "From decorative 1-pin hooks to heavy Kesari racks and kitchen tools — one brand, many needs.",
  },
  {
    title: "Trusted by Households",
    text: "Practical designs families use every day — easy to install, easy to sell, easy to reorder.",
  },
];

const highlights = [
  "Wall hooks & hangers",
  "Tape hooks (no drilling)",
  "Kesari heavy wall hooks",
  "Kitchen essentials",
  "Dealer & wholesaler packing",
  "Ludhiana manufacturing focus",
];

export default async function AboutPage() {
  const site = await getSite();

  return (
    <div>
      <section className="navy-glow border-b border-gold/20 px-4 py-14 text-cream md:px-6 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
              About {site.company}
            </p>
            <h1 className="mt-3 font-serif text-4xl text-gold md:text-5xl">
              Built to last in {site.location}
            </h1>
            <p className="mt-4 font-script text-2xl text-gold/90">
              by {site.brand}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/75 md:text-base">
              {site.company} supplies the {site.brand} range of wall hooks,
              hangers, and household essentials for wholesalers and retailers
              across India.
            </p>
          </div>
          <Image
            src="/brand/logo.png"
            alt={`${site.brand} logo`}
            width={160}
            height={160}
            className="h-32 w-32 object-contain md:h-40 md:w-40"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
            What we stand for
          </p>
          <h2 className="mt-3 font-serif text-3xl text-navy">
            Quality partners can stock with confidence
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((item) => (
            <div
              key={item.title}
              className="border border-navy/10 bg-white/70 p-5"
            >
              <h3 className="font-serif text-xl text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-navy/8 bg-white/50 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
              Our range
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy">
              One brand. Multiple bestsellers.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              From decorative pin hooks to heavy wall racks and kitchen tools,
              the {site.brand} catalogue is built for everyday Indian homes and
              wholesale distribution.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="border border-navy/10 bg-cream/60 px-3 py-2 text-sm text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 border border-navy/10 bg-white/80 p-6 sm:grid-cols-2">
            <div>
              <p className="text-xs tracking-[0.16em] text-gold uppercase">Brand</p>
              <p className="mt-1 font-serif text-2xl text-navy">{site.brand}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-gold uppercase">
                Partner
              </p>
              <p className="mt-1 font-semibold text-navy">{site.partner.name}</p>
              <p className="text-sm text-muted">{site.partner.role}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-gold uppercase">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block text-navy hover:text-gold"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-gold uppercase">
                Location
              </p>
              <p className="mt-1 text-navy">{site.location}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs tracking-[0.16em] text-gold uppercase">Focus</p>
              <p className="mt-1 text-navy">
                Wall hooks, hangers & household essentials
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="navy-glow px-6 py-10 text-cream md:px-10">
          <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
            Wholesale partners
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Ready to stock {site.brand}?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/75">
            Speak with {site.partner.name} for catalogue pricing, packing
            quantities, and dealer support. Inquiries go to {site.email}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-gold px-6 py-3 text-xs font-bold tracking-[0.16em] text-navy-deep uppercase"
            >
              View Catalog
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-gold/60 px-6 py-3 text-xs font-semibold tracking-[0.16em] text-gold uppercase"
            >
              Contact Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
