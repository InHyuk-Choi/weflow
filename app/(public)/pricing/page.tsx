import type { Metadata } from "next";
import PricingCards from "@/components/public/PricingCards";

export const metadata: Metadata = {
  title: "제작플랜 & 가격안내 — 랜딩·홈페이지·케어플랜",
  description:
    "START 랜딩페이지부터 GROW 홈페이지, MASTER 프리미엄, WE·FLOW·WEFLOW 케어플랜과 네이버·당근 광고 세팅까지. 파격 할인가와 VAT 포함 가격을 한눈에 확인하세요.",
};

export default function PricingPage() {
  return (
    <div className="section">
      <div className="container-page">
        <header className="mb-10 text-center">
          <h1 className="section-title">제작플랜 & 가격안내</h1>
          <p className="mt-2 text-slate-600">
            필요한 기능만 구성한 합리적인 플랜을 선택하세요.
          </p>
        </header>
        <PricingCards />
      </div>
    </div>
  );
}
