export type Partner = {
  name: string;
  /** One-sentence description of what the partner does. */
  description: string;
  /** Short label for the relationship type (Moderbolag, Distributionspartner, etc.). */
  relationship: string;
  /** External URL for "Läs mer". */
  url?: string;
};

export const partners: Partner[] = [
  {
    name: "Cleansun Sverige AB",
    description:
      "Moderbolaget bakom Lystr. Svenskt bolag med specialisering på solenergi, energilagring och installationer.",
    relationship: "Moderbolag",
    url: "https://www.cleansun.se",
  },
  {
    name: "ETC El",
    description:
      "Elfrihet är ett samarbete mellan Lystr och ETC El, där hushåll kan ta steget till egen energiproduktion via ETC:s medlemsnät.",
    relationship: "Distributionspartner",
    url: "https://etcel.se/elfrihet/",
  },
];

export const partnersIntro = {
  eyebrow: "Samarbeten",
  title: "Vi bygger inte framtidens energibolag ensamma.",
  subtitle:
    "Lystr drivs framåt tillsammans med starka samarbetspartners — från moderbolag till distributionsnätverk. Här är några av dem.",
};
