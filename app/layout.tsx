import type { Metadata, Viewport } from "next";
import { Bungee, Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { social } from "@/data/social";
import "./globals.css";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B3FD1" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1440" },
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
        {/* Roll sign one-time session flag script (§6.1.4) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem('biyahe-rolled')){window.__BIYAHE_NEEDS_ROLL=true;}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${bungee.variable} ${lexend.variable} font-sans min-h-screen bg-chalk text-foreground antialiased selection:bg-sun selection:text-enamel relative`}
      >
        <Providers>
          {/* Skip to content link for accessibility (§11.2, WCAG 2.4.1) */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-sun focus:text-enamel focus:font-bungee focus:text-sm focus:border-3 focus:border-enamel focus:rounded-lg focus:shadow-[0_4px_0_#CC9F23]"
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
