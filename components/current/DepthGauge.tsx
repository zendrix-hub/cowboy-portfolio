"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  useCurrentContext,
  TRIBUTARIES,
  TRIBUTARY_LIST,
} from "./CurrentContext";

const SECTIONS = [
  { id: "home", label: "Home", depth: 0 },
  { id: "about", label: "About", depth: 120 },
  { id: "projects", label: "Projects", depth: 320 },
  { id: "skills", label: "Skills", depth: 650 },
  { id: "experience", label: "Experience", depth: 750 },
  { id: "contact", label: "Contact", depth: 850 },
] as const;

function subscribeMedia(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const emptySubscribe = () => () => {};

export default function DepthGauge() {
  const {
    activeSection,
    setActiveSection,
    activeTributary,
  } = useCurrentContext();

  const [markerY, setMarkerY] = useState<number>(0);
  const [isGaugeHovered, setIsGaugeHovered] = useState<boolean>(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isReducedMotion = useSyncExternalStore(
    subscribeMedia,
    getReducedMotionSnapshot,
    () => false
  );

  // Section observer using §6.3.5 rootMargin: "-45% 0px -50% 0px"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Piecewise linear marker tracking
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const isDesktop = window.innerWidth >= 1024;
        const railHeight = isDesktop ? 240 : 200;
        const step = railHeight / (SECTIONS.length - 1);

        const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
        if (currentIndex === -1) return;

        const currentEl = document.getElementById(activeSection);
        if (!currentEl) {
          setMarkerY(currentIndex * step);
          return;
        }

        const rect = currentEl.getBoundingClientRect();
        const elHeight = Math.max(1, rect.height);
        const scrolledIntoEl = -rect.top + window.innerHeight * 0.45;
        const progress = Math.max(0, Math.min(1, scrolledIntoEl / elHeight));

        const nextIndex = Math.min(currentIndex + 1, SECTIONS.length - 1);
        const y =
          currentIndex * step + progress * ((nextIndex - currentIndex) * step);

        setMarkerY(Math.max(0, Math.min(railHeight, y)));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeSection]);

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeSection)
  );
  const activeSectionObj = SECTIONS[activeIndex] || SECTIONS[0];

  const activeTributaryMeta =
    activeTributary !== "none" ? TRIBUTARIES[activeTributary] : null;

  const badgeText = activeTributaryMeta
    ? activeTributaryMeta.projectTitle
    : activeSectionObj.label;

  const isDeep = isMounted && (resolvedTheme === "dark" || theme === "dark");
  const alternateModeName = isDeep ? "Surface" : "Deep";

  const toggleTheme = () => {
    setTheme(isDeep ? "light" : "dark");
  };

  return (
    <>
      {/* Desktop / Tablet Section Navigation Rail (§6.3.5) */}
      <nav
        aria-label="Section Navigation"
        className="hidden sm:flex print:hidden fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
        onMouseEnter={() => setIsGaugeHovered(true)}
        onMouseLeave={() => setIsGaugeHovered(false)}
        onFocus={() => setIsGaugeHovered(true)}
        onBlur={() => setIsGaugeHovered(false)}
      >
        {/* Rail & Ticks Container */}
        <div className="relative h-[200px] lg:h-[240px] w-12 flex justify-center items-stretch">
          {/* Dual-tone Rail: 3px casing with 1px center */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-[#0B2A30] pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-[1px] h-full mx-auto bg-[#F2FBFA]" />
          </div>

          {/* Traveling Ring Marker (14px) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full pointer-events-none z-20 flex items-center justify-center"
            style={{
              top: 0,
              transform: `translate(-50%, ${markerY - 7}px)`,
              transition: isReducedMotion ? "none" : "transform 80ms linear",
            }}
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full border-[1.5px] border-[#0B2A30] bg-[#F2FBFA] flex items-center justify-center shadow-sm">
              <div className="w-[4px] h-[4px] rounded-full bg-[#0B2A30]" />
            </div>

            {/* Active Depth & Tributary Chip (left of marker) */}
            <div
              className={`absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#0B2A30] border border-[#F2FBFA] text-[#F2FBFA] text-[0.8125rem] font-mono font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-300 ${
                isGaugeHovered ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {badgeText}
            </div>
          </div>

          {/* 6 Equal Ticks (each with 44px hit area) */}
          <div className="h-full w-full flex flex-col justify-between items-center relative z-10">
            {SECTIONS.map((section) => {
              const isCurrent = section.id === activeSection;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-label={`${section.label} (${section.depth}m)`}
                  aria-current={isCurrent ? "location" : undefined}
                  className="relative w-11 h-11 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A30] dark:focus-visible:ring-[#F2FBFA] rounded-full"
                >
                  {/* Dual-tone Tick: 10px width, 2px height */}
                  <div
                    className="w-2.5 h-[2px] bg-[#0B2A30] relative flex items-center justify-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-full h-[1px] bg-[#F2FBFA]" />
                  </div>

                  {/* Hover/Focus Label Chip */}
                  <span
                    className={`absolute right-12 px-2.5 py-1 rounded-full bg-[#0B2A30] border border-[#F2FBFA] text-[#F2FBFA] text-[0.8125rem] font-mono font-medium whitespace-nowrap shadow-md pointer-events-none transition-opacity duration-300 ${
                      isGaugeHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {section.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Project Sub-Links (4 Clickable Project Dots) */}
        <div
          className="mt-4 flex flex-col items-center gap-1.5 py-2 px-1.5 rounded-full bg-[#0B2A30]/90 border border-[#F2FBFA]/40 shadow-md"
          role="group"
          aria-label="Project Navigation Links"
        >
          {TRIBUTARY_LIST.map((trib) => {
            const isTribActive = activeTributary === trib.id;
            return (
              <a
                key={trib.id}
                href={`#${trib.anchorId}`}
                aria-label={`Jump to ${trib.projectTitle}`}
                aria-current={isTribActive ? "location" : undefined}
                className="group relative w-6 h-6 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2FBFA]"
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isTribActive
                      ? "w-3 h-3 bg-[#BFF0EA] ring-2 ring-[#F2FBFA]"
                      : "w-2 h-2 bg-[#F2FBFA]/50 group-hover:bg-[#F2FBFA] group-hover:scale-125"
                  }`}
                />
                <span className="absolute right-8 px-2.5 py-1 rounded-full bg-[#0B2A30] border border-[#F2FBFA] text-[#F2FBFA] text-[0.75rem] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none shadow-md">
                  {trib.projectTitle}
                </span>
              </a>
            );
          })}
        </div>

        {/* Quick Resume Download Button */}
        <a
          href="/resume.pdf"
          download="RIVA_ZendrixB_BSIT_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Resume (PDF)"
          title="Download Resume (PDF)"
          className="mt-3 w-11 h-11 rounded-full border border-[#F2FBFA] bg-[#0B2A30] text-[#F2FBFA] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2FBFA]"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>

        {/* Theme Toggle Ring (§6.3.5: 44px ring under rail) */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${alternateModeName}`}
          className="mt-2.5 w-11 h-11 rounded-full border border-[#F2FBFA] bg-[#0B2A30] text-[#F2FBFA] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A30] dark:focus-visible:ring-[#F2FBFA]"
          title={`Switch to ${alternateModeName}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18" />
            <path
              d="M12 3a9 9 0 0 1 0 18z"
              fill="currentColor"
              opacity={isDeep ? "0" : "0.75"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Bottom-Center Depth Pill (§6.3.5) */}
      <div className="sm:hidden print:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          popoverTarget="mobile-depth-popover"
          className="h-12 min-w-[190px] max-w-[90vw] px-5 rounded-full bg-[#0B2A30] border border-[#F2FBFA] text-[#F2FBFA] text-[0.875rem] font-mono font-medium shadow-lg flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2FBFA] active:scale-98"
          aria-label={`Depth gauge: currently at ${badgeText}`}
        >
          <span className="flex items-center gap-2 truncate">
            <span
              className="w-2 h-2 rounded-full bg-[#BFF0EA] shrink-0"
              aria-hidden="true"
            />
            <span className="truncate">{badgeText}</span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        {/* Native Popover Menu (§6.3.5) */}
        <div
          id="mobile-depth-popover"
          popover="auto"
          className="m-0 p-3 rounded-2xl bg-[#0B2A30] border border-[#F2FBFA] text-[#F2FBFA] shadow-2xl backdrop-blur-md fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 min-w-[260px] hidden [&:popover-open]:flex flex-col gap-1 max-h-[75vh] overflow-y-auto"
        >
          {SECTIONS.map((section) => {
            const isCurrent = section.id === activeSection;

            return (
              <React.Fragment key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isCurrent ? "location" : undefined}
                  className={`min-h-[44px] px-4 rounded-xl flex items-center justify-between text-[0.9375rem] font-medium transition-colors ${
                    isCurrent
                      ? "bg-[#1E6B75] text-[#F2FBFA]"
                      : "hover:bg-[#134E5A] text-[#CDE7E4]"
                  }`}
                  onClick={() => {
                    const pop = document.getElementById(
                      "mobile-depth-popover"
                    ) as HTMLElement & {
                      hidePopover?: () => void;
                    };
                    if (pop && typeof pop.hidePopover === "function") {
                      pop.hidePopover();
                    }
                  }}
                >
                  <span>{section.label}</span>
                  <span className="font-mono text-[0.75rem] opacity-80">
                    {section.depth}m
                  </span>
                </a>

                {/* Render 4 Tributary Jump Links underneath Projects */}
                {section.id === "projects" && (
                  <div className="pl-4 flex flex-col gap-1 my-1 border-l border-[#1E6B75] ml-4">
                    {TRIBUTARY_LIST.map((trib) => {
                      const isTribCurr = activeTributary === trib.id;
                      return (
                        <a
                          key={trib.id}
                          href={`#${trib.anchorId}`}
                          className={`min-h-[38px] px-3 rounded-lg flex items-center justify-between text-[0.8125rem] font-mono transition-colors ${
                            isTribCurr
                              ? "bg-[#BFF0EA] text-[#0B2A30] font-semibold"
                              : "text-[#CDE7E4] hover:bg-[#134E5A]"
                          }`}
                          onClick={() => {
                            const pop = document.getElementById(
                              "mobile-depth-popover"
                            ) as HTMLElement & {
                              hidePopover?: () => void;
                            };
                            if (pop && typeof pop.hidePopover === "function") {
                              pop.hidePopover();
                            }
                          }}
                        >
                          <span>↳ {trib.projectTitle}</span>
                          <span>{trib.depthMeters}m</span>
                        </a>
                      );
                    })}
                  </div>
                )}

                {/* Japan bearing sub-link underneath Experience */}
                {section.id === "experience" && (
                  <div className="pl-4 flex flex-col gap-1 my-1 border-l border-[#1E6B75] ml-4">
                    <a
                      href="#japan"
                      className="min-h-[38px] px-3 rounded-lg flex items-center justify-between text-[0.8125rem] font-mono transition-colors text-[#CDE7E4] hover:bg-[#134E5A]"
                      onClick={() => {
                        const pop = document.getElementById(
                          "mobile-depth-popover"
                        ) as HTMLElement & {
                          hidePopover?: () => void;
                        };
                        if (pop && typeof pop.hidePopover === "function") {
                          pop.hidePopover();
                        }
                      }}
                    >
                      <span>↳ Japan bearing</span>
                      <span lang="ja">進路</span>
                    </a>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <div className="h-[1px] bg-[#1E6B75] my-1" aria-hidden="true" />

          {/* Direct Resume Download Link */}
          <a
            href="/resume.pdf"
            download="RIVA_ZendrixB_BSIT_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 rounded-xl flex items-center justify-between text-[0.9375rem] font-semibold text-[#5EEAD4] bg-[#072429] border border-[#14B8A6]/40 hover:bg-[#134E5A] transition-colors w-full"
            onClick={() => {
              const pop = document.getElementById(
                "mobile-depth-popover"
              ) as HTMLElement & {
                hidePopover?: () => void;
              };
              if (pop && typeof pop.hidePopover === "function") {
                pop.hidePopover();
              }
            }}
          >
            <span className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume (PDF)</span>
            </span>
            <span className="font-mono text-[0.6875rem] opacity-75">54 KB</span>
          </a>

          {/* Theme Toggle within Mobile Popover */}
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              const pop = document.getElementById(
                "mobile-depth-popover"
              ) as HTMLElement & {
                hidePopover?: () => void;
              };
              if (pop && typeof pop.hidePopover === "function") {
                pop.hidePopover();
              }
            }}
            className="min-h-[44px] px-4 rounded-xl flex items-center justify-between text-[0.9375rem] font-medium text-[#CDE7E4] hover:bg-[#134E5A] transition-colors w-full text-left"
          >
            <span>Switch to {alternateModeName}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18" />
              <path
                d="M12 3a9 9 0 0 1 0 18z"
                fill="currentColor"
                opacity={isDeep ? "0" : "0.75"}
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
