import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

/**
 * Renders Portable Text (Sanity's rich text format) with the same
 * typography and spacing we used for the old ContentBlock-based
 * ArticleBody, so press releases and articles keep a consistent voice.
 */

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => (
      <h2 className="pt-4 text-2xl font-semibold leading-tight tracking-tight text-lystr-black md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 text-xl font-semibold leading-snug text-lystr-black">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-lystr-black/80 bg-lystr-cream py-4 pl-5 pr-4 italic text-lystr-black">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-lystr-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-lystr-black underline underline-offset-4 hover:text-lystr-red"
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-lystr-slate md:text-lg">
      <PortableText value={value} components={components} />
    </div>
  );
}
