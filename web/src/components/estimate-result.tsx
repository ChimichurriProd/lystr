"use client";

import { useActionState } from "react";
import Link from "next/link";
import { calculator, leadForm } from "@/content/homepage";
import { submitLead, type LeadResult } from "@/app/actions/lead";

const POST_CONTRACT_RATIO = 0.25; // 75% reduction after contract
const CONTRACT_YEARS = 8;
const POST_CONTRACT_YEARS = 30;
const HOUSE_VALUE_INCREASE = 200_000;

function formatKr(n: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  })
    .format(n)
    .replace(/\s/g, " ");
}

export function EstimateResult({
  postnummer,
  monthlyBill,
  housing,
}: {
  postnummer: string;
  monthlyBill: number;
  housing: string;
}) {
  const postContractMonthly = monthlyBill * POST_CONTRACT_RATIO;
  const monthlyDelta = monthlyBill - postContractMonthly;
  const lifetimeSavings = monthlyDelta * 12 * POST_CONTRACT_YEARS;
  const totalBenefit = lifetimeSavings + HOUSE_VALUE_INCREASE;
  const costOfYearDelay = monthlyDelta * 12;
  const postPct = (postContractMonthly / monthlyBill) * 100;

  const [leadState, leadAction] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null,
  );

  if (leadState?.ok) {
    return <SuccessState />;
  }

  return (
    <>
      {/* Top — estimate headline */}
      <section className="bg-lystr-black text-white">
        <div className="mx-auto max-w-(--container-narrow) px-6 pt-12 pb-16 md:px-10 md:pt-16 md:pb-20">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white"
          >
            ← Tillbaka till start
          </Link>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.12em] text-lystr-red">
            {calculator.result.heading}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {formatKr(totalBenefit)}
          </h1>
          <p className="mt-3 text-sm italic text-white/60">
            Det räcker till en ny bil. Eller tio semestrar. Eller amortering på huslånet.
          </p>
          <p className="mt-5 max-w-2xl text-lg text-white/75 md:text-xl">
            Total uppskattad vinst över 30 år. Sänkta elkostnader efter avtalstid
            plus värdehöjning på ditt hus.
          </p>
          <p className="mt-4 text-sm text-white/50">
            Baserat på {formatKr(monthlyBill)}/mån i dagens elkostnad,{" "}
            {housingLabel(housing)} i {postnummer}.
          </p>
        </div>
      </section>

      {/* Middle — bar comparison + stat cards */}
      <section className="bg-lystr-cream">
        <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
            {/* Bar chart */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-lystr-black md:text-3xl">
                Så ser din elkostnad ut med Lystr
              </h2>
              <div className="mt-8 space-y-5">
                <BarRow
                  label={calculator.result.currentLabel}
                  amountLabel={`${formatKr(monthlyBill)} / mån`}
                  widthPct={100}
                  tone="muted"
                />
                <BarRow
                  label={calculator.result.contractLabel}
                  amountLabel={`${formatKr(monthlyBill)} / mån`}
                  widthPct={100}
                  tone="black"
                  caption="Matchar din nuvarande kostnad, men nu producerar du din egen el."
                />
                <BarRow
                  label={calculator.result.postContractLabel}
                  amountLabel={`${formatKr(postContractMonthly)} / mån`}
                  widthPct={postPct}
                  tone="red"
                  caption={`~${100 - Math.round(postPct)}% lägre kostnad när avtalet är betalt.`}
                />
              </div>
            </div>

            {/* Stat cards */}
            <div className="space-y-3">
              <StatCard
                label={calculator.result.lifetimeSavings}
                value={formatKr(lifetimeSavings)}
                hint="Sänkt elkostnad × 30 år efter avtalstid."
              />
              <StatCard
                label={calculator.result.houseValue}
                value={`+${formatKr(HOUSE_VALUE_INCREASE)}`}
                hint="Genomsnittlig värdeökning för villa med solceller och batteri."
              />
              <StatCard
                label="Att vänta ett år kostar"
                value={formatKr(costOfYearDelay)}
                hint="Varje år du väntar är ett år längre tills du når post-avtals-besparingarna."
                tone="accent"
              />
            </div>
          </div>

          {/* Disclaimer — explicit, visible */}
          <div className="mt-10 rounded-2xl border border-lystr-line bg-white p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div
                aria-hidden
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lystr-leaf text-xs font-semibold text-lystr-black"
              >
                !
              </div>
              <div className="text-sm text-lystr-slate">
                <p className="font-semibold text-lystr-black">
                  Preliminär uppskattning
                </p>
                <p className="mt-1">
                  Siffrorna på denna sida är preliminära och beräknade utifrån
                  genomsnittliga värden. Innan ett avtal tecknas räknar Lystrs
                  team fram en exakt kalkyl baserad på ditt tak, din
                  förbrukningsprofil och aktuella priser.
                </p>
                <p className="mt-1 text-xs text-lystr-muted">
                  Räknemodellen uppdateras löpande av Lystr-teamet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom — lead form */}
      <section className="bg-white">
        <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-lystr-black md:text-3xl">
                {leadForm.title}
              </h2>
              <p className="mt-3 text-base text-lystr-slate">
                {leadForm.subtitle}
              </p>
              <a
                href="https://www.calendly.com/mathias-soderstrom-lystr"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lystr-black underline-offset-4 hover:underline"
              >
                Eller boka ett möte direkt
                <span aria-hidden>→</span>
              </a>
            </div>

            <form
              action={leadAction}
              className="rounded-3xl border border-lystr-line bg-lystr-cream p-6 md:p-8"
            >
              {/* Hidden context — carry calculator values */}
              <input type="hidden" name="postnummer" value={postnummer} />
              <input
                type="hidden"
                name="monthlyBill"
                value={String(monthlyBill)}
              />
              <input type="hidden" name="housing" value={housing} />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label={leadForm.fields.name}
                  name="name"
                  required
                  autoComplete="name"
                />
                <Field
                  label={leadForm.fields.email}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  label={leadForm.fields.phone}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="sm:col-span-2"
                />
              </div>

              {leadState && !leadState.ok && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg bg-lystr-red/10 px-4 py-3 text-sm text-lystr-red-hover"
                >
                  {leadState.error}
                </p>
              )}

              <p className="mt-5 text-xs text-lystr-muted">
                {leadForm.consent}
              </p>

              <button
                type="submit"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-lystr-red px-7 text-base font-semibold text-white transition-colors hover:bg-lystr-red-hover sm:w-auto"
              >
                {leadForm.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function housingLabel(v: string): string {
  switch (v) {
    case "villa":
      return "villa";
    case "radhus":
      return "radhus";
    case "fritidshus":
      return "fritidshus";
    default:
      return v;
  }
}

function BarRow({
  label,
  amountLabel,
  widthPct,
  tone,
  caption,
}: {
  label: string;
  amountLabel: string;
  widthPct: number;
  tone: "muted" | "black" | "red";
  caption?: string;
}) {
  const bg =
    tone === "muted"
      ? "bg-lystr-line"
      : tone === "black"
      ? "bg-lystr-black"
      : "bg-lystr-red";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-lystr-slate">{label}</span>
        <span className="font-semibold text-lystr-black">{amountLabel}</span>
      </div>
      <div className="mt-2 h-4 overflow-hidden rounded-full bg-white">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${bg}`}
          style={{ width: `${Math.max(widthPct, 6)}%` }}
        />
      </div>
      {caption && <p className="mt-1.5 text-xs text-lystr-muted">{caption}</p>}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "accent";
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        tone === "accent"
          ? "border-lystr-red/30 bg-lystr-red/5"
          : "border-lystr-line bg-white"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-semibold tracking-tight ${
          tone === "accent" ? "text-lystr-red-hover" : "text-lystr-black"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-lystr-slate">{hint}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-lystr-slate">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 block w-full rounded-xl border border-lystr-line bg-white px-4 py-3 text-base focus:border-lystr-black focus:outline-none"
      />
    </label>
  );
}

function SuccessState() {
  return (
    <section className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 text-center md:px-10 md:py-28">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-lystr-leaf">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-lystr-black"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-lystr-black md:text-4xl">
          {leadForm.success.title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-lystr-slate">
          {leadForm.success.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://www.calendly.com/mathias-soderstrom-lystr"
            className="inline-flex h-12 items-center rounded-full bg-lystr-black px-7 text-base font-medium text-white hover:bg-lystr-charcoal"
          >
            Boka möte direkt
          </a>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full border border-lystr-line bg-white px-7 text-base font-medium text-lystr-black hover:border-lystr-black"
          >
            ← Till startsidan
          </Link>
        </div>
      </div>
    </section>
  );
}
