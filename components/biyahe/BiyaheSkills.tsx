import { skillCategories } from "@/data/skills";

const ENDCAP_COLORS = [
  { bg: "bg-[#FFC72C]", text: "text-black" },
  { bg: "bg-[#E4262A]", text: "text-white" },
  { bg: "bg-[#1B3FD1]", text: "text-white" },
  { bg: "bg-white", text: "text-black" },
];

export default function BiyaheSkills() {
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

        {/* Category Strips on Leaf Band (§6.1.8, §6.1.12) */}
        <div className="space-y-6">
          {skillCategories.map((category, idx) => {
            const endcap = ENDCAP_COLORS[idx % ENDCAP_COLORS.length];

            return (
              <div
                key={category.name}
                className="biyahe-board bg-white dark:bg-[#131E57] text-black dark:text-white p-5 sm:p-6 flex flex-col lg:flex-row items-stretch gap-5 sm:gap-6 shadow-[0_6px_0_#000000]"
              >
                {/* Colored End-Cap Plate (Left on Desktop, Top on Tablet/Mobile) */}
                <div
                  className={`w-full lg:w-72 shrink-0 biyahe-plate ${endcap.bg} ${endcap.text} p-5 flex flex-col justify-center shadow-[0_3px_0_#000000]`}
                >
                  <div className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">
                    SYSTEM MODULE 0{idx + 1}
                  </div>
                  <h3 className="font-bungee text-sm sm:text-base tracking-wide uppercase leading-tight">
                    {category.name}
                  </h3>
                  {category.focus && (
                    <p className="font-lexend text-xs opacity-90 mt-2 leading-relaxed">
                      {category.focus}
                    </p>
                  )}
                </div>

                {/* Chalk Chips (Lexend 600, 1rem, 3px outline, 8px radius §6.1.8) */}
                <div className="flex-1 flex flex-wrap items-center content-center gap-2.5 sm:gap-3 py-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#F8F9FA] dark:bg-[#0B1440] text-black dark:text-white px-4 py-2 font-lexend font-semibold text-sm sm:text-base border-3 border-black rounded-lg shadow-[0_2px_0_#000000] select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
