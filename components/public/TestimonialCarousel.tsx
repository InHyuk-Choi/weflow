import Link from "next/link";
import { TESTIMONIALS } from "@/lib/testimonials";
import StarRating from "./StarRating";

// Continuously auto-scrolling horizontal marquee of 2 rows that loops
// seamlessly. "후기 더보기" (top-right) navigates to the inquiry page.
function Row({
  items,
  reverse = false,
}: {
  items: typeof TESTIMONIALS;
  reverse?: boolean;
}) {
  // Duplicate the list so the -50% translate loops without a visible gap.
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 [animation-play-state:running] hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((t, i) => (
          <figure
            key={i}
            className="w-72 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <StarRating rating={t.rating} />
            <blockquote className="mt-2 text-sm leading-relaxed text-slate-700">
              {t.text}
            </blockquote>
            <figcaption className="mt-3 text-xs font-medium text-slate-500">
              - {t.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, mid);
  const rowB = TESTIMONIALS.slice(mid);

  return (
    <section className="section bg-slate-50">
      <div className="container-page">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">고객 후기</h2>
          <Link
            href="/free-diagnosis"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            후기 더보기 →
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
