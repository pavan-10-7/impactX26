import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/home/HeroSection";
import { EventSnapshot } from "../components/home/EventSnapshot";
import { AboutSection } from "../components/home/AboutSection";
import { ThemesSection } from "../components/home/ThemesSection";
import { WhyParticipate } from "../components/home/WhyParticipate";
import { TimelineSection } from "../components/home/TimelineSection";
import { RegistrationSection } from "../components/home/RegistrationSection";
import { PrizePoolSection } from "../components/home/PrizePoolSection";
import { SponsorsSection } from "../components/home/SponsorsSection";
import { Footer } from "../components/Footer";
import { StickyRegisterButton } from "../components/home/StickyRegisterButton";

export function Home() {
  return (
    <div className="relative min-h-screen text-foreground bg-transparent">
      <Navbar />
      <StickyRegisterButton />
      <HeroSection />
      <AboutSection />
      <EventSnapshot />
      <ThemesSection />
      <WhyParticipate />
      <TimelineSection />
      <RegistrationSection />
      <PrizePoolSection />
      <SponsorsSection />
      <Footer />
    </div>
  );
}
