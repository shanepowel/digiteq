import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import type { PortfolioCompanyCard } from "@/lib/portfolio/cards";

export function PortfolioPageContent({ companies }: { companies: PortfolioCompanyCard[] }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6 max-w-[640px]">
              Companies we build and scale.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[540px]">
              The portfolio combines agency capability, marketplace products, media assets and acquisition opportunities into a single operating group.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio grid - larger cards than homepage */}
      <section className="py-[60px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Stagger className="grid grid-cols-3 gap-5">
            {companies.map((c) => (
              <StaggerItem key={c.slug}>
                <Link href={`/portfolio/${c.slug}`} className="block h-full">
                  <div className="bg-[#0E1020] border border-white/[0.06] rounded-xl p-6
                    hover:bg-[#13152A] hover:border-white/[0.12] transition-all duration-200
                    flex flex-col justify-between h-full min-h-[300px]">
                    <div>
                      {/* Gradient accent bar */}
                      <div className="h-1 w-12 rounded-full mb-5"
                        style={{ background: `linear-gradient(90deg, ${c.gradient[0]}, ${c.gradient[1]})` }}
                      />

                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-[18px] font-semibold text-white">{c.name}</h3>
                        <span className="text-[10px] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border border-white/[0.06] text-gray-500">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mb-3">{c.type}</p>
                      <p className="text-[13px] leading-[1.6] text-gray-400 mb-6">{c.description}</p>
                    </div>

                    <div>
                      <div className="border-t border-white/[0.06] pt-4 mb-4">
                        <div className="grid grid-cols-3 gap-3">
                          {c.metrics.map((m, i) => (
                            <div key={i}>
                              <div className="text-[10px] text-gray-600 mb-1">{m.label}</div>
                              <div className={`text-[14px] font-semibold ${
                                m.highlight ? 'text-[#00D4FF]' : 'text-white'
                              }`}>{m.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium"
                        style={{ color: c.gradient[0] }}>
                        View Company <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}

            {/* Acquisition CTA card */}
            <StaggerItem>
              <Link href="/investment" className="block h-full">
                <div className="border border-dashed border-white/[0.08] rounded-xl p-6
                  hover:border-white/[0.15] transition-all duration-200
                  flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                  <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center mb-4">
                    <span className="text-[20px] text-gray-500">+</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2">Your business here</h3>
                  <p className="text-[13px] text-gray-500 mb-4 max-w-[200px]">
                    We are actively acquiring profitable digital businesses.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF]">
                    Learn about selling <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
