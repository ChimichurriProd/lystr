import Link from "next/link";
import { Coins, Frown, Smile, Sun as SunIcon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* ============================================================
   /labb/simpel-2 — split-stream variant of /labb/simpel.
   Same five-scene story, but scene 2 splits each bill into two
   streams: a green portion (35 %) flying up to the sun, and a
   red portion (65 %) flying right to the elbolag — now rendered
   as a frowning face instead of a logo carousel. Original page
   at /labb/simpel is preserved untouched.
   ============================================================ */

export const metadata = {
  title: "Simpelt v2 · Lystr",
  description:
    "En enkel berättelse om elräkningen, sett i två strömmar — solens del och elbolagets del.",
  robots: { index: false, follow: false },
};

export default function SimpelPage() {
  return (
    <>
      <SiteHeader />

      {/* Scoped styles — scroll-driven reveals + tiny ambient loops */}
      <style>{`
        @keyframes simpelFadeUp {
          from { opacity: 0; transform: translateY(48px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes simpelScaleIn {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes simpelFlyAway {
          from { transform: translateX(-50%); opacity: 0; }
          15%  { opacity: 1; }
          to   { transform: translateX(120%); opacity: 0; }
        }
        @keyframes simpelFlyIn {
          from { transform: translateY(-180%); opacity: 0; }
          25%  { opacity: 1; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes simpelGrow {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        @keyframes simpelDrift {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes simpelArrowShoot {
          0%   { transform: translateX(-30%) scaleX(0.4); opacity: 0; }
          15%  { opacity: 1; }
          70%  { transform: translateX(50%) scaleX(1); opacity: 1; }
          100% { transform: translateX(110%) scaleX(0.4); opacity: 0; }
        }
        @keyframes simpelLogoScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes simpelSunArc {
          0%   { transform: translate(-10%, 60%) scale(0.85); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translate(50%, -8%) scale(1); opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(110%, 60%) scale(0.85); opacity: 0; }
        }
        @keyframes simpelMoonRise {
          0%, 50%   { opacity: 0; transform: translate(50%, 80%); }
          60%       { opacity: 0.9; transform: translate(50%, 12%); }
          90%       { opacity: 0.9; transform: translate(50%, 12%); }
          100%      { opacity: 0; transform: translate(50%, 80%); }
        }
        @keyframes simpelBatteryCharge {
          0%   { height: 30%; }
          50%  { height: 92%; }
          100% { height: 30%; }
        }
        @keyframes simpelRayPulse {
          0%, 50%  { opacity: 0.85; }
          51%, 100% { opacity: 0; }
        }
        @keyframes simpelWindowGlow {
          0%, 50%   { fill-opacity: 0.18; }
          60%, 95%  { fill-opacity: 1; }
          100%      { fill-opacity: 0.18; }
        }
        @keyframes simpelEnergyDot {
          0%   { offset-distance: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes simpelSunGlow {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50%      { transform: scale(1.08); opacity: 1; }
        }
        /* Charge stream: bill flies the full width of the track from the
           happy face on the left to the battery on the right. Same
           shape as v1's simpelBillFly, just renamed for clarity here. */
        @keyframes simpelChargeFly {
          0%      { opacity: 0; left: 0%;   transform: translate(-10%, -50%) scale(0.7); }
          1%      { opacity: 1; left: 0%;   transform: translate(0%,   -50%) scale(1); }
          7.5%    { opacity: 1; left: 100%; transform: translate(-100%,-50%) scale(1); }
          8%      { opacity: 0; left: 100%; transform: translate(-100%,-50%) scale(0.55); }
          8.33%   { opacity: 0; left: 0%;   transform: translate(-10%, -50%) scale(0.7); }
          100%    { opacity: 0; left: 0%;   transform: translate(-10%, -50%) scale(0.7); }
        }

        /* Sun-rain pill: starts at the sun position (high above the
           track) and falls down-right to land at the battery. Visible
           for the first half of each sub-cycle. */
        @keyframes simpelSunRain {
          0%      { opacity: 0; left: 50%;  top: 50%; transform: translate(-50%, calc(-50% - 200px)) scale(0.4); }
          3%      { opacity: 0; left: 50%;  top: 50%; transform: translate(-50%, calc(-50% - 200px)) scale(0.4); }
          4%      { opacity: 1; left: 50%;  top: 50%; transform: translate(-50%, calc(-50% - 200px)) scale(1); }
          7%      { opacity: 1; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(0.95); }
          8%      { opacity: 0; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(0.4); }
          8.33%   { opacity: 0; left: 50%;  top: 50%; transform: translate(-50%, calc(-50% - 200px)) scale(0.4); }
          100%    { opacity: 0; left: 50%;  top: 50%; transform: translate(-50%, calc(-50% - 200px)) scale(0.4); }
        }

        /* Savings pill: flows from the battery (right) back to the
           smile face (left). Slightly delayed after the sun pill so it
           feels like a chain reaction: sun arrives, battery charges,
           savings return to you. */
        @keyframes simpelSavingsBack {
          0%      { opacity: 0; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(0.4); }
          4.3%    { opacity: 0; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(0.4); }
          5%      { opacity: 1; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(1); }
          7.5%    { opacity: 1; left: 0%;   top: 50%; transform: translate(0%,   -50%) scale(1); }
          8%      { opacity: 0; left: 0%;   top: 50%; transform: translate(0%,   -50%) scale(0.4); }
          8.33%   { opacity: 0; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(0.4); }
          100%    { opacity: 0; left: 100%; top: 50%; transform: translate(-100%, -50%) scale(0.4); }
        }

        /* Battery fill: scales horizontally from empty to full over 36s
           (one full year of bills). Blinks 3x at the top, then fades
           out and resets while invisible so the loop is seamless. */
        @keyframes simpelBatteryFill {
          0%      { transform: scaleX(0); opacity: 1; }
          85%     { transform: scaleX(1); opacity: 1; }
          86.5%   { transform: scaleX(1); opacity: 0.2; }
          88%     { transform: scaleX(1); opacity: 1; }
          89.5%   { transform: scaleX(1); opacity: 0.2; }
          91%     { transform: scaleX(1); opacity: 1; }
          92.5%   { transform: scaleX(1); opacity: 0.2; }
          94%     { transform: scaleX(1); opacity: 1; }
          97%     { transform: scaleX(1); opacity: 1; }
          98%     { transform: scaleX(1); opacity: 0; }
          99%     { transform: scaleX(0); opacity: 0; }
          100%    { transform: scaleX(0); opacity: 1; }
        }
        ${slotKeyframes()}

        /* Default: items show in final state (graceful fallback). */
        .reveal-up,
        .reveal-scale,
        .fly-away,
        .fly-in,
        .grow,
        .drift {
          opacity: 1;
          transform: none;
        }

        /* Scroll-driven where supported */
        @supports (animation-timeline: view()) {
          .reveal-up {
            animation: simpelFadeUp linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 35%;
          }
          .reveal-scale {
            animation: simpelScaleIn linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 50%;
          }
          .fly-away {
            animation: simpelFlyAway linear both;
            animation-timeline: view();
            animation-range: entry 0% exit 100%;
          }
          .fly-in {
            animation: simpelFlyIn linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 60%;
          }
          .grow {
            animation: simpelGrow linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 60%;
          }
        }

        /* Always-loop ambient drift for the snowflakes — independent of scroll. */
        .drift {
          animation: simpelDrift 14s linear infinite;
        }

        /* Small staggered delays on multi-coin rows. */
        .coin-1 { animation-delay: 0s !important; }
        .coin-2 { animation-delay: -3s !important; }
        .coin-3 { animation-delay: -6s !important; }
        .coin-4 { animation-delay: -9s !important; }
      `}</style>

      <main className="flex-1">
        {/* ---------------- Scene 1 — the cold + the bill ---------------- */}
        <SceneSection background="var(--bg-2)">
          {/* Drifting snowflakes (decorative) */}
          <Snow />

          <div className="z-10 mx-auto flex max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <BillCard />
            <h1
              className="reveal-up mx-auto mt-12 max-w-[14ch] font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(40px, 7vw, 80px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--fg-1)",
              }}
            >
              Vintern var dyr.
            </h1>
            <ScrollHint />
          </div>
        </SceneSection>

        {/* ---------------- Scene 2 — where the money goes ---------------- */}
        <SceneSection background="var(--bg-1)">
          <div className="z-10 mx-auto flex w-full max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <OutflowDiagram />
            <h2
              className="reveal-up mt-16 whitespace-nowrap font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Varje månad, samma utgift.
            </h2>
            <p
              className="reveal-up mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.5] md:text-[17px]"
              style={{ color: "var(--fg-2)" }}
            >
              Ungefär{" "}
              <strong style={{ color: "var(--color-lystr-tomato-deep)" }}>
                65 %
              </strong>{" "}
              av räkningen hamnar hos elbolaget. Resten går till skatt och moms. Du får tillbaka noll.
            </p>
          </div>
        </SceneSection>

        {/* ---------------- Scene 3 — the positive flip: charging your own anläggning ---------------- */}
        <SceneSection background="var(--bg-2)">
          <div className="z-10 mx-auto flex w-full max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <ChargeDiagram />
            <h2
              className="reveal-up mx-auto mt-14 max-w-[20ch] font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(32px, 5.4vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Tänk om du{" "}
              <span className="text-lystr-tomato">slapp betala dem?</span>
            </h2>
            <p
              className="reveal-up mx-auto mt-4 max-w-[48ch] text-[15px] leading-[1.55] md:text-[17px]"
              style={{ color: "var(--fg-2)" }}
            >
              Varje månad går till att avbetala din egen solanläggning.
              Efter åtta år är den{" "}
              <strong style={{ color: "var(--fg-1)" }}>din</strong>.
            </p>
          </div>
        </SceneSection>

        {/* ---------------- Scene 4 — sun → battery → savings back to you ---------------- */}
        <SceneSection background="var(--bg-1)">
          <div className="z-10 mx-auto flex w-full max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <SunCycleDiagram />
            <h2
              className="reveal-up mt-16 whitespace-nowrap font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Då tar solen över.
            </h2>
            <p
              className="reveal-up mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.55] md:text-[17px]"
              style={{ color: "var(--fg-2)" }}
            >
              Solen laddar ditt eget batteri. Det jämnar ut räkningen och
              pengarna stannar hos dig.
            </p>
          </div>
        </SceneSection>

        {/* ---------------- Scene 5 — soft CTA ---------------- */}
        <SceneSection background="var(--bg-ink)" textTone="dark">
          <div className="z-10 mx-auto flex max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <p
              className="reveal-up text-[13px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "var(--color-lystr-tomato)" }}
            >
              Det är hela affären
            </p>
            <h2
              className="reveal-up mx-auto mt-5 max-w-[18ch] font-display font-semibold tracking-tight text-white"
              style={{
                fontSize: "clamp(36px, 5.4vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Vi är energirådgivare.<br />Vi visar hur.
            </h2>
            <Link
              href="/#kalkyl"
              className="reveal-up mt-10 inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-7 py-4 text-base font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
            >
              Få en gratis rådgivning →
            </Link>
          </div>
        </SceneSection>
      </main>

      <SiteFooter />
    </>
  );
}

/* ============================================================
   Scene shell — 100vh, centered, scoped data-theme
   ============================================================ */

function SceneSection({
  background,
  textTone,
  children,
}: {
  background: string;
  textTone?: "dark";
  children: React.ReactNode;
}) {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 md:py-24"
      style={{
        background,
        color: textTone === "dark" ? "white" : "var(--fg-1)",
      }}
    >
      {children}
    </section>
  );
}

