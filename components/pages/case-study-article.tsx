import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { DhCard, DhSection } from "@/components/layout/dh-primitives";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { urlFor } from "@/lib/sanity/image";
import type { CaseStudy } from "@/lib/sanity/types";

function ResultCard({ metric, value }: { metric?: string; value?: string }) {
  if (!metric && !value) return null;

  return (
    <DhCard>
      <div className="dh-mono !text-[var(--ink-faint)]">{metric || "Result"}</div>
      <div className="mt-2 text-[22px] font-semibold text-[var(--ink)]">{value || "—"}</div>
    </DhCard>
  );
}

export function CaseStudyArticle({ caseStudy }: { caseStudy: CaseStudy }) {
  const results = caseStudy.results?.filter((r) => r.metric || r.value) ?? [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: caseStudy.title, href: `/case-studies/${caseStudy.slug}` },
        ]}
      />

      <DhSection className="!pb-0 !pt-[clamp(48px,8vh,80px)]">
        <div className="mx-auto max-w-[820px]">
          <Link
            href="/case-studies"
            className="dh-tlink mb-8 inline-flex items-center gap-2 text-[13px] text-[var(--ink-faint)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All case studies
          </Link>

          {caseStudy.client?.name ? (
            <Reveal>
              <p className="dh-mono mb-4 !text-[var(--brass)]">{caseStudy.client.name}</p>
            </Reveal>
          ) : null}

          <Reveal delay={0.1}>
            <h1 className="dh-page-h1 mb-6 max-w-[18ch]">{caseStudy.title}</h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border-b border-[var(--rule)] pb-8 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
              {caseStudy.challenge || caseStudy.solution || "Published operating work."}
            </div>
          </Reveal>
        </div>
      </DhSection>

      {results.length > 0 ? (
        <DhSection className="!pt-12">
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <h2 className="dh-mono mb-4">Results</h2>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {results.map((r, i) => (
                <StaggerItem key={`${r.metric ?? "result"}-${i}`}>
                  <ResultCard metric={r.metric} value={r.value} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </DhSection>
      ) : null}

      {(caseStudy.challenge || caseStudy.solution) && (
        <DhSection className={results.length > 0 ? "!pt-0" : "!pt-12"}>
          <div className="mx-auto grid max-w-[820px] gap-6 lg:grid-cols-2">
            {caseStudy.challenge ? (
              <Reveal>
                <DhCard>
                  <div className="dh-mono mb-3">Challenge</div>
                  <p className="text-[14px] leading-[1.7] text-[var(--ink-dim)]">{caseStudy.challenge}</p>
                </DhCard>
              </Reveal>
            ) : null}
            {caseStudy.solution ? (
              <Reveal delay={0.1}>
                <DhCard>
                  <div className="dh-mono mb-3">Solution</div>
                  <p className="text-[14px] leading-[1.7] text-[var(--ink-dim)]">{caseStudy.solution}</p>
                </DhCard>
              </Reveal>
            ) : null}
          </div>
        </DhSection>
      )}

      {caseStudy.content && caseStudy.content.length > 0 ? (
        <DhSection>
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <div className="prose-digiteq">
                <PortableText
                  value={caseStudy.content}
                  components={{
                    types: {
                      image: ({ value }) => {
                        const src = urlFor(value).width(1600).quality(85).url();
                        return (
                          <div className="my-8 overflow-hidden rounded-[2px] border border-[var(--rule)] bg-[var(--paper-2)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={value?.alt || ""} className="w-full" />
                          </div>
                        );
                      },
                    },
                  }}
                />
              </div>
            </Reveal>
          </div>
        </DhSection>
      ) : null}
    </>
  );
}
