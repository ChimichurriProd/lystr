import { CostBars } from "./cost-bars";

/* ============================================================
   How it works — three editorial steps, then the cost-bars
   visualisation showing how each krona is allocated today vs.
   during/after a Lystr contract, then a closing line.
   ============================================================ */

const STEPS = [
  {
    n: "01",
    title: "Räkna ut din nya elräkning",
    body: "Tre frågor, två minuter. Du får en uppskattning baserad på din nuvarande räkning, ditt postnummer och ditt boende.",
    note: "Inga kreditupplysningar. Inga försäljare på telefonen.",
  },
  {
    n: "02",
    title: "En rådgivare ringer upp",
    body: "Vi går igenom ditt tak, ditt elavtal och dina förutsättningar tillsammans. Du får en konkret kalkyl på månadskostnad, antal paneler och beräknad produktion — anpassad efter just ditt hus.",
    note: "Inga säljskript. Du betalar ingenting förrän ni är överens.",
  },
  {
    n: "03",
    title: "Solen jobbar åt dig — i 30 år",
    body: "Vi installerar, garanterar och sköter underhållet. År 1–8 går din månadsräkning till att betala av din egen anläggning. Efter det är den din — solen fortsätter jobba, räkningen försvinner.",
    note: "Garanti i 25 år. Tekniska livslängden är 30+.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="hur"
      className="py-14 md:py-24"
      style={{ background: "var(--bg-1)" }}
    >
      <div className="mx-auto max-w-(--container-marketing) px-[22px] md:px-8">
        <div className="mb-12 max-w-[720px]">
          <EyebrowLine>Så fungerar det</EyebrowLine>
          <h2
            className="m-0 mt-[18px] font-display font-semibold text-pretty"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Tre steg från elräkning till{" "}
            <span className="text-lystr-tomato">eget tak.</span>
          </h2>
        </div>

        <ol className="how-grid m-0 mb-12 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="how-step relative">
              <span className="mb-4 inline-block font-mono text-[13px] font-semibold tracking-[0.04em] text-lystr-tomato">
                {step.n}
              </span>
              <h3
                className="m-0 mb-3 font-display text-[22px] font-semibold tracking-[-0.01em]"
                style={{ color: "var(--fg-1)", lineHeight: 1.2 }}
              >
                {step.title}
              </h3>
              <p
                className="m-0 mb-3.5 text-[15px] leading-[1.55]"
                style={{ color: "var(--fg-2)" }}
              >
                {step.body}
              </p>
              <p
                className="how-step-note m-0 pt-3 text-[13px] italic"
                style={{ color: "var(--fg-3)" }}
              >
                {step.note}
              </p>
            </li>
          ))}
        </ol>

        {/* Cost-anatomy bars — shows where each krona goes today,
            during the contract, and after the contract is paid off. */}
        <div className="mt-16 md:mt-20">
          <div className="mb-8 max-w-[720px] md:mb-10">
            <h3
              className="m-0 font-display font-semibold text-pretty"
              style={{
                fontSize: "clamp(24px, 2.6vw, 32px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "var(--fg-1)",
              }}
            >
              Samma månadskostnad. Helt annan mottagare.
            </h3>
            <p
              className="mt-3 text-[15px] leading-[1.55]"
              style={{ color: "var(--fg-2)" }}
            >
              Idag försvinner hela din elräkning till elbolaget. Med Lystr går
              majoriteten till ditt eget tak — solen jobbar i bakgrunden, och
              efter åtta år rasar kostnaden.
            </p>
          </div>
          <CostBars />
        </div>

        <p
          className="m-0 mt-16 max-w-[56ch] border-t pt-8 font-display text-[clamp(20px,2vw,26px)] font-medium leading-[1.35] tracking-[-0.01em] md:mt-20"
          style={{ color: "var(--fg-1)", borderColor: "var(--border)" }}
        >
          Inga bindningstider mot Lystr. Inget krångel. Bara solen, taket och en
          räkning som krymper varje månad.
        </p>
      </div>
    </section>
  );
}

function EyebrowLine({ children }: { children: React.ReactNode }) {
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
