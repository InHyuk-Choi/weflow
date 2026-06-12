// Shared constants for the WEFLOW platform (contact info, links, options).

export const CONTACT = {
  phone: "010-2971-7280",
  phoneTel: "tel:01029717280",
  email: "contact@weflowlab.kr",
  kakao: "http://pf.kakao.com/_xntCbX",
  blog: "https://m.blog.naver.com/weflowlab",
  instagram: "https://www.instagram.com/weflowlab.kr?igsh=b2c1eTdwbHo2bWRt",
  facebook: "https://www.facebook.com/profile.php?id=61590187124682",
  site: "https://weflow-web.vercel.app",
  hours: "연중무휴 24시간 상담가능",
  representative: "신서준",
  businessNumber: "884-07-03480",
} as const;

// Booking service-type options (제작종류) shared by booking + diagnosis forms.
export const SERVICE_TYPES = [
  { value: "landing_page", label: "랜딩페이지 제작" },
  { value: "homepage", label: "홈페이지 제작" },
  { value: "landing_and_homepage", label: "랜딩&홈페이지 제작" },
  { value: "other", label: "기타(WEFLOW 케어플랜)" },
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number]["value"];

export function serviceTypeLabel(value: string | null | undefined): string {
  if (!value) return "-";
  return SERVICE_TYPES.find((s) => s.value === value)?.label ?? value;
}

// Status values (대기 / 진행중 / 완료) shared by reservations + inquiries.
export const STATUSES = [
  { value: "pending", label: "대기" },
  { value: "in-progress", label: "진행중" },
  { value: "completed", label: "완료" },
] as const;

export type StatusValue = (typeof STATUSES)[number]["value"];

export function statusLabel(value: string): string {
  return STATUSES.find((s) => s.value === value)?.label ?? value;
}

// 20 time slots, 30-min intervals, 09:00–18:30 inclusive (5 cols x 4 rows).
export const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let m = 9 * 60; m <= 18 * 60 + 30; m += 30) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return slots; // length 20
})();

export const POLLING_INTERVAL = Number(process.env.NEXT_PUBLIC_POLLING_INTERVAL ?? 5000);

export const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/services", label: "서비스" },
  { href: "/pricing", label: "제작플랜&가격안내" },
  { href: "/success-cases", label: "성공사례" },
  { href: "/booking", label: "예약" },
  { href: "/free-diagnosis", label: "무료진단받기" },
] as const;
