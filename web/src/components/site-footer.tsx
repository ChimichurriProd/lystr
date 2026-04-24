import Image from "next/image";
import Link from "next/link";
import { footer, social } from "@/content/homepage";

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

            {social.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {social.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.platform} — ${s.handle}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-white/50 hover:text-white"
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
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
            <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.12em] text-white/50">
              Feeds
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="/press/rss.xml" className="hover:text-lystr-red">
                  Press · RSS
                </a>
              </li>
              <li>
                <a href="/artiklar/rss.xml" className="hover:text-lystr-red">
                  Artiklar · RSS
                </a>
              </li>
            </ul>
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

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "LinkedIn") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a2.1 2.1 0 0 0-.05.66V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    );
  }
  if (platform === "Instagram") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (platform === "Facebook") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.77-1.64 1.57V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    );
  }
  return null;
}
