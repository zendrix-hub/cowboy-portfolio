"use client";

import React from "react";
import { useSectionFocus } from "@/context/SectionFocusContext";

interface FocusableSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * FocusableSection
 * Gives the currently active section crisp 100% focus and luminescence,
 * while non-active sections softly fade and blur into the background.
 * Hovering or keyboard focusing (Tab) instantly restores full clarity.
 * Clicking an inactive section smoothly scrolls it into view.
 */
export default function FocusableSection({
  id,
  children,
  className = "",
}: FocusableSectionProps) {
  const { activeSection, setActiveSection } = useSectionFocus();
  const isFocused = activeSection === id;

  const handleClick = () => {
    if (!isFocused) {
      setActiveSection(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:filter-none ${
        isFocused
          ? "opacity-100 filter-none"
          : "opacity-35 blur-[1.5px] hover:opacity-100 hover:blur-none focus-within:opacity-100 focus-within:blur-none cursor-pointer"
      } ${className}`}
    >
      {children}
    </div>
  );
}
