import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Reveal } from "@/components/animation/motion";
import { DhCard, DhSection } from "@/components/layout/dh-primitives";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { InsightFrontmatter } from "@/lib/insights/markdown";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function InsightArticle({
  frontmatter,
  content,
}: {
  frontmatter: InsightFrontmatter;
  content: string;
}) {
  const authorName = frontmatter.author;
  const initials = authorName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.excerpt}
        slug={frontmatter.slug}
        publishedAt={frontmatter.publishedAt}
        author={authorName}
        category={frontmatter.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          { name: frontmatter.title, href: `/insights/${frontmatter.slug}` },
        ]}
      />

      <DhSection className="!pb-0 !pt-[clamp(48px,8vh,80px)]">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/insights"
            className="dh-tlink mb-8 inline-flex items-center gap-2 text-[13px] text-[var(--ink-faint)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All insights
          </Link>

          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="dh-badge">{frontmatter.category}</span>
              <span className="text-[12px] text-[var(--ink-faint)]">
                {formatDate(frontmatter.publishedAt)}
              </span>
              {frontmatter.readTime ? (
                <span className="text-[12px] text-[var(--ink-faint)]">{frontmatter.readTime}</span>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="dh-page-h1 mb-6 max-w-[20ch]">{frontmatter.title}</h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mb-8 text-[18px] leading-[1.6] text-[var(--ink-dim)]">{frontmatter.excerpt}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-3 border-b border-[var(--rule)] pb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--rule)] bg-[var(--paper-2)] text-[11px] font-semibold text-[var(--ink)]">
                {initials}
              </div>
              <div>
                <div className="text-[13px] font-medium text-[var(--ink)]">{authorName}</div>
                <div className="text-[11px] text-[var(--ink-faint)]">Digiteq</div>
              </div>
            </div>
          </Reveal>
        </div>
      </DhSection>

      <DhSection className="!pt-12">
        <div className="prose-digiteq mx-auto max-w-[720px]">
          <Reveal>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Reveal>
        </div>
      </DhSection>

      <DhSection className="!pt-0">
        <div className="mx-auto max-w-[720px]">
          <DhCard>
            <h3 className="dh-page-h2 mb-2 text-[1.15rem]">Continue the conversation.</h3>
            <p className="mb-6 text-[14px] text-[var(--ink-dim)]">
              If this resonated, we are always open to talking with founders, operators and
              investors.
            </p>
            <Link href="/contact" className="dh-tlink inline-flex items-center gap-2 text-[13px]">
              Start a conversation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </DhCard>
        </div>
      </DhSection>
    </>
  );
}
