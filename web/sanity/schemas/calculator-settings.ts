import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton document — only one should ever exist. */
export const calculatorSettings = defineType({
  name: "calculatorSettings",
  title: "Kalkylator — inställningar",
  type: "document",
  fields: [
    defineField({
      name: "contractYears",
      title: "Avtalstid (år)",
      type: "number",
      validation: (r) => r.required().min(1),
      initialValue: 8,
    }),
    defineField({
      name: "postContractYears",
      title: "Antal år efter avtalstid att räkna besparing på",
      type: "number",
      validation: (r) => r.required().min(1),
      initialValue: 30,
    }),
    defineField({
      name: "postContractRatio",
      title: "Andel av dagens kostnad efter avtalstid (0–1)",
      description:
        "0.25 = kostnaden sjunker med 75% efter avtalstiden. Justera när faktiska siffror är fastställda.",
      type: "number",
      validation: (r) => r.required().min(0).max(1),
      initialValue: 0.25,
    }),
    defineField({
      name: "houseValueIncrease",
      title: "Värdeökning på huset (kr)",
      type: "number",
      validation: (r) => r.required().min(0),
      initialValue: 200000,
    }),
    defineField({
      name: "billPresets",
      title: "Förvalda månadskostnader (kr)",
      description: "Chipsen i kalkylatorn.",
      type: "array",
      of: [defineArrayMember({ type: "number" })],
      initialValue: [1500, 2500, 3500, 5000],
    }),

    // Phase copy + segment breakdowns
    defineField({
      name: "phases",
      title: "Fasbeskrivningar",
      type: "object",
      fields: [
        { name: "todayLabel", type: "string", title: "Idag — rubrik" },
        { name: "todayCaption", type: "text", rows: 2, title: "Idag — text" },
        {
          name: "todayDestination",
          type: "string",
          title: "Idag — vart pengarna går",
        },
        {
          name: "todaySegments",
          type: "array",
          title: "Idag — segment",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "key", type: "string", title: "Nyckel" },
                { name: "label", type: "string", title: "Etikett" },
                { name: "share", type: "number", title: "Andel (0–1)" },
              ],
            }),
          ],
        },

        { name: "contractLabel", type: "string", title: "Avtal — rubrik" },
        { name: "contractCaption", type: "text", rows: 2, title: "Avtal — text" },
        {
          name: "contractDestination",
          type: "string",
          title: "Avtal — vart pengarna går",
        },
        {
          name: "contractSegments",
          type: "array",
          title: "Avtal — segment",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "key", type: "string", title: "Nyckel" },
                { name: "label", type: "string", title: "Etikett" },
                { name: "share", type: "number", title: "Andel (0–1)" },
              ],
            }),
          ],
        },

        { name: "postLabel", type: "string", title: "Efter avtal — rubrik" },
        { name: "postCaption", type: "text", rows: 2, title: "Efter avtal — text" },
        {
          name: "postDestination",
          type: "string",
          title: "Efter avtal — vart pengarna går",
        },
      ],
    }),

    defineField({
      name: "insightHeadline",
      title: "Insikt — rubrik",
      type: "string",
    }),
    defineField({
      name: "insightBody",
      title: "Insikt — text",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "ineligibleTitle",
      title: "Ej kvalificerad — rubrik",
      type: "string",
      initialValue: "Tyvärr. Lystr passar inte lägenhetsboende.",
    }),
    defineField({
      name: "ineligibleBody",
      title: "Ej kvalificerad — text",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "disclaimerTitle",
      title: "Friskrivning — rubrik",
      type: "string",
      initialValue: "Preliminär uppskattning",
    }),
    defineField({
      name: "disclaimerBody",
      title: "Friskrivning — text",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Kalkylator — inställningar" };
    },
  },
});
