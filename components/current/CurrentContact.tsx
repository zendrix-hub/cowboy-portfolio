"use client";

import React, { useState } from "react";
import { social } from "@/data/social";

export default function CurrentContact() {
  const [copied, setCopied] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="zone-6 relative min-h-screen px-6 sm:px-12 lg:px-20 pt-[clamp(140px,18vh,220px)] pb-24 select-text flex flex-col justify-between"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Channel Margin: 4 cols (desktop) */}
        <div className="lg:col-span-4 hidden lg:block" aria-hidden="true" />

        {/* Right Reading Column: 8 cols (desktop), text on right (§6.3.10) */}
        <div className="lg:col-span-8 flex flex-col items-start max-w-[42rem]">
          <h2
            id="contact-title"
            className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
          >
            Contact
          </h2>

          <div className="mt-12 flex flex-col items-start gap-4 w-full">
            {/* Label */}
            <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide">
              Send an email
            </span>

            {/* Email Address Link (The line terminates here as the underline per §6.3.10) */}
            <a
              id="contact-email-link"
              href={`mailto:${social.email}`}
              className="font-fraunces text-[clamp(1.75rem,5.5vw,4.5rem)] leading-[1.05] text-[var(--fg)] break-all hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
              style={{ overflowWrap: "anywhere" }}
            >
              {social.email}
            </a>

            {/* Copy Address Button & Live Region */}
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={handleCopy}
                className="drawn-link text-[1rem] font-medium text-[var(--fg-2)] hover:text-[var(--fg)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
                aria-label="Copy email address to clipboard"
              >
                <span>{copied ? "Copied" : "Copy address"}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>

              {/* Accessible Live Region for Screen Readers (§11.6) */}
              <div role="status" aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard." : ""}
              </div>
            </div>
          </div>

          {/* Social Links Directory: Plain text links, one per line, drawn underlines (§6.3.10) */}
          <div className="mt-16 flex flex-col items-start gap-4">
            <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide">
              Direct Channels & Profiles
            </span>

            <div className="flex flex-col items-start gap-3 mt-2">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="drawn-link text-[1.125rem] text-[var(--fg)]"
                aria-label="GitHub Profile (opens in new tab)"
              >
                <span>GitHub — @zendrix-hub</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="drawn-link text-[1.125rem] text-[var(--fg)]"
                aria-label="LinkedIn Profile (opens in new tab)"
              >
                <span>LinkedIn — in/zendrix-riva</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <a
                href={social.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="drawn-link text-[1.125rem] text-[var(--fg)]"
                aria-label="Download BSIT Resume PDF (opens in new tab)"
              >
                <span>Resume (PDF Document)</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <a
                href={`mailto:${social.academicEmail}`}
                className="drawn-link text-[1.125rem] text-[var(--fg)]"
                aria-label="Academic Email Inquiries"
              >
                <span>Academic — {social.academicEmail}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desk Footer (§6.3.10): Hanken 0.9375rem, --fg-2, generous space, no borders */}
      <footer className="w-full max-w-[1440px] mx-auto mt-32 pt-12 text-[0.9375rem] text-[var(--fg-2)] relative z-10">
        <div>
          <p className="font-medium text-[var(--fg)]">
            {social.displayName} — {social.role}
          </p>
          <p className="mt-1 opacity-80">
            &copy; {currentYear} {social.displayName}. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
