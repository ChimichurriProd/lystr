import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EstimateResult } from "@/components/estimate-result";
import { defaultCalculatorSettings } from "@/content/calculator-defaults";
import { fetchCalculatorSettings } from "../../../sanity/lib/fetch";
import Link from "next/link";

export const metadata = {
  title: "Din uppskattning · Lystr",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{
  postnummer?: string;
  bill?: string;
  housing?: string;
}>;

export default async function UppskattningPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [{ postnummer = "", bill = "", housing = "" }, remoteSettings] =
    await Promise.all([searchParams, fetchCalculatorSettings()]);
  const settings = remoteSettings ?? defaultCalculatorSettings;

  const billNum = Number(bill);
  // Postnummer is collected later in the lead form; only bill + housing
  // are required to render a meaningful estimate.
  const billValid = billNum >= 500 && billNum <= 20000;
  const housingValid = ["villa", "radhus", "fritidshus", "lagenhet"].includes(
    housing,
  );
  const isValid = billValid && housingValid;
  const isIneligible = housing === "lagenhet";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {!isValid ? (
          <InvalidParams />
        ) : isIneligible ? (
          <IneligibleState
            title={settings.ineligibleTitle}
            body={settings.ineligibleBody}
          />
        ) : (
          <EstimateResult
            postnummer={postnummer.trim()}
            monthlyBill={billNum}
            housing={housing}
            settings={settings}
          />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function InvalidParams() {
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 text-center md:px-10 md:py-28">
        <h1
          className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
          style={{ color: "var(--fg-1)" }}
        >
          Kalkylen saknar uppgifter
        </h1>
        <p
          className="mx-auto mt-3 max-w-lg"
          style={{ color: "var(--fg-2)" }}
        >
          Vi behöver din månadskostnad och boendeform för att räkna ut din
          uppskattning.
        </p>
        <Link
          href="/#kalkyl"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-lystr-tomato px-7 text-base font-medium text-white transition-colors hover:bg-lystr-tomato-hover"
        >
          Starta om kalkylen
        </Link>
      </div>
    </section>
  );
}

function IneligibleState({ title, body }: { title: string; body: string }) {
  return (
    <section style={{ background: "var(--bg-2)" }}>
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 text-center md:px-10 md:py-28">
        <h1
          className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
          style={{ color: "var(--fg-1)" }}
        >
          {title}
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl"
          style={{ color: "var(--fg-2)" }}
        >
          {body}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full border bg-white px-7 text-base font-medium transition-colors hover:border-lystr-black"
          style={{ borderColor: "var(--border)", color: "var(--fg-1)" }}
        >
          ← Tillbaka till start
        </Link>
      </div>
    </section>
  );
}
