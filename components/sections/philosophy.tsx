"use client";

import { Reveal } from "@/components/animation/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/shared/section-label";
import { TextLink } from "@/components/shared/text-link";

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
          <SectionLabel>Our Philosophy</SectionLabel>
        </Reveal>
        <div className="grid items-start gap-20 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,4vw,46px)] font-bold leading-[1.18] text-foreground">
              Most businesses invest in campaigns. We invest in digital equity.{" "}
              <span className="bg-gradient-to-br from-[#00D4FF] to-[#3B82F6] bg-clip-text text-transparent">
                Brands.
              </span>{" "}
              <span className="bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                Products.
              </span>{" "}
              <span className="bg-gradient-to-br from-[#D946EF] to-[#FF2D7B] bg-clip-text text-transparent">
                Media.
              </span>{" "}
              <span className="text-white">Audiences.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="pt-2">
            <p className="mb-6 text-[15px] leading-[1.7] text-gray-400">
              Digital equity is ownership, scale and compounding advantage in the digital economy.
              We build and acquire assets that create long-term value for our companies, partners
              and investors.
            </p>
            <TextLink href="/about" color="cyan">
              More about our philosophy
            </TextLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
