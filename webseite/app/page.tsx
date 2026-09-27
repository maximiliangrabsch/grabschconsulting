import { HeroVideo } from "./HeroVideo";
import { LegalFooter } from "./LegalFooter";
import { ServiceOrbit } from "./ServiceOrbit";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.2)_45%,rgba(5,5,5,0.1)_100%)]" />

      <div className="relative flex flex-1 items-center justify-center px-10 py-16">
        <ServiceOrbit />
      </div>

      <LegalFooter />
    </main>
  );
}
