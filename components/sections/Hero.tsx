import { ArrowRight, Mail, Terminal } from "lucide-react";
import { social } from "@/data/social";

const FEATURED_TAGS = [
  "Kotlin",
  "Jetpack Compose",
  "TypeScript",
  "Next.js",
  "Java (Spring Boot)",
  "Python",
];

export default function Hero() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>Software / Full-Stack Developer</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-600 dark:from-cyan-400 dark:to-sky-400">
                {social.displayName}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-medium">
              Building reliable, offline-first mobile solutions and modern full-stack web applications.
            </p>
          </div>

          {/* Supporting description */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Specializing in modern Android engineering with Kotlin and Jetpack Compose alongside full-stack development with Next.js, Spring Boot, and Python. Focused on clean architecture, intuitive interfaces, and pragmatic engineering.
          </p>

          {/* Quick tech tags */}
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Core Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {FEATURED_TAGS.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
