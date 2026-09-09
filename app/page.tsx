import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import SpotlightGlow from "@/components/ui/SpotlightGlow";
import FocusableSection from "@/components/ui/FocusableSection";
import { SectionFocusProvider } from "@/context/SectionFocusContext";
import { ConstellationProvider } from "@/context/ConstellationContext";

export default function Home() {
  return (
    <SectionFocusProvider>
      <ConstellationProvider>
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-0 relative">
        {/* Interactive Ambient Spotlight Glow (Desktop Pointer) */}
        <SpotlightGlow />

        <div className="lg:flex lg:justify-between lg:gap-14">
          {/* Left Column: Fixed / Sticky on desktop with Profile & Section Navigation (z-20 keeps sidebar above ambient light) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-12 xl:py-16 relative z-20">
            <Sidebar />
          </header>

          {/* Right Column: Scrollable Content Sections */}
          <main
            id="content"
            className="pt-16 lg:w-[52%] lg:py-12 xl:py-16 space-y-20 sm:space-y-28 relative z-10"
          >
            <FocusableSection id="about">
              <About />
            </FocusableSection>

            <FocusableSection id="projects">
              <Suspense fallback={<div className="min-h-[300px] animate-pulse rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/40" />}>
                <Projects />
              </Suspense>
            </FocusableSection>

            <FocusableSection id="skills">
              <Skills />
            </FocusableSection>

            <FocusableSection id="experience">
              <Experience />
            </FocusableSection>

            <FocusableSection id="contact">
              <Contact />
            </FocusableSection>

            <Footer />
          </main>
        </div>
      </div>
    </ConstellationProvider>
  </SectionFocusProvider>
  );
}
