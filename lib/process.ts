// Shared "제작진행과정" data used by Home, Services, and Landing pages.

export const PROCESS_4 = [
  { title: "고객 상담", desc: "업종 및 제작 방향을 확인합니다." },
  { title: "협의 후 제작", desc: "문의 구조와 전략을 함께 설계합니다." },
  { title: "3~7일 완료", desc: "빠르게 제작하여 배송 완료합니다." },
  { title: "광고 및 운영 사후 관리", desc: "검색 등록·수정·운영 관리까지 함께합니다." },
];

// `short` = the manual's exact one-line phrase (used on the Services page).
// `desc` = a longer description (used where a fuller blurb fits, e.g. Home).
export const PROCESS_6 = [
  { no: "01", title: "상담 · 진단", short: "업종 및 제작 방향 확인", desc: "업종 및 제작 방향 확인" },
  { no: "02", title: "기획 · 설계", short: "문의 구조 및 전략 설계", desc: "문의 구조 및 전략 설계" },
  { no: "03", title: "디자인", short: "브랜드 맞춤 화면 구성", desc: "브랜드 맞춤 화면 구성" },
  { no: "04", title: "개발 · 테스트", short: "기능구현 최적화 검수 및 수정 진행", desc: "기능구현 최적화 검수 및 수정 진행" },
  { no: "05", title: "SEO 상단등록", short: "네이버 · 구글 · 사이트맵 등록", desc: "네이버 · 구글 · 사이트맵 등록" },
  { no: "06", title: "광고운영 · 사후관리", short: "인스타 · 블로그 · 스레드 · 네이버 키워드 광고 운영관리", desc: "인스타 · 블로그 · 스레드 · 네이버 키워드 광고 운영관리" },
];

// 광고 운영·사후관리 시스템 — grouped by category for the Services page.
export const AD_SYSTEM_CATEGORIES = [
  {
    title: "SNS 콘텐츠",
    icon: "📱",
    items: ["블로그 업로드", "인스타 업로드", "스레드 업로드"],
  },
  {
    title: "키워드 광고",
    icon: "🎯",
    items: ["네이버 키워드 업로드", "당근플레이스 키워드 업로드"],
  },
  {
    title: "검색 등록 · SEO",
    icon: "🔍",
    items: [
      "네이버 서치어드바이저 상단등록",
      "구글 콘솔 상단등록",
      "사이트맵 등록",
    ],
  },
];
