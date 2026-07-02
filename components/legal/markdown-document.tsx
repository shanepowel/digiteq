import ReactMarkdown from "react-markdown";
import { DhPageHero, DhSection } from "@/components/layout/dh-primitives";

export function MarkdownDocument({ content, title }: { content: string; title: string }) {
  return (
    <>
      <DhPageHero eyebrow="Legal" title={title} titleClassName="max-w-[24ch]" />
      <DhSection className="!pt-0">
        <div className="prose-digiteq mx-auto max-w-[720px]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </DhSection>
    </>
  );
}
