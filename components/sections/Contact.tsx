"use client";

import { useState } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import { social } from "@/data/social";
import { Mail, Check, Copy, ExternalLink, CheckCircle2, FileText, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { AnimatedItem } from "@/components/ui/StaggerChildren";
import ContactForm from "@/components/sections/ContactForm";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 lg:scroll-mt-24 space-y-6 relative">
      {/* ReadHub Login-style Floating Pill Toast */}
      {copied && (
        <div
          role="status"
          className="toast-slide-down fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-cyan-500/60 shadow-2xl shadow-cyan-950/30 backdrop-blur-md transition-all"
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-mono font-medium">
            Email copied to clipboard: <strong className="text-cyan-600 dark:text-cyan-400">{social.email}</strong>
          </span>
        </div>
      )}

      <FadeIn>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Connect"
          description="Currently undergoing my 500-hour Software Engineering Internship at NEC Telecom Software Philippines (Global Delivery Center). Open to discussing engineering opportunities, collaborative projects, or technical topics."
        />
      </FadeIn>

      {/* Interactive Server Action Contact Form */}
      <FadeIn delay={0.05}>
        <ContactForm />
      </FadeIn>

      {/* Direct Communication Channels */}
      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Email Direct Contact Card */}
        <AnimatedItem>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 border border-cyan-100 dark:border-cyan-900/60">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Direct Email
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-mono truncate">
                {social.email}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`mailto:${social.email}`}
                className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span>Email</span>
              </a>

              <button
                type="button"
                suppressHydrationWarning
                onClick={copyEmail}
                className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-label="Copy email address"
                title="Copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </AnimatedItem>

        {/* Resume / CV Card */}
        <AnimatedItem>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 border border-cyan-100 dark:border-cyan-900/60">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Resume / CV
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-mono truncate">
                PDF Document (CIT-U BSIT)
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm"
              >
                <span>View Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/resume.pdf"
                download="RIVA_ZendrixB_BSIT_Resume.pdf"
                className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                title="Download Resume PDF"
                aria-label="Download Resume PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedItem>

        {/* GitHub Profile Card */}
        <AnimatedItem>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-3 border border-zinc-200/60 dark:border-zinc-700/60">
                <GithubIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                GitHub
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-mono">
                @zendrix-hub
              </p>
            </div>

            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:white bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <span>Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </AnimatedItem>

        {/* LinkedIn Profile Card */}
        <AnimatedItem>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3 border border-sky-100 dark:border-sky-900/60">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                LinkedIn
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-mono truncate">
                in/zendrix-riva
              </p>
            </div>

            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:white bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <span>Connect</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </AnimatedItem>
      </StaggerChildren>
    </section>
  );
}
