import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#0E1020] p-6 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#13152A]",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export { Card };
