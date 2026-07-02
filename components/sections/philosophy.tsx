"use client";

import { Reveal } from "@/components/animation/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/shared/section-label";

export function Philosophy() {
  return (
    <Section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-8 top-1/2 hidden h-72 w-56 -translate-y-1/2 opacity-40 lg:block"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.35) 0%, rgba(217,70,239,0.12) 45%, transparent 70%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />

      <Container>
        <Reveal>
          <SectionLabel>Our thesis</SectionLabel>
        </Reveal>
        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,4vw,46px)] font-bold leading-[1.18] text-foreground">
              Technology creates outsized value where supply has not caught up with demand.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="pt-2">
            <p className="text-[15px] leading-[1.7] text-gray-400">
              Most technology investment concentrates in markets that are already saturated. We focus
              on the gaps: markets where businesses need technology but supply chains are
              fragmented, unreliable, or overpriced. Southern Africa is our first geographic focus.
              Enterprise hardware supply is our first vertical. Neither will be the last.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
