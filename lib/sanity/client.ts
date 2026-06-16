import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

let client: SanityClient | null = null;

export function getSanityClient() {
  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return client;
}

export function getSanityWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
}
