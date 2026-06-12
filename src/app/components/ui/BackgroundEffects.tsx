import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-calculate random values to avoid hydration mismatch and jumping
  const [crystals] = useState(() => 
    [...Array(6)].map((_, i) => {
      const isLeft = i % 2 === 0;
      return {
        id: i,
        size: Math.random() * 15 + 10,
        left: isLeft ? `${Math.random() * 10 + 5}%` : `${Math.random() * 10 + 85}%`,
        top: `${Math.random() * 80 + 10}%`,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15
      };
    })
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#020617_25%,#000814_50%,#020617_75%,#000000_100%)] blur-[100px]"
        />
      </div>

      {/* Subtle Aurora Glows */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#60A5FA] blur-[150px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#3B82F6] blur-[150px]"
      />

      {/* Sparse Floating Crystal Fragments near edges */}
      {mounted && crystals.map((crystal) => (
        <motion.div
          key={crystal.id}
          className="absolute mix-blend-screen opacity-30"
          style={{
            left: crystal.left,
            top: crystal.top,
            width: crystal.size,
            height: crystal.size,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond shape
            background: "linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.2))"
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [crystal.rotation, crystal.rotation + 180, crystal.rotation + 360],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: crystal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: crystal.delay
          }}
        />
      ))}

      {/* Atmospheric Haze Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000] opacity-40" />
    </div>
  );
}
