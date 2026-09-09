"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SectionFocusContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const SectionFocusContext = createContext<SectionFocusContextType>({
  activeSection: "about",
  setActiveSection: () => {},
});

const SECTION_IDS = ["prologue", "about", "projects", "skills", "experience", "contact"];

export function SectionFocusProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const sectionElements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Sort in DOM order and choose the uppermost intersecting section
          const sorted = intersecting.sort((a, b) => {
            const aIdx = SECTION_IDS.indexOf(a.target.id);
            const bIdx = SECTION_IDS.indexOf(b.target.id);
            return aIdx - bIdx;
          });
          setActiveSection(sorted[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <SectionFocusContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionFocusContext.Provider>
  );
}

export function useSectionFocus() {
  return useContext(SectionFocusContext);
}
