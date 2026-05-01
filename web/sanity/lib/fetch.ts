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
import {
  getSeedArticle,
  getSeedArticleSlugs,
  getSeedArticles,
  getSeedPressRelease,
  getSeedPressReleaseSlugs,
  getSeedPressReleases,
  getSeedSiteSettings,
} from "./seeds";
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
 * precise revalidation via a webhook.
 *
 * Seeds fallback (see `seeds.ts`):
 * - Sanity NOT configured → always use seeds
 * - Sanity configured but empty AND running in dev → use seeds (demo mode)
 * - Sanity configured and has content → use Sanity (production behavior)
 *
 * Production with an empty Sanity dataset still renders empty — that's
 * the honest signal. Demo content only fills gaps in dev.
 */
const isDev = process.env.NODE_ENV === "development";

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
  if (!c) return getSeedArticles();
  const result: ArticleSummary[] = await c.fetch(
    articlesIndexQuery,
    {},
    { next: { tags: tags.articles } },
  );
  if (isDev && result.length === 0) return getSeedArticles();
  return result;
}

export async function fetchArticleSlugs(): Promise<string[]> {
  const c = getClient();
  if (!c) return getSeedArticleSlugs();
  const result: string[] = await c.fetch(
    articleSlugsQuery,
    {},
    { next: { tags: tags.articles } },
  );
  if (isDev && result.length === 0) return getSeedArticleSlugs();
  return result;
}

export async function fetchArticle(
  slug: string,
): Promise<ArticleDetail | null> {
  const c = getClient();
  if (!c) return getSeedArticle(slug);
  const result: ArticleDetail | null = await c.fetch(
    articleBySlugQuery,
    { slug },
    { next: { tags: tags.articles } },
  );
  if (isDev && !result) return getSeedArticle(slug);
  return result;
}

export async function fetchPressReleases(): Promise<PressReleaseSummary[]> {
  const c = getClient();
  if (!c) return getSeedPressReleases();
  const result: PressReleaseSummary[] = await c.fetch(
    pressReleasesIndexQuery,
    {},
    { next: { tags: tags.pressReleases } },
  );
  if (isDev && result.length === 0) return getSeedPressReleases();
  return result;
}

export async function fetchPressReleaseSlugs(): Promise<string[]> {
  const c = getClient();
  if (!c) return getSeedPressReleaseSlugs();
  const result: string[] = await c.fetch(
    pressReleaseSlugsQuery,
    {},
    { next: { tags: tags.pressReleases } },
  );
  if (isDev && result.length === 0) return getSeedPressReleaseSlugs();
  return result;
}

export async function fetchPressRelease(
  slug: string,
): Promise<PressReleaseDetail | null> {
  const c = getClient();
  if (!c) return getSeedPressRelease(slug);
  const result: PressReleaseDetail | null = await c.fetch(
    pressReleaseBySlugQuery,
    { slug },
    { next: { tags: tags.pressReleases } },
  );
  if (isDev && !result) return getSeedPressRelease(slug);
  return result;
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
  if (!c) return getSeedSiteSettings();
  const result: SiteSettings | null = await c.fetch(
    siteSettingsQuery,
    {},
    { next: { tags: tags.site } },
  );
  if (isDev && !result) return getSeedSiteSettings();
  return result;
}

export async function fetchActiveCampaign(): Promise<CampaignSummary | null> {
  const c = getClient();
  if (!c) return null;
  return c.fetch(activeCampaignQuery, {}, { next: { tags: tags.campaigns } });
}
