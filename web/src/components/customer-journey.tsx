import { customerJourney } from "@/content/homepage";

export function CustomerJourney() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
            {customerJourney.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-4xl">
            {customerJourney.title}
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {customerJourney.steps.map((step, i) => (
            <li
              key={step.number}
              className="relative rounded-2xl border border-lystr-line bg-lystr-cream p-7"
            >
              {/* Connector line between cards on desktop */}
              {i < customerJourney.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[2.25rem] -right-3 hidden h-px w-6 bg-lystr-line md:block"
                />
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lystr-black font-mono text-base font-semibold text-white">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-lystr-black">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-lystr-slate">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
