import React from 'react';
import { social } from '@/data/social';

export function RuntimeAbout() {
  return (
    <section
      id="about"
      aria-label="Input Node: About Zendrix Riva"
      className="w-full flex flex-col items-center justify-center py-2"
    >
      {/* Rectangular Input Node */}
      <div className="runtime-node w-full max-w-[720px] rounded-lg border border-[var(--ink)] bg-[var(--board)] p-6 sm:p-10 transition-colors">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--ink)]/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-3.5 h-3.5 border border-[var(--ink)] bg-transparent rounded-sm"
            />
            <h2 className="font-mono text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.1] font-bold text-[var(--ink)]">
              About
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--ink-2)] tracking-wider uppercase">
            INPUT_NODE // REPO_FACTS
          </span>
        </div>

        {/* Unedited Full Bio in Manrope */}
        <p className="font-sans text-[1.0625rem] leading-[1.65] text-[var(--ink)] mb-6 whitespace-pre-line">
          {social.about}
        </p>

        {/* Tagline paragraph */}
        <p className="font-sans text-sm italic text-[var(--ink-2)] mb-8">
          &ldquo;{social.tagline}&rdquo;
        </p>

        {/* Nested Config Block (Parameters List) */}
        <div className="border border-[var(--ink)]/25 bg-[var(--ink)]/[0.02] rounded-md p-4 sm:p-5">
          <div className="font-mono text-[11px] font-bold text-[var(--ink-2)] uppercase tracking-wider border-b border-[var(--ink)]/15 pb-2 mb-3">
            CONFIG // METADATA_PARAMETERS
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-xs">
            <div>
              <dt className="text-[var(--ink-2)] inline">location: </dt>
              <dd className="text-[var(--ink)] font-semibold inline">{social.location}</dd>
            </div>
            <div>
              <dt className="text-[var(--ink-2)] inline">education: </dt>
              <dd className="text-[var(--ink)] font-semibold inline">CIT-U (BSIT, Expected 2027)</dd>
            </div>
            <div>
              <dt className="text-[var(--ink-2)] inline">internship: </dt>
              <dd className="text-[var(--ink)] font-semibold inline">NEC Telecom Software (GDC)</dd>
            </div>
            <div>
              <dt className="text-[var(--ink-2)] inline">focus: </dt>
              <dd className="text-[var(--ink)] font-semibold inline">Offline-First • Clean Architecture</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
