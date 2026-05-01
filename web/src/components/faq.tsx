"use client";

import { useState } from "react";

/* ============================================================
   FAQ — single-open accordion. First item open by default.
   ============================================================ */

const QS = [
  {
    q: "Vad kostar Lystr egentligen?",
    a: "Inget i förväg. Vi installerar din anläggning utan en krona i insats. Det du betalar är en månadskostnad som ofta är lägre än din nuvarande elräkning. År 1–8 går en del av månadskostnaden till att betala av själva anläggningen — efter det äger du den och din räkning blir bara mindre.",
  },
  {
    q: "Vad händer om jag flyttar?",
    a: "Avtalet följer huset. Antingen tar den nya ägaren över avtalet (de flesta vill — det är billigare el), eller så löser du resterande summa när du säljer. Vi har en transparent avbetalningsplan från dag ett.",
  },
  {
    q: "Vem äger anläggningen?",
    a: "År 1–8 ägs den av Lystr. Sedan är den din, helt och hållet. Det är hela poängen: du går från att vara hyresgäst hos ett elbolag till att vara husägare i ditt eget kraftverk.",
  },
  {
    q: "Vad händer när det inte är sol?",
    a: "Då köper du el från nätet, precis som idag — fast oftast mycket mindre, eftersom batteriet täcker kvällar och natt. På årsbasis täcker en typisk Lystr-anläggning 70–90% av en villas elbehov.",
  },
  {
    q: "Hur länge håller en anläggning?",
    a: "Solpaneler har 25 års garanti och en teknisk livslängd på 30+ år. Batteriet byts ut en gång under den tiden — ungefär år 12. Det är inräknat i vår serviceplan.",
  },
  {
    q: "Är det här något ROT-avdrag?",
    a: "Nej, det är något bättre. ROT ger dig 30 000 kr i avdrag en gång. Lystr ger dig en sänkt elräkning varje månad i 30 år, plus en anläggning du äger själv. Räkna ihop det.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="py-14 md:py-24"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="mx-auto max-w-(--container-marketing) px-[22px] md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.4fr] md:gap-20">
          <div className="pt-2">
            <EyebrowLine>Vanliga frågor</EyebrowLine>
            <h2
              className="mt-[18px] mb-4 font-display font-semibold text-pretty"
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Det är okej att vara skeptisk.{" "}
              <span className="text-lystr-tomato">Vi är vana.</span>
            </h2>
            <p
              className="mb-5 max-w-[36ch] text-[15px] leading-[1.55]"
              style={{ color: "var(--fg-2)" }}
            >
              Solel har sålts dåligt i Sverige i tio år. Vi vill prata om det
              rakt på.
            </p>
            <a
              href="#kontakt"
              className="border-b pb-px text-sm font-medium no-underline hover:text-[var(--fg-1)]"
              style={{
                color: "var(--link-color)",
                borderColor: "currentColor",
              }}
            >
              Hittar du inte svaret? Maila oss →
            </a>
          </div>

          <ul
            className="m-0 list-none border-t p-0"
            style={{ borderColor: "var(--rule)" }}
          >
            {QS.map((item, i) => {
              const isOpen = i === open;
              return (
                <li
                  key={item.q}
                  className="border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent px-0 py-[18px] text-left font-display font-medium leading-[1.3] tracking-[-0.01em] transition-colors duration-200 hover:text-lystr-tomato md:py-[22px]"
                    style={{ color: "var(--fg-1)" }}
                  >
                    <span className="text-[17px] md:text-[19px]">{item.q}</span>
                    <span
                      aria-hidden
                      className="w-6 flex-shrink-0 text-center font-mono text-xl font-normal"
                      style={{
                        color: isOpen
                          ? "var(--color-lystr-tomato)"
                          : "var(--fg-3)",
                      }}
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      className="m-0 mb-[22px] max-w-[60ch] pr-0 text-sm leading-[1.6] md:pr-8 md:text-[15px]"
                      style={{ color: "var(--fg-2)" }}
                    >
                      {item.a}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
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
