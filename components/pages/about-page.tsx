import Link from "next/link";
import { Reveal } from "@/components/animation/motion";
import { DhCard, DhCtaBand, DhPageHero, DhSection, DhTextLink } from "@/components/layout/dh-primitives";
import { COMPANY } from "@/lib/company-config";
import { portfolioCompanies } from "@/lib/portfolio/companies";

export function AboutPageContent() {
  return (
    <>
      <DhPageHero
        eyebrow="About Digiteq"
        title="A technology holding company."
        lede="We build, acquire, supply and invest in technology — operating independent brands with shared capital and long-term ownership."
        titleClassName="max-w-[18ch]"
      />

      <DhSection className="!pt-0">
        <div className="grid gap-10 min-[860px]:grid-cols-[1.15fr_0.85fr] min-[860px]:gap-14">
          <div className="max-w-[640px] space-y-5">
            {[
              "Digiteq Holdings Limited is a UK technology holding company. The thesis is simple: technology creates the most value where the gap between demand and supply is widest.",
              "In mature markets that gap is narrow. In high-growth markets — particularly across Africa — it is large and still thinly served by serious operators.",
              "Each portfolio company is independently branded and run. Digiteq provides capital, strategic direction, and shared infrastructure so the brands can stay focused on customers.",
            ].map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.05 * i}>
                <p className="text-[15px] leading-[1.75] text-[var(--ink-dim)]">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <aside className="rounded-[2px] border border-[var(--rule)] bg-[var(--paper-2)] p-6">
              <p className="dh-mono mb-3 !text-[var(--brass)]">Registered entity</p>
              <p className="dh-display mb-3 text-[1.35rem] font-medium text-[var(--ink)]">
                {COMPANY.name}
              </p>
              <dl className="space-y-3 text-[14px] text-[var(--ink-dim)]">
                <div>
                  <dt className="dh-mono mb-1 !normal-case !tracking-normal !text-[var(--ink-faint)]">
                    Company number
                  </dt>
                  <dd className="dh-tabular text-[var(--ink)]">{COMPANY.number}</dd>
                </div>
                <div>
                  <dt className="dh-mono mb-1 !normal-case !tracking-normal !text-[var(--ink-faint)]">
                    Registered office
                  </dt>
                  <dd className="text-[var(--ink)]">{COMPANY.address.formatted}</dd>
                </div>
                <div>
                  <dt className="dh-mono mb-1 !normal-case !tracking-normal !text-[var(--ink-faint)]">
                    Jurisdiction
                  </dt>
                  <dd className="text-[var(--ink)]">{COMPANY.jurisdiction}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </DhSection>

      <DhSection tinted>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">Portfolio</span>
          </div>
          <h2 className="dh-page-h2 mb-3 max-w-[20ch]">Independent brands. Shared ownership.</h2>
          <p className="mb-8 max-w-[52ch] text-[15px] leading-[1.7] text-[var(--ink-dim)]">
            Digiteq sits behind the capital and governance. The brands keep their own identity,
            website and customer relationship.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {portfolioCompanies.map((company, i) => (
            <Reveal key={company.slug} delay={0.06 * i}>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <DhCard hover className="flex h-full min-h-[200px] flex-col justify-between">
                  <div>
                    <p className="dh-mono mb-3 !text-[var(--brass)]">{company.badge}</p>
                    <h3 className="dh-display mb-2 text-[1.35rem] font-medium">{company.name}</h3>
                    <p className="text-[14px] leading-[1.65] text-[var(--ink-dim)]">
                      {company.oneLiner}
                    </p>
                  </div>
                  <span className="dh-tlink mt-5 text-[13px]">{company.link} →</span>
                </DhCard>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-6">
            <DhTextLink href="/portfolio">View the full portfolio →</DhTextLink>
          </p>
        </Reveal>
      </DhSection>

      <DhSection>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">Team</span>
          </div>
          <h2 className="dh-page-h2 mb-8">Built by operators.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <DhCard className="max-w-[520px]">
            <h3 className="dh-page-h2 mb-1 text-[1.25rem]">Shane Powell</h3>
            <p className="dh-mono mb-4 !text-[var(--brass)]">Founder</p>
            <p className="mb-4 text-[14px] leading-[1.65] text-[var(--ink-dim)]">
              17 years across product delivery, consulting and digital transformation. Director at
              Turner and Townsend. Previously held directorial roles at AND Digital and RAD
              Consulting Group.
            </p>
            <p className="text-[14px] leading-[1.65] text-[var(--ink-dim)]">
              Building Digiteq as a holding company across brand, marketplace and enterprise supply.
            </p>
            <p className="mt-5">
              <Link href="/contact" className="dh-tlink text-[14px]">
                Contact Shane →
              </Link>
            </p>
          </DhCard>
        </Reveal>
      </DhSection>

      <DhCtaBand
        eyebrow="Contact"
        title="Interested in what we are building?"
        body="Founders, operators and partners — if the fit is right, we are open to the conversation."
        href="/contact"
        linkLabel="Start a conversation"
      />
    </>
  );
}
