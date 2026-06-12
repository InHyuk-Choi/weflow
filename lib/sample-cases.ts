// Sample success-case industries from the WEFLOW manual (no medical content).
// Used by the seed script and as fallbacks. Images use a deterministic
// placeholder service.

export const CASE_INDUSTRIES = [
  "PT샵",
  "필라테스",
  "헬스장",
  "보험 설계",
  "법률 사무소",
  "자동차 디테일링",
  "렌터카 업체",
  "웨딩/스냅 업체",
  "세무사 사무소",
  "공인중개사",
  "카페",
  "미용실",
  "네일샵",
  "소상공인 기업형 홈페이지",
  "피부관리샵",
  "왁싱샵",
  "반영구샵",
  "애견미용",
  "반려동물 용품점",
  "인테리어 업체",
  "이사 업체",
  "키즈카페",
  "스터디카페",
  "영어학원",
  "수학학원",
  "입시학원",
  "개인과외",
  "청소업체",
];

export function placeholderImage(seed: string, w = 800, h = 600): string {
  // picsum provides stable images per seed; safe, non-medical imagery.
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

export function caseDescription(industry: string): string {
  return `${industry} 업종 맞춤 전환 최적화 사례입니다. 문의 구조 설계와 상담 버튼 위치 최적화, 모바일 문의 동선 구성을 통해 상담 문의가 늘어난 프로젝트입니다. 제작부터 광고 연동, 운영 관리까지 WEFLOW가 함께했습니다.`;
}
