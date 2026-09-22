import { skillCategories } from "@/data/skills";

const ENDCAP_CONFIGS = [
  {
    bg: "bg-[#FFC72C]",
    text: "text-black",
    code: "STOP 03-A",
    badge: "MOBILE SYSTEMS",
  },
  {
    bg: "bg-[#E4262A]",
    text: "text-white",
    code: "STOP 03-B",
    badge: "BACKEND APIS",
  },
  {
    bg: "bg-[#1B3FD1]",
    text: "text-white",
    code: "STOP 03-C",
    badge: "WEB & FULL-STACK",
  },
  {
    bg: "bg-white",
    text: "text-black",
    code: "STOP 03-D",
    badge: "APPLIED AI",
  },
  {
    bg: "bg-[#FFC72C]",
    text: "text-black",
    code: "STOP 03-E",
    badge: "DEVOPS & TOOLS",
  },
];

export default function BiyaheSkills() {
  return (
    <section id="skills" className="bg-[#0F9D58] text-black pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Title Header (§6.1.8) */}
        <div className="flex items-center gap-3">
          <div className="biyahe-plate bg-[#FFC72C] text-black px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
            SKILLS // STOP 03
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* All 5 Category Strips Directly Displayed on Leaf Band (§6.1.8, §6.1.12) */}
        <div className="space-y-6 sm:space-y-8">
          {skillCategories.map((category, idx) => {
            const config = ENDCAP_CONFIGS[idx % ENDCAP_CONFIGS.length];

            return (
              <div
                key={category.name}
                className="biyahe-board bg-white dark:bg-[#131E57] text-black dark:text-white p-5 sm:p-7 flex flex-col lg:flex-row items-stretch gap-6 shadow-[0_6px_0_#000000] relative"
              >
                {/* Stamped Corner Rivet Accents */}
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 border border-black/40 absolute top-2.5 left-2.5 pointer-events-none" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 border border-black/40 absolute top-2.5 right-2.5 pointer-events-none" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 border border-black/40 absolute bottom-2.5 left-2.5 pointer-events-none" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 border border-black/40 absolute bottom-2.5 right-2.5 pointer-events-none" aria-hidden="true" />

                {/* Colored End-Cap Plate (Left on Desktop, Top on Tablet/Mobile §6.1.8, §6.1.12) */}
                <div
                  className={`w-full lg:w-80 shrink-0 biyahe-plate ${config.bg} ${config.text} p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_0_#000000]`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/20 pb-2 mb-3">
                      <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                        {config.code}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/15 uppercase">
                        {category.skills.length} SKILLS
                      </span>
                    </div>

                    {/* Category Title in Bungee */}
                    <h3 className="font-bungee text-base sm:text-xl tracking-wide uppercase leading-tight">
                      {category.name}
                    </h3>
                  </div>

                  {/* Focus Description in Lexend */}
                  {category.focus && (
                    <div className="pt-3 mt-3 border-t border-black/15">
                      <div className="font-mono text-[9px] uppercase tracking-wider font-bold opacity-75 mb-0.5">
                        ENGINEERING FOCUS
                      </div>
                      <p className="font-lexend text-xs opacity-90 leading-relaxed">
                        {category.focus}
                      </p>
                    </div>
                  )}
                </div>

                {/* Chalk Chips Container (Right on Desktop, Below on Tablet/Mobile) */}
                <div className="flex-1 flex flex-col justify-center space-y-3 py-1">
                  <div className="font-bungee text-[11px] text-black/60 dark:text-white/60 uppercase tracking-wider">
                    PRODUCTION CAPABILITIES // VERIFIED REPOSITORY STACK
                  </div>

                  {/* Chalk Chips (Lexend 600, 1rem, 3px outline, 8px radius §6.1.8) */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white px-4 py-2 font-lexend font-semibold text-sm sm:text-base border-3 border-black rounded-lg shadow-[0_3px_0_#000000] inline-flex items-center gap-2 select-none"
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

        {/* Section Verification Footer Plate */}
        <div className="biyahe-plate bg-[#0B1440] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-2 border-black shadow-[0_4px_0_#000000]">
          <div className="flex items-center gap-2 font-bungee text-xs text-[#FFC72C] uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] inline-block border border-white" />
            <span>TRANSIT VERIFICATION // ALL 42 SKILLS TESTED IN PRODUCTION &amp; RESEARCH REPOSITORIES</span>
          </div>
          <div className="font-mono text-[11px] text-white/75">
            STANDARDS: CLEAN ARCHITECTURE • WCAG 2.2 AA • ZERO DEPENDENCIES
          </div>
        </div>
      </div>
    </section>
  );
}
