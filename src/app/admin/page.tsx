import Link from "next/link";
import { listInquiries, listProducts } from "@/lib/store";

export default async function AdminDashboardPage() {
  const products = await listProducts({ includeUnpublished: true });
  const inquiries = await listInquiries();
  const unread = inquiries.filter((i) => !i.read).length;
  const published = products.filter((p) => p.published).length;

  return (
    <div>
      <h1 className="font-serif text-3xl text-navy">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Manage LION catalog products, photos, and wholesale inquiries.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Products" value={String(products.length)} hint={`${published} published`} />
        <Stat label="Inquiries" value={String(inquiries.length)} hint={`${unread} unread`} />
        <Stat label="Featured" value={String(products.filter((p) => p.featured).length)} hint="Homepage picks" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="rounded-full bg-navy px-5 py-3 text-xs font-bold tracking-[0.14em] text-cream uppercase"
        >
          Add product
        </Link>
        <Link
          href="/admin/inquiries"
          className="rounded-full border border-navy/20 px-5 py-3 text-xs font-semibold tracking-[0.14em] text-navy uppercase"
        >
          View inquiries
        </Link>
        <Link
          href="/admin/settings"
          className="rounded-full border border-navy/20 px-5 py-3 text-xs font-semibold tracking-[0.14em] text-navy uppercase"
        >
          Site settings
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-navy/10 bg-white p-5">
      <p className="text-xs tracking-[0.16em] text-gold uppercase">{label}</p>
      <p className="mt-2 font-serif text-4xl text-navy">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
