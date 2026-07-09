import Link from "next/link";
import type { Insight } from "@/lib/sanity/types";
import { insightsFallback } from "@/lib/fallbacks/home";
import { HomeReveal } from "@/components/home/home-reveal";

function formatInsightDate(publishedAt?: string, index = 0): string {
  if (publishedAt) {
    const date = new Date(publishedAt);
    if (!Number.isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return `${year}·${month}`;
    }
  }
  const fallbackDates = ["2026·06", "2026·05", "2026·04"];
  return fallbackDates[index] ?? "2026·01";
}

type HomeInsightsProps = {
  insights: Insight[];
};

export function HomeInsights({ insights }: HomeInsightsProps) {
  const items =
    insights.length >= 3
      ? insights.slice(0, 3)
      : insightsFallback.slice(0, 3).map((item, i) => ({
          _id: item.slug,
          title: item.title,
          slug: item.slug,
          publishedAt: undefined,
          excerpt: item.excerpt,
        }));

  if (items.length < 3) return null;

  return (
    <section id="insights" className="dh-section">
      <div className="dh-container">
        <HomeReveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">From the insights desk</span>
          </div>
          <h2 className="dh-h2">Insights on building, acquiring and scaling.</h2>
        </HomeReveal>

        <div className="mt-[clamp(36px,5vh,56px)] border-t border-[var(--rule)]">
          {items.map((item, index) => (
            <HomeReveal key={item._id} delay={index * 0.05}>
              <Link
                href={`/insights/${item.slug}`}
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-[clamp(16px,3vw,40px)] border-b border-[var(--rule)] py-5 transition-[padding,background] duration-250 hover:bg-[linear-gradient(90deg,var(--ledger-soft),transparent_60%)] hover:pl-3 max-[600px]:grid-cols-[1fr_auto]"
              >
                <span className="dh-mono text-[0.72rem] tracking-[0.1em] text-[var(--brass)] max-[600px]:col-span-2">
                  {formatInsightDate(item.publishedAt, index)}
                </span>
                <span className="dh-display text-[1.25rem] font-medium">{item.title}</span>
                <span className="text-[var(--ink-faint)] transition-colors hover:text-[var(--ledger)]">→</span>
              </Link>
            </HomeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
