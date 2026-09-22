"use client";

import { useRouter } from "next/navigation";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();

  async function onDelete() {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Could not delete product");
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      className="text-xs font-semibold tracking-wide text-red-700 uppercase"
    >
      Delete
    </button>
  );
}
