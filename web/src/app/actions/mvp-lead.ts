"use server";

import { redirect } from "next/navigation";
import { createLystrLead, isMondayConfigured } from "@/lib/monday";

/**
 * MVP lead-capture action. Five visible fields plus structured
 * address fields populated by the Photon autocomplete. Writes to
 * Monday.com when configured; otherwise just logs and continues.
 *
 * Failure to write to Monday is logged but does NOT block the user:
 * we never want the customer to see a CRM-down error after submitting
 * a lead. The console log is the durable backup.
 */

export type MvpLeadResult =
  | { ok: true }
  | { ok: false; error: string; values: Record<string, string> };

function validate(data: {
  name: string;
  phone: string;
  email: string;
  address: string;
}): string | null {
  if (!data.name || data.name.trim().length < 2)
    return "Ange ditt namn så vi vet vem vi ringer upp.";
  if (!data.phone || data.phone.replace(/\D/g, "").length < 7)
    return "Ange ett telefonnummer som vi kan nå dig på.";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Ange en giltig e-postadress.";
  if (!data.address || data.address.trim().length < 4)
    return "Ange din adress så vi kan göra en första takanalys.";
  return null;
}

export async function submitMvpLead(
  _prev: MvpLeadResult | null,
  formData: FormData,
): Promise<MvpLeadResult> {
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    // Structured address — present only when the user picked a Photon
    // autocomplete suggestion. Empty strings if they typed manually.
    postcode: String(formData.get("postcode") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    state: String(formData.get("state") ?? "").trim(),
    lat: String(formData.get("lat") ?? "").trim(),
    lon: String(formData.get("lon") ?? "").trim(),
  };

  const error = validate(data);
  if (error) {
    return { ok: false, error, values: data };
  }

  const log = {
    receivedAt: new Date().toISOString(),
    ...data,
  };
  console.log("[mvp-lead]", log);

  if (isMondayConfigured()) {
    try {
      const itemId = await createLystrLead(data);
      console.log("[mvp-lead] Monday item created:", itemId);
    } catch (err) {
      // Don't block the user — they got their thank-you page. The
      // console log above is the durable backup until we sort out
      // whatever's wrong with Monday.
      console.error("[mvp-lead] Monday create failed:", err);
    }
  }

  redirect("/tack");
}
