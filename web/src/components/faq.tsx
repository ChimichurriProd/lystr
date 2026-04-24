import { PortableText } from "@portabletext/react";
import { fetchFaq } from "../../sanity/lib/fetch";

export async function Faq() {
  const items = await fetchFaq();
  if (items.length === 0) return null;

  return (
    <section className="bg-lystr-cream">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
          Vanliga frågor
        </p>
        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <details
              key={item._id}
              className="group rounded-2xl border border-lystr-line bg-white p-6 md:p-7"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-lystr-black marker:hidden [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="shrink-0 text-lystr-muted transition-transform group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-lystr-slate">
                <PortableText value={item.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
