import { prisma } from "./db";
import { CASE_INDUSTRIES, placeholderImage, caseDescription } from "./sample-cases";

export interface DisplayCase {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

// Fetch published success cases; on any DB error (e.g. no DB configured during
// local preview) fall back to manual-derived sample cases so pages still render.
export async function getPublishedCases(limit?: number): Promise<DisplayCase[]> {
  try {
    const rows = await prisma.successCase.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        imageUrl: r.imageUrl,
        description: r.description,
      }));
    }
  } catch {
    // fall through to sample data
  }
  const industries = limit ? CASE_INDUSTRIES.slice(0, limit) : CASE_INDUSTRIES;
  return industries.map((industry) => ({
    id: `sample-${encodeURIComponent(industry)}`,
    title: `${industry} 성공 사례`,
    imageUrl: placeholderImage(industry),
    description: caseDescription(industry),
  }));
}

export async function getCaseById(id: string): Promise<DisplayCase | null> {
  try {
    const r = await prisma.successCase.findUnique({ where: { id } });
    if (r) {
      return {
        id: r.id,
        title: r.title,
        imageUrl: r.imageUrl,
        description: r.description,
      };
    }
  } catch {
    // fall through
  }
  // Sample fallback for `sample-<industry>` ids.
  if (id.startsWith("sample-")) {
    const industry = decodeURIComponent(id.replace("sample-", ""));
    if (CASE_INDUSTRIES.includes(industry)) {
      return {
        id,
        title: `${industry} 성공 사례`,
        imageUrl: placeholderImage(industry, 1200, 800),
        description: caseDescription(industry),
      };
    }
  }
  return null;
}
