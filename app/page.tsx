import React from 'react';
import { DatumHero } from '@/components/datum/DatumHero';
import { DatumAbout } from '@/components/datum/DatumAbout';
import { DatumProjects } from '@/components/datum/DatumProjects';
import { DatumSkills } from '@/components/datum/DatumSkills';
import { DatumExperience } from '@/components/datum/DatumExperience';
import { DatumContact } from '@/components/datum/DatumContact';
import { ContourEdge } from '@/components/datum/ContourEdge';

export default function Home() {
  return (
    <main id="content" className="w-full overflow-hidden">
      {/* 1. Base Camp: Hero (Low Band) */}
      <DatumHero />

      {/* Orchestrated Moment: First contour draws on load */}
      <ContourEdge
        topColor="var(--low)"
        bottomColor="var(--mid)"
        seed={1}
        isFirstEdge={true}
      />

      {/* 2. Mid Elevation: About (Mid Band) */}
      <DatumAbout />

      {/* Contour boundary into High Elevation */}
      <ContourEdge
        topColor="var(--mid)"
        bottomColor="var(--high)"
        seed={2}
      />

      {/* 3. The Summit Approach: Projects (High Band) */}
      <DatumProjects />

      {/* 4. Equipment & Methods: Skills (High Band) */}
      <DatumSkills />

      {/* Contour boundary into Peak Elevation */}
      <ContourEdge
        topColor="var(--high)"
        bottomColor="var(--peak)"
        seed={3}
      />

      {/* 5. The Route Taken: Experience (Peak Band) */}
      <DatumExperience />

      {/* 6. The Lookout: Contact (Peak Band Summit) */}
      <DatumContact />
    </main>
  );
}
