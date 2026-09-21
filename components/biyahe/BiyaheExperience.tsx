"use client";

import { useState } from "react";
import { experiences, ExperienceItem } from "@/data/experience";

function ExperienceCard({
  item,
  isExpanded,
  onToggle,
}: {
  item: ExperienceItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="biyahe-plate bg-white dark:bg-[#131E57] text-black dark:text-white p-5 space-y-2.5 shadow-[0_4px_0_#000000] w-full text-left">
      <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2">
        <span className="font-bungee text-xs text-[#E4262A] dark:text-[#FFC72C] uppercase tracking-wider">
          {item.period}
        </span>
        <span className="font-mono text-[10px] uppercase font-bold text-black/50 dark:text-white/50">
          [{item.category}]
        </span>
      </div>

      <div>
        <h4 className="font-lexend font-bold text-sm sm:text-base leading-snug">
          {item.title}
        </h4>
        <div className="font-lexend text-xs text-black/70 dark:text-white/70 font-semibold mt-0.5">
          {item.organization}
        </div>
      </div>

      <p
        className={`font-lexend text-xs sm:text-sm leading-relaxed text-black/90 dark:text-white/90 ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {item.description}
      </p>

      {/* Expanded Highlights */}
      {isExpanded && item.highlights && item.highlights.length > 0 && (
        <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-1.5">
          <div className="font-bungee text-[10px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase">
            FIELD LOGS &amp; OUTCOMES
          </div>
          <ul className="space-y-1 text-xs font-lexend text-black/85 dark:text-white/85">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#0F9D58] font-bold">➔</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.description.length > 110 && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            className="font-bungee text-[11px] text-[#1B3FD1] dark:text-[#FFC72C] hover:underline uppercase inline-flex items-center gap-1"
          >
            <span>{isExpanded ? "READ LESS ▲" : "READ MORE ▼"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function BiyaheExperience() {
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});

  const toggleExpand = (idx: number) => {
    setExpandedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="experience" className="bg-[#FFC72C] text-black py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
            JOURNEY // STOP 04
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* --- Desktop: 3-Row Road Architecture (≥1024px) (§6.1.9, §6.1.12) --- */}
        <div className="hidden lg:block relative py-6">
          {/* ROW 1: Top Plates (Stops 0 and 2 align to bottom) */}
          <div className="grid grid-cols-4 gap-6 items-end pb-0">
            {experiences.map((item, idx) => {
              const isAbove = idx % 2 === 0;
              if (!isAbove) {
                return <div key={idx} className="h-4" aria-hidden="true" />;
              }

              return (
                <div key={item.title} className="flex flex-col items-center w-full">
                  <ExperienceCard
                    item={item}
                    isExpanded={!!expandedIndices[idx]}
                    onToggle={() => toggleExpand(idx)}
                  />
                  {/* Stem connecting down to road row */}
                  <div className="w-[3px] h-8 bg-black shrink-0" aria-hidden="true" />
                </div>
              );
            })}
          </div>

          {/* ROW 2: The Highway & 4 Aligned Stop Circles */}
          <div className="relative h-12 flex items-center">
            {/* The Continuous Horizontal Road Line */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[8px] bg-black flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-full border-t-2 border-dashed border-white" />
            </div>

            {/* 4 Columns Over Road for Stem Links & Stop Circles */}
            <div className="grid grid-cols-4 gap-6 w-full h-full relative">
              {experiences.map((item, idx) => {
                const isCurrent = item.period.toLowerCase().includes("present");
                const isAbove = idx % 2 === 0;

                return (
                  <div key={idx} className="relative flex items-center justify-center h-full">
                    {/* Upper stem connector for above cards */}
                    {isAbove && (
                      <div
                        className="absolute top-0 bottom-1/2 left-1/2 -translate-x-1/2 w-[3px] bg-black z-0"
                        aria-hidden="true"
                      />
                    )}

                    {/* Lower stem connector for below cards */}
                    {!isAbove && (
                      <div
                        className="absolute top-1/2 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-black z-0"
                        aria-hidden="true"
                      />
                    )}

                    {/* The 24px Stop Circle (§6.1.9) */}
                    <div
                      aria-label={`Transit Stop 0${idx + 1}: ${item.title}`}
                      className={`relative z-10 w-7 h-7 rounded-full border-3 border-black flex items-center justify-center font-mono text-[10px] font-bold shadow-[0_2px_0_#000000] shrink-0 ${
                        isCurrent
                          ? "bg-[#E4262A] text-white ring-4 ring-black"
                          : "bg-white text-black"
                      }`}
                    >
                      {isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      ) : (
                        `0${idx + 1}`
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 3: Bottom Plates (Stops 1 and 3 align to top) */}
          <div className="grid grid-cols-4 gap-6 items-start pt-0">
            {experiences.map((item, idx) => {
              const isAbove = idx % 2 === 0;
              if (isAbove) {
                return <div key={idx} className="h-4" aria-hidden="true" />;
              }

              return (
                <div key={item.title} className="flex flex-col items-center w-full">
                  {/* Stem connecting down from road row */}
                  <div className="w-[3px] h-8 bg-black shrink-0" aria-hidden="true" />
                  <ExperienceCard
                    item={item}
                    isExpanded={!!expandedIndices[idx]}
                    onToggle={() => toggleExpand(idx)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Tablet & Mobile: Vertical Road at Left (<1024px) (§6.1.9, §6.1.12) --- */}
        <div className="lg:hidden relative space-y-8 pl-12 sm:pl-16">
          {/* Vertical Road Highway */}
          <div
            className="absolute left-4 sm:left-6 top-3 bottom-3 w-[8px] bg-black flex flex-col items-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="h-full border-l-2 border-dashed border-white" />
          </div>

          {experiences.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes("present");

            return (
              <div key={item.title} className="relative flex items-start">
                {/* Horizontal connector stem */}
                <div
                  className="absolute -left-8 sm:-left-10 top-5 w-8 sm:w-10 h-[3px] bg-black z-0"
                  aria-hidden="true"
                />

                {/* Stop Circle on Road */}
                <div
                  className={`absolute -left-[39px] sm:-left-[47px] top-3.5 w-7 h-7 rounded-full border-3 border-black z-10 flex items-center justify-center font-mono text-[10px] font-bold shadow-[0_2px_0_#000] shrink-0 ${
                    isCurrent
                      ? "bg-[#E4262A] text-white ring-3 ring-black"
                      : "bg-white text-black"
                  }`}
                  aria-hidden="true"
                >
                  {isCurrent ? "★" : `0${idx + 1}`}
                </div>

                {/* Card */}
                <div className="w-full">
                  <ExperienceCard
                    item={item}
                    isExpanded={!!expandedIndices[idx]}
                    onToggle={() => toggleExpand(idx)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
