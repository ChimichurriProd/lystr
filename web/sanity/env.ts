/**
 * Sanity environment variables.
 *
 * Set these in .env.local (gitignored) before running the app:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   — from sanity.io/manage (the project you created)
 *   NEXT_PUBLIC_SANITY_DATASET      — "production" by default
 *   SANITY_API_READ_TOKEN           — optional, only needed for draft/preview fetches
 *
 * The project is created on Chimichurri's Sanity account first. When Lystr
 * upgrades to the full CMS offering, we migrate the dataset to their org.
 *
 * These exports are intentionally permissive: missing env does not throw at
 * module load. Instead, `isConfigured` is false and the fetch/image layers
 * gracefully fall back so public pages still render. The Studio route
 * (/studio) will surface a clear error if env is missing.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const readToken = process.env.SANITY_API_READ_TOKEN;

export const isConfigured = Boolean(projectId && dataset);
