import { projects, Project } from "@/data/projects";

const STOP_BADGES = [
  { stop: "STOP 02-A", bg: "bg-[#FFC72C]", text: "text-black" },
  { stop: "STOP 02-B", bg: "bg-[#1B3FD1]", text: "text-white" },
  { stop: "STOP 02-C", bg: "bg-[#E4262A]", text: "text-white" },
  { stop: "STOP 02-D", bg: "bg-[#0F9D58]", text: "text-black" },
];

export default function BiyaheProjects() {
  return (
    <section
      id="projects"
      className="bg-white dark:bg-[#0B1440] text-black dark:text-white pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title Header (§6.1.7) */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="biyahe-plate bg-[#1B3FD1] text-white px-5 py-2.5 font-bungee text-xl sm:text-3xl tracking-wide uppercase inline-block shadow-[0_4px_0_#000000]">
              PROJECTS // STOP 02
            </div>
            <div className="h-1 bg-black dark:bg-white w-12 sm:w-24 hidden sm:block" />
          </div>

          <span className="biyahe-plate bg-[#FFC72C] text-black px-3.5 py-1.5 font-bungee text-xs uppercase tracking-wider shadow-[0_2px_0_#000]">
            FLEET MANIFEST // 4 ACTIVE SYSTEMS
          </span>
        </div>

        {/* 2x2 Dedicated Terminal Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((proj: Project, index: number) => {
            const badgeConfig = STOP_BADGES[index % STOP_BADGES.length];
            const isPlayIT = proj.title.toLowerCase() === "playit";

            return (
              <article
                key={proj.title}
                className="biyahe-board bg-white dark:bg-[#131E57] border-3 border-black text-black dark:text-white p-6 sm:p-7 space-y-5 shadow-[0_6px_0_#000000] flex flex-col justify-between relative"
              >
                {/* Stamped Corner Rivet Accents */}
                <span
                  className="w-2.5 h-2.5 rounded-full bg-black/25 dark:bg-white/25 border border-black/40 absolute top-2.5 left-2.5 pointer-events-none"
                  aria-hidden="true"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-black/25 dark:bg-white/25 border border-black/40 absolute top-2.5 right-2.5 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  {/* Top Bar: Stop Badge, Status, Category */}
                  <div className="flex items-center justify-between gap-2 flex-wrap border-b-2 border-black/15 dark:border-white/15 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`biyahe-plate ${badgeConfig.bg} ${badgeConfig.text} px-3 py-1 font-bungee text-xs tracking-wider shadow-[0_2px_0_#000]`}
                      >
                        {badgeConfig.stop}
                      </span>
                      {proj.status && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFC72C] text-black font-lexend font-bold text-[11px] border border-black">
                          {proj.status}
                        </span>
                      )}
                    </div>

                    {proj.category && (
                      <span className="font-mono text-xs font-bold text-[#1B3FD1] dark:text-[#FFC72C] uppercase tracking-wider">
                        [{proj.category}]
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-bungee text-2xl sm:text-3xl text-black dark:text-white tracking-wide leading-tight">
                      {proj.title}
                    </h3>
                    {proj.subtitle && (
                      <p className="font-lexend text-xs sm:text-sm text-black/70 dark:text-[#FFC72C] font-semibold mt-1">
                        {proj.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Engineering Role Callout */}
                  {proj.roleContext && (
                    <div className="biyahe-plate bg-[#F8F9FA] dark:bg-[#0B1440] p-2.5 border border-black/25 dark:border-white/20 text-xs font-lexend flex items-center gap-2">
                      <span className="font-bungee text-[10px] text-[#1B3FD1] dark:text-[#FFC72C] uppercase shrink-0">
                        ROLE:
                      </span>
                      <span className="text-black/85 dark:text-white/90 font-medium">
                        {proj.roleContext}
                      </span>
                    </div>
                  )}

                  {/* Project Description */}
                  <p className="font-lexend text-xs sm:text-sm leading-relaxed text-black/90 dark:text-white/90">
                    {proj.description}
                  </p>

                  {/* Field Problem & Constraints */}
                  {(proj.problem || proj.constraints) && (
                    <div className="p-3 bg-[#F1F3F5] dark:bg-[#0B1440] rounded border border-black/20 dark:border-white/15 space-y-2 text-xs font-lexend">
                      {proj.problem && (
                        <div>
                          <strong className="text-[#E4262A] font-bungee text-[10px] uppercase block">
                            FIELD PROBLEM:
                          </strong>
                          <span className="text-black/80 dark:text-white/80 leading-snug">
                            {proj.problem}
                          </span>
                        </div>
                      )}
                      {proj.constraints && (
                        <div className="pt-1.5 border-t border-black/10 dark:border-white/10">
                          <strong className="text-[#1B3FD1] dark:text-[#FFC72C] font-bungee text-[10px] uppercase block">
                            ENGINEERING CONSTRAINTS:
                          </strong>
                          <span className="text-black/80 dark:text-white/80 leading-snug">
                            {proj.constraints}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4-Stage Architecture Pipeline Breadcrumb */}
                  {proj.architectureSteps && proj.architectureSteps.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="font-bungee text-[10px] text-black/70 dark:text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1B3FD1] dark:bg-[#FFC72C] inline-block" />
                        <span>4-STAGE ARCHITECTURE PIPELINE</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono">
                        {proj.architectureSteps.map((step) => (
                          <div
                            key={step.step}
                            className="p-1.5 rounded bg-[#F8F9FA] dark:bg-[#0B1440] border border-black/20 dark:border-white/20 text-center"
                            title={`${step.title} (${step.subtitle})`}
                          >
                            <div className="font-bungee text-[9px] text-[#1B3FD1] dark:text-[#FFC72C]">
                              STAGE {step.step}
                            </div>
                            <div className="truncate font-bold text-black dark:text-white">
                              {step.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Engineering Deliverables */}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="font-bungee text-[10px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                        KEY DELIVERABLES &amp; OUTCOMES
                      </div>
                      <ul className="space-y-1 text-xs font-lexend text-black/85 dark:text-white/85">
                        {proj.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#0F9D58] font-bold shrink-0">➔</span>
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* System Stack Chips */}
                  <div className="space-y-1.5">
                    <div className="font-bungee text-[10px] text-black/70 dark:text-white/70 uppercase tracking-wider">
                      SYSTEM STACK
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-[#0F9D58] text-black font-lexend font-bold text-[11px] rounded border border-black shadow-[0_1px_0_#000]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Plates at Card Bottom */}
                <div className="mt-auto pt-4 border-t-2 border-black/15 dark:border-white/15 flex flex-wrap items-center gap-3">
                  {isPlayIT ? (
                    <div className="w-full biyahe-plate bg-[#0B1440] text-white p-3 border-2 border-[#FFC72C] shadow-[0_3px_0_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#FFC72C] text-black font-bungee text-[10px] uppercase tracking-wider rounded border border-black shrink-0">
                          OFFLINE THESIS
                        </span>
                        <span className="font-lexend text-xs text-white/90">
                          100% On-Device APK • DepEd Grade 1 Classrooms
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#FFC72C] font-bold shrink-0">
                        [CODE RESTRICTED]
                      </span>
                    </div>
                  ) : (
                    <>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${proj.title} live demo`}
                          style={{ ["--depth-color" as string]: "#B61E22" }}
                          className="pressable-plate px-5 py-2.5 bg-[#E4262A] text-white font-bungee text-xs tracking-wider flex items-center gap-2 shadow-[0_4px_0_#000]"
                        >
                          <span>★ OPEN LIVE APP</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}

                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${proj.title} repository`}
                          style={{ ["--depth-color" as string]: "#1632A7" }}
                          className="pressable-plate px-5 py-2.5 bg-[#1B3FD1] text-white font-bungee text-xs tracking-wider flex items-center gap-2 shadow-[0_4px_0_#000]"
                        >
                          <span>GITHUB REPO</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}

                      {!proj.liveUrl && proj.status && (
                        <span className="biyahe-plate bg-[#FFC72C] text-black px-3.5 py-2 font-bungee text-[11px] uppercase tracking-wider shadow-[0_2px_0_#000]">
                          {proj.status}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
