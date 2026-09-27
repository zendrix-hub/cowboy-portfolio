import { MarginaliaHero } from "@/components/marginalia/MarginaliaHero";
import { MarginaliaAbout } from "@/components/marginalia/MarginaliaAbout";
import { MarginaliaProjects } from "@/components/marginalia/MarginaliaProjects";
import { MarginaliaSkills } from "@/components/marginalia/MarginaliaSkills";
import { MarginaliaExperience } from "@/components/marginalia/MarginaliaExperience";
import { MarginaliaContact } from "@/components/marginalia/MarginaliaContact";

export default function Home() {
  return (
    <main id="content" className="pt-8 sm:pt-14 pb-28 sm:pb-36 relative">
      <MarginaliaHero />
      <MarginaliaAbout />
      <MarginaliaProjects />
      <MarginaliaSkills />
      <MarginaliaExperience />
      <MarginaliaContact />
    </main>
  );
}
