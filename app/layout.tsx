import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import CommandMenu from "@/components/layout/CommandMenu";
import { social } from "@/data/social";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-cyan-500 selection:text-white dark:selection:text-zinc-950 relative`}
      >
        <Providers>
          {/* Skip to content link for accessibility (WCAG 2.4.1) */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>

          {/* ReadHub-inspired Atmospheric Ambient Blobs */}
          <div className="bg-blobs" aria-hidden="true">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>

          <Navbar />
          {children}
          <CommandMenu />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
