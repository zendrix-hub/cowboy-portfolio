"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import BiyahePinstripe from "./BiyahePinstripe";

const emptySubscribe = () => () => {};

interface NavRoute {
  id: string;
  name: string;
  href: string;
  bgClass: string;
  depthColor: string;
  textClass: string;
}

const ROUTES: NavRoute[] = [
  {
    id: "home",
    name: "Home",
    href: "#home",
    bgClass: "bg-[#FFC72C]",
    depthColor: "#CC9F23",
    textClass: "text-black",
  },
  {
    id: "about",
    name: "About",
    href: "#about",
    bgClass: "bg-[#E4262A]",
    depthColor: "#B61E22",
    textClass: "text-white",
  },
  {
    id: "projects",
    name: "Projects",
    href: "#projects",
    bgClass: "bg-[#1B3FD1]",
    depthColor: "#1632A7",
    textClass: "text-white",
  },
  {
    id: "skills",
    name: "Skills",
    href: "#skills",
    bgClass: "bg-[#0F9D58]",
    depthColor: "#0C7E46",
    textClass: "text-black",
  },
  {
    id: "experience",
    name: "Journey",
    href: "#experience",
    bgClass: "bg-white dark:bg-[#131E57]",
    depthColor: "#CCCCCC",
    textClass: "text-black dark:text-white",
  },
  {
    id: "contact",
    name: "Contact",
    href: "#contact",
    bgClass: "bg-[#E4262A]",
    depthColor: "#B61E22",
    textClass: "text-white",
  },
];

export default function BiyaheNav() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [activeSection, setActiveSection] = useState("home");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // IntersectionObserver to track current section (§6.1.5)
  useEffect(() => {
    const sectionIds = ROUTES.map((r) => r.id);
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

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      triggerRef.current?.focus();
    }
  };

  const isNight = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    setTheme(isNight ? "light" : "dark");
  };

  return (
    <>
      {/* Desktop & Tablet Sticky Navigation Header (§6.1.5) */}
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0B1440] shadow-md">
        <BiyahePinstripe />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Primary Route Plates Navigation */}
          <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {ROUTES.map((route) => {
              const isCurrent = activeSection === route.id;
              return (
                <a
                  key={route.id}
                  href={route.href}
                  aria-current={isCurrent ? "location" : undefined}
                  style={{ ["--depth-color" as string]: route.depthColor }}
                  className={`pressable-plate hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs lg:text-sm font-bungee tracking-wide ${
                    route.bgClass
                  } ${route.textClass} ${
                    isCurrent ? "pressed-in ring-2 ring-black dark:ring-white" : ""
                  }`}
                >
                  <span>{route.name}</span>
                </a>
              );
            })}

            {/* Mobile Header Title */}
            <div className="sm:hidden font-bungee text-base text-black dark:text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FFC72C] border-2 border-black inline-block" />
              <span>BIYAHE ROUTE</span>
            </div>
          </nav>

          {/* Mode Toggle Plate */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isNight ? "Switch to Day mode" : "Switch to Lights On night mode"}
              style={{ ["--depth-color" as string]: isNight ? "#1632A7" : "#CC9F23" }}
              className={`pressable-plate px-3 py-1.5 sm:py-2 text-xs font-bungee flex items-center gap-1.5 ${
                isNight
                  ? "bg-[#1B3FD1] text-white border-3 border-black"
                  : "bg-[#FFC72C] text-black border-3 border-black"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full border border-black ${
                  isNight ? "bg-[#FFC72C]" : "bg-[#1B3FD1]"
                }`}
                aria-hidden="true"
              />
              <span>{isNight ? "LIGHTS ON" : "DAY MODE"}</span>
            </button>
          </div>
        </div>
        <BiyahePinstripe />
      </header>

      {/* Mobile Fixed "Routes" Trigger Plate (<640px) (§6.1.5) */}
      <div className="sm:hidden fixed bottom-5 right-4 z-50 pointer-events-auto">
        <button
          ref={triggerRef}
          type="button"
          onClick={openDialog}
          aria-haspopup="dialog"
          aria-label="Open routes navigation menu"
          style={{ ["--depth-color" as string]: "#CC9F23" }}
          className="pressable-plate px-5 py-3.5 bg-[#FFC72C] text-black font-bungee text-sm tracking-wider flex items-center gap-2 shadow-lg"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E4262A] border border-black animate-pulse" />
          <span>ROUTES</span>
        </button>
      </div>

      {/* Mobile Native Full-Screen Route Dialog (§6.1.5, §6.1.13) */}
      <dialog
        ref={dialogRef}
        onClose={() => triggerRef.current?.focus()}
        className="backdrop:bg-black/70 bg-[#0B1440] text-white w-full h-full max-w-full max-h-full m-0 p-6 flex flex-col justify-between"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-white/30">
            <div className="font-bungee text-lg text-[#FFC72C] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E4262A] border border-white" />
              <span>SELECT ROUTE</span>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close navigation dialog"
              style={{ ["--depth-color" as string]: "#CCCCCC" }}
              className="pressable-plate px-3 py-1.5 bg-white text-black font-bungee text-xs"
            >
              CLOSE ✕
            </button>
          </div>

          {/* Stacked Route Plates (Each at least 64px tall) */}
          <div className="flex flex-col gap-3 pt-2">
            {ROUTES.map((route) => {
              const isCurrent = activeSection === route.id;
              return (
                <a
                  key={route.id}
                  href={route.href}
                  onClick={closeDialog}
                  aria-current={isCurrent ? "location" : undefined}
                  style={{ ["--depth-color" as string]: route.depthColor }}
                  className={`pressable-plate min-h-[64px] flex items-center justify-between px-5 py-4 font-bungee text-lg ${
                    route.bgClass
                  } ${route.textClass} ${
                    isCurrent ? "pressed-in ring-4 ring-white" : ""
                  }`}
                >
                  <span>{route.name}</span>
                  {isCurrent && (
                    <span className="text-xs px-2 py-1 bg-black text-white rounded font-lexend font-bold uppercase">
                      Current Stop
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Dialog Footer with Mode Toggle */}
        <div className="pt-4 border-t-2 border-white/20 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleTheme}
            style={{ ["--depth-color" as string]: isNight ? "#1632A7" : "#CC9F23" }}
            className={`pressable-plate flex-1 py-3 text-sm font-bungee flex items-center justify-center gap-2 ${
              isNight
                ? "bg-[#1B3FD1] text-white border-3 border-black"
                : "bg-[#FFC72C] text-black border-3 border-black"
            }`}
          >
            <span>MODE: {isNight ? "LIGHTS ON (NIGHT)" : "DAY"}</span>
          </button>
        </div>
      </dialog>
    </>
  );
}
