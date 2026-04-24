import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EstimateResult } from "@/components/estimate-result";
import { calculator } from "@/content/homepage";
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
  const { postnummer = "", bill = "", housing = "" } = await searchParams;
  const billNum = Number(bill);

  const postnummerValid = /^\d{3}\s?\d{2}$/.test(postnummer.trim());
  const billValid = billNum >= 500 && billNum <= 20000;
  const housingValid = ["villa", "radhus", "fritidshus", "lagenhet"].includes(
    housing,
  );
  const isValid = postnummerValid && billValid && housingValid;
  const isIneligible = housing === "lagenhet";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {!isValid ? (
          <InvalidParams />
        ) : isIneligible ? (
          <IneligibleState />
        ) : (
          <EstimateResult
            postnummer={postnummer.trim()}
            monthlyBill={billNum}
            housing={housing}
          />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function InvalidParams() {
  return (
    <section className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 text-center md:px-10 md:py-28">
        <h1 className="text-3xl font-semibold tracking-tight text-lystr-black md:text-4xl">
          Kalkylen saknar uppgifter
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-lystr-slate">
          Vi behöver postnummer, månadskostnad och boendeform för att räkna ut
          din uppskattning.
        </p>
        <Link
          href="/#kalkylator"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white hover:bg-lystr-red-hover"
        >
          Starta om kalkylen
        </Link>
      </div>
    </section>
  );
}

function IneligibleState() {
  return (
    <section className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 text-center md:px-10 md:py-28">
        <h1 className="text-3xl font-semibold tracking-tight text-lystr-black md:text-4xl">
          {calculator.ineligible.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lystr-slate">
          {calculator.ineligible.body}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full border border-lystr-line bg-white px-7 text-base font-medium text-lystr-black hover:border-lystr-black"
        >
          ← Tillbaka till start
        </Link>
      </div>
    </section>
  );
}
