import { defineField, defineType } from "sanity";

/** Singleton document with site-wide settings. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-inställningar",
  type: "document",
  fields: [
    defineField({
      name: "pressContactName",
      title: "Presskontakt — namn",
      type: "string",
    }),
    defineField({
      name: "pressContactEmail",
      title: "Presskontakt — e-post",
      type: "string",
    }),
    defineField({
      name: "pressContactPhone",
      title: "Presskontakt — telefon",
      type: "string",
    }),
    defineField({
      name: "partnersIntroEyebrow",
      title: "Partners — eyebrow",
      type: "string",
    }),
    defineField({
      name: "partnersIntroTitle",
      title: "Partners — rubrik",
      type: "string",
    }),
    defineField({
      name: "partnersIntroSubtitle",
      title: "Partners — underrubrik",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site-inställningar" };
    },
  },
});
