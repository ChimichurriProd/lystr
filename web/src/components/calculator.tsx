"use client";

import { useMemo, useState } from "react";

/* ============================================================
   Calculator — the hero card.
   Three inputs (postnummer, monthly bill, housing form) →
   estimated new monthly cost + saving delta.

   The math is a teaser, not a quote. The CTA hands off to
   /uppskattning, which collects contact info via the existing
   lead form (web/src/app/actions/lead.ts). After submission a
   Lystr representative calls the customer to walk through the
   real numbers and next steps — there is no "binding offer"
   produced by the website itself.
   ============================================================ */

const PRESETS = [1500, 2500, 3500, 5000];

const HOUSING = [
  { id: "villa", label: "Villa", factor: 1.0 },
  { id: "radhus", label: "Radhus", factor: 0.85 },
  { id: "lagenhet", label: "Lägenhet", factor: 0.5 },
] as const;

type HousingId = (typeof HOUSING)[number]["id"];

function fmtKr(n: number) {
  return `${new Intl.NumberFormat("sv-SE").format(Math.round(n))} kr`;
}

export function Calculator() {
  const [zip, setZip] = useState("");
  const [bill, setBill] = useState(2500);
  const [housing, setHousing] = useState<HousingId>("villa");

  const result = useMemo(() => {
    const factor = HOUSING.find((h) => h.id === housing)!.factor;
    const newMonthly = Math.round(bill * 0.25 * factor + bill * 0.05);
    const saving = bill - newMonthly;
    return {
      newMonthly,
      saving,
      yearTotal: saving * 12,
      eightYearTotal: saving * 12 * 8,
      pct: Math.round((saving / bill) * 100),
    };
  }, [bill, housing]);

  return (
    <div
      id="kalkyl"
      className="grid grid-cols-1 overflow-hidden border md:grid-cols-[1.1fr_1fr]"
      style={{
        background: "var(--color-lystr-paper)",
        borderColor: "var(--border)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-floating)",
      }}
    >
      {/* ---------- Form (left) ---------- */}
      <div
        className="@container border-b p-[22px] md:border-b-0 md:border-r md:p-8"
        style={{ borderColor: "var(--border)" }}
      >
        <Step n="01">
          <label
            className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--eyebrow-color)" }}
            htmlFor="calc-zip"
          >
            Postnummer
          </label>
          <input
            id="calc-zip"
            type="text"
            inputMode="numeric"
            placeholder="123 45"
            maxLength={6}
            value={zip}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d ]/g, "").slice(0, 6);
              setZip(v);
            }}
            className="w-full border bg-white px-3.5 py-3 text-[15px] text-[var(--fg-1)] outline-none transition-colors duration-200 focus:border-lystr-black"
            style={{
              borderColor: "var(--border)",
              borderRadius: "var(--radius-md)",
            }}
          />
        </Step>

        <Step n="02">
          <label
            className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--eyebrow-color)" }}
          >
            Din nuvarande elräkning
          </label>
          <div className="mb-3 grid grid-cols-2 gap-1.5">
            {PRESETS.map((p) => {
              const selected = bill === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setBill(p)}
                  className="rounded-full border px-3 py-1.5 text-[13px] font-medium tabular-nums transition-all duration-100"
                  style={{
                    background: selected
                      ? "var(--color-lystr-black)"
                      : "var(--bg-1)",
                    color: selected ? "#fff" : "var(--fg-2)",
                    borderColor: selected ? "transparent" : "var(--border)",
                  }}
                >
                  {fmtKr(p)}
                </button>
              );
            })}
          </div>
          <input
            type="range"
            min={500}
            max={8000}
            step={100}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="calc-range mb-1 mt-2"
            aria-label="Månadskostnad"
          />
          <div
            className="flex items-baseline justify-between font-mono text-[11px]"
            style={{ color: "var(--fg-3)" }}
          >
            <span className="whitespace-nowrap">500 kr</span>
            <span
              className="text-[12px] font-semibold tabular-nums whitespace-nowrap"
              style={{ color: "var(--fg-1)" }}
            >
              {fmtKr(bill)}/mån
            </span>
            <span className="whitespace-nowrap">8 000 kr</span>
          </div>
        </Step>

        <Step n="03" last>
          <label
            className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--eyebrow-color)" }}
          >
            Boendeform
          </label>
          <div className="grid grid-cols-1 gap-1.5 @sm:grid-cols-3">
            {HOUSING.map((h) => {
              const selected = housing === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHousing(h.id)}
                  className="border px-3 py-2.5 text-[13px] font-medium transition-all duration-100"
                  style={{
                    background: selected
                      ? "var(--color-lystr-black)"
                      : "var(--bg-1)",
                    color: selected ? "#fff" : "var(--fg-2)",
                    borderColor: selected ? "transparent" : "var(--border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {h.label}
                </button>
              );
            })}
          </div>
        </Step>
      </div>

      {/* ---------- Result (right) ---------- */}
      <div
        className="flex flex-col p-[22px] md:p-8"
        style={{ background: "var(--color-lystr-cream)" }}
      >
        <div
          className="mb-3.5 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--eyebrow-color)" }}
        >
          Din nya elräkning, med Lystr
        </div>

        <div className="mb-3.5 flex flex-col items-start gap-1">
          <span
            className="font-mono text-sm font-medium line-through"
            style={{ color: "var(--fg-3)" }}
          >
            {fmtKr(bill)}/mån
          </span>
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span
              className="font-display font-semibold leading-none tracking-[-0.025em] text-lystr-tomato tabular-nums"
              style={{ fontSize: "clamp(36px, 4.4vw, 52px)" }}
            >
              {fmtKr(result.newMonthly)}
            </span>
            <span
              className="text-sm whitespace-nowrap"
              style={{ color: "var(--fg-3)" }}
            >
              /mån
            </span>
          </span>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <span
            className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "var(--saving-bg)",
              color: "var(--saving-fg)",
            }}
          >
            −{result.pct}% lägre
          </span>
          <span
            className="text-sm leading-[1.5]"
            style={{ color: "var(--fg-2)" }}
          >
            Du sparar{" "}
            <strong
              className="font-mono font-semibold"
              style={{ color: "var(--fg-1)" }}
            >
              {fmtKr(result.yearTotal)}
            </strong>{" "}
            per år. På 8 år:{" "}
            <strong
              className="font-mono font-semibold"
              style={{ color: "var(--fg-1)" }}
            >
              {fmtKr(result.eightYearTotal)}
            </strong>
            .
          </span>
        </div>

        <div className="mt-auto mb-4 flex flex-wrap items-center gap-4">
          <a
            href={`/uppskattning?bill=${bill}&housing=${housing}${zip ? `&postnummer=${encodeURIComponent(zip)}` : ""}`}
            className="inline-flex items-center gap-2 rounded-full bg-lystr-tomato px-[22px] py-3.5 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-lystr-tomato-hover"
          >
            Bli uppringd av oss →
          </a>
          <a
            href="#hur"
            className="border-b pb-px text-[13px] no-underline transition-colors hover:text-[var(--fg-1)]"
            style={{ color: "var(--link-color)", borderColor: "currentColor" }}
          >
            Så räknar vi
          </a>
        </div>

        <p
          className="m-0 border-t pt-3.5 text-[11px] leading-[1.5]"
          style={{ color: "var(--fg-3)", borderColor: "var(--border)" }}
        >
          Uppskattning baserad på din nuvarande elräkning, postnummer och
          boendeform. Slutpriset beror på taket, panelvalet och ditt avtal — vi
          går igenom allt på första mötet.
        </p>
      </div>

    </div>
  );
}

function Step({
  n,
  last = false,
  children,
}: {
  n: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex gap-3 md:gap-4 ${last ? "" : "mb-[18px] md:mb-6"}`}>
      <div
        className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold"
        style={{
          background: "var(--color-lystr-cream)",
          color: "var(--fg-2)",
        }}
      >
        {n}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
