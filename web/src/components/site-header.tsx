import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-lystr-black text-white">
      <div className="mx-auto flex max-w-(--container-narrow) items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" aria-label="Lystr hem">
          <Image
            src="/lystr-wordmark-white.png"
            alt="Lystr"
            width={112}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#sa-funkar" className="hidden sm:inline text-white/80 hover:text-white">
            Så funkar det
          </a>
          <a href="#formaner" className="hidden sm:inline text-white/80 hover:text-white">
            Fördelar
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-lystr-red px-4 py-2 font-medium text-white hover:bg-lystr-red-hover transition-colors"
          >
            Anmäl intresse
          </a>
        </nav>
      </div>
    </header>
  );
}
