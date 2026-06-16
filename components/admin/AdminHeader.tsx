"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/public/Logo";

export default function AdminHeader({ username }: { username: string }) {
  const router = useRouter();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Logo href="/admin" />
          <nav className="hidden gap-3 text-sm font-medium text-slate-600 md:flex">
            <Link href="/admin" className="hover:text-brand-700">
              대시보드
            </Link>
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
