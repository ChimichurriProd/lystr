import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleBody } from "@/components/article-body";
import { pressReleases, pressContact } from "@/content/press";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return pressReleases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const release = pressReleases.find((r) => r.slug === slug);
  if (!release) return { title: "Pressmeddelande saknas · Lystr" };
  return {
    title: `${release.title} · Lystr press`,
    description: release.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PressReleasePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const release = pressReleases.find((r) => r.slug === slug);
  if (!release) notFound();

  const contact = release.contact ?? pressContact;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-lystr-black text-white">
          <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
            <Link
              href="/press"
              className="text-sm text-white/60 hover:text-white"
            >
              ← Tillbaka till pressrum
            </Link>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.12em] text-lystr-red">
              Pressmeddelande · {formatDate(release.date)}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {release.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              {release.excerpt}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white">
          <div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-20">
            <ArticleBody blocks={release.body} />

            <div className="mt-16 rounded-2xl border border-lystr-line bg-lystr-cream p-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-lystr-muted">
                Presskontakt
              </p>
              <p className="mt-2 text-base font-semibold text-lystr-black">
                {contact.name}
              </p>
              <p className="mt-2 text-sm text-lystr-slate">
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-lystr-red"
                >
                  {contact.email}
                </a>
                {contact.phone && (
                  <>
                    {" · "}
                    <a
                      href={`tel:${contact.phone.replaceAll(" ", "").replaceAll("-", "")}`}
                      className="hover:text-lystr-red"
                    >
                      {contact.phone}
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
