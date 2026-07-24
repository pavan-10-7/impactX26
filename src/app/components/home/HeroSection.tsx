import { motion, useScroll, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { HeroSequence } from "./HeroSequence";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToThemes = useCallback(() => {
    navigate("/events");
  }, [navigate]);

  const handleScrollToRegistration = useCallback(() => {
    navigate("/sponsor#contact");
  }, [navigate]);

  return (
    <section ref={containerRef} className="relative h-[2000px]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
        {/* Background Effects — static gradients, no animation cost */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#020617] to-[#000814]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(96,165,250,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/*
          Background Hero Sequence
          - Opacity ramps up across breakpoints: on mobile the text column is
            nearly full-width, so the sequence has to sit quieter behind it
            to stay legible; on desktop there's dedicated negative space for
            it, so it can be more present.
        */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-40 sm:opacity-55 md:opacity-70">
          <HeroSequence scrollYProgress={scrollYProgress} />
        </div>

        {/*
          Content column
          - Replaced fixed inline `paddingRight: "52%"` (which left almost no
            room for text on phones) with responsive Tailwind padding.
          - Mobile/tablet: small symmetric side padding, full-width text.
          - md+: right padding opens up progressively to make room for the
            hero visual, matching the original desktop composition.
        */}
        <div
          className="relative z-10 w-full h-screen flex flex-col justify-center
                     px-[6%] sm:px-[8%]
                     md:pl-[8%] md:pr-[38%]
                     lg:pr-[48%]
                     xl:pr-[52%]
                     pt-[8vh]"
        >
          {/* Single parent motion handles all content entrance — no nested animations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-none font-bold tracking-tight bg-gradient-to-r from-[#F8FAFC] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-2xl mb-6 md:mb-8">
              IMPACTX 26
            </h1>

            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-3 text-[#F8FAFC] max-w-xl md:max-w-3xl">
              24-Hour National Level Offline Hackathon
            </h2>
            <div className="text-base sm:text-xl md:text-2xl font-medium mb-6 text-[#60A5FA]">
              8th & 9th October, 2026
            </div>

            <p className="text-sm sm:text-lg md:text-xl text-[#F8FAFC]/70 mb-10 md:mb-12 max-w-md sm:max-w-lg md:max-w-2xl">
              Presented by IEEE Computer Society RNSIT and Department of CSE (Cyber Security)
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                onClick={handleScrollToRegistration}
                className="w-full sm:w-auto bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-black font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-6 md:py-7 text-sm sm:text-base md:text-xl rounded-full shadow-xl shadow-[#60A5FA]/20 hover:shadow-[#60A5FA]/50 transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Button>
              <Button
                onClick={handleScrollToThemes}
                variant="outline"
                className="w-full sm:w-auto border-[#60A5FA]/50 text-[#60A5FA] px-6 sm:px-8 md:px-10 py-3 sm:py-6 md:py-7 text-sm sm:text-base md:text-xl rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                View Past Events
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-8 md:mt-[10vh] flex flex-col items-start gap-2 text-[#F8FAFC]/50">
              <span className="text-xs sm:text-sm tracking-wider uppercase">Scroll to progress</span>
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 mt-2" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Hero → Content transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-20"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(2,6,23,0.5) 50%, #020617 100%)' }}
        />
        {/* Atmospheric bleed */}
        <div
          className="absolute bottom-[-8vh] left-1/2 -translate-x-1/2 w-[60vw] h-[20vh] pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.08) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
      </div>
    </section>
  );
}
