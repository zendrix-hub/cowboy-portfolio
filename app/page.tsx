import { MastheadHero } from "@/components/masthead/MastheadHero";
import { MastheadAbout } from "@/components/masthead/MastheadAbout";
import { MastheadProjects } from "@/components/masthead/MastheadProjects";
import { MastheadSkills } from "@/components/masthead/MastheadSkills";
import { MastheadExperience } from "@/components/masthead/MastheadExperience";
import { MastheadContact } from "@/components/masthead/MastheadContact";

export default function Home() {
  return (
    <main id="content" className="relative">
      <MastheadHero />
      <MastheadAbout />
      <MastheadProjects />
      <MastheadSkills />
      <MastheadExperience />
      <MastheadContact />
    </main>
  );
}
