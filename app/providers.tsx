"use client";

import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConstellationProvider } from "@/context/ConstellationContext";
import { StoryModeProvider } from "@/components/story/StoryModeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <ConstellationProvider>
          <StoryModeProvider>{children}</StoryModeProvider>
        </ConstellationProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
