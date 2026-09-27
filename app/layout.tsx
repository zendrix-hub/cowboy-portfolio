import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Archivo_Narrow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { LetterboxFrame } from "@/components/slate/LetterboxFrame";
import { FadeUpOverlay } from "@/components/slate/FadeUpOverlay";
import { social } from "@/data/social";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zendrix-riva.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zendrix Riva — Slate Film Reel Portfolio",
  description:
    "A cinematic reel portfolio of Zendrix Riva, Software & Full-Stack Developer: composed discrete scroll-snapped takes framing engineering systems and production discipline.",
  authors: [{ name: "Zendrix Riva", url: "https://github.com/zendrix-hub" }],
  creator: "Zendrix Riva",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Zendrix Riva — Slate Film Reel Portfolio",
    description:
      "A cinematic reel portfolio of Zendrix Riva, Software & Full-Stack Developer: composed discrete scroll-snapped takes framing engineering systems and production discipline.",
    siteName: "Zendrix Riva Slate Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendrix Riva — Slate Film Reel Portfolio",
    description:
      "A cinematic reel portfolio of Zendrix Riva, Software & Full-Stack Developer: composed discrete scroll-snapped takes framing engineering systems and production discipline.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#16130F" },
    { media: "(prefers-color-scheme: light)", color: "#F2EFE9" },
  ],
};

/* ─── JSON-LD Structured Data ─── */
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: social.name,
      jobTitle: social.role,
      url: siteUrl,
      sameAs: [social.github, social.linkedin],
      email: social.email,
      knowsAbout: [
        "Kotlin",
        "Jetpack Compose",
        "Android",
        "Next.js",
        "TypeScript",
        "Spring Boot",
        "Python",
        "Clean Architecture",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={`${bebasNeue.variable} ${archivoNarrow.variable} font-sans bg-[var(--frame)] text-[var(--ink)] antialiased transition-colors`}
      >
        <Providers>
          {/* Skip link for keyboard accessibility (WCAG 2.4.1) */}
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-[var(--tally)] focus:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)] focus:text-sm font-sans uppercase tracking-wider"
          >
            Skip to first shot
          </a>

          {/* Fade-Up from Black Overlay on Session Init */}
          <FadeUpOverlay />

          {/* Fixed Letterbox Bars & Reel Navigation */}
          <LetterboxFrame />

          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
