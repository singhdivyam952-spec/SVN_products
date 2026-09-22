"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <h1 className="font-serif text-3xl text-navy">Admin login</h1>
      <p className="mt-2 text-sm text-muted">
        Enter the admin password to manage products and inquiries.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 border border-navy/10 bg-white p-6">
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-navy/15 px-3 py-2 text-sm outline-none focus:border-gold"
            required
            autoFocus
          />
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-navy py-3 text-xs font-bold tracking-[0.16em] text-cream uppercase disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
