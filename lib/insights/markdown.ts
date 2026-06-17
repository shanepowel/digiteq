import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type InsightFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  readTime?: string;
  seo?: { title?: string; description?: string };
};

const insightsDir = path.join(process.cwd(), "content/insights");

export function getInsightSlugs(): string[] {
  if (!fs.existsSync(insightsDir)) return [];
  return fs
    .readdirSync(insightsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getInsightMarkdown(slug: string) {
  const filePath = path.join(insightsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as InsightFrontmatter,
    content,
  };
}

export function getAllInsightFrontmatter(): InsightFrontmatter[] {
  return getInsightSlugs()
    .map((slug) => getInsightMarkdown(slug)?.frontmatter)
    .filter((item): item is InsightFrontmatter => Boolean(item))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}
