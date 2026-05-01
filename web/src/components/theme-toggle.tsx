"use client";

import { Lightbulb, Sun, TreePine } from "lucide-react";
import { useEffect, useState } from "react";

/* ============================================================
   Theme toggle — three modes, lives top-right in the nav.
   The actual visual swap happens via [data-theme="..."] on
   <html>; this component just writes that attribute and
   persists the choice to localStorage. An inline script in
   layout.tsx restores the saved theme before paint, so there
   is no flicker on hard navigation.
   ============================================================ */

type Theme = "bulb" | "sun" | "tree";

const STORAGE_KEY = "lystr-theme";
const THEMES: { id: Theme; label: string }[] = [
  { id: "bulb", label: "Lampa-läge" },
  { id: "sun", label: "Sol-läge" },
  { id: "tree", label: "Träd-läge" },
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("bulb");

  useEffect(() => {
    const fromDom = document.documentElement.dataset.theme as
      | Theme
      | undefined;
    if (fromDom === "sun" || fromDom === "tree") {
      setTheme(fromDom);
    }
  }, []);

  function pick(next: Theme) {
    setTheme(next);
    if (next === "bulb") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = next;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage may be disabled — silently no-op */
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Färgtema"
      className="hidden items-center gap-0.5 rounded-full border p-0.5 md:inline-flex"
      style={{ borderColor: "var(--border)", background: "var(--bg-1)" }}
    >
      {THEMES.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={t.label}
            onClick={() => pick(t.id)}
            className="inline-flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-150"
            style={{
              background: active ? "var(--color-lystr-black)" : "transparent",
              color: active ? "#fff" : "var(--fg-2)",
            }}
          >
            <ThemeIcon theme={t.id} />
          </button>
        );
      })}
    </div>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  const Icon =
    theme === "bulb" ? Lightbulb : theme === "sun" ? Sun : TreePine;
  return <Icon size={14} aria-hidden />;
}
