import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md backdrop-saturate-150"
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-(--container-marketing) items-center justify-between px-[22px] md:h-16 md:px-8">
        <Link
          href="/"
          aria-label="Lystr hem"
          className="inline-flex items-center no-underline"
        >
          <Image
            src="/lystr-wordmark-black.png"
            alt="Lystr"
            width={3000}
            height={1500}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <nav
          aria-label="Huvudmeny"
          className="hidden items-center gap-7 text-sm md:flex"
        >
          <Link
            href="/nyhetsrum"
            className="border-b border-transparent pb-0.5 font-medium text-[var(--fg-2)] transition-colors duration-200 hover:border-b-lystr-black hover:text-[var(--fg-1)] no-underline"
          >
            Nyhetsrum
          </Link>
          <ThemeToggle />
          <a
            href="https://www.calendly.com/mathias-soderstrom-lystr"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-lystr-tomato px-[18px] py-2.5 text-[13px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-lystr-tomato-hover"
          >
            Boka möte direkt →
          </a>
        </nav>

        {/* Mobile: CTA pill straight to Calendly */}
        <a
          href="https://www.calendly.com/mathias-soderstrom-lystr"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-lystr-tomato px-[14px] py-2 text-[12px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-lystr-tomato-hover md:hidden"
        >
          Boka möte →
        </a>
      </div>
    </header>
  );
}
