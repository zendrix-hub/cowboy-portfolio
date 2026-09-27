import { WingHero } from "@/components/wing/WingHero";
import { WingAbout } from "@/components/wing/WingAbout";
import { WingProjects } from "@/components/wing/WingProjects";
import { WingSkills } from "@/components/wing/WingSkills";
import { WingExperience } from "@/components/wing/WingExperience";
import { WingContact } from "@/components/wing/WingContact";

export default function Home() {
  return (
    <main id="content" className="relative space-y-24 sm:space-y-36 pb-24">
      <WingHero />
      <WingAbout />
      <WingProjects />
      <WingSkills />
      <WingExperience />
      <WingContact />
    </main>
  );
}
