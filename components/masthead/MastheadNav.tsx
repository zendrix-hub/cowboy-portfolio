"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export interface MastheadSection {
  id: string;
  folio: string;
  title: string;
}

export const MASTHEAD_SECTIONS: MastheadSection[] = [
  { id: "hero", folio: "01", title: "Nameplate" },
  { id: "about", folio: "02", title: "About" },
  { id: "projects", folio: "03", title: "Features" },
  { id: "skills", folio: "04", title: "Index" },
  { id: "experience", folio: "05", title: "Record" },
  { id: "contact", folio: "06", title: "Colophon" },
];

const subscribe = () => () => {};

export function MastheadNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const alternateLabel = isDark ? "Day edition" : "Night edition";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      openButtonRef.current?.focus();
    }
  };

  useEffect(() => {
    const sectionIds = MASTHEAD_SECTIONS.map((s) => s.id);
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
      {/* Sticky Editorial Contents Bar (§9.2.5) */}
      <header className="sticky top-0 z-40 w-full bg-ground/95 backdrop-blur-sm border-b border-ink-2/30 select-none">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Desktop & Tablet Contents Bar */}
          <div className="flex items-center gap-6 lg:gap-8">
            <span
              className="text-xs uppercase tracking-widest text-ink-2 font-medium"
              aria-hidden="true"
            >
              In this issue
            </span>

            <nav aria-label="Issue contents" className="hidden sm:flex items-center gap-6 lg:gap-8">
              {MASTHEAD_SECTIONS.map((item) => {
                const isCurrent = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={`relative py-1 text-xs tracking-wider transition-colors inline-flex items-center gap-1.5 ${
                      isCurrent
                        ? "text-ink font-semibold"
                        : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    <span className="text-spot font-mono text-[11px]" aria-hidden="true">
                      {item.folio}
                    </span>
                    <span className="hidden lg:inline">{item.title}</span>
                    {isCurrent && (
                      <span
                        className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-spot rule-spot"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Mobile Contents trigger + Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile "Contents" button (opens native <dialog>) */}
            <button
              ref={openButtonRef}
              type="button"
              onClick={openDialog}
              aria-haspopup="dialog"
              aria-label="Open contents spread"
              className="sm:hidden text-xs uppercase tracking-wider text-ink font-medium underline underline-offset-4 py-2 px-1 focus-visible:outline-none"
            >
              Contents
            </button>

            {/* Edition Switcher (Theme toggle) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${alternateLabel}`}
              className="text-xs text-ink-2 hover:text-ink tracking-wider transition-colors py-1.5 focus-visible:outline-none underline underline-offset-4 decoration-ink-2/40 hover:decoration-ink"
            >
              {alternateLabel}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Native <dialog> Contents Spread (§9.2.5, §9.2.13) */}
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        aria-labelledby="contents-spread-title"
        className="fixed inset-0 m-0 w-full h-full max-w-full max-h-full bg-ground text-ink p-6 sm:p-10 backdrop:bg-black/60 z-50 overflow-y-auto"
      >
        <div className="max-w-md mx-auto flex flex-col justify-between min-h-full">
          <div>
            {/* Dialog Header */}
            <div className="flex items-center justify-between border-b border-ink pb-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-ink-2 font-medium block">
                  Publication Index
                </span>
                <h2 id="contents-spread-title" className="font-playfair text-2xl font-bold">
                  Contents
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close contents spread"
                className="text-sm font-medium tracking-wide underline underline-offset-4 text-ink py-2 px-2"
              >
                Close
              </button>
            </div>

            {/* Vertical list of sections with folio numbers */}
            <nav aria-label="Mobile publication contents" className="divide-y divide-ink-2/20">
              {MASTHEAD_SECTIONS.map((item) => {
                const isCurrent = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeDialog}
                    aria-current={isCurrent ? "location" : undefined}
                    className="flex items-baseline justify-between py-4 min-h-[48px] group"
                  >
                    <span
                      className={`font-playfair text-xl transition-colors ${
                        isCurrent ? "font-bold text-ink" : "text-ink-2 group-hover:text-ink"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="font-mono text-sm text-spot font-semibold">
                      p. {item.folio}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Dialog Footer */}
          <div className="pt-8 border-t border-ink-2/20 text-xs text-ink-2 flex items-center justify-between">
            <span>Zendrix Riva Portfolio</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="underline underline-offset-4 text-ink"
            >
              {alternateLabel}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
