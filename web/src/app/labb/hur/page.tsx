import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* ============================================================
   /labb/hur — internal exploration of the differentiator visual.
   "Samma månadskostnad. Helt annan mottagare." rendered three
   ways, each scoped to a different theme so they look visibly
   distinct on a single shareable URL. Pick one, then we wire it
   into /#hur on the live homepage.
   ============================================================ */

export const metadata = {
  title: "Differentiator-varianter · Lystr labb",
  description:
    "Tre visuella vägar till samma sanning: samma månadskostnad, helt annan mottagare. Variant A, B och C för internt urval.",
  robots: { index: false, follow: false },
};

const HEADLINE = "Samma månadskostnad. Helt annan mottagare.";
const SUBLINE =
  "Du betalar samma som idag — men pengarna går till ditt eget tak istället för till elbolaget. Efter åtta år är anläggningen din.";

export default function HurVariantsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ---------- Hero / overview ---------- */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] pt-16 pb-14 md:px-8 md:pt-24 md:pb-16">
            <div className="max-w-[760px]">
              <Eyebrow>Labb · Differentiator-variationer</Eyebrow>
              <h1
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(36px, 4.8vw, 56px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  color: "var(--fg-1)",
                }}
              >
                Tre visuella vägar till samma sanning
              </h1>
              <p
                className="mt-6 max-w-[60ch] leading-[1.55]"
                style={{ color: "var(--fg-2)", fontSize: 17 }}
              >
                Samma månadskostnad. Helt annan mottagare. Det är hela
                Lystr-affären i en mening — men en mening räcker inte
                längre när konkurrenterna ljuger om 15-årsavtal. Här är
                tre sätt att göra skillnaden synlig.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                <li>
                  <a
                    href="#variant-a"
                    className="border-b pb-px no-underline"
                    style={{
                      color: "var(--link-color)",
                      borderColor: "currentColor",
                    }}
                  >
                    Variant A · Två fakturor
                  </a>
                </li>
                <li>
                  <a
                    href="#variant-b"
                    className="border-b pb-px no-underline"
                    style={{
                      color: "var(--link-color)",
                      borderColor: "currentColor",
                    }}
                  >
                    Variant B · Pengaflödet
                  </a>
                </li>
                <li>
                  <a
                    href="#variant-c"
                    className="border-b pb-px no-underline"
                    style={{
                      color: "var(--link-color)",
                      borderColor: "currentColor",
                    }}
                  >
                    Variant C · 30 år rakt fram
                  </a>
                </li>
                <li>
                  <a
                    href="#variant-d"
                    className="border-b pb-px no-underline"
                    style={{
                      color: "var(--link-color)",
                      borderColor: "currentColor",
                    }}
                  >
                    Variant D · Tre vägar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Variant A · Receipts (Bulb) ---------- */}
        <section id="variant-a" data-theme="bulb" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-24">
            <VariantHeader
              tag="A · Bulb-läget"
              kicker="Två fakturor"
              note="Hård emotionell träff. Varje månad får din målgrupp en faktura från elbolaget — så börja där."
            />

            <ReceiptsVariant />

            <p
              className="mx-auto mt-10 max-w-[60ch] text-center text-[14px] italic leading-[1.6]"
              style={{ color: "var(--fg-3)" }}
            >
              {HEADLINE}
            </p>
          </div>
        </section>

        {/* ---------- Variant B · Money flow (Sun) ---------- */}
        <section id="variant-b" data-theme="sun" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-24">
            <VariantHeader
              tag="B · Sun-läget"
              kicker="Pengaflödet"
              note="Visar destinationen och tidshorisonten i en bild — utan juridisk friktion. Skalbar till mobil."
            />

            <MoneyFlowVariant />

            <p
              className="mx-auto mt-10 max-w-[60ch] text-center text-[14px] italic leading-[1.6]"
              style={{ color: "var(--fg-3)" }}
            >
              {HEADLINE}
            </p>
          </div>
        </section>

        {/* ---------- Variant C · Timeline (Tree) ---------- */}
        <section id="variant-c" data-theme="tree" style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-24">
            <VariantHeader
              tag="C · Tree-läget"
              kicker="30 år rakt fram"
              note="Bevismaterial. Ankrar 65 %-besparingen i tid. Fungerar bäst som second-fiddle till A eller B."
            />

            <TimelineVariant />

            <p
              className="mx-auto mt-10 max-w-[60ch] text-center text-[14px] italic leading-[1.6]"
              style={{ color: "var(--fg-3)" }}
            >
              {HEADLINE}
            </p>
          </div>
        </section>

        {/* ---------- Variant D · Three paths (Bulb) ---------- */}
        <section id="variant-d" data-theme="bulb" style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-24">
            <VariantHeader
              tag="D · Bulb-läget · 3 vägar"
              kicker="Tre vägar, ett val"
              note="Det riktiga valet är inte ”elbolag eller Lystr” — det är ”gör inget, köp kontant, eller Lystr”. Här syns alla tre samtidigt."
            />

            <ThreePathVariant />

            <p
              className="mx-auto mt-10 max-w-[60ch] text-center text-[14px] italic leading-[1.6]"
              style={{ color: "var(--fg-3)" }}
            >
              Lägst totalkostnad. Ingen kontantinsats. Du äger till slut.
            </p>
          </div>
        </section>

        {/* ---------- Recap / decision ---------- */}
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-lystr-tomato">
              Beslut
            </p>
            <h2
              className="mt-3 font-display font-semibold tracking-tight"
              style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
            >
              Vilken hamnar på lystr.se?
            </h2>
            <p
              className="mt-4 max-w-2xl text-base leading-[1.6] md:text-lg"
              style={{ color: "var(--on-ink-2)" }}
            >
              Min rekommendation är <strong>B + C kombinerade</strong> — pengaflödet
              som hero överst, sen 30-årstidslinjen som proof under. A
              fungerar bäst i tryckt material och annonser, mindre bra
              som hero på sajten (legalt + skalbarhetsproblem på mobil).
              Säg till vilken ni vill att vi kör med så bygger vi in den
              i /#hur.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
            >
              ← Tillbaka till sajten
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ============================================================
   Shared header for each variant
   ============================================================ */

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

