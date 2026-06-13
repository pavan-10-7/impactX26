import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";

interface HeroSequenceProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroSequence({ scrollYProgress }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);
  
  const totalFrames = 223; // from 0001 to 0223

  useEffect(() => {
    // preload all images
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/HeroElement/ezgif-frame-${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    
    // Draw first frame immediately when loaded
    if (imagesRef.current[0]) {
      // Set canvas size to match image intrinsic dimensions
      canvas.width = imagesRef.current[0].width;
      canvas.height = imagesRef.current[0].height;
      ctx.drawImage(imagesRef.current[0], 0, 0);
    }
  }, [imagesLoaded]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;
    
    // Cancel any pending draw from previous scroll event
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule exactly one draw per RAF frame
    rafRef.current = requestAnimationFrame(() => {
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(latest * totalFrames)
      );
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      
      const img = imagesRef.current[frameIndex];
      if (img) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
    // overflow-hidden prevents sequence edges from being visible
    <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
      {/* Atmospheric glow — offset right to follow the artifact */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-blue-500/15 blur-[80px] rounded-full pointer-events-none"
      />

      {/*
        Sequence container:
        - 130vw/130vh always exceeds viewport — no edge exposure possible
        - right: -5vw keeps the X artifact biased to the right
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
          transform: "translateY(-50%) translateZ(0) scale(0.82)",
          transformOrigin: "right center",
          willChange: "transform",
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover mix-blend-screen"
          style={{
            filter: "contrast(1.2)",
          }}
        />
      </div>
    </div>
  );
}
