'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface StepNode {
  id: string;
  name: string;
  stage: string;
  shape: 'stadium' | 'rect';
}

const STEP_NODES: StepNode[] = [
  { id: 'hero', name: 'Hero', stage: '[Init]', shape: 'stadium' },
  { id: 'about', name: 'About', stage: '[Input]', shape: 'rect' },
  { id: 'projects', name: 'Projects', stage: '[Modules]', shape: 'rect' },
  { id: 'skills', name: 'Skills', stage: '[Modules]', shape: 'rect' },
  { id: 'experience', name: 'Experience', stage: '[Process]', shape: 'rect' },
  { id: 'contact', name: 'Contact', stage: '[Output]', shape: 'stadium' },
];

const emptySubscribe = () => () => {};

export function PipelineStepper() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);
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

    STEP_NODES.forEach((step) => {
      const el = document.getElementById(step.id);
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

  const handleStepClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeDialog();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      {/* Sticky Desktop & Tablet Pipeline Stepper */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--ink)]/15 bg-[var(--board)]/90 backdrop-blur-sm transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Runtime system badge */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--ink)]">
              RUNTIME // SYS.DIAG
            </span>
          </div>

          {/* Stepper horizontal row (Desktop ≥1024 and Tablet 640–1023) */}
          <nav aria-label="Pipeline navigation" className="hidden sm:flex items-center">
            <ol className="flex items-center gap-2 sm:gap-4 md:gap-6 list-none m-0 p-0">
              {STEP_NODES.map((step, idx) => {
                const isActive = activeId === step.id;
                const isStadium = step.shape === 'stadium';

                return (
                  <li key={step.id} className="relative flex flex-col items-center">
                    <a
                      href={`#${step.id}`}
                      onClick={(e) => handleStepClick(e, step.id)}
                      aria-current={isActive ? 'location' : undefined}
                      aria-label={`${step.name} section`}
                      className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--marker)] rounded p-1"
                    >
                      {/* Node shape icon */}
                      <span
                        className={`inline-block transition-all duration-150 border ${
                          isStadium
                            ? 'w-7 h-4 rounded-full'
                            : 'w-5 h-4 rounded-sm'
                        } ${
                          isActive
                            ? 'bg-[var(--marker)] border-[var(--marker)]'
                            : 'bg-transparent border-[var(--ink)] group-hover:border-[var(--marker)]'
                        }`}
                      />

                      {/* Desktop step title & stage bracket */}
                      <span className="mt-1 flex flex-col items-center">
                        <span
                          className={`font-mono text-[11px] leading-tight transition-colors ${
                            isActive
                              ? 'text-[var(--ink)] font-bold'
                              : 'text-[var(--ink-2)] group-hover:text-[var(--ink)]'
                          }`}
                        >
                          {step.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className="hidden lg:inline text-[9px] font-mono text-[var(--ink-2)]/70 uppercase"
                        >
                          {step.stage}
                        </span>
                      </span>
                    </a>

                    {/* Inter-node connector line in stepper row */}
                    {idx < STEP_NODES.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden sm:block absolute top-[10px] left-[calc(100%+2px)] w-[12px] md:w-[20px] h-[1px] bg-[var(--ink-2)]/40 pointer-events-none"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Theme Mode Toggle (Whiteboard / Chalkboard) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={
                mounted
                  ? isDark
                    ? 'Switch to Whiteboard mode'
                    : 'Switch to Chalkboard mode'
                  : 'Toggle theme'
              }
              className="runtime-btn text-xs font-mono h-9 px-3 py-1 flex items-center gap-1.5"
            >
              {/* Theme icon: 1.5px round-cap strokes */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isDark ? (
                  // Sun icon for chalkboard -> whiteboard
                  <>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </>
                ) : (
                  // Moon icon for whiteboard -> chalkboard
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </svg>
              <span className="hidden md:inline">
                {mounted ? (isDark ? 'Chalkboard' : 'Whiteboard') : 'Mode'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Flow Trigger Button (<640px) */}
      <div className="sm:hidden fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={openDialog}
          aria-expanded={isDialogOpen}
          aria-haspopup="dialog"
          aria-controls="runtime-flow-dialog"
          className="bg-[var(--board)] border-2 border-[var(--ink)] text-[var(--ink)] px-4 py-2.5 rounded-lg font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--marker)]"
        >
          <span className="inline-block w-2.5 h-2.5 bg-[var(--marker)] rounded-full animate-pulse" />
          FLOW
        </button>
      </div>

      {/* Mobile Flow Dialog (<dialog>) */}
      <dialog
        id="runtime-flow-dialog"
        ref={dialogRef}
        onClose={() => setIsDialogOpen(false)}
        className="backdrop:bg-black/50 p-0 rounded-lg border-2 border-[var(--ink)] bg-[var(--board)] text-[var(--ink)] max-w-sm w-[90vw] m-auto shadow-none"
      >
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-[var(--ink)]/20 pb-3 mb-4">
            <h2 className="font-mono text-sm font-bold tracking-wider uppercase">
              Pipeline Flowchart
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close flow dialog"
              className="text-[var(--ink-2)] hover:text-[var(--ink)] font-mono text-sm px-2 py-1"
            >
              [✕]
            </button>
          </div>

          <ol className="relative flex flex-col pl-4 border-l-2 border-[var(--connector)] space-y-4 my-2 list-none">
            {STEP_NODES.map((step) => {
              const isActive = activeId === step.id;
              const isStadium = step.shape === 'stadium';

              return (
                <li key={step.id} className="relative flex items-center">
                  {/* Flow dot on the vertical line */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[23px] ${
                      isStadium ? 'w-3.5 h-2.5 rounded-full' : 'w-2.5 h-2.5 rounded-sm'
                    } border border-[var(--ink)] ${
                      isActive ? 'bg-[var(--marker)]' : 'bg-[var(--board)]'
                    }`}
                  />
                  <a
                    href={`#${step.id}`}
                    onClick={(e) => handleStepClick(e, step.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between w-full min-h-[48px] px-3 py-2 rounded font-mono text-sm ${
                      isActive
                        ? 'font-bold text-[var(--ink)] bg-[var(--ink)]/[0.05]'
                        : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{step.name}</span>
                    <span className="text-xs text-[var(--ink-2)]/70">{step.stage}</span>
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
