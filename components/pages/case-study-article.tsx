import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { urlFor } from "@/lib/sanity/image";
import type { CaseStudy } from "@/lib/sanity/types";

function ResultCard({ metric, value }: { metric?: string; value?: string }) {
  if (!metric && !value) return null;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0E1020] p-6">
      <div className="text-[11px] font-semibold tracking-[0.14em] text-gray-600 uppercase">
        {metric || "Result"}
      </div>
      <div className="mt-2 text-[22px] font-semibold text-white">{value || "—"}</div>
    </div>
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

      <section className="px-12 pt-28">
        <div className="mx-auto max-w-[820px]">
          <Link
            href="/case-studies"
            className="mb-8 inline-flex items-center gap-2 text-[13px] text-gray-500 transition-colors hover:text-gray-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All case studies
          </Link>
        </div>
      </section>

      <section className="px-12 pb-10">
        <div className="mx-auto max-w-[820px]">
          {caseStudy.client?.name ? (
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#00D4FF] uppercase">
                {caseStudy.client.name}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.1}>
            <h1 className="mb-6 text-[44px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
              {caseStudy.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border-b border-white/[0.06] pb-8 text-[15px] leading-[1.7] text-gray-400">
              {caseStudy.challenge || caseStudy.solution || "Published operating work."}
            </div>
          </Reveal>
        </div>
      </section>

      {results.length > 0 ? (
        <section className="px-12 pb-16">
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <h2 className="mb-4 text-[12px] font-semibold tracking-[0.14em] text-gray-600 uppercase">
                Results
              </h2>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {results.map((r, i) => (
                <StaggerItem key={`${r.metric ?? "result"}-${i}`}>
                  <ResultCard metric={r.metric} value={r.value} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {(caseStudy.challenge || caseStudy.solution) && (
        <section className="px-12 pb-16">
          <div className="mx-auto grid max-w-[820px] gap-6 lg:grid-cols-2">
            {caseStudy.challenge ? (
              <Reveal>
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1020] p-6">
                  <div className="text-[12px] font-semibold tracking-[0.14em] text-gray-600 uppercase">
                    Challenge
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.7] text-gray-400">
                    {caseStudy.challenge}
                  </p>
                </div>
              </Reveal>
            ) : null}
            {caseStudy.solution ? (
              <Reveal delay={0.1}>
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1020] p-6">
                  <div className="text-[12px] font-semibold tracking-[0.14em] text-gray-600 uppercase">
                    Solution
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.7] text-gray-400">
                    {caseStudy.solution}
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      )}

      {caseStudy.content && caseStudy.content.length > 0 ? (
        <section className="px-12 pb-24">
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
                          <div className="my-8 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0E1020]">
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
        </section>
      ) : null}
    </>
  );
}

