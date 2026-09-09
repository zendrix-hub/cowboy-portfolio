"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  Search,
  FileText,
  Download,
  Mail,
  Sun,
  Moon,
  Laptop,
  Layers,
  Briefcase,
  Sparkles,
  ExternalLink,
  Check,
  Code2,
  FolderGit2,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { social } from "@/data/social";
import { projects } from "@/data/projects";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, setTheme } = useTheme();

  // Listen for Cmd+K / Ctrl+K and custom trigger events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  const navigateTo = (hash: string) => {
    setOpen(false);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
        setOpen(false);
      }, 1200);
    } catch {
      window.location.href = `mailto:${social.email}`;
      setOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-cyan-950/40 overflow-hidden text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full">
          {/* Top Search Bar */}
          <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 gap-3">
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search systems..."
              className="w-full bg-transparent text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none font-sans"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              aria-label="Close command palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Command Results List */}
          <Command.List className="max-h-[360px] overflow-y-auto p-2 space-y-1.5 focus:outline-none">
            <Command.Empty className="py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">
              No matching systems or commands found.
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group
              heading="Actions"
              className="px-2 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 [&_[cmdk-group-items]]:space-y-1"
            >
              <Command.Item
                onSelect={handleCopyEmail}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Copy Email Address ({social.email})</span>
                </div>
                {copiedEmail ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-500 font-mono">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500">
                    ↵
                  </kbd>
                )}
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("/resume.pdf", "_blank");
                  setOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>View Resume (PDF)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "RIVA_ZendrixB_BSIT_Resume.pdf";
                  link.click();
                  setOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Download Resume (PDF)</span>
                </div>
              </Command.Item>

              <Command.Item
                onSelect={toggleTheme}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-cyan-600" />
                  )}
                  <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
                </div>
              </Command.Item>
            </Command.Group>

            {/* Navigation */}
            <Command.Group
              heading="Sections"
              className="px-2 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 [&_[cmdk-group-items]]:space-y-1"
            >
              {[
                { name: "About Me", href: "#about", icon: Laptop },
                { name: "Featured Projects", href: "#projects", icon: Code2 },
                { name: "Technical Skills", href: "#skills", icon: Layers },
                { name: "Experience & Education", href: "#experience", icon: Briefcase },
                { name: "Contact & Connect", href: "#contact", icon: Sparkles },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.href}
                    onSelect={() => navigateTo(item.href)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                      {item.href}
                    </span>
                  </Command.Item>
                );
              })}
            </Command.Group>

            {/* Direct Projects */}
            <Command.Group
              heading="Engineered Systems"
              className="px-2 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 [&_[cmdk-group-items]]:space-y-1"
            >
              {projects.map((proj) => (
                <Command.Item
                  key={proj.title}
                  onSelect={() => {
                    if (proj.githubUrl) {
                      window.open(proj.githubUrl, "_blank");
                    } else {
                      navigateTo("#projects");
                    }
                    setOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="truncate">{proj.title}</span>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 truncate hidden sm:inline">
                      — {proj.category}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </Command.Item>
              ))}
            </Command.Group>

            {/* Social & Profiles */}
            <Command.Group
              heading="External Profiles"
              className="px-2 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 [&_[cmdk-group-items]]:space-y-1"
            >
              <Command.Item
                onSelect={() => {
                  window.open(social.github, "_blank");
                  setOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub (@zendrix-hub)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open(social.linkedin, "_blank");
                  setOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-700 dark:aria-selected:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn (in/zendrix-riva)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Keyboard Hints */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  ↑↓
                </kbd>{" "}
                Navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  ↵
                </kbd>{" "}
                Select
              </span>
            </div>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Esc
              </kbd>{" "}
              Close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
