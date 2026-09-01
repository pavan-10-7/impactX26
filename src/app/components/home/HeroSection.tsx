import { motion, useScroll } from "motion/react";
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

  const handleScrollToRegistration = useCallback(() => {
  navigate("/#registration");
}, [navigate]);

  return (
    <section ref={containerRef} className="relative h-[2000px]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
        {/* Background Effects — static gradients, no animation cost */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#020617] to-[#000814]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(96,165,250,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/* Background Hero Sequence */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-70">
          <HeroSequence scrollYProgress={scrollYProgress} />
        </div>

        <div className="relative z-10 w-full h-screen flex flex-col justify-center px-6 pt-[12vh] md:pt-[8vh] lg:pl-[8%] lg:pr-[52%]">
          {/* Single parent motion handles all content entrance — no nested animations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight bg-gradient-to-r from-[#F8FAFC] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-2xl mb-6 md:mb-8 whitespace-nowrap">
              IMPACTX 26
            </h1>

            <h2 className="text-xl md:text-3xl font-semibold mb-3 text-[#F8FAFC] max-w-3xl">
              24-Hour National Level Offline Hackathon
            </h2>
            <div className="text-lg md:text-2xl font-medium mb-6 text-[#60A5FA]">
              8th & 9th Oct, 2026
            </div>

            <p className="text-base md:text-xl text-[#F8FAFC]/70 mb-10 md:mb-12 max-w-2xl">
              Presented by IEEE Computer Society RNSIT and Department of CSE (Cyber Security)
            </p>

            <div className="flex justify-start w-full">
            <Button
              onClick={handleScrollToRegistration}
              className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-black font-semibold px-10 py-6 md:px-12 md:py-7 text-base md:text-xl rounded-full shadow-xl shadow-[#60A5FA]/20 hover:shadow-[#60A5FA]/50 transition-all duration-300 hover:scale-105"
              >
              Register Now
              </Button>
              </div>

            {/* Scroll Indicator */}
            <div className="mt-[10vh] flex flex-col items-start gap-2 text-[#F8FAFC]/50">
              <span className="text-sm tracking-wider uppercase">Scroll to progress</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
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
