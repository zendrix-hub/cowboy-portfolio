import React from "react";
import { skillCategories } from "@/data/skills";

export default function CurrentSkills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="zone-4 relative min-h-screen py-[clamp(100px,14vh,160px)] select-text"
    >
      {/* Section Header */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 mb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
          <div className="lg:col-span-7 max-w-[36rem]">
            <h2
              id="skills-title"
              className="font-fraunces text-[clamp(2.75rem,7vw,6rem)] leading-[1.0] text-[var(--fg)] tracking-normal m-0"
            >
              Skills
            </h2>
          </div>
        </div>
      </div>

      {/* Strata: Full-Bleed Horizontal Bands Alternating Two Tones (§6.3.8) */}
      <div className="w-full flex flex-col relative z-10">
        {skillCategories.map((category, idx) => {
          const isAlt = idx % 2 === 1;

          return (
            <div
              key={category.name}
              className={`w-full py-[clamp(48px,8vh,96px)] px-6 sm:px-12 lg:px-20 transition-colors ${
                isAlt ? "zone-4-alt" : "zone-4"
              }`}
            >
              <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
                {/* Left Channel Area (desktop): 5 cols */}
                <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />

                {/* Right Reading Column: 7 cols */}
                <div className="lg:col-span-7 flex flex-col items-start max-w-[36rem]">
                  {/* Category Title in Hanken 500 0.9375rem */}
                  <h3 className="text-[0.9375rem] font-medium text-[var(--fg-2)] tracking-wide uppercase m-0">
                    {category.name}
                  </h3>

                  {category.focus && (
                    <p className="mt-2 text-[1rem] text-[var(--fg-2)] font-normal italic">
                      {category.focus}
                    </p>
                  )}

                  {/* Skills Flow: Line of Words in Fraunces 300, wrapping (§6.3.8) */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={skill}
                        className="font-fraunces text-[clamp(1.5rem,3vw,2.25rem)] text-[var(--fg)] leading-normal font-normal whitespace-nowrap"
                      >
                        {skill}
                        {sIdx < category.skills.length - 1 && (
                          <span
                            className="ml-5 text-[var(--fg-2)] opacity-40 font-sans text-[1rem] select-none pointer-events-none"
                            aria-hidden="true"
                          >
                            •
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
