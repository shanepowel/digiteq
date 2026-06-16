import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@/lib/utils";

type LogoWordmarkProps = {
  variant?: "nav" | "footer";
  href?: string | false;
  className?: string;
};

export function LogoWordmark({ variant = "nav", href = "/", className }: LogoWordmarkProps) {
  const markSize = variant === "nav" ? 26 : 22;
  const textSize = variant === "nav" ? "text-[15px]" : "text-[13px]";
  const gradientId = variant === "nav" ? "nm-nav" : "nm-footer";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} gradientId={gradientId} />
      <span className={cn("font-bold tracking-[0.1em] text-foreground", textSize)}>DIGITEQ</span>
    </span>
  );

  if (href !== false) {
    return (
      <Link href={href || "/"} aria-label="Digiteq home">
        {content}
      </Link>
    );
  }

  return content;
}
