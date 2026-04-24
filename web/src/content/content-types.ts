/**
 * Shared content primitives for press releases and articles.
 * Each body is an array of typed blocks; <ArticleBody /> renders them.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "hr" };

export type PressRelease = {
  slug: string;
  title: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  excerpt: string;
  body: ContentBlock[];
  /** Optional contact for press. Defaults to site-level press contact. */
  contact?: { name: string; email: string; phone?: string };
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  category?: string;
  excerpt: string;
  body: ContentBlock[];
};
