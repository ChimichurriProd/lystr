import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NextStepsTimeline } from "@/components/next-steps-timeline";

/* ============================================================
   /energiavtal — exploratory page (no nav entry).
   Lystr's variant of an "energiabonnemang"-style page, but
   reframed around ownership rather than perpetual subscription.
   The angle: where the rest of the market sells you a forever
   contract, Lystr sells you eight years of amortisation followed
   by ownership of your own production. Everything else (panels,
   battery, garanti, underhåll, försäkring) is bundled in.
   ============================================================ */

export const metadata = {
  title: "Energiavtal som slutar med att du äger · Lystr",
  description:
    "Inga livslånga abonnemang. Lystr-avtalet är en avbetalning på din egen anläggning — efter åtta år är den din, och solen jobbar gratis i minst 22 år till.",
  robots: { index: false, follow: false },
};

const INCLUDED = [
  "Solpaneler, växelriktare och batterilager",
  "Takmontage, installation och driftsättning",
  "25 års produktgaranti på panelerna",
  "15 års drift- och anläggningsgaranti",
  "Underhåll och service ingår — du behöver aldrig boka montör",
  "Anläggningsförsäkring under hela avtalstiden",
  "Övervakning av produktion och larm vid fel",
  "Ingen kontantinsats, ingen kreditupplysning vid kalkyl",
];

// Räkneexempel — 2 500 kr/mån i dagens elräkning, villa, 30 år.
// Numbers are illustrative; real offer is given after takanalys.
const EXAMPLE = {
  bill: 2500,
  contractMonthly: 2500,
  postContractMonthly: 125, // ≈ 5% nät/övrigt
  contractYears: 8,
  totalYears: 30,
};

function fmtKr(n: number) {
  return `${new Intl.NumberFormat("sv-SE").format(Math.round(n))} kr`;
}

const todayTotal30 = EXAMPLE.bill * 12 * EXAMPLE.totalYears;
const lystrTotal30 =
  EXAMPLE.contractMonthly * 12 * EXAMPLE.contractYears +
  EXAMPLE.postContractMonthly *
    12 *
    (EXAMPLE.totalYears - EXAMPLE.contractYears);

