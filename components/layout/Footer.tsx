import { social } from "@/data/social";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-12 pb-16 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">
            {social.displayName}
          </p>
          <p className="text-[11px] text-zinc-500">
            {social.role}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${social.email}`}
            className="p-1.5 rounded-md hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="Send email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900 text-[11px] font-mono">
        <p>
          &copy; {currentYear} {social.displayName}. All rights reserved.
        </p>
        <p className="text-zinc-400 dark:text-zinc-500">
          Designed with disciplined minimalism. Built with Next.js, TypeScript & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
