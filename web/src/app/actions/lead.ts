"use server";

/**
 * Lead submission server action.
 *
 * TODO: wire to Resend once lystr.se DNS has SPF/DKIM records.
 * Until then this logs to the server console so we can verify the form
 * pipeline works end-to-end in preview deploys.
 */

export type LeadPayload = {
  postnummer: string;
  monthlyBill: number;
  housing: string;
  name: string;
  email: string;
  phone?: string;
};

export type LeadResult =
  | { ok: true }
  | { ok: false; error: string };

function validate(data: Partial<LeadPayload>): string | null {
  if (!data.name || data.name.trim().length < 2) return "Ange ditt namn.";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Ange en giltig e-postadress.";
  if (!data.postnummer || !/^\d{3}\s?\d{2}$/.test(data.postnummer))
    return "Ange ett giltigt postnummer.";
  if (!data.monthlyBill || data.monthlyBill < 100)
    return "Ange en rimlig månadskostnad.";
  if (!data.housing) return "Välj boendeform.";
  return null;
}

export async function submitLead(
  _prevState: LeadResult | null,
  formData: FormData,
): Promise<LeadResult> {
  const payload: Partial<LeadPayload> = {
    postnummer: String(formData.get("postnummer") ?? ""),
    monthlyBill: Number(formData.get("monthlyBill") ?? 0),
    housing: String(formData.get("housing") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: formData.get("phone") ? String(formData.get("phone")) : undefined,
  };

  const error = validate(payload);
  if (error) return { ok: false, error };

  // TODO: replace with Resend send-to-info@lystr.se once DNS is configured.
  console.log("[lead:submitted]", {
    ...payload,
    timestamp: new Date().toISOString(),
  });

  await new Promise((r) => setTimeout(r, 400)); // Simulate network

  return { ok: true };
}
