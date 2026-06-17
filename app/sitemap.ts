import type { MetadataRoute } from "next";
import { getInsightSlugs } from "@/lib/insights/markdown";
import { siteUrl } from "@/lib/site";

const priorities: Record<string, number> = {
  "/": 1.0,
  "/portfolio": 0.9,
  "/investment": 0.9,
  "/insights": 0.8,
  "/about": 0.7,
  "/contact": 0.6,
  "/privacy": 0.4,
  "/terms": 0.4,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const routes = [
    "",
    "/about",
    "/portfolio",
    "/ventures",
    "/insights",
    "/investment",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: priorities[route] ?? 0.7,
  }));

  const insightEntries = getInsightSlugs().map((slug) => ({
    url: `${base}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...insightEntries];
}
