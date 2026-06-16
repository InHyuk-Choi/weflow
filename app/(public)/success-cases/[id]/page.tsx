import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/queries";
import { TESTIMONIALS } from "@/lib/testimonials";
import { getDemo } from "@/lib/case-demos";
import StarRating from "@/components/public/StarRating";
import { CONTACT } from "@/lib/constants";

export const revalidate = 0;

function industryOf(title: string): string {
  return title.replace(/\s*성공\s*사례$/, "").trim() || title;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const item = await getCaseById(params.id);
  if (!item) return { title: "성공사례" };
  const industry = industryOf(item.title);
  return {
    title: `${industry} 홈페이지 제작 예시`,
    description: `${industry} 업종 맞춤 홈페이지 제작 예시입니다. 문의 전환 구조 설계와 예약·상담 연동, 모바일 최적화로 문의가 늘어나는 사이트를 제작합니다.`,
  };
}


export default async function SuccessCaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getCaseById(params.id);
  if (!item) notFound();

  const industry = industryOf(item.title);
  const demo = getDemo(industry);

  const seed = item.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const reviews = [0, 1, 2].map(
    (i) => TESTIMONIALS[(seed + i) % TESTIMONIALS.length]
  );

  return (
    <div>
      {/* Sample ribbon */}
      <div className="bg-brand-600 text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <span>📌 이 페이지는 <b>{industry} 홈페이지 제작 예시</b>입니다.</span>
          <Link href="/booking" className="font-semibold underline underline-offset-2">
            이 디자인으로 상담 →
          </Link>
        </div>
      </div>

      {/* Demo hero */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[60vh]">
          <Image
            src={item.imageUrl}
            alt={industry}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/85 via-slate-900/55 to-slate-900/25" />
          <div className="container-page relative flex min-h-[60vh] flex-col justify-center py-16 text-white">
            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">
              {demo.headline}
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-200 md:text-lg">
              {demo.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/free-diagnosis" className="btn-primary">
                무료 체험 신청
              </Link>
              <a
                href={CONTACT.phoneTel}
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {CONTACT.phone}
              </a>
            </div>
            {/* Demo nav tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {demo.tabs.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section">
        <div className="container-page">
          <div className="mb-8 text-center">
            <span className="text-sm font-bold tracking-widest text-brand-600">
              {demo.programsLabel}
            </span>
            <h2 className="section-title mt-2">{industry} 핵심 구성</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {demo.programs.map((p) => (
              <div key={p.name} className="card text-center">
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <h2 className="section-title mb-8 text-center">{demo.pricingLabel}</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {demo.pricing.map((m) => (
              <div
                key={m.name}
                className={
                  m.popular
                    ? "relative rounded-2xl border-2 border-brand-500 bg-white p-7 text-center shadow-lg"
                    : "rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm"
                }
              >
                {m.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                    인기
                  </span>
                )}
                <div className="font-bold text-slate-900">{m.name}</div>
                <div className="mt-3 text-2xl font-extrabold text-brand-700">
                  {m.price}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            * 위 요금은 제작 예시용 샘플입니다.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container-page">
          <div className="mb-8 text-center">
            <span className="text-sm font-bold tracking-widest text-brand-600">
              REVIEW
            </span>
            <h2 className="section-title mt-2">고객 후기</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((t, i) => (
              <figure key={i} className="card">
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
      </section>

      {/* Floating booking button — fixed bottom-center, always visible */}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4">
        <Link
          href="/booking"
          className="btn-primary pointer-events-auto px-8 py-4 text-lg shadow-2xl shadow-brand-900/30"
        >
          예약하기 →
        </Link>
      </div>

      {/* Bottom CTA */}
      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-14 text-center text-white md:px-10">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              {industry} 홈페이지, 지금 무료로 진단받으세요
            </h2>
            <p className="mt-3 text-brand-100">
              문의·예약이 늘어나는 구조, WEFLOW가 무료로 진단해 드립니다.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-diagnosis"
                className="rounded-full bg-white px-7 py-3.5 font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5"
              >
                무료 진단 신청
              </Link>
              <a
                href={CONTACT.phoneTel}
                className="rounded-full border border-white/50 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-brand-700">
            <Link href="/success-cases" className="hover:underline">
              다른 업종 사례 보기
            </Link>
            <a
              href={CONTACT.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              블로그에서 실제 제작기 보기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
