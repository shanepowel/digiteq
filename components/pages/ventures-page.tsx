import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { DhCard, DhPageHero, DhSection } from "@/components/layout/dh-primitives";
import type { Venture } from "@/lib/sanity/types";

const stageAccent: Record<string, string> = {
  Idea: "var(--ink-faint)",
  "Pre-Seed": "#6b4fa8",
  Seed: "var(--ledger)",
  "Series A": "#2d6b4f",
  Growth: "var(--brass)",
  Acquired: "#8b4a6b",
};

function ventureAccent(stage?: string) {
  return (stage && stageAccent[stage]) || "var(--ledger)";
}

export function VenturesPageContent({ ventures }: { ventures: Venture[] }) {
  return (
    <>
      <DhPageHero
        eyebrow="Ventures"
        title="Venture formation without the theatre."
        lede="Digiteq Ventures identifies useful digital business models, validates durable demand and builds or acquires the assets worth compounding."
        titleClassName="max-w-[16ch]"
      />

      <DhSection className="!pt-0">
        {ventures.length > 0 ? (
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ventures.map((venture) => {
              const accent = ventureAccent(venture.stage);

              return (
                <StaggerItem key={venture._id}>
                  <DhCard hover className="flex h-full min-h-[280px] flex-col">
                    <div
                      className="mb-5 h-1 w-12 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 55%, transparent))` }}
                    />

                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <h3 className="text-[18px] font-semibold text-[var(--ink)]">{venture.name}</h3>
                      {venture.status ? (
                        <span className="dh-badge !text-[var(--ink-faint)]">{venture.status}</span>
                      ) : null}
                    </div>

                    {venture.industry ? (
                      <p className="dh-mono mb-3 !text-[var(--ink-faint)]">{venture.industry}</p>
                    ) : null}

                    {venture.description ? (
                      <p className="mb-6 flex-1 text-[13px] leading-[1.6] text-[var(--ink-dim)]">
                        {venture.description}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}

                    <div className="border-t border-[var(--rule)] pt-4">
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
                          className="dh-tlink inline-flex items-center gap-1.5 text-[13px]"
                        >
                          Visit <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </DhCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        ) : (
          <Reveal>
            <p className="text-[var(--ink-dim)]">
              Venture records will appear here once published in Sanity.
            </p>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <DhCard className="mt-12 border-dashed text-center">
            <h2 className="mb-2 text-[15px] font-semibold text-[var(--ink)]">
              Building something worth compounding?
            </h2>
            <p className="mx-auto mb-5 max-w-md text-[13px] text-[var(--ink-dim)]">
              We partner with founders on venture formation, incubation and strategic capital.
            </p>
            <Link href="/contact" className="dh-tlink inline-flex items-center gap-1.5 text-[13px]">
              Start a conversation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </DhCard>
        </Reveal>
      </DhSection>
    </>
  );
}
