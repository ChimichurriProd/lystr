import { createClient, type SanityClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  isConfigured,
  projectId,
  readToken,
} from "../env";

let _client: SanityClient | null = null;
let _preview: SanityClient | null = null;

/**
 * Returns a Sanity client or null if env is not configured yet.
 * Callers should handle `null` as an empty/fallback state so the site
 * keeps working before the Sanity project exists.
 */
export function getClient(): SanityClient | null {
  if (!isConfigured) return null;
  if (_client) return _client;
  _client = createClient({
    projectId: projectId!,
    dataset: dataset!,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return _client;
}

export function getPreviewClient(): SanityClient | null {
  if (!isConfigured || !readToken) return null;
  if (_preview) return _preview;
  _preview = createClient({
    projectId: projectId!,
    dataset: dataset!,
    apiVersion,
    useCdn: false,
    token: readToken,
    perspective: "previewDrafts",
  });
  return _preview;
}
