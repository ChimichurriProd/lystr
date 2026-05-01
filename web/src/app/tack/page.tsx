import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Tack · Lystr",
  description:
    "Vi har fått din intresseanmälan. Här är vad som händer nu.",
  // Don't index the thank-you page — it's only meaningful after a
  // form submission.
  robots: { index: false, follow: false },
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Vi ringer upp dig",
    body:
      "Inom 1–2 arbetsdagar hör en av våra rådgivare av sig på det nummer du angav.",
  },
  {
    n: "02",
    title: "Vi går igenom din situation",
    body:
      "Din elräkning, ditt tak, dina mål. Tar 15–20 minuter. Ingen säljpitch.",
  },
  {
    n: "03",
    title: "Hembesök &amp; takanalys",
    body:
      "Om det ser bra ut bokar vi ett hembesök där vi mäter taket och projekterar anläggningen.",
  },
  {
    n: "04",
    title: "Du får din offert",
    body:
      "En exakt sammanställning av månadsbelopp, paneler och garantier. Inga doldra avgifter.",
  },
  {
    n: "05",
    title: "Du bestämmer",
    body:
      "Vill du gå vidare? Bra. Vill du tänka? Bra. Det här är ditt beslut.",
  },
];

export default function TackPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero — confirmation */}
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-marketing) px-[22px] pt-16 pb-12 md:px-8 md:pt-24 md:pb-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-lystr-tomato">
              Tack
            </p>
            <h1
              className="mt-3 font-display font-semibold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(40px, 5.6vw, 64px)",
                letterSpacing: "-0.025em",
              }}
            >
              Vi har fått din intresseanmälan.
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-[1.55] md:text-lg"
              style={{ color: "var(--on-ink-2)" }}
            >
              Du behöver inte göra någonting just nu. En av våra
              energirådgivare hör av sig inom 1–2 arbetsdagar.
            </p>
          </div>
        </section>

        {/* Next steps */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-24">
            <div className="mb-10 max-w-[680px] md:mb-14">
              <p
                className="m-0 text-[13px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "var(--eyebrow-color)" }}
              >
                Det här händer nu
              </p>
              <h2
                className="m-0 mt-[18px] font-display font-semibold text-pretty"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--fg-1)",
                }}
              >
                Fem steg, inga överraskningar.
              </h2>
            </div>

            <ol className="m-0 grid list-none grid-cols-1 gap-0 p-0">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t py-6 md:grid-cols-[4rem_1fr] md:gap-8 md:py-8"
                  style={{
                    borderColor: "var(--border)",
                    borderBottom:
                      i === STEPS.length - 1
                        ? "1px solid var(--border)"
                        : undefined,
                  }}
                >
                  <span
                    className="font-mono text-[13px] font-medium"
                    style={{ color: "var(--fg-3)" }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <p
                      className="m-0 font-display text-[18px] font-semibold tracking-[-0.005em] md:text-[22px]"
                      style={{ color: "var(--fg-1)" }}
                      dangerouslySetInnerHTML={{ __html: s.title }}
                    />
                    <p
                      className="m-0 mt-2 max-w-[60ch] text-[14px] leading-[1.55] md:text-[15px]"
                      style={{ color: "var(--fg-2)" }}
                    >
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Reassurance / contact */}
        <section style={{ background: "var(--bg-1)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 text-center md:px-8 md:py-20">
            <p
              className="m-0 max-w-[60ch] mx-auto text-[15px] leading-[1.6] md:text-[17px]"
              style={{ color: "var(--fg-2)" }}
            >
              Behöver du nå oss innan dess? Hör av dig direkt på{" "}
              <a
                href="mailto:hej@lystr.se"
                className="border-b pb-px no-underline"
                style={{
                  color: "var(--link-color)",
                  borderColor: "currentColor",
                }}
              >
                hej@lystr.se
              </a>{" "}
              eller på{" "}
              <a
                href="tel:+4684123456"
                className="border-b pb-px no-underline"
                style={{
                  color: "var(--link-color)",
                  borderColor: "currentColor",
                }}
              >
                08 412 34 56
              </a>
              .
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 text-[14px] no-underline"
              style={{ color: "var(--fg-3)" }}
            >
              ← Tillbaka till start
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
