"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/shared/bar-chart";

export function InvestmentCta() {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0C0D1A] to-[#111330] p-20 lg:flex-row"
        >
          <div className="relative z-10 max-w-[420px]">
            <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-tight text-white">
              Looking to sell your digital business?
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-gray-400">
              We partner with founders to unlock the next chapter. Fair process. Fast decisions.
              Aligned outcomes.
            </p>
            <Button variant="rose" asChild>
              <Link href="/contact">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative z-10 hidden sm:block">
            <BarChart />
          </div>
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 blur-[50px]"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </Container>
    </Section>
  );
}
