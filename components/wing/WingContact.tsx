"use client";

import React, { useState } from "react";
import { RoomThreshold } from "./RoomThreshold";
import { social } from "@/data/social";

export function WingContact() {
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
      id="room-06"
      aria-labelledby="exit-room-heading"
      className="w-full min-h-[90svh] flex flex-col justify-between max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16"
    >
      <RoomThreshold roomNumber="06" roomName="The Exit" />

      <div className="flex-1 space-y-12 sm:space-y-16 py-8">
        <header className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-brass font-archivo font-bold block">
            Terminal Plaque
          </span>
          <h2
            id="exit-room-heading"
            className="font-archivo font-bold text-[clamp(2rem,5vw,4rem)] leading-tight text-ink uppercase"
          >
            Inquiries &amp; Exit
          </h2>
          <p className="font-sans text-sm text-ink-2 max-w-xl">
            Direct communication channel for enterprise software opportunities, architecture consultations, and technical inquiries.
          </p>
        </header>

        {/* The Final Plaque (§9.3.10) */}
        <div className="bg-concrete border border-ink p-8 sm:p-12 space-y-8 max-w-3xl">
          <div className="flex items-center justify-between border-b border-ink/20 pb-4 text-xs font-mono text-ink-2">
            <span>ENGRAVED DIRECTORY // EXIT</span>
            <span>DIRECT TRANSMISSION</span>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-archivo uppercase tracking-widest text-ink-2 block">
              Official Email Terminal:
            </span>
            <a
              href={`mailto:${social.email}`}
              className="font-archivo font-bold text-[clamp(1.5rem,4vw,2.75rem)] text-ink hover:text-brass transition-colors block break-all uppercase"
            >
              {social.email}
            </a>

            {/* Outlined "Copy address" Button (§9.3.10) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="wing-btn font-archivo text-xs uppercase tracking-wider py-2.5 px-5"
              >
                <span role="status" aria-live="polite">
                  {copied ? "[ Copied to clipboard ]" : "[ Copy address ]"}
                </span>
              </button>
            </div>
          </div>

          {/* Social Links as Plain Outlined Links */}
          <div className="pt-6 border-t border-ink/15 space-y-3">
            <span className="text-xs font-archivo uppercase tracking-widest text-ink-2 block">
              External Indices:
            </span>
            <ul className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 font-sans text-xs sm:text-sm font-medium">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wing-link text-ink hover:text-brass"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Exhibition Colophon Footer */}
      <div className="w-full pt-8 border-t border-ink-2/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-2 select-none">
        <div>
          <span>© {new Date().getFullYear()} {social.name}. All rights reserved.</span>
        </div>
        <div>
          <span>World 03: The Wing (Institutional Gallery).</span>
        </div>
      </div>
    </footer>
  );
}
