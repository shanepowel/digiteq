import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { DhCard, DhPageHero, DhSection } from "@/components/layout/dh-primitives";
import type { CaseStudy } from "@/lib/sanity/types";

export type CaseStudyListItem = Pick<
  CaseStudy,
  "slug" | "title" | "challenge" | "solution" | "featuredImage"
> & { clientName?: string };

export function CaseStudiesPage({ items }: { items: CaseStudyListItem[] }) {
  return (
    <>
      <DhPageHero
        eyebrow="Case studies"
        title="Proof in operating systems."
        lede="Selected work across the portfolio — what we changed, why it mattered, and the measurable outcomes."
        titleClassName="max-w-[16ch]"
      />

      <DhSection className="!pt-0">
        {items.length > 0 ? (
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <StaggerItem key={item.slug}>
                <Link href={`/case-studies/${item.slug}`} className="block h-full">
                  <DhCard hover className="flex h-full min-h-[260px] flex-col">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-[18px] font-semibold text-[var(--ink)]">{item.title}</h3>
                      <ArrowRight className="h-4 w-4 text-[var(--ledger)] opacity-70" />
                    </div>
                    {item.clientName ? (
                      <p className="dh-mono mb-3 !text-[var(--ink-faint)]">{item.clientName}</p>
                    ) : null}
                    {item.challenge ? (
                      <p className="mb-4 line-clamp-4 text-[13px] leading-[1.6] text-[var(--ink-dim)]">
                        {item.challenge}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <span className="dh-tlink mt-auto inline-flex items-center gap-1.5 text-[13px]">
                      Read case study <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </DhCard>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <p className="text-[var(--ink-dim)]">
              Case studies will appear here once published in Sanity.
            </p>
          </Reveal>
        )}
      </DhSection>
    </>
  );
}
