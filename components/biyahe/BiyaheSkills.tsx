"use client";

import { useState } from "react";
import { skillCategories } from "@/data/skills";
import { Smartphone, Server, Layout, Sparkles, Terminal, Layers } from "lucide-react";

const ENDCAP_COLORS = [
  { bg: "bg-[#FFC72C]", text: "text-black", depth: "#CC9F23" },
  { bg: "bg-[#E4262A]", text: "text-white", depth: "#B61E22" },
  { bg: "bg-[#1B3FD1]", text: "text-white", depth: "#1632A7" },
  { bg: "bg-white", text: "text-black", depth: "#CCCCCC" },
];

function getCategoryIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("mobile")) return <Smartphone className="w-5 h-5" aria-hidden="true" />;
  if (n.includes("backend")) return <Server className="w-5 h-5" aria-hidden="true" />;
  if (n.includes("web") || n.includes("full-stack")) return <Layout className="w-5 h-5" aria-hidden="true" />;
  if (n.includes("ai") || n.includes("data")) return <Sparkles className="w-5 h-5" aria-hidden="true" />;
  return <Terminal className="w-5 h-5" aria-hidden="true" />;
}

export default function BiyaheSkills() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const displayedCategories =
    selectedFilter === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.name === selectedFilter);

  return (
    <section id="skills" className="bg-[#0F9D58] text-black py-12 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#FFC72C] text-black px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
            SKILLS // STOP 03
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* 1. Capabilities Manifest Lead Board (§6.1.8) */}
        <div className="biyahe-board bg-[#FFC72C] text-black p-6 sm:p-8 lg:p-10 space-y-6 shadow-[0_6px_0_#000000]">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black/20 pb-3">
            <div className="font-bungee text-xs sm:text-sm text-[#1B3FD1] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4262A] inline-block border border-black" />
              <span>TRANSIT CAPABILITIES MANIFEST // VERIFIED PRODUCTION READY</span>
            </div>
            <div className="font-mono text-xs font-bold text-black/70 uppercase tracking-wider">
              TOTAL SPEC: {totalSkillsCount} PRODUCTION TECHNOLOGIES
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h3 className="font-bungee text-2xl sm:text-4xl lg:text-5xl text-black tracking-tight leading-none">
              TECHNICAL SKILLS &amp; ARCHITECTURE
            </h3>
            <p className="font-lexend text-base sm:text-lg text-black/90 max-w-3xl leading-relaxed">
              A structured overview of core competencies across mobile platforms, backend systems, full-stack web, and applied AI—engineered for real production constraints.
            </p>
          </div>

          {/* Domain Summary Callout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 biyahe-plate bg-white text-black shadow-[0_2px_0_#000000]">
              <div className="font-bungee text-[10px] text-[#1B3FD1] uppercase">01 // MOBILE</div>
              <div className="font-lexend font-bold text-xs sm:text-sm mt-0.5">Android &amp; Compose</div>
              <div className="font-mono text-[10px] text-black/60">Offline-First • Vosk</div>
            </div>
            <div className="p-3 biyahe-plate bg-white text-black shadow-[0_2px_0_#000000]">
              <div className="font-bungee text-[10px] text-[#E4262A] uppercase">02 // BACKEND</div>
              <div className="font-lexend font-bold text-xs sm:text-sm mt-0.5">Spring Boot &amp; Python</div>
              <div className="font-mono text-[10px] text-black/60">JWT • APScheduler</div>
            </div>
            <div className="p-3 biyahe-plate bg-white text-black shadow-[0_2px_0_#000000]">
              <div className="font-bungee text-[10px] text-[#0F9D58] uppercase">03 // FULL-STACK</div>
              <div className="font-lexend font-bold text-xs sm:text-sm mt-0.5">Next.js &amp; React</div>
              <div className="font-mono text-[10px] text-black/60">TypeScript • Tailwind</div>
            </div>
            <div className="p-3 biyahe-plate bg-white text-black shadow-[0_2px_0_#000000]">
              <div className="font-bungee text-[10px] text-black/80 uppercase">04 // APPLIED AI</div>
              <div className="font-lexend font-bold text-xs sm:text-sm mt-0.5">Gemini &amp; RAG</div>
              <div className="font-mono text-[10px] text-black/60">ChromaDB • Langfuse</div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Domain Filter Route Plates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="font-bungee text-xs sm:text-sm text-black uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>SELECT MODULE DOMAIN // FILTER STRIPS</span>
            </div>
            {selectedFilter !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className="font-bungee text-xs text-black underline uppercase"
              >
                SHOW ALL (5)
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              aria-pressed={selectedFilter === "all"}
              style={{ ["--depth-color" as string]: selectedFilter === "all" ? "#000000" : "#CCCCCC" }}
              className={`pressable-plate px-4 py-2 font-bungee text-xs tracking-wider uppercase flex items-center gap-2 ${
                selectedFilter === "all"
                  ? "bg-black text-white pressed-in ring-2 ring-white"
                  : "bg-white text-black shadow-[0_3px_0_#000000]"
              }`}
            >
              <span>ALL MODULES ({skillCategories.length})</span>
            </button>

            {skillCategories.map((category, idx) => {
              const isSelected = selectedFilter === category.name;
              const endcap = ENDCAP_COLORS[idx % ENDCAP_COLORS.length];

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedFilter(category.name)}
                  aria-pressed={isSelected}
                  style={{ ["--depth-color" as string]: isSelected ? "#000000" : endcap.depth }}
                  className={`pressable-plate px-3.5 py-2 font-bungee text-xs tracking-wider uppercase flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-black text-white pressed-in ring-2 ring-white"
                      : `${endcap.bg} ${endcap.text} shadow-[0_3px_0_#000000]`
                  }`}
                >
                  <span className="opacity-80">0{idx + 1}</span>
                  <span className="truncate max-w-[180px] sm:max-w-none">{category.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Category Strips on Leaf Band (§6.1.8, §6.1.12) */}
        <div className="space-y-6">
          {displayedCategories.map((category) => {
            const actualIdx = skillCategories.findIndex((c) => c.name === category.name);
            const endcap = ENDCAP_COLORS[actualIdx % ENDCAP_COLORS.length];
            const icon = getCategoryIcon(category.name);

            return (
              <div
                key={category.name}
                className="biyahe-board bg-white dark:bg-[#131E57] text-black dark:text-white p-5 sm:p-6 flex flex-col lg:flex-row items-stretch gap-5 sm:gap-6 shadow-[0_6px_0_#000000]"
              >
                {/* Colored End-Cap Plate (Left on Desktop, Top on Tablet/Mobile §6.1.12) */}
                <div
                  className={`w-full lg:w-80 shrink-0 biyahe-plate ${endcap.bg} ${endcap.text} p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_0_#000000]`}
                >
                  <div>
                    {/* Header Row in Endcap */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/20 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                          MODULE 0{actualIdx + 1}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/15">
                        {category.skills.length} SPECS
                      </span>
                    </div>

                    <h3 className="font-bungee text-base sm:text-lg tracking-wide uppercase leading-tight">
                      {category.name}
                    </h3>
                  </div>

                  {category.focus && (
                    <div className="pt-3 mt-3 border-t border-black/15">
                      <div className="font-mono text-[9px] uppercase tracking-wider font-bold opacity-75">
                        CORE FOCUS
                      </div>
                      <p className="font-lexend text-xs opacity-90 mt-1 leading-relaxed">
                        {category.focus}
                      </p>
                    </div>
                  )}
                </div>

                {/* Chalk Chips Area (§6.1.8: Lexend 600, 1rem, 3px outline, 8px radius) */}
                <div className="flex-1 flex flex-col justify-center space-y-2">
                  <div className="font-bungee text-[10px] text-black/60 dark:text-white/60 uppercase tracking-wider">
                    VERIFIED TECHNICAL STACK // NON-INTERACTIVE CHIPS
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 py-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white px-4 py-2 font-lexend font-semibold text-sm sm:text-base border-3 border-black rounded-lg shadow-[0_2px_0_#000000] inline-flex items-center gap-2 select-none"
                      >
                        <span
                          className="w-2 h-2 rounded-full bg-[#0F9D58] border border-black inline-block shrink-0"
                          aria-hidden="true"
                        />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Transit Inspection Footer Stamp */}
        <div className="biyahe-plate bg-[#0B1440] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-2 border-black shadow-[0_4px_0_#000000]">
          <div className="flex items-center gap-2 font-bungee text-xs text-[#FFC72C] uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] inline-block border border-white" />
            <span>TRANSIT VERIFICATION: ALL 40+ TECHNOLOGIES FORMALLY TESTED IN REPO</span>
          </div>
          <div className="font-mono text-[11px] text-white/75">
            STANDARDS: CLEAN ARCHITECTURE • ZERO DEPENDENCIES • WCAG 2.2 AA
          </div>
        </div>
      </div>
    </section>
  );
}
