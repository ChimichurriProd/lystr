"use client";

import { useActionState, useState, useTransition } from "react";
import { calculator, leadForm } from "@/content/homepage";
import { submitLead, type LeadResult } from "@/app/actions/lead";

type Step = "postnummer" | "bill" | "housing" | "ineligible" | "result" | "form" | "success";

type CalcData = {
  postnummer: string;
  monthlyBill: number;
  housing: string;
};

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
    .replace(/\s/g, " ");
}

function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-lystr-muted">
      <span>
        Steg {current} av {total}
      </span>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-lystr-line">
        <div
          className="h-full bg-lystr-red transition-[width] duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function Calculator() {
  const [step, setStep] = useState<Step>("postnummer");
  const [data, setData] = useState<CalcData>({
    postnummer: "",
    monthlyBill: 0,
    housing: "",
  });
  const [isPending, startTransition] = useTransition();

  const [leadState, leadAction] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null,
  );

  // Advance wrappers
  const next = (partial: Partial<CalcData>) => {
    setData((d) => ({ ...d, ...partial }));
    startTransition(() => {
      if (step === "postnummer") setStep("bill");
      else if (step === "bill") setStep("housing");
      else if (step === "housing") {
        if (partial.housing === "lagenhet") setStep("ineligible");
        else setStep("result");
      }
    });
  };

  const back = () => {
    if (step === "bill") setStep("postnummer");
    else if (step === "housing") setStep("bill");
    else if (step === "result" || step === "ineligible") setStep("housing");
    else if (step === "form") setStep("result");
  };

  // Derived values
  const postContractMonthly = data.monthlyBill * POST_CONTRACT_RATIO;
  const monthlyDelta = data.monthlyBill - postContractMonthly;
  const lifetimeSavings = monthlyDelta * 12 * POST_CONTRACT_YEARS;
  const totalBenefit = lifetimeSavings + HOUSE_VALUE_INCREASE;

  // Advance on successful lead submit
  if (leadState?.ok && step !== "success") {
    queueMicrotask(() => setStep("success"));
  }

  return (
    <section id="kalkylator" className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
            {calculator.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-4xl">
            {calculator.title}
          </h2>
          <p className="mt-3 text-base text-lystr-slate">{calculator.subtitle}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-lystr-line bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)]">
          {(step === "postnummer" || step === "bill" || step === "housing") && (
            <div className="px-6 pt-8 pb-2 md:px-10">
              <Progress
                current={
                  step === "postnummer" ? 1 : step === "bill" ? 2 : 3
                }
                total={3}
              />
            </div>
          )}

          <div className="px-6 py-8 md:px-10 md:py-10" aria-live="polite">
            {step === "postnummer" && (
              <StepPostnummer
                defaultValue={data.postnummer}
                onNext={(postnummer) => next({ postnummer })}
                disabled={isPending}
              />
            )}
            {step === "bill" && (
              <StepBill
                defaultValue={data.monthlyBill}
                onNext={(monthlyBill) => next({ monthlyBill })}
                onBack={back}
                disabled={isPending}
              />
            )}
            {step === "housing" && (
              <StepHousing
                defaultValue={data.housing}
                onNext={(housing) => next({ housing })}
                onBack={back}
                disabled={isPending}
              />
            )}
            {step === "ineligible" && <Ineligible onBack={back} />}
            {step === "result" && (
              <Result
                data={data}
                postContractMonthly={postContractMonthly}
                lifetimeSavings={lifetimeSavings}
                totalBenefit={totalBenefit}
                onBack={back}
                onContinueToForm={() => setStep("form")}
              />
            )}
            {step === "form" && (
              <LeadFormStep
                data={data}
                formAction={leadAction}
                error={
                  leadState && !leadState.ok ? leadState.error : undefined
                }
                onBack={back}
              />
            )}
            {step === "success" && <Success />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Step 1: Postnummer ---------- */
function StepPostnummer({
  defaultValue,
  onNext,
  disabled,
}: {
  defaultValue: string;
  onNext: (v: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const valid = /^\d{3}\s?\d{2}$/.test(value.trim());
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onNext(value.trim());
      }}
    >
      <label htmlFor="postnummer" className="block">
        <span className="text-lg font-semibold text-lystr-black md:text-xl">
          {calculator.steps.postnummer.label}
        </span>
      </label>
      <p className="mt-2 text-sm text-lystr-slate">
        {calculator.steps.postnummer.help}
      </p>
      <input
        id="postnummer"
        name="postnummer"
        inputMode="numeric"
        autoComplete="postal-code"
        placeholder="185 32"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-6 block w-full rounded-xl border border-lystr-line bg-white px-5 py-4 text-2xl font-semibold tracking-tight placeholder:text-lystr-gray focus:border-lystr-black focus:outline-none md:text-3xl"
      />
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={!valid || disabled}
          className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white transition-colors hover:bg-lystr-red-hover disabled:cursor-not-allowed disabled:bg-lystr-gray"
        >
          Fortsätt
        </button>
      </div>
    </form>
  );
}

