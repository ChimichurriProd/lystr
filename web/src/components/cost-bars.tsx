"use client";

import { useId, useMemo, useState } from "react";
import { defaultCalculatorSettings } from "@/content/calculator-defaults";

/* ============================================================
   Cost bars — three-phase visualisation showing where each
   krona of the customer's bill goes today, during the Lystr
   contract, and after the contract is paid off.

   Embedded inside the "Så fungerar det" section — extends the
   3-step explainer with concrete arithmetic.
   ============================================================ */

type Tone =
  | "muted"
  | "mid"
  | "strong"
  | "ink"
  | "tomato"
  | "saving"
  | "service";

const TONE_BG: Record<Tone, string> = {
  muted: "var(--color-lystr-line)",
  mid: "var(--color-lystr-gray)",
  strong: "var(--color-lystr-slate)",
  ink: "var(--color-lystr-black)",
  tomato: "var(--color-lystr-tomato)",
  saving: "var(--color-lystr-green)",
  service: "var(--color-lystr-muted)",
};

function formatKr(n: number) {
  return `${new Intl.NumberFormat("sv-SE").format(Math.round(n))} kr`;
}

const settings = defaultCalculatorSettings;

const todaySegments = settings.phases.todaySegments
  .slice(0, 3)
  .map((s, i) => ({
    ...s,
    tone: (["muted", "mid", "strong"] as const)[i],
  }));

const contractSegments = settings.phases.contractSegments
  .slice(0, 3)
  .map((s, i) => ({
    ...s,
    tone: (["ink", "service", "mid"] as const)[i],
  }));

