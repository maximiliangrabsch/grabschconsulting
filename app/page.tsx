import { HeroSection } from "@/components/sections/HeroSection";
import { ForWhomSection } from "@/components/sections/ForWhomSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ModelsSection } from "@/components/sections/ModelsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="antialiased">
      <HeroSection />
      <ForWhomSection />
      <StatsSection />
      <ModelsSection />
      <ProcessSection />
      <TechStackSection />
      <CtaSection />
    </main>
  );
}
