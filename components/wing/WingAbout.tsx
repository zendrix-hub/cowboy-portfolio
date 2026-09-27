import React from "react";
import { RoomThreshold } from "./RoomThreshold";
import { social } from "@/data/social";
import { experiences } from "@/data/experience";

export function WingAbout() {
  const education = experiences.find((e) => e.category === "Education");

  return (
    <section
      id="room-02"
      aria-labelledby="about-room-heading"
      className="w-full min-h-[90svh] flex flex-col justify-between max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16"
    >
      <RoomThreshold roomNumber="02" roomName="Profile" />

      {/* Main Room Layout with Outer Margin Wall Labels (§9.3.6) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-8 sm:py-16">
        {/* Left Wall Labels (Desktop outer edge) */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          <div className="wall-label bg-concrete border border-ink p-4 space-y-1">
            <span className="text-[10px] font-archivo uppercase tracking-wider text-brass block font-bold">
              [WALL LABEL // FORMATION]
            </span>
            <p className="font-archivo text-xs uppercase text-ink font-semibold">
              Academic Base
            </p>
            <p className="font-sans text-xs text-ink-2 leading-relaxed">
              {education ? `${education.title}, ${education.organization}` : "BSIT Senior, CIT-U"}
            </p>
          </div>

          <div className="wall-label bg-concrete border border-ink p-4 space-y-1">
            <span className="text-[10px] font-archivo uppercase tracking-wider text-brass block font-bold">
              [WALL LABEL // PLACEMENT]
            </span>
            <p className="font-archivo text-xs uppercase text-ink font-semibold">
              Enterprise Role
            </p>
            <p className="font-sans text-xs text-ink-2 leading-relaxed">
              {social.subrole}
            </p>
          </div>
        </div>

        {/* Center Plaque: The Artist Statement (§9.3.6) */}
        <div className="lg:col-span-6 space-y-6 text-center max-w-xl mx-auto order-1 lg:order-2">
          <header className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-brass font-archivo font-bold block">
              Gallery Statement
            </span>
            <h2
              id="about-room-heading"
              className="font-archivo font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-ink uppercase"
            >
              Background &amp; Discipline
            </h2>
          </header>

          <div className="space-y-4 font-sans text-[1.0625rem] sm:text-[1.125rem] leading-[1.7] text-ink text-left">
            <p>{social.about}</p>
            <p className="italic text-ink-2 font-serif text-sm sm:text-base border-l-2 border-brass pl-4">
              &ldquo;{social.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Wall Labels (Desktop outer edge) */}
        <div className="lg:col-span-3 space-y-6 order-3">
          <div className="wall-label bg-concrete border border-ink p-4 space-y-1">
            <span className="text-[10px] font-archivo uppercase tracking-wider text-brass block font-bold">
              [WALL LABEL // LOCATION]
            </span>
            <p className="font-archivo text-xs uppercase text-ink font-semibold">
              Station &amp; Coordinates
            </p>
            <p className="font-sans text-xs text-ink-2 leading-relaxed">
              {social.location}
            </p>
          </div>

          <div className="wall-label bg-concrete border border-ink p-4 space-y-1">
            <span className="text-[10px] font-archivo uppercase tracking-wider text-brass block font-bold">
              [WALL LABEL // DOMAIN FOCUS]
            </span>
            <p className="font-archivo text-xs uppercase text-ink font-semibold">
              Core Engineering
            </p>
            <p className="font-sans text-xs text-ink-2 leading-relaxed">
              Offline-first mobile engines &amp; reliable modular API architectures.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full text-right text-[11px] font-mono text-ink-2/60 pt-6 border-t border-ink-2/15 select-none">
        <span>ROOM 02 // PROFILE STATEMENT</span>
      </div>
    </section>
  );
}
