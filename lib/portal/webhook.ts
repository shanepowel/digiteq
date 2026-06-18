import type { InvestmentPayload } from "@/lib/hubspot/investment";

export async function forwardInvestmentToPortal(payload: InvestmentPayload) {
  const url = process.env.MARKETING_INVESTMENT_WEBHOOK_URL;
  const secret = process.env.PORTAL_INBOUND_SECRET;

  if (!url || !secret) {
    return { skipped: true as const };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-portal-secret": secret,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Portal webhook failed");
  }

  return { skipped: false as const };
}
