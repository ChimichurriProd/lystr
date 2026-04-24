import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { articles } from "@/content/articles";

export const metadata = {
  title: "Artiklar · Lystr",
  description:
    "Guider och artiklar om solenergi, batterilagring och Lystrs energiavtal.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesIndexPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-red">
              Artiklar
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Guider och artiklar om energi, solceller och Lystr.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Vi skriver om solenergi, batterilagring, husekonomi och allt
              däromkring. Allt på ren svenska, utan krångligt branschspråk.
            </p>
          </div>
        </section>

        {/* Article list */}
        <section className="bg-lystr-cream">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            <ul className="grid gap-6 md:grid-cols-2">
              {sorted.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/artiklar/${a.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-lystr-line bg-white p-6 transition-colors hover:border-lystr-black md:p-8"
                  >
                    <div>
                      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-lystr-muted">
                        {a.category && (
                          <span className="rounded-full bg-lystr-cream px-3 py-1">
                            {a.category}
                          </span>
                        )}
                        <span>{formatDate(a.date)}</span>
                      </div>
                      <h2 className="mt-3 text-xl font-semibold text-lystr-black group-hover:text-lystr-red md:text-2xl">
                        {a.title}
                      </h2>
                      <p className="mt-2 text-base text-lystr-slate">
                        {a.excerpt}
                      </p>
                    </div>
                    <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-lystr-black">
                      Läs artikeln
                      <span aria-hidden>→</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
