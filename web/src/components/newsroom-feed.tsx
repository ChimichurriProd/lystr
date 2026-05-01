"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* ============================================================
   Newsroom feed — unified press + articles list with type +
   category filter chips. Client component because of the
   filter state.
   ============================================================ */

export type NewsroomItem = {
  _id: string;
  kind: "press" | "article";
  title: string;
  slug: string;
  href: string;
  date: string;
  excerpt: string;
  category?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const KIND_LABEL: Record<NewsroomItem["kind"], string> = {
  press: "Pressmeddelande",
  article: "Artikel",
};

export function NewsroomFeed({ items }: { items: NewsroomItem[] }) {
  const [active, setActive] = useState<string>("Alla");

  const filterTags = useMemo(() => {
    const tags: string[] = [];
    if (items.some((i) => i.kind === "press")) tags.push("Pressmeddelanden");
    if (items.some((i) => i.kind === "article")) tags.push("Artiklar");
    const categories = new Set<string>();
    for (const i of items) if (i.category) categories.add(i.category);
    return ["Alla", ...tags, ...Array.from(categories).sort()];
  }, [items]);

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.date.localeCompare(a.date)),
    [items],
  );

  const filtered = useMemo(() => {
    if (active === "Alla") return sorted;
    if (active === "Pressmeddelanden")
      return sorted.filter((i) => i.kind === "press");
    if (active === "Artiklar")
      return sorted.filter((i) => i.kind === "article");
    return sorted.filter((i) => i.category === active);
  }, [sorted, active]);

  return (
    <>
      {filterTags.length > 1 && (
        <div
          role="tablist"
          aria-label="Filtrera nyhetsrum"
          className="mb-8 flex flex-wrap gap-2 md:mb-10"
        >
          {filterTags.map((tag) => {
            const isActive = tag === active;
            return (
              <button
                key={tag}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tag)}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  background: isActive
                    ? "var(--color-lystr-black)"
                    : "white",
                  color: isActive ? "white" : "var(--fg-2)",
                  borderColor: isActive
                    ? "transparent"
                    : "var(--border)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-base" style={{ color: "var(--fg-3)" }}>
          Inget publicerat i den här kategorin ännu.
        </p>
      ) : (
        <ul className="grid list-none gap-6 p-0 md:grid-cols-2">
          {filtered.map((item) => (
            <li key={item._id}>
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between rounded-2xl border bg-white p-6 no-underline transition-colors hover:border-lystr-black md:p-8"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <div
                    className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--fg-3)" }}
                  >
                    <span
                      className="rounded-full px-3 py-1"
                      style={{
                        background:
                          item.kind === "press"
                            ? "var(--color-lystr-tomato-tint)"
                            : "var(--color-lystr-sky-tint)",
                        color:
                          item.kind === "press"
                            ? "var(--color-lystr-tomato-deep)"
                            : "var(--color-lystr-sky-deep)",
                      }}
                    >
                      {KIND_LABEL[item.kind]}
                    </span>
                    {item.category && (
                      <span
                        className="rounded-full px-3 py-1"
                        style={{ background: "var(--bg-2)" }}
                      >
                        {item.category}
                      </span>
                    )}
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h2
                    className="mt-3 font-display text-xl font-semibold transition-colors group-hover:text-lystr-tomato md:text-2xl"
                    style={{ color: "var(--fg-1)" }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="mt-2 text-base leading-[1.55]"
                    style={{ color: "var(--fg-2)" }}
                  >
                    {item.excerpt}
                  </p>
                </div>
                <p
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--fg-1)" }}
                >
                  {item.kind === "press"
                    ? "Läs pressmeddelandet"
                    : "Läs artikeln"}
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
