"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { leadForm } from "@/content/homepage";
import {
  billTier,
  billTierLabel,
  estimateAnnualKwh,
  heatingNote,
  inferHeating,
} from "@/content/bill-insights";
import { formatPostcode, lookupPostalArea } from "@/content/postal-codes";
import type { CalculatorSettings } from "../../sanity/lib/types";
import { submitLead, type LeadResult } from "@/app/actions/lead";
import { NextStepsTimeline } from "./next-steps-timeline";

function formatKr(n: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  })
    .format(n)
    .replace(/\s/g, " ");
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

/** Sentence-start with the right indefinite article for the noun. */
function housingPhrase(v: string): string {
  switch (v) {
    case "villa":
      return "En villa";
    case "radhus":
      return "Ett radhus";
    case "fritidshus":
      return "Ett fritidshus";
    case "lagenhet":
      return "En lägenhet";
    default:
      return "Ett hus";
  }
}

export function EstimateResult({
  postnummer,
  monthlyBill,
  housing,
  settings,
}: {
  postnummer: string;
  monthlyBill: number;
  housing: string;
  settings: CalculatorSettings;
}) {
  const postContractMonthly = monthlyBill * settings.postContractRatio;
  const monthlyDelta = monthlyBill - postContractMonthly;
  const lifetimeSavings = monthlyDelta * 12 * settings.postContractYears;
  const totalBenefit = lifetimeSavings + settings.houseValueIncrease;
  const costOfYearDelay = monthlyDelta * 12;
  const postPct = (postContractMonthly / monthlyBill) * 100;

  // Personalisation derived from the three calculator inputs.
  const area = lookupPostalArea(postnummer);
  const annualKwh = estimateAnnualKwh(monthlyBill);
  const heating = inferHeating(monthlyBill);
  const tierNote = billTierLabel(billTier(monthlyBill));
  const heatingHint = heatingNote(heating);
  const postcodeFmt = postnummer ? formatPostcode(postnummer) : "";
  const locationPhrase = area.kommun
    ? `${area.city} (${postcodeFmt} ${area.kommun})`
    : area.city;

  const [leadState, leadAction] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null,
  );

  // Pre-fill the postnummer field if the user supplied one in the calculator.
  const [postcode, setPostcode] = useState(postnummer);

  if (leadState?.ok) {
    return <SuccessState />;
  }

  return (
    <>
      {/* ---------- Headline / hero ---------- */}
      <section className="bg-lystr-black text-white">
        <div className="mx-auto max-w-(--container-marketing) px-[22px] pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          <Link
            href="/"
            className="text-sm no-underline transition-colors hover:text-white"
            style={{ color: "var(--on-ink-3)" }}
          >
            ← Tillbaka till start
          </Link>

          <p
            className="mt-8 text-[13px] font-medium uppercase tracking-[0.12em] text-lystr-tomato"
          >
            Din uppskattning är klar
          </p>

          <h1
            className="mt-3 font-display font-semibold leading-tight tracking-tight"
            style={{ fontSize: "clamp(40px, 5.2vw, 64px)" }}
          >
            {formatKr(totalBenefit)}
          </h1>
          <p
            className="mt-3 text-sm italic"
            style={{ color: "var(--on-ink-3)" }}
          >
            Det räcker till en ny bil. Eller tio semestrar. Eller amortering på
            huslånet.
          </p>
          <p
            className="mt-5 max-w-2xl text-lg md:text-xl"
            style={{ color: "var(--on-ink-2)" }}
          >
            Total uppskattad vinst över {settings.postContractYears} år. Sänkta
            elkostnader efter avtalstid plus värdehöjning på ditt hus.
          </p>
          <p
            className="mt-6 max-w-2xl text-sm leading-relaxed md:text-base"
            style={{ color: "var(--on-ink-2)" }}
          >
            {housingPhrase(housing)} i {locationPhrase} som idag betalar{" "}
            <strong className="text-white">
              {formatKr(monthlyBill)}/mån
            </strong>{" "}
            för el använder grovt räknat{" "}
            <strong className="text-white">
              {new Intl.NumberFormat("sv-SE").format(annualKwh)} kWh/år
            </strong>{" "}
            och ligger i {tierNote}.
            {heatingHint ? ` ${heatingHint}` : ""}
          </p>
        </div>
      </section>

      {/* ---------- Phase bars ---------- */}
      <section style={{ background: "var(--bg-2)" }}>
        <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
            <div>
              <h2
                className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
                style={{ color: "var(--fg-1)" }}
              >
                Så ser din elkostnad ut med Lystr
              </h2>
              <div className="mt-8 space-y-5">
                <BarRow
                  label="Din nuvarande kostnad"
                  amountLabel={`${formatKr(monthlyBill)} / mån`}
                  widthPct={100}
                  tone="muted"
                />
                <BarRow
                  label={`Under avtalstiden (${settings.contractYears} år)`}
                  amountLabel={`${formatKr(monthlyBill)} / mån`}
                  widthPct={100}
                  tone="black"
                  caption="Matchar din nuvarande kostnad, men nu producerar du din egen el."
                />
                <BarRow
                  label="Efter avtalstiden"
                  amountLabel={`${formatKr(postContractMonthly)} / mån`}
                  widthPct={postPct}
                  tone="tomato"
                  caption={`~${100 - Math.round(postPct)}% lägre kostnad när avtalet är betalt.`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <StatCard
                label={`Total besparing över ${settings.postContractYears} år`}
                value={formatKr(lifetimeSavings)}
                hint={`Sänkt elkostnad × ${settings.postContractYears} år efter avtalstid.`}
              />
              <StatCard
                label="Värdehöjning på ditt hus"
                value={`+${formatKr(settings.houseValueIncrease)}`}
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

          <div
            className="mt-10 rounded-2xl border bg-white p-5 md:p-6"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-start gap-3">
              <div
                aria-hidden
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  background: "var(--saving-bg)",
                  color: "var(--saving-fg)",
                }}
              >
                !
              </div>
              <div className="text-sm" style={{ color: "var(--fg-2)" }}>
                <p
                  className="font-semibold"
                  style={{ color: "var(--fg-1)" }}
                >
                  {settings.disclaimerTitle}
                </p>
                <p className="mt-1">{settings.disclaimerBody}</p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--fg-3)" }}
                >
                  Räknemodellen uppdateras löpande av Lystr-teamet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Next-steps timeline ---------- */}
      <NextStepsTimeline />

      {/* ---------- Lead capture ---------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
            <div>
              <h2
                className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
                style={{ color: "var(--fg-1)" }}
              >
                {leadForm.title}
              </h2>
              <p
                className="mt-3 text-base leading-[1.55]"
                style={{ color: "var(--fg-2)" }}
              >
                {leadForm.subtitle}
              </p>
              <a
                href="https://www.calendly.com/mathias-soderstrom-lystr"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: "var(--fg-1)" }}
              >
                Eller boka ett möte direkt
                <span aria-hidden>→</span>
              </a>
            </div>

            <form
              action={leadAction}
              className="rounded-3xl border p-6 md:p-8"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-2)",
              }}
            >
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
                  required
                  autoComplete="tel"
                  className="sm:col-span-2"
                />
                <Field
                  label="Postnummer"
                  name="postnummer"
                  required
                  inputMode="numeric"
                  pattern="\d{3}\s?\d{2}"
                  autoComplete="postal-code"
                  value={postcode}
                  onChange={(v) =>
                    setPostcode(v.replace(/[^\d ]/g, "").slice(0, 6))
                  }
                  className="sm:col-span-2"
                />
              </div>

              {leadState && !leadState.ok && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg px-4 py-3 text-sm"
                  style={{
                    background: "var(--color-lystr-tomato-tint)",
                    color: "var(--color-lystr-tomato-deep)",
                  }}
                >
                  {leadState.error}
                </p>
              )}

              <p
                className="mt-5 text-xs"
                style={{ color: "var(--fg-3)" }}
              >
                {leadForm.consent}
              </p>

              <button
                type="submit"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-lystr-tomato px-7 text-base font-semibold text-white transition-colors hover:bg-lystr-tomato-hover sm:w-auto"
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
  tone: "muted" | "black" | "tomato";
  caption?: string;
}) {
  const bg =
    tone === "muted"
      ? "var(--border)"
      : tone === "black"
        ? "var(--color-lystr-black)"
        : "var(--color-lystr-tomato)";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: "var(--fg-2)" }}>{label}</span>
        <span className="font-semibold" style={{ color: "var(--fg-1)" }}>
          {amountLabel}
        </span>
      </div>
      <div className="mt-2 h-4 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-[var(--ease-out)]"
          style={{ width: `${Math.max(widthPct, 6)}%`, background: bg }}
        />
      </div>
      {caption && (
        <p className="mt-1.5 text-xs" style={{ color: "var(--fg-3)" }}>
          {caption}
        </p>
      )}
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
  const isAccent = tone === "accent";
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: isAccent ? "var(--color-lystr-tomato-tint)" : "white",
        borderColor: isAccent
          ? "var(--color-lystr-tomato)"
          : "var(--border)",
      }}
    >
      <p
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--fg-3)" }}
      >
        {label}
      </p>
      <p
        className="mt-1 font-display text-2xl font-semibold tracking-tight"
        style={{
          color: isAccent ? "var(--color-lystr-tomato-deep)" : "var(--fg-1)",
        }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs" style={{ color: "var(--fg-2)" }}>
        {hint}
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
  pattern,
  className = "",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "decimal" | "email" | "tel";
  pattern?: string;
  className?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className={`block ${className}`}>
      <span
        className="text-sm font-medium"
        style={{ color: "var(--fg-2)" }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="mt-1.5 block w-full rounded-xl border bg-white px-4 py-3 text-base focus:border-lystr-black focus:outline-none"
        style={{ borderColor: "var(--border)" }}
      />
    </label>
  );
}

function SuccessState() {
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="mx-auto max-w-(--container-marketing) px-[22px] py-20 text-center md:px-8 md:py-28">
        <div
          className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "var(--saving-bg)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--saving-fg)" }}
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1
          className="mt-6 font-display text-3xl font-semibold md:text-4xl"
          style={{ color: "var(--fg-1)" }}
        >
          {leadForm.success.title}
        </h1>
        <p
          className="mx-auto mt-3 max-w-md text-base"
          style={{ color: "var(--fg-2)" }}
        >
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
            className="inline-flex h-12 items-center rounded-full border bg-white px-7 text-base font-medium hover:border-lystr-black"
            style={{
              borderColor: "var(--border)",
              color: "var(--fg-1)",
            }}
          >
            ← Till startsidan
          </Link>
        </div>
      </div>
    </section>
  );
}
