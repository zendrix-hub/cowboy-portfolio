import { MarginaliaPage } from "./MarginaliaPage";
import { Stamp } from "./Stamp";
import { projects, Project } from "@/data/projects";

const SEEDED_CARD_ROTATIONS = [-1.2, 1.4, -0.8, 1.1];

export function MarginaliaProjects() {
  const daloyAqua = projects.find((p) => p.title === "DaloyAqua") || projects[0];
  const supportingProjects = projects.filter((p) => p.title !== "DaloyAqua");

  const marginNotes = (
    <div className="space-y-6 pt-6 select-none">
      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[-1deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [SYSTEM ARCHIVE]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          Each index card captures real architectural tradeoffs and deployed codebases.
        </p>
      </div>

      <div className="relative pl-3 border-l-2 border-tape/40 rotate-[1.5deg]">
        <span className="font-courier text-[10px] uppercase text-tape block tracking-widest font-bold">
          [CAPSTONE]
        </span>
        <p className="font-caveat text-sm sm:text-base text-ink-2 leading-tight">
          PlayIT operates 100% offline with on-device Vosk Kaldi speech recognition.
        </p>
      </div>
    </div>
  );

  return (
    <MarginaliaPage
      id="projects"
      pageNumber={3}
      rotation={-0.9}
      leftTapeRotation={-2.5}
      rightTapeRotation={3.5}
      marginContent={marginNotes}
    >
      <div className="space-y-8 sm:space-y-10">
        <header>
          <span className="font-courier text-xs uppercase tracking-widest text-tape font-bold block mb-1">
            SECTION // ENGINEERING ARCHIVE
          </span>
          <h2
            id="projects-title"
            className="font-lora font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-tight text-ink"
          >
            Projects &amp; Index Cards
          </h2>
        </header>

        {/* FEATURED PROJECT: Large Index Card (DaloyAqua per §9.1.7) */}
        <div className="relative">
          <div className="index-card relative bg-white dark:bg-[#231E19] border border-ink-2/30 p-6 sm:p-8 rounded-[2px] shadow-lift rotate-[0.5deg]">
            {/* Hand-Stamped Status over Top-Right Corner (§9.1.3, §9.1.7) */}
            <div className="absolute -top-4 sm:-top-5 -right-2 sm:-right-4 z-20">
              <Stamp
                status={daloyAqua.status || "In Progress"}
                rotation={-11}
              />
            </div>

            <div className="space-y-4 max-w-[560px]">
              <div>
                <span className="font-courier text-xs text-tape uppercase tracking-widest font-bold block mb-1">
                  FEATURED INDEX CARD // 01
                </span>
                <h3 className="font-lora font-semibold text-2xl sm:text-3xl text-ink">
                  {daloyAqua.title}
                </h3>
                {daloyAqua.subtitle && (
                  <p className="font-serif italic text-sm text-ink-2 mt-0.5">
                    {daloyAqua.subtitle}
                  </p>
                )}
              </div>

              <p className="font-serif text-[1rem] sm:text-[1.0625rem] leading-[1.65] text-ink">
                {daloyAqua.description}
              </p>

              {/* Stack Tags in Courier Prime */}
              <div className="pt-2">
                <span className="font-courier text-[11px] text-ink-2 uppercase tracking-wider block mb-1.5 font-bold">
                  TECH STACK:
                </span>
                <div className="flex flex-wrap gap-1.5 font-courier text-xs">
                  {daloyAqua.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-paper text-ink border border-ink-2/30 rounded-[2px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-3 flex flex-wrap items-center gap-5 font-courier text-xs sm:text-sm font-bold">
                {daloyAqua.liveUrl && (
                  <a
                    href={daloyAqua.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notebook-link text-ink inline-flex items-center gap-1"
                  >
                    <span>Open project</span>
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                )}
                {daloyAqua.githubUrl && (
                  <a
                    href={daloyAqua.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notebook-link text-ink inline-flex items-center gap-1"
                  >
                    <span>Source code</span>
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING PROJECTS: 2-Column Grid of Index Cards (§9.1.7) */}
        <div className="space-y-4 pt-2">
          <h3 className="font-courier text-xs uppercase tracking-wider text-ink-2">
            SUPPORTING INDEX CARDS // REPERTORY
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            {supportingProjects.map((p: Project, idx: number) => {
              const cardRotation = SEEDED_CARD_ROTATIONS[idx % SEEDED_CARD_ROTATIONS.length];

              return (
                <div
                  key={p.title}
                  style={{ transform: `rotate(${cardRotation}deg)` }}
                  className="index-card bg-white dark:bg-[#231E19] border border-ink-2/30 p-5 sm:p-6 rounded-[2px] shadow-lift flex flex-col justify-between relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-lora font-semibold text-lg sm:text-xl text-ink leading-snug">
                        {p.title}
                      </h4>
                      {p.status && (
                        <span className="font-courier text-[10px] text-ink-2 px-1.5 py-0.5 border border-ink-2/30 rounded-[2px] shrink-0">
                          {p.status}
                        </span>
                      )}
                    </div>

                    <p className="font-serif text-sm leading-[1.6] text-ink-2 line-clamp-3">
                      {p.description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1 font-courier text-[11px] pt-1">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-paper text-ink-2 border border-ink-2/20 rounded-[2px]"
                        >
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="text-[10px] text-ink-2/70 px-1 py-0.5">
                          +{p.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-4 mt-3 border-t border-ink-2/15 flex flex-wrap items-center gap-4 font-courier text-xs font-bold">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="notebook-link text-ink inline-flex items-center gap-1"
                      >
                        <span>Open project</span>
                        <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="notebook-link text-ink inline-flex items-center gap-1"
                      >
                        <span>Source code</span>
                        <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                    {!p.liveUrl && !p.githubUrl && (
                      <span className="text-[11px] font-mono text-ink-2 opacity-75">
                        [RESTRICTED / DEPED OFFLINE]
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MarginaliaPage>
  );
}
