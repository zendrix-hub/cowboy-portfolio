"use client";

import { useState } from "react";
import { experiences } from "@/data/experience";

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
          <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block">
            JOURNEY // STOP 04
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* --- Desktop: Horizontal Road with Alternating Plates (≥1024px) (§6.1.9) --- */}
        <div className="hidden lg:block relative py-16">
          {/* The Road: 6px black line with 2px white dashed center */}
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[8px] bg-black flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-dashed border-white" />
          </div>

          {/* Stops and Alternating Plates */}
          <div className="grid grid-cols-4 gap-6 relative">
            {experiences.map((item, idx) => {
              const isCurrent = item.period.toLowerCase().includes("present");
              const isAbove = idx % 2 === 0;
              const isExpanded = !!expandedIndices[idx];

              return (
                <div
                  key={item.title}
                  className="relative flex flex-col items-center"
                >
                  {/* Above Plate */}
                  {isAbove ? (
                    <div className="mb-8 w-full flex flex-col items-center">
                      <div className="biyahe-plate bg-white text-black p-4 sm:p-5 w-full space-y-2 shadow-md">
                        <div className="font-bungee text-xs text-[#E4262A] uppercase">
                          {item.period}
                        </div>
                        <h4 className="font-lexend font-bold text-sm sm:text-base leading-snug">
                          {item.title}
                        </h4>
                        <div className="font-lexend text-xs text-black/70 font-medium">
                          {item.organization}
                        </div>
                        <p
                          className={`font-lexend text-xs leading-relaxed text-black/90 ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {item.description}
                        </p>
                        {item.description.length > 120 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(idx)}
                            className="font-bungee text-[10px] text-[#1B3FD1] hover:underline"
                          >
                            {isExpanded ? "LESS ▲" : "MORE ▼"}
                          </button>
                        )}
                      </div>
                      {/* 3px Stem down to stop */}
                      <div className="w-[3px] h-8 bg-black" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="h-44" aria-hidden="true" />
                  )}

                  {/* Stop Circle on Road (24px, 3px outline) */}
                  <div
                    aria-label={`Stop: ${item.title}`}
                    className={`w-6 h-6 rounded-full border-3 border-black z-10 flex items-center justify-center shrink-0 ${
                      isCurrent ? "bg-[#E4262A] ring-4 ring-black" : "bg-white"
                    }`}
                  >
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    )}
                  </div>

                  {/* Below Plate */}
                  {!isAbove ? (
                    <div className="mt-8 w-full flex flex-col items-center">
                      {/* 3px Stem up to stop */}
                      <div className="w-[3px] h-8 bg-black" aria-hidden="true" />
                      <div className="biyahe-plate bg-white text-black p-4 sm:p-5 w-full space-y-2 shadow-md">
                        <div className="font-bungee text-xs text-[#E4262A] uppercase">
                          {item.period}
                        </div>
                        <h4 className="font-lexend font-bold text-sm sm:text-base leading-snug">
                          {item.title}
                        </h4>
                        <div className="font-lexend text-xs text-black/70 font-medium">
                          {item.organization}
                        </div>
                        <p
                          className={`font-lexend text-xs leading-relaxed text-black/90 ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {item.description}
                        </p>
                        {item.description.length > 120 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(idx)}
                            className="font-bungee text-[10px] text-[#1B3FD1] hover:underline"
                          >
                            {isExpanded ? "LESS ▲" : "MORE ▼"}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Tablet & Mobile: Vertical Road at Left (<1024px) (§6.1.9) --- */}
        <div className="lg:hidden relative pl-8 sm:pl-10 space-y-8">
          {/* Vertical Road Line */}
          <div
            className="absolute left-3.5 top-2 bottom-2 w-[8px] bg-black flex flex-col items-center"
            aria-hidden="true"
          >
            <div className="h-full border-l-2 border-dashed border-white" />
          </div>

          {experiences.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes("present");
            const isExpanded = !!expandedIndices[idx];

            return (
              <div key={item.title} className="relative flex items-start gap-4">
                {/* Stop Circle */}
                <div
                  className={`absolute -left-[27px] top-4 w-6 h-6 rounded-full border-3 border-black z-10 flex items-center justify-center shrink-0 ${
                    isCurrent ? "bg-[#E4262A] ring-4 ring-black" : "bg-white"
                  }`}
                >
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>

                {/* Chalk Reading Plate */}
                <div className="flex-1 biyahe-plate bg-white text-black p-5 space-y-2">
                  <div className="font-bungee text-xs text-[#E4262A] uppercase">
                    {item.period}
                  </div>
                  <h4 className="font-lexend font-bold text-base sm:text-lg">
                    {item.title}
                  </h4>
                  <div className="font-lexend text-xs text-black/70 font-medium">
                    {item.organization}
                  </div>
                  <p
                    className={`font-lexend text-xs sm:text-sm leading-relaxed text-black/90 ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    {item.description}
                  </p>
                  {item.description.length > 120 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(idx)}
                      className="font-bungee text-[11px] text-[#1B3FD1] hover:underline pt-1 block"
                    >
                      {isExpanded ? "LESS ▲" : "MORE ▼"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
