"use client";

import { useStoryMode } from "@/components/story/StoryModeContext";
import { BookOpen, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryModeToggleProps {
  className?: string;
  variant?: "compact" | "full";
}

export default function StoryModeToggle({
  className,
  variant = "full",
}: StoryModeToggleProps) {
  const { mode, setMode } = useStoryMode();

  return (
    <div
      role="radiogroup"
      aria-label="Experience Mode Switcher"
      className={cn(
        "inline-flex items-center p-1 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-md shadow-sm transition-all",
        className
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === "story"}
        onClick={() => setMode("story")}
        className={cn(
          "flex items-center gap-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
          variant === "compact" ? "px-2.5 py-1" : "px-3.5 py-1.5",
          mode === "story"
            ? "bg-white dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 shadow-sm border border-cyan-300/80 dark:border-cyan-700/60 font-semibold"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200"
        )}
        title="Switch to narrative Story Odyssey mode"
      >
        <BookOpen
          className={cn(
            "text-cyan-600 dark:text-cyan-400 shrink-0",
            variant === "compact" ? "w-3 h-3" : "w-3.5 h-3.5"
          )}
        />
        <span>{variant === "compact" ? "Story" : "Story Odyssey"}</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === "spec"}
        onClick={() => setMode("spec")}
        className={cn(
          "flex items-center gap-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
          variant === "compact" ? "px-2.5 py-1" : "px-3.5 py-1.5",
          mode === "spec"
            ? "bg-white dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 shadow-sm border border-cyan-300/80 dark:border-cyan-700/60 font-semibold"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200"
        )}
        title="Switch to direct Recruiter Spec mode"
      >
        <Zap
          className={cn(
            "text-amber-500 shrink-0",
            variant === "compact" ? "w-3 h-3" : "w-3.5 h-3.5"
          )}
        />
        <span>{variant === "compact" ? "Spec" : "Recruiter Spec"}</span>
      </button>
    </div>
  );
}
