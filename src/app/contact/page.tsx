import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { getSite } from "@/lib/get-site";
import { whatsappUrlFrom } from "@/lib/site";
import { listProducts, toPublicProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wholesale Inquiry",
  description:
    "Send a wholesale inquiry to SVN PRODUCT. Requests are delivered to INFO.SVNPRODUCT@GMAIL.COM.",
};

type Props = {
  searchParams: Promise<{ product?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { product } = await searchParams;
  const site = await getSite();
  const products = (await listProducts()).map(toPublicProduct);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-6 md:py-16">
      <div>
        <p className="text-xs font-semibold tracking-[0.24em] text-gold uppercase">
          Wholesale partners
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy md:text-5xl">
          Request a quote
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          Tell us what you need. Your inquiry is emailed directly to{" "}
          <a
            className="font-semibold text-navy hover:text-gold"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>

        <div className="mt-8 space-y-4 border border-navy/10 bg-white/70 p-5 text-sm">
          <p>
            <span className="block text-xs tracking-[0.16em] text-gold uppercase">
              Partner
            </span>
            <span className="font-semibold text-navy">{site.partner.name}</span>
            <span className="block text-muted">{site.partner.role}</span>
          </p>
          <p>
            <span className="block text-xs tracking-[0.16em] text-gold uppercase">
              Location
            </span>
            <span className="text-navy">{site.location}</span>
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-navy/20 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-navy uppercase hover:border-gold"
            >
              Email
            </a>
            <a
              href={whatsappUrlFrom(site.whatsapp, site.email)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-navy/20 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-navy uppercase hover:border-gold"
            >
              WhatsApp
            </a>
            <Link
              href="/products"
              className="rounded-full border border-navy/20 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-navy uppercase hover:border-gold"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>

      <InquiryForm
        defaultProduct={product}
        products={products}
        email={site.email}
      />
    </div>
  );
}
