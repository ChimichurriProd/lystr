import { toHTML } from "@portabletext/to-html";
import {
  fetchPressReleases,
  fetchPressRelease,
} from "../../../../sanity/lib/fetch";
import { buildRssXml } from "@/lib/rss";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 600;

export async function GET() {
  const summaries = await fetchPressReleases();
  const details = await Promise.all(
    summaries.map((s) => fetchPressRelease(s.slug)),
  );

  const xml = buildRssXml({
    title: `${SITE_NAME} · Press`,
    description: "Officiella pressmeddelanden från Lystr.",
    link: `${SITE_URL}/press`,
    feedUrl: `${SITE_URL}/press/rss.xml`,
    items: details
      .filter((r): r is NonNullable<typeof r> => Boolean(r))
      .map((r) => ({
        title: r.title,
        url: `${SITE_URL}/press/${r.slug}`,
        date: r.date,
        description: r.excerpt,
        contentHtml: toHTML(r.body),
        categories: ["Pressmeddelande"],
      })),
  });

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=600, s-maxage=600",
    },
  });
}
