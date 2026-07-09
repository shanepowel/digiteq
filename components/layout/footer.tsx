"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactEmail } from "@/lib/site";

function SocialIcon({ d, href }: { d: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-border"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#6B7280" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}

export function Footer() {
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
    <footer className="pb-8 pt-0">
      <Container className="border-t border-white/[0.06] pt-14">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.6fr] lg:gap-14">
          <div>
            <BrandLogo variant="footer" display="lockup" href={false} className="mb-3.5" />
            <p className="mb-4 max-w-[280px] text-[13px] leading-relaxed text-muted-dark">
              Digiteq Holdings Limited. Building, acquiring, supplying, and investing in
              technology.
            </p>
            <div className="flex gap-2">
              <SocialIcon
                href="https://linkedin.com/company/digiteq"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
              />
              <SocialIcon
                href="https://x.com/digiteqhq"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-border"
              >
                <Mail className="h-3.5 w-3.5 text-muted-dark" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Contact
            </h4>
            <div className="flex flex-col gap-3.5">
              {[
                { Icon: Mail, text: contactEmail, href: `mailto:${contactEmail}` },
                { Icon: MapPin, text: "London, UK", href: undefined },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 text-muted-dark" />
                  {href ? (
                    <a href={href} className="text-[13px] text-muted hover:text-foreground">
                      {text}
                    </a>
                  ) : (
                    <span className="text-[13px] text-muted">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Stay Informed
            </h4>
            <p className="mb-4 text-[13px] leading-relaxed text-muted-dark">
              Insights on building, acquiring, supplying, and investing in technology.
            </p>
            <form onSubmit={onSubscribe} className="flex gap-2">
              <Input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-sm"
              />
              <Button type="submit" variant="rose" size="sm" disabled={status === "sending"}>
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>
            {status === "sent" && (
              <p className="mt-2 text-xs text-cyan">Thanks. You are subscribed.</p>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-rose">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-dark">
              &copy; {new Date().getFullYear()} Digiteq Holdings Limited. All rights reserved.
            </span>
            <span className="text-xs text-muted-dark">
              Registered in England and Wales. Company number 03730207.
            </span>
          </div>
          <div className="flex gap-7">
            <Link href="/privacy" className="text-xs text-muted-dark hover:text-muted">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-dark hover:text-muted">
              Terms of Service
            </Link>
            <Link href="/case-studies" className="text-xs text-muted-dark hover:text-muted">
              Case Studies
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-muted-dark hover:text-muted">
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
