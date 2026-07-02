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
      description: "Register category label",
    }),
    defineField({
      name: "position",
      type: "string",
      description: "Holding position in the register",
      options: {
        list: [
          { title: "Operating", value: "Operating" },
          { title: "Pre-seed", value: "Pre-seed" },
          { title: "In evaluation", value: "In evaluation" },
        ],
      },
    }),
    defineField({
      name: "keyFigure",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "value", type: "string", title: "Value" },
        {
          name: "trend",
          type: "string",
          title: "Trend",
          options: {
            list: [
              { title: "Positive", value: "positive" },
              { title: "Flat", value: "flat" },
              { title: "Evaluation", value: "eval" },
            ],
          },
        },
      ],
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
