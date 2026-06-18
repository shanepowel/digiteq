import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { searchPortfolio, summarizeSearchResults } from "@/lib/search";

const bodySchema = z.object({
  query: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  const gate = await requireRole(["INTERNAL"]);
  if (!gate.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: gate.reason === "unauthenticated" ? 401 : 403 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const hits = await searchPortfolio(parsed.data.query);
  const summary = await summarizeSearchResults(
    parsed.data.query,
    hits.map((hit) => ({ type: hit.type, title: hit.title })),
  );

  return NextResponse.json({ hits, summary });
}
