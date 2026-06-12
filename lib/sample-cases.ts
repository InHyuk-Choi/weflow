// Success-case industries from the WEFLOW manual (no medical content).
// Each has a `slug` used as the image filename in `public/cases/<slug>.<ext>`.

export interface CaseDef {
  name: string;
  slug: string;
}

export const CASE_LIST: CaseDef[] = [
  { name: "PT샵", slug: "pt" },
  { name: "필라테스", slug: "pilates" },
  { name: "헬스장", slug: "gym" },
  { name: "보험 설계", slug: "insurance" },
  { name: "법률 사무소", slug: "law" },
  { name: "자동차 디테일링", slug: "cardetailing" },
  { name: "렌터카 업체", slug: "rentcar" },
  { name: "웨딩/스냅 업체", slug: "wedding" },
  { name: "세무사 사무소", slug: "tax" },
  { name: "공인중개사", slug: "realestate" },
  { name: "카페", slug: "cafe" },
  { name: "미용실", slug: "hairsalon" },
  { name: "네일샵", slug: "nail" },
  { name: "소상공인 기업형 홈페이지", slug: "business" },
  { name: "피부관리샵", slug: "skincare" },
  { name: "왁싱샵", slug: "waxing" },
  { name: "반영구샵", slug: "semipermanent" },
  { name: "애견미용", slug: "petgrooming" },
  { name: "반려동물 용품점", slug: "petshop" },
  { name: "인테리어 업체", slug: "interior" },
  { name: "이사 업체", slug: "moving" },
  { name: "키즈카페", slug: "kidscafe" },
  { name: "스터디카페", slug: "studycafe" },
  { name: "영어학원", slug: "english" },
  { name: "수학학원", slug: "math" },
  { name: "입시학원", slug: "academy" },
  { name: "개인과외", slug: "tutoring" },
  { name: "청소업체", slug: "cleaning" },
];

// Backward-compatible list of just the names.
export const CASE_INDUSTRIES = CASE_LIST.map((c) => c.name);

export function placeholderImage(seed: string, w = 800, h = 600): string {
  // picsum provides stable images per seed; safe, non-medical imagery.
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

export function caseDescription(industry: string): string {
  return `${industry} 업종 맞춤 전환 최적화 사례입니다. 문의 구조 설계와 상담 버튼 위치 최적화, 모바일 문의 동선 구성을 통해 상담 문의가 늘어난 프로젝트입니다. 제작부터 광고 연동, 운영 관리까지 WEFLOW가 함께했습니다.`;
}
