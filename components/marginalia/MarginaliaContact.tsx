"use client";

import React, { useState } from "react";
import { MarginaliaPage } from "./MarginaliaPage";
import { TapeStrip } from "./TapeStrip";
import { social } from "@/data/social";

export function MarginaliaContact() {
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
    { name: "GitHub", url: social.github },
    { name: "LinkedIn", url: social.linkedin },
    { name: "Resume (PDF)", url: social.resumeUrl },
  ];

  const marginNotes = (
    <div className="space-y-6 pt-6 select-none">
      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[-1.5deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [DISPATCH // POSTCARD]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          Direct email inquiry channel. Response within 24–48 hours.
        </p>
      </div>
    </div>
  );

  return (
    <MarginaliaPage
      id="contact"
      pageNumber={6}
      rotation={0.6}
      leftTapeRotation={2}
      rightTapeRotation={-2.5}
      isLast={true}
      marginContent={marginNotes}
    >
      <div className="space-y-8 sm:space-y-10">
        <header>
          <span className="font-courier text-xs uppercase tracking-widest text-tape font-bold block mb-1">
            SECTION // TRANSMISSION
          </span>
          <h2
            id="contact-title"
            className="font-lora font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-tight text-ink"
          >
            Contact &amp; Inquiries
          </h2>
        </header>

        {/* TORN-EDGE "POSTCARD" PANEL (§9.1.10) */}
        <div className="relative pt-3">
          <div className="relative bg-white dark:bg-[#231E19] border border-ink-2/30 p-6 sm:p-8 rounded-[2px] shadow-lift rotate-[-0.75deg] max-w-[580px]">
            {/* Single Tape Strip holding top corner down (§9.1.10, §9.1.14) */}
            <TapeStrip
              rotation={-4}
              width="w-12 sm:w-14"
              height="h-5"
              className="-top-2.5 left-8"
            />

            <div className="space-y-4">
              <span className="font-courier text-[11px] text-tape uppercase tracking-widest font-bold block">
                POSTCARD // DIRECT DISPATCH
              </span>

              {/* Email Address in Courier Prime */}
              <div>
                <a
                  href={`mailto:${social.email}`}
                  className="font-courier font-bold text-xl sm:text-2xl lg:text-3xl text-ink hover:text-tape underline underline-offset-4 break-all transition-colors"
                >
                  {social.email}
                </a>
              </div>

              {/* Copy Address Button with Label Swap & Live Region */}
              <div className="pt-1 flex items-center gap-4 font-courier text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="notebook-link font-bold text-ink hover:text-tape py-1 inline-flex items-center gap-1.5 focus-visible:outline-none"
                >
                  <span aria-hidden="true">&#9744;</span>
                  <span role="status" aria-live="polite">
                    {copied ? "Copied to clipboard!" : "Copy address"}
                  </span>
                </button>
              </div>

              <p className="font-serif italic text-xs sm:text-sm text-ink-2 pt-2 border-t border-ink-2/15">
                Open for full-stack engineering, mobile development, and architecture conversations.
              </p>
            </div>
          </div>
        </div>

        {/* Social Links List */}
        <div className="space-y-3 pt-4">
          <h3 className="font-courier text-xs uppercase tracking-wider text-ink-2">
            NETWORK &amp; REPOSITORIES
          </h3>
          <ul className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 font-courier text-sm font-bold">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notebook-link text-ink hover:text-tape inline-flex items-center gap-1"
                >
                  <span>{link.name}</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Area */}
        <footer className="pt-8 border-t border-ink-2/20 text-center sm:text-left font-courier text-xs text-ink-2 space-y-1">
          <p>© {new Date().getFullYear()} {social.name}. All rights reserved.</p>
          <p className="opacity-75">
            Designed as World 01: Marginalia (The Living Notebook).
          </p>
        </footer>
      </div>
    </MarginaliaPage>
  );
}
