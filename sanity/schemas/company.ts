import { defineField, defineType } from "sanity";

export const company = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "category",
      type: "string",
      description: "Portfolio category label (e.g. Supply, Brand, Marketplace)",
      options: {
        list: [
          { title: "Supply", value: "Supply" },
          { title: "Brand", value: "Brand" },
          { title: "Marketplace", value: "Marketplace" },
        ],
      },
    }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        defineField({
          name: "metric",
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        }),
      ],
    }),
    defineField({ name: "order", type: "number" }),
  ],
});
