import Link from "next/link";
import { clsx } from "clsx";

// Text placeholder logo — real logo image swapped in later.
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
        "inline-flex items-center gap-1 text-xl font-extrabold tracking-tight",
        variant === "light" ? "text-white" : "text-brand-700",
        className
      )}
    >
      <span
        className={clsx(
          "grid h-7 w-7 place-items-center rounded-lg text-sm font-black",
          variant === "light"
            ? "bg-white text-brand-700"
            : "bg-brand-600 text-white"
        )}
      >
        W
      </span>
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
