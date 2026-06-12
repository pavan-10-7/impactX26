import { useEffect, useRef } from "react";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";

interface HeroSequenceProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroSequence({ scrollYProgress }: HeroSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Cancel any pending seek from the previous scroll event
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule exactly ONE seek per RAF frame — no loop, no lerp.
    // The browser media pipeline can only process one seek per frame anyway.
    // Framer's useMotionValueEvent already provides the smoothed progress value,
    // so we don't need to lerp again on top of it. That double-smoothing
    // was the source of the lag cascade.
    rafRef.current = requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const target = latest * video.duration;
      // Guard: only seek if meaningfully different (> 1 frame at ~24fps)
      if (Math.abs(video.currentTime - target) > 0.016) {
        video.currentTime = target;
      }
      rafRef.current = null;
    });
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    // overflow-hidden prevents video edges from being visible
    <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
      {/* Atmospheric glow — offset right to follow the artifact */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-blue-500/15 blur-[180px] rounded-full pointer-events-none"
      />

      {/*
        Video container:
        - 130vw/130vh always exceeds viewport — no edge exposure possible
        - right: -15vw keeps the X artifact biased to the right
        - scale(0.82) = 18% reduction — large/premium but not overwhelming
        - transformOrigin: right center so scaling anchors to the right side
      */}
      <div
        className="absolute"
        style={{
          width: "130vw",
          height: "130vh",
          right: "-5vw",
          top: "50%",
          transform: "translateY(-50%) scale(0.82)",
          transformOrigin: "right center",
        }}
      >
        <video
          ref={videoRef}
          src="/hero.webm"
          muted
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.2)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}
