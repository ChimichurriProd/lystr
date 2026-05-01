import Link from "next/link";
import { Coins, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* ============================================================
   /labb/simpel — beginner-level explainer.
   Designed for a customer who just got a brutal winter bill
   and is angry. Five full-viewport scenes, mostly illustration
   and one line of copy each. Animations are scroll-driven via
   CSS `animation-timeline: view()` — no JavaScript, no library.
   Browsers without support gracefully render final state.
   ============================================================ */

export const metadata = {
  title: "Simpelt · Lystr",
  description:
    "En enkel berättelse om elräkningen och vart pengarna går. Lystr förklarar steg för steg.",
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
        /* Bill keyframes work on the FULL slot duration (36s). Each
           bill is visible for only 1/12 of that loop (one slot sub-
           cycle = 3s), then hidden. Stagger 12 bills with negative
           animation-delay so each takes its own 3s slot, in sync with
           the slot machine's settle. The bill's 'left' animates 0 to
           100% (parent width), with translateX(-100%) at the end so it
           sits flush against the right edge instead of overflowing. */
        @keyframes simpelBillFly {
          0%      { opacity: 0; left: 0%;   transform: translate(-10%, -50%) scale(0.7); }
          1%      { opacity: 1; left: 0%;   transform: translate(0%,   -50%) scale(1); }
          7.5%    { opacity: 1; left: 100%; transform: translate(-100%,-50%) scale(1); }
          8%      { opacity: 0; left: 100%; transform: translate(-100%,-50%) scale(0.55); }
          8.33%   { opacity: 0; left: 0%;   transform: translate(-10%, -50%) scale(0.7); }
          100%    { opacity: 0; left: 0%;   transform: translate(-10%, -50%) scale(0.7); }
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
              className="reveal-up mt-14 whitespace-nowrap font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Varje månad, samma visa.
            </h2>
            <p
              className="reveal-up mx-auto mt-4 max-w-[44ch] text-[15px] leading-[1.5] md:text-[17px]"
              style={{ color: "var(--fg-2)" }}
            >
              Visste du att{" "}
              <strong style={{ color: "var(--fg-1)" }}>
                65 %
              </strong>{" "}
              av din elräkning går till elbolagen?
            </p>
          </div>
        </SceneSection>

        {/* ---------------- Scene 3 — the pivot question ---------------- */}
        <SceneSection background="var(--bg-2)">
          <div className="z-10 mx-auto flex max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <RoofIllustration />
            <h2
              className="reveal-up mx-auto mt-14 max-w-[18ch] font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(32px, 5.4vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Tänk om pengarna gick till ditt tak{" "}
              <span className="text-lystr-tomato">istället?</span>
            </h2>
          </div>
        </SceneSection>

        {/* ---------------- Scene 4 — year 8 reveal ---------------- */}
        <SceneSection background="var(--color-lystr-tomato-tint)">
          <div className="z-10 mx-auto flex max-w-(--container-marketing) flex-col items-center px-[22px] text-center md:px-8">
            <BigNumberEight />
            <h2
              className="reveal-up mx-auto mt-10 max-w-[16ch] font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(36px, 5.6vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--color-lystr-tomato-deep)",
              }}
            >
              Efter åtta år är solen din.
            </h2>
            <p
              className="reveal-up mx-auto mt-4 max-w-[28ch] text-[16px] md:text-[18px]"
              style={{ color: "var(--color-lystr-tomato-deep)" }}
            >
              Du betalade samma som idag. Bara till ditt eget tak.
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
  return (
    <div className="reveal-up flex w-full max-w-[920px] items-center gap-3 md:gap-6">
      <CharacterBubble />
      <BillTrack />
      <SlotMachine />
    </div>
  );
}

