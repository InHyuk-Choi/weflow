import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "WEFLOW 개인정보처리방침 안내 페이지입니다. 수집하는 개인정보 항목과 이용 목적, 보관 기간 등을 확인할 수 있습니다.",
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container-page max-w-3xl">
        <h1 className="section-title">개인정보처리방침</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            WEFLOW(이하 &lsquo;회사&rsquo;)는 이용자의 개인정보를 중요하게 생각하며,
            관련 법령을 준수합니다. 회사는 상담 및 견적 제공을 위해 이름, 연락처 등
            최소한의 정보를 수집합니다.
          </p>
          <p>
            수집된 정보는 상담·서비스 제공 목적으로만 이용되며, 목적 달성 후 관련
            법령에 따라 안전하게 파기합니다. 자세한 문의는 contact@weflowlab.kr 로
            연락 주시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
