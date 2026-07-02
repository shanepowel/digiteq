"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HomeReveal } from "@/components/home/home-reveal";

export function HomePhilosophy() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(Boolean(reduced));

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section className="dh-section border-y border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="dh-container grid items-center gap-[clamp(36px,6vw,90px)] min-[860px]:grid-cols-[1.1fr_0.9fr]">
        <HomeReveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">Our philosophy</span>
          </div>
          <h2 className="dh-h2 mb-5 max-w-[30ch]">
            Most businesses invest in campaigns. We invest in{" "}
            <em className="font-normal not-italic text-[var(--ledger)]">digital equity</em>.
          </h2>
          <p className="mb-7 max-w-[52ch] text-[var(--ink-dim)]">
            Digital equity is ownership, scale and compounding advantage in the digital economy. We
            build and acquire assets that create long-term value for our companies, partners and
            investors.
          </p>
          <Link href="/about" className="dh-tlink">
            More about our philosophy →
          </Link>
        </HomeReveal>

        <div ref={ref} className="w-full">
          <svg
            className="compound h-auto w-full"
            viewBox="0 0 460 300"
            role="img"
            aria-label="Chart comparing campaign spend, which resets repeatedly, with equity value, which compounds over time"
          >
            <line className="stroke-[var(--rule)]" x1="40" y1="40" x2="40" y2="260" strokeWidth="1" />
            <line className="stroke-[var(--rule)]" x1="40" y1="260" x2="440" y2="260" strokeWidth="1" />
            <line className="stroke-[var(--rule)]" x1="40" y1="150" x2="440" y2="150" strokeDasharray="2 6" strokeWidth="1" />
            <line className="stroke-[var(--rule)]" x1="40" y1="40" x2="440" y2="40" strokeDasharray="2 6" strokeWidth="1" />
            <path
              className="fill-none stroke-[var(--ink-faint)]"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              d="M40 260 L90 215 L95 258 L150 210 L155 257 L215 205 L220 256 L285 200 L290 255 L360 195 L365 254 L438 190"
            />
            <path
              className="fill-[url(#dh-eq-grad)]"
              opacity={active || reduced ? 1 : 0}
              style={{ transition: reduced ? undefined : "opacity 0.8s ease 1.2s" }}
              d="M40 260 C 160 252, 280 235, 340 180 C 385 138, 415 90, 438 52 L438 260 Z"
            />
            <path
              className="fill-none stroke-[var(--ledger)]"
              strokeWidth="2.5"
              strokeDasharray="640"
              strokeDashoffset={active || reduced ? 0 : 640}
              style={
                active && !reduced
                  ? { animation: "dh-trace-equity 1.6s cubic-bezier(.6,0,.2,1) 0.2s forwards" }
                  : undefined
              }
              d="M40 260 C 160 252, 280 235, 340 180 C 385 138, 415 90, 438 52"
            />
            <circle
              className="fill-[var(--brass)]"
              cx="438"
              cy="52"
              r="4"
              opacity={active || reduced ? 1 : 0}
              style={
                active && !reduced
                  ? { animation: "dh-dot-in 0.4s ease 1.8s forwards" }
                  : undefined
              }
            />
            <circle
              className="fill-none stroke-[var(--brass)]"
              cx="438"
              cy="52"
              r="4"
              strokeWidth="1.4"
              opacity={active || reduced ? undefined : 0}
              style={
                active && !reduced
                  ? { animation: "dh-pulse-ring 2.4s ease 2.2s infinite" }
                  : undefined
              }
            />
            <text className="fill-[var(--ink-faint)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em]" x="40" y="285">
              Year 1
            </text>
            <text className="fill-[var(--ink-faint)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em]" x="400" y="285">
              Year 7
            </text>
            <text className="fill-[var(--ink-faint)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em]" x="300" y="240">
              Campaign spend
            </text>
            <text className="fill-[var(--ledger)] font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.1em]" x="330" y="80">
              Equity value
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
