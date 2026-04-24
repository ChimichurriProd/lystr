import {
  fetchPartners,
  fetchSiteSettings,
} from "../../sanity/lib/fetch";
import { urlFor } from "../../sanity/lib/image";

export async function PartnersSection() {
  const [partners, site] = await Promise.all([
    fetchPartners(),
    fetchSiteSettings(),
  ]);

  if (partners.length === 0) return null;

  const eyebrow = site?.partnersIntroEyebrow ?? "Samarbeten";
  const title =
    site?.partnersIntroTitle ?? "Vi bygger inte framtidens energibolag ensamma.";
  const subtitle =
    site?.partnersIntroSubtitle ??
    "Lystr drivs framåt tillsammans med starka samarbetspartners.";

  return (
    <section id="samarbeten" className="bg-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-lystr-slate md:text-lg">
            {subtitle}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
          {partners.map((p) => {
            const logoUrl = p.logo
              ? urlFor(p.logo).width(240).fit("max").url()
              : null;
            return (
              <li
                key={p._id}
                className="flex flex-col justify-between gap-6 rounded-2xl border border-lystr-line bg-lystr-cream p-7"
              >
                <div>
                  {p.relationship && (
                    <p className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
                      {p.relationship}
                    </p>
                  )}
                  <h3 className="mt-2 text-xl font-semibold text-lystr-black">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-lystr-slate">
                    {p.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-lystr-black underline-offset-4 hover:underline"
                    >
                      Läs mer
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                  {logoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoUrl}
                      alt=""
                      className="h-8 w-auto opacity-60"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
