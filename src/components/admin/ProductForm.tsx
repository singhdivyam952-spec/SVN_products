"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryLabels } from "@/data/products";
import type { StoreProduct } from "@/lib/store";

const categories = Object.entries(categoryLabels);

export function ProductForm({ product }: { product?: StoreProduct }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(product?.image || "");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (product?.id) data.set("id", product.id);
    if (product?.image) data.set("existingImage", product.image);

    const published = (form.elements.namedItem("published") as HTMLInputElement)
      ?.checked;
    data.set("published", published ? "true" : "false");
    const featured = (form.elements.namedItem("featured") as HTMLInputElement)
      ?.checked;
    data.set("featured", featured ? "true" : "false");

    const res = await fetch("/api/admin/products", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error || "Save failed");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5 border border-navy/10 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" defaultValue={product?.name} required />
        <Field
          label="Design (optional)"
          name="design"
          defaultValue={product?.design}
        />
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
            Category
          </label>
          <select
            name="category"
            required
            defaultValue={product?.category || "1-pin"}
            className="w-full border border-navy/15 px-3 py-2 text-sm"
          >
            {categories.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Slug (optional)"
          name="slug"
          defaultValue={product?.slug}
          placeholder="auto from name"
        />
      </div>

      <Field
        label="Tagline"
        name="tagline"
        defaultValue={product?.tagline || "Strong • Durable • Space Saver"}
        required
      />

      <div>
        <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
          Features (comma or new line)
        </label>
        <textarea
          name="features"
          rows={3}
          defaultValue={(product?.features || []).join(", ")}
          className="w-full border border-navy/15 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Retail label"
          name="retailLabel"
          defaultValue={product?.retailLabel || "12 Pieces Per Card"}
        />
        <Field
          label="Wholesale label"
          name="wholesaleLabel"
          defaultValue={product?.wholesaleLabel || "16 Boxes Wholesaler Pack"}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
            Retail note
          </label>
          <textarea
            name="retailNote"
            rows={3}
            defaultValue={product?.retailNote}
            className="w-full border border-navy/15 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
            Wholesale note
          </label>
          <textarea
            name="wholesaleNote"
            rows={3}
            defaultValue={product?.wholesaleNote}
            className="w-full border border-navy/15 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <Field
        label="Weight capacity (optional)"
        name="weightCapacity"
        defaultValue={product?.weightCapacity}
      />

      <div>
        <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
          Product photo
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
        {preview ? (
          <div className="relative mt-3 h-40 w-40 overflow-hidden border border-navy/10 bg-cream">
            <Image src={preview} alt="Preview" fill className="object-contain p-2" />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            name="published"
            defaultChecked={product?.published ?? true}
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
          />
          Featured on homepage
        </label>
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-navy px-6 py-3 text-xs font-bold tracking-[0.16em] text-cream uppercase disabled:opacity-60"
      >
        {loading ? "Saving…" : product ? "Update product" : "Create product"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
        {label}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full border border-navy/15 px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
