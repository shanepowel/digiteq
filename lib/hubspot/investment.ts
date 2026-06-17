export type InvestmentPayload = {
  name: string;
  email: string;
  businessName?: string;
  businessUrl?: string;
  businessType?: string;
  revenueRange?: string;
  yearsOperating?: string;
  trafficSource?: string;
  reason?: string;
  message?: string;
};

export async function submitInvestmentToHubspot(payload: InvestmentPayload) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_INVESTMENT_FORM_ID;

  if (!portalId || !formId) {
    return { skipped: true as const };
  }

  const hubspotRes = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: payload.name },
          { name: "email", value: payload.email },
          { name: "company", value: payload.businessName || "" },
          { name: "website", value: payload.businessUrl || "" },
          { name: "business_type", value: payload.businessType || "" },
          { name: "revenue_range", value: payload.revenueRange || "" },
          { name: "years_operating", value: payload.yearsOperating || "" },
          { name: "traffic_source", value: payload.trafficSource || "" },
          { name: "reason_for_sale", value: payload.reason || "" },
          { name: "message", value: payload.message || "" },
        ],
        context: {
          pageUri: "https://digiteq.io/investment",
          pageName: "Investment Enquiry",
        },
      }),
    },
  );

  if (!hubspotRes.ok) {
    throw new Error("HubSpot investment submission failed");
  }

  return { skipped: false as const };
}
