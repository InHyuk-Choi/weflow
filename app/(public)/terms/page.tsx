import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "WEFLOW 서비스 이용약관 안내 페이지입니다. 서비스 이용 조건과 책임, 제작 및 운영 관련 기준을 확인할 수 있습니다.",
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container-page max-w-3xl">
        <h1 className="section-title">이용약관</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            본 약관은 WEFLOW가 제공하는 홈페이지·랜딩페이지 제작 및 운영 관리 서비스의
            이용 조건과 절차를 규정합니다.
          </p>
          <p>
            유지보수는 텍스트·이미지·링크 등 경미한 수정을 기준으로 하며, 페이지 추가
            및 기능 개발은 별도 협의 및 비용이 발생할 수 있습니다. 도메인 및 광고비는
            고객 명의/계정으로 처리되며 WEFLOW는 운영 및 세팅을 지원합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
