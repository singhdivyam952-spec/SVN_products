"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoreSettings } from "@/lib/store";

export function SettingsForm({ settings }: { settings: StoreSettings }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOk(false);
    const data = new FormData(e.currentTarget);
    const payload: StoreSettings = {
      brand: String(data.get("brand") || ""),
      company: String(data.get("company") || ""),
      tagline: String(data.get("tagline") || ""),
      subtitle: String(data.get("subtitle") || ""),
      location: String(data.get("location") || ""),
      partnerName: String(data.get("partnerName") || ""),
      partnerRole: String(data.get("partnerRole") || ""),
      email: String(data.get("email") || ""),
      whatsapp: String(data.get("whatsapp") || ""),
      description: String(data.get("description") || ""),
      catalogueYear: String(data.get("catalogueYear") || ""),
    };
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Save failed");
      return;
    }
    setOk(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-4 border border-navy/10 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Brand" name="brand" defaultValue={settings.brand} />
        <Field label="Company" name="company" defaultValue={settings.company} />
        <Field label="Tagline" name="tagline" defaultValue={settings.tagline} />
        <Field label="Subtitle" name="subtitle" defaultValue={settings.subtitle} />
        <Field label="Location" name="location" defaultValue={settings.location} />
        <Field
          label="Catalogue year"
          name="catalogueYear"
          defaultValue={settings.catalogueYear}
        />
        <Field
          label="Partner name"
          name="partnerName"
          defaultValue={settings.partnerName}
        />
        <Field
          label="Partner role"
          name="partnerRole"
          defaultValue={settings.partnerRole}
        />
        <Field label="Email" name="email" defaultValue={settings.email} />
        <Field
          label="WhatsApp (E.164 without +)"
          name="whatsapp"
          defaultValue={settings.whatsapp}
          placeholder="9198XXXXXXXX"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
          Company description
        </label>
        <textarea
          name="description"
          rows={5}
          defaultValue={settings.description}
          className="w-full border border-navy/15 px-3 py-2 text-sm"
        />
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {ok ? <p className="text-sm text-green-800">Settings saved.</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-navy px-6 py-3 text-xs font-bold tracking-[0.16em] text-cream uppercase disabled:opacity-60"
      >
        {loading ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
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
        placeholder={placeholder}
        className="w-full border border-navy/15 px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
