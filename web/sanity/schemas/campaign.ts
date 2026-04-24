import { defineField, defineType } from "sanity";

export const campaign = defineType({
  name: "campaign",
  title: "Kampanj",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internt namn",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL om landningssida används)",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Utkast", value: "draft" },
          { title: "Aktiv", value: "active" },
          { title: "Arkiverad", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Startdatum",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "Slutdatum",
      type: "date",
    }),

    defineField({
      name: "banner",
      title: "Banderoll på startsidan",
      description: "Om aktiv visas denna som en banderoll högst upp på sidan.",
      type: "object",
      fields: [
        { name: "text", title: "Text", type: "string" },
        { name: "ctaLabel", title: "CTA-text", type: "string" },
        { name: "ctaHref", title: "CTA-länk", type: "string" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
