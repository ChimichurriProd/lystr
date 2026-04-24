import { SiteHeader } from "@/components/site-header";
import { SiteBanner } from "@/components/site-banner";
import { Hero } from "@/components/hero";
import { CustomerJourney } from "@/components/customer-journey";
import { ExplainerSection } from "@/components/explainer-section";
import { CostAnatomy } from "@/components/cost-anatomy";
import { Pillars } from "@/components/pillars";
import { Benefits } from "@/components/benefits";
import { Faq } from "@/components/faq";
import { PartnersSection } from "@/components/partners-section";
import { SiteFooter } from "@/components/site-footer";
import { defaultCalculatorSettings } from "@/content/calculator-defaults";
import { fetchCalculatorSettings } from "../../sanity/lib/fetch";

export default async function Home() {
  const remote = await fetchCalculatorSettings();
  const settings = remote ?? defaultCalculatorSettings;

  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="flex-1">
        <Hero settings={settings} />
        <CustomerJourney />
        <CostAnatomy settings={settings} />
        <ExplainerSection />
        <Pillars />
        <Benefits />
        <Faq />
        <PartnersSection />
      </main>
      <SiteFooter />
    </>
  );
}