export function CostBars() {
  const inputId = useId();
  const [bill, setBill] = useState(2500);

  const postFill = settings.postContractRatio;
  const postTotal = bill * postFill;
  const postSaving = bill - postTotal;
  const postPctSaving = Math.round((1 - postFill) * 100);

  // The contract phase keeps the same total — but most of it goes to
  // amortisation. We surface that as the "headline" claim, not a saving.
  const ownershipPct = useMemo(
    () => Math.round(contractSegments[0].share * 100),
    [],
  );

  return (
    <div className="mt-12 md:mt-16">
      {/* Bill input row */}
      <div className="mb-8 flex flex-wrap items-center gap-3 md:mb-10">
        <label
          htmlFor={inputId}
          className="text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          Din elräkning idag
        </label>
        <div
          className="flex items-center rounded-full border bg-white"
          style={{ borderColor: "var(--border)" }}
        >
          <input
            id={inputId}
            inputMode="numeric"
            value={bill || ""}
            onChange={(e) => {
              const n = Number(e.target.value.replace(/\D/g, ""));
              setBill(n || 0);
            }}
            className="w-24 bg-transparent px-4 py-2 text-lg font-semibold tracking-tight focus:outline-none"
            style={{ color: "var(--fg-1)" }}
          />
          <span
            className="pr-4 text-sm"
            style={{ color: "var(--fg-3)" }}
          >
            kr/mån
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {settings.billPresets.map((n) => {
            const selected = bill === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setBill(n)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: selected ? "var(--color-lystr-black)" : "white",
                  color: selected ? "#fff" : "var(--fg-2)",
                  borderColor: selected ? "transparent" : "var(--border)",
                }}
              >
                {n.toLocaleString("sv-SE")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Three phase cards */}
      <div className="space-y-4 md:space-y-5">
        <PhaseCard
          label={settings.phases.todayLabel}
          total={formatKr(bill)}
          totalSuffix="/mån"
          segments={todaySegments}
          containerFill={1}
          bill={bill}
          caption={settings.phases.todayCaption}
        />
        <PhaseCard
          label={settings.phases.contractLabel}
          total={formatKr(bill)}
          totalSuffix="/mån"
          badgeTone="ink"
          badgeText={`${ownershipPct}% går till din egen anläggning`}
          segments={contractSegments}
          containerFill={1}
          bill={bill}
          caption={settings.phases.contractCaption}
          emphasise
        />
        <PhaseCard
          label={settings.phases.postLabel}
          total={formatKr(postTotal)}
          totalSuffix="/mån"
          oldTotal={formatKr(bill)}
          badgeTone="saving"
          badgeText={`−${postPctSaving}% lägre · sparar ${formatKr(postSaving)}/mån`}
          segments={[
            {
              key: "elgrid",
              label: "El från nätet",
              share: 1,
              tone: "saving" as const,
            },
          ]}
          containerFill={postFill}
          bill={bill}
          caption={settings.phases.postCaption}
        />
      </div>
    </div>
  );
}

function PhaseCard({
  label,
  total,
  totalSuffix,
  oldTotal,
  badgeTone,
  badgeText,
  segments,
  containerFill,
  bill,
  caption,
  emphasise,
}: {
  label: string;
  total: string;
  totalSuffix?: string;
  oldTotal?: string;
  badgeTone?: "ink" | "saving";
  badgeText?: string;
  segments: { key: string; label: string; share: number; tone: Tone }[];
  containerFill: number;
  bill: number;
  caption: string;
  emphasise?: boolean;
}) {
  return (
    <div
      className="rounded-2xl bg-white p-5 transition-colors md:p-6"
      style={{
        border: emphasise
          ? "2px solid var(--color-lystr-black)"
          : "1px solid var(--border)",
        boxShadow: emphasise ? "var(--shadow-card)" : "none",
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h4
            className="font-display text-base font-semibold md:text-lg"
            style={{ color: "var(--fg-1)" }}
          >
            {label}
          </h4>
          {badgeText && (
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{
                background:
                  badgeTone === "ink"
                    ? "var(--color-lystr-black)"
                    : "var(--saving-bg)",
                color:
                  badgeTone === "ink" ? "#fff" : "var(--saving-fg)",
              }}
            >
              {badgeText}
            </span>
          )}
        </div>
        <div className="text-right">
          {oldTotal && (
            <span
              className="mr-2 font-mono text-sm line-through"
              style={{ color: "var(--fg-3)" }}
            >
              {oldTotal}
            </span>
          )}
          <span
            className="font-display text-2xl font-semibold tracking-tight tabular-nums md:text-3xl"
            style={{ color: "var(--fg-1)" }}
          >
            {total}
          </span>
          {totalSuffix && (
            <span
              className="ml-1 text-sm"
              style={{ color: "var(--fg-3)" }}
            >
              {totalSuffix}
            </span>
          )}
        </div>
      </div>

      <div
        className="mt-4 flex h-12 overflow-hidden rounded-xl md:h-14"
        style={{ background: "var(--bg-2)" }}
      >
        {segments.map((s) => {
          const widthPct = s.share * containerFill * 100;
          return (
            <div
              key={s.key}
              className="transition-[flex-basis] duration-500 ease-[var(--ease-out)]"
              style={{
                flexBasis: `${widthPct}%`,
                background: TONE_BG[s.tone],
              }}
              aria-label={`${s.label}: ${Math.round(widthPct)}%`}
            />
          );
        })}
      </div>

      <ul
        className="m-0 mt-3.5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[13px]"
        style={{ color: "var(--fg-2)" }}
      >
        {segments.map((s) => {
          const value = bill * s.share * containerFill;
          return (
            <li key={s.key} className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: TONE_BG[s.tone] }}
              />
              <span>{s.label}</span>
              <strong
                className="font-mono font-semibold"
                style={{ color: "var(--fg-1)" }}
              >
                {formatKr(value)}
              </strong>
            </li>
          );
        })}
      </ul>

      <p
        className="m-0 mt-4 border-t pt-3 text-[13px] leading-[1.55]"
        style={{ color: "var(--fg-2)", borderColor: "var(--border)" }}
      >
        {caption}
      </p>
    </div>
  );
}
