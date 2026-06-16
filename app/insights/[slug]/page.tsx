import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { insightsFallback } from "@/lib/fallbacks/home";
import { getSanityClient } from "@/lib/sanity/client";
import { INSIGHT_BY_SLUG } from "@/lib/sanity/queries";
import type { Insight } from "@/lib/sanity/types";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const staticInsights = Object.fromEntries(
  insightsFallback.map((item) => [item.slug, item]),
);

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const fallback = staticInsights[slug];
  if (fallback) {
    return { title: fallback.title, description: fallback.excerpt };
  }

  try {
    const insight = await getSanityClient().fetch<Insight | null>(INSIGHT_BY_SLUG, { slug });
    return {
      title: insight?.seo?.title || insight?.title || "Insight",
      description: insight?.seo?.description || insight?.excerpt,
    };
  } catch {
    return { title: "Insight" };
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getSanityClient().fetch<{ slug: string }[]>(
      `*[_type == "insight" && defined(slug.current)]{ "slug": slug.current }`,
    );
    if (slugs.length > 0) return slugs.map(({ slug }) => ({ slug }));
  } catch {
    // Sanity not configured
  }
  return insightsFallback.map((item) => ({ slug: item.slug }));
}

async function getInsight(slug: string): Promise<Insight | null> {
  const fallback = staticInsights[slug];
  if (fallback) {
    return {
      _id: fallback.slug,
      title: fallback.title,
      slug: fallback.slug,
      excerpt: fallback.excerpt,
      category: fallback.category,
    };
  }

  try {
    return await getSanityClient().fetch<Insight | null>(INSIGHT_BY_SLUG, { slug });
  } catch {
    return null;
  }
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsight(slug);

  if (!insight) notFound();

  return (
    <>
      <Nav />
      <main className="pt-16">
        <article className="px-6 py-24 sm:px-12">
          <Container className="max-w-3xl">
            {insight.category && <Badge variant="violet">{insight.category}</Badge>}
            <h1 className="mt-4 text-4xl font-bold text-foreground">{insight.title}</h1>
            {insight.publishedAt && (
              <p className="mt-4 text-sm text-muted-dark">{formatDate(insight.publishedAt)}</p>
            )}
            {insight.excerpt && (
              <p className="mt-6 text-lg text-muted">{insight.excerpt}</p>
            )}
            {insight.author?.name && (
              <p className="mt-8 text-sm text-muted">By {insight.author.name}</p>
            )}
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
