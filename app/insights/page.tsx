import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { insightsFallback } from "@/lib/fallbacks/home";
import { getSanityClient } from "@/lib/sanity/client";
import { ALL_INSIGHTS_QUERY } from "@/lib/sanity/queries";
import type { Insight } from "@/lib/sanity/types";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Insights" };

export default async function InsightsPage() {
  let insights: Insight[] = [];
  try {
    insights = await getSanityClient().fetch<Insight[]>(ALL_INSIGHTS_QUERY);
  } catch {
    insights = [];
  }

  const items =
    insights.length > 0
      ? insights
      : insightsFallback.map((i) => ({
          _id: i.slug,
          title: i.title,
          slug: i.slug,
          excerpt: i.excerpt,
          category: i.category,
        }));

  return (
    <ContentPage page="insights">
      <section className="px-6 pb-24 sm:px-12">
        <Container>
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item._id} className="p-6">
                {item.category && <Badge variant="violet">{item.category}</Badge>}
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  <Link href={`/insights/${item.slug}`} className="hover:text-cyan">
                    {item.title}
                  </Link>
                </h3>
                {item.excerpt && <p className="mt-2 text-sm text-muted">{item.excerpt}</p>}
                {"publishedAt" in item && item.publishedAt && (
                  <p className="mt-2 text-xs text-muted-dark">{formatDate(item.publishedAt)}</p>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </ContentPage>
  );
}
