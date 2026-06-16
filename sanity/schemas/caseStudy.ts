import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", type: "reference", to: [{ type: "company" }] }),
    defineField({ name: "challenge", type: "text" }),
    defineField({ name: "solution", type: "text" }),
    defineField({
      name: "results",
      type: "array",
      of: [
        defineField({
          name: "result",
          type: "object",
          fields: [
            { name: "metric", type: "string" },
            { name: "value", type: "string" },
          ],
        }),
      ],
    }),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
});
