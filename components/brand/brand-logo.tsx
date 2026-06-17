import Image from "next/image";
import Link from "next/link";
import { brandAlt, brandAssets } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "nav" | "footer";
  /** auto: icon on small screens, lockup on lg+ (nav header only) */
  display?: "auto" | "icon" | "lockup";
  href?: string | false;
  className?: string;
};

const sizes = {
  nav: { lockup: { width: 148, height: 40 }, icon: { width: 32, height: 32 } },
  footer: { lockup: { width: 120, height: 32 }, icon: { width: 22, height: 22 } },
} as const;

export function BrandLogo({
  variant = "nav",
  display = "auto",
  href = "/",
  className,
}: BrandLogoProps) {
  const dim = sizes[variant];
  const isNavAuto = display === "auto" && variant === "nav";
  const showLockup = display === "lockup" || isNavAuto || (display === "auto" && variant === "footer");
  const showIcon = display === "icon" || isNavAuto;

  const content = (
    <span className={cn("inline-flex items-center", className)}>
      {showLockup && (
        <Image
          src={brandAssets.lockup}
          alt={brandAlt.lockup}
          width={dim.lockup.width}
          height={dim.lockup.height}
          className={cn(
            "object-contain object-left",
            variant === "footer" ? "h-8 w-auto" : "h-9 w-auto",
            display === "auto" && variant === "nav" && "hidden lg:block",
          )}
          priority={variant === "nav"}
        />
      )}
      {showIcon && (
        <Image
          src={brandAssets.icon}
          alt={brandAlt.icon}
          width={dim.icon.width}
          height={dim.icon.height}
          className={cn(
            "object-contain",
            variant === "footer" ? "h-[22px] w-[22px]" : "h-8 w-8",
            display === "auto" && variant === "nav" && "lg:hidden",
          )}
          priority={variant === "nav"}
        />
      )}
    </span>
  );

  if (href !== false) {
    return (
      <Link href={href || "/"} aria-label="Digiteq home" className="shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
