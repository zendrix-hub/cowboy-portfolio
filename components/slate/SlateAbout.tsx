import React from 'react';
import { social } from '@/data/social';

export function SlateAbout() {
  return (
    <section
      id="about"
      aria-label="Scene 02: Treatment and Background"
      className="slate-shot"
    >
      {/* Corner Scene-Slate Mark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 select-none pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-semibold">
          SCENE 02 // TREATMENT
        </span>
      </div>

      <div className="shot-content px-6 max-w-2xl mx-auto my-auto py-6">
        <h2 className="shot-title text-center mb-6">
          Treatment & Background
        </h2>

        {/* Unedited Full Bio in Archivo Narrow */}
        <p className="font-sans text-base sm:text-lg leading-relaxed text-[var(--ink)] mb-6 text-center">
          {social.about}
        </p>

        {/* Tagline */}
        <p className="font-sans text-sm sm:text-base italic text-[var(--ink-2)] mb-8 text-center max-w-lg mx-auto">
          &ldquo;{social.tagline}&rdquo;
        </p>

        {/* Credit Parameters Strip */}
        <div className="border-t border-b border-[var(--ink)]/20 py-4 font-sans text-xs tracking-wider uppercase">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            <div>
              <span className="text-[var(--ink-2)]">LOCATION: </span>
              <span className="text-[var(--ink)] font-semibold">{social.location}</span>
            </div>
            <div>
              <span className="text-[var(--ink-2)]">EDUCATION: </span>
              <span className="text-[var(--ink)] font-semibold">CIT-U (BSIT, 2027 Expected)</span>
            </div>
            <div>
              <span className="text-[var(--ink-2)]">PRODUCTION BASE: </span>
              <span className="text-[var(--ink)] font-semibold">NEC Telecom Software Philippines</span>
            </div>
            <div>
              <span className="text-[var(--ink-2)]">SYSTEM FOCUS: </span>
              <span className="text-[var(--ink)] font-semibold">Offline-First • Clean Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
