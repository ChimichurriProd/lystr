import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleBody } from "@/components/article-body";
import { articles } from "@/content/articles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Artikel saknas · Lystr" };
  return {
    title: `${article.title} · Lystr`,
    description: article.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            <Link
              href="/artiklar"
              className="text-sm text-white/60 hover:text-white"
            >
              ← Tillbaka till artiklar
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-white/70">
              {article.category && (
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {article.category}
                </span>
              )}
              <span>{formatDate(article.date)}</span>
              {article.author && <span>· {article.author}</span>}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              {article.excerpt}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-20">
            <ArticleBody blocks={article.body} />

            {article.author && (
              <div className="mt-16 flex items-center gap-4 border-t border-lystr-line pt-6">
                {article.authorImage ? (
                  <Image
                    src={article.authorImage}
                    alt={article.author}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lystr-cream text-lg font-semibold text-lystr-black">
                    {article.author
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-lystr-muted">
                    Skribent
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-lystr-black">
                    {article.authorUrl ? (
                      <a
                        href={article.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-lystr-red"
                      >
                        {article.author} ↗
                      </a>
                    ) : (
                      article.author
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Back to calculator CTA */}
        <section className="bg-lystr-cream">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-12 md:px-10 md:py-16">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-lystr-line bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="text-base text-lystr-slate">
                Nyfiken på vad ett avtal skulle kosta för ditt hus?
              </p>
              <Link
                href="/#kalkylator"
                className="inline-flex h-12 items-center rounded-full bg-lystr-red px-7 text-base font-semibold text-white hover:bg-lystr-red-hover"
              >
                Räkna ut din besparing →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
