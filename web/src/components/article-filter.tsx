"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ArticleSummary } from "../../sanity/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleFilter({ articles }: { articles: ArticleSummary[] }) {
  const [active, setActive] = useState<string>("Alla");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const a of articles) if (a.category) set.add(a.category);
    return ["Alla", ...Array.from(set).sort()];
  }, [articles]);

  const sorted = useMemo(
    () => [...articles].sort((a, b) => b.date.localeCompare(a.date)),
    [articles],
  );

  const filtered =
    active === "Alla" ? sorted : sorted.filter((a) => a.category === active);

  return (
    <>
      {categories.length > 2 && (
        <div
          role="tablist"
          aria-label="Filtrera artiklar efter kategori"
          className="mb-8 flex flex-wrap gap-2 md:mb-10"
        >
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-lystr-black bg-lystr-black text-white"
                    : "border-lystr-line bg-white text-lystr-slate hover:border-lystr-black"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-base text-lystr-muted">
          Inga artiklar i den här kategorin ännu.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {filtered.map((a) => (
            <li key={a._id}>
              <Link
                href={`/artiklar/${a.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-lystr-line bg-white p-6 transition-colors hover:border-lystr-black md:p-8"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-lystr-muted">
                    {a.category && (
                      <span className="rounded-full bg-lystr-cream px-3 py-1">
                        {a.category}
                      </span>
                    )}
                    <span>{formatDate(a.date)}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-lystr-black group-hover:text-lystr-red md:text-2xl">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-base text-lystr-slate">{a.excerpt}</p>
                </div>
                <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-lystr-black">
                  Läs artikeln
                  <span aria-hidden>→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
