import React, { Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/home/HeroSection";
import { EventSnapshot } from "../components/home/EventSnapshot";
import { AboutSection } from "../components/home/AboutSection";
import { ThemesSection } from "../components/home/ThemesSection";
import { WhyParticipate } from "../components/home/WhyParticipate";
import { StickyRegisterButton } from "../components/home/StickyRegisterButton";

// Lazy loaded components (below the fold)
const TimelineSection = React.lazy(() => import("../components/home/TimelineSection").then(module => ({ default: module.TimelineSection })));
const RegistrationSection = React.lazy(() => import("../components/home/RegistrationSection").then(module => ({ default: module.RegistrationSection })));
const PrizePoolSection = React.lazy(() => import("../components/home/PrizePoolSection").then(module => ({ default: module.PrizePoolSection })));
const SponsorsSection = React.lazy(() => import("../components/home/SponsorsSection").then(module => ({ default: module.SponsorsSection })));
const Footer = React.lazy(() => import("../components/Footer").then(module => ({ default: module.Footer })));

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
      
      <Suspense fallback={<div className="h-[20vh]" />}>
        <TimelineSection />
        <RegistrationSection />
        <PrizePoolSection />
        <SponsorsSection />
        <Footer />
      </Suspense>
    </div>
  );
}
