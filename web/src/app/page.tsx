import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MvpLeadForm } from "@/components/mvp-lead-form";

/* MVP homepage — single hero with the offer on the left and the lead
   form on the right. Keep it focused: one decision, one path. The
   richer page (calculator, FAQ, how-it-works) lives at /utkast. */

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          className="relative"
          style={{ background: "var(--bg-2)" }}
        >
          <div className="mx-auto grid w-full max-w-(--container-marketing) grid-cols-1 items-start gap-10 px-[22px] pt-12 pb-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-8 md:pt-20 md:pb-28">
            {/* Left — hook + offer */}
            <div>
              <Eyebrow>Med solen som insats</Eyebrow>
              <h1
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(40px, 5.4vw, 68px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "var(--fg-1)",
                }}
              >
                Sluta hyra elen.{" "}
                <span className="text-lystr-tomato">Äg den.</span>
              </h1>

              <p
                className="mt-7 max-w-[56ch] leading-[1.55]"
                style={{
                  color: "var(--fg-2)",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                }}
              >
                Lystr är inte ett elbolag. Vi är dina energirådgivare.
                Vi installerar solanläggningen — du betalar samma
                månadsbelopp som idag, fast nu till ditt eget tak.
                Efter åtta år är den din.
              </p>

              <ul
                className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0 text-[15px]"
                style={{ color: "var(--fg-2)" }}
              >
                <Bullet>Ingen kontantinsats. Ingen kreditupplysning.</Bullet>
                <Bullet>Samma månadskostnad som du betalar idag.</Bullet>
                <Bullet>Du äger anläggningen efter åtta år.</Bullet>
                <Bullet>Solen jobbar gratis i 30 år till.</Bullet>
              </ul>
            </div>

            {/* Right — lead form */}
            <div className="md:pl-4 lg:pl-8">
              <MvpLeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
      style={{ color: "var(--eyebrow-color)" }}
    >
      <span aria-hidden className="inline-block h-px w-6 bg-current" />
      {children}
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lystr-tomato"
      />
      {children}
    </li>
  );
}
