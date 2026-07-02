"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { RegisterRow } from "@/lib/home/register";
import { registerBalanceSummary } from "@/lib/home/register";
import { HomeReveal } from "@/components/home/home-reveal";
import { cn } from "@/lib/utils";

function Sparkline({ trend }: { trend: RegisterRow["trend"] }) {
  const positive = trend === "positive";
  const flat = trend === "flat" || trend === "eval";

  if (trend === "eval") {
    return (
      <svg className="h-[26px] w-[88px]" viewBox="0 0 88 26" aria-hidden="true">
        <polyline
          points="2,15 86,15"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
      </svg>
    );
  }

  const points = flat
    ? "2,18 30,18 44,15 86,15"
    : positive
      ? "2,24 16,20 30,21 44,15 58,12 72,8 86,3"
      : "2,23 16,21 30,17 44,18 58,13 72,10 86,5";
  const area = flat
    ? undefined
    : `${points} 86,24 2,24`;

  return (
    <svg className="h-[26px] w-[88px]" viewBox="0 0 88 26" aria-hidden="true">
      {area && <polygon points={area} fill="var(--ledger-soft)" />}
      <polyline
        points={points}
        fill="none"
        stroke={flat ? "var(--brass)" : "var(--ledger)"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PositionTag({ position }: { position: RegisterRow["position"] }) {
  if (position === "Operating") {
    return (
      <span className="dh-mono inline-block rounded-[2px] border border-[rgb(30_92_70/0.25)] bg-[var(--ledger-soft)] px-3 py-1.5 text-[0.68rem] text-[var(--ledger-deep)]">
        Operating
      </span>
    );
  }
  if (position === "Pre-seed") {
    return (
      <span className="dh-mono inline-block rounded-[2px] border border-[rgb(168_130_63/0.35)] bg-[var(--brass-soft)] px-3 py-1.5 text-[0.68rem] text-[#6f5526]">
        Pre-seed
      </span>
    );
  }
  return (
    <span className="dh-mono inline-block rounded-[2px] border border-dashed border-[var(--rule)] px-3 py-1.5 text-[0.68rem] text-[var(--ink-dim)]">
      In evaluation
    </span>
  );
}

type EquityRegisterProps = {
  rows: RegisterRow[];
};

export function EquityRegister({ rows }: EquityRegisterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(Boolean(reduced));
  const balance = registerBalanceSummary(rows);

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
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section id="register" className="dh-section">
      <div className="dh-container">
        <HomeReveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">The register</span>
          </div>
          <h2 className="dh-h2">Companies we build and scale.</h2>
        </HomeReveal>

        <div ref={ref} className="relative mt-[clamp(40px,6vh,64px)] border-t border-[var(--rule)] before:absolute before:inset-x-0 before:top-[3px] before:h-px before:bg-[var(--ink)]">
          {/* Desktop table */}
          <table className="hidden w-full border-collapse min-[720px]:table">
            <thead>
              <tr>
                <th scope="col" className="sr-only">
                  Index
                </th>
                <th scope="col" className="dh-mono border-b border-[var(--rule)] py-[18px] pr-4 pb-3.5 text-left font-normal">
                  Holding
                </th>
                <th scope="col" className="dh-mono border-b border-[var(--rule)] py-[18px] pr-4 pb-3.5 text-left font-normal">
                  Category
                </th>
                <th scope="col" className="dh-mono border-b border-[var(--rule)] py-[18px] pr-4 pb-3.5 text-left font-normal">
                  Key figure
                </th>
                <th scope="col" className="dh-mono border-b border-[var(--rule)] py-[18px] pr-4 pb-3.5 text-left font-normal max-[820px]:hidden">
                  Trend
                </th>
                <th scope="col" className="dh-mono border-b border-[var(--rule)] py-[18px] pr-4 pb-3.5 text-left font-normal">
                  Position
                </th>
                <th scope="col" className="sr-only">
                  Open
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.slug}
                  className="group cursor-pointer transition-colors hover:bg-[var(--sage)]"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={active || reduced ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.06, ease: "easeOut" }}
                  onClick={() => {
                    window.location.href = row.href;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      window.location.href = row.href;
                    }
                  }}
                  tabIndex={0}
                >
                  <td className="dh-mono w-11 pr-2 text-[0.68rem] text-[var(--brass)] max-[720px]:hidden">
                    {row.index}
                  </td>
                  <td className="border-b border-[var(--rule)] py-[26px] pr-4 align-middle">
                    <span className="dh-display text-[1.35rem] font-medium">{row.name}</span>
                  </td>
                  <td className="dh-mono border-b border-[var(--rule)] py-[26px] pr-4 align-middle text-[0.72rem] tracking-[0.1em] text-[var(--ink-faint)]">
                    {row.category}
                  </td>
                  <td className="border-b border-[var(--rule)] py-[26px] pr-4 align-middle">
                    <span className="dh-mono block text-[0.72rem] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                      {row.figureLabel}
                    </span>
                    <span
                      className={cn(
                        "dh-tabular text-[0.95rem] font-medium",
                        row.trend === "positive" ? "text-[var(--ledger)]" : "text-[var(--ink)]",
                      )}
                    >
                      {row.figureValue}
                    </span>
                  </td>
                  <td className="border-b border-[var(--rule)] py-[26px] pr-4 align-middle max-[820px]:hidden">
                    <Sparkline trend={row.trend} />
                  </td>
                  <td className="border-b border-[var(--rule)] py-[26px] pr-4 align-middle">
                    <PositionTag position={row.position} />
                  </td>
                  <td className="border-b border-[var(--rule)] py-[26px] text-right text-[var(--ink-faint)] transition-[color,transform] group-hover:text-[var(--ledger)]">
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="dh-mono relative border-t border-[var(--ink)] pt-4 pr-4 text-[0.7rem] tracking-[0.12em] text-[var(--ink-dim)] before:absolute before:inset-x-0 before:top-[3px] before:h-px before:bg-[var(--ink)]">
                  Balance carried forward
                </td>
                <td
                  colSpan={3}
                  className="dh-tabular relative border-t border-[var(--ink)] pt-4 text-right text-[0.85rem] font-medium text-[var(--ledger-deep)] before:absolute before:inset-x-0 before:top-[3px] before:h-px before:bg-[var(--ink)]"
                >
                  {balance}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Mobile stacked layout */}
          <dl className="min-[720px]:hidden">
            {rows.map((row, i) => (
              <motion.div
                key={row.slug}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={active || reduced ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.06, ease: "easeOut" }}
              >
                <Link
                  href={row.href}
                  className="block border-b border-[var(--rule)] py-5 transition-colors hover:bg-[var(--sage)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="dh-display text-[1.35rem] font-medium">{row.name}</dt>
                    <dd className="dh-mono text-[0.72rem] tracking-[0.1em] text-[var(--ink-faint)]">
                      {row.category}
                    </dd>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-4">
                    <dd>
                      <span className="dh-mono block text-[0.72rem] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
                        {row.figureLabel}
                      </span>
                      <span
                        className={cn(
                          "dh-tabular text-[0.95rem] font-medium",
                          row.trend === "positive" ? "text-[var(--ledger)]" : "text-[var(--ink)]",
                        )}
                      >
                        {row.figureValue}
                      </span>
                    </dd>
                    <dd>
                      <PositionTag position={row.position} />
                    </dd>
                  </div>
                </Link>
              </motion.div>
            ))}
            <div className="dh-mono border-t border-[var(--ink)] pt-4 text-[0.7rem] tracking-[0.12em] text-[var(--ink-dim)] before:block before:h-px before:bg-[var(--ink)] before:content-['']" style={{ boxShadow: "inset 0 3px 0 0 var(--ink)" }}>
              <div className="mt-3 flex flex-col gap-1">
                <span>Balance carried forward</span>
                <span className="dh-tabular text-[0.85rem] font-medium text-[var(--ledger-deep)]">{balance}</span>
              </div>
            </div>
          </dl>

          <Link
            href="/portfolio"
            className="dh-mono mt-[18px] block text-right text-[0.72rem] tracking-[0.1em] text-[var(--ink-dim)] transition-colors hover:text-[var(--ledger)]"
          >
            — register continues · view all holdings →
          </Link>
        </div>
      </div>
    </section>
  );
}
