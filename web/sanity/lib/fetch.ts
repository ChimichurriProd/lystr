import { getClient } from "./client";
import {
  activeCampaignQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  articlesIndexQuery,
  calculatorSettingsQuery,
  faqHomeQuery,
  partnersQuery,
  pressReleaseBySlugQuery,
  pressReleaseSlugsQuery,
  pressReleasesIndexQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  ArticleDetail,
  ArticleSummary,
  CalculatorSettings,
  CampaignSummary,
  FaqEntry,
  PartnerSummary,
  PressReleaseDetail,
  PressReleaseSummary,
  SiteSettings,
} from "./types";

/**
 * All fetches use Next.js 16 cache tags so a Sanity publish can trigger
 * precise revalidation via a webhook. When Sanity is not configured,
 * every fetcher returns an empty/null value so the site keeps working.
 */

const tags = {
  articles: ["sanity:articles"],
  pressReleases: ["sanity:press"],
  partners: ["sanity:partners"],
  faq: ["sanity:faq"],
  calculator: ["sanity:calculator"],
  site: ["sanity:site"],
  campaigns: ["sanity:campaigns"],
};

export async function fetchArticles(): Promise<ArticleSummary[]> {
  const c = getClient();
  if (!c) return [];
  return c.fetch(articlesIndexQuery, {}, { next: { tags: tags.articles } });
}

export async function fetchArticleSlugs(): Promise<string[]> {
  const c = getClient();
  if (!c) return [];
  return c.fetch(articleSlugsQuery, {}, { next: { tags: tags.articles } });
}

export async function fetchArticle(
  slug: string,
): Promise<ArticleDetail | null> {
  const c = getClient();
  if (!c) return null;
  return c.fetch(
    articleBySlugQuery,
    { slug },
    { next: { tags: tags.articles } },
  );
}

export async function fetchPressReleases(): Promise<PressReleaseSummary[]> {
  const c = getClient();
  if (!c) return [];
  return c.fetch(
    pressReleasesIndexQuery,
    {},
    { next: { tags: tags.pressReleases } },
  );
}

export async function fetchPressReleaseSlugs(): Promise<string[]> {
  const c = getClient();
  if (!c) return [];
  return c.fetch(
    pressReleaseSlugsQuery,
    {},
    { next: { tags: tags.pressReleases } },
  );
}

export async function fetchPressRelease(
  slug: string,
): Promise<PressReleaseDetail | null> {
  const c = getClient();
  if (!c) return null;
  return c.fetch(
    pressReleaseBySlugQuery,
    { slug },
    { next: { tags: tags.pressReleases } },
  );
}

export async function fetchPartners(): Promise<PartnerSummary[]> {
  const c = getClient();
  if (!c) return [];
  return c.fetch(partnersQuery, {}, { next: { tags: tags.partners } });
}

export async function fetchFaq(): Promise<FaqEntry[]> {
  const c = getClient();
  if (!c) return [];
  return c.fetch(faqHomeQuery, {}, { next: { tags: tags.faq } });
}

export async function fetchCalculatorSettings(): Promise<CalculatorSettings | null> {
  const c = getClient();
  if (!c) return null;
  return c.fetch(
    calculatorSettingsQuery,
    {},
    { next: { tags: tags.calculator } },
  );
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const c = getClient();
  if (!c) return null;
  return c.fetch(siteSettingsQuery, {}, { next: { tags: tags.site } });
}

export async function fetchActiveCampaign(): Promise<CampaignSummary | null> {
  const c = getClient();
  if (!c) return null;
  return c.fetch(activeCampaignQuery, {}, { next: { tags: tags.campaigns } });
}
