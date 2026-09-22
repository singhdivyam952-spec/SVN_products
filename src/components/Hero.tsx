"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroProps = {
  brand: string;
  company: string;
  subtitle: string;
  catalogueYear: string;
  location: string;
};

const slides = [
  {
    image: "/brand/hero.png",
    eyebrow: "Built to Last",
    title: "Wall Hooks & Hangers",
    text: "Premium LION range for every home — strong, durable, wholesale ready.",
  },
  {
    image: "/products/cover.png",
    eyebrow: "Catalogue Collection",
    title: "1 Pin to Multi-Pin",
    text: "Decorative designs with clear retail and wholesaler packing details.",
  },
  {
    image: "/products/kesari-4-pin.png",
    eyebrow: "Heavy Duty",
    title: "Kesari Heavy Hooks",
    text: "Bigger. Better. Beautiful — built for everyday household strength.",
  },
  {
    image: "/products/tape-hook.png",
    eyebrow: "No Drilling",
    title: "Lion Tape Hooks",
    text: "Strong adhesive hold up to 3 kg for everyday essentials.",
  },
  {
    image: "/products/potato-masher.png",
    eyebrow: "Kitchen Essentials",
    title: "Tools You Can Trust",
    text: "Expanding the LION line with durable kitchen products for dealers.",
  },
];

export function Hero({
  brand,
  company,
  subtitle,
  catalogueYear,
  location,
}: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section className="relative h-[72vh] min-h-[420px] overflow-hidden text-cream md:h-[78vh]">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/88 to-navy/45" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 pt-10 md:justify-center md:px-6 md:pb-16">
        <div className="max-w-xl">
          <Image
            src="/brand/logo.png"
            alt={`${brand} logo`}
            width={96}
            height={96}
            className="mb-4 h-20 w-20 object-contain md:h-24 md:w-24"
            priority
          />
          <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-gold uppercase">
            Catalogue {catalogueYear} · {location}
          </p>
          <h1 className="font-serif text-4xl leading-[1.05] text-gold md:text-6xl">
            {brand}
          </h1>
          <p className="mt-2 font-serif text-xl text-cream md:text-2xl">
            {slides[index]?.title || subtitle}
          </p>
          <p className="mt-2 font-script text-xl text-gold">by {company}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 md:text-base">
            {slides[index]?.text}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-gold px-6 py-3 text-xs font-bold tracking-[0.16em] text-navy-deep uppercase transition hover:bg-gold-bright"
            >
              Browse Catalog
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-gold/70 px-6 py-3 text-xs font-semibold tracking-[0.16em] text-gold uppercase transition hover:bg-gold/10"
            >
              Wholesale Inquiry
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-6 z-20 flex items-center gap-2 md:right-8">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-navy-deep/60 text-gold backdrop-blur hover:bg-navy-deep"
        >
          ‹
        </button>
        <div className="flex gap-2 px-2">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-2.5 bg-cream/40 hover:bg-cream/70"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-navy-deep/60 text-gold backdrop-blur hover:bg-navy-deep"
        >
          ›
        </button>
      </div>
    </section>
  );
}