function CharacterBubble() {
  // The "you" of the story. Lucide's Users icon — two stylised heads
  // with shoulders, line-art, very minimal. Reads as "household" or
  // "family" without being literal. White on a dark circle to balance
  // the visual weight of the slot machine on the other end.
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
      <Users
        className="h-10 w-10 md:h-14 md:w-14"
        strokeWidth={1.6}
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
 * 12 monthly bill amounts for a Swedish villa with elvärme. Roughly
 * seasonal: winter peaks (~7 000 kr) and summer troughs (~1 400 kr).
 * Order is jan → dec but starts at march so the first one shown when
 * the page loads is the same "5 292 kr" we display in scene 1.
 */
const BILL_AMOUNTS = [
  "5 292 kr", // mar (matches the faktura in scene 1)
  "3 740 kr", // apr
  "2 480 kr", // may
  "1 760 kr", // jun
  "1 380 kr", // jul
  "1 920 kr", // aug
  "2 740 kr", // sep
  "4 120 kr", // oct
  "5 680 kr", // nov
  "6 940 kr", // dec
  "7 240 kr", // jan
  "6 580 kr", // feb
];

function BillTrack() {
  return (
    <div className="relative h-16 flex-1 overflow-hidden md:h-20">
      {/* Dashed rail */}
      <div
        className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--fg-3) 0 6px, transparent 6px 12px)",
          opacity: 0.4,
        }}
        aria-hidden
      />
      {/* One bill per "month". Each takes its own 3-second window
          inside the 36-second cycle, in sync with a slot landing. */}
      {BILL_AMOUNTS.map((amount, i) => (
        <Bill key={i} amount={amount} delay={-i * BILL_CYCLE_S} />
      ))}
    </div>
  );
}

