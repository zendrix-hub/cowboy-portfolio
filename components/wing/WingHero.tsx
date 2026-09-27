import React from "react";
import { RoomThreshold } from "./RoomThreshold";
import { social } from "@/data/social";

export function WingHero() {
  return (
    <section
      id="room-01"
      aria-labelledby="entrance-heading"
      className="w-full min-h-[90svh] flex flex-col justify-between max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16"
    >
      {/* Room 01 Entrance Threshold (§9.3.2) */}
      <RoomThreshold roomNumber="01" roomName="Entrance" />

      {/* Main Entrance Space */}
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12 sm:py-20 max-w-4xl mx-auto space-y-8">
        <header className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-ink-2 font-mono block">
            West Wing // Gallery Level 1
          </span>
          <h1
            id="entrance-heading"
            className="font-archivo font-bold text-[clamp(2.75rem,9.5vw,7.25rem)] leading-[0.95] text-ink uppercase tracking-tight"
          >
            {social.name}
          </h1>
          <p className="font-sans font-medium text-base sm:text-xl text-ink-2">
            {social.role}
          </p>
        </header>

        {/* Narrative Intro */}
        <p className="font-sans text-[1.0625rem] sm:text-[1.125rem] leading-[1.7] text-ink max-w-2xl">
          {social.intro}
        </p>

        {/* Outlined Signage Actions (§9.3.3) */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          <a
            href="#room-03"
            className="wing-btn font-archivo text-xs uppercase tracking-wider"
          >
            [ See projects ]
          </a>
          <a
            href={`mailto:${social.email}`}
            className="wing-btn font-archivo text-xs uppercase tracking-wider"
          >
            [ Send an email ]
          </a>
        </div>
      </div>

      {/* Subtle Spatial Orientation Marker */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-ink-2/60 pt-8 border-t border-ink-2/15 select-none">
        <span>EXHIBITION SEQUENCE: 01 THROUGH 06</span>
        <span>WAYFINDING: FIXED LOWER CORNER</span>
      </div>
    </section>
  );
}
