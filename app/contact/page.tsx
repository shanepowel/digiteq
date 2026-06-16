import { ContentPage } from "@/components/content-page";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/layout/container";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <ContentPage page="contact">
      <section className="px-6 pb-24 sm:px-12">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </ContentPage>
  );
}
