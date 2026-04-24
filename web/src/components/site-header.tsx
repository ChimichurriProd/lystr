import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-lystr-black text-white">
      <div className="mx-auto flex max-w-(--container-narrow) items-center justify-between px-6 py-6 md:px-10 md:py-7">
        <Link href="/" aria-label="Lystr hem" className="flex items-center">
          <Image
            src="/lystr-wordmark-white.png"
            alt="Lystr"
            width={220}
            height={72}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/#sa-funkar"
            className="hidden md:inline text-white/80 hover:text-white"
          >
            Så funkar det
          </Link>
          <Link
            href="/artiklar"
            className="hidden md:inline text-white/80 hover:text-white"
          >
            Artiklar
          </Link>
          <Link
            href="/#kalkylator"
            className="rounded-full bg-lystr-red px-5 py-2.5 font-medium text-white hover:bg-lystr-red-hover transition-colors"
          >
            Räkna ut besparing
          </Link>
        </nav>
      </div>
    </header>
  );
}
