import type { PressRelease } from "./content-types";

/**
 * Press releases. Newest first at render time (sorted by date desc in the
 * index page). Add new releases at the top of this array or anywhere —
 * they're sorted by date in the UI regardless.
 *
 * SAMPLE CONTENT — replace when real releases are approved.
 */

export const pressContact = {
  name: "Lystr Press",
  email: "press@lystr.se",
  phone: "010 - 55 10 400",
};

export const pressReleases: PressRelease[] = [
  {
    slug: "lystr-1000-tecknade-avtal",
    title: "Lystr tecknar sitt 1000:e energiavtal",
    date: "2026-04-15",
    excerpt:
      "Det svenska energibolaget Lystr har nått milstolpen 1000 tecknade energiavtal. Företaget tredubblar sin installationskapacitet under 2026.",
    body: [
      {
        type: "p",
        text: "Lystr, ett dotterbolag till Cleansun Sverige AB, har tecknat sitt 1000:e energiavtal sedan lanseringen. Avtalen omfattar solcellsanläggning, batterilagring och ett åttaårigt finansieringsupplägg där kunden efter avtalstiden äger hela anläggningen.",
      },
      {
        type: "h2",
        text: "Snabb tillväxt genom unik modell",
      },
      {
        type: "p",
        text: "Lystrs modell skiljer sig från traditionella solcellsförsäljare. Kunden betalar ingenting upp till kontraktstecknande — månadskostnaden matchar i stället kundens nuvarande elräkning. Pengarna går till att amortera anläggningen snarare än till kraftbolag, och efter åtta år äger kunden systemet själv.",
      },
      {
        type: "p",
        text: "Efter avtalstiden sjunker kundens elkostnader med upp till 75 procent för resten av anläggningens livslängd, som uppskattas till 45–50 år.",
      },
      {
        type: "h2",
        text: "Om Lystr",
      },
      {
        type: "p",
        text: "Lystr är ett svenskt energibolag som erbjuder hushåll att ta steget till egen energiproduktion utan egen investering. Bolaget är en del av Cleansun Sverige AB och arbetar i samarbete med ETC El via partnerskapet Elfrihet.",
      },
    ],
  },
  {
    slug: "lystr-elfrihet-partnerskap",
    title: "Lystr och ETC El fördjupar samarbetet kring Elfrihet",
    date: "2026-02-10",
    excerpt:
      "Energiabonnemanget Elfrihet, ett samarbete mellan Lystr och ETC El, fortsätter att växa snabbt. Nu utökas erbjudandet till fler regioner i södra Sverige.",
    body: [
      {
        type: "p",
        text: "Partnerskapet mellan Lystr och ETC El, som sedan 2024 erbjuder energiabonnemanget Elfrihet till ETC:s medlemmar, utökas geografiskt under våren 2026.",
      },
      {
        type: "p",
        text: "Elfrihet kombinerar Lystrs solcells- och batterilösning med ETC El:s elhandelsavtal. För kunder innebär det ett helhetsgrepp där både installation, finansiering och elleverans hanteras i ett abonnemang.",
      },
      {
        type: "h2",
        text: "Om Elfrihet",
      },
      {
        type: "p",
        text: "Elfrihet är ett samarbete mellan Lystr och ETC El. Mer information finns på etcel.se/elfrihet.",
      },
    ],
  },
];
