const items = [
  { title: "High Quality Material", icon: "★" },
  { title: "Precise Performance", icon: "◎" },
  { title: "Trusted by Households", icon: "⌂" },
  { title: "Wholesale Pack", icon: "▦" },
];

export function TrustStrip({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "border-y border-gold/30 bg-navy text-cream"
          : "border-y border-navy/10 bg-navy text-cream"
      }
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4 md:px-6">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
              {item.icon}
            </span>
            <span className="text-xs font-semibold tracking-[0.08em] uppercase md:text-[0.7rem]">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
