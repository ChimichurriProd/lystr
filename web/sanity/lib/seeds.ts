import type { PortableTextBlock } from "@portabletext/react";
import { articles as localArticles } from "@/content/articles";
import {
  pressReleases as localPressReleases,
  pressContact,
} from "@/content/press";
import type { ContentBlock } from "@/content/content-types";
import type {
  ArticleDetail,
  ArticleSummary,
  PressReleaseDetail,
  PressReleaseSummary,
  SiteSettings,
} from "./types";

/**
 * Demo seeds — used when Sanity isn't configured. Lets the newsroom,
 * article and press detail pages render real content for local dev,
 * design demos and stakeholder previews. The Sanity fetchers fall back
 * to these whenever `getClient()` returns null. As soon as Sanity is
 * wired up, the live data takes over and these become inert.
 */

let _key = 0;
const k = () => `seed-${++_key}`;

function blocksToPortableText(blocks: ContentBlock[]): PortableTextBlock[] {
  const out: PortableTextBlock[] = [];
  for (const b of blocks) {
    if (b.type === "p") {
      out.push({
        _type: "block",
        _key: k(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: k(), text: b.text, marks: [] }],
      } as unknown as PortableTextBlock);
    } else if (b.type === "h2" || b.type === "h3") {
      out.push({
        _type: "block",
        _key: k(),
        style: b.type,
        markDefs: [],
        children: [{ _type: "span", _key: k(), text: b.text, marks: [] }],
      } as unknown as PortableTextBlock);
    } else if (b.type === "ul") {
      for (const item of b.items) {
        out.push({
          _type: "block",
          _key: k(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: k(), text: item, marks: [] }],
        } as unknown as PortableTextBlock);
      }
    } else if (b.type === "quote") {
      const children: { _type: string; _key: string; text: string; marks: string[] }[] = [
        { _type: "span", _key: k(), text: b.text, marks: [] },
      ];
      if (b.source) {
        children.push({
          _type: "span",
          _key: k(),
          text: ` — ${b.source}`,
          marks: ["em"],
        });
      }
      out.push({
        _type: "block",
        _key: k(),
        style: "blockquote",
        markDefs: [],
        children,
      } as unknown as PortableTextBlock);
    }
    // "hr" has no PortableText equivalent in our renderer — skip.
  }
  return out;
}

export function getSeedArticles(): ArticleSummary[] {
  return localArticles
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => ({
      _id: `seed-article-${a.slug}`,
      title: a.title,
      slug: a.slug,
      date: a.date,
      excerpt: a.excerpt,
      category: a.category,
      author: a.author ? { name: a.author } : undefined,
    }));
}

export function getSeedArticleSlugs(): string[] {
  return localArticles.map((a) => a.slug);
}

export function getSeedArticle(slug: string): ArticleDetail | null {
  const a = localArticles.find((x) => x.slug === slug);
  if (!a) return null;
  return {
    _id: `seed-article-${a.slug}`,
    title: a.title,
    slug: a.slug,
    date: a.date,
    excerpt: a.excerpt,
    category: a.category,
    body: blocksToPortableText(a.body),
    author: a.author
      ? {
          name: a.author,
          linkedin: a.authorUrl,
        }
      : undefined,
  };
}

export function getSeedPressReleases(): PressReleaseSummary[] {
  return localPressReleases
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((r) => ({
      _id: `seed-press-${r.slug}`,
      title: r.title,
      slug: r.slug,
      date: r.date,
      excerpt: r.excerpt,
    }));
}

export function getSeedPressReleaseSlugs(): string[] {
  return localPressReleases.map((r) => r.slug);
}

export function getSeedPressRelease(slug: string): PressReleaseDetail | null {
  const r = localPressReleases.find((x) => x.slug === slug);
  if (!r) return null;
  return {
    _id: `seed-press-${r.slug}`,
    title: r.title,
    slug: r.slug,
    date: r.date,
    excerpt: r.excerpt,
    body: blocksToPortableText(r.body),
    contactOverride: r.contact
      ? {
          name: r.contact.name,
          email: r.contact.email,
          phone: r.contact.phone,
        }
      : undefined,
  };
}

export function getSeedSiteSettings(): SiteSettings {
  return {
    pressContactName: pressContact.name,
    pressContactEmail: pressContact.email,
    pressContactPhone: pressContact.phone,
  };
}
