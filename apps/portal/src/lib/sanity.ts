import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fr7gld8d";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export function getSanityClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-06-15",
    useCdn: true,
  });
}

export type SanityCompany = {
  name: string;
  slug: string;
  description?: string;
  metrics?: { label: string; value: string }[];
};

export type SanityInsight = {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
};

export type SanityVenture = {
  name: string;
  stage?: string;
  industry?: string;
  description?: string;
  status?: string;
};

export async function fetchPortfolioCompanies() {
  return getSanityClient().fetch<SanityCompany[]>(
    `*[_type == "company"] | order(order asc) {
      name, "slug": slug.current, description, metrics
    }`,
  );
}

export async function fetchCompanyBySlug(slug: string) {
  return getSanityClient().fetch<SanityCompany | null>(
    `*[_type == "company" && slug.current == $slug][0] {
      name, "slug": slug.current, description, metrics
    }`,
    { slug },
  );
}

export async function fetchInsights() {
  return getSanityClient().fetch<SanityInsight[]>(
    `*[_type == "insight"] | order(publishedAt desc) {
      title, "slug": slug.current, excerpt, category
    }`,
  );
}

export async function fetchVentures() {
  return getSanityClient().fetch<SanityVenture[]>(
    `*[_type == "venture"] | order(name asc) {
      name, stage, industry, description, status
    }`,
  );
}
