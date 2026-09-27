import type { Metadata, Viewport } from "next";
import { Overpass, Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { CompassLegendWidget } from "@/components/datum/CompassLegendWidget";
import { social } from "@/data/social";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zendrix-riva.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zendrix Riva — Datum Cartographic Elevation Portfolio",
  description:
    "A topographic elevation ascent portfolio of Zendrix Riva, Software & Full-Stack Developer: six continuous elevation bands framing offline-first mobile systems and backend architectures.",
  authors: [{ name: "Zendrix Riva", url: "https://github.com/zendrix-hub" }],
  creator: "Zendrix Riva",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Zendrix Riva — Datum Cartographic Elevation Portfolio",
    description:
      "A topographic elevation ascent portfolio of Zendrix Riva, Software & Full-Stack Developer: six continuous elevation bands framing offline-first mobile systems and backend architectures.",
    siteName: "Zendrix Riva Datum Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendrix Riva — Datum Cartographic Elevation Portfolio",
    description:
      "A topographic elevation ascent portfolio of Zendrix Riva, Software & Full-Stack Developer: six continuous elevation bands framing offline-first mobile systems and backend architectures.",
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
    { media: "(prefers-color-scheme: light)", color: "#D9E4C7" },
    { media: "(prefers-color-scheme: dark)", color: "#1E2A18" },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={`${overpass.variable} ${karla.variable} font-sans antialiased transition-colors`}
      >
        <Providers>
          {/* Skip link for keyboard accessibility (WCAG 2.4.1) */}
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--contour)] focus:text-[#FFFFFF] focus:text-sm font-display uppercase tracking-wider"
          >
            Skip to base camp
          </a>

          {/* Compass & Elevation Legend Widget */}
          <CompassLegendWidget />

          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
