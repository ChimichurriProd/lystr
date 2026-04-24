import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Samarbete",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Namn",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "relationship",
      title: "Relationstyp",
      type: "string",
      description: "T.ex. Moderbolag, Distributionspartner, Leverantör",
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Extern länk",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logotyp",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "order",
      title: "Visningsordning",
      type: "number",
      description: "Lägre nummer visas först.",
      initialValue: 0,
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
    select: { title: "name", subtitle: "relationship", media: "logo" },
  },
});
