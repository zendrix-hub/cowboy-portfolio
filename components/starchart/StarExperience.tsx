import React from "react";
import { experiences } from "@/data/experience";

export function StarExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="w-full min-h-[85svh] px-4 sm:px-6 lg:px-8 py-20 relative z-10"
    >
      <div className="max-w-[800px] mx-auto space-y-12">
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>WAYPOINT 05 // FIELD OBSERVATIONS</span>
          </div>
          <h2
            id="experience-title"
            className="font-space font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-ink"
          >
            Chronology &amp; Milestone Log
          </h2>
          <p className="font-sans text-sm text-ink-2 max-w-xl">
            A chronological field register of enterprise engineering internships, university academic milestones, and cloud certifications.
          </p>
        </header>

        {/* Chronology List with Star-Dot Bullets (§9.4.9) */}
        <div className="space-y-10 pl-2">
          {experiences.map((item) => {
            const isPresent = item.period.toLowerCase().includes("present");

            return (
              <article
                key={item.title}
                className="space-y-3 pl-6 border-l border-ink-2/30 relative"
              >
                {/* Star-Dot Bullet: Filled gold if current, hollow otherwise */}
                <div
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                    isPresent
                      ? "bg-gold ring-2 ring-field star-point"
                      : "border border-ink-2 bg-field"
                  }`}
                  aria-hidden="true"
                />

                {/* Period in JetBrains Mono Data Role */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className={isPresent ? "text-gold font-semibold uppercase" : "text-ink-2"}>
                    {item.period}
                  </span>
                  <span className="text-ink-2/70 uppercase">
                    [{item.category}]
                  </span>
                </div>

                {/* Title in Space Grotesk */}
                <div>
                  <h3 className="font-space font-bold text-xl text-ink">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink-2 mt-0.5">
                    {item.organization}
                  </p>
                </div>

                {/* Description in Public Sans */}
                <p className="font-sans text-sm leading-[1.65] text-ink">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1 pt-1 font-sans text-xs sm:text-sm text-ink-2">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold/80 select-none" aria-hidden="true">•</span>
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
