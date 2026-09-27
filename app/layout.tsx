import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { QuietMarkNav } from "@/components/clearing/QuietMarkNav";
import { social } from "@/data/social";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zendrix-riva.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zendrix Riva — The Clearing",
  description:
    "A portfolio of deliberate restraint: unhurried spatial breathing room framing engineering systems across mobile and backend architectures.",
  authors: [{ name: "Zendrix Riva", url: "https://github.com/zendrix-hub" }],
  creator: "Zendrix Riva",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Zendrix Riva — The Clearing",
    description:
      "A portfolio of deliberate restraint: unhurried spatial breathing room framing engineering systems across mobile and backend architectures.",
    siteName: "Zendrix Riva The Clearing Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendrix Riva — The Clearing",
    description:
      "A portfolio of deliberate restraint: unhurried spatial breathing room framing engineering systems across mobile and backend architectures.",
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
    { media: "(prefers-color-scheme: light)", color: "#EFEEEA" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1917" },
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
        className={`${shipporiMincho.variable} ${zenKaku.variable} font-sans bg-[var(--ground)] text-[var(--ink)] antialiased transition-colors`}
      >
        <Providers>
          {/* Skip link for keyboard accessibility (WCAG 2.4.1) */}
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[70] focus:px-4 focus:py-2 focus:bg-[var(--ground)] focus:text-[var(--ink)] focus:border focus:border-[var(--mark)] focus:text-sm font-serif"
          >
            Skip to content
          </a>

          {/* Quiet Mark Navigation Control */}
          <QuietMarkNav />

          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
