"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={toggleTheme}
      className="relative p-2 rounded-xl text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none shadow-sm"
      aria-label="Toggle theme"
      title="Toggle color theme"
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {mounted ? (
          theme === "dark" ? (
            <Sun className="w-4 h-4 text-cyan-400 transition-transform duration-200 hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-600 transition-transform duration-200 hover:-rotate-12" />
          )
        ) : (
          <span className="w-4 h-4 block" aria-hidden="true" />
        )}
      </div>
    </button>
  );
}
