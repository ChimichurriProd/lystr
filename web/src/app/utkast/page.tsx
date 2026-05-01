import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Faq } from "@/components/faq";

/* The previous (full-fat) homepage is preserved here as a draft so we
   can revisit it once the MVP is live. Keep it noindex; the live site
   uses the simpler conversion-focused page at `/`. */
export const metadata = {
  title: "Utkast · Lystr",
  description:
    "Utkast på en utbyggd lystr.se — bevarad efter MVP-pivoten.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
