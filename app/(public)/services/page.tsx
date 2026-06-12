import type { Metadata } from "next";
import { PROCESS_6, AD_SYSTEM_CATEGORIES } from "@/lib/process";

export const metadata: Metadata = {
  title: "서비스 안내 — 6단계 제작 프로세스와 광고 운영",
  description:
    "WEFLOW의 6단계 제작 프로세스(상담·진단부터 광고운영·사후관리)와 SNS·키워드 광고·검색 등록(SEO) 운영 시스템을 카테고리별로 안내합니다.",
};

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container-page">
        <header className="mb-12 text-center">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            SERVICE
          </span>
          <h1 className="section-title mt-3">제작진행과정</h1>
          <p className="mt-2 text-slate-500">
            상담부터 광고 운영·사후관리까지, WEFLOW가 함께하는 6단계 과정입니다.
          </p>
        </header>

        {/* 6-step process — clean numbered cards */}
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS_6.map((p) => (
            <li
              key={p.no}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-md"
            >
              <span className="pointer-events-none absolute -right-2 -top-4 text-6xl font-black text-slate-50 transition group-hover:text-brand-50">
                {p.no}
              </span>
              <div className="relative">
                <span className="text-sm font-bold text-brand-600">{p.no}</span>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">{p.short}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Ad operation & after-care — grouped by category */}
        <section className="mt-20">
          <header className="mb-8 text-center">
            <h2 className="section-title">광고 운영 · 사후관리 시스템</h2>
            <p className="mt-2 text-slate-500">
              제작 이후에도 지속적인 노출과 문의 유입을 위해 카테고리별로 운영합니다.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {AD_SYSTEM_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-lg text-white shadow-sm">
                    {cat.icon}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                    >
                      <span className="text-brand-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
