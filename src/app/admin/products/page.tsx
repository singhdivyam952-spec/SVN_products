import Image from "next/image";
import Link from "next/link";
import { categoryLabels } from "@/data/products";
import { listProducts } from "@/lib/store";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await listProducts({ includeUnpublished: true });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-navy">Products</h1>
          <p className="mt-2 text-sm text-muted">
            Add photos, edit packing details, publish or hide items.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-navy px-5 py-3 text-xs font-bold tracking-[0.14em] text-cream uppercase"
        >
          Add product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-navy/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-navy/10 bg-cream/60 text-xs tracking-[0.12em] text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const title = p.design ? `${p.name} — ${p.design}` : p.name;
              return (
                <tr key={p.id} className="border-b border-navy/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden bg-cream-dark">
                        <Image
                          src={p.image}
                          alt={title}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{title}</p>
                        <p className="text-xs text-muted">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {categoryLabels[p.category as keyof typeof categoryLabels] ||
                      p.category}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1 text-xs">
                      <span
                        className={
                          p.published ? "text-green-800" : "text-amber-700"
                        }
                      >
                        {p.published ? "Published" : "Hidden"}
                      </span>
                      {p.featured ? (
                        <span className="text-gold">Featured</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-xs font-semibold tracking-wide text-navy uppercase hover:text-gold"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-xs font-semibold tracking-wide text-muted uppercase hover:text-gold"
                      >
                        View
                      </Link>
                      <DeleteProductButton id={p.id} name={title} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
