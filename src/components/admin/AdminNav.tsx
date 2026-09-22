"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-navy/10 bg-navy-deep text-cream md:min-h-screen md:w-56 md:border-r md:border-b-0">
      <div className="flex items-center gap-3 border-b border-gold/20 px-4 py-5">
        <Image
          src="/brand/logo.png"
          alt="LION logo"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <div>
          <p className="font-serif text-xl text-gold">LION Admin</p>
          <p className="text-[0.65rem] tracking-[0.16em] text-cream/60 uppercase">
            SVN PRODUCT
          </p>
        </div>
      </div>
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto p-3 md:flex-col">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-2 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase ${
                active ? "bg-gold text-navy-deep" : "text-cream/80 hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex gap-2 border-t border-gold/20 p-3">
        <Link
          href="/"
          className="flex-1 rounded border border-gold/30 px-2 py-2 text-center text-[0.65rem] tracking-wider uppercase hover:bg-white/5"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex-1 rounded bg-white/10 px-2 py-2 text-[0.65rem] tracking-wider uppercase hover:bg-white/15"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
