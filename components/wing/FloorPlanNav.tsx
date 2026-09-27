"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export interface WingRoom {
  id: string;
  number: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const WING_ROOMS: WingRoom[] = [
  { id: "room-01", number: "01", name: "Entrance", x: 8, y: 10, w: 42, h: 32 },
  { id: "room-02", number: "02", name: "Profile", x: 58, y: 10, w: 42, h: 32 },
  { id: "room-03", number: "03", name: "Exhibits", x: 108, y: 10, w: 44, h: 32 },
  { id: "room-04", number: "04", name: "Collection", x: 8, y: 58, w: 42, h: 32 },
  { id: "room-05", number: "05", name: "Record", x: 58, y: 58, w: 42, h: 32 },
  { id: "room-06", number: "06", name: "Exit", x: 108, y: 58, w: 44, h: 32 },
];

const emptySubscribe = () => () => {};

function getPlanAnimationSnapshot(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;

    const alreadySettled = sessionStorage.getItem("wing-plan-settled");
    if (!alreadySettled) {
      sessionStorage.setItem("wing-plan-settled", "true");
      return true;
    }
  } catch {
    // fallback
  }
  return false;
}

export function FloorPlanNav() {
  const [activeRoom, setActiveRoom] = useState<string>("room-01");
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const shouldAnimate = useSyncExternalStore(emptySubscribe, getPlanAnimationSnapshot, () => false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const alternateLabel = isDark ? "Daylight" : "Gallery lights";

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
    const roomIds = WING_ROOMS.map((r) => r.id);
    const elements = roomIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveRoom(entry.target.id);
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
      {/* 1. DESKTOP & TABLET FIXED FLOOR-PLAN WIDGET (≥640px) (§9.3.5) */}
      <nav
        aria-label="Rooms floor plan"
        className="hidden sm:block fixed bottom-6 right-6 z-40 select-none group"
      >
        <div className="bg-concrete/95 backdrop-blur-sm border border-ink p-3 shadow-sm relative">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-ink-2/20 text-[10px] font-archivo uppercase tracking-wider text-ink-2">
            <span>Floor Plan // Wing</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="text-ink hover:text-brass underline underline-offset-2"
              aria-label={`Switch to ${alternateLabel}`}
            >
              {alternateLabel}
            </button>
          </div>

          {/* SVG Floor Plan Drawing (160x100) */}
          <div className="relative pt-2">
            <svg
              viewBox="0 0 160 100"
              className="w-32 h-20 lg:w-40 lg:h-24 stroke-ink fill-none"
              aria-hidden="true"
            >
              {/* Central Gallery Corridor */}
              <rect
                x="8"
                y="45"
                width="144"
                height="10"
                strokeWidth="1"
                className="stroke-ink/40 fill-concrete"
              />

              {/* Six Room Boxes */}
              {WING_ROOMS.map((room, idx) => {
                const isCurrent = activeRoom === room.id;
                const isHovered = hoveredRoom === room.id;

                return (
                  <g key={room.id}>
                    <rect
                      x={room.x}
                      y={room.y}
                      width={room.w}
                      height={room.h}
                      strokeWidth={isCurrent ? "2" : "1"}
                      style={{
                        animationDelay: `${idx * 80}ms`,
                      }}
                      className={`transition-colors duration-200 ${
                        shouldAnimate ? "animate-room-draw" : ""
                      } ${
                        isCurrent
                          ? "fill-brass stroke-ink"
                          : isHovered
                          ? "fill-concrete stroke-brass"
                          : "fill-concrete stroke-ink"
                      }`}
                    />
                    <text
                      x={room.x + room.w / 2}
                      y={room.y + room.h / 2 + 3}
                      textAnchor="middle"
                      className={`text-[8px] font-archivo font-bold select-none pointer-events-none ${
                        isCurrent ? "fill-white dark:fill-zinc-950" : "fill-ink"
                      }`}
                    >
                      {room.number}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Clickable Overlay Links with min hit area ≥32x32px */}
            <div className="absolute inset-x-0 bottom-0 top-2 grid grid-cols-3 grid-rows-2 gap-1 pointer-events-auto">
              {WING_ROOMS.map((room) => {
                const isCurrent = activeRoom === room.id;

                return (
                  <a
                    key={room.id}
                    href={`#${room.id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    aria-label={`Go to Room ${room.number}: ${room.name}`}
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onFocus={() => setHoveredRoom(room.id)}
                    onBlur={() => setHoveredRoom(null)}
                    className="w-full h-full block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
                  />
                );
              })}
            </div>
          </div>

          {/* Room Label indicator on hover/focus */}
          <div className="pt-2 text-center text-xs font-archivo text-ink font-semibold tracking-wide">
            {hoveredRoom
              ? WING_ROOMS.find((r) => r.id === hoveredRoom)?.name
              : WING_ROOMS.find((r) => r.id === activeRoom)?.name}
          </div>
        </div>
      </nav>

      {/* 2. MOBILE FIXED BOTTOM "DIRECTORY" BUTTON (<640px) (§9.3.5) */}
      <nav
        aria-label="Mobile directory navigation"
        className="sm:hidden fixed bottom-[calc(12px+env(safe-area-inset-bottom))] right-4 z-40 select-none"
      >
        <button
          ref={openButtonRef}
          type="button"
          onClick={openDialog}
          aria-haspopup="dialog"
          aria-label="Open building directory"
          className="wing-btn bg-concrete border border-ink text-ink font-archivo text-xs uppercase tracking-wider px-5 py-3 shadow-sm min-h-[48px] flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-brass" aria-hidden="true" />
          <span>Directory</span>
        </button>
      </nav>

      {/* 3. MOBILE NATIVE <dialog> ROOM DIRECTORY BOARD (§9.3.5, §9.3.13) */}
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        aria-labelledby="directory-board-title"
        className="fixed inset-0 m-0 w-full h-full max-w-full max-h-full bg-concrete text-ink p-6 backdrop:bg-black/60 z-50 overflow-y-auto"
      >
        <div className="max-w-md mx-auto flex flex-col justify-between min-h-full">
          <div>
            {/* Directory Board Header */}
            <div className="flex items-center justify-between border-b-2 border-ink pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-ink-2 font-mono block">
                  Building Directory // Wing
                </span>
                <h2 id="directory-board-title" className="font-archivo text-2xl font-bold uppercase">
                  Wayfinding Board
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close directory board"
                className="text-sm font-medium tracking-wide underline underline-offset-4 text-ink py-2 px-2"
              >
                Close
              </button>
            </div>

            {/* List of 6 Rooms with Brass Active Bar */}
            <nav aria-label="Room directory list" className="divide-y divide-ink-2/20 border-y border-ink">
              {WING_ROOMS.map((room) => {
                const isCurrent = activeRoom === room.id;

                return (
                  <a
                    key={room.id}
                    href={`#${room.id}`}
                    onClick={closeDialog}
                    aria-current={isCurrent ? "location" : undefined}
                    className={`flex items-center justify-between py-4 px-3 min-h-[48px] transition-colors relative ${
                      isCurrent ? "bg-ink/5 font-bold" : "hover:bg-ink/5"
                    }`}
                  >
                    {isCurrent && (
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 bg-brass"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-center gap-3">
                      <span className="font-archivo text-xs font-bold text-brass">
                        Room {room.number}
                      </span>
                      <span className="font-archivo text-base text-ink uppercase">
                        {room.name}
                      </span>
                    </div>
                    <span className="text-xs text-ink-2 font-mono">
                      Level 1
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Directory Footer */}
          <div className="pt-6 border-t border-ink-2/20 flex items-center justify-between text-xs text-ink-2">
            <span>Zendrix Riva Wing</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="underline underline-offset-4 text-ink font-archivo uppercase"
            >
              {alternateLabel}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