export default function EnergiavtalPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
            <div className="max-w-[820px]">
              <div
                className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "var(--eyebrow-color)" }}
              >
                <span aria-hidden className="inline-block h-px w-6 bg-current" />
                Lystr-avtalet
              </div>
              <h1
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(40px, 5.4vw, 68px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "var(--fg-1)",
                }}
              >
                Inget livslångt{" "}
                <span
                  className="font-medium"
                  style={{
                    color: "var(--fg-3)",
                    textDecoration: "line-through",
                    textDecorationThickness: "3px",
                    textDecorationColor: "var(--color-lystr-tomato)",
                  }}
                >
                  abonnemang
                </span>
                .
                <br />
                En avbetalning som slutar med att du{" "}
                <span className="text-lystr-tomato">äger&nbsp;allt.</span>
              </h1>
              <p
                className="mt-7 max-w-[60ch] leading-[1.55]"
                style={{
                  color: "var(--fg-2)",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                }}
              >
                Solen är din enda insats — resten står vi för. Vi installerar
                anläggningen, sköter underhåll och garanti, och drar
                kostnaden från din månadsräkning under åtta år. Sen är den
                din — solen fortsätter jobba i minst 22 år till, helt utan
                räkning.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/#kalkyl"
                  className="inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-[22px] py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
                >
                  Räkna ut din uppskattning →
                </Link>
                <a
                  href="#vad-ingar"
                  className="border-b pb-px text-[14px] no-underline transition-colors hover:text-[var(--fg-1)]"
                  style={{
                    color: "var(--link-color)",
                    borderColor: "currentColor",
                  }}
                >
                  Se vad som ingår
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Vad ingår ---------- */}
        <section id="vad-ingar" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <div>
                <div
                  className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--eyebrow-color)" }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-px w-6 bg-current"
                  />
                  Vad ingår i avtalet
                </div>
                <h2
                  className="m-0 mt-[18px] font-display font-semibold text-pretty"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 40px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    color: "var(--fg-1)",
                  }}
                >
                  Allt på taket. Inget krångel.
                </h2>
                <p
                  className="mt-4 max-w-[40ch] leading-[1.55]"
                  style={{ color: "var(--fg-2)", fontSize: 15 }}
                >
                  En enda månadsräkning täcker hårdvara, montage, garanti,
                  underhåll och försäkring. Du betalar inget extra för en
                  trasig växelriktare år sex.
                </p>
              </div>
              <ul className="m-0 grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t py-4"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold"
                      style={{
                        background: "var(--saving-bg)",
                        color: "var(--saving-fg)",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      className="text-[14px] leading-[1.5]"
                      style={{ color: "var(--fg-1)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Räkneexempel ---------- */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <div
                className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "var(--eyebrow-color)" }}
              >
                <span
                  aria-hidden
                  className="inline-block h-px w-6 bg-current"
                />
                Räkneexempel · 30 år
              </div>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                {fmtKr(EXAMPLE.bill)}/mån idag — vad händer på 30 år?
              </h2>
              <p
                className="mt-4 leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Förenklat exempel utan inflationsjustering. Slutpriset beror
                på taket, panelvalet och ditt elavtal — vi går igenom allt
                vid hembesöket.
              </p>
            </div>

            <div
              className="overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              <table className="w-full border-collapse text-left text-[14px] md:text-[15px]">
                <thead>
                  <tr
                    style={{
                      background: "var(--color-lystr-tomato)",
                      color: "var(--accent-fg)",
                    }}
                  >
                    <th
                      className="px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] md:px-6"
                      scope="col"
                    >
                      &nbsp;
                    </th>
                    <th
                      className="px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] md:px-6"
                      scope="col"
                    >
                      Idag
                    </th>
                    <th
                      className="px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] md:px-6"
                      scope="col"
                    >
                      Egen finansiering
                    </th>
                    <th
                      className="px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] md:px-6"
                      scope="col"
                    >
                      Lystr
                    </th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--fg-2)" }}>
                  <Row label="Kontantinsats">
                    <Cell>0 kr</Cell>
                    <Cell>≈ 250 000 kr</Cell>
                    <Cell strong>0 kr</Cell>
                  </Row>
                  <Row label="Månadskostnad år 1–8">
                    <Cell>{fmtKr(EXAMPLE.bill)}</Cell>
                    <Cell>≈ 3 200 kr (lån + drift)</Cell>
                    <Cell strong>{fmtKr(EXAMPLE.contractMonthly)}</Cell>
                  </Row>
                  <Row label="Månadskostnad år 9–30">
                    <Cell>{fmtKr(EXAMPLE.bill)}</Cell>
                    <Cell>≈ 200 kr (drift + nät)</Cell>
                    <Cell strong>{fmtKr(EXAMPLE.postContractMonthly)}</Cell>
                  </Row>
                  <Row label="Underhåll & garanti">
                    <Cell>—</Cell>
                    <Cell>Du står själv</Cell>
                    <Cell strong>Ingår</Cell>
                  </Row>
                  <Row label="Anläggningsförsäkring">
                    <Cell>—</Cell>
                    <Cell>Du står själv</Cell>
                    <Cell strong>Ingår</Cell>
                  </Row>
                  <Row label="Ägarskap av anläggningen">
                    <Cell>—</Cell>
                    <Cell>Från år 1</Cell>
                    <Cell strong>Från år 8</Cell>
                  </Row>
                  <Row label="Total elkostnad över 30 år" emphasise>
                    <Cell strong>{fmtKr(todayTotal30)}</Cell>
                    <Cell>—</Cell>
                    <Cell strong>{fmtKr(lystrTotal30)}</Cell>
                  </Row>
                </tbody>
              </table>
            </div>

            <p
              className="mt-5 text-[13px] italic"
              style={{ color: "var(--fg-3)" }}
            >
              Räkneexempel utan inflation. Faktiska siffror beror på din
              specifika situation och redovisas i offerten efter hembesöket.
            </p>
          </div>
        </section>

        {/* ---------- Skillnaden mot abonnemang ---------- */}
        <section style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <CompareCard
                kicker="Marknaden"
                title="Energiabonnemang"
                body="Fast månadskostnad, livet ut. Du hyr hårdvaran. När avtalet löper ut tecknar du nytt avtal med ny utrustning och nytt pris."
                tone="muted"
              />
              <CompareCard
                kicker="Lystr"
                title="Avbetalning på din egen anläggning"
                body="Samma månadskostnad år 1–8. Sen är panelerna, batteriet och växelriktaren dina. Solen fortsätter jobba i minst 22 år till — utan ny faktura."
                tone="tomato"
              />
            </div>
          </div>
        </section>

        {/* ---------- Radikal ärlighet ---------- */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <div className="mb-10 max-w-[680px] md:mb-12">
              <div
                className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "var(--eyebrow-color)" }}
              >
                <span aria-hidden className="inline-block h-px w-6 bg-current" />
                Radikal ärlighet
              </div>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Vi är ett finansieringsbolag i energi-kläder
              </h2>
              <p
                className="mt-4 max-w-[60ch] leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 15 }}
              >
                Branschen brukar låtsas att solenergi är gratis och att alla
                vinner. Det är inte sant. Här är hur vi tjänar pengar och vad
                ni bör veta innan ni skriver på.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {/* Så tjänar vi pengar */}
              <div
                className="rounded-3xl border p-6 md:p-8"
                style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
              >
                <p
                  className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--fg-3)" }}
                >
                  Så tjänar Lystr pengar
                </p>
                <h3
                  className="m-0 mt-2 font-display font-semibold tracking-[-0.01em]"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    lineHeight: 1.15,
                    color: "var(--fg-1)",
                  }}
                >
                  Fyra intäktsströmmar
                </h3>
                <ol className="m-0 mt-5 flex list-none flex-col gap-5 p-0">
                  <DisclosureItem
                    n="01"
                    title="Marginal på utrustningen"
                    body="Paneler, växelriktare och batteri köper vi i grossist och säljer (via avbetalning) till retail-pris plus marginal. Så har solinstallatörer alltid tjänat pengar."
                  />
                  <DisclosureItem
                    n="02"
                    title="Räntespread på finansieringen"
                    body="En del av månadsbeloppet är ränta. Det är därför totalkostnaden över 30 år är högre i Lystr-kolumnen än i ”egen finansiering” — finansiering är aldrig gratis."
                  />
                  <DisclosureItem
                    n="03"
                    title="Batteriet jobbar för oss under år 1–8"
                    body="Vi använder ditt batteri för att köpa el när den är billig och sälja när den är dyr. Det är en intäkt för oss under avtalstiden. Efter år 8 äger du batteriet och behåller intäkten själv."
                  />
                  <DisclosureItem
                    n="04"
                    title="Elcertifikat under avtalet"
                    body="Solanläggningar genererar certifikat med marknadsvärde. Vi behåller dem under år 1–8. Sen är de dina, om du vill ha dem."
                  />
                </ol>
              </div>

              {/* Det här ska ni veta */}
              <div
                className="rounded-3xl border p-6 md:p-8"
                style={{
                  borderColor: "var(--color-lystr-tomato)",
                  background: "var(--color-lystr-tomato-tint)",
                }}
              >
                <p
                  className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--color-lystr-tomato-deep)" }}
                >
                  Det här ska du veta
                </p>
                <h3
                  className="m-0 mt-2 font-display font-semibold tracking-[-0.01em]"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    lineHeight: 1.15,
                    color: "var(--color-lystr-tomato-deep)",
                  }}
                >
                  Fyra ärliga avvägningar
                </h3>
                <ol className="m-0 mt-5 flex list-none flex-col gap-5 p-0">
                  <DisclosureItem
                    n="01"
                    title="Avtalet är bundet i 8 år"
                    body="Säljer du huset, flyttar utomlands eller skiljer dig — avtalet följer med eller löses ut. Det är inte gratis att hoppa av."
                    tone="tomato"
                  />
                  <DisclosureItem
                    n="02"
                    title="Månadsbeloppet är fast — även när solen inte producerar"
                    body="Dåligt år, snö, smuts, krasch i växelriktaren — du betalar samma belopp ändå. Du betalar av en anläggning, inte en kWh-räkning."
                    tone="tomato"
                  />
                  <DisclosureItem
                    n="03"
                    title="Batteriet du betalar för styrs av oss under avtalstiden"
                    body="Vid strömavbrott kan batteriet vara delurtömt — det har varit i marknaden. Efter år 8 styr du det själv."
                    tone="tomato"
                  />
                  <DisclosureItem
                    n="04"
                    title="Underhåll efter år 8 är ditt"
                    body="Växelriktaren håller ofta 12–15 år. När den går sönder år 14 är det din räkning, inte vår. Det betyder också att de följande 22 åren inte är helt gratis."
                    tone="tomato"
                  />
                </ol>
              </div>
            </div>

            <p
              className="mx-auto mt-8 max-w-[60ch] text-center text-[14px] italic leading-[1.6]"
              style={{ color: "var(--fg-2)" }}
            >
              Vi berättar det här för att branschen inte gör det. Du ska
              kunna säga ”ja” med öppna ögon — eller ”nej tack” utan att
              känna att något hölls undan.
            </p>
          </div>
        </section>

        {/* ---------- Timeline ---------- */}
        <NextStepsTimeline
          eyebrow="Från anmälan till driftsatt anläggning"
          heading="Hela vägen — utan överraskningar."
          intro="Du behöver aldrig undra vad nästa steg är. Här är vad som händer från det att du anmäler intresse till att solen jobbar gratis åt dig."
        />

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
              Räkna ut hur mycket du sparar.
            </h2>
            <p
              className="mx-auto mt-4 max-w-[52ch] text-base leading-[1.55] md:text-lg"
              style={{ color: "var(--on-ink-2)" }}
            >
              Två minuter. Ingen kreditupplysning. En rådgivare ringer upp
              inom 1–2 arbetsdagar.
            </p>
            <Link
              href="/#kalkyl"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
            >
              Bli uppringd av oss →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Row({
  label,
  emphasise,
  children,
}: {
  label: string;
  emphasise?: boolean;
  children: React.ReactNode;
}) {
  // Emphasis sets local CSS vars so child cells pick up accent text
  // without each Cell needing a prop.
  const emphasisStyle = emphasise
    ? ({
        background: "var(--color-lystr-tomato)",
        borderColor: "var(--color-lystr-tomato)",
        ["--row-fg-strong" as string]: "var(--accent-fg)",
        ["--row-fg-base" as string]: "var(--accent-fg)",
      } as React.CSSProperties)
    : undefined;
  return (
    <tr className="border-t" style={emphasisStyle ?? { borderColor: "var(--border)" }}>
      <th
        scope="row"
        className="px-4 py-3.5 text-left text-[13px] font-medium md:px-6 md:text-[14px]"
        style={{ color: "var(--row-fg-strong, var(--fg-1))" }}
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({
  children,
  strong,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <td
      className="px-4 py-3.5 tabular-nums md:px-6"
      style={{
        color: strong
          ? "var(--row-fg-strong, var(--fg-1))"
          : "var(--row-fg-base, var(--fg-2))",
        fontWeight: strong ? 600 : 400,
      }}
    >
      {children}
    </td>
  );
}

function DisclosureItem({
  n,
  title,
  body,
  tone,
}: {
  n: string;
  title: string;
  body: string;
  tone?: "tomato";
}) {
  const isTomato = tone === "tomato";
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-4">
      <span
        className="font-mono text-[12px]"
        style={{
          color: isTomato
            ? "var(--color-lystr-tomato-deep)"
            : "var(--fg-3)",
        }}
      >
        {n}
      </span>
      <div>
        <p
          className="m-0 text-[15px] font-semibold"
          style={{
            color: isTomato
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-1)",
          }}
        >
          {title}
        </p>
        <p
          className="m-0 mt-1 text-[14px] leading-[1.55]"
          style={{
            color: isTomato
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-2)",
          }}
        >
          {body}
        </p>
      </div>
    </li>
  );
}

function CompareCard({
  kicker,
  title,
  body,
  tone,
}: {
  kicker: string;
  title: string;
  body: string;
  tone: "muted" | "tomato";
}) {
  const isTomato = tone === "tomato";
  return (
    <div
      className="rounded-3xl border p-6 md:p-8"
      style={{
        borderColor: isTomato
          ? "var(--color-lystr-tomato)"
          : "var(--border)",
        background: isTomato ? "var(--color-lystr-tomato-tint)" : "white",
        boxShadow: isTomato ? "var(--shadow-card)" : undefined,
      }}
    >
      <p
        className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
        style={{
          color: isTomato
            ? "var(--color-lystr-tomato-deep)"
            : "var(--fg-3)",
        }}
      >
        {kicker}
      </p>
      <h3
        className="m-0 mt-2 font-display text-[24px] font-semibold tracking-[-0.01em] md:text-[28px]"
        style={{
          color: isTomato ? "var(--color-lystr-tomato-deep)" : "var(--fg-1)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
      <p
        className="m-0 mt-3 text-[15px] leading-[1.55]"
        style={{
          color: isTomato ? "var(--color-lystr-tomato-deep)" : "var(--fg-2)",
        }}
      >
        {body}
      </p>
    </div>
  );
}
