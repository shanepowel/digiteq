export const PORTFOLIO_QUERY = `*[_type == "company" && featured == true] | order(order asc) {
  _id, name, "slug": slug.current, description, website,
  "logo": logo.asset->url,
  metrics, services
}`;

export const INSIGHTS_QUERY = `*[_type == "insight"] | order(publishedAt desc) [0...6] {
  _id, title, "slug": slug.current, excerpt, category,
  publishedAt, "featuredImage": featuredImage.asset->url,
  "author": author->{ name, "photo": photo.asset->url }
}`;

export const ALL_INSIGHTS_QUERY = `*[_type == "insight"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, category, publishedAt
}`;

export const VENTURES_QUERY = `*[_type == "venture"] | order(name asc) {
  _id, name, stage, industry, url, description, status
}`;

export const TEAM_QUERY = `*[_type == "teamMember"] | order(name asc) {
  _id, name, role, bio, "photo": photo.asset->url, linkedin
}`;

export const CASE_STUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc) {
  _id, title, "slug": slug.current,
  "client": client->{ name, "slug": slug.current },
  challenge, solution,
  results,
  "featuredImage": featuredImage.asset->url
}`;

export const CASE_STUDY_BY_SLUG = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id, title, "slug": slug.current,
  "client": client->{ name, "slug": slug.current },
  challenge, solution,
  results,
  featuredImage,
  content
}`;

export const INSIGHT_BY_SLUG = `*[_type == "insight" && slug.current == $slug][0] {
  ..., "slug": slug.current,
  "featuredImage": featuredImage.asset->url,
  "author": author->{ name, role, "photo": photo.asset->url }
}`;

export const COMPANY_BY_SLUG = `*[_type == "company" && slug.current == $slug][0] {
  ..., "slug": slug.current,
  "logo": logo.asset->url
}`;

export const ALL_COMPANY_SLUGS = `*[_type == "company" && defined(slug.current)]{ "slug": slug.current }`;
export const ALL_INSIGHT_SLUGS = `*[_type == "insight" && defined(slug.current)]{ "slug": slug.current }`;
export const ALL_CASE_STUDY_SLUGS =
  `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`;
