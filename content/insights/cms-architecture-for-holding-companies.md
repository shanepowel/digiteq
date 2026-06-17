---
title: "How holding companies should use CMS architecture"
slug: "cms-architecture-for-holding-companies"
excerpt: "Structured content as an operating layer, not a marketing afterthought."
category: "Technology"
publishedAt: "2026-05-08"
author: "Shane Powell"
seo:
  title: "CMS architecture for holding companies | Digiteq Insights"
  description: "Why digital holding companies need structured content architecture, not marketing page builders, and how to implement it with a headless CMS."
---

Most holding companies treat their website as a brochure. A homepage, an about page, a list of portfolio companies, and a contact form. The CMS, if there is one, is WordPress with a page builder. Content is unstructured. There is no shared data model between the parent and its subsidiaries. Every update requires someone to manually edit HTML or drag blocks around a visual editor.

This is a missed opportunity. For a digital holding company, the CMS is not a publishing tool. It is an operating layer. When structured correctly, it becomes the single source of truth for every brand, product, metric, team member, and piece of content across the entire group.

## The problem with page-shaped content

Most CMSes store content as pages. A page has a title, a body, maybe some metadata. The body is a rich text blob or a set of visual blocks. This works fine for a single-brand marketing site. It fails entirely for a holding company.

Consider the portfolio section on Digiteq's homepage. Each company card shows a name, description, metrics, and a link. Those same companies appear on the portfolio page, on the about page, in case studies, and in insights articles. If each appearance is a separate block of content on a separate page, you have five copies of the same information that will inevitably drift out of sync.

The fix is not discipline. The fix is architecture. Each company should exist as a single structured document in the CMS. Every page that references that company should pull from the same source. Change the metrics once, and they update everywhere.

## Document types, not pages

In Digiteq's Sanity CMS, we define six document types: company, venture, insight, caseStudy, teamMember, and investmentOpportunity. These are not pages. They are data objects with defined fields, validation rules, and relationships.

A company document has a name, slug, logo, description, services array, metrics array, featured boolean, and sort order. It does not have a "page layout" or "hero section." The layout is the responsibility of the frontend. The CMS holds the structured data.

This separation matters because the same company data powers multiple surfaces. The homepage portfolio grid queries for featured companies ordered by sort order. The portfolio page queries for all companies. A case study references a company by relation, not by copy-pasting the name. An insight article can embed a company card inline without duplicating any data.

## GROQ over REST

Sanity uses GROQ, a query language purpose-built for structured content. It lets the frontend request exactly the data it needs, including joined references, computed fields, and filtered subsets, in a single query.

For example, the homepage portfolio section runs a single query that fetches all featured companies with their metrics, ordered by position. The insight listing page runs a query that fetches articles with their author references resolved inline. No waterfalls. No over-fetching. No N+1 problems.

This matters for performance. It also matters for developer experience. Every page component declares its data dependencies explicitly. There is no ambiguity about where the data comes from or how it is shaped.

## Content as an operating layer

Once the document types are in place, the CMS becomes something more useful than a publishing tool. It becomes the group's operational data layer.

When Digiteq acquires a new company, the onboarding process includes creating a company document in Sanity. That single action populates the homepage, the portfolio page, the about page, and any case study or insight that references the company. The team does not need to update multiple pages. The architecture handles propagation.

When metrics change quarterly, updating the metrics array on a company document refreshes every surface. When a new team member joins, their teamMember document makes them available for author attribution on insights and for display on the about page.

This is what it means to treat content as infrastructure rather than marketing. The CMS is not where you write blog posts. It is where you define the state of the group.

## Multi-brand content strategy

A holding company CMS also needs to handle content that spans brands. An insight article might reference multiple portfolio companies. A case study might involve collaboration between BMKRS and FreelanceNearMe. A venture might graduate into a full portfolio company.

Sanity's reference system handles this natively. Any document can reference any other document. An insight's author field points to a teamMember document. A case study's client field points to a company document. These are typed, validated references, not free text. If a company is renamed, every reference updates automatically.

For holding companies managing multiple brands with shared content, this relational model eliminates an entire category of manual coordination work.

## Practical recommendations

If you are building or restructuring a holding company's digital presence, here is what we would recommend. Use a headless CMS with a structured document model. Sanity, Contentful, or Payload all work. Avoid page builders. Define your document types around business objects (companies, people, content, opportunities), not around pages. Use a typed query language to fetch data per component. Deploy the frontend on a platform with incremental static regeneration so content updates do not require full rebuilds. Set up a webhook from the CMS to trigger on-demand revalidation.

The initial setup takes more thought than installing WordPress. But the operational return, a single source of truth across every brand and surface in the group, compounds over every quarter the business operates.
