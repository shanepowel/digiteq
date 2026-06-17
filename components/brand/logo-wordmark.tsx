import { BrandLogo } from "@/components/brand/brand-logo";

type LogoWordmarkProps = {
  variant?: "nav" | "footer";
  display?: "auto" | "icon" | "lockup";
  href?: string | false;
  className?: string;
};

/** @deprecated Use BrandLogo */
export function LogoWordmark(props: LogoWordmarkProps) {
  return <BrandLogo {...props} />;
}
