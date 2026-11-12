import React from "react";
import { experiences } from "@/data/experience";
import {
  NecLogo,
  CitUniversityLogo,
  AwsLogo,
  IbmLogo,
  OpenLearningLogo,
  PhilNitsLogo,
} from "./BrandLogos";

function renderCategoryEmblems(category: string) {
  if (category === "Internship") {
    return <NecLogo />;
  }
  if (category === "Education") {
    return <CitUniversityLogo />;
  }
  if (category === "Certification") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <AwsLogo />
        <IbmLogo />
        <OpenLearningLogo />
      </div>
    );
  }
  return <PhilNitsLogo />;
}

export default function CurrentExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="zone-5 relative min-h-screen px-6 sm:px-12 lg:px-20 py-[clamp(140px,18vh,220px)] select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-20 sm:gap-28 relative z-10">
        {/* Section Heading */}
        <div className="max-w-[38rem]">
          <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
            SECTION 05 // WORK EXPERIENCE & EDUCATION
          </span>
          <h2
            id="experience-title"
            className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
          >
            Experience
          </h2>
        </div>

        {/* Waypoints: Entries in Repo Order (§6.3.9) */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {experiences.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes("present");
            const nodeId = `node-exp-${idx}`;

            return (
              <article
                key={`${item.organization}-${item.title}`}
                aria-labelledby={`exp-${idx}-title`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative"
              >
                {/* Reading Column: 8 cols (desktop), text on left inside elevated card */}
                <div className="lg:col-span-8 flex flex-col items-start max-w-[44rem] p-6 sm:p-8 rounded-2xl bg-[var(--tributary-surface)]/75 border border-[var(--line)]/30 shadow-sm">
                  {/* Top Bar: Period, Category Badge & Institutional Logo */}
                  <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--line)]/20">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[0.875rem] font-semibold text-[var(--fg)] tracking-wide font-mono px-3 py-1 rounded-full bg-[var(--zone-bg)] border border-[var(--line)]/25">
                        {item.period}
                      </span>
                      <span className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--fg-2)]">
                        {"//"} {item.category}
                      </span>
                    </div>

                    {renderCategoryEmblems(item.category)}
                  </div>

                  {/* Title in Fraunces 300 */}
                  <h3
                    id={`exp-${idx}-title`}
                    className="mt-5 font-fraunces text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.15] text-[var(--fg)] font-normal m-0"
                  >
                    {item.title}
                  </h3>

                  {/* Organization in Hanken 500 */}
                  <p className="mt-1.5 text-[1.125rem] text-[var(--fg-2)] font-medium">
                    {item.organization}
                  </p>

                  {/* Description in full */}
                  <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[var(--fg)]">
                    {item.description}
                  </p>

                  {/* Highlights with clean vector checkmarks */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2.5 text-[0.96875rem] leading-[1.6] text-[var(--fg-2)]">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--line)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-1 shrink-0"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-[var(--fg)]">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Clickable Verified Credential Links (Credly from Resume) */}
                  {item.credentials && item.credentials.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[var(--line)]/20 w-full flex flex-wrap items-center gap-3">
                      {item.credentials.map((cred) =>
                        cred.url ? (
                          <a
                            key={cred.label}
                            href={cred.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--zone-bg)] border border-[var(--line)]/35 text-[var(--fg)] text-[0.8125rem] font-mono font-medium hover:border-[var(--line)] transition-all shadow-sm"
                          >
                            <span>{cred.label}</span>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </a>
                        ) : (
                          <span
                            key={cred.label}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--zone-bg)]/60 border border-[var(--line)]/20 text-[var(--fg-2)] text-[0.8125rem] font-mono"
                          >
                            <span>{cred.label}</span>
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Waypoint Node Target in Right Channel (§6.3.9, §6.3.12) */}
                <div className="lg:col-span-4 hidden lg:flex justify-center items-center h-full relative">
                  <div
                    id={nodeId}
                    data-node="waypoint"
                    data-current={isCurrent ? "true" : "false"}
                    className="w-6 h-6 rounded-full opacity-0 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
