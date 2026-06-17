import { notFound } from "next/navigation";
import { InsightArticle } from "@/components/pages/insight-article";
import { PageShell } from "@/components/layout/page-shell";
import { buildMetadata } from "@/components/seo/metadata";
import { getInsightMarkdown, getInsightSlugs } from "@/lib/insights/markdown";
import { getSanityClient } from "@/lib/sanity/client";
import { ALL_INSIGHT_SLUGS, INSIGHT_BY_SLUG } from "@/lib/sanity/queries";
import type { Insight } from "@/lib/sanity/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = new Set(getInsightSlugs());

  try {
    const sanitySlugs = await getSanityClient().fetch<{ slug: string }[]>(ALL_INSIGHT_SLUGS);
    for (const { slug } of sanitySlugs) slugs.add(slug);
  } catch {
    // markdown slugs only
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const markdown = getInsightMarkdown(slug);

  if (markdown) {
    return buildMetadata({
      title:
        markdown.frontmatter.seo?.title?.replace(" | Digiteq Insights", "") ||
        markdown.frontmatter.title,
      description: markdown.frontmatter.seo?.description || markdown.frontmatter.excerpt,
      path: `/insights/${slug}`,
    });
  }

  try {
    const insight = await getSanityClient().fetch<Insight | null>(INSIGHT_BY_SLUG, { slug });
    if (insight) {
      return buildMetadata({
        title: insight.seo?.title || insight.title,
        description: insight.seo?.description || insight.excerpt || "",
        path: `/insights/${slug}`,
      });
    }
  } catch {
    // fall through
  }

  return { title: "Insight" };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const markdown = getInsightMarkdown(slug);

  if (!markdown) {
    notFound();
  }

  return (
    <PageShell>
      <InsightArticle frontmatter={markdown.frontmatter} content={markdown.content} />
    </PageShell>
  );
}
