"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, FileText, ArrowUpRight, Download, Search } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { social } from "@/data/social";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo with Small Portrait Avatar */}
          <Link
            href="#"
            className="group flex items-center space-x-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-500/50 bg-gradient-to-b from-cyan-100 to-zinc-200 dark:from-cyan-950 dark:to-zinc-900 flex-shrink-0">
              <Image
                src="/images/avatar.webp"
                alt="Zendrix Riva"
                width={28}
                height={28}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {social.displayName}
            </span>
          </Link>

          {/* Socials, Resume, Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/60 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-colors"
              aria-label="View Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Open command palette (Cmd+K)"
              title="Command Palette (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <ThemeToggle />

            {/* Mobile menu toggle */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="block px-3 py-2 text-base font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-md transition-colors font-mono"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex-1 inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 transition-colors shadow-sm"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>View Resume (PDF)</span>
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="/resume.pdf"
              download="RIVA_ZendrixB_BSIT_Resume.pdf"
              className="p-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 transition-colors"
              title="Download Resume PDF"
              aria-label="Download Resume PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