function Bill({ amount, delay }: { amount: string; delay: number }) {
  return (
    <span
      className="absolute inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold whitespace-nowrap md:text-[12px]"
      style={{
        // top-50% with the keyframe's translateY(-50%) keeps it vertically centered.
        top: "50%",
        background: "var(--color-lystr-tomato)",
        color: "var(--accent-fg)",
        boxShadow: "0 6px 16px -4px rgba(154,53,48,0.45)",
        animation: `simpelBillFly ${SLOT_DURATION_S}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    >
      <Coins size={14} strokeWidth={2.4} />
      <span>{amount}</span>
    </span>
  );
}

function SlotMachine() {
  // Duplicate the list so the translateY loop is seamless.
  const repeated = [...ENERGY_COMPANIES, ...ENERGY_COMPANIES];
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[260px]">
      <div
        className="relative overflow-hidden"
        style={{ height: SLOT_LOGO_HEIGHT }}
      >
        {/* Spinning column. top: 0 puts logo 0 directly in the viewport
            at translateY(0). */}
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

function RoofIllustration() {
  // Continuous 16-second day/night cycle. The CSS keyframes are timed
  // so the sun is up roughly half the loop, then a moon rises for the
  // other half, while the battery charges during the day and drains
  // during the night.
  const CYCLE = "16s";
  return (
    <div className="reveal-scale relative w-full max-w-[520px]">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-2) 0%, var(--bg-2) 70%, var(--bg-3) 100%)",
        }}
      >
        {/* Stars (faint, only visible at night via window-glow timing) */}
        <Stars />

        {/* Sun arc */}
        <div
          className="absolute"
          style={{
            top: "0%",
            left: "0%",
            width: "20%",
            aspectRatio: "1 / 1",
            animation: `simpelSunArc ${CYCLE} ease-in-out infinite`,
            transformOrigin: "center",
          }}
          aria-hidden
        >
          <Sun />
        </div>

        {/* Moon */}
        <div
          className="absolute"
          style={{
            top: "0%",
            left: "0%",
            width: "12%",
            aspectRatio: "1 / 1",
            animation: `simpelMoonRise ${CYCLE} ease-in-out infinite`,
          }}
          aria-hidden
        >
          <Moon />
        </div>

        {/* House SVG fills the bottom 65% */}
        <svg
          viewBox="0 0 500 400"
          className="absolute inset-x-0 bottom-0 h-auto w-full"
          aria-hidden
        >
          <defs>
            {/* Subtle roof gradient for depth */}
            <linearGradient id="roof-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-lystr-tomato)" />
              <stop offset="100%" stopColor="var(--color-lystr-tomato-deep)" />
            </linearGradient>
            <linearGradient id="wall-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--bg-1)" />
              <stop offset="100%" stopColor="var(--bg-3)" />
            </linearGradient>

            {/* Energy flow path: roof apex → battery */}
            <path
              id="flow-roof-to-batt"
              d="M 250 130 Q 310 200 400 280"
            />
            {/* Energy flow path: battery → house body */}
            <path
              id="flow-batt-to-house"
              d="M 380 280 Q 280 280 200 270"
            />
          </defs>

          {/* Ground line + tiny grass tufts */}
          <line x1="0" y1="370" x2="500" y2="370" stroke="var(--fg-3)" strokeWidth="2" opacity="0.5" />
          <path d="M 30 370 q 4 -8 8 0 M 60 370 q 4 -10 8 0 M 95 370 q 4 -8 8 0 M 460 370 q 4 -10 8 0 M 480 370 q 4 -8 8 0" stroke="var(--fg-3)" strokeWidth="1.5" fill="none" opacity="0.5"/>

          {/* Tree, left of house */}
          <ellipse cx="50" cy="320" rx="28" ry="32" fill="var(--color-lystr-green-deep)" opacity="0.85" />
          <rect x="46" y="345" width="8" height="25" fill="var(--fg-1)" />

          {/* House body */}
          <rect x="120" y="200" width="200" height="170" fill="url(#wall-grad)" stroke="var(--fg-1)" strokeWidth="3" rx="2" />

          {/* Roof — solar panels */}
          <polygon
            points="100,200 220,90 340,200"
            fill="url(#roof-grad)"
            stroke="var(--fg-1)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Panel grid */}
          <line x1="135" y1="180" x2="305" y2="180" stroke="var(--accent-fg)" strokeWidth="1.5" opacity="0.45" />
          <line x1="160" y1="155" x2="280" y2="155" stroke="var(--accent-fg)" strokeWidth="1.5" opacity="0.45" />
          <line x1="185" y1="130" x2="255" y2="130" stroke="var(--accent-fg)" strokeWidth="1.5" opacity="0.45" />
          <line x1="220" y1="90" x2="220" y2="200" stroke="var(--accent-fg)" strokeWidth="1.5" opacity="0.45" />

          {/* Chimney */}
          <rect x="280" y="115" width="22" height="42" fill="var(--fg-1)" />
          <rect x="276" y="110" width="30" height="10" fill="var(--fg-1)" />

          {/* Door */}
          <rect x="205" y="290" width="40" height="80" fill="var(--fg-1)" rx="2" />
          <circle cx="237" cy="332" r="2" fill="var(--accent-fg)" />

          {/* Windows — glow at night */}
          <rect x="135" y="240" width="50" height="50" fill="var(--bg-2)" stroke="var(--fg-1)" strokeWidth="2" />
          <rect
            x="135" y="240" width="50" height="50"
            fill="var(--color-lystr-tomato)"
            style={{
              animation: `simpelWindowGlow ${CYCLE} ease-in-out infinite`,
            }}
          />
          <line x1="160" y1="240" x2="160" y2="290" stroke="var(--fg-1)" strokeWidth="2" />
          <line x1="135" y1="265" x2="185" y2="265" stroke="var(--fg-1)" strokeWidth="2" />

          <rect x="265" y="240" width="50" height="50" fill="var(--bg-2)" stroke="var(--fg-1)" strokeWidth="2" />
          <rect
            x="265" y="240" width="50" height="50"
            fill="var(--color-lystr-tomato)"
            style={{
              animation: `simpelWindowGlow ${CYCLE} ease-in-out infinite`,
            }}
          />
          <line x1="290" y1="240" x2="290" y2="290" stroke="var(--fg-1)" strokeWidth="2" />
          <line x1="265" y1="265" x2="315" y2="265" stroke="var(--fg-1)" strokeWidth="2" />

          {/* Battery — to the right of the house */}
          <Battery cycle={CYCLE} />

          {/* Energy flow dots — sun → battery during day */}
          <circle r="4" fill="var(--color-lystr-tomato)"
            style={{
              offsetPath: "path('M 250 130 Q 310 200 380 280')",
              animation: `simpelEnergyDot ${CYCLE} linear infinite`,
              animationDelay: "0s",
            }}
          />
          <circle r="4" fill="var(--color-lystr-tomato)"
            style={{
              offsetPath: "path('M 250 130 Q 310 200 380 280')",
              animation: `simpelEnergyDot ${CYCLE} linear infinite`,
              animationDelay: "-2s",
            }}
          />
          <circle r="4" fill="var(--color-lystr-tomato)"
            style={{
              offsetPath: "path('M 250 130 Q 310 200 380 280')",
              animation: `simpelEnergyDot ${CYCLE} linear infinite`,
              animationDelay: "-4s",
            }}
          />
        </svg>
      </div>

      {/* Caption — small, below */}
      <div className="mt-4 flex items-center justify-between gap-4 text-[12px] font-mono uppercase tracking-[0.14em]"
        style={{ color: "var(--fg-3)" }}
      >
        <span>☀ Dag · solen laddar</span>
        <span>☾ Natt · batteriet driver</span>
      </div>
    </div>
  );
}

function Sun() {
  // Larger sun + ambient ring for sunny feel.
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="22" fill="var(--color-lystr-tomato)" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="var(--color-lystr-tomato)" strokeWidth="2" opacity="0.35" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="14"
          x2="50"
          y2="2"
          stroke="var(--color-lystr-tomato)"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Crescent: full circle minus offset circle */}
      <defs>
        <mask id="moon-mask">
          <rect width="100" height="100" fill="white" />
          <circle cx="62" cy="42" r="30" fill="black" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="32" fill="#e7e5e4" mask="url(#moon-mask)" />
    </svg>
  );
}

function Stars() {
  // Faint stars that "appear" only when the rest of the scene reads
  // night-ish. Pure decoration.
  const seeds = [
    { x: 8, y: 12, s: 1 },
    { x: 22, y: 8, s: 1.5 },
    { x: 36, y: 18, s: 1 },
    { x: 78, y: 24, s: 1.2 },
    { x: 92, y: 10, s: 1 },
    { x: 64, y: 14, s: 1.4 },
  ];
  return (
    <>
      {seeds.map((p, i) => (
        <span
          key={i}
          className="absolute font-mono"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: 8 * p.s,
            color: "var(--fg-3)",
            opacity: 0,
            animation: `simpelMoonRise 16s ease-in-out infinite`,
            animationDelay: `${0.1 * i}s`,
          }}
          aria-hidden
        >
          ✦
        </span>
      ))}
    </>
  );
}

function Battery({ cycle }: { cycle: string }) {
  // Battery on the right of the house, charges/drains in sync with sun.
  return (
    <g>
      {/* Battery shell */}
      <rect x="365" y="220" width="60" height="100" rx="6" fill="var(--bg-1)" stroke="var(--fg-1)" strokeWidth="3" />
      {/* Battery cap */}
      <rect x="383" y="212" width="24" height="10" rx="2" fill="var(--fg-1)" />
      {/* Battery fill (animates) */}
      <rect
        x="370"
        y="225"
        width="50"
        rx="3"
        fill="var(--color-lystr-tomato)"
        style={{
          // Animate height (and thus visible portion) by changing y too
          // via SMIL-free approach: we'll animate height alone and rely
          // on the bottom anchor by recomputing y in keyframes.
          transformBox: "fill-box",
          transformOrigin: "bottom",
          height: "60%",
          y: "260", // initial y; CSS keyframe will override via height %
          animation: `simpelBatteryCharge ${cycle} ease-in-out infinite`,
        }}
      />
      {/* Battery label */}
      <text
        x="395"
        y="280"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fontWeight="700"
        fill="var(--accent-fg)"
        style={{ letterSpacing: "0.06em" }}
      >
        BATTERI
      </text>
    </g>
  );
}

function BigNumberEight() {
  return (
    <div className="grow flex items-center justify-center">
      <p
        className="m-0 font-display font-bold"
        style={{
          fontSize: "clamp(180px, 28vw, 360px)",
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          color: "var(--color-lystr-tomato)",
          textShadow: "0 8px 32px rgba(154, 53, 48, 0.15)",
        }}
      >
        8
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
