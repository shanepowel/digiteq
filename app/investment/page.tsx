import { ContentPage } from "@/components/content-page";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { investmentCriteria } from "@/data/site";

export const metadata = { title: "Investment" };

export default function InvestmentPage() {
  return (
    <ContentPage page="investment">
      <section className="px-6 pb-24 sm:px-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investmentCriteria.map((item) => (
              <Card key={item} className="p-6">
                <p className="text-sm text-foreground">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </ContentPage>
  );
}
