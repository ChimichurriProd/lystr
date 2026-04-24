import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleFilter } from "@/components/article-filter";
import { fetchArticles } from "../../../sanity/lib/fetch";

export const metadata = {
  title: "Artiklar · Lystr",
  description:
    "Guider och artiklar om solenergi, batterilagring och Lystrs energiavtal.",
  alternates: {
    types: {
      "application/rss+xml": "/artiklar/rss.xml",
    },
  },
};

export default async function ArticlesIndexPage() {
  const articles = await fetchArticles();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
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
            <p className="mt-4 text-xs text-white/50">
              <a href="/artiklar/rss.xml" className="hover:text-white">
                RSS-flöde
              </a>
            </p>
          </div>
        </section>

        <section className="bg-lystr-cream">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            <ArticleFilter articles={articles} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
