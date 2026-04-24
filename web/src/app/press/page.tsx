import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  fetchPressReleases,
  fetchSiteSettings,
} from "../../../sanity/lib/fetch";

export const metadata = {
  title: "Pressrum · Lystr",
  description:
    "Pressmeddelanden och pressmaterial från Lystr. Kontaktuppgifter för press finns i slutet av sidan.",
  alternates: {
    types: {
      "application/rss+xml": "/press/rss.xml",
    },
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PressIndexPage() {
  const [releases, site] = await Promise.all([
    fetchPressReleases(),
    fetchSiteSettings(),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-red">
              Pressrum
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Pressmeddelanden och nyheter från Lystr
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Här samlar vi officiella pressmeddelanden. För pressförfrågningar,
              intervjuer eller bildmaterial, kontakta oss nedan.
            </p>
            <p className="mt-4 text-xs text-white/50">
              <a href="/press/rss.xml" className="hover:text-white">
                RSS-flöde
              </a>
            </p>
          </div>
        </section>

        <section className="bg-lystr-cream">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            {releases.length === 0 ? (
              <p className="text-base text-lystr-muted">
                Inga pressmeddelanden publicerade än.
              </p>
            ) : (
              <ul className="space-y-4">
                {releases.map((r) => (
                  <li key={r._id}>
                    <Link
                      href={`/press/${r.slug}`}
                      className="group block rounded-2xl border border-lystr-line bg-white p-6 transition-colors hover:border-lystr-black md:p-8"
                    >
                      <p className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
                        {formatDate(r.date)}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-lystr-black group-hover:text-lystr-red md:text-2xl">
                        {r.title}
                      </h2>
                      <p className="mt-2 text-base text-lystr-slate">
                        {r.excerpt}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-lystr-black">
                        Läs pressmeddelandet
                        <span aria-hidden>→</span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {site?.pressContactEmail && (
          <section className="bg-white">
            <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
              <div className="rounded-2xl border border-lystr-line bg-lystr-cream p-6 md:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-lystr-muted">
                  Presskontakt
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-lystr-black md:text-3xl">
                  {site.pressContactName ?? "Lystr Press"}
                </h2>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
                      E-post
                    </dt>
                    <dd className="mt-1 text-base">
                      <a
                        href={`mailto:${site.pressContactEmail}`}
                        className="text-lystr-black hover:text-lystr-red"
                      >
                        {site.pressContactEmail}
                      </a>
                    </dd>
                  </div>
                  {site.pressContactPhone && (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
                        Telefon
                      </dt>
                      <dd className="mt-1 text-base">
                        <a
                          href={`tel:${site.pressContactPhone.replaceAll(" ", "").replaceAll("-", "")}`}
                          className="text-lystr-black hover:text-lystr-red"
                        >
                          {site.pressContactPhone}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
