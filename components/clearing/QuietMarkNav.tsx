'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

interface SectionEntry {
  id: string;
  name: string;
}

const SECTIONS: SectionEntry[] = [
  { id: 'hero', name: 'Zendrix Riva' },
  { id: 'about', name: 'About' },
  { id: 'projects', name: 'Projects' },
  { id: 'skills', name: 'Skills' },
  { id: 'experience', name: 'Experience' },
  { id: 'contact', name: 'Contact' },
];

const emptySubscribe = () => () => {};

export function QuietMarkNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [activeId, setActiveId] = useState<string>('hero');
  const [isExpanded, setIsExpanded] = useState(false);
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

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeDialog();
    setIsExpanded(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      {/* Desktop (≥1024px) Quiet Mark Control */}
      <nav
        aria-label="Quiet section navigation"
        className="hidden lg:block fixed bottom-8 right-8 z-50 text-right group select-none"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsExpanded(false);
          }
        }}
      >
        {/* Expanded Plain Text List (No box, no border) */}
        <div
          className={`flex flex-col items-end space-y-2 mb-3 transition-opacity duration-200 ${
            isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {SECTIONS.map((sec) => {
            const isActive = activeId === sec.id;

            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleNavClick(e, sec.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`font-serif text-sm tracking-wider transition-colors ${
                  isActive
                    ? 'text-[var(--ink)] border-b border-[var(--mark)]'
                    : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                {sec.name}
              </a>
            );
          })}

          {/* Theme toggle: 7th item */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={
              mounted
                ? isDark
                  ? 'Switch to Paper mode (light)'
                  : 'Switch to Ink mode (dark)'
                : 'Toggle theme'
            }
            className="font-serif text-xs tracking-widest uppercase text-[var(--ink-2)] hover:text-[var(--ink)] pt-2 transition-colors cursor-pointer"
          >
            {mounted ? (isDark ? 'Paper' : 'Ink') : 'Mode'}
          </button>
        </div>

        {/* The 8px Quiet Mark Dot at rest */}
        <button
          type="button"
          aria-label="Open quiet section navigation"
          aria-expanded={isExpanded}
          className="inline-flex items-center justify-center p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--mark)]"
        >
          <span
            className="inline-block w-2 h-2 rounded-full bg-[var(--ink)] transition-transform duration-200 group-hover:scale-125"
          />
        </button>
      </nav>

      {/* Tablet & Mobile (<1024px) Quiet Mark Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={openDialog}
          aria-label="Open section navigation"
          className="w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--mark)]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]" />
        </button>
      </div>

      {/* Mobile Native Dialog (<dialog>) with Plain Text List */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/60 p-0 m-auto bg-transparent text-[var(--ink)] border-none shadow-none max-w-xs w-[85vw]"
      >
        <div className="bg-[var(--ground)] p-8 flex flex-col items-end space-y-4">
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close navigation"
            className="font-serif text-sm text-[var(--ink-2)] hover:text-[var(--ink)] mb-4"
          >
            Close
          </button>

          {SECTIONS.map((sec) => {
            const isActive = activeId === sec.id;

            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleNavClick(e, sec.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`min-h-[44px] flex items-center font-serif text-base tracking-wider ${
                  isActive
                    ? 'text-[var(--ink)] border-b border-[var(--mark)] font-medium'
                    : 'text-[var(--ink-2)]'
                }`}
              >
                {sec.name}
              </a>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setTheme(isDark ? 'light' : 'dark');
              closeDialog();
            }}
            className="min-h-[44px] flex items-center font-serif text-xs tracking-widest uppercase text-[var(--ink-2)] pt-2"
          >
            {isDark ? 'Switch to Paper' : 'Switch to Ink'}
          </button>
        </div>
      </dialog>
    </>
  );
}
