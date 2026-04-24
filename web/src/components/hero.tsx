import { hero } from "@/content/homepage";
import { HeroCalculatorForm } from "./hero-calculator-form";

export function Hero() {
  return (
    <section className="bg-lystr-black text-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 pt-12 pb-20 md:px-10 md:pt-20 md:pb-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left — message */}
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-lystr-red">
              {hero.eyebrow}
            </p>
            <h1 className="whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 text-lg text-white/75 md:text-xl">
              {hero.subhead}
            </p>

            {/* Quick process summary — reinforces the 3-step journey */}
            <ol className="mt-10 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lystr-red/90 text-xs font-semibold text-white">
                  1
                </span>
                Räkna ut din besparing på ~2 minuter
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white">
                  2
                </span>
                Prata med en rådgivare
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white">
                  3
                </span>
                Installation klar på 6 veckor
              </li>
            </ol>

            {/* Secondary CTA for people who want to skip ahead */}
            <div className="mt-8">
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                Hellre prata direkt?
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Right — calculator */}
          <HeroCalculatorForm />
        </div>
      </div>
    </section>
  );
}
