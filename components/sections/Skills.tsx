"use client";

import { skillCategories } from "@/data/skills";
import SectionHeading from "@/components/shared/SectionHeading";
import { Smartphone, Layout, Server, Sparkles, Terminal } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { AnimatedItem } from "@/components/ui/StaggerChildren";
import { ConstellationNode } from "@/components/interactive/ConstellationNode";
import { useStoryMode } from "@/components/story/StoryModeContext";

function renderCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();
  if (name.includes("mobile")) return <Smartphone className="w-4 h-4" />;
  if (name.includes("backend")) return <Server className="w-4 h-4" />;
  if (name.includes("web") || name.includes("full-stack"))
    return <Layout className="w-4 h-4" />;
  if (name.includes("ai")) return <Sparkles className="w-4 h-4" />;
  return <Terminal className="w-4 h-4" />;
}

const skillConnectionsCache = new Map<string, string[]>();

function getSkillConnections(skill: string, categoryName: string): string[] {
  const key = `${categoryName}:${skill}`;
  const existing = skillConnectionsCache.get(key);
  if (existing) return existing;

  const cat = categoryName.toLowerCase();
  const s = skill.toLowerCase();
  const conns: string[] = [];

  if (cat.includes("mobile")) {
    conns.push("pillar-offline");
    if (
      s.includes("kotlin") ||
      s.includes("compose") ||
      s.includes("vosk") ||
      s.includes("room")
    ) {
      conns.push("project-playit");
    }
  } else if (cat.includes("backend")) {
    conns.push("pillar-backend");
  } else if (cat.includes("web") || cat.includes("full-stack")) {
    conns.push("pillar-backend");
  } else if (cat.includes("ai")) {
    conns.push("pillar-ai");
  }

  skillConnectionsCache.set(key, conns);
  return conns;
}

export default function Skills() {
  const { mode } = useStoryMode();

  return (
    <section id="skills" className="scroll-mt-16 lg:scroll-mt-24 space-y-6">
      <FadeIn>
        {mode === "story" ? (
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Story Odyssey • Epoch 04</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Cognitive Horizon:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300">
                Grounded Vector Intelligence
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
              Mapping modern frontier capabilities—combining Google Gemini APIs with ChromaDB RAG and Langfuse observability to anchor generative models in verified reality.
            </p>
          </div>
        ) : (
          <SectionHeading
            eyebrow="Capabilities"
            title="Technical Skills & Architecture"
            description="A structured overview of core competencies across mobile platforms, backend systems, full-stack web, and applied AI."
          />
        )}
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((category) => {
          const categorySlug = `category-${category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
          const isMobile = category.name.toLowerCase().includes("mobile");
          const isAi = category.name.toLowerCase().includes("ai");
          const categoryColor = isMobile ? "#06b6d4" : isAi ? "#a855f7" : "#38bdf8";

          return (
            <AnimatedItem key={category.name}>
              <ConstellationNode
                id={categorySlug}
                label={category.name}
                category="skill"
                tier="minor"
                color={categoryColor}
                className="h-full block rounded-2xl"
              >
                <div
                  className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm h-full"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-100 dark:border-cyan-900/60 flex-shrink-0">
                        {renderCategoryIcon(category.name)}
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {category.name}
                      </h3>
                    </div>

                    {category.focus && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mb-3.5 leading-relaxed">
                        {category.focus}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {category.skills.map((skill) => {
                        const skillSlug = `skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
                        const connections = getSkillConnections(skill, category.name);

                        return (
                          <ConstellationNode
                            key={skill}
                            as="span"
                            id={skillSlug}
                            label={skill}
                            category="skill"
                            tier="ambient"
                            connections={connections}
                            className="inline-block rounded-md"
                          >
                            <span
                              className="inline-block px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700/60 hover:border-cyan-500/30 transition-colors"
                            >
                              {skill}
                            </span>
                          </ConstellationNode>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ConstellationNode>
            </AnimatedItem>
          );
        })}
      </StaggerChildren>
    </section>
  );
}

