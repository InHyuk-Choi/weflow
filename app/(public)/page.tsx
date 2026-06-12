import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/public/Hero";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";
import SuccessCaseCard from "@/components/public/SuccessCaseCard";
import { getPublishedCases } from "@/lib/queries";
import { PROCESS_4, PROCESS_6 } from "@/lib/process";
import { placeholderImage } from "@/lib/sample-cases";

export const revalidate = 0;

const SMALL_BOXES = [
  { title: "케어 플랜", desc: "제작·광고·운영" },
  { title: "빠른제작", desc: "3일~7일" },
  { title: "합리적 비용", desc: "가성비+퀄리티" },
];

const CARE_BENEFITS = [
  "weflow 케어플랜",
  "제작+운영+광고+관리 원터치",
  "빠른 제작 (3~7일 로켓배송)",
  "합리적인 가성비",
  "24시간 상담대기 (빠른 상담 및 피드백)",
  "운영 · 광고 지원 (사후관리서비스)",
];

const DELIVERY_FLOW = [
  "고객 의뢰",
  "접수 후 제작",
  "3~7일 배송 완료",
  "광고 및 운영 사후 관리",
];

const DIAGNOSIS_CHECKS = [
  "문의 구조 진단",
  "디자인 점검",
  "검색 노출 분석",
  "문의 개선 제안",
];

export default async function HomePage() {
  const cases = await getPublishedCases(5);

  return (
    <>
      <Hero />

      {/* Care-plan benefits: three small boxes + long 6-cell box */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap gap-3">
            {SMALL_BOXES.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-3"
              >
                <div className="font-bold text-brand-700">{b.title}</div>
                <div className="text-sm text-slate-600">{b.desc}</div>
              </div>
            ))}
          </div>

          <h2 className="section-title mt-12 mb-5">WEFLOW만의 케어 플랜 혜택</h2>
          {/* One row; scrolls horizontally on mobile */}
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]">
            {CARE_BENEFITS.map((c, i) => (
              <div
                key={i}
                className="flex min-w-[150px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-slate-700 shadow-sm"
              >
                {c}
              </div>
            ))}
          </div>

          {/* 4-step delivery flow with images */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_FLOW.map((step, i) => (
              <div key={step} className="text-center">
                <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={placeholderImage(`flow-${i}`)}
                    alt={step}
                    fill
                    sizes="(max-width:767px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  {i + 1}. {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success cases: left copy + right 5 images */}
      <section className="section bg-slate-50">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <div className="card flex flex-col justify-center lg:col-span-1">
            <h2 className="text-xl font-bold text-slate-900">
              다양한 업종의 성공 사례를 확인하세요.
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              어디서도 볼 수 없는 업종별 전환 최적화 사례를 직접 확인하세요.
            </p>
            <Link href="/free-diagnosis" className="btn-secondary mt-5 w-fit">
              살펴보기 →
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-3 flex justify-end">
              <Link
                href="/success-cases"
                className="text-sm font-semibold text-brand-700 hover:underline"
              >
                더보기 →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {cases.map((c) => (
                <Link
                  key={c.id}
                  href={`/success-cases/${c.id}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    <Image
                      src={c.imageUrl}
                      alt={c.title}
                      fill
                      sizes="(max-width:767px) 50vw, 20vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="truncate p-2 text-center text-xs font-medium text-slate-700">
                    {c.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 제작 진행 과정 (4) + 6단계 프로세스 (6) side by side */}
      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="section-title mb-5">제작 진행 과정</h2>
            <div className="space-y-3">
              {PROCESS_4.map((p, i) => (
                <div key={p.title} className="card flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">{p.title}</div>
                    <div className="text-sm text-slate-600">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title mb-5">6단계 제작 프로세스</h2>
            <div className="space-y-3">
              {PROCESS_6.map((p) => (
                <div key={p.no} className="card flex items-start gap-3">
                  <span className="shrink-0 text-lg font-extrabold text-brand-600">
                    {p.no}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">{p.title}</div>
                    <div className="text-sm text-slate-600">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free diagnosis box */}
      <section className="section bg-brand-600 text-white">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold md:text-3xl">무료진단 받기</h2>
          <p className="mt-3 text-brand-100">
            지금 바로 무료 진단받고, 사이트의 숨겨진 잠재력을 발견하세요.
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white/10 p-6 text-left backdrop-blur">
            <ul className="space-y-2">
              {DIAGNOSIS_CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="text-amber-300">✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/free-diagnosis"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 shadow-cta transition hover:bg-brand-50"
          >
            무료진단 후 견적 받기
          </Link>
        </div>
      </section>

      <TestimonialCarousel />
    </>
  );
}
