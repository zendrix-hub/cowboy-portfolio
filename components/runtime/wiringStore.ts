'use client';

const WIRING_KEY = 'runtime-wiring-drawn';
let isDrawn = false;
let initialized = false;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const wiringStore = {
  getSnapshot: () => isDrawn,
  getServerSnapshot: () => false,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  trigger: () => {
    if (!isDrawn) {
      isDrawn = true;
      try {
        sessionStorage.setItem(WIRING_KEY, 'true');
      } catch {}
      emitChange();
    }
  },
  init: () => {
    if (initialized) return;
    initialized = true;
    if (typeof window !== 'undefined') {
      try {
        if (
          sessionStorage.getItem(WIRING_KEY) === 'true' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          isDrawn = true;
          emitChange();
        }
      } catch {
        // Fallback for private browsing
      }
    }
  },
};
