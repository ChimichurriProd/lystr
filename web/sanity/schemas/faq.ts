import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Vanlig fråga",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Fråga",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Svar",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Brödtext", value: "normal" }] }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Visningsordning",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "showOnHome",
      title: "Visa på startsidan",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Visningsordning",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question", subtitle: "showOnHome" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? "Visas på start" : "Dold" };
    },
  },
});
