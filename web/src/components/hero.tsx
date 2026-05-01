import { Calculator } from "./calculator";

/* ============================================================
   Hero — Variant A · Manifesto + Calculator (production)
   Variant B (Photo) is intentionally not shipped per the
   handoff README ("What NOT to ship").
   ============================================================ */

export function Hero() {
  return (
    <section
      className="hero-manifesto"
      style={{
        background: "var(--bg-2)",
        padding: "56px 0 80px",
      }}
    >
      <div className="mx-auto grid max-w-(--container-marketing) grid-cols-1 items-center gap-10 px-[22px] md:grid-cols-[1fr_1.05fr] md:gap-[60px] md:px-8">
        <div className="pt-2">
          <EyebrowLine>Med solen som insats</EyebrowLine>

          <h1
            className="m-0 mb-6 font-display font-semibold text-pretty"
            style={{
              fontSize: "clamp(40px, 5.2vw, 68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
          >
            Lystr är inte ett{" "}
            <span
              className="font-medium"
              style={{
                color: "var(--fg-3)",
                textDecoration: "line-through",
                textDecorationThickness: "3px",
                textDecorationColor: "var(--color-lystr-tomato)",
              }}
            >
              elbolag
            </span>
            .
            <br />
            Lystr är{" "}
            <span className="text-lystr-tomato">din&nbsp;energirådgivare.</span>
          </h1>

          <p
            className="m-0 mb-7 leading-[1.55]"
            style={{
              color: "var(--fg-2)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              maxWidth: "56ch",
            }}
          >
            Solen är din enda insats — resten står vi för. Vi installerar
            anläggningen och du betalar samma månadsbelopp som idag, fast nu
            går pengarna till ditt eget tak istället för elbolaget. Efter åtta
            år är den avbetald — solen fortsätter jobba i minst 22 år till.
          </p>

          <ul
            className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0 text-[15px]"
            style={{ color: "var(--fg-2)" }}
          >
            <Bullet>Ingen egen insats</Bullet>
            <Bullet>Lägre månadskostnad från dag ett</Bullet>
            <Bullet>Du äger anläggningen efter 8 år</Bullet>
          </ul>
        </div>

        <div>
          <Calculator />
        </div>
      </div>
    </section>
  );
}

function EyebrowLine({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-[18px] inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
      style={{ color: "var(--eyebrow-color)" }}
    >
      <span
        aria-hidden
        className="inline-block h-px w-6 bg-current"
      />
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