/* ============================================================
   Illustrations
   ============================================================ */

function Snow() {
  // Decorative drifting snowflakes — purely ambient.
  const flakes = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {flakes.map((i) => {
        const left = (i * 7.3 + 3) % 100;
        const delay = -((i * 1.7) % 14);
        const size = 8 + ((i * 11) % 14);
        const opacity = 0.18 + ((i % 4) * 0.08);
        return (
          <span
            key={i}
            className="drift absolute font-mono"
            style={{
              left: `${left}%`,
              top: 0,
              animationDelay: `${delay}s`,
              fontSize: size,
              color: "var(--fg-2)",
              opacity,
            }}
          >
            ❄
          </span>
        );
      })}
    </div>
  );
}

function BillCard() {
  return (
    <div
      className="reveal-scale relative w-full max-w-[460px] origin-top rounded-2xl border bg-white p-6 text-left shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] md:p-8"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: "var(--border)" }}>
        <p
          className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--fg-1)" }}
        >
          Faktura
        </p>
        <p
          className="m-0 font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{ color: "var(--fg-3)" }}
        >
          Period: mars 2026
        </p>
      </div>

      {/* Customer */}
      <div className="mt-3">
        <p
          className="m-0 font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          Mottagare
        </p>
        <p
          className="m-0 mt-0.5 text-[12px]"
          style={{ color: "var(--fg-1)" }}
        >
          Anders Andersson · Hemvägen 12, 138 36 Älta
        </p>
      </div>

      {/* Line items */}
      <div className="mt-5">
        <p
          className="m-0 font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          Specifikation
        </p>
        <dl className="mt-2 flex flex-col gap-1.5 text-[12px] tabular-nums">
          <BillRow label="Elhandel · 1 400 kWh × 1,80 kr" value="2 520 kr" />
          <BillRow label="Påslag &amp; elcertifikat" value="92 kr" />
          <BillRow label="Elnätsavgift, fast" value="285 kr" />
          <BillRow label="Överföring · 1 400 kWh × 0,42" value="588 kr" />
          <BillRow label="Energiskatt · 1 400 × 0,535" value="749 kr" />
          <BillRow label="Moms 25 %" value="1 058 kr" />
        </dl>
      </div>

      {/* Total */}
      <div
        className="mt-5 border-t-2 border-double pt-3"
        style={{ borderColor: "var(--fg-1)" }}
      >
        <div className="flex items-baseline justify-between">
          <p
            className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--fg-1)" }}
          >
            Att betala
          </p>
          <p
            className="m-0 font-display font-semibold tracking-tight tabular-nums"
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              color: "var(--color-lystr-tomato)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            5 292 kr
          </p>
        </div>
        <p
          className="m-0 mt-2 text-[11px]"
          style={{ color: "var(--fg-3)" }}
        >
          Förfallodag 2026-04-15 · OCR 1234567 89
        </p>
      </div>
    </div>
  );
}

function BillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt
        className="text-[12px] leading-snug"
        style={{ color: "var(--fg-2)" }}
      >
        {label}
      </dt>
      <dd
        className="m-0 text-[12px]"
        style={{ color: "var(--fg-1)" }}
      >
        {value}
      </dd>
    </div>
  );
}

/* Swedish energy companies the customer is most likely seeing on
   their bill or in their inbox. Names only — no trademarked logos. */
const ENERGY_COMPANIES: { name: string; tone: string }[] = [
  { name: "Vattenfall", tone: "#ca8a04" },
  { name: "E.ON", tone: "#dc2626" },
  { name: "Fortum", tone: "#f97316" },
  { name: "Tibber", tone: "#3b82f6" },
  { name: "Bixia", tone: "#16a34a" },
  { name: "Skellefteå Kraft", tone: "#0284c7" },
  { name: "Mälarenergi", tone: "#0369a1" },
  { name: "Telge Energi", tone: "#ea580c" },
  { name: "Jämtkraft", tone: "#0891b2" },
  { name: "Göteborg Energi", tone: "#15803d" },
  { name: "Eskilstuna Energi", tone: "#7c2d12" },
  { name: "Karlstads Energi", tone: "#1d4ed8" },
];

/* Vertical slot-machine geometry — single source of truth used by
   both the keyframe generator and the rendered DOM. */
