import React from "react";
import { social } from "@/data/social";

export function StarHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="w-full min-h-[85svh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-20 relative z-10"
    >
      <div className="max-w-[680px] mx-auto space-y-6">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-ink-2/30 text-xs font-mono text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>FIELD OF OBSERVATION // 01</span>
          </div>

          <h1
            id="hero-title"
            className="font-space font-bold text-[clamp(2.75rem,9.5vw,6.5rem)] leading-[1.0] text-ink tracking-tight"
          >
            {social.name}
          </h1>

          <p className="font-space text-lg sm:text-xl text-ink-2">
            {social.role}
          </p>
        </header>

        {/* Verbatim Intro in Public Sans */}
        <p className="font-sans text-[1.0625rem] sm:text-[1.125rem] leading-[1.7] text-ink">
          {social.intro}
        </p>

        {/* Text Actions (§9.4.3: text links with thickening underline, no arrows) */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-sm sm:text-base font-space font-medium">
          <a
            href="#projects"
            className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
          >
            See projects
          </a>
          <a
            href={`mailto:${social.email}`}
            className="chart-link text-ink hover:text-gold py-1 focus-visible:outline-none"
          >
            Send an email
          </a>
        </div>
      </div>
    </section>
  );
}
