import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      id="kontakt"
      className="bg-lystr-black text-white"
      style={{ paddingTop: 80, paddingBottom: 32 }}
    >
      <div className="mx-auto max-w-(--container-marketing) px-[22px] md:px-8">
        <div className="mb-16 grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand column */}
          <div>
            <Image
              src="/lystr-wordmark-white.png"
              alt="Lystr"
              width={3000}
              height={1500}
              className="mb-4 h-9 w-auto"
            />
            <Link
              href="/brand"
              aria-label="Läs om vårt varumärke"
              className="group inline-block no-underline"
            >
              <p
                className="m-0 mb-2 font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] text-white transition-colors group-hover:text-lystr-tomato"
              >
                Med solen som insats.
              </p>
              <p
                className="m-0 max-w-[32ch] text-sm leading-[1.55] transition-colors group-hover:text-white"
                style={{ color: "var(--on-ink-2)" }}
              >
                Vi installerar. Solen finansierar. Du äger.
              </p>
            </Link>
          </div>

          <FooterCol heading="Lystr">
            <FooterLink href="/">Få energirådgivning</FooterLink>
            <FooterLink href="/nyhetsrum">Nyhetsrum</FooterLink>
          </FooterCol>

          <FooterCol heading="Kontakt">
            <FooterLink href="mailto:hej@lystr.se">hej@lystr.se</FooterLink>
            <FooterLink href="tel:+4684123456">08 412 34 56</FooterLink>
            <li className="text-sm" style={{ color: "var(--on-ink-2)" }}>
              Mån–fre, 9–17
            </li>
          </FooterCol>

          <FooterCol heading="Företag">
            <li className="text-sm" style={{ color: "var(--on-ink-2)" }}>
              Lystr Energi AB
            </li>
            <li className="text-sm" style={{ color: "var(--on-ink-2)" }}>
              Org.nr 559xxx-xxxx
            </li>
            <li className="text-sm" style={{ color: "var(--on-ink-2)" }}>
              Stockholm, Sverige
            </li>
          </FooterCol>
        </div>

        <div
          className="flex flex-col items-start gap-3 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            color: "var(--on-ink-3)",
          }}
        >
          <span>© {new Date().getFullYear()} Lystr Energi AB</span>
          <span className="flex gap-5">
            <a
              href="#"
              className="no-underline hover:text-white"
              style={{ color: "var(--on-ink-3)" }}
            >
              Integritetspolicy
            </a>
            <a
              href="#"
              className="no-underline hover:text-white"
              style={{ color: "var(--on-ink-3)" }}
            >
              Villkor
            </a>
            <a
              href="#"
              className="no-underline hover:text-white"
              style={{ color: "var(--on-ink-3)" }}
            >
              Cookies
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4
        className="m-0 mb-3.5 text-xs font-medium uppercase tracking-[0.12em]"
        style={{ color: "var(--on-ink-3)" }}
      >
        {heading}
      </h4>
      <ul className="flex list-none flex-col gap-2.5 p-0 text-sm">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="no-underline hover:text-white"
        style={{ color: "var(--on-ink-2)" }}
      >
        {children}
      </Link>
    </li>
  );
}
