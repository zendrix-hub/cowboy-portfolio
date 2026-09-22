import React from "react";
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
    <div id="current-page-wrapper" className="relative w-full overflow-x-hidden min-h-screen">
      {/* Fixed Depth Gauge Navigation (§6.3.5) */}
      <DepthGauge />

      {/* The Scroll-Drawn Continuous Line (§6.3.12) */}
      <CurrentLine />

      {/* Main Content Landmarks & 6 Zones (§4.1, §6.3.2, §11.2) */}
      <main id="content" className="relative z-10 w-full flex flex-col">
        {/* Zone 1: Surface (Hero) */}
        <CurrentHero />

        {/* Zone 2: Sunlit (About) */}
        <CurrentAbout />

        {/* Zone 3: Twilight (Projects & Eddy Chamber) */}
        <CurrentProjects />

        {/* Zone 4: Strata (Skills) */}
        <CurrentSkills />

        {/* Zone 5: Waypoints (Experience) */}
        <CurrentExperience />

        {/* Zone 6: Abyss (Contact & Desk Footer) */}
        <CurrentContact />
      </main>
    </div>
  );
}
