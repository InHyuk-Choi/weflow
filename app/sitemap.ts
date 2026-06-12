import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const paths = [
    "",
    "/services",
    "/pricing",
    "/success-cases",
    "/booking",
    "/free-diagnosis",
    "/contact",
    "/landing",
  ];
  const now = new Date();
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
