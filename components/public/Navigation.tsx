"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { NAV_LINKS } from "@/lib/constants";
import Logo from "./Logo";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Logo at the front of the category list, clickable to home. */}
        <Logo href="/" />

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive(link.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:text-brand-700"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-slate-700" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-700" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-700" />
        </button>
      </nav>

      {/* Mobile drawer — single-column vertical layout */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-slate-100 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "block rounded-lg px-3 py-2 text-base font-medium",
                  isActive(link.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-700"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
