import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";

// Brand logo: real logo icon (public/logo_icon.png) + WEFLOW wordmark.
export default function Logo({
  className,
  href = "/",
  variant = "dark",
}: {
  className?: string;
  href?: string | null;
  variant?: "dark" | "light";
}) {
  const inner = (
    <span
      className={clsx(
        "inline-flex items-center gap-2 text-xl font-extrabold tracking-tight",
        variant === "light" ? "text-white" : "text-brand-700",
        className
      )}
    >
      <Image
        src="/logo_icon.png"
        alt="WEFLOW"
        width={32}
        height={32}
        className="h-8 w-8 rounded-lg object-contain"
        priority
      />
      WEFLOW
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="WEFLOW 홈으로 이동">
      {inner}
    </Link>
  );
}
