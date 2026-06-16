import { defineField, defineType } from "sanity";

export const investmentOpportunity = defineType({
  name: "investmentOpportunity",
  title: "Investment Opportunity",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "industry", type: "string" }),
    defineField({ name: "revenueRange", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["New", "Reviewing", "Diligence", "Passed", "Acquired"] },
    }),
    defineField({ name: "notes", type: "text" }),
  ],
});
