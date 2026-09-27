'use client';

import React, { useState } from 'react';
import { social } from '@/data/social';

export function SlateContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Scene 06: The End Card"
      className="slate-shot"
    >
      {/* Corner Scene-Slate Mark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 sm:top-6 sm:right-10 flex items-center gap-2 select-none pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--ink-2)] font-semibold">
          SCENE 06 // END CARD
        </span>
      </div>

      <div className="shot-content px-6 max-w-2xl mx-auto my-auto py-8 text-center flex flex-col items-center justify-center">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--ink-2)] mb-4">
          FINAL TAKE & COMMISSIONS
        </p>

        <h2 className="shot-title mb-6">
          The End Card
        </h2>

        {/* Large Mailto Address in Bebas Neue */}
        <div className="mb-6">
          <a
            href={`mailto:${social.email}`}
            aria-label={`Send email to ${social.email}`}
            className="font-display text-2xl sm:text-4xl md:text-5xl tracking-widest uppercase text-[var(--ink)] hover:text-[var(--tally)] transition-colors break-all"
          >
            {social.email}
          </a>
        </div>

        {/* Copy Address Text Link with Live Region */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Email address copied' : 'Copy email address to clipboard'}
            className="slate-link font-sans text-xs tracking-widest uppercase font-semibold text-[var(--ink)]"
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY ADDRESS'}
          </button>
          <div aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard.' : ''}
          </div>
        </div>

        {/* Out: Social Output Links as a plain credit list */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-sans text-xs tracking-widest uppercase text-[var(--ink-2)]">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            GITHUB // ZENDRIX-HUB ↗
          </a>
          <span>/</span>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors"
          >
            LINKEDIN // ZENDRIX-RIVA ↗
          </a>
          <span>/</span>
          <a
            href={`mailto:${social.academicEmail}`}
            className="hover:text-[var(--ink)] transition-colors"
          >
            CIT-U ACADEMIC ↗
          </a>
        </div>

        {/* Closing reserved tally dot mark */}
        <div className="mt-8 flex items-center justify-center">
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--tally)]"
          />
        </div>
      </div>
    </section>
  );
}
