import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { Badge } from "@/components/ui/badge";
import type { PortfolioCompanyCard } from "@/lib/portfolio/cards";

export function PortfolioPageContent({ companies }: { companies: PortfolioCompanyCard[] }) {
  return (
    <>
      <section className="px-12 pb-16 pt-32">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-6 max-w-[640px] text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Companies we build and operate.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-[540px] text-lg leading-relaxed text-gray-400">
              Independent brands across brand development, marketplace platforms, and enterprise
              technology supply.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[60px]">
        <div className="mx-auto max-w-[1200px]">
          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {companies.map((c) => (
              <StaggerItem key={c.slug}>
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="flex h-full min-h-[280px] flex-col justify-between rounded-xl border border-white/[0.06] bg-[#0E1020] p-6 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#13152A]">
                    <div>
                      <div
                        className="mb-5 h-1 w-12 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${c.gradient[0]}, ${c.gradient[1]})`,
                        }}
                      />

                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <h3 className="text-[18px] font-semibold text-white">{c.name}</h3>
                        <Badge variant="default" className="text-[10px] uppercase tracking-wide">
                          {c.category}
                        </Badge>
                        <Badge className="text-[10px] uppercase tracking-wide">Digiteq company</Badge>
                      </div>
                      <p className="text-[13px] leading-[1.6] text-gray-400">{c.description}</p>
                    </div>

                    <span
                      className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium"
                      style={{ color: c.gradient[0] }}
                    >
                      Visit site <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            ))}

            <StaggerItem>
              <Link href="/investment" className="block h-full">
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] p-6 text-center transition-all duration-200 hover:border-white/[0.15]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08]">
                    <span className="text-[20px] text-gray-500">+</span>
                  </div>
                  <h3 className="mb-2 text-[15px] font-semibold text-white">Your business here</h3>
                  <p className="mb-4 max-w-[200px] text-[13px] text-gray-500">
                    We actively evaluate acquisition targets across digital and supply chain
                    businesses.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF]">
                    Learn about acquisitions <ArrowRight className="h-3.5 w-3.5" />
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
