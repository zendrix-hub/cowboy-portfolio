"use client";

import React, { useState } from "react";
import { social } from "@/data/social";

export function MastheadContact() {
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
    { name: "LinkedIn Network", url: social.linkedin },
    { name: "Curriculum Vitae (PDF)", url: social.resumeUrl },
  ];

  return (
    <footer
      id="contact"
      aria-labelledby="colophon-heading"
      className="w-full max-w-[1200px] mx-auto pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-t-2 border-ink rule-ink"
    >
      {/* Editorial Section Masthead Label */}
      <div className="flex items-center justify-between pb-8 mb-12 border-b border-ink-2/20 text-xs text-ink-2">
        <span className="font-mono text-[11px] uppercase tracking-wider">Folio 06 // Colophon &amp; Dispatch</span>
        <span className="font-mono text-[11px] uppercase tracking-wider">Inquiries &amp; Transmission</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (7 cols): Inquiries, Direct Address & Copy */}
        <div className="lg:col-span-7 space-y-8">
          <header className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-spot font-semibold block">
              The Colophon
            </span>
            <h2
              id="colophon-heading"
              className="font-playfair font-bold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-ink"
            >
              Direct Editorial Inquiries
            </h2>
            <p className="font-sans text-sm sm:text-base text-ink-2 max-w-lg leading-relaxed">
              Available for full-stack engineering contracts, mobile architecture consultations, and technical collaborations.
            </p>
          </header>

          {/* Large Email in Playfair Italic */}
          <div className="space-y-3">
            <a
              href={`mailto:${social.email}`}
              className="font-playfair italic text-[clamp(1.5rem,3.5vw,2.75rem)] text-ink hover:text-spot transition-colors underline underline-offset-8 decoration-1 break-all"
            >
              {social.email}
            </a>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={handleCopy}
                className="masthead-link text-ink hover:text-spot py-1 focus-visible:outline-none"
              >
                <span role="status" aria-live="polite">
                  {copied ? "Copied to clipboard!" : "Copy address"}
                </span>
              </button>
              <span className="text-ink-2/40" aria-hidden="true">•</span>
              <span className="text-ink-2">Direct Mailto</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Networks & Masthead Credits */}
        <div className="lg:col-span-5 lg:border-l lg:border-ink-2/25 lg:pl-12 space-y-8">
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-2 font-semibold">
              External Indices
            </h3>
            <ul className="space-y-2.5 font-sans text-sm font-medium">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="masthead-link text-ink hover:text-spot py-1 inline-block focus-visible:outline-none"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-ink-2/20 space-y-2 text-xs text-ink-2 font-sans">
            <p className="font-medium text-ink">
              Typeset in Playfair Display &amp; Work Sans.
            </p>
            <p className="leading-relaxed">
              Published as World 02: The Masthead for Zendrix Riva. All architectural records and thesis verifications are uninvented.
            </p>
            {/* The 8px Filled Spot Square End-Mark (§9.2.10) */}
            <div className="pt-4 flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-2">
                End of Issue
              </span>
              <span
                className="w-2 h-2 bg-spot inline-block select-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
