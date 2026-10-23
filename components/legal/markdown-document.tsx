import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { DhPageHero, DhSection } from "@/components/layout/dh-primitives";

const markdownComponents: Components = {
  // Page hero already carries the title — skip the markdown H1.
  h1: () => null,
};

export function MarkdownDocument({
  content,
  title,
  updatedLabel,
}: {
  content: string;
  title: string;
  updatedLabel?: string;
}) {
  return (
    <>
      <DhPageHero eyebrow="Legal" title={title} titleClassName="max-w-[24ch]">
        {updatedLabel ? (
          <p className="dh-mono mt-4 text-[0.72rem] tracking-[0.12em] text-[var(--brass)]">
            Last updated · {updatedLabel}
          </p>
        ) : null}
      </DhPageHero>
      <DhSection className="!pt-0">
        <article className="dh-legal-doc prose-digiteq mx-auto max-w-[720px]">
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </article>
      </DhSection>
    </>
  );
}
