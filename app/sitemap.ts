import type { MetadataRoute } from "next";
import { getInsightSlugs } from "@/lib/insights/markdown";
import { siteUrl } from "@/lib/site";
import { getSanityClient } from "@/lib/sanity/client";
import { ALL_CASE_STUDY_SLUGS } from "@/lib/sanity/queries";

const priorities: Record<string, number> = {
  "/": 1.0,
  "/portfolio": 0.9,
  "/investment": 0.9,
  "/insights": 0.8,
  "/case-studies": 0.75,
  "/about": 0.7,
  "/contact": 0.6,
  "/privacy": 0.4,
  "/terms": 0.4,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;
  const routes = [
    "",
    "/about",
    "/portfolio",
    "/ventures",
    "/insights",
    "/case-studies",
    "/investment",
    "/invest",
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

  let caseStudyEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(ALL_CASE_STUDY_SLUGS);
    caseStudyEntries = slugs.map(({ slug }) => ({
      url: `${base}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
  } catch {
    caseStudyEntries = [];
  }

  return [...staticEntries, ...insightEntries, ...caseStudyEntries];
}
