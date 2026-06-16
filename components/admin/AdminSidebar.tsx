"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { clsx } from "clsx";
import Logo from "@/components/public/Logo";

const NAV = [
  { href: "/admin", label: "대시보드", icon: "📊" },
  { href: "/admin/reservations", label: "예약 관리", icon: "📅" },
  { href: "/admin/inquiries", label: "문의 관리", icon: "✉️" },
];

export default function AdminSidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="border-b border-slate-100 p-5">
          <Logo href="/admin" />
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                isActive(n.href)
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <span>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 border-t border-slate-100 p-3">
          <div className="px-2 text-xs text-slate-400">{username} 님</div>
          <button
            onClick={() => router.refresh()}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
          >
            새로고침
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-900"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo href="/admin" />
          <div className="flex gap-2">
            <button
              onClick={() => router.refresh()}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
            >
              새로고침
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white"
            >
              로그아웃
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium",
                isActive(n.href)
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
