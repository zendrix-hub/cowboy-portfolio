import React from "react";
import { RoomThreshold } from "./RoomThreshold";
import { skillCategories } from "@/data/skills";

export function WingSkills() {
  return (
    <section
      id="room-04"
      aria-labelledby="collection-room-heading"
      className="w-full min-h-[90svh] flex flex-col justify-between max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16"
    >
      <RoomThreshold roomNumber="04" roomName="The Collection" />

      <div className="flex-1 space-y-12 sm:space-y-16 py-8">
        <header className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-brass font-archivo font-bold block">
            Wing Collection
          </span>
          <h2
            id="collection-room-heading"
            className="font-archivo font-bold text-[clamp(2rem,5vw,4rem)] leading-tight text-ink uppercase"
          >
            Technical Disciplines
          </h2>
          <p className="font-sans text-sm text-ink-2 max-w-xl">
            A structured catalog of languages, architectures, and environments used throughout research, enterprise, and thesis software implementations.
          </p>
        </header>

        {/* Categories with Sharp Rectangular Outlined Tags (§9.3.8) */}
        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-ink/20 pb-2">
                <h3 className="font-archivo font-bold text-sm sm:text-base text-ink uppercase tracking-wide">
                  {category.name}
                </h3>
                <span className="font-mono text-xs text-ink-2">
                  {category.skills.length} Items
                </span>
              </div>

              {category.focus && (
                <p className="font-sans text-xs text-ink-2">
                  {category.focus}
                </p>
              )}

              {/* Rectangular outlined tags (1px ink, ZERO radius, sharp corners) */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 bg-concrete border border-ink text-xs font-sans font-medium text-ink tracking-tight select-none hover:border-brass hover:text-brass transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full text-right text-[11px] font-mono text-ink-2/60 pt-6 border-t border-ink-2/15 select-none">
        <span>ROOM 04 // THE PERMANENT COLLECTION</span>
      </div>
    </section>
  );
}
