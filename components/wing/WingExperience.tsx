import React from "react";
import { RoomThreshold } from "./RoomThreshold";
import { experiences } from "@/data/experience";

export function WingExperience() {
  return (
    <section
      id="room-05"
      aria-labelledby="record-room-heading"
      className="w-full min-h-[90svh] flex flex-col justify-between max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16"
    >
      <RoomThreshold roomNumber="05" roomName="The Record Wall" />

      <div className="flex-1 space-y-12 sm:space-y-16 py-8">
        <header className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-brass font-archivo font-bold block">
            Institutional Record
          </span>
          <h2
            id="record-room-heading"
            className="font-archivo font-bold text-[clamp(2rem,5vw,4rem)] leading-tight text-ink uppercase"
          >
            Chronology &amp; Service
          </h2>
          <p className="font-sans text-sm text-ink-2 max-w-xl">
            A permanent archive of enterprise software engineering internships, academic credentials, and verified cloud certifications.
          </p>
        </header>

        {/* Timeline Plaques (§9.3.9) */}
        <div className="space-y-8 max-w-4xl">
          {experiences.map((item) => {
            const isPresent = item.period.toLowerCase().includes("present");

            return (
              <article
                key={item.title}
                className={`timeline-plaque bg-concrete border border-ink p-6 sm:p-8 space-y-4 ${
                  isPresent ? "border-l-4 border-l-brass" : ""
                }`}
              >
                {/* Plaque Header: Period & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-archivo font-bold text-xs uppercase text-brass tracking-wider">
                      {item.period}
                    </span>
                    {isPresent && (
                      <span className="bg-brass text-white dark:text-zinc-950 font-archivo text-[10px] uppercase font-bold px-1.5 py-0.5">
                        Active Posting
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-ink-2/80 uppercase">
                    [{item.category}]
                  </span>
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="font-archivo font-bold text-lg sm:text-2xl text-ink uppercase leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans font-medium text-sm sm:text-base text-ink-2 mt-0.5">
                    {item.organization}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base leading-[1.65] text-ink">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-2 border-t border-ink/10 font-sans text-xs sm:text-sm text-ink-2">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brass select-none" aria-hidden="true">•</span>
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

      <div className="w-full text-right text-[11px] font-mono text-ink-2/60 pt-6 border-t border-ink-2/15 select-none">
        <span>ROOM 05 // CHRONOLOGY RECORD WALL</span>
      </div>
    </section>
  );
}
