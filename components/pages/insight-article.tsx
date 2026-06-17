import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Reveal } from "@/components/animation/motion";
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

      <section className="px-12 pt-28">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/insights"
            className="mb-8 inline-flex items-center gap-2 text-[13px] text-gray-500 transition-colors hover:text-gray-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All insights
          </Link>
        </div>
      </section>

      <section className="px-12 pb-12">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#00D4FF]">
                {frontmatter.category}
              </span>
              <span className="text-[12px] text-gray-600">
                {formatDate(frontmatter.publishedAt)}
              </span>
              {frontmatter.readTime ? (
                <span className="text-[12px] text-gray-600">{frontmatter.readTime}</span>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mb-6 text-[40px] font-bold leading-[1.15] tracking-[-0.01em] text-white">
              {frontmatter.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mb-8 text-[18px] leading-[1.6] text-gray-400">{frontmatter.excerpt}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] bg-[#0E1020] text-[11px] font-semibold text-white">
                {initials}
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">{authorName}</div>
                <div className="text-[11px] text-gray-500">Digiteq</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-12 pb-24">
        <div className="prose-digiteq mx-auto max-w-[720px]">
          <Reveal>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Reveal>
        </div>
      </section>

      <section className="px-12 pb-24">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded-xl border border-white/[0.06] bg-[#0E1020] p-8">
            <h3 className="mb-2 text-[18px] font-semibold text-white">Continue the conversation.</h3>
            <p className="mb-6 text-[14px] text-gray-400">
              If this resonated, we are always open to talking with founders, operators and
              investors.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#00D4FF]"
            >
              Start a conversation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
