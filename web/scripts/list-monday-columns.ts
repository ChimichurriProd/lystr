/**
 * Run with:  pnpm tsx scripts/list-monday-columns.ts
 *
 * Reads MONDAY_API_TOKEN + MONDAY_BOARD_ID from `.env.local` and
 * prints every column on the board (id, title, type). Copy the ids
 * into `.env.local` under MONDAY_COL_* keys so the form action
 * knows which Monday column to write each form field to.
 */

import { config } from "dotenv";
import { listBoardColumns } from "../src/lib/monday";

// Load .env.local (Next.js convention; dotenv looks at .env by default)
config({ path: ".env.local" });

async function main() {
  const cols = await listBoardColumns();
  if (cols.length === 0) {
    console.log("No columns returned. Check board id + token.");
    return;
  }
  console.log("\nColumns on board:\n");
  console.log("ID".padEnd(28), "Type".padEnd(20), "Title");
  console.log("-".repeat(80));
  for (const c of cols) {
    console.log(c.id.padEnd(28), c.type.padEnd(20), c.title);
  }
  console.log("\nPaste the relevant ones into .env.local, e.g.:");
  console.log("  MONDAY_COL_PHONE=phone");
  console.log("  MONDAY_COL_EMAIL=email");
  console.log("  MONDAY_COL_ADDRESS=text");
  console.log("  MONDAY_COL_POSTCODE=text2");
  console.log("  MONDAY_COL_CITY=text3");
  console.log("  MONDAY_COL_STATE=text4");
  console.log("  MONDAY_COL_MESSAGE=long_text\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
