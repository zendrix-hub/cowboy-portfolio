"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { social } from "@/data/social";
import SidebarNav from "@/components/layout/SidebarNav";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  Mail,
  Terminal,
  FileText,
  ArrowUpRight,
  Download,
  MapPin,
  Check,
  Zap,
  Info,
  ChevronDown,
  GraduationCap,
  X,
  Sparkles,
  Search,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { useSectionFocus } from "@/context/SectionFocusContext";

const CORE_TAGS = [
  "Kotlin",
  "Jetpack Compose",
  "Spring Boot",
  "Next.js",
  "Python",
  "PostgreSQL",
];

export default function Sidebar() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { activeSection } = useSectionFocus();
  const isAboutActive = activeSection === "about";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${social.email}`;
    }
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsInfoOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsInfoOpen(false);
    }, 240);
  };

  const handleToggle = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsInfoOpen((prev) => !prev);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsInfoOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsInfoOpen(false);
      }
    };

    if (isInfoOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isInfoOpen]);

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Top Profile & Intro */}
      <div className="space-y-4">
        <FadeIn>
          <div
            className={`transition-all duration-500 ease-out ${
              isAboutActive
                ? "opacity-100 filter-none"
                : "opacity-85 blur-[0.2px] hover:opacity-100 hover:blur-none"
            }`}
          >
            {/* Top Bar: Avatar + ThemeToggle */}
            <div className="flex items-center justify-between gap-3 mb-3.5">
              <div
                className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-950/25 bg-gradient-to-br from-cyan-100/80 via-zinc-100 to-zinc-200 dark:from-cyan-950/80 dark:via-zinc-900 dark:to-zinc-950 flex-shrink-0 group cursor-pointer transition-transform hover:scale-105"
                onClick={handleToggle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title="Hover or click to view quick info"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle();
                  }
                }}
              >
                <Image
                  src="/images/avatar.webp"
                  alt="Zendrix Riva"
                  width={72}
                  height={72}
                  sizes="72px"
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRvQAAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHkAAAABgFvbtqrq4g6hO5ThkjOogEEIFbjETgEU4KG1QObuHUhof397UkJETABhV5RupmpqOnUA2FupDM8/6FGF8e+YSvX6p0HlwL9TKk7xzz1ORaQPAAlCdwIgSMf5BWAk+o8b6r/x9xQTEUI8E9C8RojuBvrRAhhul0wAAFZQOCBUAAAAMAIAnQEqEAAQAAVAfCWMAA+KLxmPYg67/YAA/p777XzraEQOIzcoUyN21KkqBBr7Z59NfvgQecL9GN8VytJeNZu1wyGkYdOki1X6ArJYuNjNAAAA"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>

              {/* Theme Toggle placed at Top Right */}
              <div className="shrink-0">
                <ThemeToggle />
              </div>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              <a
                href="#"
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
              >
                {social.displayName}
              </a>
            </h1>

            {/* Role Title */}
            <h2 className="mt-1 text-base sm:text-lg font-medium text-cyan-700 dark:text-cyan-300">
              {social.role}
            </h2>

            {/* Interactive Status Badge with Hover/Tap Info Card Trigger */}
            <div
              ref={popoverRef}
              className="relative inline-block mt-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleToggle}
                aria-expanded={isInfoOpen}
                aria-haspopup="dialog"
                className="group/badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-cyan-50/90 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 border border-cyan-300/80 dark:border-cyan-700/60 shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Intern @ NEC Telecom (GDC)</span>
                <span className="inline-flex items-center gap-1 pl-1.5 ml-1 border-l border-cyan-300/60 dark:border-cyan-700/60 text-[11px] text-cyan-600 dark:text-cyan-400 group-hover/badge:text-cyan-900 dark:group-hover/badge:text-cyan-100 font-sans font-medium">
                  <Info className="w-3 h-3" />
                  <span>Bio</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isInfoOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              {/* Floating Hover Card Popover */}
              {isInfoOpen && (
                <div
                  role="dialog"
                  aria-label="Developer quick info and focus"
                  className="absolute top-full left-0 mt-2.5 w-80 sm:w-96 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/30 dark:shadow-black/70 z-50 transition-all duration-200 animate-in fade-in zoom-in-95"
                >
                  {/* Glowing Cyan Accent Line */}
                  <div className="absolute -top-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                  {/* Header with Title and Dismiss */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200/80 dark:border-zinc-800/80">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                      <span>About &amp; Focus</span>
                    </div>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setIsInfoOpen(false)}
                      className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      aria-label="Close info"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-3 space-y-3 text-xs">
                    {/* Bio Paragraph */}
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                      I build practical software systems, think carefully about architecture, and choose technology based on the problem rather than chasing trends.
                    </p>

                    {/* Education & Location */}
                    <div className="space-y-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>CIT-U Cebu • BSIT 4th Year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>Cebu, Philippines <span className="opacity-60">(UTC+8)</span></span>
                      </div>
                    </div>

                    {/* Current Focus Card */}
                    <div className="p-2.5 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200/70 dark:border-cyan-800/60">
                      <div className="flex items-center gap-1.5 font-mono font-semibold text-cyan-800 dark:text-cyan-200">
                        <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 fill-cyan-500/20" />
                        <span>Current Focus</span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">
                        Offline-First Android Architectures &amp; Edge Speech Recognition (ASR)
                      </p>
                    </div>

                    {/* Core Tech Stack */}
                    <div className="pt-1">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 mb-2">
                        <Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        <span>Core Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {CORE_TAGS.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resume & CV Action */}
            <div className="pt-3.5 flex items-center gap-2 max-w-xs">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-xs font-semibold shadow-md shadow-cyan-950/20 hover:shadow-cyan-500/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
                <ArrowUpRight className="w-3 h-3 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/resume.pdf"
                download="RIVA_ZendrixB_BSIT_Resume.pdf"
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
                title="Download Resume (PDF)"
                aria-label="Download Resume (PDF)"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Command Palette Button */}
            <div className="pt-2.5 max-w-xs">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 group"
                title="Open Command Palette (Cmd+K)"
              >
                <span className="flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Command Palette</span>
                </span>
                <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:border-cyan-500/40">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Side Section Navigation (visible on lg+) */}
        <FadeIn delay={0.2}>
          <div className="pt-4 sm:pt-6">
            <SidebarNav />
          </div>
        </FadeIn>
      </div>

      {/* Bottom Social Shortcuts */}
      <FadeIn delay={0.3} direction="up">
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
            aria-label="GitHub profile"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
            aria-label="LinkedIn profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Copy Email Button with instant feedback */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={handleCopyEmail}
            className="relative p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm group"
            aria-label={copiedEmail ? "Email copied to clipboard" : `Copy email address (${social.email})`}
            title={copiedEmail ? "Copied!" : `Copy email: ${social.email}`}
          >
            {copiedEmail ? (
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Mail className="w-4 h-4" />
            )}

            {copiedEmail && (
              <span
                role="status"
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] font-mono whitespace-nowrap shadow-lg pointer-events-none"
              >
                Copied!
              </span>
            )}
          </button>
        </div>
      </FadeIn>
    </div>
  );
}
