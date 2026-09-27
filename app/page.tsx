import React from 'react';
import { SlateHero } from '@/components/slate/SlateHero';
import { SlateAbout } from '@/components/slate/SlateAbout';
import { SlateProjects } from '@/components/slate/SlateProjects';
import { SlateSkills } from '@/components/slate/SlateSkills';
import { SlateExperience } from '@/components/slate/SlateExperience';
import { SlateContact } from '@/components/slate/SlateContact';

export default function Home() {
  return (
    <main id="content" className="w-full">
      {/* Shot 1: Scene 01 Title Card */}
      <SlateHero />

      {/* Shot 2: Scene 02 Treatment / About */}
      <SlateAbout />

      {/* Shot 3: Scene 03 The Reel (DaloyAqua & Contact Sheet Stills) */}
      <SlateProjects />

      {/* Shot 4: Scene 04 Technical Crew List */}
      <SlateSkills />

      {/* Shot 5: Scene 05 Production Takes Timeline */}
      <SlateExperience />

      {/* Shot 6: Scene 06 The End Card */}
      <SlateContact />
    </main>
  );
}