/* ---------- Step 2: Monthly bill ---------- */
function StepBill({
  defaultValue,
  onNext,
  onBack,
  disabled,
}: {
  defaultValue: number;
  onNext: (v: number) => void;
  onBack: () => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState(defaultValue > 0 ? String(defaultValue) : "");
  const num = Number(value);
  const valid = num >= 500 && num <= 20000;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onNext(num);
      }}
    >
      <label htmlFor="bill" className="block">
        <span className="text-lg font-semibold text-lystr-black md:text-xl">
          {calculator.steps.bill.label}
        </span>
      </label>
      <p className="mt-2 text-sm text-lystr-slate">{calculator.steps.bill.help}</p>
      <div className="mt-6 flex items-center rounded-xl border border-lystr-line bg-white">
        <input
          id="bill"
          name="monthlyBill"
          inputMode="numeric"
          placeholder="2 500"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
          className="block flex-1 bg-transparent px-5 py-4 text-2xl font-semibold tracking-tight placeholder:text-lystr-gray focus:outline-none md:text-3xl"
        />
        <span className="pr-5 text-lg text-lystr-muted">kr/mån</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {calculator.steps.bill.presets.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setValue(String(n))}
            className="rounded-full border border-lystr-line bg-white px-4 py-2 text-sm text-lystr-slate transition-colors hover:border-lystr-black hover:text-lystr-black"
          >
            {formatKr(n)}
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-lystr-muted hover:text-lystr-black"
        >
          ← Tillbaka
        </button>
        <button
          type="submit"
          disabled={!valid || disabled}
          className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white transition-colors hover:bg-lystr-red-hover disabled:cursor-not-allowed disabled:bg-lystr-gray"
        >
          Fortsätt
        </button>
      </div>
    </form>
  );
}

