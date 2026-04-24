import { howItWorks } from "@/content/homepage";

export function HowItWorks() {
  return (
    <section id="sa-funkar" className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
          {howItWorks.eyebrow}
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-4xl">
          {howItWorks.title}
        </h2>
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-lystr-slate md:text-lg">
          {howItWorks.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
