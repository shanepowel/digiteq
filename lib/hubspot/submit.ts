import { Client } from "@hubspot/api-client";

let hubspot: Client | null = null;

export function getHubspotClient() {
  if (!hubspot) {
    hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
  }
  return hubspot;
}

export type ContactPayload = {
  email: string;
  name?: string;
  company?: string;
  website?: string;
  interest?: string;
  message?: string;
};

export async function submitContactToHubspot(payload: ContactPayload) {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) return;

  const client = getHubspotClient();
  await client.crm.contacts.basicApi.create({
    properties: {
      email: payload.email,
      firstname: payload.name || "",
      company: payload.company || "",
      website: payload.website || "",
      lifecyclestage: "lead",
      lead_source: "Digiteq Website",
      interest: payload.interest || "General Contact",
    },
  });
}
