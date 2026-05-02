"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Swedish address block — three visible fields (Adress, Postnummer,
 * Ort) backed by Photon autocomplete on the street field. Selecting
 * a suggestion fills all three; users can also edit any field
 * manually so the lead is always complete even when Photon misses.
 *
 * The state/län value (auto-derived from postcode) and lat/lon ride
 * along as hidden fields when the user picked a suggestion.
 *
 * Photon: free, OSM-based, no API key. Public endpoint at
 * photon.komoot.io. If quality becomes a problem, swap the fetch
 * URL for Mapbox/Google Places — field shapes stay identical.
 */

type Suggestion = {
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

  const coords = f.geometry?.coordinates;
  return {
    street,
    postcode,
    city,
    state,
    lon: Array.isArray(coords) ? coords[0] : undefined,
    lat: Array.isArray(coords) ? coords[1] : undefined,
  };
}

type Defaults = {
  address?: string;
  postcode?: string;
  city?: string;
};

export function AddressAutocomplete({
  defaults = {},
  fieldId = "mvp-address",
}: {
  defaults?: Defaults;
  fieldId?: string;
}) {
  const [street, setStreet] = useState(defaults.address ?? "");
  const [postcode, setPostcode] = useState(defaults.postcode ?? "");
  const [city, setCity] = useState(defaults.city ?? "");
  // Region (län) and lat/lon ride hidden — populated only when the
  // user picks a Photon suggestion. They re-set if a fresh suggestion
  // is chosen later.
  const [stateRegion, setStateRegion] = useState("");
  const [coords, setCoords] = useState<{ lat?: number; lon?: number }>({});

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [didJustPick, setDidJustPick] = useState(false);

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

  // Debounced fetch driven by the street field. Skips one cycle right
  // after the user picks a suggestion so we don't immediately re-fetch
  // for the value we just inserted.
  useEffect(() => {
    if (didJustPick) {
      setDidJustPick(false);
      return;
    }
    const trimmed = street.trim();
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
        if (err instanceof Error && err.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [street, didJustPick]);

  function pick(s: Suggestion) {
    setStreet(s.street);
    setPostcode(s.postcode);
    setCity(s.city);
    setStateRegion(s.state);
    setCoords({ lat: s.lat, lon: s.lon });
    setIsOpen(false);
    setDidJustPick(true);
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
    <div className="flex flex-col gap-3" ref={wrapperRef}>
      {/* Adress (street) — autocomplete-enabled */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--fg-3)" }}
        >
          Adress
        </label>
        <div className="relative">
          <input
            id={fieldId}
            name="address"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder="Hemvägen 12"
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

          {isOpen && suggestions.length > 0 && (
            <ul
              id={`${fieldId}-list`}
              role="listbox"
              className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-y-auto rounded-xl border bg-white py-1 shadow-2xl"
              style={{ borderColor: "var(--border)" }}
            >
              {suggestions.map((s, i) => (
                <li
                  key={`${s.street}-${s.postcode}-${i}`}
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
                    color:
                      i === highlighted
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
      </div>

      {/* Postnummer + Ort — visible, editable, side-by-side */}
      <div className="grid grid-cols-[8rem_1fr] gap-3 md:grid-cols-[9rem_1fr]">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${fieldId}-postcode`}
            className="text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--fg-3)" }}
          >
            Postnummer
          </label>
          <input
            id={`${fieldId}-postcode`}
            name="postcode"
            type="text"
            inputMode="numeric"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="138 36"
            autoComplete="postal-code"
            required
            className="rounded-xl border px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-1)",
              color: "var(--fg-1)",
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${fieldId}-city`}
            className="text-[12px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--fg-3)" }}
          >
            Ort
          </label>
          <input
            id={`${fieldId}-city`}
            name="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Älta"
            autoComplete="address-level2"
            required
            className="rounded-xl border px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-1)",
              color: "var(--fg-1)",
            }}
          />
        </div>
      </div>

      {/* Hidden — only sent when the user picked a suggestion. */}
      <input type="hidden" name="state" value={stateRegion} />
      <input type="hidden" name="lat" value={coords.lat ?? ""} />
      <input type="hidden" name="lon" value={coords.lon ?? ""} />
    </div>
  );
}
