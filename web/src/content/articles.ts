import type { Article } from "./content-types";

/**
 * Articles / blog posts. Sorted by date (newest first) in the index page.
 *
 * SAMPLE CONTENT — replace when real articles are ready.
 */

export const articles: Article[] = [
  {
    slug: "solceller-under-vintern",
    title: "Fungerar verkligen solceller i Sverige?",
    date: "2026-04-10",
    author: "Mathias Söderström",
    authorUrl: "https://www.linkedin.com/in/mathias-s%C3%B6derstr%C3%B6m-ab92a7166/",
    // authorImage: "/authors/mathias.jpg", // TODO: add photo when available
    category: "Guide",
    excerpt:
      "En av de vanligaste frågorna vi får: fungerar solceller verkligen i ett land med långa vintrar? Här är det korta svaret, och det längre.",
    body: [
      {
        type: "p",
        text: "Det korta svaret: ja. Det längre svaret: mer än man tror, och det är bättre nu än det någonsin har varit.",
      },
      {
        type: "h2",
        text: "Vinterhalvåret är inte noll",
      },
      {
        type: "p",
        text: "En normaldimensionerad solcellsanläggning i Mellansverige producerar elektricitet från mars till oktober. Under december och januari är produktionen låg, men inte noll. Batterilagring kompletterar och jämnar ut dygnet, och under de mörkaste månaderna tar du el från nätet precis som tidigare.",
      },
      {
        type: "h2",
        text: "Sommaren bär året",
      },
      {
        type: "p",
        text: "Det intressanta är att ett svenskt hushåll med solceller typiskt överproducerar under sommarhalvåret. Det du själv inte hinner använda laddas in i batteriet, och överskottet säljs tillbaka till nätet.",
      },
      {
        type: "p",
        text: "Ett välbalanserat system är inte dimensionerat för att ge dig 100 procent självförsörjning året runt — det är dimensionerat för att ge dig en låg årskostnad sett över hela året.",
      },
      {
        type: "h2",
        text: "Snö och kyla",
      },
      {
        type: "p",
        text: "Moderna solpaneler är ovanligt toleranta mot kyla. Vid låga temperaturer förbättras deras effektivitet något. Snö är mer en praktisk fråga än en teknisk: en brant takvinkel gör att snön glider av snabbt när solen kommer fram.",
      },
    ],
  },
  {
    slug: "vad-betyder-avtalet-for-ditt-hus",
    title: "Vad ett Lystr-avtal faktiskt betyder för ditt hus",
    date: "2026-03-22",
    author: "Mathias Söderström",
    authorUrl: "https://www.linkedin.com/in/mathias-s%C3%B6derstr%C3%B6m-ab92a7166/",
    // authorImage: "/authors/mathias.jpg", // TODO: add photo when available
    category: "Om avtalet",
    excerpt:
      "Ett åttaårigt avtal låter som ett stort beslut. Här går vi igenom exakt vad du binder dig till, vad som ingår, och vad som händer om du flyttar.",
    body: [
      {
        type: "p",
        text: "Ett energiavtal med Lystr är i praktiken ett köp på avbetalning. Du äger inte anläggningen från dag ett, men du äger den från år nio — och du betalar inget ur egen ficka under tiden.",
      },
      {
        type: "h2",
        text: "Det här ingår i avtalet",
      },
      {
        type: "ul",
        items: [
          "Solceller och batteri projekterade specifikt för ditt hus",
          "Installation av certifierad installatör",
          "Försäkring under hela avtalstiden",
          "Service och övervakning",
          "30 års garanti på anläggningen",
        ],
      },
      {
        type: "h2",
        text: "Vad händer om du flyttar?",
      },
      {
        type: "p",
        text: "Om du säljer huset inom avtalstiden finns två vägar. Den första: du betalar av det återstående lånet med köpeskillingen och blir därmed fri. Den andra: avtalet överlåts på köparen av huset, som tar över dina villkor och fortsätter där du slutade. Det blir ofta ett starkt säljargument — en färdig solcellsanläggning med en balanserad driftkalkyl är efterfrågad på bostadsmarknaden.",
      },
      {
        type: "h2",
        text: "Efter år åtta",
      },
      {
        type: "p",
        text: "När avtalet är betalt äger du anläggningen fritt. Din elkostnad blir en bråkdel av vad den var, och anläggningen fortsätter producera energi i 30 till 50 år till.",
      },
    ],
  },
];
