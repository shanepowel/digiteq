import ReactMarkdown from "react-markdown";

export function MarkdownDocument({ content }: { content: string }) {
  return (
    <section className="px-12 pb-24 pt-32">
      <div className="prose-digiteq mx-auto max-w-[720px]">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
