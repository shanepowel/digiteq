"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { DhCard, DhPageHero, DhSection } from "@/components/layout/dh-primitives";
import { cn } from "@/lib/utils";

export type InsightListItem = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime?: string;
};

const categories = ["All", "Acquisitions", "Technology", "Strategy", "Growth", "Portfolio"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function InsightsPageClient({ insights }: { insights: InsightListItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? insights : insights.filter((i) => i.category === activeCategory);

  return (
    <>
      <DhPageHero
        eyebrow="Insights"
        title="Thinking in digital equity."
        lede="Operator notes on building, acquiring and scaling digital businesses."
        titleClassName="max-w-[14ch]"
      />

      <DhSection className="!pt-0 !pb-8">
        <div className="flex flex-wrap gap-2 border-b border-[var(--rule)] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "dh-filter rounded-[2px] px-4 py-2 text-[13px] font-medium transition-colors",
                activeCategory === cat && "dh-filter-active",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </DhSection>

      <DhSection className="!pt-0">
        {filtered.length === 0 ? (
          <p className="text-[14px] text-[var(--ink-faint)]">No articles in this category yet.</p>
        ) : (
          <Stagger className="max-w-[760px] grid-cols-1 gap-0" staggerDelay={0.06}>
            {filtered.map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="group block border-b border-[var(--rule)] py-8"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="dh-badge">{article.category}</span>
                    <span className="text-[12px] text-[var(--ink-faint)]">
                      {formatDate(article.publishedAt)}
                    </span>
                    {article.readTime ? (
                      <span className="text-[12px] text-[var(--ink-faint)]">{article.readTime}</span>
                    ) : null}
                  </div>
                  <h2 className="dh-page-h2 mb-2 text-[1.35rem] transition-colors group-hover:text-[var(--ledger)]">
                    {article.title}
                  </h2>
                  <p className="mb-3 text-[14px] leading-[1.6] text-[var(--ink-dim)]">{article.excerpt}</p>
                  <span className="dh-tlink inline-flex items-center gap-1.5 text-[13px] opacity-0 transition-opacity group-hover:opacity-100">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </DhSection>

      <DhSection tinted>
        <Reveal>
          <DhCard className="max-w-[600px]">
            <h2 className="dh-page-h2 mb-2 text-[1.35rem]">Stay in the loop.</h2>
            <p className="mb-6 text-[14px] text-[var(--ink-dim)]">
              New insights on building, acquiring and scaling digital businesses. No spam. Unsubscribe
              any time.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email"
                className="dh-input flex-1"
              />
              <button type="button" className="dh-btn dh-btn-fill inline-flex items-center gap-1.5 whitespace-nowrap">
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </DhCard>
        </Reveal>
      </DhSection>
    </>
  );
}
