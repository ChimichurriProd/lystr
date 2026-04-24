import { partners, partnersIntro } from "@/content/partners";

export function PartnersSection() {
  return (
    <section id="samarbeten" className="bg-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
            {partnersIntro.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-4xl">
            {partnersIntro.title}
          </h2>
          <p className="mt-3 text-base text-lystr-slate md:text-lg">
            {partnersIntro.subtitle}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
          {partners.map((p) => (
            <li
              key={p.name}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-lystr-line bg-lystr-cream p-7"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
                  {p.relationship}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-lystr-black">
                  {p.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-lystr-slate">
                  {p.description}
                </p>
              </div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-lystr-black underline-offset-4 hover:underline"
                >
                  Läs mer
                  <span aria-hidden>↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
