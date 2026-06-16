import Link from "next/link";
import Image from "next/image";

// Home hero — modern layout with decorative gradient blobs.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="container-page relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        {/* Left: copy + CTAs */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur md:text-sm">
            랜딩&홈페이지 · 광고 운영 · 검색 상단 노출
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-6xl">
            <span className="block whitespace-nowrap">문의로 이어지는</span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              홈페이지를 만듭니다
            </span>
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
            <Link href="/success-cases" className="btn-secondary">
              성공 사례 보기
            </Link>
            <Link href="/landing" className="btn-secondary">
              WEFLOW 랜딩 페이지
            </Link>
          </div>
        </div>

        {/* Right: large brand image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-200/40 to-transparent blur-2xl" />
            <Image
              src="/main_icon.png"
              alt="WEFLOW"
              width={520}
              height={520}
              priority
              className="h-auto w-full max-w-md object-contain drop-shadow-xl lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
