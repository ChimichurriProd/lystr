import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { CustomerJourney } from "@/components/customer-journey";
import { ExplainerSection } from "@/components/explainer-section";
import { Pillars } from "@/components/pillars";
import { HowItWorks } from "@/components/how-it-works";
import { Benefits } from "@/components/benefits";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <CustomerJourney />
        <ExplainerSection />
        <Pillars />
        <HowItWorks />
        <Benefits />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
