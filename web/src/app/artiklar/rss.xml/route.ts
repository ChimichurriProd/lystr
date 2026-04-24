import { articles } from "@/content/articles";
import { blocksToHtml } from "@/lib/blocks-to-html";
import { buildRssXml } from "@/lib/rss";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  const xml = buildRssXml({
    title: `${SITE_NAME} · Artiklar`,
    description:
      "Guider och artiklar om solenergi, batterilagring och Lystrs energiavtal.",
    link: `${SITE_URL}/artiklar`,
    feedUrl: `${SITE_URL}/artiklar/rss.xml`,
    items: sorted.map((a) => ({
      title: a.title,
      url: `${SITE_URL}/artiklar/${a.slug}`,
      date: a.date,
      description: a.excerpt,
      contentHtml: blocksToHtml(a.body),
      author: a.author,
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
