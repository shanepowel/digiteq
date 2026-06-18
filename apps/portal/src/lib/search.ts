import { prisma, hasDatabase } from "@/lib/db";
import { fetchInsights, fetchPortfolioCompanies, fetchVentures } from "@/lib/sanity";

export async function syncSearchIndex() {
  if (!hasDatabase()) return { indexed: 0 };

  const [companies, insights, ventures, deals] = await Promise.all([
    fetchPortfolioCompanies().catch(() => []),
    fetchInsights().catch(() => []),
    fetchVentures().catch(() => []),
    prisma.pipelineDeal.findMany({ orderBy: { updatedAt: "desc" }, take: 100 }),
  ]);

  const docs: {
    type: string;
    title: string;
    body: string;
    slug?: string;
    url?: string;
  }[] = [];

  for (const company of companies) {
    docs.push({
      type: "company",
      title: company.name,
      body: [company.description, ...(company.metrics?.map((m) => `${m.label} ${m.value}`) ?? [])]
        .filter(Boolean)
        .join(" "),
      slug: company.slug,
      url: `/founder?company=${company.slug}`,
    });
  }

  for (const insight of insights) {
    docs.push({
      type: "insight",
      title: insight.title,
      body: [insight.excerpt, insight.category].filter(Boolean).join(" "),
      slug: insight.slug,
      url: `https://digiteq.io/insights/${insight.slug}`,
    });
  }

  for (const venture of ventures) {
    docs.push({
      type: "venture",
      title: venture.name,
      body: [venture.description, venture.stage, venture.industry, venture.status]
        .filter(Boolean)
        .join(" "),
    });
  }

  for (const deal of deals) {
    docs.push({
      type: "deal",
      title: deal.name,
      body: [deal.summary, deal.industry, deal.revenueRange, deal.stage].filter(Boolean).join(" "),
      url: `/pipeline/${deal.id}`,
    });
  }

  await prisma.searchDocument.deleteMany();
  if (docs.length > 0) {
    await prisma.searchDocument.createMany({
      data: docs.map((doc) => ({
        type: doc.type,
        title: doc.title,
        body: doc.body,
        slug: doc.slug,
        url: doc.url,
      })),
    });
  }

  return { indexed: docs.length };
}

export async function searchPortfolio(query: string) {
  if (!hasDatabase()) return [];

  const q = query.trim();
  if (!q) return [];

  await syncSearchIndex();

  return prisma.searchDocument.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { body: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 20,
    orderBy: { updatedAt: "desc" },
  });
}

export async function summarizeSearchResults(query: string, hits: { type: string; title: string }[]) {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey || hits.length === 0) return null;

  try {
    const { generateText } = await import("ai");
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are an internal assistant for Digiteq Holdings. Summarise these search results for the query "${query}" in 2-3 sentences, UK English, lowercase tone:\n${hits.map((h) => `- [${h.type}] ${h.title}`).join("\n")}`,
    });
    return text;
  } catch {
    return null;
  }
}
