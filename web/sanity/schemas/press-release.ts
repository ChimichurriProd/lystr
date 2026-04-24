import { defineArrayMember, defineField, defineType } from "sanity";

export const pressRelease = defineType({
  name: "pressRelease",
  title: "Pressmeddelande",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publiceringsdatum",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ingress",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Brödtext",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Brödtext", value: "normal" },
            { title: "Rubrik 2", value: "h2" },
            { title: "Rubrik 3", value: "h3" },
          ],
          lists: [{ title: "Punktlista", value: "bullet" }],
          marks: {
            decorators: [{ title: "Fet", value: "strong" }],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Länk",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) => r.required(),
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactOverride",
      title: "Presskontakt (åsidosätt)",
      description:
        "Lämna tom för att använda standardkontakten från Site Settings.",
      type: "object",
      fields: [
        { name: "name", title: "Namn", type: "string" },
        { name: "email", title: "E-post", type: "string" },
        { name: "phone", title: "Telefon", type: "string" },
      ],
    }),
  ],
  orderings: [
    {
      title: "Publiceringsdatum, nyast först",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date" },
    prepare({ title, date }) {
      return { title, subtitle: date };
    },
  },
});
