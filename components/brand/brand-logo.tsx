import Image from "next/image";
import Link from "next/link";
import { brandAlt, brandAssets } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "nav" | "footer";
  /** auto: icon on small screens, lockup on lg+ (nav header only) */
  display?: "auto" | "icon" | "lockup";
  theme?: "dark" | "register";
  href?: string | false;
  className?: string;
};

const sizes = {
  // Wordmark lockup is wide (~3.7:1); keep height fixed and let width flow.
  nav: { lockup: { width: 168, height: 44 }, icon: { width: 32, height: 32 } },
  footer: { lockup: { width: 140, height: 36 }, icon: { width: 28, height: 28 } },
} as const;

export function BrandLogo({
  variant = "nav",
  display = "auto",
  theme = "register",
  href = "/",
  className,
}: BrandLogoProps) {
  const dim = sizes[variant];
  const isNavAuto = display === "auto" && variant === "nav";
  const showLockup = display === "lockup" || isNavAuto || (display === "auto" && variant === "footer");
  const showIcon = display === "icon" || isNavAuto;
  const lockupSrc = theme === "register" ? brandAssets.lockupMono : brandAssets.lockup;

  const content = (
    <span className={cn("inline-flex items-center", className)}>
      {showLockup && (
        <Image
          src={lockupSrc}
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
