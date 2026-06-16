import { createClient, type SanityClient } from "@sanity/client";

let client: SanityClient | null = null;

export function getSanityClient() {
  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2026-06-15",
      useCdn: true,
    });
  }
  return client;
}

export function getSanityWriteClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2026-06-15",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
}
