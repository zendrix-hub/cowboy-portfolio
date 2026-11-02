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
      {/* Fixed Depth Gauge Navigation with Tributary Waypoints (§6.3.5) */}
      <DepthGauge />

      {/* The Scroll-Drawn Continuous Line & Hydrodynamic Pulse (§6.3.12) */}
      <CurrentLine />

      {/* Main Content Landmarks & 6 Hydrological Zones (§4.1, §6.3.2, §11.2) */}
      <main id="content" className="relative z-10 w-full flex flex-col">
        {/* Zone 1: Surface / Headwaters (Hero • 0m) */}
        <CurrentHero />

        {/* Zone 2: Sunlit / Upper Rapids (About • 120m) */}
        <CurrentAbout />

        {/* Zone 3: River Basin & Adaptive Project Tributaries (Projects • 250m–550m) */}
        <CurrentProjects />

        {/* Zone 4: Riverbed Strata (Skills • 650m) */}
        <CurrentSkills />

        {/* Zone 5: Historical Meander (Experience • 750m) */}
        <CurrentExperience />

        {/* Zone 6: Ocean Outfall & Abyss (Contact • 850m) */}
        <CurrentContact />
      </main>
    </CurrentShell>
  );
}
