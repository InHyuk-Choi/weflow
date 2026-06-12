import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/public/ContactForm";
import PricingCards from "@/components/public/PricingCards";
import TestimonialCarousel from "@/components/public/TestimonialCarousel";
import { PROCESS_6 } from "@/lib/process";

export const metadata: Metadata = {
  title: "WEFLOW 랜딩 — 문의로 이어지는 홈페이지·광고 솔루션",
  description:
    "랜딩페이지·홈페이지·광고·사후관리까지 한 번에. WEFLOW는 빠른 제작과 합리적 비용, 24시간 상담, 광고 연동으로 문의가 들어오는 구조를 설계합니다.",
};

const CARE_BLOCKS = [
  {
    title: "빠른 제작 진행",
    body: "랜딩페이지 3~4일 · 홈페이지 약 1주일. 빠르게 제작하고 빠르게 운영을 시작합니다.",
  },
  {
    title: "합리적인 비용",
    body: "불필요한 비용 없이 필요한 기능만 구성하여 가성비 + 실속 + 퀄리티를 함께 제공합니다.",
  },
  {
    title: "24시간 상담 가능",
    body: "정해진 시간만 기다리지 마세요. 문의가 생길 때 언제든 빠른 상담 및 피드백이 가능합니다.",
  },
  {
    title: "제작 후 운영 관리",
    body: "홈페이지 만들고 끝이 아닙니다. 검색 등록, 수정, 유지보수, 운영 관리까지 함께합니다.",
  },
  {
    title: "광고 연동 지원",
    body: "홈페이지 + 랜딩페이지 + 광고를 한 번에 연결하여 문의가 들어오는 구조를 만듭니다. 인스타·스레드·블로그·카카오톡·당근 플레이스 등.",
  },
];

const INQUIRY_STRUCTURE = [
  "업종별 고객 흐름 분석",
  "상담 버튼 위치 최적화",
  "모바일 문의 동선 구성",
];

const DIAGNOSIS_CHECKS = ["문의 구조 진단", "디자인 점검", "검색 노출 분석", "문의 개선 제안"];

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-16 lg:col-span-2">
          {/* Hero */}
          <section>
            <h1 className="text-3xl font-extrabold leading-snug text-slate-900 md:text-4xl">
              문의로 이어지는 홈페이지를 만듭니다
            </h1>
            <p className="mt-3 text-slate-600">
              기획부터 제작, 광고 연동, 운영 관리까지 WEFLOW가 함께합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#landing-inquiry" className="btn-primary">
                무료 진단 후 견적받기
              </a>
              <a href="#landing-inquiry" className="btn-secondary">
                실제 제작 성공 보기
              </a>
            </div>
          </section>

          {/* WEFLOW CARE PLAN — 5 benefit blocks */}
          <section>
            <h2 className="section-title mb-2">WEFLOW CARE PLAN</h2>
            <p className="mb-6 text-slate-600">
              제작부터 운영 · 광고 · 관리까지 한 번에.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {CARE_BLOCKS.map((b) => (
                <div key={b.title} className="card">
                  <h3 className="font-bold text-brand-700">{b.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 문의 증가 구조 설계 */}
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-12 text-center text-white md:px-10 md:py-16">
            <p className="text-sm font-medium text-brand-100">
              사람들은 검색하고 비교한 뒤 문의합니다
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-2xl font-extrabold leading-snug md:text-3xl">
              홈페이지만 필요한 시대는 지났습니다
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-brand-100">
              WEFLOW는 랜딩페이지 + 홈페이지 + 광고 + 사후관리까지
              <br className="hidden sm:block" />
              저렴한 비용과 높은 퀄리티로 한 번에 해결합니다.
            </p>

            <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {INQUIRY_STRUCTURE.map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/10 p-5 backdrop-blur transition hover:bg-white/15"
                >
                  <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-lg">
                    ✓
                  </div>
                  <p className="text-sm font-semibold">{i}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reuse: 8 pricing cards */}
          <section>
            <h2 className="section-title mb-6">제작플랜 & 가격안내</h2>
            <PricingCards />
          </section>

          {/* Reuse: 6-step process */}
          <section>
            <h2 className="section-title mb-6">제작진행과정</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS_6.map((p) => (
                <div key={p.no} className="card">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xl font-extrabold text-brand-600">
                      {p.no}
                    </span>
                    <h3 className="font-bold text-slate-900">{p.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Free diagnosis checks */}
          <section>
            <h2 className="section-title">무료진단에서 이런 걸 확인해드립니다</h2>
            <ul className="mt-4 space-y-2">
              {DIAGNOSIS_CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-slate-700">
                  <span className="text-brand-600">✓</span> {c}
                </li>
              ))}
            </ul>
            <Link href="/free-diagnosis" className="btn-primary mt-6">
              무료진단 후 견적받기 →
            </Link>
          </section>
        </div>

        {/* Sticky right inquiry form */}
        <aside className="lg:col-span-1">
          <div id="landing-inquiry" className="lg:sticky lg:top-20">
            <div className="card">
              <h2 className="mb-1 text-lg font-bold text-slate-900">무료진단 받기</h2>
              <p className="mb-4 text-sm text-slate-500">
                이름과 연락처만 남기면 빠르게 안내해 드립니다.
              </p>
              <ContactForm variant="diagnosis" compact />
            </div>
          </div>
        </aside>
      </div>

      {/* Reuse: testimonials */}
      <TestimonialCarousel />
    </div>
  );
}
