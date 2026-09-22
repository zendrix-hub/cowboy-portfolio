import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow, IBM_Plex_Mono, Kalam } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { social } from "@/data/social";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const kalam = Kalam({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zendrix-riva.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zendrix Riva — Software / Full-Stack Developer",
  description:
    "Portfolio of Zendrix Riva, Software & Full-Stack Developer building practical software systems across mobile and backend environments with clean architecture.",
  authors: [{ name: "Zendrix Riva", url: "https://github.com/zendrix-hub" }],
  creator: "Zendrix Riva",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Zendrix Riva — Software / Full-Stack Developer",
    description:
      "Software / Full-Stack Developer specializing in offline-first Android systems, clean architecture, and practical backend engineering.",
    siteName: "Zendrix Riva Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendrix Riva — Software / Full-Stack Developer",
    description:
      "Software / Full-Stack Developer specializing in offline-first Android systems, clean architecture, and practical backend engineering.",
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
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DDE4EA" },
    { media: "(prefers-color-scheme: dark)", color: "#082B4A" },
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
        className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} ${kalam.variable} font-sans min-h-screen bg-desk text-ink antialiased selection:bg-ink selection:text-sheet relative`}
      >
        <Providers>
          {/* Skip to content link for accessibility (WCAG 2.4.1) */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-sheet focus:border-2 focus:border-ink focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>

          {children}

          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
