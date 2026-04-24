import { pressReleases } from "@/content/press";
import { blocksToHtml } from "@/lib/blocks-to-html";
import { buildRssXml } from "@/lib/rss";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const sorted = [...pressReleases].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  const xml = buildRssXml({
    title: `${SITE_NAME} · Press`,
    description: "Officiella pressmeddelanden från Lystr.",
    link: `${SITE_URL}/press`,
    feedUrl: `${SITE_URL}/press/rss.xml`,
    items: sorted.map((r) => ({
      title: r.title,
      url: `${SITE_URL}/press/${r.slug}`,
      date: r.date,
      description: r.excerpt,
      contentHtml: blocksToHtml(r.body),
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
