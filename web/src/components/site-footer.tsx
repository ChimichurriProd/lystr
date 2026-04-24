import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/homepage";

export function SiteFooter() {
  return (
    <footer id="kontakt" className="mt-auto bg-lystr-black text-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Image
              src="/lystr-wordmark-white.png"
              alt="Lystr"
              width={140}
              height={44}
              className="h-9 w-auto"
            />
            <p className="mt-4 text-sm text-white/60">{footer.parent}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">
              Företaget
            </h3>
            <ul className="mt-4 space-y-2 text-base">
              <li>
                <Link href="/#sa-funkar" className="hover:text-lystr-red">
                  Så funkar det
                </Link>
              </li>
              <li>
                <Link href="/artiklar" className="hover:text-lystr-red">
                  Artiklar
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-lystr-red">
                  Pressrum
                </Link>
              </li>
              <li>
                <Link href="/#samarbeten" className="hover:text-lystr-red">
                  Samarbeten
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-2 text-base">
              <li>
                <a
                  href={`tel:${footer.phone.replaceAll(" ", "").replaceAll("-", "")}`}
                  className="hover:text-lystr-red"
                >
                  {footer.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footer.email}`}
                  className="hover:text-lystr-red"
                >
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">
              Adress
            </h3>
            <address className="mt-4 text-base not-italic text-white/80">
              {footer.address.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
          <span>{footer.copyright}</span>
          <span>Webbplats under utveckling</span>
        </div>
      </div>
    </footer>
  );
}
