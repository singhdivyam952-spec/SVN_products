"use client";

import { FormEvent, useState } from "react";
import type { Product } from "@/data/products";

type Status = "idle" | "loading" | "success" | "error";

export function InquiryForm({
  defaultProduct,
  products,
  email,
}: {
  defaultProduct?: string;
  products: Product[];
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const interests = data.getAll("interests").map(String);

    const payload = {
      name: String(data.get("name") || ""),
      business: String(data.get("business") || ""),
      phone: String(data.get("phone") || ""),
      whatsapp: String(data.get("whatsapp") || ""),
      city: String(data.get("city") || ""),
      quantity: String(data.get("quantity") || ""),
      message: String(data.get("message") || ""),
      interests,
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Unable to send inquiry");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-white/80 p-8 text-center">
        <p className="font-serif text-2xl text-navy">Thank you</p>
        <p className="mt-3 text-sm text-muted">
          Your wholesale inquiry was sent to{" "}
          <span className="font-semibold text-navy">{email}</span>.
          We will get back to you shortly.
        </p>
        <button
          type="button"
          className="mt-6 text-xs font-semibold tracking-[0.16em] text-gold uppercase"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 border border-navy/10 bg-white/80 p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your Name" name="name" required />
        <Field label="Business / Company" name="business" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="WhatsApp (optional)" name="whatsapp" type="tel" />
        <Field label="City" name="city" required />
        <Field
          label="Quantity Estimate"
          name="quantity"
          placeholder="e.g. 10 wholesale packs"
        />
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold tracking-[0.16em] text-navy uppercase">
          Product Interest
        </legend>
        <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto border border-navy/10 p-3 sm:grid-cols-2">
          {products.map((p) => {
            const label = p.design ? `${p.name} — ${p.design}` : p.name;
            const checked = defaultProduct === p.slug;
            return (
              <label
                key={p.slug}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={label}
                  defaultChecked={checked}
                  className="mt-1 accent-navy"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className="mb-2 block text-xs font-semibold tracking-[0.16em] text-navy uppercase">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-navy/15 bg-cream/40 px-3 py-2 text-sm outline-none focus:border-gold"
          placeholder="Tell us about your wholesale requirements..."
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-navy px-6 py-3 text-xs font-bold tracking-[0.18em] text-cream uppercase transition hover:bg-navy-soft disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Inquiry to SVN PRODUCT"}
      </button>
      <p className="text-center text-xs text-muted">
        Inquiries are delivered to {email}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-[0.16em] text-navy uppercase">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-navy/15 bg-cream/40 px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
