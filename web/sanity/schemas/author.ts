import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Skribent",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Namn",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Roll",
      type: "string",
      description: "Kort titel, t.ex. 'VD' eller 'Energiexpert'",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn-URL",
      type: "url",
    }),
    defineField({
      name: "avatar",
      title: "Profilbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Kort bio",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
