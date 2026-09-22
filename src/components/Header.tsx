"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Inquiry" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-navy-deep/95 text-cream backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt={`${siteConfig.brand} logo`}
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl tracking-wide text-gold transition group-hover:text-gold-bright md:text-2xl">
              {siteConfig.brand}
            </span>
            <span className="hidden text-[0.65rem] uppercase tracking-[0.2em] text-cream/70 sm:inline">
              by {siteConfig.company}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-[0.14em] transition ${
                  active ? "text-gold" : "text-cream/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-navy-deep md:inline-flex"
        >
          Request Quote
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-gold/40 text-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-gold/20 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.14em] text-cream/90"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-gold/50 px-4 py-2 text-center text-xs uppercase tracking-[0.16em] text-gold"
            >
              Request Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
