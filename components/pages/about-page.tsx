import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";

const pillars = [
  {
    title: 'Create',
    description:
      'Launch owned brands and products where Digiteq can compound audience, capability and data. Every new venture starts with a thesis on defensible organic demand.',
    metrics: '2 brands launched',
  },
  {
    title: 'Acquire',
    description:
      'Partner with founders or buy profitable digital assets with clear operational upside. We look for revenue durability, organic demand and clean financials.',
    metrics: 'Active pipeline',
  },
  {
    title: 'Scale',
    description:
      'Apply shared growth, content, automation and technology systems across the portfolio. Each company benefits from capabilities built across the group.',
    metrics: 'Shared systems',
  },
  {
    title: 'Integrate',
    description:
      'Turn separate ventures into a coordinated group with unified data, shared infrastructure and cross-portfolio intelligence.',
    metrics: 'Single operating layer',
  },
];

const principles = [
  {
    title: 'Own, don\'t rent',
    body: 'We build owned assets that compound. Organic traffic over paid dependency. Subscriber lists over rented audiences. Brand equity over campaign spend.',
  },
  {
    title: 'Systems over heroics',
    body: 'Every repeatable process gets documented, automated and shared. The portfolio grows through systems, not through any individual working harder.',
  },
  {
    title: 'Specific over abstract',
    body: 'We measure outcomes in revenue, traffic, conversion and margin. Avoid adjectives. Show the numbers.',
  },
  {
    title: 'Speed with intent',
    body: 'We move quickly on decisions and slowly on commitments. Acquisition conversations conclude in weeks, not months. But due diligence is thorough.',
  },
  {
    title: 'Compounding advantage',
    body: 'Every decision is evaluated on whether it compounds. Content that ranks tomorrow. Audiences that grow without additional spend. Infrastructure that serves the next acquisition.',
  },
];

export function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              About Digiteq
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6 max-w-[700px]">
              A digital group built for compounding ownership.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[560px] mb-10">
              Digiteq is the holding company layer for digital brands, products and media properties. We create, acquire and scale assets that compound into lasting digital equity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Operating Model - 4 pillars */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Operating Model
            </p>
            <h2 className="text-[30px] font-semibold text-white mb-12">
              Four stages. One compounding cycle.
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="bg-[#0E1020] border border-white/[0.06] rounded-xl p-6
                  hover:bg-[#13152A] hover:border-white/[0.12] transition-all duration-200 h-full">
                  <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-500 mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="text-[18px] font-semibold text-white mb-3">{p.title}</h3>
                  <p className="text-[13px] leading-[1.6] text-gray-400 mb-6">{p.description}</p>
                  <div className="border-t border-white/[0.06] pt-3">
                    <div className="text-[12px] font-medium text-[#00D4FF]">{p.metrics}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Thesis */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[1.5fr_1fr] gap-20 items-start">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
                Our Thesis
              </p>
              <h2 className="text-[38px] font-bold leading-[1.18] text-white">
                Most digital businesses are built to sell services. We build to own assets.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[15px] leading-[1.7] text-gray-400 pt-10">
                The difference between a consultancy and a holding company is ownership. Consultancies sell time. Holding companies accumulate equity. Every company in the Digiteq portfolio is an owned asset with compounding value, not a service line that needs constant reselling.
              </p>
              <p className="text-[15px] leading-[1.7] text-gray-400 mt-4">
                We invest in organic demand, structured content, audience ownership and operational systems. These compound. Paid campaigns do not.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Principles
            </p>
            <h2 className="text-[30px] font-semibold text-white mb-12">
              How we operate.
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-0 max-w-[720px]">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <div className="border-b border-white/[0.06] py-6">
                  <h3 className="text-[16px] font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-[14px] leading-[1.65] text-gray-400">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Team
            </p>
            <h2 className="text-[30px] font-semibold text-white mb-12">
              Built by operators.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[#0E1020] border border-white/[0.06] rounded-xl p-8 max-w-[480px]">
              <h3 className="text-[18px] font-semibold text-white mb-1">Shane Powell</h3>
              <p className="text-[13px] text-[#00D4FF] mb-4">Founder</p>
              <p className="text-[14px] leading-[1.65] text-gray-400 mb-4">
                17 years across product delivery, consulting and digital transformation. Director at Turner and Townsend. Previously held directorial roles at AND Digital and RAD Consulting Group. Built and scaled teams across public sector, utilities, infrastructure and regulated industries.
              </p>
              <p className="text-[14px] leading-[1.65] text-gray-400">
                Building Digiteq as the holding company layer for digital brands, products and media properties.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="bg-gradient-to-br from-[#0C0D1A] to-[#111330] rounded-2xl
              p-16 border border-white/[0.06]">
              <h2 className="text-[32px] font-bold text-white mb-4">
                Interested in what we are building?
              </h2>
              <p className="text-[15px] text-gray-400 mb-8 max-w-[400px]">
                Whether you are a founder, an investor, or a potential partner, we are always open to the right conversation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[10px] text-sm font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #8B5CF6)' }}
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
