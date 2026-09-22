"use client";

import { useState } from "react";
import { social } from "@/data/social";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import BiyahePinstripe from "./BiyahePinstripe";

export default function BiyaheContact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  };

  return (
    <>
      <section
        id="contact"
        className="bg-[#E4262A] text-white pt-12 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#FFC72C] text-black px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block">
            CONTACT // FINAL STOP
          </div>
          <div className="h-1 bg-white flex-1 hidden sm:block" />
        </div>

        {/* Live Region for Screen Readers (§6.1.10, §11.6) */}
        <div role="status" aria-live="polite" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </div>

        {/* Large Sun Plate: Mailto Action (§6.1.10) */}
        <div className="biyahe-board bg-[#FFC72C] text-black p-6 sm:p-10 lg:p-12 space-y-6">
          <div className="space-y-2">
            <div className="font-bungee text-xs sm:text-sm text-[#E4262A] tracking-wider uppercase">
              DIRECT DISPATCH // SEND AN EMAIL
            </div>

            <a
              href={`mailto:${social.email}`}
              aria-label={`Send an email to ${social.email}`}
              className="block font-lexend font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-black hover:text-[#1B3FD1] transition-colors break-all"
            >
              {social.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Copy Address Pressable Plate */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={copied ? "Email address copied" : "Copy email address to clipboard"}
              style={{ ["--depth-color" as string]: "#CCCCCC" }}
              className={`pressable-plate px-6 py-3.5 bg-white text-black font-bungee text-xs sm:text-sm tracking-wider flex items-center gap-2 ${
                copied ? "pressed-in bg-[#0F9D58] text-white" : ""
              }`}
            >
              <span aria-hidden="true">{copied ? "✓" : "📋"}</span>
              <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY ADDRESS"}</span>
            </button>

            {/* Resume CV Plate */}
            <a
              href={social.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume PDF document"
              style={{ ["--depth-color" as string]: "#1632A7" }}
              className="pressable-plate px-6 py-3.5 bg-[#1B3FD1] text-white font-bungee text-xs sm:text-sm tracking-wider flex items-center gap-2"
            >
              <span aria-hidden="true">📄</span>
              <span>VIEW RESUME (PDF)</span>
            </a>
          </div>
        </div>

        {/* External Social Route Plates (§6.1.10) */}
        <div className="space-y-4">
          <div className="font-bungee text-xs text-white uppercase tracking-wider">
            EXTERNAL TERMINALS &amp; REPOSITORIES
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub Plate */}
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile of Zendrix Riva"
              style={{ ["--depth-color" as string]: "#CCCCCC" }}
              className="pressable-plate p-5 bg-white text-black flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-6 h-6 text-black" />
                <div>
                  <div className="font-bungee text-sm">GITHUB</div>
                  <div className="font-lexend text-xs text-black/70">@zendrix-hub</div>
                </div>
              </div>
              <span className="font-bungee text-sm">➔</span>
            </a>

            {/* LinkedIn Plate */}
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile of Zendrix Riva"
              style={{ ["--depth-color" as string]: "#CCCCCC" }}
              className="pressable-plate p-5 bg-white text-black flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-6 h-6 text-[#1B3FD1]" />
                <div>
                  <div className="font-bungee text-sm">LINKEDIN</div>
                  <div className="font-lexend text-xs text-black/70">in/zendrix-riva</div>
                </div>
              </div>
              <span className="font-bungee text-sm">➔</span>
            </a>
          </div>
        </div>
      </div>
    </section>

      {/* Footer with Triple Pinstripe (§6.1.10) */}
      <BiyahePinstripe />
      <footer className="bg-black text-white py-12 px-4 sm:px-6 text-center space-y-6">
        {/* Terminal Return Route Plate (§6.1.10) */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="font-mono text-[11px] text-[#FFC72C] tracking-widest uppercase">
            TERMINAL RETURN // ROTONDA
          </span>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              try {
                window.history.pushState(null, "", "#home");
              } catch {
                // Ignore history push errors
              }
            }}
            aria-label="Return to the first stop (Hero section)"
            style={{ ["--depth-color" as string]: "#FFFFFF" }}
            className="pressable-plate px-8 py-4 bg-[#FFC72C] text-black font-bungee text-sm sm:text-base tracking-wider inline-flex items-center gap-3 border-3 border-black ring-4 ring-white shadow-[0_6px_0_#FFFFFF] hover:bg-white hover:ring-[#FFC72C] transition-all"
          >
            <span aria-hidden="true" className="text-lg">▲</span>
            <span>BACK TO FIRST STOP</span>
          </a>
        </div>

        <div className="font-bungee text-xs sm:text-sm text-[#FFC72C] pt-2">
          BIYAHE ROUTE SYSTEM // {social.displayName.toUpperCase()}
        </div>
        <p className="font-lexend text-xs text-white/70 max-w-xl mx-auto">
          Designed with graphic language of Philippine transit route boards. Built with Next.js &amp; Tailwind CSS.
        </p>
        <p className="font-lexend text-[11px] text-white/50">
          © {new Date().getFullYear()} {social.name}. All verified portfolio data preserved.
        </p>
      </footer>
    </>
  );
}
