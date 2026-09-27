import React from "react";
import { MarginaliaPage } from "./MarginaliaPage";
import { experiences } from "@/data/experience";

export function MarginaliaExperience() {
  const marginNotes = (
    <div className="space-y-6 pt-6 select-none">
      {/* Current posting margin note */}
      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[-1deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [CURRENT LOG]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          Active internship at NEC Telecom Software Philippines (GDC).
        </p>
      </div>

      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[1.5deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [CHRONOLOGY]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          All milestones verified from institutional records.
        </p>
      </div>
    </div>
  );

  return (
    <MarginaliaPage
      id="experience"
      pageNumber={5}
      rotation={-1.2}
      leftTapeRotation={-3}
      rightTapeRotation={2}
      marginContent={marginNotes}
    >
      <div className="space-y-8 sm:space-y-10">
        <header>
          <span className="font-courier text-xs uppercase tracking-widest text-tape font-bold block mb-1">
            SECTION // LOGBOOK
          </span>
          <h2
            id="experience-title"
            className="font-lora font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-tight text-ink"
          >
            Engineering Journey &amp; Milestones
          </h2>
        </header>

        {/* Logbook Chronology Entries (§9.1.9) */}
        <div className="space-y-8 divide-y divide-ink-2/15">
          {experiences.map((item) => {
            const isPresent = item.period.toLowerCase().includes("present");

            return (
              <div
                key={item.title}
                className={`pt-6 first:pt-0 space-y-2.5 ${
                  isPresent ? "relative" : ""
                }`}
              >
                {/* Header row: Period & Category Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-courier text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-tape">{item.period}</span>
                    {isPresent && (
                      <span className="px-1.5 py-0.2 bg-tape/20 text-tape rounded-[2px] font-bold text-[10px] uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-ink-2/70 uppercase">
                    [{item.category}]
                  </span>
                </div>

                {/* Title in Lora & Organization in Source Serif Italic */}
                <div>
                  <h3 className="font-lora font-semibold text-lg sm:text-xl text-ink">
                    {item.title}
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base text-ink-2 mt-0.5">
                    {item.organization}
                  </p>
                </div>

                {/* Full description in Source Serif */}
                <p className="font-serif text-[0.9375rem] sm:text-[1rem] leading-[1.65] text-ink max-w-[620px]">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 font-serif text-xs sm:text-sm text-ink-2 pt-1">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MarginaliaPage>
  );
}
