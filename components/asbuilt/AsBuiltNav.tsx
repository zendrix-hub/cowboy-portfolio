"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeIcon } from "./Icons";

export interface NavSheetItem {
  id: string;
  number: number;
  label: string;
  shortLabel: string;
}

export const NAV_SHEETS: NavSheetItem[] = [
  { id: "home", number: 1, label: "Home", shortLabel: "Home" },
  { id: "about", number: 2, label: "About", shortLabel: "About" },
  { id: "projects", number: 3, label: "Projects", shortLabel: "Proj." },
  { id: "skills", number: 4, label: "Skills", shortLabel: "Skil." },
  { id: "experience", number: 5, label: "Experience", shortLabel: "Exp." },
  { id: "contact", number: 6, label: "Contact", shortLabel: "Cont." },
];

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function AsBuiltNav() {
  const [activeId, setActiveId] = useState<string>("home");
  const mounted = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isBlueprint = mounted && (resolvedTheme || theme) === "dark";
  const alternateMode = isBlueprint ? "Print" : "Blueprint";
  const toggleTheme = () => setTheme(isBlueprint ? "light" : "dark");

  // IntersectionObserver for tracking active sheet per §6.2.5
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    NAV_SHEETS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 
        1. DESKTOP NAV (≥1024px)
        Sticky left rail, 208px wide, top: 24px.
        2px-outlined block, 40px rows, 1px rules.
      */}
      <aside className="hidden lg:block w-[208px] shrink-0">
        <nav
          aria-label="Sheet index"
          className="sticky top-6 w-[208px] border-2 border-ink bg-sheet select-none z-30"
        >
          <div className="divide-y divide-ink">
            {NAV_SHEETS.map((item) => {
              const isCurrent = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isCurrent ? "location" : undefined}
                  className={`h-10 flex items-center px-3 text-[0.9375rem] font-semibold tracking-normal transition-none ${
                    isCurrent
                      ? "bg-ink text-sheet"
                      : "bg-sheet text-ink hover:bg-ink hover:text-sheet"
                  }`}
                >
                  <span className="font-mono text-sm mr-2 w-4 text-left">
                    {item.number}
                  </span>
                  <span className="font-sans font-semibold">
                    {item.label}
                  </span>
                </a>
              );
            })}

            {/* Theme Toggle Cell per §6.2.5 & §11.6 */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${alternateMode}`}
              className="w-full h-10 flex items-center justify-between px-3 text-[0.9375rem] font-sans font-semibold bg-sheet text-ink hover:bg-ink hover:text-sheet transition-none text-left"
            >
              <span>{alternateMode}</span>
              <ThemeIcon className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </aside>

      {/* 
        2. TABLET NAV (640px to 1023px)
        Sticky top index strip: 48px row of six cells plus toggle cell.
      */}
      <div className="hidden sm:block lg:hidden sticky top-0 z-40 w-full bg-sheet border-b-2 border-ink">
        <nav
          aria-label="Sheet index"
          className="max-w-5xl mx-auto flex items-stretch h-12 divide-x divide-ink text-sm"
        >
          {NAV_SHEETS.map((item) => {
            const isCurrent = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isCurrent ? "location" : undefined}
                className={`flex-1 flex items-center justify-center px-2 font-semibold transition-none ${
                  isCurrent
                    ? "bg-ink text-sheet"
                    : "bg-sheet text-ink hover:bg-ink hover:text-sheet"
                }`}
              >
                <span className="font-mono mr-1.5">{item.number}</span>
                <span className="hidden md:inline font-sans">{item.label}</span>
                <span className="inline md:hidden font-sans">{item.shortLabel}</span>
              </a>
            );
          })}

          {/* Theme toggle cell on tablet */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${alternateMode}`}
            className="px-3 flex items-center justify-center gap-1.5 font-sans font-semibold bg-sheet text-ink hover:bg-ink hover:text-sheet transition-none"
          >
            <span className="hidden md:inline">{alternateMode}</span>
            <ThemeIcon className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* 
        3. MOBILE BOTTOM SHEET STRIP (<640px)
        Fixed bottom strip 56px + env(safe-area-inset-bottom).
        Six cells that share borders like table cells.
        Current cell shows numeral and name; other five show numeral only.
      */}
      <nav
        aria-label="Sheet index"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-sheet border-t-2 border-ink flex items-stretch h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] divide-x divide-ink"
      >
        {NAV_SHEETS.map((item) => {
          const isCurrent = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={`Sheet ${item.number}, ${item.label}`}
              aria-current={isCurrent ? "location" : undefined}
              className={`flex items-center justify-center transition-none ${
                isCurrent
                  ? "flex-[2] bg-ink text-sheet px-2 font-semibold"
                  : "flex-1 bg-sheet text-ink min-w-[40px] px-1"
              }`}
            >
              <span className="font-mono text-sm">{item.number}</span>
              {isCurrent && (
                <span className="font-sans text-xs ml-1.5 truncate">
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}

/**
 * Mobile-only theme toggle bar placed at the top of the Cover sheet per §6.2.5:
 * "The theme toggle moves to a plain 40px bar at the top of the cover sheet (not sticky)."
 */
export function MobileCoverThemeToggle() {
  const mounted = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isBlueprint = mounted && (resolvedTheme || theme) === "dark";
  const alternateMode = isBlueprint ? "Print" : "Blueprint";
  const toggleTheme = () => setTheme(isBlueprint ? "light" : "dark");

  return (
    <div className="block sm:hidden w-full mb-4">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${alternateMode}`}
        className="w-full h-10 border-2 border-ink bg-sheet text-ink flex items-center justify-between px-4 font-sans font-semibold text-sm hover:bg-ink hover:text-sheet transition-none"
      >
        <span>Theme: Switch to {alternateMode}</span>
        <ThemeIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
