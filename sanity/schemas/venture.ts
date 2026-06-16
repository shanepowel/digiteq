import { defineField, defineType } from "sanity";

export const venture = defineType({
  name: "venture",
  title: "Venture",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "stage",
      type: "string",
      options: {
        list: ["Idea", "Pre-Seed", "Seed", "Series A", "Growth", "Acquired"],
      },
    }),
    defineField({ name: "industry", type: "string" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["Active", "Stealth", "Exited", "Paused"] },
    }),
  ],
});
