import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import type { CaseStudy } from "@/lib/sanity/types";

export type CaseStudyListItem = Pick<
  CaseStudy,
  "slug" | "title" | "challenge" | "solution" | "featuredImage"
> & { clientName?: string };

export function CaseStudiesPage({ items }: { items: CaseStudyListItem[] }) {
  return (
    <>
      <section className="px-12 pt-32 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#00D4FF] uppercase">
              Case studies
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-6 max-w-[720px] text-[52px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
              Proof in operating systems.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-[560px] text-lg leading-relaxed text-gray-400">
              Selected work across the portfolio — what we changed, why it mattered, and the
              measurable outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[60px]">
        <div className="mx-auto max-w-[1200px]">
          {items.length > 0 ? (
            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <StaggerItem key={item.slug}>
                  <Link href={`/case-studies/${item.slug}`} className="block h-full">
                    <div className="flex h-full min-h-[260px] flex-col rounded-xl border border-white/[0.06] bg-[#0E1020] p-6 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#13152A]">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-[18px] font-semibold text-white">{item.title}</h3>
                        <ArrowRight className="h-4 w-4 text-cyan opacity-70" />
                      </div>
                      {item.clientName ? (
                        <p className="mb-3 text-[11px] font-medium tracking-[0.1em] text-gray-600 uppercase">
                          {item.clientName}
                        </p>
                      ) : null}
                      {item.challenge ? (
                        <p className="mb-4 line-clamp-4 text-[13px] leading-[1.6] text-gray-400">
                          {item.challenge}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}
                      <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF]">
                        Read case study <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Reveal>
              <p className="text-gray-400">
                Case studies will appear here once published in Sanity.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

