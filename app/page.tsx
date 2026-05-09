import { HeroSection } from "@/components/sections/HeroSection";
import { ForWhomSection } from "@/components/sections/ForWhomSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="antialiased">
      <HeroSection />
      <ForWhomSection />
      <StatsSection />
      <ProcessSection />
      <TechStackSection />
      <WhyUsSection />
      <CtaSection />
    </main>
  );
}
