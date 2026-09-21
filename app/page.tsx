import BiyaheNav from "@/components/biyahe/BiyaheNav";
import BiyaheHero from "@/components/biyahe/BiyaheHero";
import BiyaheAbout from "@/components/biyahe/BiyaheAbout";
import BiyaheProjects from "@/components/biyahe/BiyaheProjects";
import BiyaheSkills from "@/components/biyahe/BiyaheSkills";
import BiyaheExperience from "@/components/biyahe/BiyaheExperience";
import BiyaheContact from "@/components/biyahe/BiyaheContact";
import BiyahePinstripe from "@/components/biyahe/BiyahePinstripe";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B1440]">
      {/* Sticky Primary Route Plates Navigation (§6.1.5) */}
      <BiyaheNav />

      {/* Main Sequential Route Sections (§6.1.2) */}
      <main id="content" className="flex-1 flex flex-col">
        {/* Band 1: Cobalt Hero Board */}
        <BiyaheHero />
        <BiyahePinstripe />

        {/* Band 2: Sun About Board */}
        <BiyaheAbout />
        <BiyahePinstripe />

        {/* Band 3: Chalk Projects Board & Route List */}
        <BiyaheProjects />
        <BiyahePinstripe />

        {/* Band 4: Leaf Skills Band */}
        <BiyaheSkills />
        <BiyahePinstripe />

        {/* Band 5: Sun Experience Road */}
        <BiyaheExperience />
        <BiyahePinstripe />

        {/* Band 6: Signal Contact Band & Final Stop */}
        <BiyaheContact />
      </main>
    </div>
  );
}
