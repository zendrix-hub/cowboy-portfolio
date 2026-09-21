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
          <div className="biyahe-plate bg-[#FFC72C] text-black px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block">
            SKILLS // STOP 03
          </div>
          <div className="h-1 bg-black flex-1 hidden sm:block" />
        </div>

        {/* Category Strips (§6.1.8) */}
        <div className="space-y-6">
          {skillCategories.map((category, idx) => {
            const endcap = ENDCAP_COLORS[idx % ENDCAP_COLORS.length];

            return (
              <div
                key={category.name}
                className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 biyahe-plate bg-black/10 p-3 sm:p-4"
              >
                {/* Colored End-Cap Plate */}
                <div
                  className={`w-full md:w-64 shrink-0 biyahe-plate ${endcap.bg} ${endcap.text} p-4 flex flex-col justify-center`}
                >
                  <h3 className="font-bungee text-sm sm:text-base tracking-wide uppercase leading-snug">
                    {category.name}
                  </h3>
                  {category.focus && (
                    <p className="font-lexend text-xs opacity-90 mt-1 line-clamp-2">
                      {category.focus}
                    </p>
                  )}
                </div>

                {/* Chalk Chips (Lexend 600, 1rem, 3px outline, 8px radius) */}
                <div className="flex-1 flex flex-wrap items-center gap-2 sm:gap-2.5 p-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="biyahe-plate bg-white text-black px-3.5 py-1.5 font-lexend font-semibold text-sm sm:text-base leading-normal shadow-sm"
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
