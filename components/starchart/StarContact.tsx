"use client";

import React, { useState } from "react";
import { social } from "@/data/social";

export function StarContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const socialLinks = [
    { name: "GitHub Repository", url: social.github },
    { name: "LinkedIn Profile", url: social.linkedin },
    { name: "Resume Specification (PDF)", url: social.resumeUrl },
  ];

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="w-full min-h-[85svh] flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-20 relative z-10"
    >
      <div className="max-w-[640px] mx-auto w-full space-y-10 my-auto">
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>WAYPOINT 06 // TERMINAL NODE</span>
          </div>
          <h2
            id="contact-title"
            className="font-space font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-ink"
          >
            Direct Transmission
          </h2>
          <p className="font-sans text-sm text-ink-2">
            Open for software engineering opportunities, offline-first mobile systems development, and backend architecture contracts.
          </p>
        </header>

        {/* Mailto Address with Bright Star (§9.4.10) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <span
              className="w-3.5 h-3.5 rounded-full bg-gold star-point ring-4 ring-gold/20 shrink-0"
              aria-hidden="true"
            />
            <a
              href={`mailto:${social.email}`}
              className="font-space font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-ink hover:text-gold transition-colors break-all underline underline-offset-8 decoration-1"
            >
              {social.email}
            </a>
          </div>

          <div className="pt-1 flex items-center gap-4 text-xs font-mono">
            <button
              type="button"
              onClick={handleCopy}
              className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
            >
              <span role="status" aria-live="polite">
                {copied ? "[ Copied to clipboard! ]" : "[ Copy address ]"}
              </span>
            </button>
            <span className="text-ink-2/40" aria-hidden="true">•</span>
            <span className="text-ink-2">Response within 24h</span>
          </div>
        </div>

        {/* Social Links with Hollow Star-Dot Bullets (§9.4.10) */}
        <div className="pt-6 border-t border-ink-2/20 space-y-3">
          <span className="text-xs font-mono text-ink-2 uppercase block">
            External Indices:
          </span>
          <ul className="space-y-2 font-mono text-xs sm:text-sm">
            {socialLinks.map((link) => (
              <li key={link.name} className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full border border-ink-2/70 bg-transparent shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chart-link text-ink hover:text-gold py-0.5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="max-w-[640px] mx-auto w-full pt-12 border-t border-ink-2/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-2 select-none">
        <span>© {new Date().getFullYear()} {social.name}.</span>
        <span>World 04: Star Chart (Field of Observation).</span>
      </div>
    </footer>
  );
}
