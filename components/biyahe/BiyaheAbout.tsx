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
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block">
            ABOUT // STOP 01
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* 12-Column Grid Layout (§6.1.6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Reading Plate (7 columns) */}
          <div className="lg:col-span-7 biyahe-plate bg-white dark:bg-[#131E57] text-black dark:text-white p-6 sm:p-8 space-y-4">
            <div className="font-bungee text-xs text-[#E4262A] dark:text-[#FFC72C] tracking-wider uppercase">
              PASSENGER BIO &amp; PHILOSOPHY
            </div>

            <p className="font-lexend text-base sm:text-lg leading-relaxed text-black dark:text-white max-w-[65ch]">
              {social.about}
            </p>

            {expanded && (
              <div className="pt-3 border-t-2 border-black/20 dark:border-white/20 space-y-3 font-lexend text-sm sm:text-base leading-relaxed text-black/90 dark:text-white/90">
                <p>
                  <strong>Core Engineering Principle:</strong> {social.tagline}
                </p>
                <p>
                  <strong>Current Objective:</strong> {social.subrole}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                style={{ ["--depth-color" as string]: "#CCCCCC" }}
                className="pressable-plate px-4 py-2 bg-[#FFC72C] text-black font-bungee text-xs tracking-wider uppercase inline-flex items-center gap-1.5"
              >
                <span>{expanded ? "READ LESS ▲" : "READ MORE ▼"}</span>
              </button>
            </div>
          </div>

          {/* Stack of 3 Fact Plates (5 columns) (§6.1.6) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Fact 1: Cobalt */}
            <div className="biyahe-plate bg-[#1B3FD1] text-white p-5 space-y-1">
              <div className="font-bungee text-xs text-[#FFC72C] tracking-wider uppercase">
                ENGINEERING ROLE
              </div>
              <div className="font-lexend font-bold text-base sm:text-lg">
                {social.role}
              </div>
            </div>

            {/* Fact 2: Leaf */}
            <div className="biyahe-plate bg-[#0F9D58] text-black p-5 space-y-1">
              <div className="font-bungee text-xs text-black/70 tracking-wider uppercase">
                ACADEMIC FORMATION
              </div>
              <div className="font-lexend font-bold text-base sm:text-lg">
                {education ? `${education.title} — ${education.organization}` : "CIT-U • BSIT 4th Year"}
              </div>
            </div>

            {/* Fact 3: Signal */}
            <div className="biyahe-plate bg-[#E4262A] text-white p-5 space-y-1">
              <div className="font-bungee text-xs text-[#FFC72C] tracking-wider uppercase">
                LOCATION &amp; TRANSIT BASE
              </div>
              <div className="font-lexend font-bold text-base sm:text-lg">
                {social.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
