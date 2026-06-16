import { defineField, defineType } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "author", type: "reference", to: [{ type: "teamMember" }] }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Strategy", "Growth", "Technology", "Acquisitions", "Portfolio"],
      },
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
      ],
    }),
  ],
});
