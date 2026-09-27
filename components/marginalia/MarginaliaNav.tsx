"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export interface NavSection {
  id: string;
  number: number;
  label: string;
  shortLabel: string;
}

export const MARGINALIA_SECTIONS: NavSection[] = [
  { id: "home", number: 1, label: "Home", shortLabel: "1" },
  { id: "about", number: 2, label: "About", shortLabel: "2" },
  { id: "projects", number: 3, label: "Projects", shortLabel: "3" },
  { id: "skills", number: 4, label: "Skills", shortLabel: "4" },
  { id: "experience", number: 5, label: "Journey", shortLabel: "5" },
  { id: "contact", number: 6, label: "Contact", shortLabel: "6" },
];

const subscribe = () => () => {};

export function MarginaliaNav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const alternateMode = isDark ? "Desk" : "Lamp";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // IntersectionObserver to track current active page (§9.1.5)
  useEffect(() => {
    const sectionIds = MARGINALIA_SECTIONS.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1. DESKTOP & TABLET BOOKMARK TABS (≥640px) (§9.1.5) */}
      <nav
        aria-label="Notebook bookmark tabs"
        className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-1.5 select-none"
      >
        {MARGINALIA_SECTIONS.map((item, idx) => {
          const isCurrent = activeSection === item.id;
          const isAltTint = idx % 2 === 1;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              aria-current={isCurrent ? "location" : undefined}
              aria-label={`Page ${item.number}: ${item.label}`}
              style={{
                writingMode: "vertical-rl",
              }}
              className={`bookmark-tab group relative flex items-center justify-center font-courier text-xs tracking-wider uppercase transition-all duration-200 shadow-sm rounded-l-[3px] border-y border-l border-black/20 ${
                isAltTint
                  ? "bg-tape-light text-white dark:text-zinc-950"
                  : "bg-tape text-white dark:text-zinc-950"
              } ${
                isCurrent
                  ? "-translate-x-3.5 pr-4 pl-2 font-bold shadow-md ring-1 ring-black/30"
                  : "hover:-translate-x-2 pr-3 pl-1.5 opacity-90 hover:opacity-100"
              } h-12 lg:h-14 min-w-[32px] lg:min-w-[36px]`}
            >
              <span className="lg:hidden">{item.number}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </a>
          );
        })}

        {/* Theme Toggle Tab (Bottom Tab) */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${alternateMode} mode`}
          style={{ writingMode: "vertical-rl" }}
          className="bookmark-tab relative flex items-center justify-center font-courier text-[11px] lg:text-xs tracking-widest uppercase transition-all duration-200 shadow-sm rounded-l-[3px] border-y border-l border-black/20 bg-paper text-ink hover:-translate-x-2 pr-3 pl-1.5 h-12 lg:h-14 min-w-[32px] lg:min-w-[36px] opacity-95 hover:opacity-100 mt-2"
        >
          <span>{alternateMode}</span>
        </button>
      </nav>

      {/* 2. MOBILE BOTTOM FLAG ROW (<640px) (§9.1.5) */}
      <nav
        aria-label="Notebook bookmark flags"
        className="sm:hidden fixed bottom-[calc(8px+env(safe-area-inset-bottom))] left-2 right-2 z-50 flex items-end justify-center gap-1.5 pointer-events-auto select-none"
      >
        <div className="bg-paper/95 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-ink/15 shadow-lift flex items-center gap-1">
          {MARGINALIA_SECTIONS.map((item, idx) => {
            const isCurrent = activeSection === item.id;
            const isAlt = idx % 2 === 1;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                aria-current={isCurrent ? "location" : undefined}
                aria-label={`Page ${item.number}: ${item.label}`}
                className={`flex items-center justify-center font-courier text-xs rounded-[2px] transition-all min-w-[44px] h-11 px-2 ${
                  isCurrent
                    ? "bg-tape text-white dark:text-zinc-950 font-bold -translate-y-1 shadow-sm ring-1 ring-ink/30"
                    : isAlt
                    ? "bg-tape-light/80 text-white dark:text-zinc-950 opacity-80"
                    : "bg-tape/70 text-white dark:text-zinc-950 opacity-80"
                }`}
              >
                <span>p.{item.number}</span>
              </a>
            );
          })}

          {/* Mobile Theme Toggle Flag */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${alternateMode} mode`}
            className="flex items-center justify-center font-courier text-[11px] rounded-[2px] bg-paper text-ink border border-ink-2/30 h-11 px-2 min-w-[44px]"
          >
            <span>{alternateMode}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
