import { escapeHtml } from "./blocks-to-html";
import { SITE_URL } from "./site";

export type RssItem = {
  title: string;
  url: string; // absolute
  date: string; // ISO yyyy-mm-dd
  description: string; // plain excerpt or sanitised text
  contentHtml?: string; // full HTML body (optional)
  author?: string;
  categories?: string[];
};

export type RssChannel = {
  title: string;
  description: string;
  link: string; // absolute URL of the channel page
  feedUrl: string; // absolute self URL of this RSS feed
  language?: string;
  items: RssItem[];
};

function toRfc822(iso: string): string {
  // Dates are yyyy-mm-dd; treat as midnight UTC so feed readers don't drift.
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toUTCString();
}

function itemXml(it: RssItem): string {
  const categoriesXml = (it.categories ?? [])
    .map((c) => `      <category>${escapeHtml(c)}</category>`)
    .join("\n");

  const description = `<description><![CDATA[${it.description}]]></description>`;
  const content = it.contentHtml
    ? `<content:encoded><![CDATA[${it.contentHtml}]]></content:encoded>`
    : "";
  const author = it.author
    ? `<dc:creator><![CDATA[${it.author}]]></dc:creator>`
    : "";

  return `    <item>
      <title>${escapeHtml(it.title)}</title>
      <link>${it.url}</link>
      <guid isPermaLink="true">${it.url}</guid>
      <pubDate>${toRfc822(it.date)}</pubDate>
      ${description}
      ${content}
      ${author}
${categoriesXml}
    </item>`;
}

export function buildRssXml(channel: RssChannel): string {
  const items = channel.items.map(itemXml).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeHtml(channel.title)}</title>
    <description>${escapeHtml(channel.description)}</description>
    <link>${channel.link}</link>
    <atom:link href="${channel.feedUrl}" rel="self" type="application/rss+xml" />
    <language>${channel.language ?? "sv-SE"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>${SITE_URL}</generator>
${items}
  </channel>
</rss>`;
}
