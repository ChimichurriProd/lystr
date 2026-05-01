import type { Metadata } from "next";
import { Schibsted_Grotesk, Fragment_Mono } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lystr — Med solen som insats.",
  description:
    "Lystr är inte ett elbolag. Lystr är din energirådgivare. Förvandla din elräkning till en avbetalning på din egen anläggning — efter åtta år äger du din egen energi i 30 år framåt.",
  metadataBase: new URL("https://lystr.se"),
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Lystr",
  },
};

// Inline before-paint script: reads the saved theme from localStorage
// and writes data-theme on <html> so the page renders in the correct
// palette on first paint. Wrapped in IIFE + try/catch for SSR safety.
const themeBootstrap = `(function(){try{var t=localStorage.getItem("lystr-theme");if(t==="sun"||t==="tree"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${schibsted.variable} ${fragmentMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
