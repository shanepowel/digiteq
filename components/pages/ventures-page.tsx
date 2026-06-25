import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import type { Venture } from "@/lib/sanity/types";

const stageAccent: Record<string, string> = {
  Idea: "#6B7280",
  "Pre-Seed": "#8B5CF6",
  Seed: "#00D4FF",
  "Series A": "#22C55E",
  Growth: "#F59E0B",
  Acquired: "#EC4899",
};

function ventureAccent(stage?: string) {
  return (stage && stageAccent[stage]) || "#00D4FF";
}

export function VenturesPageContent({ ventures }: { ventures: Venture[] }) {
  return (
    <>
      <section className="px-12 pt-32 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#00D4FF] uppercase">
              Ventures
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-6 max-w-[640px] text-[52px] leading-[1.1] font-bold tracking-[-0.02em] text-white">
              Venture formation without the theatre.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-[540px] text-lg leading-relaxed text-gray-400">
              Digiteq Ventures identifies useful digital business models, validates durable demand
              and builds or acquires the assets worth compounding.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[60px]">
        <div className="mx-auto max-w-[1200px]">
          {ventures.length > 0 ? (
            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ventures.map((venture) => {
                const accent = ventureAccent(venture.stage);

                return (
                  <StaggerItem key={venture._id}>
                    <div
                      className="flex h-full min-h-[280px] flex-col rounded-xl border border-white/[0.06] bg-[#0E1020] p-6 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#13152A]"
                    >
                      <div
                        className="mb-5 h-1 w-12 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                        }}
                      />

                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <h3 className="text-[18px] font-semibold text-white">{venture.name}</h3>
                        {venture.status ? (
                          <span className="rounded-full border border-white/[0.06] px-2 py-0.5 text-[10px] font-medium tracking-[0.1em] text-gray-500 uppercase">
                            {venture.status}
                          </span>
                        ) : null}
                      </div>

                      {venture.industry ? (
                        <p className="mb-3 text-[11px] text-gray-600">{venture.industry}</p>
                      ) : null}

                      {venture.description ? (
                        <p className="mb-6 flex-1 text-[13px] leading-[1.6] text-gray-400">
                          {venture.description}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}

                      <div className="border-t border-white/[0.06] pt-4">
                        {venture.stage ? (
                          <p className="mb-3 text-[14px] font-semibold" style={{ color: accent }}>
                            {venture.stage}
                          </p>
                        ) : null}

                        {venture.url ? (
                          <a
                            href={venture.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF]"
                          >
                            Visit <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          ) : (
            <Reveal>
              <p className="text-gray-400">
                Venture records will appear here once published in Sanity.
              </p>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="mt-12 rounded-xl border border-dashed border-white/[0.08] p-8 text-center">
              <h2 className="mb-2 text-[15px] font-semibold text-white">
                Building something worth compounding?
              </h2>
              <p className="mx-auto mb-5 max-w-md text-[13px] text-gray-500">
                We partner with founders on venture formation, incubation and strategic capital.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF]"
              >
                Start a conversation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
