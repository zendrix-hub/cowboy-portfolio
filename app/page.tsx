import { AsBuiltNav } from "@/components/asbuilt/AsBuiltNav";
import { AsBuiltHero } from "@/components/asbuilt/AsBuiltHero";
import { AsBuiltAbout } from "@/components/asbuilt/AsBuiltAbout";
import { AsBuiltProjects } from "@/components/asbuilt/AsBuiltProjects";
import { AsBuiltSkills } from "@/components/asbuilt/AsBuiltSkills";
import { AsBuiltExperience } from "@/components/asbuilt/AsBuiltExperience";
import { AsBuiltContact } from "@/components/asbuilt/AsBuiltContact";

export default function Home() {
  return (
    <div className="min-h-screen bg-desk text-ink selection:bg-ink selection:text-sheet">
      <div className="max-w-[1376px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sheet Index Navigation per §6.2.5 */}
          <AsBuiltNav />

          {/* Main Drawing Set Sheets on the Desk per §6.2.2 */}
          <main
            id="content"
            className="flex-1 w-full max-w-[1120px] min-w-0 pb-20 sm:pb-24 lg:pb-28"
          >
            {/* Sheet 1: Cover Sheet */}
            <AsBuiltHero />

            {/* Sheet 2: About Sheet */}
            <AsBuiltAbout />

            {/* Sheet 3: Projects Sheet (Detail Block & Schedule) */}
            <AsBuiltProjects />

            {/* Sheet 4: Skills Sheet (Matrix & Schedule Fallback) */}
            <AsBuiltSkills />

            {/* Sheet 5: Experience Sheet (Revision History) */}
            <AsBuiltExperience />

            {/* Sheet 6: Contact Sheet (Transmittal & Desk Footer) */}
            <AsBuiltContact />
          </main>

        </div>
      </div>
    </div>
  );
}
