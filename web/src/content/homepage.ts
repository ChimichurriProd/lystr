/**
 * All homepage copy, centralised as typed data.
 * Source of truth until we add a CMS (Foundation tier — no CMS).
 * Edits go through a PR.
 *
 * Typo corrections from the original lystr.se copy:
 *   - "Avlsuta" → "Avsluta"
 *   - "Clensun" → "Cleansun"
 */

export const hero = {
  eyebrow: "Din livs bästa investering",
  headline: "Byt elavtal.\nBehåll din ekonomi.\nÄg din energi.",
  subhead:
    "Teckna energiavtal med Lystr och få solceller och batteri utan att lägga en krona. Efter avtalstiden äger du din egen energiproduktion i 30+ år framåt.",
  primaryCta: { label: "Få en gratis energirådgivning", href: "#kalkylator" },
  secondaryCta: {
    label: "Boka möte direkt",
    href: "https://www.calendly.com/mathias-soderstrom-lystr",
  },
};

export const customerJourney = {
  eyebrow: "Så blir du kund",
  title: "Från intresse till installation på 6 veckor.",
  steps: [
    {
      number: "01",
      title: "Räkna ut din besparing",
      body:
        "Använd vår kalkylator. På två minuter får du en uppskattning av vad ett avtal med Lystr skulle kosta dig, och vad du sparar över tid.",
    },
    {
      number: "02",
      title: "Prata med en rådgivare",
      body:
        "Vi går igenom din situation tillsammans. Din el-användning, ditt tak, dina mål. Ingen säljpitch, bara en rak konversation.",
    },
    {
      number: "03",
      title: "Installation klar på 6 veckor",
      body:
        "Vi projekterar, installerar, försäkrar och servar hela anläggningen. Du börjar producera din egen el. 30 års garanti.",
    },
  ],
};

export const calculator = {
  eyebrow: "Din uppskattning",
  title: "Vad skulle Lystr kosta dig?",
  subtitle:
    "Tre frågor, två minuter. Inga uppgifter lagras innan du väljer att boka möte.",
  steps: {
    postnummer: {
      label: "Var bor du?",
      help: "Ange postnummer. Vi använder det för att uppskatta soltillgång och lokala nätavgifter.",
    },
    bill: {
      label: "Vad betalar du för el idag?",
      help: "Genomsnittlig månadskostnad inklusive skatt och överföring.",
      presets: [1500, 2500, 3500, 5000],
    },
    housing: {
      label: "Vilken boendeform?",
      options: [
        { value: "villa", label: "Villa" },
        { value: "radhus", label: "Radhus" },
        { value: "fritidshus", label: "Fritidshus" },
        { value: "lagenhet", label: "Lägenhet" },
      ],
    },
  },
  ineligible: {
    title: "Tyvärr. Lystr passar inte lägenhetsboende.",
    body: "Vårt avtal förutsätter eget tak för solceller. Bor du i bostadsrätt eller hyresrätt kan du inte teckna avtal med oss idag.",
  },
  result: {
    heading: "Din uppskattning är klar",
    contractLabel: "Under avtalstiden (8 år)",
    postContractLabel: "Efter avtalstiden",
    currentLabel: "Din nuvarande kostnad",
    lifetimeSavings: "Total besparing över 30 år",
    houseValue: "Värdehöjning på ditt hus",
    ctaPrimary: "Få en detaljerad offert",
    ctaSecondary: "Boka möte direkt",
    fineprint:
      "Uppskattning baserad på genomsnittliga värden. Din faktiska offert beräknas utifrån tak, förbrukningsprofil och aktuella priser.",
  },
};

export const leadForm = {
  title: "Anmäl ditt intresse — vi ringer upp",
  subtitle:
    "En av våra rådgivare ringer dig inom 1–2 arbetsdagar och går igenom siffrorna, taket och nästa steg. Inga säljskript, bara en rak konversation.",
  fields: {
    name: "För- och efternamn",
    email: "E-post",
    phone: "Telefon",
  },
  submit: "Bli uppringd",
  success: {
    title: "Tack. Vi hör av oss snart.",
    body: "En rådgivare ringer dig inom 1–2 arbetsdagar. Vill du boka tid direkt istället?",
  },
  consent:
    "Genom att skicka godkänner du att Lystr kontaktar dig angående ditt intresse.",
};

export const pillars = [
  {
    title: "Ekonomi",
    body:
      "Samma månadskostnad som idag, men pengarna bygger din egen anläggning. Efter 8 år rasar din elräkning.",
  },
  {
    title: "Oberoende",
    body:
      "Fri från elbolagen. När priserna skjuter i höjden och vinstvarningar trillar in — det händer inte dig.",
  },
  {
    title: "Trygghet",
    body:
      "30 års garanti på anläggningen. Egen el när nätet sviker. Svensk sol, vind och vatten — inga bindningar till utländska bolag.",
  },
];

