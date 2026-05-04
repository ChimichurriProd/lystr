/**
 * Thin Monday.com client. One mutation (`create_item`), one fetch
 * call, no SDK. Designed to fail gracefully — if Monday is down or
 * misconfigured, callers should log and move on, not block the user.
 *
 * Setup:
 *   1. Get an API token (avatar → Developers → My access tokens).
 *   2. Create a board with columns matching the env keys below.
 *   3. Run `pnpm tsx scripts/list-monday-columns.ts` (see scripts/)
 *      to print column IDs, then paste them into .env.local.
 */

const MONDAY_API = "https://api.monday.com/v2";
const MONDAY_API_VERSION = "2024-01";

export type LystrLeadInput = {
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  message: string;
};

type ColumnIds = {
  phone?: string;
  email?: string;
  address?: string;
  postcode?: string;
  city?: string;
  state?: string;
  message?: string;
};

function getColumnIds(): ColumnIds {
  return {
    phone: process.env.MONDAY_COL_PHONE,
    email: process.env.MONDAY_COL_EMAIL,
    address: process.env.MONDAY_COL_ADDRESS,
    postcode: process.env.MONDAY_COL_POSTCODE,
    city: process.env.MONDAY_COL_CITY,
    state: process.env.MONDAY_COL_STATE,
    message: process.env.MONDAY_COL_MESSAGE,
  };
}

/** True if Monday env is configured enough to attempt a write. */
export function isMondayConfigured(): boolean {
  return Boolean(process.env.MONDAY_API_TOKEN && process.env.MONDAY_BOARD_ID);
}

export async function createLystrLead(input: LystrLeadInput): Promise<string> {
  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID;
  if (!token || !boardId) {
    throw new Error(
      "Monday env vars missing — set MONDAY_API_TOKEN and MONDAY_BOARD_ID",
    );
  }

  const cols = getColumnIds();
  const columnValues: Record<string, unknown> = {};

  // Each column type expects its own value shape — Monday rejects
  // mismatches. Skip anything we don't have a column ID for.
  if (cols.phone && input.phone) {
    // Monday's phone column rejects formatting characters. Strip
    // anything that's not a digit or a leading + so "070 123 45 67"
    // becomes "0701234567".
    const cleaned = input.phone.replace(/[^\d+]/g, "");
    columnValues[cols.phone] = {
      phone: cleaned,
      countryShortName: "SE",
    };
  }
  if (cols.email && input.email) {
    columnValues[cols.email] = { email: input.email, text: input.email };
  }
  if (cols.address && input.address) {
    columnValues[cols.address] = input.address;
  }
  if (cols.postcode && input.postcode) {
    columnValues[cols.postcode] = input.postcode;
  }
  if (cols.city && input.city) {
    columnValues[cols.city] = input.city;
  }
  if (cols.state && input.state) {
    columnValues[cols.state] = input.state;
  }
  if (cols.message && input.message) {
    columnValues[cols.message] = input.message;
  }

  const mutation = `
    mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        item_name: $itemName,
        column_values: $columnValues
      ) {
        id
      }
    }
  `;

  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      "API-Version": MONDAY_API_VERSION,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        boardId,
        itemName: input.name,
        columnValues: JSON.stringify(columnValues),
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Monday API HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    data?: { create_item?: { id: string } };
    errors?: Array<{ message: string }>;
  };

  if (data.errors?.length) {
    throw new Error(
      `Monday API: ${data.errors.map((e) => e.message).join(", ")}`,
    );
  }
  if (!data.data?.create_item?.id) {
    throw new Error("Monday API: no item id in response");
  }
  return data.data.create_item.id;
}

/**
 * Fetch all columns on a board (id, title, type) — used by the
 * `list-monday-columns` script so you can copy the IDs into .env.
 */
export async function listBoardColumns(): Promise<
  Array<{ id: string; title: string; type: string }>
> {
  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID;
  if (!token || !boardId) {
    throw new Error("Monday env vars missing");
  }

  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      "API-Version": MONDAY_API_VERSION,
    },
    body: JSON.stringify({
      query: `query ($boardId: [ID!]) {
        boards(ids: $boardId) {
          columns { id title type }
        }
      }`,
      variables: { boardId: [boardId] },
    }),
  });

  const data = (await res.json()) as {
    data?: {
      boards?: Array<{
        columns?: Array<{ id: string; title: string; type: string }>;
      }>;
    };
    errors?: Array<{ message: string }>;
  };

  if (data.errors?.length) {
    throw new Error(data.errors.map((e) => e.message).join(", "));
  }
  return data.data?.boards?.[0]?.columns ?? [];
}
