import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/animation/motion";
import { DhCard, DhPageHero, DhSection } from "@/components/layout/dh-primitives";
import type { PortfolioCompanyCard } from "@/lib/portfolio/cards";

export function PortfolioPageContent({ companies }: { companies: PortfolioCompanyCard[] }) {
  return (
    <>
      <DhPageHero
        eyebrow="Portfolio"
        title="Companies we build and scale."
        lede="Independent brands across brand development, marketplace platforms, and enterprise technology supply."
        titleClassName="max-w-[16ch]"
      />

      <DhSection className="!pt-0">
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {companies.map((c) => (
            <StaggerItem key={c.slug}>
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="block h-full">
                <DhCard hover className="flex h-full min-h-[280px] flex-col justify-between">
                  <div>
                    <p className="dh-mono mb-4 !text-[var(--brass)]">{c.category}</p>
                    <h3 className="dh-page-h2 mb-3 text-[1.35rem]">{c.name}</h3>
                    <p className="text-[14px] leading-[1.6] text-[var(--ink-dim)]">{c.description}</p>
                  </div>
                  <span className="dh-tlink mt-6 inline-flex items-center gap-1.5 text-[13px]">
                    Visit site <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </DhCard>
              </a>
            </StaggerItem>
          ))}

          <StaggerItem>
            <Link href="/investment" className="block h-full">
              <DhCard className="flex h-full min-h-[280px] flex-col items-center justify-center border-dashed text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rule)]">
                  <span className="text-[20px] text-[var(--ink-faint)]">+</span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-[var(--ink)]">Your business here</h3>
                <p className="mb-4 max-w-[200px] text-[13px] text-[var(--ink-dim)]">
                  We actively evaluate acquisition targets across digital and supply chain businesses.
                </p>
                <span className="dh-tlink inline-flex items-center gap-1.5 text-[13px]">
                  Learn about acquisitions <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </DhCard>
            </Link>
          </StaggerItem>
        </Stagger>
      </DhSection>
    </>
  );
}
