import React from 'react';
import { RuntimeHero } from '@/components/runtime/RuntimeHero';
import { RuntimeAbout } from '@/components/runtime/RuntimeAbout';
import { RuntimeProjects } from '@/components/runtime/RuntimeProjects';
import { RuntimeSkills } from '@/components/runtime/RuntimeSkills';
import { RuntimeExperience } from '@/components/runtime/RuntimeExperience';
import { RuntimeContact } from '@/components/runtime/RuntimeContact';
import { ConnectorLine } from '@/components/runtime/ConnectorLine';
import { WiringChannel } from '@/components/runtime/WiringChannel';

export default function Home() {
  return (
    <main
      id="content"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center"
    >
      {/* 1. Hero Start Node */}
      <RuntimeHero />

      {/* Downward Connector from Hero to About */}
      <ConnectorLine height={64} />

      {/* 2. About Input Node */}
      <RuntimeAbout />

      {/* Downward Connector from About to Projects */}
      <ConnectorLine height={64} />

      {/* 3. Projects Modules */}
      <RuntimeProjects />

      {/* Orthogonal Wiring Channel between Projects and Skills */}
      <WiringChannel />

      {/* 4. Skills Component Registry */}
      <RuntimeSkills />

      {/* Downward Connector from Skills to Experience */}
      <ConnectorLine height={64} />

      {/* 5. Experience Process Sequence */}
      <RuntimeExperience />

      {/* Downward Connector from Experience to Contact */}
      <ConnectorLine height={64} />

      {/* 6. Contact End Node */}
      <RuntimeContact />

      {/* Diagram Footer */}
      <footer className="w-full max-w-[720px] text-center pt-8 pb-16 border-t border-[var(--ink)]/15">
        <p className="font-mono text-xs text-[var(--ink-2)] tracking-wider">
          RUNTIME // SYSTEMS_DIAGRAM_SPEC • ZENDRIX RIVA
        </p>
        <p className="font-sans text-[11px] text-[var(--ink-2)]/70 mt-1">
          Designed with Space Mono & Manrope • Zero generic dashboard UI • WCAG 2.2 AA Compliant
        </p>
      </footer>
    </main>
  );
}
