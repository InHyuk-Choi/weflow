import Link from "next/link";
import { CONTACT } from "@/lib/constants";

// Always-visible bottom action bar — shown on every public page at ALL
// viewport widths (mobile, tablet, desktop) as a single horizontal row of 4.
export default function StickyBottomNav() {
  const items = [
    { label: "24시간 상담", href: CONTACT.phoneTel, external: false, icon: "📞" },
    { label: "카카오톡문의", href: CONTACT.kakao, external: true, icon: "💬" },
    { label: "블로그", href: CONTACT.blog, external: true, icon: "📝" },
    { label: "무료진단", href: "/free-diagnosis", external: false, icon: "✅" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 z-50 grid w-full grid-cols-4 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      style={{ height: "var(--bottom-bar-height)" }}
      aria-label="빠른 상담 바"
    >
      {items.map((item) =>
        item.external ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700 hover:bg-brand-50"
          >
            <span className="text-base" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </a>
        ) : item.href.startsWith("tel:") ? (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700 hover:bg-brand-50"
          >
            <span className="text-base" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700 hover:bg-brand-50"
          >
            <span className="text-base" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
