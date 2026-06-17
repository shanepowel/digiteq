import { NextResponse } from "next/server";
import { submitInvestmentToHubspot, type InvestmentPayload } from "@/lib/hubspot/investment";

export async function POST(request: Request) {
  const payload = (await request.json()) as InvestmentPayload;

  if (!payload.email || !payload.name) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  try {
    await submitInvestmentToHubspot(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }
}
