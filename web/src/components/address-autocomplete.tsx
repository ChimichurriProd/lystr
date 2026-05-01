"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Swedish address autocomplete backed by Photon (OSM-based, no API
 * key, no signup). Free public endpoint at photon.komoot.io. As the
 * user types, suggestions are fetched (300ms debounce) and rendered
 * in a dropdown. Selecting one fills hidden form fields for postcode,
 * city, region, and lat/lon — but the user can still type freely if
 * Photon doesn't have their address. The raw string is always
 * captured in the `address` field.
 *
 * If quality becomes a problem, swap the fetch URL to a paid service
 * (Mapbox, Google Places, or self-hosted Photon). Field shapes stay.
 */

type Suggestion = {
  label: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  lat?: number;
  lon?: number;
};

type RawFeature = {
  geometry?: { coordinates?: [number, number] };
  properties?: Record<string, unknown>;
};

function getStr(props: Record<string, unknown> | undefined, key: string): string {
  const v = props?.[key];
  return typeof v === "string" ? v : "";
}

function buildSuggestion(f: RawFeature): Suggestion | null {
  const p = f.properties ?? {};
  const country = getStr(p, "country");
  if (country !== "Sverige" && country !== "Sweden") return null;

  const streetName = getStr(p, "street") || getStr(p, "name");
  const housenumber = getStr(p, "housenumber");
  const postcode = getStr(p, "postcode");
  const city = getStr(p, "city") || getStr(p, "county") || getStr(p, "district");
  const state = getStr(p, "state");

  const street = housenumber ? `${streetName} ${housenumber}` : streetName;
  if (!street) return null;

  const labelParts = [
    street,
    [postcode, city].filter(Boolean).join(" "),
    state,
  ].filter(Boolean);

  const coords = f.geometry?.coordinates;
  return {
    label: labelParts.join(", "),
    street,
    postcode,
    city,
    state,
    lon: Array.isArray(coords) ? coords[0] : undefined,
    lat: Array.isArray(coords) ? coords[1] : undefined,
  };
}

export function AddressAutocomplete({
  defaultValue = "",
  fieldId = "mvp-address",
}: {
  defaultValue?: string;
  fieldId?: string;
}) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Close the dropdown when the user clicks outside.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Debounced fetch.
  useEffect(() => {
    if (selected) return; // user just picked; don't fetch again
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
          trimmed,
        )}&limit=8&lang=sv`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data: { features?: RawFeature[] } = await res.json();
        const items = (data.features ?? [])
          .map(buildSuggestion)
          .filter((x): x is Suggestion => Boolean(x))
          .slice(0, 6);
        setSuggestions(items);
        setIsOpen(items.length > 0);
        setHighlighted(0);
      } catch (err) {
        // AbortError is expected during typing — ignore silently.
        if (err instanceof Error && err.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selected]);

  function pick(s: Suggestion) {
    setSelected(s);
    setQuery(s.label);
    setIsOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        id={fieldId}
        name="address"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (selected) setSelected(null);
        }}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={onKeyDown}
        placeholder="Hemvägen 12, Älta"
        autoComplete="street-address"
        required
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={`${fieldId}-list`}
        className="w-full rounded-xl border px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg-1)",
          color: "var(--fg-1)",
        }}
      />

      {/* Hidden fields populated when the user picks a suggestion. */}
      <input type="hidden" name="postcode" value={selected?.postcode ?? ""} />
      <input type="hidden" name="city" value={selected?.city ?? ""} />
      <input type="hidden" name="state" value={selected?.state ?? ""} />
      <input type="hidden" name="lat" value={selected?.lat ?? ""} />
      <input type="hidden" name="lon" value={selected?.lon ?? ""} />

      {/* Confirmation strip — small, mono, when a structured address
          has been captured. */}
      {selected && (
        <p
          className="mt-1.5 font-mono text-[11px]"
          style={{ color: "var(--color-lystr-green-deep)" }}
        >
          ✓{" "}
          {[
            [selected.postcode, selected.city].filter(Boolean).join(" "),
            selected.state,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul
          id={`${fieldId}-list`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-y-auto rounded-xl border bg-white py-1 shadow-2xl"
          style={{ borderColor: "var(--border)" }}
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.label}-${i}`}
              role="option"
              aria-selected={i === highlighted}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(s);
              }}
              onMouseEnter={() => setHighlighted(i)}
              className="cursor-pointer px-3 py-2 text-[13px] leading-snug"
              style={{
                background:
                  i === highlighted
                    ? "var(--color-lystr-tomato-tint)"
                    : "transparent",
                color: i === highlighted
                  ? "var(--color-lystr-tomato-deep)"
                  : "var(--fg-1)",
              }}
            >
              <span className="block font-medium">{s.street}</span>
              <span
                className="block font-mono text-[11px]"
                style={{
                  color:
                    i === highlighted
                      ? "var(--color-lystr-tomato-deep)"
                      : "var(--fg-3)",
                }}
              >
                {[
                  [s.postcode, s.city].filter(Boolean).join(" "),
                  s.state,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
