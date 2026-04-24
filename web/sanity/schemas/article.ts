import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artikel",
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
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Guide", value: "Guide" },
          { title: "Om avtalet", value: "Om avtalet" },
          { title: "Nyheter", value: "Nyheter" },
          { title: "Teknik", value: "Teknik" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Skribent",
      type: "reference",
      to: [{ type: "author" }],
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
            { title: "Citat", value: "blockquote" },
          ],
          lists: [
            { title: "Punktlista", value: "bullet" },
            { title: "Numrerad lista", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Fet", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
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
  ],
  orderings: [
    {
      title: "Publiceringsdatum, nyast först",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "date",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: [subtitle, date].filter(Boolean).join(" · "),
      };
    },
  },
});
