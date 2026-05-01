/* ============================================================
   Next-steps timeline — what happens after the customer signs up.
   Used on /uppskattning (after the lead form is rendered above)
   and reusable on any page that explains the post-signup flow.
   ============================================================ */

const STEPS = [
  {
    n: "01",
    title: "Du fyller i kalkylen",
    body: "Tre frågor på två minuter ger oss det vi behöver för att räkna fram en rimlig uppskattning. Inga kreditupplysningar, ingen säljare på telefonen.",
    when: "0 minuter",
  },
  {
    n: "02",
    title: "En rådgivare ringer upp",
    body: "Inom 1–2 arbetsdagar hör vi av oss. Vi går igenom ditt tak, ditt elavtal och dina förutsättningar. Inga säljskript — bara en konkret samtalspartner.",
    when: "1–2 dagar",
  },
  {
    n: "03",
    title: "Hembesök & takanalys",
    body: "Vi besöker huset, mäter taket, kontrollerar elsystemet och fotograferar förutsättningarna. Resultatet blir grunden för din offert.",
    when: "Vecka 1–2",
  },
  {
    n: "04",
    title: "Konkret offert & digitalt avtal",
    body: "Du får en exakt kalkyl: antal paneler, batteristorlek, månadskostnad och förväntad produktion. Du signerar digitalt med 14 dagars ångerrätt enligt lag.",
    when: "Vecka 2–3",
  },
  {
    n: "05",
    title: "Installation",
    body: "Våra installatörer monterar paneler, växelriktare och batteri. Det tar oftast 1–3 dagar. Vi planerar runt din kalender.",
    when: "Vecka 4–8",
  },
  {
    n: "06",
    title: "Driftsättning — solen börjar jobba",
    body: "Anläggningen kopplas in på nätet. Första månadsräkningen är densamma som idag, fast nu går pengarna till ditt eget tak istället för elbolaget.",
    when: "Månad 1",
  },
  {
    n: "07",
    title: "År 1–8: avbetalning",
    body: "Du betalar samma belopp som tidigare. Solen producerar, vi sköter underhåll och garanti. Ingen oro, inget krångel.",
    when: "År 1–8",
  },
  {
    n: "08",
    title: "År 9 och framåt: du äger",
    body: "Anläggningen är avbetald och din. Räkningen rasar — solen fortsätter jobba i minst 22 år till, helt utan kostnad.",
    when: "År 9–30",
  },
];

export function NextStepsTimeline({
  eyebrow = "Så fungerar det efter att du anmält intresse",
  heading = "Från ifylld kalkyl till eget kraftverk.",
  intro = "Inga överraskningar. Här är hela vägen — från det att du klickar in dina uppgifter till att solen jobbar gratis åt dig i 30 år.",
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
} = {}) {
  return (
    <section style={{ background: "var(--bg-1)" }}>
      <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
        <div className="mb-10 max-w-[680px] md:mb-14">
          <div
            className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--eyebrow-color)" }}
          >
            <span aria-hidden className="inline-block h-px w-6 bg-current" />
            {eyebrow}
          </div>
          <h2
            className="mt-[18px] m-0 font-display font-semibold text-pretty"
            style={{
              fontSize: "clamp(28px, 3.4vw, 40px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--fg-1)",
            }}
          >
            {heading}
          </h2>
          <p
            className="mt-4 max-w-[56ch] text-[15px] leading-[1.55] md:text-base"
            style={{ color: "var(--fg-2)" }}
          >
            {intro}
          </p>
        </div>

        <ol className="m-0 grid list-none grid-cols-1 gap-0 p-0">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="grid grid-cols-[40px_1fr] gap-4 border-t py-6 md:grid-cols-[80px_1fr_140px] md:gap-8 md:py-7"
              style={{
                borderColor: "var(--border)",
                borderBottom:
                  i === STEPS.length - 1
                    ? "1px solid var(--border)"
                    : undefined,
              }}
            >
              <span
                className="font-mono text-[13px] font-semibold tracking-[0.04em] text-lystr-tomato md:text-[14px]"
              >
                {step.n}
              </span>
              <div className="min-w-0">
                <h3
                  className="m-0 mb-1.5 font-display text-[18px] font-semibold tracking-[-0.01em] md:text-[20px]"
                  style={{ color: "var(--fg-1)", lineHeight: 1.25 }}
                >
                  {step.title}
                </h3>
                <p
                  className="m-0 text-[14px] leading-[1.55] md:text-[15px]"
                  style={{ color: "var(--fg-2)" }}
                >
                  {step.body}
                </p>
                <p
                  className="m-0 mt-2 font-mono text-[12px] md:hidden"
                  style={{ color: "var(--fg-3)" }}
                >
                  {step.when}
                </p>
              </div>
              <span
                className="hidden self-start font-mono text-[12px] md:block md:text-right"
                style={{ color: "var(--fg-3)" }}
              >
                {step.when}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
