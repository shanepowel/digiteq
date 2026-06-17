"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";

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
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function InsightsPageClient({ insights }: { insights: InsightListItem[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? insights
    : insights.filter(i => i.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Insights
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6 max-w-[640px]">
              Thinking in digital equity.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[480px]">
              Operator notes on building, acquiring and scaling digital businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-12 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-2 border-b border-white/[0.06] pb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#0E1020] text-white border border-white/[0.12]'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article list */}
      <section className="py-[60px] px-12">
        <div className="max-w-[1200px] mx-auto">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-[14px]">No articles in this category yet.</p>
          ) : (
            <Stagger className="grid grid-cols-1 gap-0 max-w-[760px]" staggerDelay={0.06}>
              {filtered.map((article) => (
                <StaggerItem key={article.slug}>
                  <Link href={`/insights/${article.slug}`}
                    className="block border-b border-white/[0.06] py-8 group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-white/[0.06] text-[#00D4FF]">
                        {article.category}
                      </span>
                      <span className="text-[12px] text-gray-600">
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="text-[12px] text-gray-600">
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-[22px] font-semibold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[14px] leading-[1.6] text-gray-400 mb-3">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="bg-[#0E1020] border border-white/[0.06] rounded-xl p-12 max-w-[600px]">
              <h2 className="text-[24px] font-semibold text-white mb-2">Stay in the loop.</h2>
              <p className="text-[14px] text-gray-400 mb-6">
                New insights on building, acquiring and scaling digital businesses. No spam. Unsubscribe any time.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                />
                <button
                  className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white inline-flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #D946EF, #FF2D7B)' }}
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
