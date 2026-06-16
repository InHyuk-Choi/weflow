import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/queries";
import { TESTIMONIALS } from "@/lib/testimonials";
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

const FEATURES = [
  { icon: "🎨", title: "브랜드 맞춤 디자인", desc: "업종 특성에 맞춘 신뢰감 있는 화면 구성" },
  { icon: "🎯", title: "문의 전환 구조 설계", desc: "상담 버튼 위치·동선 최적화로 문의 증가" },
  { icon: "📅", title: "예약·상담 연동", desc: "예약 폼, 카카오톡 상담을 한 번에 연결" },
  { icon: "📱", title: "모바일 최적화 · SEO", desc: "모바일 완벽 대응 + 검색 상단 노출" },
];

const APPLIED = [
  "반응형 제작 (PC/모바일)",
  "문의폼 연동",
  "카카오톡 상담연동",
  "예약 시스템",
  "기본 SEO 설정",
  "광고 전환 구조",
];

export default async function SuccessCaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getCaseById(params.id);
  if (!item) notFound();

  const industry = industryOf(item.title);
  // Pick 3 testimonials deterministically based on the id.
  const seed = item.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const reviews = [0, 1, 2].map(
    (i) => TESTIMONIALS[(seed + i) % TESTIMONIALS.length]
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={industry}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          <div className="container-page absolute inset-x-0 bottom-0 pb-8">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              제작 예시 · SAMPLE
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              {industry} 홈페이지 제작 예시
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-200 md:text-base">
              문의로 이어지는 {industry} 맞춤 홈페이지 — 디자인부터 예약·문의 구조까지.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/booking" className="btn-primary">
                이 디자인으로 상담
              </Link>
              <Link
                href="/free-diagnosis"
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                무료 진단 신청
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container-page max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            OVERVIEW
          </span>
          <h2 className="section-title mt-3">{industry}, 이렇게 만들어 드립니다</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-500">
            {item.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="pb-4">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card text-center">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applied features */}
      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-12">
            <h2 className="text-2xl font-bold">이 사이트에 적용된 기능</h2>
            <p className="mt-2 text-slate-300">
              {industry} 업종에 필요한 핵심 기능을 모두 담았습니다.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {APPLIED.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium"
                >
                  <span className="text-brand-300">✓</span> {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <h2 className="section-title mb-6 text-center">고객 후기</h2>
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
                전화 상담 {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/success-cases"
              className="text-sm font-medium text-brand-700 hover:underline"
            >
              ← 다른 성공사례 더 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
