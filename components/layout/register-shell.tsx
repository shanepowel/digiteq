import { HomeFooter } from "@/components/home/home-footer";
import { HomeNav } from "@/components/home/home-nav";
import { HomeSvgDefs } from "@/components/home/home-svg";

export function RegisterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="digiteq-home min-h-screen">
      <div className="dh-grain" aria-hidden="true" />
      <HomeSvgDefs />
      <HomeNav />
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
}
