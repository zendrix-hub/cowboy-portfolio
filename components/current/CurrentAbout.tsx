import React from "react";
import { social } from "@/data/social";
import {
  NecLogo,
  CitUniversityLogo,
  PhilNitsLogo,
} from "./BrandLogos";

export default function CurrentAbout() {
  const fullText = social.about;
  const periodIndex = fullText.indexOf(".");
  const leadSentence =
    periodIndex !== -1 ? fullText.slice(0, periodIndex + 1) : fullText;
  const remainingText =
    periodIndex !== -1 ? fullText.slice(periodIndex + 1).trim() : "";

  const metrics = [
    {
      figure: "500 hrs",
      label: "Enterprise GDC Internship",
      detail: "NEC Telecom Software Philippines",
    },
    {
      figure: "4 Systems",
      label: "Built & Architected",
      detail: "Android, Spring Boot, FastAPI & RAG",
    },
    {
      figure: "1,200+ Days",
      label: "Daily Study Streak",
      detail: "Japanese & Systems Engineering",
    },
    {
      figure: "Jan 2027",
      label: "Expected Graduation",
      detail: "BSIT • CIT – University",
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="zone-2 relative min-h-[90svh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-[clamp(100px,12vh,160px)] select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Area (Desktop Channel Margin & Lifted Lead Sentence + Institutional Cards): 5 columns (§6.4) */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1 pt-6 lg:pt-0">
          {/* Lifted lead sentence positioned directly beside the line's path */}
          <div className="border-l-2 border-[var(--line)] pl-5 py-1">
            <span className="text-[0.8125rem] font-medium tracking-widest uppercase text-[var(--fg-2)] block mb-2 font-mono">
              CORE BACKGROUND & TECHNICAL FOCUS
            </span>
            <p className="font-fraunces text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.4] text-[var(--fg)] m-0">
              {leadSentence}
            </p>
          </div>

          {/* Institutional Affiliation & Identity Cards with Logos */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* NEC Card */}
            <div className="p-4 rounded-xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/25 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)]">
                  CURRENT INDUSTRY PLACEMENT
                </span>
                <span className="text-[1rem] font-medium text-[var(--fg)]">
                  {social.subrole}
                </span>
              </div>
              <NecLogo className="shrink-0" />
            </div>

            {/* CIT-U Card */}
            <div className="p-4 rounded-xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/25 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)]">
                  ACADEMIC INSTITUTION & DEGREE
                </span>
                <span className="text-[1rem] font-medium text-[var(--fg)]">
                  Cebu Institute of Technology – University (BSIT)
                </span>
              </div>
              <CitUniversityLogo className="shrink-0" />
            </div>

            {/* PhilNITS & Engineering Location Card */}
            <div className="p-4 rounded-xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/25 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--fg-2)]">
                  LOCATION & CERTIFICATION TRACK
                </span>
                <span className="text-[1rem] font-medium text-[var(--fg)]">
                  {social.location} • PhilNITS FE Candidate
                </span>
              </div>
              <PhilNitsLogo className="shrink-0" />
            </div>
          </div>
        </div>

        {/* Right Area (Reading Column): 7 columns (desktop), text on right */}
        <div className="lg:col-span-7 flex flex-col items-start max-w-[40rem] order-1 lg:order-2">
          <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
            SECTION 02 // PROFESSIONAL BACKGROUND
          </span>
          <h2
            id="about-title"
            className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
          >
            About
          </h2>

          {/* Remaining About Text in Hanken 1.125rem / 1.7 */}
          {remainingText && (
            <p className="mt-7 text-[1.125rem] leading-[1.7] text-[var(--fg)]">
              {remainingText}
            </p>
          )}

          {/* Architectural Tagline */}
          <p className="mt-5 text-[1.0625rem] leading-[1.65] text-[var(--fg-2)] italic border-l-2 border-[var(--line)]/40 pl-4">
            &ldquo;{social.tagline}&rdquo;
          </p>

          {/* 4-Metric Engineering Telemetry Snapshot Grid */}
          <div className="mt-8 w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/25 flex flex-col justify-between"
              >
                <span className="font-fraunces text-[1.5rem] leading-tight text-[var(--fg)] font-normal">
                  {m.figure}
                </span>
                <span className="mt-1.5 text-[0.8125rem] font-medium text-[var(--fg)] leading-snug">
                  {m.label}
                </span>
                <span className="mt-0.5 font-mono text-[0.6875rem] text-[var(--fg-2)] leading-tight">
                  {m.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
