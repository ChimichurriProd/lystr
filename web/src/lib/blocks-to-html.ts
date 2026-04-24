import type { ContentBlock } from "@/content/content-types";

/**
 * Minimal HTML-escape for text that lands in XML / HTML contexts.
 * Enough for RSS item descriptions; not a substitute for a full sanitizer.
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Render a ContentBlock[] body as a simple HTML string suitable for
 * RSS <description> (inside a CDATA section).
 */
export function blocksToHtml(blocks: ContentBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "p":
          return `<p>${escapeHtml(b.text)}</p>`;
        case "h2":
          return `<h2>${escapeHtml(b.text)}</h2>`;
        case "h3":
          return `<h3>${escapeHtml(b.text)}</h3>`;
        case "ul":
          return `<ul>${b.items
            .map((i) => `<li>${escapeHtml(i)}</li>`)
            .join("")}</ul>`;
        case "quote":
          return `<blockquote><p>${escapeHtml(b.text)}</p>${
            b.source ? `<footer>${escapeHtml(b.source)}</footer>` : ""
          }</blockquote>`;
        case "hr":
          return `<hr />`;
      }
    })
    .join("\n");
}
