import { benefits } from "@/content/homepage";

export function Benefits() {
  return (
    <section id="formaner" className="bg-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
          Varför välja Lystr
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-lystr-black md:text-4xl">
          Du betalar inte mer. Men du får din egen energiproduktion.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {benefits.map((b, i) => (
            <li
              key={i}
              className="rounded-2xl border border-lystr-line bg-white p-6 md:p-7"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lystr-black text-sm font-semibold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-lystr-black">
                {b.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-lystr-slate">
                {b.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
