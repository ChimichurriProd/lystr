/**
 * Embedded Sanity Studio at /studio.
 *
 * The Studio itself is a client-side SPA; Next.js just mounts it here.
 * Config lives at /sanity.config.ts at the app root.
 */

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
