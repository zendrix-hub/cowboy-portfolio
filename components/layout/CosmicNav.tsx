"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { social } from "@/data/social";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { useSectionFocus } from "@/context/SectionFocusContext";
import { useConstellation } from "@/context/ConstellationContext";
import {
  FileText,
  Search,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SECTORS = [
  { id: "about", label: "Origin", icon: "✦" },
  { id: "projects", label: "Projects", icon: "⬡" },
  { id: "skills", label: "Skills", icon: "◈" },
  { id: "experience", label: "Experience", icon: "❖" },
  { id: "contact", label: "Contact", icon: "✉" },
];

export default function CosmicNav() {
  const { activeSection, setActiveSection } = useSectionFocus();
  const { setHoveredNodeId } = useConstellation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectorClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300"
      >
        <nav
          aria-label="Cosmic Telemetry Navigation"
          className={cn(
            "pointer-events-auto w-full max-w-4xl flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full",
            "bg-white/85 dark:bg-zinc-950/80 backdrop-blur-xl border transition-all duration-300",
            scrolled
              ? "border-cyan-500/40 shadow-xl shadow-cyan-950/20 dark:shadow-black/60 scale-[0.99]"
              : "border-zinc-200/80 dark:border-zinc-800/90 shadow-md shadow-zinc-950/5"
          )}
        >
          {/* Left: Origin Star Mini Brand */}
          <Link
            href="#about"
            onClick={() => handleSectorClick("about")}
            onMouseEnter={() => setHoveredNodeId("origin-avatar")}
            onMouseLeave={() => setHoveredNodeId(null)}
            className="flex items-center gap-2 sm:gap-2.5 rounded-full p-0.5 sm:pr-3 hover:bg-zinc-100 dark:hover:bg-zinc-900/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            title="Return to Origin (About)"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-500/60 shadow-sm shadow-cyan-950/30 flex-shrink-0">
              <Image
                src="/images/avatar.webp"
                alt="Zendrix Riva"
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
                priority
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-cyan-400 ring-1 ring-zinc-950" />
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                <span>{social.displayName}</span>
                <Sparkles className="w-2.5 h-2.5 text-cyan-500" />
              </span>
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 leading-none">
                Origin Core
              </span>
            </div>
          </Link>

          {/* Center: Sector Navigation Pills (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
            {SECTORS.map((sector) => {
              const isActive = activeSection === sector.id;
              return (
                <a
                  key={sector.id}
                  href={`#${sector.id}`}
                  onClick={() => handleSectorClick(sector.id)}
                  className={cn(
                    "relative px-3 py-1 text-xs font-mono font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                    isActive
                      ? "bg-white dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 font-semibold shadow-sm border border-cyan-300/70 dark:border-cyan-700/60"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <span className={cn("text-[10px]", isActive ? "text-cyan-500" : "opacity-60")}>
                    {sector.icon}
                  </span>
                  <span>{sector.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Telemetry Actions & Utilities */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              title="Command Palette (Cmd+K)"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[9px] rounded bg-zinc-200/70 dark:bg-zinc-800 border border-zinc-300/70 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Social Shortcuts (Visible on lg+) */}
            <div className="hidden lg:flex items-center gap-0.5 pl-1 border-l border-zinc-200/60 dark:border-zinc-800/60">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200/80 dark:border-cyan-800/60 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              title="View Resume PDF"
            >
              <FileText className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Resume</span>
              <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />
            </a>

            {/* Theme Toggle */}
            <div className="pl-0.5">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle (Below md) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-1.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation"
          className="fixed inset-x-3 top-16 z-40 md:hidden p-4 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 space-y-2 animate-in fade-in zoom-in-95"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold px-2 pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
            Celestial Sectors
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {SECTORS.map((sector) => {
              const isActive = activeSection === sector.id;
              return (
                <a
                  key={sector.id}
                  href={`#${sector.id}`}
                  onClick={() => handleSectorClick(sector.id)}
                  className={cn(
                    "p-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all",
                    isActive
                      ? "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-300/80 dark:border-cyan-700/60 shadow-sm"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent"
                  )}
                >
                  <span className="text-cyan-500">{sector.icon}</span>
                  <span>{sector.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href="/resume.pdf"
              download="RIVA_ZendrixB_BSIT_Resume.pdf"
              className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}
    </>
  );
}
