import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { pageContent } from "@/data/site";

type PageKey = keyof typeof pageContent;

export function ContentPage({ page, children }: { page: PageKey; children?: React.ReactNode }) {
  const content = pageContent[page];

  return (
    <>
      <Nav />
      <main className="pt-16">
        <section className="px-6 py-24 sm:px-12">
          <Container>
            <h1 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{content.body}</p>
            <Button className="mt-8" asChild>
              <Link href="/contact">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Container>
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}
