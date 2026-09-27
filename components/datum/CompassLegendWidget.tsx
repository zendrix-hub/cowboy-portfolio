'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

interface AscentStation {
  id: string;
  name: string;
  band: string;
  angle: number;
}

const ASCENT_STATIONS: AscentStation[] = [
  { id: 'hero', name: 'Hero', band: 'Low Ground', angle: 180 },
  { id: 'about', name: 'About', band: 'Mid Elevation', angle: 135 },
  { id: 'projects', name: 'Projects', band: 'Summit Approach', angle: 45 },
  { id: 'skills', name: 'Skills', band: 'High Contour', angle: 25 },
  { id: 'experience', name: 'Experience', band: 'Peak Ridge', angle: 10 },
  { id: 'contact', name: 'Contact', band: 'Lookout Summit', angle: 0 },
];

const emptySubscribe = () => () => {};

export function CompassLegendWidget() {
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

    ASCENT_STATIONS.forEach((station) => {
      const el = document.getElementById(station.id);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeDialog();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const currentStation =
    ASCENT_STATIONS.find((s) => s.id === activeId) ?? ASCENT_STATIONS[0];
  const isNight = resolvedTheme === 'dark';

  return (
    <>
      {/* Desktop & Tablet Fixed Compass & Legend Widget */}
      <aside
        aria-label="Elevation legend and compass"
        className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center gap-3 bg-[var(--peak)]/90 backdrop-blur-sm border border-[var(--contour)]/40 p-2.5 rounded-none shadow-sm select-none"
      >
        {/* Functional Compass Rose (Circle with rotating needle) */}
        <div
          title={`Heading to ${currentStation.band}`}
          className="relative w-8 h-8 rounded-full border border-[var(--contour)] flex items-center justify-center bg-[var(--peak)]"
        >
          {/* North indicator */}
          <span className="absolute top-0.5 text-[8px] font-display font-bold text-[var(--contour)]">
            N
          </span>

          {/* Rotating Compass Needle pointing toward current elevation */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${currentStation.angle}deg)` }}
          >
            {/* Red/Contour North needle */}
            <polygon points="10,2 13,10 7,10" fill="var(--contour)" />
            {/* Neutral South needle */}
            <polygon points="10,18 13,10 7,10" fill="var(--ink-2)" opacity="0.6" />
          </svg>
        </div>

        {/* Legend: 6 Ticks with Station Labels */}
        <nav aria-label="Elevation ascent sequence">
          <ol className="flex items-center gap-2 m-0 p-0 list-none">
            {ASCENT_STATIONS.map((station) => {
              const isActive = activeId === station.id;

              return (
                <li key={station.id}>
                  <a
                    href={`#${station.id}`}
                    onClick={(e) => handleNavClick(e, station.id)}
                    aria-current={isActive ? 'location' : undefined}
                    aria-label={`Ascend to ${station.name} (${station.band})`}
                    className="group flex flex-col items-center p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--contour)]"
                  >
                    {/* Tick mark */}
                    <span
                      className={`inline-block w-3.5 h-1.5 transition-colors border ${
                        isActive
                          ? 'bg-[var(--contour)] border-[var(--contour)]'
                          : 'bg-transparent border-[var(--contour)]/50 group-hover:border-[var(--contour)]'
                      }`}
                    />
                    <span
                      className={`hidden lg:inline font-display text-[10px] tracking-wider uppercase mt-1 transition-colors ${
                        isActive
                          ? 'text-[var(--ink)] font-bold'
                          : 'text-[var(--ink)]/60 group-hover:text-[var(--ink)]'
                      }`}
                    >
                      {station.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Mode toggle */}
        <div className="border-l border-[var(--contour)]/30 pl-2 ml-1">
          <button
            type="button"
            onClick={() => setTheme(isNight ? 'light' : 'dark')}
            aria-label={
              mounted
                ? isNight
                  ? 'Switch to Day elevation mode'
                  : 'Switch to Night elevation mode'
                : 'Toggle elevation mode'
            }
            className="font-display text-[11px] uppercase tracking-wider text-[var(--ink)] hover:text-[var(--contour)] p-1 transition-colors"
          >
            {mounted ? (isNight ? 'Day' : 'Night') : 'Mode'}
          </button>
        </div>
      </aside>

      {/* Mobile Legend Trigger Button (<640px) */}
      <div className="sm:hidden fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={openDialog}
          aria-expanded={isDialogOpen}
          aria-haspopup="dialog"
          aria-controls="datum-legend-dialog"
          className="bg-[var(--peak)] border-2 border-[var(--contour)] text-[var(--ink)] px-3.5 py-2 font-display text-xs font-bold tracking-wider flex items-center gap-2 shadow-sm rounded-none"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--contour)]" />
          LEGEND
        </button>
      </div>

      {/* Mobile Legend Dialog (<dialog>) */}
      <dialog
        id="datum-legend-dialog"
        ref={dialogRef}
        onClose={() => setIsDialogOpen(false)}
        className="backdrop:bg-black/60 p-0 rounded-none border border-[var(--contour)] bg-[var(--peak)] text-[var(--ink)] max-w-xs w-[85vw] m-auto shadow-none"
      >
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-[var(--contour)]/30 pb-3 mb-4">
            <h2 className="font-display text-xs font-bold tracking-widest uppercase">
              Cartographic Ascent
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close elevation legend"
              className="text-[var(--ink)] hover:text-[var(--contour)] font-display text-xs px-2"
            >
              [✕]
            </button>
          </div>

          <ol className="flex flex-col space-y-1 list-none m-0 p-0">
            {ASCENT_STATIONS.map((station) => {
              const isActive = activeId === station.id;

              return (
                <li key={station.id}>
                  <a
                    href={`#${station.id}`}
                    onClick={(e) => handleNavClick(e, station.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between min-h-[48px] px-3 py-2 font-display text-xs tracking-wider uppercase ${
                      isActive
                        ? 'font-bold text-[var(--ink)] border-l-2 border-[var(--contour)] bg-[var(--contour)]/[0.08]'
                        : 'text-[var(--ink)]/70 hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{station.name}</span>
                    <span className="text-[10px] text-[var(--contour)]">
                      {station.band}
                    </span>
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
