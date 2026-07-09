import { RegisterShell } from "@/components/layout/register-shell";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <RegisterShell>{children}</RegisterShell>;
}
