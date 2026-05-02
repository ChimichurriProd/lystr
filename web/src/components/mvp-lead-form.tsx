"use client";

import { useActionState } from "react";
import { submitMvpLead, type MvpLeadResult } from "@/app/actions/mvp-lead";
import { AddressAutocomplete } from "./address-autocomplete";

/**
 * Five-field MVP lead form. Submits via a server action, server-side
 * validates, then redirects to /tack on success. Validation errors
 * come back inline; the previously typed values are preserved so the
 * user doesn't lose their input.
 */
export function MvpLeadForm() {
  const [state, action] = useActionState<MvpLeadResult | null, FormData>(
    submitMvpLead,
    null,
  );

  const values =
    state && state.ok === false ? state.values : ({} as Record<string, string>);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-3xl border bg-white p-6 md:p-8"
      style={{
        borderColor: "var(--border)",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.25)",
      }}
    >
      <div>
        <p
          className="m-0 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--eyebrow-color)" }}
        >
          Få en gratis energirådgivning
        </p>
        <h2
          className="m-0 mt-2 font-display text-[22px] font-semibold tracking-[-0.01em] md:text-[26px]"
          style={{ color: "var(--fg-1)" }}
        >
          Vi ringer upp inom 1–2 arbetsdagar.
        </h2>
      </div>

      <Field
        name="name"
        label="Namn"
        placeholder="Anders Andersson"
        autoComplete="name"
        defaultValue={values.name}
      />
      <Field
        name="phone"
        label="Telefon"
        type="tel"
        placeholder="070 123 45 67"
        autoComplete="tel"
        defaultValue={values.phone}
      />
      <Field
        name="email"
        label="E-post"
        type="email"
        placeholder="anders@example.se"
        autoComplete="email"
        defaultValue={values.email}
      />
      <AddressAutocomplete
        fieldId="mvp-address"
        defaults={{
          address: values.address,
          postcode: values.postcode,
          city: values.city,
        }}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="mvp-message"
          className="text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          Meddelande
          <span className="ml-2 normal-case tracking-normal text-[11px]">
            (valfritt)
          </span>
        </label>
        <textarea
          id="mvp-message"
          name="message"
          rows={3}
          defaultValue={values.message}
          placeholder="T.ex. Hur ser det ut för min villa? Vi har värmepump."
          className="rounded-xl border px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-1)",
            color: "var(--fg-1)",
          }}
        />
      </div>

      {state && state.ok === false && (
        <p
          className="m-0 rounded-lg px-3 py-2 text-[13px]"
          style={{
            background: "var(--color-lystr-tomato-tint)",
            color: "var(--color-lystr-tomato-deep)",
          }}
          role="alert"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-lystr-tomato px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-lystr-tomato-hover"
      >
        Boka rådgivning →
      </button>

      <p
        className="m-0 text-center text-[12px]"
        style={{ color: "var(--fg-3)" }}
      >
        Ingen kreditupplysning. Inga förpliktelser.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={`mvp-${name}`}
        className="text-[12px] font-medium uppercase tracking-[0.12em]"
        style={{ color: "var(--fg-3)" }}
      >
        {label}
      </label>
      <input
        id={`mvp-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue ?? ""}
        required
        className="rounded-xl border px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-1)",
          color: "var(--fg-1)",
        }}
      />
    </div>
  );
}
