"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroCalculatorForm({
  presets,
  ineligibleMessage,
  housingOptions,
}: {
  presets: number[];
  ineligibleMessage: string;
  housingOptions: { value: string; label: string }[];
}) {
  const router = useRouter();
  const [postnummer, setPostnummer] = useState("");
  const [bill, setBill] = useState("");
  const [housing, setHousing] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postnummerValid = /^\d{3}\s?\d{2}$/.test(postnummer.trim());
  const billNum = Number(bill);
  const billValid = billNum >= 500 && billNum <= 20000;
  const housingValid = housing !== "";
  const allValid = postnummerValid && billValid && housingValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    if (!allValid) {
      if (!postnummerValid) return setError("Ange ett giltigt postnummer.");
      if (!billValid) return setError("Ange en rimlig månadskostnad (500–20 000 kr).");
      if (!housingValid) return setError("Välj boendeform.");
      return;
    }

    if (housing === "lagenhet") {
      setError(ineligibleMessage);
      return;
    }

    setIsSubmitting(true);
    const params = new URLSearchParams({
      postnummer: postnummer.trim(),
      bill: String(billNum),
      housing,
    });
    router.push(`/uppskattning?${params.toString()}`);
  };

  return (
    <form
      id="kalkylator"
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 text-lystr-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] md:p-8"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Räkna ut din besparing
        </h2>
        <span className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
          ~2 min
        </span>
      </div>
      <p className="mt-1 text-sm text-lystr-slate">
        Tre frågor, direkt uppskattning.
      </p>

      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-lystr-slate">
            Postnummer
          </span>
          <input
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="185 32"
            value={postnummer}
            onChange={(e) => setPostnummer(e.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-lystr-line bg-white px-4 py-3 text-lg font-medium placeholder:text-lystr-gray focus:border-lystr-black focus:outline-none"
          />
        </label>

        <div>
          <label className="block">
            <span className="text-sm font-medium text-lystr-slate">
              Månadskostnad för el
            </span>
            <div className="mt-1.5 flex items-center rounded-xl border border-lystr-line bg-white">
              <input
                inputMode="numeric"
                placeholder="2 500"
                value={bill}
                onChange={(e) => setBill(e.target.value.replace(/\D/g, ""))}
                className="block flex-1 bg-transparent px-4 py-3 text-lg font-medium placeholder:text-lystr-gray focus:outline-none"
              />
              <span className="pr-4 text-sm text-lystr-muted">kr/mån</span>
            </div>
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {presets.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setBill(String(n))}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  Number(bill) === n
                    ? "border-lystr-black bg-lystr-black text-white"
                    : "border-lystr-line bg-white text-lystr-slate hover:border-lystr-black"
                }`}
              >
                {n.toLocaleString("sv-SE")} kr
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-lystr-slate">
            Boendeform
          </span>
          <div role="radiogroup" className="mt-1.5 grid grid-cols-2 gap-2">
            {housingOptions.map((o) => {
              const selected = housing === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setHousing(o.value)}
                  className={`rounded-xl border px-4 py-3 text-left text-base font-medium transition-colors ${
                    selected
                      ? "border-lystr-black bg-lystr-black text-white"
                      : "border-lystr-line bg-white text-lystr-black hover:border-lystr-black"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg bg-lystr-red/10 px-4 py-3 text-sm text-lystr-red-hover"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-full bg-lystr-red px-7 text-base font-semibold text-white transition-colors hover:bg-lystr-red-hover disabled:cursor-not-allowed disabled:bg-lystr-gray"
      >
        {isSubmitting ? "Beräknar…" : "Räkna ut min besparing →"}
      </button>

      <p className="mt-3 text-center text-xs text-lystr-muted">
        Inga uppgifter sparas innan du väljer att gå vidare.
      </p>
    </form>
  );
}
