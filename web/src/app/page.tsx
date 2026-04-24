import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
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
        <Pillars />
        <HowItWorks />
        <Benefits />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
