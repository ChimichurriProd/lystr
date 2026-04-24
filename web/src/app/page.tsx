import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { CustomerJourney } from "@/components/customer-journey";
import { ExplainerSection } from "@/components/explainer-section";
import { CostAnatomy } from "@/components/cost-anatomy";
import { Pillars } from "@/components/pillars";
import { Benefits } from "@/components/benefits";
import { Faq } from "@/components/faq";
import { PartnersSection } from "@/components/partners-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <CustomerJourney />
        <CostAnatomy />
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
