import type { Metadata, Viewport } from "next";
import { Lora, Source_Serif_4, Courier_Prime, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { MarginaliaNav } from "@/components/marginalia/MarginaliaNav";
import { social } from "@/data/social";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
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
    siteName: "Zendrix Riva Portfolio — Marginalia",
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
    { media: "(prefers-color-scheme: light)", color: "#E2E4DE" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1713" },
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
        className={`${lora.variable} ${sourceSerif.variable} ${courierPrime.variable} ${caveat.variable} font-serif min-h-screen bg-desk text-ink antialiased selection:bg-tape selection:text-white relative`}
      >
        <Providers>
          {/* Skip to content link for accessibility (WCAG 2.4.1) */}
          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-tape focus:text-white focus:rounded-[2px] focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-ink focus:text-sm focus:font-courier font-bold"
          >
            Skip to content
          </a>

          {/* Notebook Navigation (Bookmark Tabs & Mobile Flags) */}
          <MarginaliaNav />

          {children}

          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
