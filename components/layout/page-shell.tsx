import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
