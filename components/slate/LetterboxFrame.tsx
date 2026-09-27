'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

interface SceneShot {
  id: string;
  number: string;
  name: string;
}

const SCENE_SHOTS: SceneShot[] = [
  { id: 'hero', number: '01', name: 'Title Card' },
  { id: 'about', number: '02', name: 'Treatment' },
  { id: 'projects', number: '03', name: 'The Reel' },
  { id: 'skills', number: '04', name: 'Crew List' },
  { id: 'experience', number: '05', name: 'Takes Timeline' },
  { id: 'contact', number: '06', name: 'End Card' },
];

const emptySubscribe = () => () => {};

export function LetterboxFrame() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [activeId, setActiveId] = useState<string>('hero');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0,
    });

    SCENE_SHOTS.forEach((shot) => {
      const el = document.getElementById(shot.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setIsDialogOpen(false);
  };

  const handleShotClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeDialog();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const isLight = resolvedTheme === 'light';
  const activeShot = SCENE_SHOTS.find((s) => s.id === activeId) ?? SCENE_SHOTS[0];

  return (
    <>
      {/* Top Letterbox Bar (Fixed) */}
      <aside
        aria-hidden="true"
        className="letterbox-bar letterbox-top flex items-center justify-between px-4 sm:px-8 border-b border-[var(--ink)]/10"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--tally)]" />
          <span className="font-sans text-xs tracking-widest text-[var(--ink-2)] uppercase font-semibold">
            SLATE // REEL 01
          </span>
          <span className="hidden sm:inline text-xs text-[var(--ink-2)]/60">
            •
          </span>
          <span className="hidden sm:inline font-sans text-xs text-[var(--ink)] tracking-wider uppercase font-medium">
            SCENE {activeShot.number}: {activeShot.name}
          </span>
        </div>

        {/* Mode switcher: Theatrical / Storyboard */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            aria-label={
              mounted
                ? isLight
                  ? 'Switch to Theatrical mode (dark)'
                  : 'Switch to Storyboard mode (light)'
                : 'Toggle scene mode'
            }
            className="font-sans text-xs uppercase tracking-wider text-[var(--ink-2)] hover:text-[var(--ink)] py-1 px-2 border border-[var(--ink)]/20 hover:border-[var(--ink)]/60 transition-colors rounded-none"
          >
            {mounted ? (isLight ? 'Theatrical ↗' : 'Storyboard ↗') : 'Mode'}
          </button>
        </div>
      </aside>

      {/* Bottom Letterbox Bar (Fixed) */}
      <aside
        aria-label="Reel timeline navigation"
        className="letterbox-bar letterbox-bottom flex items-center justify-between px-4 sm:px-8 border-t border-[var(--ink)]/10"
      >
        <div className="flex items-center gap-2">
          <span className="font-sans text-[11px] text-[var(--ink-2)] tracking-wider uppercase">
            FPS: 24 // SNAP: 100SVH
          </span>
        </div>

        {/* Desktop & Tablet Reel Navigation Ticks */}
        <nav aria-label="Reel scenes" className="hidden sm:flex items-center gap-3">
          <span className="text-[11px] text-[var(--ink-2)] tracking-wider uppercase mr-2 font-mono">
            SHOTS:
          </span>
          <ol className="flex items-center gap-2.5 list-none m-0 p-0">
            {SCENE_SHOTS.map((shot) => {
              const isActive = activeId === shot.id;

              return (
                <li key={shot.id}>
                  <a
                    href={`#${shot.id}`}
                    onClick={(e) => handleShotClick(e, shot.id)}
                    aria-current={isActive ? 'location' : undefined}
                    aria-label={`Jump to Scene ${shot.number}: ${shot.name}`}
                    className="group flex items-center gap-1.5 py-1 px-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--tally)]"
                  >
                    {/* Tick mark indicator */}
                    <span
                      className={`inline-block w-4 h-1.5 transition-all duration-150 rounded-none border ${
                        isActive
                          ? 'bg-[var(--tally)] border-[var(--tally)] scale-110'
                          : 'bg-transparent border-[var(--ink-2)] group-hover:border-[var(--ink)]'
                      }`}
                    />
                    <span
                      className={`font-sans text-xs tracking-wider uppercase transition-colors ${
                        isActive
                          ? 'text-[var(--ink)] font-bold'
                          : 'text-[var(--ink-2)] group-hover:text-[var(--ink)]'
                      }`}
                    >
                      {shot.number}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Mobile Scenes Trigger Button (<640px) */}
        <div className="sm:hidden pointer-events-auto">
          <button
            type="button"
            onClick={openDialog}
            aria-expanded={isDialogOpen}
            aria-haspopup="dialog"
            aria-controls="slate-scenes-dialog"
            className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--ink)] px-2.5 py-1 border border-[var(--ink)]/30 rounded-none flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--tally)]" />
            SCENES
          </button>
        </div>
      </aside>

      {/* Mobile Scenes Dialog (<dialog>) */}
      <dialog
        id="slate-scenes-dialog"
        ref={dialogRef}
        onClose={() => setIsDialogOpen(false)}
        className="backdrop:bg-black/75 p-0 rounded-none border border-[var(--ink)] bg-[var(--frame)] text-[var(--ink)] max-w-xs w-[85vw] m-auto shadow-none"
      >
        <div className="p-5">
          <div className="flex items-center justify-between border-b border-[var(--ink)]/20 pb-3 mb-4">
            <h2 className="font-sans text-xs font-bold tracking-widest uppercase">
              Reel Breakdown
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close scenes dialog"
              className="text-[var(--ink-2)] hover:text-[var(--ink)] font-sans text-sm px-2"
            >
              [✕]
            </button>
          </div>

          <ol className="flex flex-col space-y-1 list-none m-0 p-0">
            {SCENE_SHOTS.map((shot) => {
              const isActive = activeId === shot.id;

              return (
                <li key={shot.id}>
                  <a
                    href={`#${shot.id}`}
                    onClick={(e) => handleShotClick(e, shot.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between min-h-[48px] px-3 py-2 font-sans text-sm tracking-wider uppercase ${
                      isActive
                        ? 'font-bold text-[var(--ink)] border-l-2 border-[var(--tally)] bg-[var(--ink)]/[0.06]'
                        : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>
                      {shot.number}. {shot.name}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-[var(--tally)] font-mono">
                        TAKE ACTIVE
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </dialog>
    </>
  );
}
