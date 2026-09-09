"use client";

import { useQueryState, parseAsStringLiteral } from "nuqs";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { Sparkles } from "lucide-react";
import { useStoryMode } from "@/components/story/StoryModeContext";

const filterValues = ["all", "featured", "mobile", "web-backend", "ai"] as const;
type FilterType = (typeof filterValues)[number];

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All Systems", value: "all" },
  { label: "Featured", value: "featured" },
  { label: "Mobile (Native)", value: "mobile" },
  { label: "Backend & Web", value: "web-backend" },
  { label: "Applied AI", value: "ai" },
];

export default function Projects() {
  const { mode } = useStoryMode();
  const [activeFilter, setActiveFilter] = useQueryState(
    "filter",
    parseAsStringLiteral(filterValues).withDefault("all")
  );

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "featured") return p.featured;
    if (activeFilter === "mobile") return p.category === "Mobile";
    if (activeFilter === "web-backend")
      return p.category === "Web" || p.category === "Backend";
    if (activeFilter === "ai") return p.category === "AI / Full-Stack";
    return true;
  });

  return (
    <section id="projects" className="scroll-mt-16 lg:scroll-mt-24 space-y-6">
      <FadeIn>
        {mode === "story" ? (
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Story Odyssey • Epoch 02</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              The Offline Outlaw:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300">
                Zero Cloud Assumptions
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
              Out on the Philippine classroom frontier, networks drop. Real software reliability means engineering offline-first: Vosk Edge ASR and local SQLite without cloud handrails.
            </p>
          </div>
        ) : (
          <SectionHeading
            eyebrow="Architecture & Systems"
            title="Featured Projects"
            description="Software projects illustrating offline-first architecture, API engineering under real-world constraints, and practical AI integrations."
          />
        )}
      </FadeIn>

      {/* ReadHub-inspired Segmented Pill Filter Toggle with URL sync via nuqs */}
      <FadeIn delay={0.1}>
        <div className="flex items-center overflow-x-auto pb-1 max-w-full">
          <div className="inline-flex p-1 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-md shadow-sm">
            {FILTERS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 whitespace-nowrap ${
                    isActive
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Filtered Projects List with AnimatePresence */}
      <LazyMotion features={domAnimation} strict>
        <div className="space-y-6 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <m.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <ProjectCard project={project} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </LazyMotion>
    </section>
  );
}
