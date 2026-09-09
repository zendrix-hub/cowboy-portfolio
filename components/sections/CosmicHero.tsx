"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { social } from "@/data/social";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { ConstellationNode } from "@/components/interactive/ConstellationNode";
import FadeIn from "@/components/ui/FadeIn";
import StoryModeToggle from "@/components/story/StoryModeToggle";
import {
  Mail,
  Check,
  FileText,
  ArrowUpRight,
  Download,
  MapPin,
  GraduationCap,
  Sparkles,
  Zap,
  X,
  ChevronDown,
  Info,
  ArrowDown,
  Layers,
} from "lucide-react";

const CORE_TAGS = [
  "Kotlin",
  "Jetpack Compose",
  "Spring Boot",
  "Next.js",
  "Python",
  "PostgreSQL",
];

export default function CosmicHero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsInfoOpen(false);
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
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [isInfoOpen]);

  return (
    <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 text-center sm:text-left overflow-visible">
      {/* Background Radial Core Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[540px] h-72 sm:h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl pointer-events-none -z-10" />

      <FadeIn>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Central Origin Avatar (Core Star Node) */}
          <ConstellationNode
            id="origin-avatar"
            label="Zendrix Riva • Gravitational Core"
            category="origin"
            tier="core"
            connections={[
              "origin-zendrix",
              "pillar-offline",
              "pillar-backend",
              "pillar-ai",
            ]}
            showAnchorPip
            pipPosition="bottom-right"
            className="rounded-3xl shrink-0"
          >
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-cyan-500/60 shadow-2xl shadow-cyan-950/40 bg-gradient-to-br from-cyan-100 via-zinc-100 to-zinc-200 dark:from-cyan-950 dark:via-zinc-900 dark:to-zinc-950 cursor-pointer group transition-transform hover:scale-105"
              onClick={handleToggle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              title="Click or hover to inspect quick info"
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
                width={112}
                height={112}
                sizes="112px"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRvQAAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHkAAAABgFvbtqrq4g6hO5ThkjOogEEIFbjETgEU4KG1QObuHUhof397UkJETABhV5RupmpqOnUA2FupDM8/6FGF8e+YSvX6p0HlwL9TKk7xzz1ORaQPAAlCdwIgSMf5BWAk+o8b6r/x9xQTEUI8E9C8RojuBvrRAhhul0wAAFZQOCBUAAAAMAIAnQEqEAAQAAVAfCWMAA+KLxmPYg67/YAA/p777XzraEQOIzcoUyN21KkqBBr7Z59NfvgQecL9GN8VytJeNZu1wyGkYdOki1X6ArJYuNjNAAAA"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                priority
              />
              {/* Pulsing Core Ring */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-cyan-400/40 pointer-events-none animate-pulse" />
            </div>
          </ConstellationNode>

          {/* Identity Info */}
          <div className="flex-1 space-y-3">
            {/* Status Badge & Popover Trigger */}
            <div
              ref={popoverRef}
              className="relative inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={handleToggle}
                aria-expanded={isInfoOpen}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-cyan-50/90 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 border border-cyan-300/80 dark:border-cyan-700/60 shadow-sm transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Intern @ NEC Telecom (GDC)</span>
                <span className="inline-flex items-center gap-1 pl-1.5 ml-1 border-l border-cyan-300/60 dark:border-cyan-700/60 text-[11px] text-cyan-600 dark:text-cyan-400">
                  <Info className="w-3 h-3" />
                  <span>Bio</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isInfoOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              {/* Popover Card */}
              {isInfoOpen && (
                <div
                  role="dialog"
                  className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2.5 w-80 sm:w-96 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/30 z-50 animate-in fade-in zoom-in-95"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                      <span>About &amp; Focus</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsInfoOpen(false)}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-3 space-y-3 text-xs">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                      I build practical software systems, think carefully about architecture, and choose technology based on the problem rather than chasing trends.
                    </p>
                    <div className="space-y-1 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>CIT-U Cebu • BSIT 4th Year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>Cebu, Philippines (UTC+8)</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200/70 dark:border-cyan-800/60">
                      <div className="flex items-center gap-1.5 font-mono font-semibold text-cyan-800 dark:text-cyan-200">
                        <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Current Focus</span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">
                        Offline-First Android Architectures &amp; Edge Speech Recognition (ASR)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              {social.displayName}
            </h1>

            {/* Role & Tagline */}
            <p className="text-base sm:text-xl font-medium text-cyan-700 dark:text-cyan-300">
              {social.role}
            </p>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal">
              Engineering offline-first Android systems, modular Spring Boot APIs, and grounded AI applications with clean architecture and production discipline.
            </p>

            {/* Core Tech Stack Tags */}
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-1.5">
              {CORE_TAGS.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Experience Mode Switcher (Story Odyssey vs Recruiter Spec) */}
            <div className="pt-3 flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Experience:
              </span>
              <StoryModeToggle variant="full" />
            </div>

            {/* Primary Action Buttons & Socials */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-xs font-semibold shadow-md shadow-cyan-950/20 hover:shadow-cyan-500/25 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Constellations</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="/resume.pdf"
                download="RIVA_ZendrixB_BSIT_Resume.pdf"
                className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors"
                title="Download Resume (PDF)"
                aria-label="Download Resume (PDF)"
              >
                <Download className="w-4 h-4" />
              </a>

              {/* Copy Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="relative inline-flex items-center gap-1.5 p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                {copiedEmail && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-mono whitespace-nowrap shadow">
                    Copied!
                  </span>
                )}
              </button>

              {/* Socials */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-200/80 dark:border-zinc-800">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors"
                  aria-label="GitHub profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
