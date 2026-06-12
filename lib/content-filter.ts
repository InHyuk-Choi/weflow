// Prohibited-content detection — blocks medical / hospital / healthcare /
// pharmaceutical / diagnostic / clinical terminology from success cases.

const PROHIBITED_KEYWORDS = [
  // Korean
  "병원",
  "의료",
  "의원",
  "клиник",
  "진료",
  "치료",
  "처방",
  "약국",
  "제약",
  "수술",
  "환자",
  "질병",
  "질환",
  "임상",
  "의사",
  "한의원",
  "치과",
  "성형외과",
  "피부과",
  "정형외과",
  "내과",
  "외과",
  "백신",
  "의약품",
  "진단기",
  "의료기기",
  // English
  "hospital",
  "medical",
  "clinic",
  "clinical",
  "pharmaceutical",
  "pharmacy",
  "diagnosis",
  "diagnostic",
  "treatment",
  "patient",
  "surgery",
  "surgical",
  "prescription",
  "vaccine",
  "disease",
  "healthcare",
  "therapy",
];

export interface ContentCheckResult {
  ok: boolean;
  field?: string;
  keyword?: string;
}

function findKeyword(text: string): string | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  for (const kw of PROHIBITED_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) return kw;
  }
  return null;
}

// Checks the given named fields; returns the first field that violates.
export function checkProhibitedContent(
  fields: Record<string, string | null | undefined>
): ContentCheckResult {
  for (const [field, value] of Object.entries(fields)) {
    const kw = findKeyword(value ?? "");
    if (kw) return { ok: false, field, keyword: kw };
  }
  return { ok: true };
}
