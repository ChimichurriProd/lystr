import { hero } from "@/content/homepage";
import { VideoPlaceholder } from "./video-placeholder";

export function Hero() {
  return (
    <section className="bg-lystr-black text-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-lystr-red">
          {hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight whitespace-pre-line sm:text-5xl md:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
          {hero.subhead}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={hero.primaryCta.href}
            className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-medium text-white transition-colors hover:bg-lystr-red-hover"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <div className="mt-14 md:mt-20">
          <VideoPlaceholder />
        </div>
      </div>
    </section>
  );
}
