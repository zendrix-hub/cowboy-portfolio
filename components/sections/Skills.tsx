import { skillCategories } from "@/data/skills";
import SectionHeading from "@/components/shared/SectionHeading";
import { Smartphone, Layout, Server, Sparkles, Terminal } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { AnimatedItem } from "@/components/ui/StaggerChildren";

function renderCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();
  if (name.includes("mobile")) return <Smartphone className="w-4 h-4" />;
  if (name.includes("backend")) return <Server className="w-4 h-4" />;
  if (name.includes("web") || name.includes("full-stack"))
    return <Layout className="w-4 h-4" />;
  if (name.includes("ai")) return <Sparkles className="w-4 h-4" />;
  return <Terminal className="w-4 h-4" />;
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 lg:scroll-mt-24 space-y-6">
      <FadeIn>
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills & Architecture"
          description="A structured overview of core competencies across mobile platforms, backend systems, full-stack web, and applied AI."
        />
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((category) => (
          <AnimatedItem key={category.name}>
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
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700/60 hover:border-cyan-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
