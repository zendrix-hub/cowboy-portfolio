"use client";

import React, { createContext, useContext, useState } from "react";

export type StoryMode = "story" | "spec";

interface StoryModeContextType {
  mode: StoryMode;
  setMode: (mode: StoryMode) => void;
  toggleMode: () => void;
}

const StoryModeContext = createContext<StoryModeContextType>({
  mode: "story",
  setMode: () => {},
  toggleMode: () => {},
});

export function StoryModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<StoryMode>("story");

  const toggleMode = () => {
    setMode((prev) => (prev === "story" ? "spec" : "story"));
  };

  return (
    <StoryModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </StoryModeContext.Provider>
  );
}

export function useStoryMode() {
  return useContext(StoryModeContext);
}
