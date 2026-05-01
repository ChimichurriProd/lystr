import Image from "next/image";
import Link from "next/link";
import {
  Battery,
  Calculator as CalculatorIcon,
  Calendar,
  ClipboardCheck,
  House,
  Lightbulb,
  Phone,
  ShieldCheck,
  Sprout,
  Sun,
  TreePine,
  Unlock,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* ============================================================
   /brand — internal brand reference (noindex, no nav).
   Working document for partners, press, and collaborators:
   persona, värdeord, röst, tagline, palette, type, theme
   variants, logotyp + regler, and downloadable assets. Not
   consumer marketing — share by direct link.
   ============================================================ */

export const metadata = {
  title: "Vår identitet · Lystr",
  description:
    "Lystrs varumärke i ett dokument: persona, värdeord, röst, tagline, färger, typografi, teman och nedladdningsbara filer.",
  robots: { index: false, follow: false },
};

/* ---------- Innehåll · TOC-grupper ----------
   Doubles as a brand-scope map: which categories of brand assets
   the document covers. Update whenever a section is added/removed. */
const TOC_GROUPS: { label: string; items: { id: string; label: string }[] }[] = [
  {
    label: "Strategi",
    items: [
      { id: "persona", label: "Persona" },
      { id: "vardeord", label: "Värdeord" },
      { id: "konkurrenter", label: "Konkurrentlandskap" },
    ],
  },
  {
    label: "Röst",
    items: [
      { id: "tagline", label: "Tagline" },
      { id: "rost", label: "Röst & ton" },
      { id: "rost-praktik", label: "Röst i praktiken" },
    ],
  },
  {
    label: "Visuellt",
    items: [
      { id: "stamning", label: "Stämning" },
      { id: "wordmark", label: "Wordmark" },
      { id: "logoregler", label: "Logotyp · regler" },
      { id: "ikoner", label: "Ikoner & symboler" },
      { id: "palett", label: "Palett" },
      { id: "teman", label: "Temavarianter" },
      { id: "typografi", label: "Typografi" },
    ],
  },
  {
    label: "Filer",
    items: [{ id: "nedladdningar", label: "Nedladdningar" }],
  },
];

/* ---------- Persona ---------- */
const PERSONA = {
  name: "Anders & Maria",
  age: "44 & 41 år",
  bio: "Bor i en villa på 150 m² i en småstad eller förort. Två barn, hund, sommarstuga eller drömmen om en. De är inte hippies men inte heller dumma. Elräkningen är en av deras tre största utgifter och de är trötta på att se pengarna försvinna ut till elbolaget varje månad. De gillar tanken på att äga, inte hyra. De berättar gärna för grannen att taket gör elen själv.",
  fields: [
    { label: "Bor", value: "Villa, ~150 m², byggt 80–00-tal, småstad/förort" },
    { label: "Familj", value: "Två barn, hund, sommarstuga eller drömmen om en" },
    { label: "Yrke", value: "Mellanchef, hantverkare med eget, lärare, sjuksköterska — inte tech-elit" },
    { label: "Bil", value: "En, kanske två. Inte nödvändigtvis Tesla." },
    { label: "Elräkning", value: "2 000–4 000 kr/mån, en av tre största utgifter" },
    { label: "Egen bild", value: "”Jag är inte hippie men inte heller en dumskalle som ger pengar till elbolagen.”" },
    { label: "Drömmer om", value: "En extra sommarvecka, en renovering, lugn ekonomi" },
    { label: "Tror på", value: "Eget arbete betalar sig. Långsiktighet. Att inte bli lurad." },
    { label: "Tror inte på", value: "Trender, abonnemang, finstilt" },
  ],
  insight:
    "Anders och Maria köper inte solpaneler. De köper en sommarvecka extra om året och en känsla av att inte längre bli lurade.",
};

/* ---------- Värdeord — fyra hinkar ----------
   Pillars  · the WHY (philosophical core, defended)
   Karaktär · the HOW (operating temperament)
   Vad vi säger · the WHAT WE SAY (messaging beats)
   Stämning · the WHAT IT FEELS LIKE (mood, photo, sound)
*/
const VALUE_BUCKETS = [
  {
    key: "pillars",
    eyebrow: "01 · Pelare",
    title: "Varför Lystr finns.",
    body: "Fem ord som varje beslut, varje rad copy och varje produktval ska kunna spåras tillbaka till. Om något inte hänger ihop med dessa — gör det inte.",
    words: ["Oberoende", "Ägarskap", "Folkhem", "Allemansrätt", "Solen"],
    weight: "primary",
  },
  {
    key: "karaktar",
    eyebrow: "02 · Karaktär",
    title: "Hur vi beter oss.",
    body: "Pelarna säger varför, karaktären säger hur. De här orden styr ton, takt, tempo, prissättning och kundbemötande.",
    words: [
      "Rådgivare",
      "Lurar aldrig",
      "Lagom",
      "Långsiktigt",
      "Tryggt",
      "Pragmatiskt",
      "Konkret",
      "Bestående",
      "Ärlighet",
      "Vardag",
      "Frihet",
    ],
    weight: "secondary",
  },
  {
    key: "vad-vi-sager",
    eyebrow: "03 · Vad vi säger",
    title: "Fraser vi äger.",
    body: "Inte värden — utdata av värden. Återanvänds i copy, rubriker och kampanjer. Ska kännas igen efter ett halvår.",
    words: [
      "Slå dig fri",
      "Inget krångel",
      "Inga elbolag",
      "Inga bindningar",
      "Eget kraftverk",
    ],
    weight: "secondary",
  },
  {
    key: "stamning",
    eyebrow: "04 · Stämning",
    title: "Vad det ska kännas som.",
    body: "Sensoriska ord. De styr fotografi, video, musik, illustration — inte text. Tunbjörk-folkhem-sommar är riktningen.",
    words: [
      "Plåttak",
      "Sommarljus",
      "Bryggan",
      "Stilla",
      "Småfräck",
      "Skördetid",
      "Hemma",
      "Hopp",
      "Lyse",
      "Eftertanke",
      "Värme",
    ],
    weight: "secondary",
  },
];

/* ---------- Röstprinciper ---------- */
const VOICE_PRINCIPLES = [
  {
    word: "Klar",
    body: "Vi pratar som vänner pratar. Inga akronymer, inga fluff-fraser. Om en ingenjör inte kan säga det vid köksbordet är meningen inte färdig.",
  },
  {
    word: "Generös",
    body: "Vi förklarar mer än vi behöver. Vi visar siffrorna, ekonomin, garantierna. Att hålla något hemligt skulle vara att tvivla på vår egen produkt.",
  },
  {
    word: "Lugn",
    body: "Inga utropstecken, inga rea-skyltar, ingen FOMO. Solen rusar inte. Den jobbar i 30 år. Vår ton ska kännas som det.",
  },
  {
    word: "Folklig",
    body: "Allemansrätt-anda. Det här är inte en lyxprodukt — det är ett sätt att äga sin egen energi, för vanliga hushåll, på riktiga tak.",
  },
];

/* ---------- Röst i praktiken — branschen vs. Lystr ---------- */
const VOICE_PAIRS = [
  {
    label: "Säljpitchen",
    note: "Lokala installatörer · Svea Solar, Otovo-säljare",
    bad: "Hör av dig för en gratis offert utan förpliktelser! Vi är marknadens ledande aktör inom solenergi och våra experter står redo att hjälpa dig spara tusentals kronor varje år!",
    good: "Räkna ut din uppskattning på två minuter. En rådgivare ringer upp inom 1–2 arbetsdagar. Ingen kreditupplysning.",
  },
  {
    label: "Techspeak",
    note: "Ingenjör-styrda säljbroschyrer · 1KOMMA5°, generiska solofferter",
    bad: "Vårt fotovoltaiska system levererar 8,4 kWp toppeffekt med en estimerad årlig produktion av 8 200 kWh och en payback period på 9–12 år.",
    good: "Ditt tak gör ungefär 8 000 kWh per år. På åtta år är anläggningen avbetald. Sen jobbar solen gratis i minst 22 år till.",
  },
  {
    label: "Visions-buzz",
    note: "Klimatberättelser · 1KOMMA5°, Vattenfalls hållbarhetssidor",
    bad: "Bli en del av den gröna omställningen och gör din del för planeten — tillsammans bygger vi en hållbar framtid där vi lever på vind och sol för evigt.",
    good: "Sluta hyra el. Äg din egen sol. Resten löser sig.",
  },
  {
    label: "Abonnemangs-låsning",
    note: "Elbolagen · Vattenfall, E.ON, Fortum",
    bad: "Lås in fast månadskostnad på el i 24 månader och slipp oroa dig för prischocker — endast denna vecka!",
    good: "Inget abonnemang. En avbetalning som tar slut. Sen är solen din.",
  },
];

/* ---------- Konkurrentlandskap ----------
   Source: Research/competitive-landscape.md (2026-04-24).
   Four archetypes Lystr sits among on the Swedish market.
   Lystr's distinction is captured in `vs` — the one-line
   positioning move against each archetype. */
const COMPETITORS = [
  {
    name: "1KOMMA5°",
    archetype: "Ägande-bundle, vision-driven",
    body: "Tysk gigant, säljer integrerat paket (sol + batteri + värmepump + EV) i Sverige via CellSolar. Pratar AI, ”Heartbeat”, en framtid på vind och sol för alltid.",
    vs: "Vi är inte en framtidsvision. Vi är ett tak idag, avbetalt om åtta år.",
  },
  {
    name: "Tibber",
    archetype: "Kontrarisk röst, smart prissättning",
    body: "Nordens tonala referens — minimalistiskt, app-lett, tjänar på att du köper el smart i realtid. Inte direkt konkurrent men närmaste tonsläktingen.",
    vs: "Tibber optimerar din elräkning. Vi tar bort den.",
  },
  {
    name: "Elbolagen",
    archetype: "Vattenfall · E.ON · Fortum",
    body: "Säljer abonnemang. Pratar trygghet, prischocker, hållbar omställning. Tjänar på att du fortsätter hyra elen, livet ut.",
    vs: "Elbolagen vill att du hyr. Lystr installerar så att du äger.",
  },
  {
    name: "Lokala installatörer",
    archetype: "Otovo · Svea Solar · regionala",
    body: "Säljer paneler som hårdvara — gratis offert, kontantinsats, kreditupplysning, tre olika garantier från tre olika parter.",
    vs: "Vi är inte en panel-leverantör. Vi är ett 30-årigt kontrakt med solen.",
  },
];

/* ---------- Logotyp-regler ---------- */
const LOGO_DONTS = [
  {
    title: "Töj inte",
    body: "Aldrig icke-proportionell skalning. Bredd och höjd följs alltid åt.",
  },
  {
    title: "Färga inte om",
    body: "Endast svart, vit eller mörka brand-färger på godkända bakgrunder.",
  },
  {
    title: "Rotera inte",
    body: "Logotypen är alltid horisontell. Inga snedställningar, inga vinklar.",
  },
  {
    title: "Lägg inga effekter",
    body: "Ingen drop-shadow, glow, gradient eller outline. Plant i alla lägen.",
  },
  {
    title: "Inga oroliga bakgrunder",
    body: "Aldrig på foto utan tydlig kontrastyta. Använd plattan eller en lugn area.",
  },
  {
    title: "Inga undertexter i fel snitt",
    body: "Tagline sätts i Schibsted Grotesk. Aldrig i annan font under wordmarken.",
  },
];

/* ---------- Ikoner ---------- */
const ICON_GROUPS: {
  label: string;
  intro: string;
  items: { icon: LucideIcon; name: string; usage: string }[];
}[] = [
  {
    label: "Tema",
    intro: "Tre lägen — samma tre symboler i temaomställaren.",
    items: [
      { icon: Lightbulb, name: "Lightbulb", usage: "Bulb-läge · standard" },
      { icon: Sun, name: "Sun", usage: "Sun-läge · värmt" },
      { icon: TreePine, name: "TreePine", usage: "Tree-läge · svalt" },
    ],
  },
  {
    label: "Process",
    intro: "Stegen från intresseanmälan till driftsatt anläggning.",
    items: [
      { icon: CalculatorIcon, name: "Calculator", usage: "Räkna ut uppskattning" },
      { icon: Phone, name: "Phone", usage: "Rådgivaren ringer upp" },
      { icon: House, name: "House", usage: "Hembesök · takanalys" },
      { icon: ClipboardCheck, name: "ClipboardCheck", usage: "Offert & avtal" },
      { icon: Wrench, name: "Wrench", usage: "Installation" },
      { icon: Calendar, name: "Calendar", usage: "Tidslinje · år 1–8" },
      { icon: ShieldCheck, name: "ShieldCheck", usage: "Garanti & försäkring" },
      { icon: Battery, name: "Battery", usage: "Batterilager" },
    ],
  },
  {
    label: "Energi & värde",
    intro: "Symboler för det mer abstrakta — kraft, frihet, besparing.",
    items: [
      { icon: Zap, name: "Zap", usage: "Elektricitet · produktion" },
      { icon: Sun, name: "Sun", usage: "Solen som källa" },
      { icon: Wallet, name: "Wallet", usage: "Besparing · ekonomi" },
      { icon: Unlock, name: "Unlock", usage: "Frihet · bryta sig loss" },
      { icon: Sprout, name: "Sprout", usage: "Hopp · långsiktigt" },
    ],
  },
];

/* ---------- Palett ---------- */
const PALETTE = [
  {
    group: "Ink",
    colors: [
      { name: "lystr-paper", hex: "#ffffff", role: "Yta · kort + tabeller" },
      { name: "lystr-cream", hex: "#f5f1ea", role: "Bas · 90 % av sidan" },
      { name: "lystr-line", hex: "#ddd8cd", role: "Linje · borders" },
      { name: "lystr-muted", hex: "#696a6d", role: "Sekundär text" },
      { name: "lystr-black", hex: "#1c1c1c", role: "Bläck · primär text" },
    ],
  },
  {
    group: "Tomato — primär accent",
    colors: [
      { name: "lystr-tomato", hex: "#d8554a", role: "CTA · pop" },
      { name: "lystr-tomato-hover", hex: "#c44b40", role: "Hover state" },
      { name: "lystr-tomato-deep", hex: "#9a3530", role: "Ink-on-tint" },
      { name: "lystr-tomato-tint", hex: "#f4d6d2", role: "Bakgrundskort" },
    ],
  },
  {
    group: "Sky — eyebrow + länk",
    colors: [
      { name: "lystr-sky", hex: "#a8d0db", role: "Aksent · pale" },
      { name: "lystr-sky-deep", hex: "#2f6478", role: "Eyebrow · länk" },
      { name: "lystr-sky-tint", hex: "#e3eef2", role: "Bakgrundskort" },
    ],
  },
  {
    group: "Green — endast besparing",
    colors: [
      { name: "lystr-green", hex: "#4a9b4a", role: "Saving badge" },
      { name: "lystr-green-deep", hex: "#2a6a2a", role: "Saving text" },
      { name: "lystr-green-tint", hex: "#dceadc", role: "Saving bakgrund" },
    ],
  },
];

const THEMES = [
  {
    id: "bulb",
    label: "Bulb",
    sub: "Standardläge · cream + tomato",
    bg: "#f5f1ea",
    fg: "#1c1c1c",
    accent: "#d8554a",
    accentFg: "#ffffff",
    eyebrow: "#2f6478",
  },
  {
    id: "sun",
    label: "Sun",
    sub: "Värmt · honung + senap",
    bg: "#f0e6c8",
    fg: "#2a1f10",
    accent: "#e8b820",
    accentFg: "#1f1400",
    eyebrow: "#1a3e5e",
  },
  {
    id: "tree",
    label: "Tree",
    sub: "Svalt · eukalyptus + skog",
    bg: "#dde4d4",
    fg: "#1a2a1d",
    accent: "#3a7a3a",
    accentFg: "#ffffff",
    eyebrow: "#2a4a2a",
  },
];

const DOWNLOADS = [
  {
    name: "Wordmark — svart (PNG)",
    file: "/lystr-wordmark-black.png",
    note: "För ljusa bakgrunder. 3000×1500 px, transparent.",
  },
  {
    name: "Wordmark — vit (PNG)",
    file: "/lystr-wordmark-white.png",
    note: "För mörka bakgrunder. 3000×1500 px, transparent.",
  },
];

export default function OurBrandPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
            <div className="max-w-[820px]">
              <Eyebrow>Vår identitet</Eyebrow>
              <h1
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(40px, 5.4vw, 68px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "var(--fg-1)",
                }}
              >
                Ett varumärke om{" "}
                <span className="text-lystr-tomato">solen&nbsp;som&nbsp;insats.</span>
              </h1>
              <p
                className="mt-7 max-w-[60ch] leading-[1.55]"
                style={{
                  color: "var(--fg-2)",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                }}
              >
                Det här är vår arbetshandbok — persona, värdeord, röst,
                färger, typografi och filer på ett ställe. Använd den
                när du skriver om Lystr, designar för oss eller vill
                veta hur vi tänker.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#nedladdningar"
                  className="inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-[22px] py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
                >
                  Hämta filer ↓
                </a>
                <a
                  href="#vardeord"
                  className="border-b pb-px text-[14px] no-underline transition-colors hover:text-[var(--fg-1)]"
                  style={{
                    color: "var(--link-color)",
                    borderColor: "currentColor",
                  }}
                >
                  Se värdeorden
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Innehåll (TOC) ---------- */}
        <section style={{ background: "var(--bg-1)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-12 md:px-8 md:py-16">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-10">
              <Eyebrow>Innehåll</Eyebrow>
              <p
                className="m-0 text-[13px]"
                style={{ color: "var(--fg-3)" }}
              >
                {TOC_GROUPS.reduce((n, g) => n + g.items.length, 0)} sektioner ·{" "}
                4 områden
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
              {TOC_GROUPS.map((g) => (
                <div key={g.label}>
                  <p
                    className="m-0 mb-4 text-[12px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: "var(--fg-3)" }}
                  >
                    {g.label}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-0 p-0">
                    {g.items.map((it) => (
                      <li key={it.id}>
                        <a
                          href={`#${it.id}`}
                          className="group flex items-baseline justify-between gap-3 border-t py-2.5 no-underline transition-colors hover:text-[var(--color-lystr-tomato-deep)]"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--fg-1)",
                          }}
                        >
                          <span className="text-[14px]">{it.label}</span>
                          <span
                            aria-hidden
                            className="text-[14px] transition-transform group-hover:translate-x-0.5"
                            style={{ color: "var(--fg-3)" }}
                          >
                            ↓
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Persona ---------- */}
        <section id="persona" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <div>
                <Eyebrow>Persona</Eyebrow>
                <h2
                  className="m-0 mt-[18px] font-display font-semibold text-pretty"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 40px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: "var(--fg-1)",
                  }}
                >
                  {PERSONA.name},<br />
                  {PERSONA.age}.
                </h2>
                <p
                  className="mt-4 max-w-[40ch] leading-[1.6]"
                  style={{ color: "var(--fg-2)", fontSize: 15 }}
                >
                  {PERSONA.bio}
                </p>
                <div
                  className="mt-6 rounded-2xl p-5"
                  style={{
                    background: "var(--color-lystr-tomato-tint)",
                    color: "var(--color-lystr-tomato-deep)",
                  }}
                >
                  <p className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]">
                    Insikt
                  </p>
                  <p className="m-0 mt-2 text-[15px] leading-[1.5] font-medium">
                    {PERSONA.insight}
                  </p>
                </div>
              </div>
              <dl className="m-0 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border"
                style={{ borderColor: "var(--border)", background: "var(--border)" }}
              >
                {PERSONA.fields.map((f) => (
                  <div
                    key={f.label}
                    className="grid grid-cols-[7rem_1fr] gap-4 p-4 md:p-5"
                    style={{ background: "var(--bg-1)" }}
                  >
                    <dt
                      className="text-[12px] font-medium uppercase tracking-[0.12em]"
                      style={{ color: "var(--fg-3)" }}
                    >
                      {f.label}
                    </dt>
                    <dd
                      className="m-0 text-[14px] leading-[1.5]"
                      style={{ color: "var(--fg-1)" }}
                    >
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------- Värdeord — fyra hinkar ---------- */}
        <section id="vardeord" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Värdeord</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Fyra hinkar, olika jobb.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Pelarna är varför vi finns. Karaktären är hur vi beter oss.
                Fraserna är vad vi säger. Stämningen är vad det ska kännas
                som. Blanda inte ihop dem.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {VALUE_BUCKETS.map((b) => (
                <ValueBucket key={b.key} bucket={b} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Tagline ---------- */}
        <section id="tagline" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <div>
                <Eyebrow>Tagline</Eyebrow>
                <h2
                  className="m-0 mt-[18px] font-display font-semibold text-pretty"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 40px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: "var(--fg-1)",
                  }}
                >
                  Med solen som insats.
                </h2>
                <p
                  className="mt-4 max-w-[40ch] leading-[1.55]"
                  style={{ color: "var(--fg-2)", fontSize: 15 }}
                >
                  Tre ord. En affär. Solen är det enda du behöver lägga in —
                  resten står vi för. Alltid kombinerad med stödraden:
                </p>
                <p
                  className="mt-3 font-mono text-[13px]"
                  style={{ color: "var(--fg-3)" }}
                >
                  &ldquo;Vi installerar. Solen finansierar. Du äger.&rdquo;
                </p>
              </div>
              <div
                className="flex min-h-[280px] items-center justify-center rounded-3xl p-10 md:p-14"
                style={{ background: "var(--bg-ink)", color: "var(--on-ink)" }}
              >
                <div className="text-center">
                  <p
                    className="m-0 font-display font-semibold tracking-[-0.02em]"
                    style={{
                      fontSize: "clamp(28px, 3.6vw, 44px)",
                      lineHeight: 1.05,
                    }}
                  >
                    Med solen som insats.
                  </p>
                  <p
                    className="m-0 mt-3 text-[14px]"
                    style={{ color: "var(--on-ink-2)" }}
                  >
                    Vi installerar. Solen finansierar. Du äger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Röstprinciper ---------- */}
        <section id="rost" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Röst &amp; ton</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Fyra ord vi mäter all text mot.
              </h2>
            </div>
            <div
              className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border md:grid-cols-2"
              style={{ borderColor: "var(--border)", background: "var(--border)" }}
            >
              {VOICE_PRINCIPLES.map((p) => (
                <div
                  key={p.word}
                  className="p-6 md:p-8"
                  style={{ background: "var(--bg-1)" }}
                >
                  <p
                    className="m-0 font-display text-[28px] font-semibold tracking-[-0.01em] md:text-[32px]"
                    style={{ color: "var(--color-lystr-tomato)" }}
                  >
                    {p.word}
                  </p>
                  <p
                    className="m-0 mt-3 text-[15px] leading-[1.55]"
                    style={{ color: "var(--fg-2)" }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Röst i praktiken ---------- */}
        <section id="rost-praktik" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Röst i praktiken</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Branschen vs. Lystr.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Samma situation, två sätt att skriva. Vänster kolumn är
                hur energi-/solbranschen ofta låter. Höger kolumn är
                hur Lystr säger det.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {VOICE_PAIRS.map((p) => (
                <VoicePair key={p.label} pair={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Konkurrentlandskap ---------- */}
        <section id="konkurrenter" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Konkurrentlandskap</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Var Lystr står — bland vilka.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Fyra arketyper en svensk villaägare möter. Vad de
                pratar om, och hur Lystr skiljer sig på en rad.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {COMPETITORS.map((c) => (
                <CompetitorCard key={c.name} competitor={c} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Stämning ---------- */}
        <section id="stamning" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Stämning</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Lars Tunbjörks Sverige, ett par årtionden senare.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Sommarljus över plåttak. Sällskap på bryggan. Småfräck
                vardag — inte glansig livsstil. Bilderna kommer; just nu
                styr stämningsorden i hink 04 all visuell riktning.
              </p>
            </div>
            <div
              className="flex min-h-[260px] items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-1)",
                color: "var(--fg-3)",
              }}
            >
              <div>
                <p
                  className="m-0 font-display text-[20px] font-semibold"
                  style={{ color: "var(--fg-2)" }}
                >
                  Bilder kommer.
                </p>
                <p className="m-0 mt-2 text-[14px]">
                  Lägg nya stämningsbilder i{" "}
                  <code
                    className="rounded px-1 py-0.5 text-[12px]"
                    style={{ background: "var(--bg-2)", color: "var(--fg-2)" }}
                  >
                    /web/public/brand/mood/
                  </code>{" "}
                  så kopplar vi in dem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Wordmark ---------- */}
        <section id="wordmark" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Logotyp</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Wordmark.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Två varianter — svart för ljusa ytor, vit för mörka. Ingen
                ikon, ingen monogram. Lystr är ordet.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <WordmarkCard
                src="/lystr-wordmark-black.png"
                bg="var(--bg-1)"
                label="Svart · för ljus bakgrund"
              />
              <WordmarkCard
                src="/lystr-wordmark-white.png"
                bg="var(--bg-ink)"
                label="Vit · för mörk bakgrund"
                dark
              />
            </div>
          </div>
        </section>

        {/* ---------- Logo regler ---------- */}
        <section id="logoregler" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Logotyp · regler</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Hur den får — och inte får — användas.
              </h2>
            </div>

            {/* Clear space + minimum size */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div
                className="rounded-3xl border p-6 md:p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
              >
                <p
                  className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--fg-3)" }}
                >
                  Frizon
                </p>
                <p
                  className="m-0 mt-2 font-display text-[20px] font-semibold"
                  style={{ color: "var(--fg-1)" }}
                >
                  Minst lika mycket luft som höjden på &ldquo;L&rdquo; — i alla riktningar.
                </p>
                <ClearSpaceDiagram />
              </div>
              <div
                className="rounded-3xl border p-6 md:p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
              >
                <p
                  className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--fg-3)" }}
                >
                  Minsta storlek
                </p>
                <p
                  className="m-0 mt-2 font-display text-[20px] font-semibold"
                  style={{ color: "var(--fg-1)" }}
                >
                  Aldrig mindre än det här.
                </p>
                <div className="mt-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border)" }}>
                    <Image
                      src="/lystr-wordmark-black.png"
                      alt="Lystr min web"
                      width={3000}
                      height={1500}
                      className="h-5 w-auto"
                    />
                    <span className="font-mono text-[13px]" style={{ color: "var(--fg-2)" }}>
                      Web · 80 px bred
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Image
                      src="/lystr-wordmark-black.png"
                      alt="Lystr min print"
                      width={3000}
                      height={1500}
                      className="h-7 w-auto"
                    />
                    <span className="font-mono text-[13px]" style={{ color: "var(--fg-2)" }}>
                      Print · 20 mm bred
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Don'ts grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {LOGO_DONTS.map((d) => (
                <div
                  key={d.title}
                  className="rounded-2xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
                >
                  <p
                    className="m-0 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: "var(--color-lystr-tomato-deep)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
                      style={{
                        background: "var(--color-lystr-tomato)",
                        color: "var(--accent-fg)",
                      }}
                    >
                      ×
                    </span>
                    Gör inte
                  </p>
                  <p
                    className="m-0 mt-3 text-[15px] font-semibold"
                    style={{ color: "var(--fg-1)" }}
                  >
                    {d.title}
                  </p>
                  <p
                    className="m-0 mt-1.5 text-[13px] leading-[1.5]"
                    style={{ color: "var(--fg-3)" }}
                  >
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Ikoner ---------- */}
        <section id="ikoner" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Ikoner &amp; symboler</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Lucide — stroke, 2 px, runda ändar.
              </h2>
              <p
                className="mt-4 max-w-[60ch] leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Alla ikoner kommer från{" "}
                <a
                  href="https://lucide.dev"
                  className="border-b pb-px no-underline"
                  style={{
                    color: "var(--link-color)",
                    borderColor: "currentColor",
                  }}
                >
                  Lucide
                </a>{" "}
                — open source under ISC-licens, fri att använda kommersiellt
                utan attribution. Vi håller oss till en stil: linjebaserade,
                24×24, 2 px stroke, runda ändar. Aldrig fyllda. Aldrig flera
                stilar i samma yta.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {ICON_GROUPS.map((g) => (
                <div key={g.label}>
                  <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p
                      className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                      style={{ color: "var(--fg-3)" }}
                    >
                      {g.label}
                    </p>
                    <p
                      className="m-0 text-[14px]"
                      style={{ color: "var(--fg-2)" }}
                    >
                      {g.intro}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {g.items.map((it) => (
                      <IconCard
                        key={`${g.label}-${it.name}`}
                        icon={it.icon}
                        name={it.name}
                        usage={it.usage}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-10 rounded-2xl border p-5 text-[13px] leading-[1.55]"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-2)",
                color: "var(--fg-2)",
              }}
            >
              <p
                className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "var(--fg-3)" }}
              >
                Användning i kod
              </p>
              <pre
                className="m-0 mt-2 overflow-x-auto font-mono text-[12px]"
                style={{ color: "var(--fg-1)" }}
              >
{`import { Sun, TreePine, Lightbulb } from "lucide-react";

<Sun size={20} aria-hidden />`}
              </pre>
            </div>
          </div>
        </section>

        {/* ---------- Palette ---------- */}
        <section id="palett" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Palett</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Cream + Tomato Pop.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Bläck-på-cream är basen. Tomato är liten yta — pop på
                CTA:er och nyckeltal. Sky bär eyebrows och länkar. Grönt är
                reserverat för &ldquo;du sparar&rdquo;-märken.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {PALETTE.map((g) => (
                <div key={g.group}>
                  <p
                    className="m-0 mb-4 text-[12px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: "var(--fg-3)" }}
                  >
                    {g.group}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {g.colors.map((c) => (
                      <Swatch key={c.name} name={c.name} hex={c.hex} role={c.role} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Themes ---------- */}
        <section id="teman" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Temavarianter</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Tre lägen, samma identitet.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Bulb är standardläget. Sun och Tree finns som
                temaomställare uppe i höger hörn — ett sätt att visa att
                solen kan ha olika temperaturer utan att vi tappar oss
                själva.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {THEMES.map((t) => (
                <ThemeCard key={t.id} theme={t} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Typography ---------- */}
        <section id="typografi" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Typografi</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Schibsted Grotesk + Fragment Mono.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TypeCard
                family="Schibsted Grotesk"
                role="Display + brödtext"
                source="Google Fonts · Open source"
                sample="Solen är din enda insats."
                fontFamily="var(--font-sans)"
              />
              <TypeCard
                family="Fragment Mono"
                role="Sifferdetaljer + tekniska detaljer"
                source="Google Fonts · Open source"
                sample="2 500 kr · 8 år · 30 år"
                fontFamily="var(--font-mono)"
              />
            </div>

            {/* Skrivregel — emphasis-span punctuation */}
            <div
              className="mt-6 rounded-3xl border p-6 md:p-8"
              style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
            >
              <p
                className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "var(--fg-3)" }}
              >
                Skrivregel · färgad emfas
              </p>
              <p
                className="m-0 mt-2 font-display text-[20px] font-semibold"
                style={{ color: "var(--fg-1)" }}
              >
                Skiljetecken hör till färgen.
              </p>
              <p
                className="mt-3 max-w-[60ch] text-[14px] leading-[1.55]"
                style={{ color: "var(--fg-2)" }}
              >
                När en fras lyfts i accentfärg så följer punkten,
                kommat eller utropstecknet med — aldrig en svart
                punkt efter en färgad fras. Den lilla färgkrocken
                känns igen som ett misstag.
              </p>
              <div
                className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2"
              >
                <div
                  className="rounded-2xl border p-4"
                  style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
                >
                  <p
                    className="m-0 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: "var(--fg-3)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: "var(--bg-3)", color: "var(--fg-2)" }}
                    >
                      ×
                    </span>
                    Gör inte
                  </p>
                  <p
                    className="m-0 mt-2 font-display text-[20px] font-semibold"
                    style={{ color: "var(--fg-1)" }}
                  >
                    Solen som <span className="text-lystr-tomato">insats</span>.
                  </p>
                </div>
                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--color-lystr-tomato)",
                    background: "var(--color-lystr-tomato-tint)",
                  }}
                >
                  <p
                    className="m-0 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: "var(--color-lystr-tomato-deep)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: "var(--color-lystr-tomato)",
                        color: "var(--accent-fg)",
                      }}
                    >
                      ✓
                    </span>
                    Gör så
                  </p>
                  <p
                    className="m-0 mt-2 font-display text-[20px] font-semibold"
                    style={{ color: "var(--color-lystr-tomato-deep)" }}
                  >
                    Solen som <span className="text-lystr-tomato">insats.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Downloads ---------- */}
        <section id="nedladdningar" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <Eyebrow>Nedladdningar</Eyebrow>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Filer.
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Allt du behöver för att skriva om oss eller designa med
                oss. SVG-versioner kommer när originalfilen finns på
                plats — hör av dig om du saknar ett format.
              </p>
            </div>
            <ul className="m-0 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2">
              {DOWNLOADS.map((d) => (
                <li
                  key={d.file}
                  className="border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <a
                    href={d.file}
                    download
                    className="flex items-center justify-between gap-4 py-5 no-underline transition-colors hover:text-[var(--fg-1)]"
                    style={{ color: "var(--fg-1)" }}
                  >
                    <span>
                      <span className="block text-[15px] font-medium">
                        {d.name}
                      </span>
                      <span
                        className="block text-[13px]"
                        style={{ color: "var(--fg-3)" }}
                      >
                        {d.note}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-[14px]"
                      style={{ color: "var(--link-color)" }}
                    >
                      ↓ Hämta
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 text-center md:px-8 md:py-20">
            <h2
              className="m-0 font-display font-semibold text-pretty"
              style={{
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Saknar du något?
            </h2>
            <p
              className="mx-auto mt-4 max-w-[52ch] text-base leading-[1.55] md:text-lg"
              style={{ color: "var(--on-ink-2)" }}
            >
              Press, samarbeten eller designfrågor — hör av dig så
              skickar vi rätt fil eller rätt person.
            </p>
            <Link
              href="/#kontakt"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
            >
              Kontakta oss →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
      style={{ color: "var(--eyebrow-color)" }}
    >
      <span aria-hidden className="inline-block h-px w-6 bg-current" />
      {children}
    </div>
  );
}

function ValueBucket({
  bucket,
}: {
  bucket: (typeof VALUE_BUCKETS)[number];
}) {
  const isPrimary = bucket.weight === "primary";
  return (
    <div
      className="rounded-3xl border p-6 md:p-10"
      style={{
        borderColor: isPrimary ? "var(--color-lystr-tomato)" : "var(--border)",
        background: isPrimary ? "var(--color-lystr-tomato-tint)" : "var(--bg-1)",
      }}
    >
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <div>
          <p
            className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{
              color: isPrimary
                ? "var(--color-lystr-tomato-deep)"
                : "var(--fg-3)",
            }}
          >
            {bucket.eyebrow}
          </p>
          <h3
            className="m-0 mt-2 font-display font-semibold tracking-[-0.01em]"
            style={{
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.1,
              color: isPrimary
                ? "var(--color-lystr-tomato-deep)"
                : "var(--fg-1)",
            }}
          >
            {bucket.title}
          </h3>
          <p
            className="mt-3 max-w-[36ch] leading-[1.55]"
            style={{
              color: isPrimary
                ? "var(--color-lystr-tomato-deep)"
                : "var(--fg-2)",
              fontSize: 14,
            }}
          >
            {bucket.body}
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap content-start gap-2 p-0">
          {bucket.words.map((w) => (
            <li key={w}>
              <span
                className="inline-flex items-center rounded-full border px-3.5 py-1.5 font-display"
                style={{
                  fontSize: isPrimary ? 17 : 14,
                  fontWeight: isPrimary ? 600 : 500,
                  letterSpacing: isPrimary ? "-0.005em" : 0,
                  color: isPrimary
                    ? "var(--color-lystr-tomato-deep)"
                    : "var(--fg-1)",
                  borderColor: isPrimary
                    ? "var(--color-lystr-tomato-deep)"
                    : "var(--border)",
                  background: isPrimary
                    ? "transparent"
                    : "var(--bg-2)",
                }}
              >
                {w}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VoicePair({
  pair,
}: {
  pair: (typeof VOICE_PAIRS)[number];
}) {
  return (
    <div
      className="overflow-hidden rounded-3xl border"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="px-6 pt-5 pb-3"
        style={{ background: "var(--bg-1)" }}
      >
        <p
          className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          {pair.label}
        </p>
        <p
          className="m-0 mt-1 text-[12px]"
          style={{ color: "var(--fg-3)" }}
        >
          {pair.note}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="border-t p-6 md:border-t-0 md:border-r"
          style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
        >
          <p
            className="m-0 mb-3 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--fg-3)" }}
          >
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
              style={{ background: "var(--bg-3)", color: "var(--fg-2)" }}
            >
              ×
            </span>
            Branschen
          </p>
          <p
            className="m-0 text-[15px] leading-[1.55] italic"
            style={{ color: "var(--fg-3)" }}
          >
            &ldquo;{pair.bad}&rdquo;
          </p>
        </div>
        <div
          className="border-t p-6 md:border-t-0"
          style={{
            borderColor: "var(--border)",
            background: "var(--color-lystr-tomato-tint)",
          }}
        >
          <p
            className="m-0 mb-3 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--color-lystr-tomato-deep)" }}
          >
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
              style={{
                background: "var(--color-lystr-tomato)",
                color: "var(--accent-fg)",
              }}
            >
              ✓
            </span>
            Lystr
          </p>
          <p
            className="m-0 text-[15px] font-medium leading-[1.55]"
            style={{ color: "var(--color-lystr-tomato-deep)" }}
          >
            &ldquo;{pair.good}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function IconCard({
  icon: Icon,
  name,
  usage,
}: {
  icon: LucideIcon;
  name: string;
  usage: string;
}) {
  return (
    <div
      className="flex flex-col items-start rounded-2xl border p-5"
      style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
    >
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ background: "var(--bg-2)", color: "var(--fg-1)" }}
      >
        <Icon size={26} aria-hidden />
      </div>
      <p
        className="m-0 font-mono text-[12px]"
        style={{ color: "var(--fg-1)" }}
      >
        {name}
      </p>
      <p
        className="m-0 mt-1 text-[12px] leading-[1.4]"
        style={{ color: "var(--fg-3)" }}
      >
        {usage}
      </p>
    </div>
  );
}

function CompetitorCard({
  competitor,
}: {
  competitor: (typeof COMPETITORS)[number];
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-3xl border p-6 md:p-7"
      style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
    >
      <div>
        <p
          className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          {competitor.archetype}
        </p>
        <p
          className="m-0 mt-1 font-display text-[22px] font-semibold tracking-[-0.01em] md:text-[26px]"
          style={{ color: "var(--fg-1)" }}
        >
          {competitor.name}
        </p>
      </div>
      <p
        className="m-0 text-[14px] leading-[1.55]"
        style={{ color: "var(--fg-2)" }}
      >
        {competitor.body}
      </p>
      <div
        className="mt-auto rounded-2xl p-4"
        style={{
          background: "var(--color-lystr-tomato-tint)",
          color: "var(--color-lystr-tomato-deep)",
        }}
      >
        <p className="m-0 text-[11px] font-medium uppercase tracking-[0.12em]">
          Lystr-skillnaden
        </p>
        <p className="m-0 mt-1.5 text-[14px] font-medium leading-[1.5]">
          {competitor.vs}
        </p>
      </div>
    </div>
  );
}

function ClearSpaceDiagram() {
  return (
    <div
      className="mt-6 flex aspect-[2/1] items-center justify-center rounded-2xl"
      style={{ background: "var(--bg-2)" }}
    >
      <div
        className="relative inline-flex items-center justify-center"
        style={{
          padding: "48px 96px",
          outline: "1px dashed var(--color-lystr-tomato)",
          outlineOffset: 0,
        }}
      >
        <Image
          src="/lystr-wordmark-black.png"
          alt="Lystr clear space"
          width={3000}
          height={1500}
          className="h-7 w-auto md:h-9"
        />
        <span
          aria-hidden
          className="absolute -left-3 top-1/2 -translate-y-1/2 -translate-x-full font-mono text-[11px]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          x
        </span>
        <span
          aria-hidden
          className="absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full font-mono text-[11px]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          x
        </span>
      </div>
    </div>
  );
}

function WordmarkCard({
  src,
  bg,
  label,
  dark,
}: {
  src: string;
  bg: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl border p-12"
      style={{
        background: bg,
        borderColor: dark ? "transparent" : "var(--border)",
      }}
    >
      <Image
        src={src}
        alt="Lystr wordmark"
        width={3000}
        height={1500}
        className="h-12 w-auto md:h-16"
      />
      <p
        className="mt-6 text-[12px] font-medium uppercase tracking-[0.12em]"
        style={{ color: dark ? "rgba(255,255,255,0.6)" : "var(--fg-3)" }}
      >
        {label}
      </p>
    </div>
  );
}

function Swatch({
  name,
  hex,
  role,
}: {
  name: string;
  hex: string;
  role: string;
}) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const onSwatch = lum > 0.6 ? "#1c1c1c" : "#ffffff";
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="flex h-20 items-end p-3 text-[11px] font-mono"
        style={{ background: hex, color: onSwatch }}
      >
        {hex.toUpperCase()}
      </div>
      <div className="bg-white p-3">
        <p
          className="m-0 font-mono text-[12px]"
          style={{ color: "var(--fg-1)" }}
        >
          {name}
        </p>
        <p
          className="m-0 mt-0.5 text-[11px] leading-[1.4]"
          style={{ color: "var(--fg-3)" }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}

function ThemeCard({
  theme,
}: {
  theme: (typeof THEMES)[number];
}) {
  return (
    <div
      className="overflow-hidden rounded-3xl border"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="flex h-48 flex-col justify-between p-5"
        style={{ background: theme.bg, color: theme.fg }}
      >
        <p
          className="m-0 text-[11px] font-medium uppercase tracking-[0.12em]"
          style={{ color: theme.eyebrow }}
        >
          {theme.label}-läge
        </p>
        <div>
          <p
            className="m-0 font-display text-[22px] font-semibold tracking-[-0.01em]"
            style={{ lineHeight: 1.1 }}
          >
            Med solen som insats.
          </p>
          <span
            className="mt-3 inline-flex rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
            style={{ background: theme.accent, color: theme.accentFg }}
          >
            Räkna ut →
          </span>
        </div>
      </div>
      <div className="bg-white p-4">
        <p className="m-0 text-[13px] font-medium" style={{ color: "var(--fg-1)" }}>
          {theme.label}
        </p>
        <p className="m-0 mt-0.5 text-[12px]" style={{ color: "var(--fg-3)" }}>
          {theme.sub}
        </p>
        <div className="mt-3 flex gap-1.5">
          <span className="h-4 w-4 rounded-full border" style={{ background: theme.bg, borderColor: "var(--border)" }} aria-hidden />
          <span className="h-4 w-4 rounded-full" style={{ background: theme.fg }} aria-hidden />
          <span className="h-4 w-4 rounded-full" style={{ background: theme.accent }} aria-hidden />
          <span className="h-4 w-4 rounded-full" style={{ background: theme.eyebrow }} aria-hidden />
        </div>
      </div>
    </div>
  );
}

function TypeCard({
  family,
  role,
  source,
  sample,
  fontFamily,
}: {
  family: string;
  role: string;
  source: string;
  sample: string;
  fontFamily: string;
}) {
  return (
    <div
      className="rounded-3xl border bg-white p-6 md:p-8"
      style={{ borderColor: "var(--border)" }}
    >
      <p
        className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
        style={{ color: "var(--fg-3)" }}
      >
        {role}
      </p>
      <p
        className="m-0 mt-2 font-display text-[22px] font-semibold"
        style={{ color: "var(--fg-1)" }}
      >
        {family}
      </p>
      <p
        className="m-0 mt-1 text-[13px]"
        style={{ color: "var(--fg-3)" }}
      >
        {source}
      </p>
      <p
        className="m-0 mt-6 text-pretty"
        style={{
          fontFamily,
          fontSize: "clamp(24px, 2.6vw, 34px)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: "var(--fg-1)",
        }}
      >
        {sample}
      </p>
      <p
        className="m-0 mt-6 font-mono text-[13px]"
        style={{ color: "var(--fg-3)" }}
      >
        ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ
        <br />
        abcdefghijklmnopqrstuvwxyzåäö
        <br />
        0 1 2 3 4 5 6 7 8 9
      </p>
    </div>
  );
}
