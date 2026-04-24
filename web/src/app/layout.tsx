import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lystr — Byt elavtal, få egen energiproduktion",
  description:
    "Teckna energiavtal med Lystr och få solceller och batteri utan att lägga en krona. Din elräkning blir en avbetalning och efter avtalstiden äger du din egen energiproduktion.",
  metadataBase: new URL("https://lystr.se"),
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Lystr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${schibsted.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