function VariantHeader({
  tag,
  kicker,
  note,
}: {
  tag: string;
  kicker: string;
  note: string;
}) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
      <div>
        <p
          className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          {tag}
        </p>
        <h2
          className="m-0 mt-2 font-display font-semibold tracking-[-0.02em]"
          style={{
            fontSize: "clamp(32px, 3.8vw, 48px)",
            lineHeight: 1.05,
            color: "var(--fg-1)",
          }}
        >
          {kicker}
        </h2>
      </div>
      <p
        className="m-0 max-w-[44ch] text-[14px] leading-[1.55] md:pb-2"
        style={{ color: "var(--fg-3)" }}
      >
        {note}
      </p>
    </div>
  );
}

/* ============================================================
   Variant A — Two receipts
   ============================================================ */

function ReceiptsVariant() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <Receipt
        tone="muted"
        stamp="ÅTERKOMMANDE"
        recipient="Ditt elbolag"
        period="Alla månader. För alltid."
        outcome="Du äger ingenting när det är klart."
      />
      <Receipt
        tone="accent"
        stamp="AVBETALAS"
        recipient="Du själv (via Lystr)"
        period="I 8 år. Sen klart."
        outcome="Du äger anläggningen i minst 22 år till."
      />
    </div>
  );
}

function Receipt({
  tone,
  stamp,
  recipient,
  period,
  outcome,
}: {
  tone: "muted" | "accent";
  stamp: string;
  recipient: string;
  period: string;
  outcome: string;
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className="relative overflow-hidden rounded-3xl border p-6 md:p-9"
      style={{
        borderColor: isAccent ? "var(--color-lystr-tomato)" : "var(--border)",
        background: isAccent ? "var(--color-lystr-tomato-tint)" : "var(--bg-2)",
        boxShadow: isAccent ? "var(--shadow-card)" : undefined,
      }}
    >
      {/* Stamp / corner badge */}
      <span
        className="absolute right-5 top-5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{
          background: isAccent ? "var(--color-lystr-tomato)" : "var(--bg-3)",
          color: isAccent ? "var(--accent-fg)" : "var(--fg-2)",
        }}
      >
        {stamp}
      </span>

      <p
        className="m-0 font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{
          color: isAccent ? "var(--color-lystr-tomato-deep)" : "var(--fg-3)",
        }}
      >
        Faktura
      </p>

      <p
        className="m-0 mt-1 font-mono text-[11px]"
        style={{
          color: isAccent ? "var(--color-lystr-tomato-deep)" : "var(--fg-3)",
        }}
      >
        Anders &amp; Maria · 138 36 Älta
      </p>

      <div className="mt-7">
        <ReceiptRow
          label="Mottagare"
          value={recipient}
          accent={isAccent}
          strong
        />
        <ReceiptRow
          label="Belopp"
          value="2 500 kr / mån"
          accent={isAccent}
          strong
        />
        <ReceiptRow label="Period" value={period} accent={isAccent} />
      </div>

      <div
        className="mt-7 border-t border-dashed pt-5"
        style={{
          borderColor: isAccent
            ? "var(--color-lystr-tomato)"
            : "var(--border)",
        }}
      >
        <p
          className="m-0 text-[14px] leading-[1.55]"
          style={{
            color: isAccent
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-2)",
          }}
        >
          {outcome}
        </p>
      </div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
  accent,
  strong,
}: {
  label: string;
  value: string;
  accent: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 border-b border-dashed py-2.5"
      style={{
        borderColor: accent ? "var(--color-lystr-tomato)" : "var(--border)",
      }}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.12em]"
        style={{
          color: accent ? "var(--color-lystr-tomato-deep)" : "var(--fg-3)",
        }}
      >
        {label}
      </span>
      <span
        className={
          strong
            ? "font-display text-[18px] font-semibold tracking-[-0.005em] md:text-[20px]"
            : "text-[14px]"
        }
        style={{
          color: accent ? "var(--color-lystr-tomato-deep)" : "var(--fg-1)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   Variant B — Money flow split
   ============================================================ */

function MoneyFlowVariant() {
  return (
    <div className="mx-auto max-w-[820px]">
      {/* Source / origin */}
      <div className="flex justify-center">
        <SourcePill />
      </div>

      {/* Arrows + amounts */}
      <div className="mt-6 grid grid-cols-2">
        <FlowArrow side="left" />
        <FlowArrow side="right" />
      </div>

      {/* Amounts */}
      <div className="mt-2 grid grid-cols-2 gap-6 text-center">
        <p
          className="m-0 font-display text-[20px] font-semibold tracking-[-0.01em] md:text-[24px]"
          style={{ color: "var(--fg-2)" }}
        >
          2 500 kr / mån
        </p>
        <p
          className="m-0 font-display text-[20px] font-semibold tracking-[-0.01em] md:text-[24px]"
          style={{ color: "var(--fg-2)" }}
        >
          2 500 kr / mån
        </p>
      </div>

      {/* Destinations */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6">
        <DestinationCard
          tone="muted"
          title="Elbolaget"
          subtitle="För alltid. Du äger ingenting när det är klart."
          glyph="∞"
        />
        <DestinationCard
          tone="accent"
          title="Ditt tak"
          subtitle="I 8 år. Sen är anläggningen din i minst 22 år till."
          glyph="8 år"
        />
      </div>
    </div>
  );
}

function SourcePill() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border-2 px-6 py-3"
      style={{
        borderColor: "var(--fg-1)",
        background: "var(--bg-1)",
      }}
    >
      <span
        aria-hidden
        className="inline-flex h-9 w-9 items-center justify-center rounded-full font-display text-[16px] font-semibold"
        style={{
          background: "var(--fg-1)",
          color: "var(--bg-1)",
        }}
      >
        Du
      </span>
      <span
        className="font-display text-[16px] font-semibold tracking-[-0.005em]"
        style={{ color: "var(--fg-1)" }}
      >
        Din månadskostnad för el
      </span>
    </div>
  );
}

function FlowArrow({ side }: { side: "left" | "right" }) {
  // Two arrows leaving "Du" pill — one curves left, one curves right.
  // SVG path is mirrored horizontally for the right side.
  const isLeft = side === "left";
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 120 120"
        width="100%"
        style={{ maxWidth: 160, height: "auto" }}
        aria-hidden
      >
        <defs>
          <marker
            id={`arrow-${side}`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        <path
          d={
            isLeft
              ? "M 60 0 C 60 40, 40 60, 20 110"
              : "M 60 0 C 60 40, 80 60, 100 110"
          }
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          markerEnd={`url(#arrow-${side})`}
          style={{ color: "var(--fg-2)" }}
        />
      </svg>
    </div>
  );
}

function DestinationCard({
  tone,
  title,
  subtitle,
  glyph,
}: {
  tone: "muted" | "accent";
  title: string;
  subtitle: string;
  glyph: string;
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className="rounded-3xl border p-5 md:p-7"
      style={{
        borderColor: isAccent ? "var(--color-lystr-tomato)" : "var(--border)",
        background: isAccent ? "var(--color-lystr-tomato-tint)" : "var(--bg-2)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className="m-0 font-display text-[20px] font-semibold tracking-[-0.01em] md:text-[24px]"
          style={{
            color: isAccent
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-1)",
          }}
        >
          {title}
        </p>
        <span
          className="rounded-full px-3 py-1 font-mono text-[12px] font-semibold"
          style={{
            background: isAccent ? "var(--color-lystr-tomato)" : "var(--fg-2)",
            color: isAccent ? "var(--accent-fg)" : "var(--bg-1)",
          }}
        >
          {glyph}
        </span>
      </div>
      <p
        className="m-0 mt-3 text-[14px] leading-[1.55]"
        style={{
          color: isAccent ? "var(--color-lystr-tomato-deep)" : "var(--fg-2)",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* ============================================================
   Variant C — 30-year stacked timeline
   ============================================================ */

function TimelineVariant() {
  // 8 of 30 years = 26.67% — that's the contract phase.
  const contractFrac = 8 / 30;
  return (
    <div className="mx-auto max-w-[920px]">
      {/* Bar 1 — Till elbolaget */}
      <BarRow
        label="Till elbolaget"
        sub="Hyra. Pågår i alla 30 år."
        chartContent={
          <div
            className="h-12 rounded-md md:h-16"
            style={{ background: "var(--fg-2)" }}
            aria-hidden
          />
        }
      />

      {/* Bar 2 — Till ditt tak (split) */}
      <BarRow
        label="Till ditt tak"
        sub="Avbetalas under 8 år. Sen är den din."
        chartContent={
          <div
            className="flex h-12 overflow-hidden rounded-md md:h-16"
            aria-hidden
          >
            <div
              className="flex h-full items-center justify-end pr-3"
              style={{
                width: `${contractFrac * 100}%`,
                background: "var(--color-lystr-tomato)",
              }}
            >
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--accent-fg)" }}
              >
                Avbetalning
              </span>
            </div>
            <div
              className="flex h-full flex-1 items-center justify-end self-end pr-3"
              style={{
                background: "var(--color-lystr-tomato-tint)",
                height: "20%",
              }}
            >
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--color-lystr-tomato-deep)" }}
              >
                Drift &amp; nät
              </span>
            </div>
          </div>
        }
      />

      {/* Year axis */}
      <div className="mt-3 grid grid-cols-[1fr_3fr] gap-4 md:grid-cols-[1.1fr_3.1fr] md:gap-8">
        <div />
        <div
          className="flex justify-between font-mono text-[11px]"
          style={{ color: "var(--fg-3)" }}
        >
          <span>År 1</span>
          <span>År 8</span>
          <span>År 15</span>
          <span>År 22</span>
          <span>År 30</span>
        </div>
      </div>

      {/* Money-shot annotation */}
      <div
        className="mt-10 rounded-2xl border-l-4 p-5"
        style={{
          borderColor: "var(--color-lystr-tomato)",
          background: "var(--color-lystr-tomato-tint)",
        }}
      >
        <p
          className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          År 8
        </p>
        <p
          className="m-0 mt-2 font-display text-[20px] font-semibold tracking-[-0.01em] md:text-[24px]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          Det är här du börjar tjäna pengar.
        </p>
        <p
          className="m-0 mt-2 max-w-[60ch] text-[14px] leading-[1.55]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          Avbetalningen är klar. Anläggningen är din. Räkningen rasar
          till ungefär 5 % av vad den var — och solen jobbar i minst 22
          år till.
        </p>
      </div>
    </div>
  );
}

function BarRow({
  label,
  sub,
  chartContent,
}: {
  label: string;
  sub: string;
  chartContent: React.ReactNode;
}) {
  return (
    <div className="mb-6 grid grid-cols-[1fr_3fr] gap-4 md:grid-cols-[1.1fr_3.1fr] md:gap-8">
      <div>
        <p
          className="m-0 font-display text-[16px] font-semibold tracking-[-0.005em] md:text-[18px]"
          style={{ color: "var(--fg-1)" }}
        >
          {label}
        </p>
        <p
          className="m-0 mt-1 text-[13px] leading-[1.45]"
          style={{ color: "var(--fg-3)" }}
        >
          {sub}
        </p>
      </div>
      <div className="self-center">{chartContent}</div>
    </div>
  );
}

/* ============================================================
   Variant D — Three paths a homeowner can take, side by side
   ============================================================ */

const TOTAL_YEARS = 30;
const CONTRACT_YEARS = 8;
/** Year-8 marker as a percentage of the bar's width. */
const MARKER_LEFT_PCT = (CONTRACT_YEARS / TOTAL_YEARS) * 100;

type PathSegment = {
  /** 0–30, fractional ok. */
  startYear: number;
  endYear: number;
  /** 0–100, monthly cost as % of 2 500 kr. */
  heightPct: number;
  tone: "muted" | "muted-soft" | "accent" | "accent-soft";
};

type Path = {
  label: string;
  sub: string;
  segments: PathSegment[];
  /** Optional callout for one-time upfront cost. */
  upfront?: string;
  total: string;
  ownership: string;
  highlight?: boolean;
};

const PATHS: Path[] = [
  {
    label: "Hyr av elbolaget",
    sub: "2 500 kr/mån i 30 år. Anläggningen blir aldrig din.",
    segments: [
      { startYear: 0, endYear: TOTAL_YEARS, heightPct: 100, tone: "muted" },
    ],
    total: "~900 000 kr",
    ownership: "Äger inget när det är klart",
  },
  {
    label: "Köp själv kontant",
    sub: "250 000 kr nu. Sen bara drift och nät i 30 år.",
    segments: [
      { startYear: 0, endYear: TOTAL_YEARS, heightPct: 5, tone: "muted-soft" },
    ],
    upfront: "+ 250 000 kr kontant",
    total: "~295 000 kr",
    ownership: "Äger från år 1",
  },
  {
    label: "Avbetala via Lystr",
    sub: "Samma månadskostnad som idag i 8 år. Sen rasar den.",
    segments: [
      { startYear: 0, endYear: CONTRACT_YEARS, heightPct: 100, tone: "accent" },
      {
        startYear: CONTRACT_YEARS,
        endYear: TOTAL_YEARS,
        heightPct: 5,
        tone: "accent-soft",
      },
    ],
    total: "~273 000 kr",
    ownership: "Äger från år 8",
    highlight: true,
  },
];

function ThreePathVariant() {
  return (
    <div className="mx-auto max-w-[960px]">
      {/* Year axis on top */}
      <div className="grid grid-cols-[10rem_1fr_8rem] gap-4 md:grid-cols-[14rem_1fr_10rem] md:gap-6">
        <div />
        <div
          className="flex justify-between font-mono text-[10px]"
          style={{ color: "var(--fg-3)" }}
        >
          <span>År 1</span>
          <span style={{ color: "var(--color-lystr-tomato-deep)", fontWeight: 600 }}>
            År 8
          </span>
          <span>År 15</span>
          <span>År 22</span>
          <span>År 30</span>
        </div>
        <div
          className="text-right font-mono text-[10px]"
          style={{ color: "var(--fg-3)" }}
        >
          Totalt
        </div>
      </div>

      {/* Three rows */}
      <div className="mt-3 flex flex-col gap-4">
        {PATHS.map((p) => (
          <PathRow key={p.label} path={p} />
        ))}
      </div>

      {/* Money-shot annotation */}
      <div
        className="mt-12 rounded-2xl border-l-4 p-6 md:p-8"
        style={{
          borderColor: "var(--color-lystr-tomato)",
          background: "var(--color-lystr-tomato-tint)",
        }}
      >
        <p
          className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          Det här är affären
        </p>
        <p
          className="m-0 mt-2 font-display text-[22px] font-semibold tracking-[-0.01em] md:text-[28px]"
          style={{ color: "var(--color-lystr-tomato-deep)", lineHeight: 1.15 }}
        >
          Lägst totalkostnad. Ingen kontantinsats.<br />
          Du äger till slut.
        </p>
        <p
          className="m-0 mt-3 max-w-[60ch] text-[14px] leading-[1.55] md:text-[15px]"
          style={{ color: "var(--color-lystr-tomato-deep)" }}
        >
          Lystr är inte solpanelsförsäljare. Vi är finansiering. Det är
          därför vi vinner — du kommer ändå att betala för el, så låt
          pengarna gå till ditt eget tak istället för någon annans
          balansräkning.
        </p>
      </div>
    </div>
  );
}

function PathRow({ path }: { path: Path }) {
  const isHighlight = path.highlight;
  return (
    <div
      className="grid grid-cols-[10rem_1fr_8rem] items-center gap-4 rounded-2xl p-3 md:grid-cols-[14rem_1fr_10rem] md:gap-6 md:p-4"
      style={{
        background: isHighlight ? "var(--color-lystr-tomato-tint)" : "var(--bg-1)",
        outline: isHighlight ? "2px solid var(--color-lystr-tomato)" : undefined,
        outlineOffset: isHighlight ? "-2px" : undefined,
      }}
    >
      {/* Label column */}
      <div>
        <p
          className="m-0 font-display text-[15px] font-semibold tracking-[-0.005em] md:text-[17px]"
          style={{
            color: isHighlight
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-1)",
          }}
        >
          {path.label}
        </p>
        <p
          className="m-0 mt-1 text-[12px] leading-[1.4] md:text-[13px]"
          style={{
            color: isHighlight
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-3)",
          }}
        >
          {path.sub}
        </p>
      </div>

      {/* Bar column */}
      <div className="relative h-16 md:h-20">
        {/* Year-8 marker line — appears on every row so it forms a column */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-20"
          style={{
            left: `${MARKER_LEFT_PCT}%`,
            borderLeft: "1.5px dashed var(--color-lystr-tomato-deep)",
            opacity: 0.55,
          }}
          aria-hidden
        />

        {/* Baseline */}
        <div
          className="absolute right-0 left-0 bottom-0 z-0 h-px"
          style={{ background: "var(--border)" }}
          aria-hidden
        />

        {/* Segments */}
        {path.segments.map((s, i) => (
          <div
            key={i}
            className="absolute bottom-0 z-10 rounded-t-md"
            style={{
              left: `${(s.startYear / TOTAL_YEARS) * 100}%`,
              width: `${((s.endYear - s.startYear) / TOTAL_YEARS) * 100}%`,
              height: `${s.heightPct}%`,
              minHeight: 4,
              background: segmentColor(s.tone),
            }}
            aria-hidden
          />
        ))}

        {/* Upfront callout — sits above year 0 */}
        {path.upfront && (
          <div
            className="absolute z-30 -translate-x-1 -translate-y-1"
            style={{ left: 0, top: 0 }}
          >
            <span
              className="inline-flex items-center gap-1 rounded-full border-2 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{
                borderColor: "var(--fg-1)",
                background: "var(--bg-1)",
                color: "var(--fg-1)",
              }}
            >
              {path.upfront}
            </span>
          </div>
        )}
      </div>

      {/* Total column */}
      <div className="text-right">
        <p
          className="m-0 font-display text-[16px] font-semibold tracking-[-0.005em] md:text-[18px]"
          style={{
            color: isHighlight
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-1)",
          }}
        >
          {path.total}
        </p>
        <p
          className="m-0 mt-0.5 text-[11px] leading-[1.3] md:text-[12px]"
          style={{
            color: isHighlight
              ? "var(--color-lystr-tomato-deep)"
              : "var(--fg-3)",
          }}
        >
          {path.ownership}
        </p>
      </div>
    </div>
  );
}

function segmentColor(tone: PathSegment["tone"]): string {
  switch (tone) {
    case "muted":
      return "var(--fg-2)";
    case "muted-soft":
      return "var(--fg-4)";
    case "accent":
      return "var(--color-lystr-tomato)";
    case "accent-soft":
      return "var(--color-lystr-tomato-deep)";
  }
}
