import { CASE_LIST, caseDescription } from "./sample-cases";

export interface DisplayCase {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

// Success cases are code-driven (no DB/admin). Each industry maps to a
// /public/cases/<slug>.jpg image. The slug doubles as the route id.
function toCase(c: { name: string; slug: string }): DisplayCase {
  return {
    id: c.slug,
    title: `${c.name} 성공 사례`,
    imageUrl: `/cases/${c.slug}.jpg`,
    description: caseDescription(c.name),
  };
}

export async function getPublishedCases(limit?: number): Promise<DisplayCase[]> {
  const list = limit ? CASE_LIST.slice(0, limit) : CASE_LIST;
  return list.map(toCase);
}

export async function getCaseById(id: string): Promise<DisplayCase | null> {
  const c = CASE_LIST.find((x) => x.slug === id);
  return c ? toCase(c) : null;
}
