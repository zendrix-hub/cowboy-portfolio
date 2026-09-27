'use client';

import React, { useSyncExternalStore } from 'react';
import { social } from '@/data/social';

const LINE_KEY = 'clearing-line-played';

let isLineAnimated = false;
let initialized = false;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true;
    try {
      const alreadyPlayed = sessionStorage.getItem(LINE_KEY);
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (alreadyPlayed || prefersReducedMotion) {
        isLineAnimated = true;
      } else {
        sessionStorage.setItem(LINE_KEY, 'true');
        setTimeout(() => {
          isLineAnimated = true;
          listeners.forEach((l) => l());
        }, 2050);
      }
    } catch {
      isLineAnimated = true;
    }
  }
  return isLineAnimated;
}

function getServerSnapshot() {
  return true;
}

export function ClearingHero() {
  const linePlayed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <section
      id="hero"
      aria-label="Zendrix Riva"
      className="clearing-section"
    >
      <div className="clearing-content clearing-pos-left">
        {/* The 2000ms Quiet Line Orchestrated Moment */}
        <div className="mb-8 overflow-hidden h-px">
          <div
            aria-hidden="true"
            className={linePlayed ? 'w-24 h-px bg-[var(--mark)]' : 'animate-clearing-line'}
          />
        </div>

        {/* Candidate Name in Shippori Mincho 500 */}
        <h1 className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.2] font-normal tracking-[0.02em] text-[var(--ink)] mb-3">
          {social.displayName}
        </h1>

        {/* Candidate Role in Zen Kaku Gothic New */}
        <p className="font-sans text-sm font-medium tracking-wider text-[var(--ink-2)] mb-1">
          {social.role}
        </p>
        <p className="font-sans text-xs tracking-wider text-[var(--ink-2)] mb-6">
          {social.subrole}
        </p>

        {/* Verbatim Intro in Zen Kaku Gothic New */}
        <p className="font-sans text-base leading-[1.9] text-[var(--ink)] mb-8">
          {social.intro}
        </p>

        {/* Plain Text Actions */}
        <div className="flex items-center gap-6 font-sans text-sm tracking-wider">
          <a href="#projects" className="clearing-link">
            See projects
          </a>
          <a href={`mailto:${social.email}`} className="clearing-link">
            Send an email
          </a>
        </div>
      </div>
    </section>
  );
}
