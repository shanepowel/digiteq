"use client";

import Link from "next/link";
import { useState } from "react";
import { Rosette } from "@/components/home/home-svg";
import { homeFooterLinks } from "@/lib/home/navigation";
import { contactEmail } from "@/lib/site";

export function HomeFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "sent" : "error");
    if (res.ok) setEmail("");
  }

  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--paper-2)] py-[clamp(52px,8vh,80px)] pb-8">
      <div className="dh-container">
        <div className="mb-[clamp(40px,6vh,60px)] grid gap-[clamp(28px,5vw,64px)] min-[720px]:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="dh-display mb-3 flex items-center gap-2.5 text-[1.35rem] font-semibold tracking-[-0.01em]">
              <Rosette className="h-[26px] w-[26px]" />
              Digiteq<span className="font-normal italic text-[var(--ledger)]">.</span>
            </div>
            <p className="mb-5 max-w-[36ch] text-[0.95rem] text-[var(--ink-dim)]">
              We create, acquire and scale digital brands, products and media properties to build
              lasting digital equity.
            </p>
            <div className="flex flex-wrap gap-5">
              <a
                href="https://linkedin.com/company/digiteq"
                target="_blank"
                rel="noopener noreferrer"
                className="dh-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-dim)] transition-colors hover:text-[var(--ledger)]"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://x.com/digiteqhq"
                target="_blank"
                rel="noopener noreferrer"
                className="dh-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-dim)] transition-colors hover:text-[var(--ledger)]"
              >
                X ↗
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="dh-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-dim)] transition-colors hover:text-[var(--ledger)]"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[0.95rem] font-semibold">Company</h4>
            <ul className="list-none">
              {homeFooterLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1 text-[0.95rem] text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.95rem] font-semibold">Stay informed</h4>
            <p className="mb-4 max-w-[30ch] text-[0.92rem] text-[var(--ink-dim)]">
              Insights on building, acquiring and scaling digital businesses.
            </p>
            <form
              onSubmit={onSubscribe}
              className="mt-4 flex max-w-[320px] overflow-hidden rounded-[2px] border border-[var(--ink)] bg-[var(--paper)]"
            >
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 font-[family-name:var(--font-instrument)] text-[0.9rem] text-[var(--ink)] outline-none focus:outline focus:outline-2 focus:outline-[var(--ledger)] focus:outline-offset-[-2px]"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="border-0 bg-[var(--ledger)] px-5 py-3 font-[family-name:var(--font-instrument)] text-[0.85rem] font-semibold text-[var(--paper)]"
              >
                Subscribe
              </button>
            </form>
            {status === "sent" && (
              <p className="dh-mono mt-2 text-[0.68rem] text-[var(--ledger)]">Thanks. You are subscribed.</p>
            )}
            {status === "error" && (
              <p className="dh-mono mt-2 text-[0.68rem] text-[var(--ink-dim)]">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--rule)] pt-5">
          <span className="dh-mono text-[0.66rem] tracking-[0.1em] text-[var(--ink-faint)]">
            © {new Date().getFullYear()} Digiteq Holdings · Registered in England &amp; Wales
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="dh-mono text-[0.66rem] tracking-[0.1em] text-[var(--ink-faint)] hover:text-[var(--ledger)]">
              Privacy
            </Link>
            <Link href="/terms" className="dh-mono text-[0.66rem] tracking-[0.1em] text-[var(--ink-faint)] hover:text-[var(--ledger)]">
              Terms
            </Link>
            <Link href="/case-studies" className="dh-mono text-[0.66rem] tracking-[0.1em] text-[var(--ink-faint)] hover:text-[var(--ledger)]">
              Case studies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
