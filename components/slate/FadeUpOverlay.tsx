'use client';

import React, { useSyncExternalStore } from 'react';

const FADEUP_KEY = 'slate-fadeup-played';

let isDismissed = false;
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
      const alreadyPlayed = sessionStorage.getItem(FADEUP_KEY);
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (alreadyPlayed || prefersReducedMotion) {
        isDismissed = true;
      } else {
        sessionStorage.setItem(FADEUP_KEY, 'true');
        setTimeout(() => {
          isDismissed = true;
          listeners.forEach((l) => l());
        }, 950);
      }
    } catch {
      isDismissed = true;
    }
  }
  return isDismissed;
}

function getServerSnapshot() {
  return true;
}

export function FadeUpOverlay() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[60] bg-[var(--frame)] pointer-events-none animate-fade-up"
    />
  );
}
