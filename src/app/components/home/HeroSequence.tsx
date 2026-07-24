import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";

interface HeroSequenceProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 223; // from 0001 to 0223

// Roughly classify the device/network so we don't force a phone on a slow
// connection to pull 223 full-resolution frames just to render a background.
function getFrameStride(): number {
  if (typeof window === "undefined") return 1;

  const isSmallScreen = window.innerWidth < 768;

  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  };
  const conn = nav.connection;
  const isSlowNetwork =
    !!conn?.saveData ||
    conn?.effectiveType === "slow-2g" ||
    conn?.effectiveType === "2g" ||
    conn?.effectiveType === "3g";

  if (isSlowNetwork) return 4; // ~56 frames
  if (isSmallScreen) return 2; // ~112 frames — still smooth, half the payload
  return 1; // desktop / fast network: full fidelity
}

export function HeroSequence({ scrollYProgress }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);
  const strideRef = useRef(1);
  const dprRef = useRef(1);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const stride = getFrameStride();
    strideRef.current = stride;

    // Build a sparse array so index math (frame i -> nearest loaded frame)
    // stays simple, just skip loading the frames we don't need.
    const imgs: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const framesToLoad: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += stride) {
      framesToLoad.push(i);
    }
    // Always include the last frame so the sequence lands cleanly at 100% scroll.
    if (framesToLoad[framesToLoad.length - 1] !== TOTAL_FRAMES - 1) {
      framesToLoad.push(TOTAL_FRAMES - 1);
    }

    let loadedCount = 0;
    const total = framesToLoad.length;

    framesToLoad.forEach((frameIdx) => {
      const img = new Image();
      const paddedIndex = (frameIdx + 1).toString().padStart(3, "0");
      img.src = `/HeroElement/ezgif-frame-${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) setImagesLoaded(true);
      };
      img.onerror = () => {
        // Don't let one bad frame block the whole sequence from rendering.
        loadedCount++;
        if (loadedCount === total) setImagesLoaded(true);
      };
      imgs[frameIdx] = img;
    });

    imagesRef.current = imgs;
  }, []);

  // Given any target frame index, find the nearest frame we actually loaded
  // (accounts for stride > 1 on mobile/slow connections).
  const getNearestLoadedFrame = (targetIndex: number): HTMLImageElement | null => {
    const stride = strideRef.current;
    const snapped = Math.round(targetIndex / stride) * stride;
    const clamped = Math.min(TOTAL_FRAMES - 1, Math.max(0, snapped));
    return (
      imagesRef.current[clamped] ??
      imagesRef.current[TOTAL_FRAMES - 1] ??
      imagesRef.current[0]
    );
  };

  const sizeCanvasToDisplay = () => {
    const canvas = canvasRef.current;
    const firstImg = imagesRef.current.find((img) => img) ?? null;
    if (!canvas || !firstImg) return;

    // Cap device-pixel-ratio at 2 — going to 3x on a big canvas is a lot of
    // fill-rate for no visible gain and burns battery on high-DPI phones.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const displayWidth = canvas.clientWidth || firstImg.width;
    const displayHeight = canvas.clientHeight || firstImg.height;

    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawFrame = (img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img) return;
    const displayWidth = canvas.width / dprRef.current;
    const displayHeight = canvas.height / dprRef.current;
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
  };

  useEffect(() => {
    if (!imagesLoaded) return;
    sizeCanvasToDisplay();
    drawFrame(getNearestLoadedFrame(0));

    // Keep canvas resolution correct across rotation / responsive resize.
    const handleResize = () => {
      sizeCanvasToDisplay();
      drawFrame(getNearestLoadedFrame(0));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;

    // If the visitor asked for reduced motion, don't scrub the sequence at
    // all — leave it on the first frame instead of animating on scroll.
    if (prefersReducedMotion) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(latest * TOTAL_FRAMES));
      drawFrame(getNearestLoadedFrame(frameIndex));
      rafRef.current = null;
    });
  });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    // overflow-hidden prevents sequence edges from being visible
    <div className="absolute inset-0 overflow-hidden">
      {/* Atmospheric glow — offset right to follow the artifact */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1, 1.5, 1], opacity: [0.25, 0.45, 0.25] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-30%] md:right-[-10%] top-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[100vw] md:h-[100vw] bg-blue-500/15 blur-[50px] md:blur-[80px] rounded-full pointer-events-none"
      />

      {/*
        Sequence container:
        - 130vw/130vh always exceeds viewport — no edge exposure possible
        - transformOrigin: right center so any future scaling anchors right
        - willChange only applied where something actually animates (the
          canvas repaint), not on this static wrapper
      */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transformOrigin: "right center" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full mix-blend-screen transition-opacity duration-500"
          style={{
            filter: "contrast(1.2)",
            willChange: "transform",
            transform: "translateZ(0)",
            opacity: imagesLoaded ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
