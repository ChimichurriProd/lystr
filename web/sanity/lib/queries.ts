import { groq } from "next-sanity";

/* ---------- Articles ---------- */

export const articlesIndexQuery = groq`
*[_type == "article"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  category,
  "author": author->{name}
}`;

export const articleBySlugQuery = groq`
*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  category,
  body,
  "author": author->{name, role, linkedin, avatar, bio}
}`;

export const articleSlugsQuery = groq`*[_type == "article" && defined(slug.current)].slug.current`;

/* ---------- Press releases ---------- */

export const pressReleasesIndexQuery = groq`
*[_type == "pressRelease"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt
}`;

export const pressReleaseBySlugQuery = groq`
*[_type == "pressRelease" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  body,
  contactOverride
}`;

export const pressReleaseSlugsQuery = groq`*[_type == "pressRelease" && defined(slug.current)].slug.current`;

/* ---------- Partners ---------- */

export const partnersQuery = groq`
*[_type == "partner"] | order(order asc, name asc) {
  _id,
  name,
  relationship,
  description,
  url,
  logo
}`;

/* ---------- FAQ ---------- */

export const faqHomeQuery = groq`
*[_type == "faq" && showOnHome == true] | order(order asc) {
  _id,
  question,
  answer
}`;

/* ---------- Calculator settings ---------- */

export const calculatorSettingsQuery = groq`
*[_type == "calculatorSettings"][0] {
  contractYears,
  postContractYears,
  postContractRatio,
  houseValueIncrease,
  billPresets,
  phases,
  insightHeadline,
  insightBody,
  ineligibleTitle,
  ineligibleBody,
  disclaimerTitle,
  disclaimerBody
}`;

/* ---------- Site settings ---------- */

export const siteSettingsQuery = groq`
*[_type == "siteSettings"][0] {
  pressContactName,
  pressContactEmail,
  pressContactPhone,
  partnersIntroEyebrow,
  partnersIntroTitle,
  partnersIntroSubtitle
}`;

/* ---------- Active campaign (at most one) ---------- */

export const activeCampaignQuery = groq`
*[_type == "campaign" && status == "active"
  && (!defined(startDate) || startDate <= now())
  && (!defined(endDate) || endDate >= now())
] | order(_updatedAt desc) [0] {
  _id,
  title,
  "slug": slug.current,
  banner
}`;
