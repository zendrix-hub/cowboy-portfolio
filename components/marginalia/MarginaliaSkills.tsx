import React from "react";
import { MarginaliaPage } from "./MarginaliaPage";
import { skillCategories } from "@/data/skills";

const SEEDED_CHIP_ROTATIONS = [-2, 1.5, -1, 2.5, -2.5, 1, -1.5, 2, -0.5, 1.8];

export function MarginaliaSkills() {
  const marginNotes = (
    <div className="space-y-6 pt-6 select-none">
      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[-1.5deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [SKILL INVENTORY]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          Tools and systems used across production and capstone environments.
        </p>
      </div>

      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[1deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [ZERO INVENTIONS]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          No arbitrary percentage bars or fake skill ratings.
        </p>
      </div>
    </div>
  );

  let globalSkillIndex = 0;

  return (
    <MarginaliaPage
      id="skills"
      pageNumber={4}
      rotation={0.8}
      leftTapeRotation={3}
      rightTapeRotation={-2}
      marginContent={marginNotes}
    >
      <div className="space-y-8 sm:space-y-10">
        <header>
          <span className="font-courier text-xs uppercase tracking-widest text-tape font-bold block mb-1">
            SECTION // CAPABILITIES
          </span>
          <h2
            id="skills-title"
            className="font-lora font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-tight text-ink"
          >
            Technical Stack &amp; Scraps
          </h2>
        </header>

        {/* Categories as Paper Scrap Groupings (§9.1.8) */}
        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-3">
              {/* Category label in Courier Prime */}
              <div className="flex items-center gap-2 border-b border-ink-2/20 pb-1.5">
                <span className="w-1.5 h-1.5 bg-tape rounded-full" aria-hidden="true" />
                <h3 className="font-courier font-bold text-xs sm:text-sm text-ink uppercase tracking-wider">
                  {category.name}
                </h3>
                <span className="font-courier text-[11px] text-ink-2/70 ml-auto">
                  [{category.skills.length} items]
                </span>
              </div>

              {/* Tag Chips (2px radius, thin ink-2 outline, seeded-rotated -3deg to 3deg) */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {category.skills.map((skill) => {
                  const rot = SEEDED_CHIP_ROTATIONS[globalSkillIndex % SEEDED_CHIP_ROTATIONS.length];
                  globalSkillIndex++;

                  return (
                    <span
                      key={skill}
                      style={{ transform: `rotate(${rot}deg)` }}
                      className="tag-chip inline-flex items-center px-3 py-1.5 bg-white dark:bg-[#231E19] border border-ink-2/30 rounded-[2px] font-courier text-xs sm:text-[0.8125rem] text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-tape hover:text-tape transition-colors duration-150 select-none"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarginaliaPage>
  );
}
