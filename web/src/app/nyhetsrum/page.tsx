import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  NewsroomFeed,
  type NewsroomItem,
} from "@/components/newsroom-feed";
import {
  fetchArticles,
  fetchPressReleases,
  fetchSiteSettings,
} from "../../../sanity/lib/fetch";

export const metadata = {
  title: "Nyhetsrum · Lystr",
  description:
    "Pressmeddelanden, artiklar och guider om solenergi, batterilagring och Lystrs energiavtal. Allt på ren svenska.",
  alternates: {
    types: {
      "application/rss+xml": "/artiklar/rss.xml",
    },
  },
};

export default async function NewsroomPage() {
  const [articles, releases, site] = await Promise.all([
    fetchArticles(),
    fetchPressReleases(),
    fetchSiteSettings(),
  ]);

  const items: NewsroomItem[] = [
    ...releases.map((r) => ({
      _id: r._id,
      kind: "press" as const,
      title: r.title,
      slug: r.slug,
      href: `/press/${r.slug}`,
      date: r.date,
      excerpt: r.excerpt,
    })),
    ...articles.map((a) => ({
      _id: a._id,
      kind: "article" as const,
      title: a.title,
      slug: a.slug,
      href: `/artiklar/${a.slug}`,
      date: a.date,
      excerpt: a.excerpt,
      category: a.category,
    })),
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ---------- Headline band ---------- */}
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-lystr-tomato">
              Nyhetsrum
            </p>
            <h1
              className="mt-3 font-display font-semibold leading-tight tracking-tight"
              style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
            >
              Pressmeddelanden, artiklar och guider — på ren svenska.
            </h1>
            <p
              className="mt-4 max-w-2xl text-lg"
              style={{ color: "var(--on-ink-2)" }}
            >
              Här samlar vi allt vi publicerar. Officiella pressmeddelanden för
              media och rakt-på-sak artiklar för dig som vill förstå solenergi,
              batterier och husekonomi utan branschjargon.
            </p>
            <p
              className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs"
              style={{ color: "var(--on-ink-3)" }}
            >
              <a
                href="/press/rss.xml"
                className="no-underline hover:text-white"
                style={{ color: "var(--on-ink-3)" }}
              >
                Press · RSS
              </a>
              <a
                href="/artiklar/rss.xml"
                className="no-underline hover:text-white"
                style={{ color: "var(--on-ink-3)" }}
              >
                Artiklar · RSS
              </a>
            </p>
          </div>
        </section>

        {/* ---------- Feed ---------- */}
        <section style={{ background: "var(--bg-2)" }}>
          <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
            {items.length === 0 ? (
              <p className="text-base" style={{ color: "var(--fg-3)" }}>
                Inget publicerat ännu.
              </p>
            ) : (
              <NewsroomFeed items={items} />
            )}
          </div>
        </section>

        {/* ---------- Press contact ---------- */}
        {site?.pressContactEmail && (
          <section className="bg-white">
            <div className="mx-auto max-w-(--container-marketing) px-[22px] py-16 md:px-8 md:py-20">
              <div
                className="rounded-2xl border p-6 md:p-10"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-2)",
                }}
              >
                <p
                  className="text-xs font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--fg-3)" }}
                >
                  Presskontakt
                </p>
                <h2
                  className="mt-2 font-display text-2xl font-semibold md:text-3xl"
                  style={{ color: "var(--fg-1)" }}
                >
                  {site.pressContactName ?? "Lystr Press"}
                </h2>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: "var(--fg-3)" }}
                    >
                      E-post
                    </dt>
                    <dd className="mt-1 text-base">
                      <a
                        href={`mailto:${site.pressContactEmail}`}
                        className="no-underline hover:text-lystr-tomato"
                        style={{ color: "var(--fg-1)" }}
                      >
                        {site.pressContactEmail}
                      </a>
                    </dd>
                  </div>
                  {site.pressContactPhone && (
                    <div>
                      <dt
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "var(--fg-3)" }}
                      >
                        Telefon
                      </dt>
                      <dd className="mt-1 text-base">
                        <a
                          href={`tel:${site.pressContactPhone.replaceAll(" ", "").replaceAll("-", "")}`}
                          className="no-underline hover:text-lystr-tomato"
                          style={{ color: "var(--fg-1)" }}
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
