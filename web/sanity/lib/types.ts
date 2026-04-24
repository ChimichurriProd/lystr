import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Shapes returned by our GROQ queries. Kept narrow on purpose — only what
 * the site actually renders. If you add fields to a schema and a page,
 * add them here too.
 */

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category?: string;
  author?: { name: string };
};

export type AuthorInfo = {
  name: string;
  role?: string;
  linkedin?: string;
  avatar?: SanityImageSource;
  bio?: string;
};

export type ArticleDetail = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category?: string;
  body: PortableTextBlock[];
  author?: AuthorInfo;
};

export type PressReleaseSummary = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
};

export type PressReleaseDetail = PressReleaseSummary & {
  body: PortableTextBlock[];
  contactOverride?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

export type PartnerSummary = {
  _id: string;
  name: string;
  relationship?: string;
  description: string;
  url?: string;
  logo?: SanityImageSource;
};

export type FaqEntry = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
};

export type CalcSegment = { key: string; label: string; share: number };

export type CalculatorSettings = {
  contractYears: number;
  postContractYears: number;
  postContractRatio: number;
  houseValueIncrease: number;
  billPresets: number[];
  phases: {
    todayLabel: string;
    todayCaption: string;
    todayDestination: string;
    todaySegments: CalcSegment[];
    contractLabel: string;
    contractCaption: string;
    contractDestination: string;
    contractSegments: CalcSegment[];
    postLabel: string;
    postCaption: string;
    postDestination: string;
  };
  insightHeadline: string;
  insightBody: string;
  ineligibleTitle: string;
  ineligibleBody: string;
  disclaimerTitle: string;
  disclaimerBody: string;
};

export type SiteSettings = {
  pressContactName?: string;
  pressContactEmail?: string;
  pressContactPhone?: string;
  partnersIntroEyebrow?: string;
  partnersIntroTitle?: string;
  partnersIntroSubtitle?: string;
};

export type CampaignSummary = {
  _id: string;
  title: string;
  slug?: string;
  banner?: {
    text?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
};
