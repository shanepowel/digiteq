import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getLegalDocument(filename: string) {
  const filePath = path.join(process.cwd(), "content/legal", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const content = parsed.content
    .replace(/^#\s+[^\n]+\n+/, "")
    .replace(/^Last updated:[^\n]+\n+/i, "")
    .trim();

  const lastUpdated =
    typeof parsed.data.lastUpdated === "string" ? parsed.data.lastUpdated : undefined;

  const updatedLabel = lastUpdated
    ? new Date(`${lastUpdated}T12:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : undefined;

  return { content, updatedLabel };
}