/* ---------- Step 3: Housing ---------- */
function StepHousing({
  defaultValue,
  onNext,
  onBack,
  disabled,
}: {
  defaultValue: string;
  onNext: (v: string) => void;
  onBack: () => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <p className="text-lg font-semibold text-lystr-black md:text-xl">
        {calculator.steps.housing.label}
      </p>
      <div
        role="radiogroup"
        className="mt-6 grid gap-3 sm:grid-cols-2"
      >
        {calculator.steps.housing.options.map((o) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setValue(o.value)}
              className={`rounded-xl border p-5 text-left transition-colors ${
                selected
                  ? "border-lystr-black bg-lystr-black text-white"
                  : "border-lystr-line bg-white text-lystr-black hover:border-lystr-black"
              }`}
            >
              <span className="text-lg font-medium">{o.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-lystr-muted hover:text-lystr-black"
        >
          ← Tillbaka
        </button>
        <button
          type="button"
          onClick={() => value && onNext(value)}
          disabled={!value || disabled}
          className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white transition-colors hover:bg-lystr-red-hover disabled:cursor-not-allowed disabled:bg-lystr-gray"
        >
          Visa min uppskattning
        </button>
      </div>
    </div>
  );
}

/* ---------- Ineligible ---------- */
function Ineligible({ onBack }: { onBack: () => void }) {
  return (
    <div className="text-center">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-lystr-cream">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-lystr-muted"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
        </svg>
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-lystr-black">
        {calculator.ineligible.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-base text-lystr-slate">
        {calculator.ineligible.body}
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 text-sm font-medium text-lystr-muted hover:text-lystr-black"
      >
        ← Ändra svar
      </button>
    </div>
  );
}

/* ---------- Result ---------- */
function Result({
  data,
  postContractMonthly,
  lifetimeSavings,
  totalBenefit,
  onBack,
  onContinueToForm,
}: {
  data: CalcData;
  postContractMonthly: number;
  lifetimeSavings: number;
  totalBenefit: number;
  onBack: () => void;
  onContinueToForm: () => void;
}) {
  const postPct = (postContractMonthly / data.monthlyBill) * 100;
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-wider text-lystr-red">
        {calculator.result.heading}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-lystr-black md:text-5xl">
            {formatKr(totalBenefit)}
          </p>
          <p className="mt-2 text-base text-lystr-slate">
            Total uppskattad vinst över 30 år — inklusive sänkta elkostnader efter avtalstid och värdehöjning på ditt hus.
          </p>

          {/* Bar comparison */}
          <div className="mt-8 space-y-5">
            <BarRow
              label={calculator.result.currentLabel}
              amountLabel={`${formatKr(data.monthlyBill)} / mån`}
              widthPct={100}
              tone="muted"
            />
            <BarRow
              label={calculator.result.contractLabel}
              amountLabel={`${formatKr(data.monthlyBill)} / mån`}
              widthPct={100}
              tone="black"
              caption="Matchar din nuvarande kostnad — men nu producerar du din egen el."
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

        <div className="space-y-4">
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
          <p className="text-xs text-lystr-muted">{calculator.result.fineprint}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-lystr-muted hover:text-lystr-black"
        >
          ← Ändra uppgifter
        </button>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.calendly.com/mathias-soderstrom-lystr"
            className="inline-flex h-12 items-center rounded-full border border-lystr-line bg-white px-6 text-base font-medium text-lystr-black transition-colors hover:border-lystr-black"
          >
            {calculator.result.ctaSecondary}
          </a>
          <button
            type="button"
            onClick={onContinueToForm}
            className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white transition-colors hover:bg-lystr-red-hover"
          >
            {calculator.result.ctaPrimary}
          </button>
        </div>
      </div>
    </div>
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
      <div
        className="mt-2 h-3 overflow-hidden rounded-full bg-lystr-cream"
        role="presentation"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${bg}`}
          style={{ width: `${Math.max(widthPct, 6)}%` }}
        />
      </div>
      {caption && (
        <p className="mt-1.5 text-xs text-lystr-muted">{caption}</p>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-lystr-line bg-lystr-cream p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-lystr-black">
        {value}
      </p>
      <p className="mt-1 text-xs text-lystr-slate">{hint}</p>
    </div>
  );
}

/* ---------- Lead form ---------- */
function LeadFormStep({
  data,
  formAction,
  error,
  onBack,
}: {
  data: CalcData;
  formAction: (formData: FormData) => void;
  error?: string;
  onBack: () => void;
}) {
  return (
    <form action={formAction}>
      <p className="text-sm font-medium uppercase tracking-wider text-lystr-red">
        Sista steget
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-lystr-black md:text-3xl">
        {leadForm.title}
      </h3>
      <p className="mt-2 text-base text-lystr-slate">{leadForm.subtitle}</p>

      {/* Hidden fields — carry calculator context */}
      <input type="hidden" name="postnummer" value={data.postnummer} />
      <input type="hidden" name="monthlyBill" value={String(data.monthlyBill)} />
      <input type="hidden" name="housing" value={data.housing} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label={leadForm.fields.name} name="name" required autoComplete="name" />
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

      {error && (
        <p className="mt-4 rounded-lg bg-lystr-red/10 px-4 py-3 text-sm text-lystr-red-hover">
          {error}
        </p>
      )}

      <p className="mt-6 text-xs text-lystr-muted">{leadForm.consent}</p>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-lystr-muted hover:text-lystr-black"
        >
          ← Tillbaka till uppskattning
        </button>
        <SubmitButton />
      </div>
    </form>
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

function SubmitButton() {
  // useFormStatus from react-dom would require another import; keep it simple.
  return (
    <button
      type="submit"
      className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white transition-colors hover:bg-lystr-red-hover"
    >
      {leadForm.submit}
    </button>
  );
}

/* ---------- Success ---------- */
function Success() {
  return (
    <div className="text-center">
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
      <h3 className="mt-6 text-2xl font-semibold text-lystr-black">
        {leadForm.success.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-base text-lystr-slate">
        {leadForm.success.body}
      </p>
      <a
        href="https://www.calendly.com/mathias-soderstrom-lystr"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-lystr-black px-7 text-base font-medium text-white transition-colors hover:bg-lystr-charcoal"
      >
        Boka möte direkt
      </a>
    </div>
  );
}
