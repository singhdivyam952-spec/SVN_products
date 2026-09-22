import type { PackingDetails } from "@/data/products";

export function PackingDetails({ packing }: { packing: PackingDetails }) {
  return (
    <section className="overflow-hidden border border-navy/15 bg-white/80">
      <div className="bg-navy px-4 py-3 text-center">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
          Packing Details
        </h2>
      </div>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-navy/10 p-5 md:border-r md:border-b-0">
          <span className="pill mb-3">{packing.retailLabel}</span>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {packing.retailNote}
          </p>
        </div>
        <div className="p-5">
          <span className="pill mb-3">{packing.wholesaleLabel}</span>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {packing.wholesaleNote}
          </p>
        </div>
      </div>
    </section>
  );
}
