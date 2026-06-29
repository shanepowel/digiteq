import type { PortableTextBlock } from "next-sanity";

export type CompanyMetric = { label: string; value: string };

export type Company = {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  website?: string;
  logo?: string;
  metrics?: CompanyMetric[];
  services?: string[];
  order?: number;
};

export type Insight = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  featuredImage?: string;
  author?: { name?: string; role?: string; photo?: string };
  content?: unknown[];
  seo?: { title?: string; description?: string };
};

export type Venture = {
  _id: string;
  name: string;
  stage?: string;
  industry?: string;
  url?: string;
  description?: string;
  status?: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
};

export type CaseStudyResult = { metric?: string; value?: string };

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  client?: { name?: string; slug?: string };
  challenge?: string;
  solution?: string;
  results?: CaseStudyResult[];
  featuredImage?: string;
  content?: PortableTextBlock[];
};
