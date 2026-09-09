import { experiences } from "@/data/experience";
import SectionHeading from "@/components/shared/SectionHeading";
import { Briefcase, GraduationCap, Award, BookCheck, Calendar, Building } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

function renderCategoryIcon(category: string) {
  switch (category) {
    case "Internship":
      return <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
    case "Education":
      return <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
    case "Certification":
      return <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    default:
      return <BookCheck className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />;
  }
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 lg:scroll-mt-24 space-y-6">
      <FadeIn>
        <SectionHeading
          eyebrow="Journey & Milestones"
          title="Experience & Education"
          description="Professional enterprise internship at NEC Telecom Software Philippines, academic foundations at CIT-U, and verified industry credentials."
        />
      </FadeIn>

      <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
        {experiences.map((item, index) => {
          const isInternship = item.category === "Internship";

          return (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="relative group">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-zinc-950 border-2 transition-transform duration-150 group-hover:scale-125 ${
                    isInternship ? "border-cyan-400 ring-2 ring-cyan-500/20" : "border-cyan-500"
                  }`}
                />

                <div
                  className={`p-6 rounded-2xl bg-white/90 dark:bg-zinc-900/40 backdrop-blur-md border hover:-translate-y-0.5 transition-all duration-200 shadow-sm ${
                    isInternship
                      ? "border-cyan-500/40 dark:border-cyan-500/30 ring-1 ring-cyan-500/20 shadow-md shadow-cyan-950/10"
                      : "border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
                        {renderCategoryIcon(item.category)}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 px-2.5 py-0.5 rounded-full border border-cyan-200/60 dark:border-cyan-900/60">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <Building className="w-3 h-3" />
                      <span>{item.organization}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h3>
                    {isInternship && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-1.5">
                      {item.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed"
                        >
                          <span className="text-cyan-500 font-bold mt-0.5">›</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
