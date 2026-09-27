import React from "react";
import { experiences } from "@/data/experience";

export function MastheadExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-ink-2/30"
    >
      {/* Editorial Section Masthead Label */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-ink-2/20 text-xs text-ink-2">
        <span className="font-mono text-[11px] uppercase tracking-wider">Folio 05 // The Record</span>
        <span className="font-mono text-[11px] uppercase tracking-wider">Chronology &amp; Service</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs uppercase tracking-widest text-spot font-semibold block">
            Chronology
          </span>
          <h2
            id="experience-heading"
            className="font-playfair font-bold text-[clamp(2rem,4vw,3.5rem)] leading-tight text-ink"
          >
            The Official Record
          </h2>
          <p className="font-sans text-sm text-ink-2 leading-relaxed">
            A chronological register of enterprise internships, academic credentials, and verified engineering certifications.
          </p>
        </div>

        {/* The Record: Narrow single-column measure (§9.2.9) */}
        <div className="lg:col-span-8 lg:border-l lg:border-ink-2/25 lg:pl-12 space-y-12">
          {experiences.map((item) => {
            const isPresent = item.period.toLowerCase().includes("present");

            return (
              <article
                key={item.title}
                className="relative pl-6 sm:pl-8 border-l border-ink-2/25 space-y-3"
              >
                {/* Bullet: Spot dot for current, ink dot for past (§9.2.9) */}
                <div
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 ${
                    isPresent ? "bg-spot ring-2 ring-ground" : "bg-ink"
                  }`}
                  aria-hidden="true"
                />

                {/* Period & Category Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-spot font-semibold tracking-wider uppercase">
                    {item.period}
                  </span>
                  <span className="text-ink-2/70 uppercase">
                    [{item.category}]
                  </span>
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="font-playfair font-bold text-xl sm:text-2xl text-ink leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-playfair italic text-sm sm:text-base text-ink-2 mt-0.5">
                    {item.organization}
                  </p>
                </div>

                {/* Description in Work Sans */}
                <p className="font-sans text-[0.9375rem] leading-[1.65] text-ink">
                  {item.description}
                </p>

                {/* Highlights List */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-1 font-sans text-xs sm:text-sm text-ink-2">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="leading-relaxed flex items-start gap-2">
                        <span className="text-ink-2/40 select-none" aria-hidden="true">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
