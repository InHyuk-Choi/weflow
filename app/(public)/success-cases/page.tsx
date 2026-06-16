import type { Metadata } from "next";
import Link from "next/link";
import SuccessCaseCard from "@/components/public/SuccessCaseCard";
import { getPublishedCases } from "@/lib/queries";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "성공사례 — 업종별 전환 최적화 포트폴리오",
  description:
    "PT샵, 필라테스, 보험설계, 카페 등 다양한 업종의 WEFLOW 성공 사례를 확인하세요. 업종별 문의 구조 최적화로 상담이 늘어난 실제 제작 사례를 소개합니다.",
};

export default async function SuccessCasesPage() {
  const cases = await getPublishedCases();

  return (
    <div className="section">
      <div className="container-page">
        <header className="mb-12 text-center">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            SUCCESS CASES
          </span>
          <h1 className="section-title mt-3">성공사례</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            업종별 전환 최적화 사례를 확인하고, 우리 업종에 맞는 제작 방향을
            살펴보세요.
          </p>
        </header>

        {cases.length === 0 ? (
          <p className="py-20 text-center text-slate-500">
            등록된 성공 사례가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 px-2 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
            {cases.map((c) => (
              <SuccessCaseCard key={c.id} successCase={c} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/free-diagnosis" className="btn-primary">
            더보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