const SLOT_LOGO_HEIGHT = 80; // px — must match the row's class height
const SLOT_COUNT = ENERGY_COMPANIES.length; // 12
/** Fraction of each sub-cycle spent holding on a logo (the rest is the spin). */
const SLOT_HOLD_FRAC = 0.7;

function slotKeyframes(): string {
  const segs: string[] = [`0%{transform:translateY(0)}`];
  for (let i = 0; i < SLOT_COUNT; i++) {
    const cycleHoldEnd = ((i + SLOT_HOLD_FRAC) / SLOT_COUNT) * 100;
    const cycleEnd = ((i + 1) / SLOT_COUNT) * 100;
    const y = -i * SLOT_LOGO_HEIGHT;
    const yNext = -(i + 1) * SLOT_LOGO_HEIGHT;
    segs.push(`${cycleHoldEnd.toFixed(3)}%{transform:translateY(${y}px)}`);
    segs.push(`${cycleEnd.toFixed(3)}%{transform:translateY(${yNext}px)}`);
  }
  return `@keyframes simpelSlot {${segs.join("")}}`;
}

function OutflowDiagram() {
  // Scene 2 today: a single red stream of bills going from the sad
  // face on the left to the logo spinner on the right. No sun, no
  // split — the money simply leaves and goes to whichever elbolag is
  // currently on the cycle. ~65 % of the bill ends up here (the rest
  // goes to staten via skatt + moms; staten isn't shown because it's
  // not Lystr's villain).
  return (
    <div className="reveal-up flex w-full max-w-[920px] items-center gap-3 md:gap-6">
      <CharacterBubble />
      <BillTrack />
      <SlotMachine />
    </div>
  );
}

