import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "무료진단 받기 — 문의 구조·디자인·검색 노출 점검",
  description:
    "WEFLOW 무료진단으로 문의 구조 진단, 디자인 점검, 검색 노출 분석, 문의 개선 제안을 받아보세요. 이름과 연락처만 남기면 빠르게 견적을 안내해 드립니다.",
};

const CHECKS = ["문의 구조 진단", "디자인 점검", "검색 노출 분석", "문의 개선 제안"];

export default function FreeDiagnosisPage() {
  return (
    <div className="section">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="section-title">무료진단 받기</h1>
          <p className="mt-2 text-slate-600">
            지금 바로 무료 진단받고, 사이트의 숨겨진 잠재력을 발견하세요.
          </p>
          <ul className="mt-6 space-y-3">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-center gap-2 text-slate-700">
                <span className="text-brand-600">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            무료진단 후 견적받기
          </h2>
          <ContactForm variant="diagnosis" />
        </div>
      </div>
    </div>
  );
}
