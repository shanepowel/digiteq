import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/motion";
import { cn } from "@/lib/utils";

type DhPageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export function DhPageHero({ eyebrow, title, lede, titleClassName, children }: DhPageHeroProps) {
  return (
    <section className="dh-section !pb-12 !pt-[clamp(48px,8vh,80px)]">
      <div className="dh-container">
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className={cn("dh-page-h1 mb-6 max-w-[18ch]", titleClassName)}>{title}</h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.12}>
            <p className="dh-lede max-w-[48ch]">{lede}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function DhSection({
  children,
  className,
  tinted,
}: {
  children: ReactNode;
  className?: string;
  tinted?: boolean;
}) {
  return (
    <section
      className={cn(
        "dh-section",
        tinted && "border-y border-[var(--rule)] bg-[var(--paper-2)]",
        className,
      )}
    >
      <div className="dh-container">{children}</div>
    </section>
  );
}

export function DhCard({
  children,
  className,
  hover,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[2px] border border-[var(--rule)] bg-[var(--paper)] p-6",
        hover && "transition-colors duration-200 hover:border-[var(--ink-faint)] hover:bg-[var(--sage)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DhTextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="dh-tlink inline-flex items-center gap-1.5"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function DhCtaBand({
  eyebrow,
  title,
  body,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <DhSection tinted>
      <Reveal>
        <div className="dh-eyebrow">
          <span className="dh-mono">{eyebrow}</span>
        </div>
        <h2 className="dh-h2 mb-4 max-w-[24ch]">{title}</h2>
        <p className="mb-8 max-w-[40ch] text-[var(--ink-dim)]">{body}</p>
        <Link href={href} className="dh-btn dh-btn-fill">
          {linkLabel}
        </Link>
      </Reveal>
    </DhSection>
  );
}
