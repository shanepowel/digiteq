import { ContentPage } from "@/components/content-page";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSanityClient } from "@/lib/sanity/client";
import { VENTURES_QUERY } from "@/lib/sanity/queries";
import type { Venture } from "@/lib/sanity/types";

export const metadata = { title: "Ventures" };

export default async function VenturesPage() {
  let ventures: Venture[] = [];
  try {
    ventures = await getSanityClient().fetch<Venture[]>(VENTURES_QUERY);
  } catch {
    ventures = [];
  }

  return (
    <ContentPage page="ventures">
      <section className="px-6 pb-24 sm:px-12">
        <Container>
          {ventures.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ventures.map((v) => (
                <Card key={v._id}>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {v.stage && <Badge variant="cyan">{v.stage}</Badge>}
                    {v.status && <Badge>{v.status}</Badge>}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{v.name}</h3>
                  {v.industry && <p className="text-sm text-muted">{v.industry}</p>}
                  {v.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted">Venture records will appear here once published in Sanity.</p>
          )}
        </Container>
      </section>
    </ContentPage>
  );
}
