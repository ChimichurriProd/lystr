/**
 * One-shot Monday.com setup. Reads MONDAY_API_TOKEN from .env.local,
 * creates a "Lystr Leads" board, adds all the columns the form
 * expects, and prints the env block to paste back into .env.local.
 *
 * Run with:  pnpm tsx scripts/setup-monday-board.ts
 *
 * Safe to re-run: if you want a fresh board, just delete the old one
 * in Monday's UI first; otherwise this creates a new "Lystr Leads"
 * each run.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const MONDAY_API = "https://api.monday.com/v2";
const MONDAY_API_VERSION = "2024-01";

type GqlResult<T> = { data?: T; errors?: Array<{ message: string }> };

async function gql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = process.env.MONDAY_API_TOKEN;
  if (!token) {
    throw new Error(
      "MONDAY_API_TOKEN missing. Add it to .env.local and try again.",
    );
  }
  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      "API-Version": MONDAY_API_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Monday HTTP ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as GqlResult<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  if (!json.data) {
    throw new Error("Monday returned no data");
  }
  return json.data;
}

const COLUMNS: { title: string; type: string; envKey: string }[] = [
  { title: "Telefon", type: "phone", envKey: "MONDAY_COL_PHONE" },
  { title: "E-post", type: "email", envKey: "MONDAY_COL_EMAIL" },
  { title: "Adress", type: "text", envKey: "MONDAY_COL_ADDRESS" },
  { title: "Postnummer", type: "text", envKey: "MONDAY_COL_POSTCODE" },
  { title: "Ort", type: "text", envKey: "MONDAY_COL_CITY" },
  { title: "Län", type: "text", envKey: "MONDAY_COL_STATE" },
  { title: "Meddelande", type: "long_text", envKey: "MONDAY_COL_MESSAGE" },
  { title: "Status", type: "status", envKey: "MONDAY_COL_STATUS" },
];

async function main() {
  console.log("→ Creating board 'Lystr Leads'…");
  const boardData = await gql<{ create_board: { id: string; name: string } }>(
    `mutation {
      create_board(board_name: "Lystr Leads", board_kind: public) {
        id
        name
      }
    }`,
  );
  const boardId = boardData.create_board.id;
  console.log(`  ✓ Board id: ${boardId}\n`);

  console.log("→ Adding columns…");
  const created: { envKey: string; id: string }[] = [];

  for (const col of COLUMNS) {
    try {
      const data = await gql<{ create_column: { id: string } }>(
        `mutation ($boardId: ID!, $title: String!, $type: ColumnType!) {
          create_column(board_id: $boardId, title: $title, column_type: $type) {
            id
          }
        }`,
        { boardId, title: col.title, type: col.type },
      );
      const id = data.create_column.id;
      console.log(
        `  ✓ ${col.title.padEnd(14)} ${col.type.padEnd(10)}  →  ${id}`,
      );
      created.push({ envKey: col.envKey, id });
    } catch (err) {
      console.warn(
        `  ⚠ ${col.title}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // Look up the account slug so we can print a usable workspace URL.
  // Monday board URLs need the account subdomain — bare monday.com/boards
  // 404s.
  let workspaceUrl = `https://monday.com/boards/${boardId}`;
  try {
    const account = await gql<{ me: { account: { slug: string } } }>(
      `query { me { account { slug } } }`,
    );
    const slug = account.me.account.slug;
    if (slug) workspaceUrl = `https://${slug}.monday.com/boards/${boardId}`;
  } catch {
    /* fall back to bare URL */
  }

  console.log("\n────────────────────────────────────────────────────────");
  console.log("Paste this block into .env.local:");
  console.log("────────────────────────────────────────────────────────\n");
  console.log(`MONDAY_BOARD_ID=${boardId}`);
  for (const c of created) {
    console.log(`${c.envKey}=${c.id}`);
  }
  console.log("\nThen restart `pnpm dev` and submit a test lead.\n");
  console.log(`View the board: ${workspaceUrl}\n`);
}

main().catch((err) => {
  console.error("✗", err instanceof Error ? err.message : err);
  process.exit(1);
});
