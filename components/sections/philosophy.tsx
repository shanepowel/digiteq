"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/shared/section-label";
import { TextLink } from "@/components/shared/text-link";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
};

export function Philosophy() {
  return (
    <section className="px-6 py-24 sm:px-12">
      <Container>
        <SectionLabel>Our Philosophy</SectionLabel>
        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <motion.h2
            {...fadeUp}
            className="text-[clamp(1.75rem,4vw,2.875rem)] font-bold leading-[1.18] text-foreground"
          >
            Most businesses invest in campaigns. We invest in digital equity.{" "}
            <span className="text-grad-brands">Brands.</span>{" "}
            <span className="text-grad-products">Products.</span>{" "}
            <span className="text-grad-media">Media.</span> Audiences.
          </motion.h2>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="pt-2">
            <p className="mb-6 text-[15px] leading-relaxed text-muted">
              Digital equity is ownership, scale and compounding advantage in the digital economy.
              We build and acquire assets that create long-term value for our companies, partners
              and investors.
            </p>
            <TextLink href="/about" color="cyan">
              More about our philosophy
            </TextLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
