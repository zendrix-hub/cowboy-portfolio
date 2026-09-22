import React from "react";
import { experiences } from "@/data/experience";

export default function CurrentExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="zone-5 relative min-h-screen px-6 sm:px-12 lg:px-20 py-[clamp(140px,18vh,220px)] select-text"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-24 sm:gap-32 relative z-10">
        {/* Section Heading */}
        <div className="max-w-[36rem]">
          <h2
            id="experience-title"
            className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
          >
            Experience
          </h2>
        </div>

        {/* Waypoints: Entries in Repo Order (§6.3.9) */}
        <div className="flex flex-col gap-24 sm:gap-32">
          {experiences.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes("present");
            const nodeId = `node-exp-${idx}`;

            return (
              <article
                key={`${item.organization}-${item.title}`}
                aria-labelledby={`exp-${idx}-title`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative"
              >
                {/* Reading Column: 8 cols (desktop), text on left */}
                <div className="lg:col-span-8 flex flex-col items-start max-w-[36rem]">
                  {/* Period in tabular numerals */}
                  <span className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide font-mono">
                    {item.period}
                  </span>

                  {/* Title in Fraunces 300 1.75rem */}
                  <h3
                    id={`exp-${idx}-title`}
                    className="mt-2 font-fraunces text-[1.75rem] leading-[1.2] text-[var(--fg)] font-normal m-0"
                  >
                    {item.title}
                  </h3>

                  {/* Organization in Hanken 400 1.0625rem */}
                  <p className="mt-1 text-[1.0625rem] text-[var(--fg-2)] font-normal">
                    {item.organization}
                  </p>

                  {/* Description in full (no "Read more") */}
                  <p className="mt-4 text-[1.0625rem] leading-[1.65] text-[var(--fg)]">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-[1rem] leading-[1.6] text-[var(--fg-2)] list-disc list-inside">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="marker:text-[var(--line)]">
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
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
