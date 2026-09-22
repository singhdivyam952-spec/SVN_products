"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StoreInquiry } from "@/lib/store";

export function InquiriesClient({ initial }: { initial: StoreInquiry[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);

  async function markRead(id: string, read: boolean) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read } : i)),
    );
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
    router.refresh();
  }

  if (!items.length) {
    return (
      <p className="border border-navy/10 bg-white p-6 text-sm text-muted">
        No inquiries yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((inq) => (
        <article
          key={inq.id}
          className={`border border-navy/10 bg-white p-5 ${
            inq.read ? "opacity-80" : "border-l-4 border-l-gold"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-navy">
                {inq.name} · {inq.business}
              </h2>
              <p className="text-xs text-muted">
                {new Date(inq.createdAt).toLocaleString()} · {inq.city}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => markRead(inq.id, !inq.read)}
                className="text-xs font-semibold tracking-wide text-navy uppercase"
              >
                {inq.read ? "Mark unread" : "Mark read"}
              </button>
              <button
                type="button"
                onClick={() => remove(inq.id)}
                className="text-xs font-semibold tracking-wide text-red-700 uppercase"
              >
                Delete
              </button>
            </div>
          </div>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted uppercase">Phone</dt>
              <dd>{inq.phone}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase">WhatsApp</dt>
              <dd>{inq.whatsapp || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase">Quantity</dt>
              <dd>{inq.quantity || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase">Interests</dt>
              <dd>{inq.interests.length ? inq.interests.join(", ") : "—"}</dd>
            </div>
          </dl>
          <p className="mt-4 whitespace-pre-wrap text-sm text-navy/90">
            {inq.message}
          </p>
        </article>
      ))}
    </div>
  );
}
