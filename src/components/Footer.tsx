import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/30 bg-navy-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt={`${siteConfig.brand} logo`}
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="font-serif text-3xl text-gold">{siteConfig.brand}</p>
              <p className="font-script text-lg text-gold/90">
                by {siteConfig.company}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-cream/70">— {siteConfig.location} —</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
            {siteConfig.tagline}. Premium wall hooks, hangers & household
            essentials for wholesale partners.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/products" className="hover:text-gold">
                Digital Catalog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold">
                About SVN PRODUCT
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                Wholesale Inquiry
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>{siteConfig.partner.name}</li>
            <li className="text-cream/60">{siteConfig.partner.role}</li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-gold hover:text-gold-bright"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                WhatsApp Inquiry
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/20 bg-gold px-4 py-3 text-center text-sm font-semibold tracking-wide text-navy-deep">
        {siteConfig.tagline}
      </div>
    </footer>
  );
}
