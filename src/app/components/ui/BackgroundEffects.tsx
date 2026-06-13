import { motion } from "motion/react";
import { useState } from "react";

export function BackgroundEffects() {
  // Pre-calculate random values once — no re-renders, no hydration issues
  const [crystals] = useState(() =>
    [...Array(4)].map((_, i) => {
      const isLeft = i % 2 === 0;
      return {
        id: i,
        size: Math.random() * 14 + 8,
        left: isLeft ? `${Math.random() * 8 + 3}%` : `${Math.random() * 8 + 88}%`,
        top: `${Math.random() * 80 + 10}%`,
        rotation: Math.random() * 360,
        delay: Math.random() * 4,
        duration: Math.random() * 8 + 18,
      };
    })
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
      {/* Static base gradient — no animation cost */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000814] via-[#000000] to-[#020617]" />

      {/* Aurora glow top-left — scale + opacity only (was 4 props) */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#60A5FA] blur-[80px]"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Aurora glow bottom-right — scale + opacity only */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#3B82F6] blur-[80px]"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Sparse floating crystal fragments — y + opacity only (was 3 props) */}
      {crystals.map((crystal) => (
        <motion.div
          key={crystal.id}
          className="absolute mix-blend-screen opacity-20"
          style={{
            left: crystal.left,
            top: crystal.top,
            width: crystal.size,
            height: crystal.size,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            background: "linear-gradient(135deg, rgba(96,165,250,0.8), rgba(59,130,246,0.2))",
            willChange: "transform, opacity",
          }}
          animate={{ y: [-15, 15, -15], opacity: [0.1, 0.35, 0.1] }}
          transition={{
            duration: crystal.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: crystal.delay,
          }}
        />
      ))}

      {/* Atmospheric vignette overlays — static, zero cost */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000] opacity-40" />
    </div>
  );
}
