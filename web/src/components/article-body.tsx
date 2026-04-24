import type { ContentBlock } from "@/content/content-types";

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-lystr-slate md:text-lg">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 text-2xl font-semibold leading-tight tracking-tight text-lystr-black md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="pt-2 text-xl font-semibold leading-snug text-lystr-black"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-lystr-black/80 bg-lystr-cream py-4 pl-5 pr-4 text-lystr-black italic"
              >
                <p className="text-lg">{block.text}</p>
                {block.source && (
                  <footer className="mt-2 text-sm not-italic text-lystr-muted">
                    {block.source}
                  </footer>
                )}
              </blockquote>
            );
          case "hr":
            return (
              <hr
                key={i}
                className="my-8 border-0 border-t border-lystr-line"
              />
            );
        }
      })}
    </div>
  );
}
