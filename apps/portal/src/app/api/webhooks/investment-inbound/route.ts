import { NextResponse } from "next/server";
import { z } from "zod";
import { createDealFromInvestment } from "@/lib/pipeline";

const payloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  businessName: z.string().optional(),
  businessUrl: z.string().optional(),
  businessType: z.string().optional(),
  revenueRange: z.string().optional(),
  yearsOperating: z.string().optional(),
  trafficSource: z.string().optional(),
  reason: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const secret = request.headers.get("x-portal-secret");
  if (!process.env.PORTAL_INBOUND_SECRET || secret !== process.env.PORTAL_INBOUND_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const deal = await createDealFromInvestment(parsed.data);
  if (!deal) {
    return NextResponse.json({ skipped: true, reason: "no database" });
  }

  return NextResponse.json({ ok: true, dealId: deal.id });
}
