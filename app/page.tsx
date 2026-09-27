import React from 'react';
import { ClearingHero } from '@/components/clearing/ClearingHero';
import { ClearingAbout } from '@/components/clearing/ClearingAbout';
import { ClearingProjects } from '@/components/clearing/ClearingProjects';
import { ClearingSkills } from '@/components/clearing/ClearingSkills';
import { ClearingExperience } from '@/components/clearing/ClearingExperience';
import { ClearingContact } from '@/components/clearing/ClearingContact';

export default function Home() {
  return (
    <main id="content" className="w-full">
      {/* 1. Hero (~30% left position) */}
      <ClearingHero />

      {/* 2. About (~70% right position) */}
      <ClearingAbout />

      {/* 3. Projects (~30% left position) */}
      <ClearingProjects />

      {/* 4. Skills (~70% right position) */}
      <ClearingSkills />

      {/* 5. Experience (~30% left position) */}
      <ClearingExperience />

      {/* 6. Contact (~70% right position) */}
      <ClearingContact />
    </main>
  );
}
