import React from "react";
import CurrentShell from "@/components/current/CurrentShell";
import DepthGauge from "@/components/current/DepthGauge";
import CurrentLine from "@/components/current/CurrentLine";
import CurrentHero from "@/components/current/CurrentHero";
import CurrentAbout from "@/components/current/CurrentAbout";
import CurrentProjects from "@/components/current/CurrentProjects";
import CurrentSkills from "@/components/current/CurrentSkills";
import CurrentExperience from "@/components/current/CurrentExperience";
import CurrentContact from "@/components/current/CurrentContact";

export default function Home() {
  return (
    <CurrentShell>
      {/* Fixed Section Navigation & Milestones */}
      <DepthGauge />

      {/* The Scroll-Drawn Continuous Line */}
      <CurrentLine />

      {/* Main Content Sections */}
      {/* No z-index here: <main> must not form its own layer, or the opaque
          zone backgrounds would cover the drawn line (z-[1]). Section content
          sits above the line through each section's inner z-10 container. */}
      <main id="content" className="relative w-full flex flex-col">
        {/* Section 1: Hero Profile */}
        <CurrentHero />

        {/* Section 2: Professional Background */}
        <CurrentAbout />

        {/* Section 3: Featured Projects */}
        <CurrentProjects />

        {/* Section 4: Technical Skills */}
        <CurrentSkills />

        {/* Section 5: Experience & Education */}
        <CurrentExperience />

        {/* Section 6: Contact & Inquiries */}
        <CurrentContact />
      </main>
    </CurrentShell>
  );
}
