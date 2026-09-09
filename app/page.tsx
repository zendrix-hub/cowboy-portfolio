import { Suspense } from "react";
import CosmicNav from "@/components/layout/CosmicNav";
import CosmicHero from "@/components/sections/CosmicHero";
import EpochZeroPrologue from "@/components/story/EpochZeroPrologue";
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
import { StoryModeProvider } from "@/components/story/StoryModeContext";

export default function Home() {
  return (
    <SectionFocusProvider>
      <ConstellationProvider>
        <StoryModeProvider>
          {/* Floating Astrogation Telemetry Glass HUD */}
          <CosmicNav />

        {/* Ambient Pointer Glow (will be accompanied by ConstellationCanvas in Milestone 2) */}
        <SpotlightGlow />

        {/* Cinematic Single-Column Cosmic Flow */}
        <div className="mx-auto min-h-screen max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Origin Singularity Hero */}
          <CosmicHero />

          {/* Sequential Celestial Workstation & Constellation Stations */}
          <main id="content" className="space-y-24 sm:space-y-32 pb-24">
            {/* Epoch 0: The Little Cowboy Prologue Terminal */}
            <FocusableSection id="prologue">
              <EpochZeroPrologue />
            </FocusableSection>

            <FocusableSection id="about">
              <About />
            </FocusableSection>

            <FocusableSection id="projects">
              <Suspense
                fallback={
                  <div className="min-h-[300px] animate-pulse rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/40" />
                }
              >
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
        </StoryModeProvider>
      </ConstellationProvider>
    </SectionFocusProvider>
  );
}
