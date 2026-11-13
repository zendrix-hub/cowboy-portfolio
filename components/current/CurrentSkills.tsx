import React from "react";
import { skillCategories } from "@/data/skills";
import { TechLogo } from "./BrandLogos";
import JaLabel from "./JaLabel";
import { sectionLabelsJa } from "@/data/japan";

export default function CurrentSkills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="zone-4 relative min-h-screen py-[clamp(100px,14vh,160px)] select-text"
    >
      {/* Section Header */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 mb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
          <div className="lg:col-span-7 max-w-[40rem]">
            <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
              SECTION 04 // TECHNICAL SKILLS & EXPERTISE
            <JaLabel>{sectionLabelsJa.skills}</JaLabel>
            </span>
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
              className={`w-full py-[clamp(44px,7vh,84px)] px-6 sm:px-12 lg:px-20 transition-colors ${
                isAlt ? "zone-4-alt" : "zone-4"
              }`}
            >
              <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                {/* Left Channel Area (desktop): 5 cols with Stratum Telemetry Badge */}
                <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center pt-1">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--tributary-surface)]/70 border border-[var(--line)]/25 font-mono text-[0.75rem] text-[var(--fg-2)]">
                    <span
                      className="w-2 h-2 rounded-full bg-[var(--line)]"
                      aria-hidden="true"
                    />
                    <span>
                      CATEGORY 0{idx + 1} {"//"} {category.skills.length} SKILLS
                    </span>
                  </div>
                </div>

                {/* Right Reading Column: 7 cols */}
                <div className="lg:col-span-7 flex flex-col items-start max-w-[42rem]">
                  {/* Category Title */}
                  <h3 className="font-fraunces text-[clamp(1.5rem,2.8vw,2rem)] text-[var(--fg)] leading-tight m-0">
                    {category.name}
                  </h3>

                  {category.focus && (
                    <p className="mt-1.5 text-[1rem] text-[var(--fg-2)] font-normal">
                      {category.focus}
                    </p>
                  )}

                  {/* Skills Grid with Vector Tech Logos */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--tributary-surface)]/85 border border-[var(--line)]/30 text-[var(--fg)] text-[0.9375rem] font-medium shadow-sm hover:border-[var(--line)] hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <TechLogo
                          name={skill}
                          className="w-4 h-4 shrink-0"
                        />
                        <span>{skill}</span>
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
