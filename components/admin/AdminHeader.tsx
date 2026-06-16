"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import Logo from "@/components/public/Logo";

const NAV = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/reservations", label: "예약 관리" },
  { href: "/admin/inquiries", label: "문의 관리" },
];

export default function AdminHeader({ username }: { username: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Logo href="/admin" />
          <nav className="hidden gap-1 text-sm font-medium md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "rounded-lg px-3 py-1.5 transition",
                  isActive(n.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:text-brand-700"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-500 sm:inline">
            {username} 님
          </span>
          <button
            onClick={() => router.refresh()}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            새로고침
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-900"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
