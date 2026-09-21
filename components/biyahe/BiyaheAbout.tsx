"use client";

import { useState } from "react";
import { social } from "@/data/social";
import { experiences } from "@/data/experience";

export default function BiyaheAbout() {
  const [expanded, setExpanded] = useState(false);

  // Education entry from verified repo experience
  const education = experiences.find((e) => e.category === "Education");

  return (
    <section id="about" className="bg-[#FFC72C] text-black py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title Header */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
            ABOUT // STOP 01
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* 12-Column Grid Layout (§6.1.6, §6.1.12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Reading Plate (7 columns on desktop) */}
          <div className="lg:col-span-7 biyahe-board bg-white dark:bg-[#131E57] text-black dark:text-white p-6 sm:p-8 space-y-6 relative shadow-[0_6px_0_#000000]">
            {/* Board Header Bar with Route Code */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/15 dark:border-white/15 pb-3">
              <div className="font-bungee text-xs sm:text-sm text-[#E4262A] dark:text-[#FFC72C] tracking-wider uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4262A] inline-block border border-black" />
                <span>PASSENGER PROFILE // MANILA-CEBU CORRIDOR</span>
              </div>
              <span className="font-mono text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-widest">
                DOC-REF: ZR-2026
              </span>
            </div>

            {/* Vehicle Decal Pull Quote (§6.1.6: Personal Principle / Street Code) */}
            <div className="biyahe-plate bg-[#FFC72C] text-black p-4 sm:p-5 space-y-1.5 shadow-[0_3px_0_#000000]">
              <div className="font-bungee text-[11px] text-[#1B3FD1] tracking-widest uppercase">
                ★ STREET CODE // OPERATING PRINCIPLE
              </div>
              <blockquote className="font-lexend font-bold text-sm sm:text-base leading-snug italic">
                “{social.tagline}”
              </blockquote>
            </div>

            {/* Primary Bio Text (§6.1.6: Lexend 1.125rem / 1.6, max 65ch) */}
            <div className="space-y-4">
              <p className="font-lexend text-base sm:text-lg leading-relaxed text-black dark:text-white max-w-[65ch]">
                {social.about}
              </p>
            </div>

            {/* Expandable Details */}
            {expanded && (
              <div className="pt-4 border-t-2 border-black/15 dark:border-white/15 space-y-4 font-lexend text-sm sm:text-base leading-relaxed text-black/90 dark:text-white/90">
                <div className="p-4 biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white space-y-2">
                  <div className="font-bungee text-xs text-[#0F9D58] uppercase tracking-wider">
                    ACTIVE POSTING &amp; FOCUS
                  </div>
                  <p>
                    <strong>Current Station:</strong> {social.subrole}
                  </p>
                  <p>
                    <strong>Engineering Grounding:</strong> {social.intro}
                  </p>
                </div>
              </div>
            )}

            {/* Read More / Less Pressable Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                style={{ ["--depth-color" as string]: "#CCCCCC" }}
                className="pressable-plate px-5 py-2.5 bg-[#FFC72C] text-black font-bungee text-xs tracking-wider uppercase inline-flex items-center gap-2"
              >
                <span>{expanded ? "READ LESS ▲" : "READ MORE ▼"}</span>
              </button>
            </div>
          </div>

          {/* Fact Plates (5 cols on desktop, row of 3 on tablet, stacked on mobile §6.1.12) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {/* Fact 1: Cobalt Stamped Plate */}
            <div className="biyahe-plate bg-[#1B3FD1] text-white p-5 sm:p-6 space-y-2 relative shadow-[0_4px_0_#000000]">
              {/* Corner Bolt Accents (§6.1.6) */}
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute top-2.5 left-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute top-2.5 right-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute bottom-2.5 left-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute bottom-2.5 right-2.5" aria-hidden="true" />

              <div className="font-bungee text-xs text-[#FFC72C] tracking-wider uppercase pl-2">
                ENGINEERING ROLE
              </div>
              <div className="font-lexend font-bold text-base sm:text-lg pl-2 leading-tight">
                {social.role}
              </div>
              <div className="font-lexend text-xs text-white/80 pl-2">
                {social.subrole}
              </div>
            </div>

            {/* Fact 2: Leaf Stamped Plate */}
            <div className="biyahe-plate bg-[#0F9D58] text-black p-5 sm:p-6 space-y-2 relative shadow-[0_4px_0_#000000]">
              {/* Corner Bolt Accents (§6.1.6) */}
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-black/40 absolute top-2.5 left-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-black/40 absolute top-2.5 right-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-black/40 absolute bottom-2.5 left-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-black/40 absolute bottom-2.5 right-2.5" aria-hidden="true" />

              <div className="font-bungee text-xs text-black/75 tracking-wider uppercase pl-2">
                ACADEMIC FORMATION
              </div>
              <div className="font-lexend font-bold text-base sm:text-lg pl-2 leading-tight">
                {education ? education.title : "BS in Information Technology (Senior)"}
              </div>
              <div className="font-lexend text-xs text-black/80 pl-2">
                {education ? education.organization : "Cebu Institute of Technology – University"}
              </div>
            </div>

            {/* Fact 3: Signal Stamped Plate */}
            <div className="biyahe-plate bg-[#E4262A] text-white p-5 sm:p-6 space-y-2 relative shadow-[0_4px_0_#000000]">
              {/* Corner Bolt Accents (§6.1.6) */}
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute top-2.5 left-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute top-2.5 right-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute bottom-2.5 left-2.5" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/30 border border-white/40 absolute bottom-2.5 right-2.5" aria-hidden="true" />

              <div className="font-bungee text-xs text-[#FFC72C] tracking-wider uppercase pl-2">
                TRANSIT BASE // LOCATION
              </div>
              <div className="font-lexend font-bold text-base sm:text-lg pl-2 leading-tight">
                {social.location}
              </div>
              <div className="font-lexend text-xs text-white/80 pl-2">
                Philippines • UTC+8 Corridor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
