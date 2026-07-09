import { ContactForm } from "@/components/contact-form";
import { DhPageHero, DhSection } from "@/components/layout/dh-primitives";
import { PageShell } from "@/components/layout/page-shell";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.contact);

export default function ContactPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <DhPageHero
        eyebrow="Contact"
        title="Start a conversation."
        lede="Partnerships, investment enquiries, founder discussions, or acquisition proposals — we read every message."
        titleClassName="max-w-[16ch]"
      />
      <DhSection className="!pt-0">
        <ContactForm />
      </DhSection>
    </PageShell>
  );
}
