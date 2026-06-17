import { InsightsPageClient, type InsightListItem } from "@/components/pages/insights-page-client";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getAllInsightFrontmatter } from "@/lib/insights/markdown";
import { getSanityClient } from "@/lib/sanity/client";
import { ALL_INSIGHTS_QUERY } from "@/lib/sanity/queries";
import type { Insight } from "@/lib/sanity/types";

export const metadata = buildMetadata(pageMetadata.insights);

function mapSanityInsight(item: Insight): InsightListItem {
  return {
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt || "",
    category: item.category || "Strategy",
    publishedAt: item.publishedAt || new Date().toISOString(),
  };
}

export default async function InsightsPage() {
  const bySlug = new Map<string, InsightListItem>();

  for (const item of getAllInsightFrontmatter()) {
    bySlug.set(item.slug, {
      ...item,
      readTime: item.readTime || "8 min read",
    });
  }

  try {
    const sanityInsights = await getSanityClient().fetch<Insight[]>(ALL_INSIGHTS_QUERY);
    for (const item of sanityInsights) {
      if (!bySlug.has(item.slug)) {
        bySlug.set(item.slug, mapSanityInsight(item));
      }
    }
  } catch {
    // markdown only
  }

  const items = Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
        ]}
      />
      <InsightsPageClient insights={items} />
    </PageShell>
  );
}