function BillTrack() {
  // Plain full-width red bill stream — same cadence as the slot
  // machine, one bill per sub-cycle.
  return (
    <div className="relative h-16 flex-1 overflow-hidden md:h-20">
      <div
        className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--fg-3) 0 6px, transparent 6px 12px)",
          opacity: 0.4,
        }}
        aria-hidden
      />
      {SPLIT_AMOUNTS.map((amounts, i) => (
        <FullBill
          key={i}
          amount={amounts.full}
          delay={-i * BILL_CYCLE_S}
        />
      ))}
    </div>
  );
}

function FullBill({ amount, delay }: { amount: string; delay: number }) {
  return (
    <span
      className="absolute inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold whitespace-nowrap md:text-[12px]"
      style={{
        top: "50%",
        background: "var(--color-lystr-tomato)",
        color: "var(--accent-fg)",
        boxShadow: "0 6px 16px -4px rgba(154,53,48,0.45)",
        animation: `simpelChargeFly ${SLOT_DURATION_S}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <Coins size={14} strokeWidth={2.4} />
      <span>{amount} kr</span>
    </span>
  );
}

function SunSpot() {
  // High up in the center of the scene. Vertical distance from the
  // track midpoint matches the green coin's animation peak so the
  // coin lands exactly on the sun.
  return (
    <div
      className="pointer-events-none absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      style={{ top: "-190px" }}
      aria-hidden
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full md:h-16 md:w-16"
        style={{
          background: "var(--color-lystr-green-tint)",
          color: "var(--color-lystr-green-deep)",
          boxShadow: "0 12px 30px -10px rgba(74,155,74,0.35)",
          animation: "simpelSunGlow 4s ease-in-out infinite",
        }}
      >
        <SunIcon className="h-8 w-8 md:h-9 md:w-9" strokeWidth={2} />
      </div>
      <p
        className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ color: "var(--color-lystr-green-deep)" }}
      >
        Solen
      </p>
    </div>
  );
}

function CharacterBubble() {
  // The "you" of the story — sad-faced because every month the bill
  // arrives and most of it goes to the elbolag. Same dark bubble as
  // before so the visual weight matches the slot machine on the right.
  return (
    <div
      className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full md:h-28 md:w-28"
      style={{
        background: "var(--fg-1)",
        color: "var(--bg-1)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.2) inset, 0 18px 40px -16px rgba(0,0,0,0.45)",
      }}
    >
      <Frown
        className="h-10 w-10 md:h-14 md:w-14"
        strokeWidth={1.8}
        aria-hidden
      />
    </div>
  );
}

/**
 * The bill's animation timeline matches the slot's full duration so we
 * can synchronise 12 different monthly amounts to the 12 slot landings.
 * Each bill is visible for one 3-second sub-cycle, then hidden, with
 * its own delay to take a unique slot.
 */
const SLOT_DURATION_S = 36; // seconds for full slot loop
const BILL_CYCLE_S = SLOT_DURATION_S / SLOT_COUNT; // 3 seconds per visible window

/**
 * 12 monthly bills + the saved portion per month. `saved` is 80 % of
 * the full bill — Lystr's claim is that solar + battery covers up to
 * 80 % of your previous cost (even in winter). Approximate seasonal
 * pattern, starting with March so it aligns with the faktura shown in
 * scene 1.
 */
const SPLIT_AMOUNTS: { full: string; saved: string }[] = [
  { full: "5 292", saved: "4 234" }, // mar
  { full: "3 740", saved: "2 992" }, // apr
  { full: "2 480", saved: "1 984" }, // may
  { full: "1 760", saved: "1 408" }, // jun
  { full: "1 380", saved: "1 104" }, // jul
  { full: "1 920", saved: "1 536" }, // aug
  { full: "2 740", saved: "2 192" }, // sep
  { full: "4 120", saved: "3 296" }, // oct
  { full: "5 680", saved: "4 544" }, // nov
  { full: "6 940", saved: "5 552" }, // dec
  { full: "7 240", saved: "5 792" }, // jan
  { full: "6 580", saved: "5 264" }, // feb
];


/* ============================================================
   Scene 4 — Sun → battery → savings cycle
   Energy drops from the sun above, lands at the battery (right),
   and savings stream back from the battery to the smile face
   (left). Two flows on a 3-second sub-cycle, looping per month.
   ============================================================ */

function SunCycleDiagram() {
  return (
    <div className="reveal-up relative w-full max-w-[920px]">
      <SunSpot />
      <div className="flex items-center gap-3 md:gap-6">
        <HappyBubble />
        <CycleTrack />
        <BatteryUnit />
      </div>
    </div>
  );
}

function CycleTrack() {
  return (
    <div className="relative h-16 flex-1 overflow-visible md:h-20">
      <div
        className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--fg-3) 0 6px, transparent 6px 12px)",
          opacity: 0.4,
        }}
        aria-hidden
      />
      {SPLIT_AMOUNTS.map((amounts, i) => {
        const delay = -i * BILL_CYCLE_S;
        return (
          <span key={`cycle-${i}`}>
            <SunPill delay={delay} />
            <SavingsPill amount={amounts.saved} delay={delay} />
          </span>
        );
      })}
    </div>
  );
}

function SunPill({ delay }: { delay: number }) {
  // Energy drop: starts at the sun, lands at the battery.
  return (
    <span
      className="absolute inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold whitespace-nowrap md:text-[11px]"
      style={{
        background: "var(--color-lystr-green)",
        color: "#ffffff",
        boxShadow: "0 6px 14px -4px rgba(42,106,42,0.4)",
        animation: `simpelSunRain ${SLOT_DURATION_S}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <SunIcon size={12} strokeWidth={2.4} />
      <span>Solens energi</span>
    </span>
  );
}

function SavingsPill({ amount, delay }: { amount: string; delay: number }) {
  // Savings stream: flows back from the battery to the smile face.
  return (
    <span
      className="absolute inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] font-bold whitespace-nowrap md:text-[12px]"
      style={{
        background: "var(--color-lystr-green)",
        color: "#ffffff",
        boxShadow: "0 8px 18px -4px rgba(42,106,42,0.5)",
        animation: `simpelSavingsBack ${SLOT_DURATION_S}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <Coins size={14} strokeWidth={2.4} />
      <span>+ {amount} kr sparat</span>
    </span>
  );
}

function SlotMachine() {
  // Logo spinner — same as v1: Swedish energy companies cycle through
  // the viewport in sync with the bill cadence.
  const repeated = [...ENERGY_COMPANIES, ...ENERGY_COMPANIES];
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[260px]">
      <div
        className="relative overflow-hidden"
        style={{ height: SLOT_LOGO_HEIGHT }}
      >
        <div
          className="absolute inset-x-0 top-0"
          style={{
            animation: `simpelSlot ${SLOT_DURATION_S}s infinite`,
            animationTimingFunction: "cubic-bezier(0.32, 0, 0.18, 1)",
          }}
          aria-hidden
        >
          {repeated.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-display text-[20px] font-bold tracking-[-0.02em] md:text-[26px]"
              style={{
                height: SLOT_LOGO_HEIGHT,
                color: c.tone,
              }}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Scene 3 — Charge diagram
   Happy face on the left, blue bills traveling right, battery
   charging up over a full year (36s = 12 monthly bills). When
   full, the fill blinks 3× then resets to empty.
   ============================================================ */

function ChargeDiagram() {
  return (
    <div className="reveal-up flex w-full max-w-[920px] items-center gap-3 md:gap-6">
      <HappyBubble />
      <ChargeTrack />
      <BatteryUnit />
    </div>
  );
}

function HappyBubble() {
  return (
    <div
      className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full md:h-28 md:w-28"
      style={{
        background: "var(--fg-1)",
        color: "var(--bg-1)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.2) inset, 0 18px 40px -16px rgba(0,0,0,0.45)",
      }}
    >
      <Smile
        className="h-10 w-10 md:h-14 md:w-14"
        strokeWidth={1.8}
        aria-hidden
      />
    </div>
  );
}

function ChargeTrack() {
  // Same 12-month cadence as scene 2 — bills cycle full track width
  // from happy face to battery, one per slot sub-cycle.
  return (
    <div className="relative h-16 flex-1 overflow-hidden md:h-20">
      <div
        className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--fg-3) 0 6px, transparent 6px 12px)",
          opacity: 0.4,
        }}
        aria-hidden
      />
      {SPLIT_AMOUNTS.map((amounts, i) => (
        <ChargeBill
          key={i}
          amount={amounts.full}
          delay={-i * BILL_CYCLE_S}
        />
      ))}
    </div>
  );
}

function ChargeBill({ amount, delay }: { amount: string; delay: number }) {
  return (
    <span
      className="absolute inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold whitespace-nowrap md:text-[12px]"
      style={{
        top: "50%",
        background: "var(--color-lystr-sky-deep)",
        color: "#ffffff",
        boxShadow: "0 6px 16px -4px rgba(47,100,120,0.45)",
        animation: `simpelChargeFly ${SLOT_DURATION_S}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <Coins size={14} strokeWidth={2.4} />
      <span>{amount} kr</span>
    </span>
  );
}

function BatteryUnit() {
  // Horizontal phone-style battery. Inner fill rect scales from 0 to
  // full over the full 36s cycle, blinks at the top, then resets.
  return (
    <div className="flex flex-shrink-0 flex-col items-center w-[180px] md:w-[240px]">
      <svg
        viewBox="0 0 220 110"
        className="h-20 w-full md:h-24"
        aria-hidden
      >
        {/* Battery body (outline) */}
        <rect
          x="3"
          y="3"
          width="190"
          height="104"
          rx="12"
          fill="var(--bg-1)"
          stroke="var(--fg-1)"
          strokeWidth="4"
        />
        {/* Battery cap */}
        <rect
          x="195"
          y="36"
          width="22"
          height="38"
          rx="4"
          fill="var(--fg-1)"
        />
        {/* Battery fill — scaleX from 0 to 1 over the cycle */}
        <rect
          x="13"
          y="13"
          width="170"
          height="84"
          rx="6"
          fill="var(--color-lystr-green)"
          style={{
            transformBox: "fill-box",
            transformOrigin: "0% 50%",
            transform: "scaleX(0)",
            animation: `simpelBatteryFill ${SLOT_DURATION_S}s linear infinite`,
          }}
        />
      </svg>
      <p
        className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ color: "var(--fg-3)" }}
      >
        Din anläggning
      </p>
    </div>
  );
}


function ScrollHint() {
  return (
    <p
      className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70"
      style={{ color: "var(--fg-3)" }}
    >
      Scrolla ↓
    </p>
  );
}