export const howItWorks = {
  eyebrow: "Så fungerar det",
  title: "Samma månadskostnad. Helt annat värde.",
  subtitle:
    "Med Lystr betalar du ungefär samma månadsbelopp som idag. Men pengarna bygger din egen energianläggning istället för att försvinna till kraftbolaget. Ändra beloppet nedan och se hur det ser ut för dig.",
  presets: [1500, 2500, 3500, 5000],
  phases: {
    today: {
      label: "Din kostnad idag",
      caption: "Hela beloppet går till staten, nätägaren och kraftbolaget. Ingen del av det blir din egendom.",
      destination: "Varje krona går rakt in i elbolagens resultaträkning.",
      // Swedish electricity cost breakdown (approximate, illustrative)
      segments: [
        { key: "skatt", label: "Skatt & moms", share: 0.30 },
        { key: "nat", label: "Nätavgift", share: 0.35 },
        { key: "el", label: "Elhandel", share: 0.35 },
      ],
    },
    contract: {
      label: "Med Lystr, år 1 till 8",
      caption: "55% av din månadskostnad går till att betala av din egen anläggning. Efter 8 år äger du den.",
      destination: "Majoriteten går till att bygga din egen anläggning.",
      segments: [
        { key: "amortering", label: "Amortering på din anläggning", share: 0.55 },
        { key: "service", label: "Service & försäkring", share: 0.15 },
        { key: "elgrid", label: "El från nätet", share: 0.30 },
      ],
    },
    post: {
      label: "Efter avtalstiden, år 9 och framåt",
      caption: "75% lägre elkostnad för resten av anläggningens livstid (30–50 år). Helt egen produktion, plus ett litet tillskott från nätet vinterstid.",
      destination: "Du betalar dig själv. Elbolagen är i stort sett ute ur ekvationen.",
      // Only 25% of container width; single segment
      relativeWidth: 0.25,
      segments: [
        { key: "elgrid-small", label: "El från nätet", share: 1.0 },
      ],
    },
  },
  insight: {
    headline: "Samma månadskostnad. Helt annan mottagare.",
    body:
      "Idag betalar du elbolaget. Imorgon betalar du dig själv. Det är skillnaden i en mening — och efter 8 år äger du hela anläggningen.",
  },
};

export const benefits = [
  {
    title: "Du betalar inte mer. Men du får din egen energiproduktion.",
    body:
      "Vi matchar din nuvarande totala energikostnad. Efter avtalstiden (8 år) har du gratis egen el från din anläggning i minst 30 år.",
  },
  {
    title: "Ingen investering. Men du höjer värdet på ditt hus.",
    body:
      "Du slipper lägga ut pengar, men värdet på ditt hus stiger med i genomsnitt över 200 000 kr.",
  },
  {
    title: "Allt ingår. Vi sköter hela paketet.",
    body:
      "Finansiering, installation, försäkring, service, energiupphandling och support. Även solcellstvätt ingår vid behov.",
  },
  {
    title: "Inga elavbrott, och du stärker svenska totalförsvaret.",
    body:
      "När strömmen går, oavsett om det är storm eller främmande makt, har du fortfarande energi hemma.",
  },
  {
    title: "Din egen el. Inte elbolagens.",
    body:
      "Du är inte längre beroende av eljättarna. När elpriset skjuter i höjden under vinterhalvåret märker du det knappt — du producerar din egen.",
  },
  {
    title: "Full flexibilitet. Ingen bindning, inga straffavgifter.",
    body:
      "Avsluta avtalet när du vill genom att betala återstoden av lånet. Vi tror på frihet, inte krångliga villkor.",
  },
];

export const faq = [
  {
    q: "Kan man vara helt utan elnätet?",
    a: [
      "Nej, inte hela året. Sommartid klarar du dig i praktiken obegränsat utan nätström. Vintertid räcker batteriet vanligtvis 1–3 dagar, därefter behövs komplettering från elnätet.",
      "I Sverige har vi unika förutsättningar: ljusa, energirika somrar men också krävande vintrar. Därför kombineras din anläggning alltid med nätanslutning för maximal driftsäkerhet.",
    ],
  },
];

export const footer = {
  phone: "010 - 55 10 400",
  email: "info@lystr.se",
  parent: "En del av Cleansun Sverige AB",
  address: ["Stockholmsvägen 18", "181 50 Lidingö"],
  copyright: `© ${new Date().getFullYear()} Lystr`,
};

/**
 * Social accounts. Only Lystr's company LinkedIn exists today. Instagram /
 * Facebook / YouTube not live; ready to add when set up.
 */
export const social = [
  {
    platform: "LinkedIn",
    handle: "lystr-energy",
    url: "https://se.linkedin.com/company/lystr-energy",
  },
  // { platform: "Instagram", handle: "lystr", url: "https://instagram.com/lystr" },
  // { platform: "Facebook", handle: "lystr", url: "https://facebook.com/lystr" },
];
