import { Reveal } from "@/components/animation/motion";
import { DhCard, DhCtaBand, DhPageHero, DhSection } from "@/components/layout/dh-primitives";

const narrative = [
  "Digiteq is a technology holding company registered in the UK. We build, acquire, supply, and invest in technology businesses.",
  "The company was founded on a straightforward observation: technology creates the most value where the gap between demand and supply is widest. In mature markets, that gap is narrow. In high-growth markets, particularly across Africa, it is enormous and largely unaddressed by established players.",
  "Digiteq operates a portfolio of companies spanning digital brand development, marketplace platforms, and enterprise technology supply. Each portfolio company is independently branded and operated, with Digiteq providing capital, strategic direction, and shared infrastructure.",
  "Our supply division, Konduit, sources enterprise hardware and IT infrastructure from authorised European distributors and delivers it into Southern African markets with full manufacturer warranty, compliance documentation, and in-region support. It is our first expression of the thesis that technology supply chains in high-growth markets are ripe for professionalisation.",
  "Digiteq Holdings Limited is the parent entity, registered at Companies House.",
];

const portfolioList = [
  { name: "BMKRS", description: "a brand company run by builders" },
  { name: "FreelanceNearMe", description: "a marketplace connecting businesses with local freelancers" },
  { name: "Konduit", description: "enterprise technology supply for Southern Africa" },
];

export function AboutPageContent() {
  return (
    <>
      <DhPageHero
        eyebrow="About Digiteq"
        title="A technology holding company."
        titleClassName="max-w-[20ch]"
      />

      <DhSection className="!pt-0">
        <div className="max-w-[640px] space-y-5">
          {narrative.map((paragraph, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-[15px] leading-[1.7] text-[var(--ink-dim)]">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </DhSection>

      <DhSection tinted>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">How we are structured</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-8 max-w-[640px] text-[15px] leading-[1.7] text-[var(--ink-dim)]">
            Digiteq Holdings Limited is the parent company. Portfolio companies operate as
            independent brands with their own identities, websites, and customer relationships.
            The holding company provides capital allocation, strategic oversight, and shared
            services including technology infrastructure, legal, and finance.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mb-4 text-[14px] font-semibold text-[var(--ink)]">Current portfolio:</p>
          <ul className="max-w-[640px] space-y-3">
            {portfolioList.map((item) => (
              <li key={item.name} className="text-[15px] leading-[1.7] text-[var(--ink-dim)]">
                <span className="font-medium text-[var(--ink)]">{item.name}:</span> {item.description}
              </li>
            ))}
          </ul>
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
          <DhCard className="max-w-[480px]">
            <h3 className="dh-page-h2 mb-1 text-[1.25rem]">Shane Powell</h3>
            <p className="dh-mono mb-4 !text-[var(--brass)]">Founder</p>
            <p className="mb-4 text-[14px] leading-[1.65] text-[var(--ink-dim)]">
              17 years across product delivery, consulting and digital transformation. Director at
              Turner and Townsend. Previously held directorial roles at AND Digital and RAD
              Consulting Group. Built and scaled teams across public sector, utilities,
              infrastructure and regulated industries.
            </p>
            <p className="text-[14px] leading-[1.65] text-[var(--ink-dim)]">
              Building Digiteq as a technology holding company across digital brands, marketplace
              platforms, and enterprise technology supply.
            </p>
          </DhCard>
        </Reveal>
      </DhSection>

      <DhCtaBand
        eyebrow="Contact"
        title="Interested in what we are building?"
        body="Whether you are a founder, an investor, or a potential partner, we are always open to the right conversation."
        href="/contact"
        linkLabel="Start a conversation"
      />
    </>
  );
}
