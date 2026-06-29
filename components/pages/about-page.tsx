import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animation/motion";

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
      <section className="px-12 pb-24 pt-32">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              About Digiteq
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-8 max-w-[700px] text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              A technology holding company.
            </h1>
          </Reveal>
          <div className="max-w-[640px] space-y-5">
            {narrative.map((paragraph, i) => (
              <Reveal key={i} delay={0.15 + i * 0.05}>
                <p className="text-[15px] leading-[1.7] text-gray-400">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              How we are structured
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-8 max-w-[640px] text-[15px] leading-[1.7] text-gray-400">
              Digiteq Holdings Limited is the parent company. Portfolio companies operate as
              independent brands with their own identities, websites, and customer relationships.
              The holding company provides capital allocation, strategic oversight, and shared
              services including technology infrastructure, legal, and finance.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mb-4 text-[14px] font-semibold text-white">Current portfolio:</p>
            <ul className="max-w-[640px] space-y-3">
              {portfolioList.map((item) => (
                <li key={item.name} className="text-[15px] leading-[1.7] text-gray-400">
                  <span className="font-medium text-white">{item.name}:</span> {item.description}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              Team
            </p>
            <h2 className="mb-12 text-[30px] font-semibold text-white">Built by operators.</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-[480px] rounded-xl border border-white/[0.06] bg-[#0E1020] p-8">
              <h3 className="mb-1 text-[18px] font-semibold text-white">Shane Powell</h3>
              <p className="mb-4 text-[13px] text-[#00D4FF]">Founder</p>
              <p className="mb-4 text-[14px] leading-[1.65] text-gray-400">
                17 years across product delivery, consulting and digital transformation. Director at
                Turner and Townsend. Previously held directorial roles at AND Digital and RAD
                Consulting Group. Built and scaled teams across public sector, utilities,
                infrastructure and regulated industries.
              </p>
              <p className="text-[14px] leading-[1.65] text-gray-400">
                Building Digiteq as a technology holding company across digital brands, marketplace
                platforms, and enterprise technology supply.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0C0D1A] to-[#111330] p-16">
              <h2 className="mb-4 text-[32px] font-bold text-white">
                Interested in what we are building?
              </h2>
              <p className="mb-8 max-w-[400px] text-[15px] text-gray-400">
                Whether you are a founder, an investor, or a potential partner, we are always open
                to the right conversation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-3.5 text-sm font-medium text-white"
                style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6)" }}
              >
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
