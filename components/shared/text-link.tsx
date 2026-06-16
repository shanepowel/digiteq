"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const colorMap = {
  cyan: "text-cyan",
  violet: "text-violet",
  magenta: "text-magenta",
  muted: "text-muted-dark",
} as const;

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  color?: keyof typeof colorMap;
  className?: string;
  external?: boolean;
};

export function TextLink({ href, children, color = "cyan", className, external }: TextLinkProps) {
  const linkClass = cn(
    "inline-flex items-center gap-1.5 text-[13px] font-medium opacity-85 transition-opacity hover:opacity-100",
    colorMap[color],
    className,
  );

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={linkClass} target="_blank" rel="noopener noreferrer">
        {children} <ArrowRight className="h-3.5 w-3.5" />
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {children} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}
