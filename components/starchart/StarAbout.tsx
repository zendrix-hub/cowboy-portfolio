import React from "react";
import { social } from "@/data/social";
import { experiences } from "@/data/experience";

export function StarAbout() {
  const education = experiences.find((e) => e.category === "Education");

  const observationFacts = [
    { label: "FORMATION", value: education ? `${education.title}, ${education.organization}` : "BSIT Senior, CIT-U" },
    { label: "PLACEMENT", value: social.subrole },
    { label: "COORDINATES", value: social.location },
    { label: "ENGINEERING", value: "Offline-First Mobile Systems • Distributed Backend APIs" },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="w-full min-h-[85svh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 relative z-10"
    >
      <div className="max-w-[640px] mx-auto w-full space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>WAYPOINT 02 // OBSERVATION LOG</span>
          </div>
          <h2
            id="about-title"
            className="font-space font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-ink"
          >
            System Craft &amp; Background
          </h2>
        </header>

        {/* Full unedited about text in Public Sans (§9.4.6) */}
        <div className="space-y-4 font-sans text-[1.0625rem] leading-[1.7] text-ink">
          <p>{social.about}</p>
          <p className="italic text-ink-2 font-sans text-sm sm:text-base border-l border-gold pl-4">
            &ldquo;{social.tagline}&rdquo;
          </p>
        </div>

        {/* Verified Facts in JetBrains Mono Data Role (§9.4.6) */}
        <div className="pt-6 border-t border-ink-2/20 space-y-3 font-mono text-xs sm:text-[0.8125rem]">
          <span className="text-[11px] uppercase tracking-wider text-gold block">
            VERIFIED OBSERVATION METADATA:
          </span>
          <div className="space-y-2 text-ink-2">
            {observationFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="text-ink font-semibold uppercase">{fact.label}:</span>
                <span className="text-ink-2">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
