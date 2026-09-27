import { StarHero } from "@/components/starchart/StarHero";
import { StarAbout } from "@/components/starchart/StarAbout";
import { StarProjects } from "@/components/starchart/StarProjects";
import { StarSkills } from "@/components/starchart/StarSkills";
import { StarExperience } from "@/components/starchart/StarExperience";
import { StarContact } from "@/components/starchart/StarContact";

export default function Home() {
  return (
    <main id="content" className="relative space-y-20 sm:space-y-32 pb-24">
      <StarHero />
      <StarAbout />
      <StarProjects />
      <StarSkills />
      <StarExperience />
      <StarContact />
    </main>
  );
}
