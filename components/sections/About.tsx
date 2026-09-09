"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { Smartphone, Server, Cpu, Sparkles } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { AnimatedItem } from "@/components/ui/StaggerChildren";
import { ConstellationNode } from "@/components/interactive/ConstellationNode";
import { useStoryMode } from "@/components/story/StoryModeContext";

const PILLARS = [
  {
    id: "pillar-offline",
    icon: Smartphone,
    title: "Offline-First & Edge Systems",
    description:
      "Engineering native Android applications (Kotlin, Compose, Room, Vosk) that function reliably with zero cloud assumptions under real device constraints.",
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.45)",
    connections: [
      "origin-zendrix",
      "project-playit",
      "skill-kotlin",
      "skill-android-sdk",
      "skill-jetpack-compose",
      "skill-vosk-edge-asr",
      "skill-room-sqlite",
    ],
  },
  {
    id: "pillar-backend",
    icon: Server,
    title: "Stateless Backend Architecture",
    description:
      "Building modular REST services in Spring Boot 3 & FastAPI with strict JWT authentication, role-based access control, and asynchronous pipelines.",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    connections: [
      "origin-zendrix",
      "skill-java-17",
      "skill-spring-boot-3",
      "skill-spring-security-jwt",
      "skill-fastapi",
      "skill-mysql",
    ],
  },
  {
    id: "pillar-ai",
    icon: Cpu,
    title: "Grounded Applied AI",
    description:
      "Integrating LLM APIs with local vector retrieval (ChromaDB RAG) to anchor responses in verified domain data rather than model hallucinations.",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    connections: [
      "origin-zendrix",
      "skill-google-gemini-api",
      "skill-retrieval-augmented-generation-rag",
      "skill-chromadb",
      "skill-langfuse-observability",
    ],
  },
];

const ORIGIN_CONNECTIONS = ["origin-crt", "pillar-offline", "pillar-backend", "pillar-ai"];

export default function About() {
  const { mode } = useStoryMode();

  return (
    <section id="about" className="scroll-mt-16 lg:scroll-mt-24 space-y-6">
      <FadeIn>
        {mode === "story" ? (
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Story Odyssey • Epoch 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              The Frontier Trail:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-500 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300">
                Taming the Machine
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal">
              Turning childhood curiosity into engineering discipline at CIT-U Cebu—mastering memory structures, algorithmic rigor, and clean architectural principles.
            </p>
          </div>
        ) : (
          <SectionHeading
            eyebrow="Identity & Approach"
            title="About Me"
            description="A grounded look at my engineering approach, technical focus, and architectural priorities."
          />
        )}

        {/* Main About Bio Card - Central Origin Core */}
        <ConstellationNode
          id="origin-zendrix"
          label="Zendrix Riva • Origin Core"
          category="origin"
          tier="core"
          showAnchorPip
          pipPosition="top-left"
          connections={ORIGIN_CONNECTIONS}
          className="rounded-2xl mb-6 mt-6 block"
        >
          <div className="p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 space-y-4 shadow-sm">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-cyan-500" />
              <span>Developer Perspective</span>
            </h3>

            <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
              I build software across mobile, backend, and full-stack environments, with a focus on clean architecture, reliability, and practical engineering. Currently interning at NEC Telecom Software Philippines while completing my final year in BSIT, I enjoy solving problems where thoughtful system design matters—from offline-first Android systems to robust backend services. I value disciplined iteration, clear structure, and software that works dependably in production.
            </p>
          </div>
        </ConstellationNode>

        {/* 3 Core Architectural Pillars */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <AnimatedItem key={item.title}>
                <ConstellationNode
                  id={item.id}
                  label={item.title}
                  category="pillar"
                  tier="major"
                  color={item.color}
                  glowColor={item.glowColor}
                  connections={item.connections}
                  showAnchorPip
                  pipPosition="top-right"
                  className="h-full rounded-2xl block"
                >
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
                </ConstellationNode>
              </AnimatedItem>
            );
          })}
        </StaggerChildren>
      </FadeIn>
    </section>
  );
}

