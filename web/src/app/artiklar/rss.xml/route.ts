import { toHTML } from "@portabletext/to-html";
import {
  fetchArticles,
  fetchArticle,
} from "../../../../sanity/lib/fetch";
import { buildRssXml } from "@/lib/rss";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 600;

export async function GET() {
  const summaries = await fetchArticles();
  const details = await Promise.all(
    summaries.map((s) => fetchArticle(s.slug)),
  );

  const xml = buildRssXml({
    title: `${SITE_NAME} · Artiklar`,
    description:
      "Guider och artiklar om solenergi, batterilagring och Lystrs energiavtal.",
    link: `${SITE_URL}/artiklar`,
    feedUrl: `${SITE_URL}/artiklar/rss.xml`,
    items: details
      .filter((a): a is NonNullable<typeof a> => Boolean(a))
      .map((a) => ({
        title: a.title,
        url: `${SITE_URL}/artiklar/${a.slug}`,
        date: a.date,
        description: a.excerpt,
        contentHtml: toHTML(a.body),
        author: a.author?.name,
        categories: a.category ? [a.category] : undefined,
      })),
  });

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=600, s-maxage=600",
    },
  });
}
