import { pillars } from "@/content/homepage";

export function Pillars() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-24">
        <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
          3 snabba fördelar
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-lystr-black md:text-3xl">
          Med att välja Lystr
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-lystr-line bg-lystr-cream p-6"
            >
              <h3 className="text-lg font-semibold text-lystr-black">{p.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-lystr-slate">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
