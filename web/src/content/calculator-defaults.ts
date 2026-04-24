import type { CalculatorSettings } from "../../sanity/lib/types";

/**
 * Fallback calculator settings used when Sanity is not yet configured
 * or the calculatorSettings singleton hasn't been created. These mirror
 * the values we shipped in v0 so the site never "breaks" during setup.
 *
 * Source of truth moves to Sanity as soon as the project is connected
 * and the document exists.
 */
export const defaultCalculatorSettings: CalculatorSettings = {
  contractYears: 8,
  postContractYears: 30,
  postContractRatio: 0.25,
  houseValueIncrease: 200000,
  billPresets: [1500, 2500, 3500, 5000],
  phases: {
    todayLabel: "Din kostnad idag",
    todayCaption:
      "Hela beloppet går till staten, nätägaren och kraftbolaget. Ingen del av det blir din egendom.",
    todayDestination: "Varje krona går rakt in i elbolagens resultaträkning.",
    todaySegments: [
      { key: "skatt", label: "Skatt & moms", share: 0.3 },
      { key: "nat", label: "Nätavgift", share: 0.35 },
      { key: "el", label: "Elhandel", share: 0.35 },
    ],
    contractLabel: "Med Lystr, år 1 till 8",
    contractCaption:
      "55% av din månadskostnad går till att betala av din egen anläggning. Efter 8 år äger du den.",
    contractDestination:
      "Majoriteten går till att bygga din egen anläggning.",
    contractSegments: [
      { key: "amortering", label: "Amortering på din anläggning", share: 0.55 },
      { key: "service", label: "Service & försäkring", share: 0.15 },
      { key: "elgrid", label: "El från nätet", share: 0.3 },
    ],
    postLabel: "Efter avtalstiden, år 9 och framåt",
    postCaption:
      "75% lägre elkostnad för resten av anläggningens livstid (30–50 år). Helt egen produktion, plus ett litet tillskott från nätet vinterstid.",
    postDestination:
      "Du betalar dig själv. Elbolagen är i stort sett ute ur ekvationen.",
  },
  insightHeadline: "Samma månadskostnad. Helt annan mottagare.",
  insightBody:
    "Idag betalar du elbolaget. Imorgon betalar du dig själv. Det är skillnaden i en mening — och efter 8 år äger du hela anläggningen.",
  ineligibleTitle: "Tyvärr. Lystr passar inte lägenhetsboende.",
  ineligibleBody:
    "Vårt avtal förutsätter eget tak för solceller. Bor du i bostadsrätt eller hyresrätt kan du inte teckna avtal med oss idag.",
  disclaimerTitle: "Preliminär uppskattning",
  disclaimerBody:
    "Siffrorna är preliminära och beräknade utifrån genomsnittliga värden. Innan ett avtal tecknas räknar Lystrs team fram en exakt kalkyl baserad på ditt tak, din förbrukningsprofil och aktuella priser.",
};
