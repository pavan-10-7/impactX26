import { motion, useScroll } from "motion/react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { HeroSequence } from "./HeroSequence";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleScrollToThemes = () => {
    const element = document.querySelector("#themes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToRegistration = () => {
    const element = document.querySelector("#registration");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative h-[2000px]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#020617] to-[#000814]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(96,165,250,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#60A5FA]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Background Hero Sequence */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-70">
          <HeroSequence scrollYProgress={scrollYProgress} />
        </div>

        <div className="relative z-10 w-full h-screen flex flex-col justify-center" style={{ paddingLeft: '8%', paddingRight: '52%', paddingTop: '8vh' }}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight bg-gradient-to-r from-[#F8FAFC] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-2xl">
                IMPACTX 26
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl md:text-3xl font-semibold mb-6 text-[#F8FAFC] max-w-3xl"
            >
              24-Hour National Level Offline Hackathon
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg md:text-xl text-[#F8FAFC]/70 mb-12 max-w-2xl"
            >
              Presented by IEEE Computer Society RNSIT and Department of CSE (Cyber Security)
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-start w-full"
            >
              <Button
                onClick={handleScrollToRegistration}
                className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-black font-semibold px-10 py-7 text-lg md:text-xl rounded-full shadow-xl shadow-[#60A5FA]/20 hover:shadow-[#60A5FA]/50 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </Button>
              <Button
                onClick={handleScrollToThemes}
                variant="outline"
                className="border-[#60A5FA]/50 text-[#60A5FA] px-10 py-7 text-lg md:text-xl rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                Explore Themes
              </Button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-[10vh] flex flex-col items-start gap-2 text-[#F8FAFC]/50"
            >
              <span className="text-sm tracking-wider uppercase">Scroll to progress</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 mt-2" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* Hero → Content transition: dissolves the hero into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(2,6,23,0.5) 50%, #020617 100%)'
          }}
        />
        {/* Atmospheric bleed: subtle blue glow that continues into next section */}
        <div
          className="absolute bottom-[-8vh] left-1/2 -translate-x-1/2 w-[60vw] h-[20vh] pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </div>
    </section>
  );
}
