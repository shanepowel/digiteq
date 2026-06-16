import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan",
        className,
      )}
    >
      {children}
    </p>
  );
}
