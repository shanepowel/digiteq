import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { roleLabels, routesForRole, type PortalRole } from "@/lib/auth";
import { cn, marketingUrl } from "@/lib/utils";

export function PortalShell({
  children,
  role,
  activeHref,
}: {
  children: ReactNode;
  role: PortalRole;
  activeHref?: string;
}) {
  const nav = routesForRole(role);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-[rgb(8,10,17)]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 lg:px-12">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold tracking-tight text-white">
              digiteq<span className="text-cyan">.</span>
            </Link>
            <nav className="hidden items-center gap-5 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] transition-colors",
                    activeHref === item.href ? "text-cyan" : "text-muted hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[11px] uppercase tracking-[0.12em] text-muted sm:inline">
              {roleLabels[role]}
            </span>
            <UserButton afterSignOutUrl="/login" />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-12">{children}</main>
      <footer className="border-t border-border px-6 py-6 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-4 text-xs text-muted">
          <Link href={marketingUrl} className="hover:text-white">
            digiteq.io
          </Link>
          {role === "INTERNAL" ? (
            <Link href="/ventures-site" className="hover:text-white">
              ventures microsite
            </Link>
          ) : null}
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <div className="mb-10 max-w-[640px]">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">{kicker}</p>
      <h1 className="text-[32px] font-bold leading-tight tracking-[-0.02em] text-white">{title}</h1>
      {description ? <p className="mt-4 text-[15px] leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-6", className)}>{children}</div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
      {children}
    </span>
  );
}
