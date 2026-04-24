"use client";

import { useId, useState } from "react";
import type { CalculatorSettings } from "../../sanity/lib/types";

type Segment = {
  key: string;
  label: string;
  share: number;
  tone: "muted" | "mid" | "strong" | "own" | "saving" | "service";
};

function formatKr(n: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  })
    .format(n)
    .replace(/\s/g, " ");
}

const TONE_BG: Record<Segment["tone"], string> = {
  muted: "bg-lystr-line",
  mid: "bg-lystr-gray",
  strong: "bg-lystr-slate",
  own: "bg-lystr-black",
  saving: "bg-lystr-leaf",
  service: "bg-lystr-muted",
};

export function CostAnatomy({ settings }: { settings: CalculatorSettings }) {
  const [bill, setBill] = useState(2500);
  const inputId = useId();

  const today: Segment[] = settings.phases.todaySegments
    .slice(0, 3)
    .map((s, i) => ({ ...s, tone: (["muted", "mid", "strong"] as const)[i] }));

  const contract: Segment[] = settings.phases.contractSegments
    .slice(0, 3)
    .map((s, i) => ({ ...s, tone: (["own", "service", "mid"] as const)[i] }));

  const postFill = settings.postContractRatio;
  const postTotal = bill * postFill;
  const post: Segment[] = [
    { key: "elgrid-small", label: "El från nätet", share: 1, tone: "saving" },
  ];

  return (
    <section id="sa-funkar" className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
            Så fungerar det
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-5xl">
            Samma månadskostnad. Helt annat värde.
          </h2>
          <p className="mt-4 text-base text-lystr-slate md:text-lg">
            Med Lystr betalar du ungefär samma månadsbelopp som idag. Men
            pengarna bygger din egen energianläggning istället för att
            försvinna till kraftbolaget. Ändra beloppet nedan och se hur det
            ser ut för dig.
          </p>
        </div>

        {/* Bill input */}
        <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
          <label htmlFor={inputId} className="sr-only">
            Din nuvarande elkostnad
          </label>
          <span className="text-sm font-medium uppercase tracking-wider text-lystr-muted">
            Din elräkning idag
          </span>
          <div className="flex items-center rounded-full border border-lystr-line bg-white">
            <input
              id={inputId}
              inputMode="numeric"
              value={bill || ""}
              onChange={(e) => {
                const n = Number(e.target.value.replace(/\D/g, ""));
                setBill(n || 0);
              }}
              className="w-24 bg-transparent px-4 py-2 text-lg font-semibold tracking-tight focus:outline-none"
            />
            <span className="pr-4 text-sm text-lystr-muted">kr/mån</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {settings.billPresets.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setBill(n)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  bill === n
                    ? "border-lystr-black bg-lystr-black text-white"
                    : "border-lystr-line bg-white text-lystr-slate hover:border-lystr-black"
                }`}
              >
                {n.toLocaleString("sv-SE")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-10 md:mt-14">
          <PhaseBar
            label={settings.phases.todayLabel}
            total={formatKr(bill)}
            totalSuffix="/mån"
            segments={today}
            containerFill={1}
            bill={bill}
            caption={settings.phases.todayCaption}
            destination={settings.phases.todayDestination}
          />
          <PhaseBar
            label={settings.phases.contractLabel}
            total={formatKr(bill)}
            totalSuffix="/mån"
            badge="Samma totalkostnad"
            segments={contract}
            containerFill={1}
            bill={bill}
            caption={settings.phases.contractCaption}
            destination={settings.phases.contractDestination}
            emphasise
          />
          <PhaseBar
            label={settings.phases.postLabel}
            total={formatKr(postTotal)}
            totalSuffix="/mån"
            badge={`${Math.round((1 - postFill) * 100)}% lägre`}
            segments={post}
            containerFill={postFill}
            bill={bill}
            caption={settings.phases.postCaption}
            destination={settings.phases.postDestination}
          />
        </div>

        <div className="mt-12 rounded-3xl border border-lystr-line bg-white p-6 md:mt-16 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold text-lystr-black md:text-2xl">
                {settings.insightHeadline}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-lystr-slate">
                {settings.insightBody}
              </p>
            </div>
            <a
              href="/#kalkylator"
              className="inline-flex h-12 shrink-0 items-center rounded-full bg-lystr-red px-7 text-base font-semibold text-white transition-colors hover:bg-lystr-red-hover"
            >
              Räkna ut din besparing →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseBar({
  label,
  total,
  totalSuffix,
  badge,
  segments,
  containerFill,
  bill,
  caption,
  destination,
  emphasise,
}: {
  label: string;
  total: string;
  totalSuffix?: string;
  badge?: string;
  segments: Segment[];
  containerFill: number;
  bill: number;
  caption: string;
  destination: string;
  emphasise?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 transition-colors md:p-7 ${
        emphasise
          ? "bg-white ring-2 ring-lystr-black/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]"
          : "bg-white"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-lystr-black md:text-lg">
            {label}
          </h3>
          {badge && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                emphasise
                  ? "bg-lystr-black text-white"
                  : "bg-lystr-leaf text-lystr-black"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-2xl font-semibold tracking-tight text-lystr-black md:text-3xl">
            {total}
          </span>
          {totalSuffix && (
            <span className="ml-1 text-sm text-lystr-muted">{totalSuffix}</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex h-14 overflow-hidden rounded-2xl bg-lystr-cream">
        {segments.map((s) => {
          const widthPct = s.share * containerFill * 100;
          return (
            <div
              key={s.key}
              className={`${TONE_BG[s.tone]} transition-[flex-basis] duration-500 ease-out`}
              style={{ flexBasis: `${widthPct}%` }}
              aria-label={`${s.label}: ${Math.round(widthPct)}%`}
            />
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {segments.map((s) => {
          const value = bill * s.share * containerFill;
          return (
            <li key={s.key} className="flex items-center gap-2">
              <span
                aria-hidden
                className={`h-3 w-3 shrink-0 rounded-full ${TONE_BG[s.tone]}`}
              />
              <span className="text-lystr-slate">{s.label}</span>
              <span className="font-semibold text-lystr-black">
                {formatKr(value)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 grid gap-2 border-t border-lystr-line pt-4 md:grid-cols-[1fr_auto]">
        <p className="text-sm leading-relaxed text-lystr-slate">{caption}</p>
        <p className="text-xs uppercase tracking-wider text-lystr-muted">
          {destination}
        </p>
      </div>
    </div>
  );
}
