import React from 'react';
import { social } from '@/data/social';

export function SlateHero() {
  return (
    <section
      id="hero"
      aria-label="Scene 01: Title Card"
      className="slate-shot"
    >
      {/* Corner Scene-Slate Mark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 select-none pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-semibold">
          SCENE 01 // TITLE CARD
        </span>
      </div>

      {/* Main Title Card Content */}
      <div className="shot-content flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto my-auto py-8">
        {/* Production credit prefix */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--ink-2)] mb-3">
          AN ENGINEERING PORTFOLIO PRESENTATION
        </p>

        {/* Candidate Name in Bebas Neue Title-Card Scale */}
        <h1 className="title-card-name mb-4">
          {social.displayName}
        </h1>

        {/* Role in Film Credit Line Style (Archivo Narrow 500) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-sm sm:text-base tracking-widest uppercase font-medium text-[var(--ink)] mb-8">
          <span>{social.role}</span>
          <span className="text-[var(--tally)]">•</span>
          <span className="text-[var(--ink-2)]">{social.subrole}</span>
        </div>

        {/* Verbatim Intro in Centered Reading Measure */}
        <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink-2)] max-w-xl mx-auto mb-10">
          {social.intro}
        </p>

        {/* Actions: Film Credit Text Links */}
        <div className="flex items-center justify-center gap-8 font-sans text-sm tracking-widest uppercase font-semibold">
          <a href="#projects" className="slate-link">
            See projects ↘
          </a>
          <a href={`mailto:${social.email}`} className="slate-link">
            Send an email ↗
          </a>
        </div>
      </div>
    </section>
  );
}
