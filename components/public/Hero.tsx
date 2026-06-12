import Link from "next/link";

// Home hero — eyebrow, two-line headline (no mid-word break), subtext,
// and three blue/shadow CTAs.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <div className="container-page py-16 md:py-24">
        <p className="text-sm font-medium text-brand-600 md:text-base">
          랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션
        </p>
        <h1 className="mt-4 text-3xl font-extrabold leading-snug text-slate-900 md:text-5xl md:leading-tight">
          <span className="block whitespace-nowrap">문의로 이어지는</span>
          <span className="block whitespace-nowrap">홈페이지를 만듭니다</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
          홈페이지 제작부터 광고 연동·운영 관리까지
          <br />
          단순 제작이 아닌 문의 구조까지 설계합니다
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/free-diagnosis" className="btn-primary">
            무료 진단 신청
          </Link>
          <Link href="/success-cases" className="btn-primary">
            성공 사례 보기
          </Link>
          <Link href="/landing" className="btn-primary">
            WEFLOW 랜딩 페이지
          </Link>
        </div>
      </div>
    </section>
  );
}
