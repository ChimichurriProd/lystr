/**
 * Manually create a test row on the Monday board to verify the
 * integration end-to-end. Reads env from `.env.local` and calls the
 * same `createLystrLead` helper the form action uses.
 *
 * Run with:  pnpm tsx scripts/test-monday-submit.ts
 *
 * If the call fails Monday's error message is printed verbatim, which
 * is much easier to debug than chasing Vercel runtime logs after a
 * failed real submission.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { createLystrLead } from "../src/lib/monday";

async function main() {
  const id = await createLystrLead({
    name: "TEST submission",
    phone: "070 123 45 67",
    email: "test@example.com",
    address: "Testvägen 1",
    postcode: "111 11",
    city: "Stockholm",
    state: "Stockholms län",
    message: "Created from scripts/test-monday-submit.ts",
  });
  console.log("✓ Created Monday item:", id);
}

main().catch((err) => {
  console.error("✗ FAIL:", err instanceof Error ? err.message : err);
  process.exit(1);
});
