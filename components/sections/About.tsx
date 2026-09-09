import SectionHeading from "@/components/shared/SectionHeading";
import { Smartphone, Server, Cpu } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { AnimatedItem } from "@/components/ui/StaggerChildren";

export default function About() {
  const pillars = [
    {
      icon: Smartphone,
      title: "Offline-First & Edge Systems",
      description:
        "Engineering native Android applications (Kotlin, Compose, Room, Vosk) that function reliably with zero cloud assumptions under real device constraints.",
    },
    {
      icon: Server,
      title: "Stateless Backend Architecture",
      description:
        "Building modular REST services in Spring Boot 3 & FastAPI with strict JWT authentication, role-based access control, and asynchronous pipelines.",
    },
    {
      icon: Cpu,
      title: "Grounded Applied AI",
      description:
        "Integrating LLM APIs with local vector retrieval (ChromaDB RAG) to anchor responses in verified domain data rather than model hallucinations.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-16 lg:scroll-mt-24 space-y-6">
      <FadeIn>
        <SectionHeading
          eyebrow="Identity & Approach"
          title="About Me"
          description="A grounded look at my engineering approach, technical focus, and architectural priorities."
        />

        {/* Main About Bio Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 space-y-4 shadow-sm mb-6 mt-6">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
            <span className="w-1.5 h-3.5 rounded-full bg-cyan-500" />
            <span>Developer Perspective</span>
          </h3>

          <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
            I build software across mobile, backend, and full-stack environments, with a focus on clean architecture, reliability, and practical engineering. Currently interning at NEC Telecom Software Philippines while completing my final year in BSIT, I enjoy solving problems where thoughtful system design matters—from offline-first Android systems to robust backend services. I value disciplined iteration, clear structure, and software that works dependably in production.
          </p>
        </div>

        {/* 3 Core Architectural Pillars */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <AnimatedItem key={item.title}>
                <div
                  className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm h-full"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 border border-cyan-100 dark:border-cyan-900/60">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            );
          })}
        </StaggerChildren>
      </FadeIn>
    </section>
  );
}
