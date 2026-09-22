import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { social } from "@/data/social";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
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
    { media: "(prefers-color-scheme: light)", color: "#EDF7F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1A4A55" },
  ],
};

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
        className={`${fraunces.variable} ${hanken.variable} font-sans min-h-screen antialiased selection:bg-[#0F5560] selection:text-[#EDF7F6] dark:selection:bg-[#BFF0EA] dark:selection:text-[#051222] relative`}
      >
        <Providers>
          {/* Skip to content link for accessibility (WCAG 2.4.1, §11.2) */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-5 focus:py-2.5 focus:bg-[#0B2A30] focus:text-[#F2FBFA] focus:rounded-full focus:outline-none focus:ring-2 focus:ring-[#F2FBFA] focus:text-sm focus:font-medium shadow-md"
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
