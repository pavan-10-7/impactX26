import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";

interface HeroSequenceProps {
  scrollYProgress: MotionValue<number>;
}

type HeroTierName = "desktop" | "mobile";

interface HeroTier {
  name: HeroTierName;
  directory: string;
  totalFrames: number;
  width: number;
  height: number;
  maxDecodedFrames: number;
  prefetchRadius: number;
  backgroundFetchBatchSize: number;
  backgroundFetchDelay: number;
  maxActiveFetches: number;
  maxActiveDecodes: number;
  fallbackFrames: number[];
}

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

interface NavigatorWithHints extends Navigator {
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
  deviceMemory?: number;
}

type DecodedFrame = {
  source: CanvasImageSource;
  width: number;
  height: number;
  lastUsed: number;
  close?: () => void;
};

type BackgroundHandle = {
  timeoutId: number | null;
  idleId: number | null;
};

const HERO_TIERS: Record<HeroTierName, HeroTier> = {
  desktop: {
    name: "desktop",
    directory: "desktop",
    totalFrames: 223,
    width: 1920,
    height: 1080,
    maxDecodedFrames: 32,
    prefetchRadius: 4,
    backgroundFetchBatchSize: 0,
    backgroundFetchDelay: 0,
    maxActiveFetches: 4,
    maxActiveDecodes: 3,
    fallbackFrames: [],
  },
  mobile: {
    name: "mobile",
    directory: "mobile",
    totalFrames: 96,
    width: 1024,
    height: 576,
    maxDecodedFrames: 16,
    prefetchRadius: 2,
    backgroundFetchBatchSize: 3,
    backgroundFetchDelay: 120,
    maxActiveFetches: 3,
    maxActiveDecodes: 2,
    fallbackFrames: [0, 14, 27, 41, 54, 68, 81, 95],
  },
};

const getFramePath = (tier: HeroTier, frameIndex: number) => {
  const paddedIndex = (frameIndex + 1).toString().padStart(3, "0");
  return `/HeroElement/${tier.directory}/ezgif-frame-${paddedIndex}.webp`;
};

const progressToFrameIndex = (progress: number, totalFrames: number) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  return Math.min(totalFrames - 1, Math.floor(clampedProgress * totalFrames));
};

const selectHeroTier = (): HeroTier => {
  if (typeof window === "undefined") return HERO_TIERS.desktop;

  const navigatorWithHints = window.navigator as NavigatorWithHints;
  const connection =
    navigatorWithHints.connection ??
    navigatorWithHints.mozConnection ??
    navigatorWithHints.webkitConnection;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || HERO_TIERS.desktop.width;
  const effectiveType = connection?.effectiveType?.toLowerCase();
  const isSlowConnection =
    effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g";

  if (
    viewportWidth <= 768 ||
    connection?.saveData ||
    isSlowConnection ||
    (navigatorWithHints.deviceMemory !== undefined && navigatorWithHints.deviceMemory <= 4)
  ) {
    return HERO_TIERS.mobile;
  }

  return HERO_TIERS.desktop;
};

const createMobileWarmOrder = (tier: HeroTier) => {
  const fallbackFrames = new Set(tier.fallbackFrames);
  const orderedFallbacks = tier.fallbackFrames.filter(
    (frameIndex) => frameIndex >= 0 && frameIndex < tier.totalFrames,
  );
  const remainingFrames = Array.from({ length: tier.totalFrames }, (_, index) => index).filter(
    (frameIndex) => !fallbackFrames.has(frameIndex),
  );

  return [...orderedFallbacks, ...remainingFrames];
};

export function HeroSequence({ scrollYProgress }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tier] = useState<HeroTier>(() => selectHeroTier());
  const decodedFramesRef = useRef<Map<number, DecodedFrame>>(new Map());
  const blobCacheRef = useRef<Map<number, Blob>>(new Map());
  const fetchQueueRef = useRef<Map<number, number>>(new Map());
  const decodeQueueRef = useRef<Map<number, number>>(new Map());
  const activeFetchesRef = useRef<Set<number>>(new Set());
  const activeDecodesRef = useRef<Set<number>>(new Set());
  const fetchPromisesRef = useRef<Map<number, Promise<Blob | null>>>(new Map());
  const abortControllersRef = useRef<Map<number, AbortController>>(new Map());
  const failedFetchesRef = useRef<Map<number, number>>(new Map());
  const failedDecodesRef = useRef<Map<number, number>>(new Map());
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const generationRef = useRef(0);
  const accessCounterRef = useRef(0);

  const getFallbackFrameSet = () => new Set(tier.name === "mobile" ? tier.fallbackFrames : []);

  const getQueuedFrame = (queue: Map<number, number>) => {
    const currentFrame = currentFrameRef.current;

    return [...queue.entries()].sort(([frameA, priorityA], [frameB, priorityB]) => {
      return (
        priorityA - priorityB ||
        Math.abs(frameA - currentFrame) - Math.abs(frameB - currentFrame)
      );
    })[0]?.[0];
  };

  const ensureCanvasSize = (frame: Pick<DecodedFrame, "width" | "height">) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    if (canvas.width !== frame.width || canvas.height !== frame.height) {
      canvas.width = frame.width;
      canvas.height = frame.height;
    }

    return canvas;
  };

  const findNearestDecodedFrame = (targetFrame: number) => {
    let nearestFrameIndex: number | null = null;
    let nearestFrame: DecodedFrame | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const [frameIndex, frame] of decodedFramesRef.current) {
      const distance = Math.abs(frameIndex - targetFrame);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestFrameIndex = frameIndex;
        nearestFrame = frame;
      }
    }

    return nearestFrameIndex === null || nearestFrame === null
      ? null
      : { frameIndex: nearestFrameIndex, frame: nearestFrame };
  };

  const drawFrame = (frameIndex: number, frame: DecodedFrame) => {
    const canvas = ensureCanvasSize(frame);
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    frame.lastUsed = ++accessCounterRef.current;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(frame.source, 0, 0, canvas.width, canvas.height);
    lastDrawnFrameRef.current = frameIndex;
  };

  const drawBestDecodedFrame = () => {
    const targetFrame = currentFrameRef.current;
    const bestFrame = findNearestDecodedFrame(targetFrame);
    if (!bestFrame) return;

    if (
      lastDrawnFrameRef.current === bestFrame.frameIndex &&
      canvasRef.current?.width === bestFrame.frame.width &&
      canvasRef.current?.height === bestFrame.frame.height
    ) {
      return;
    }

    drawFrame(bestFrame.frameIndex, bestFrame.frame);
  };

  const scheduleDrawBestFrame = () => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      drawBestDecodedFrame();
      rafRef.current = null;
    });
  };

  const decodedFrameImprovesCurrentFallback = (frameIndex: number) => {
    const currentFrame = currentFrameRef.current;
    const displayedFrame = lastDrawnFrameRef.current;
    if (displayedFrame === null) return true;

    return (
      frameIndex === currentFrame ||
      Math.abs(frameIndex - currentFrame) < Math.abs(displayedFrame - currentFrame)
    );
  };

  const evictDecodedFrames = () => {
    const decodedFrames = decodedFramesRef.current;
    if (decodedFrames.size <= tier.maxDecodedFrames) return;

    const currentFrame = currentFrameRef.current;
    const protectedFrames = getFallbackFrameSet();
    protectedFrames.add(currentFrame);
    protectedFrames.add(lastDrawnFrameRef.current ?? currentFrame);

    for (let distance = 1; distance <= tier.prefetchRadius; distance++) {
      protectedFrames.add(currentFrame - distance);
      protectedFrames.add(currentFrame + distance);
    }

    const candidates = [...decodedFrames.entries()]
      .filter(([frameIndex]) => !protectedFrames.has(frameIndex))
      .sort(([frameA, resourceA], [frameB, resourceB]) => {
        return (
          Math.abs(frameB - currentFrame) - Math.abs(frameA - currentFrame) ||
          resourceA.lastUsed - resourceB.lastUsed
        );
      });

    while (decodedFrames.size > tier.maxDecodedFrames && candidates.length > 0) {
      const [frameIndex, resource] = candidates.shift()!;
      resource.close?.();
      decodedFrames.delete(frameIndex);
    }
  };

  const decodeBlob = async (blob: Blob): Promise<DecodedFrame> => {
    if ("createImageBitmap" in window) {
      try {
        const bitmap = await createImageBitmap(blob);
        return {
          source: bitmap,
          width: bitmap.width,
          height: bitmap.height,
          lastUsed: ++accessCounterRef.current,
          close: () => bitmap.close(),
        };
      } catch {
        // Fall through to the image element decoder.
      }
    }

    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";

    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Hero frame decode failed"));
        img.src = objectUrl;
      });
      await img.decode().catch(() => undefined);

      return {
        source: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        lastUsed: ++accessCounterRef.current,
        close: () => URL.revokeObjectURL(objectUrl),
      };
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      throw error;
    }
  };

  const pumpDecodeQueue = () => {
    while (activeDecodesRef.current.size < tier.maxActiveDecodes) {
      const availableDecodeQueue = new Map(
        [...decodeQueueRef.current.entries()].filter(([frameIndex]) =>
          blobCacheRef.current.has(frameIndex),
        ),
      );
      const frameIndex = getQueuedFrame(availableDecodeQueue);
      if (frameIndex === undefined) return;

      const blob = blobCacheRef.current.get(frameIndex);
      if (!blob) return;

      decodeQueueRef.current.delete(frameIndex);
      activeDecodesRef.current.add(frameIndex);
      const generation = generationRef.current;

      decodeBlob(blob)
        .then((frame) => {
          if (generation !== generationRef.current) {
            frame.close?.();
            return;
          }

          decodedFramesRef.current.set(frameIndex, frame);
          failedDecodesRef.current.delete(frameIndex);
          if (tier.name !== "mobile") {
            blobCacheRef.current.delete(frameIndex);
          }

          evictDecodedFrames();

          if (decodedFrameImprovesCurrentFallback(frameIndex)) {
            scheduleDrawBestFrame();
          }
        })
        .catch(() => {
          failedDecodesRef.current.set(
            frameIndex,
            (failedDecodesRef.current.get(frameIndex) ?? 0) + 1,
          );
        })
        .finally(() => {
          activeDecodesRef.current.delete(frameIndex);
          pumpDecodeQueue();
        });
    }
  };

  const pumpFetchQueue = () => {
    while (activeFetchesRef.current.size < tier.maxActiveFetches) {
      const frameIndex = getQueuedFrame(fetchQueueRef.current);
      if (frameIndex === undefined) return;

      fetchQueueRef.current.delete(frameIndex);
      activeFetchesRef.current.add(frameIndex);
      const generation = generationRef.current;
      const controller = new AbortController();
      abortControllersRef.current.set(frameIndex, controller);

      const promise = fetch(getFramePath(tier, frameIndex), {
        cache: "force-cache",
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Hero frame request failed: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          if (generation === generationRef.current) {
            blobCacheRef.current.set(frameIndex, blob);
            failedFetchesRef.current.delete(frameIndex);
          }

          return blob;
        })
        .catch(() => {
          failedFetchesRef.current.set(
            frameIndex,
            (failedFetchesRef.current.get(frameIndex) ?? 0) + 1,
          );
          decodeQueueRef.current.delete(frameIndex);
          return null;
        })
        .finally(() => {
          activeFetchesRef.current.delete(frameIndex);
          fetchPromisesRef.current.delete(frameIndex);
          abortControllersRef.current.delete(frameIndex);
          pumpFetchQueue();
          pumpDecodeQueue();
        });

      fetchPromisesRef.current.set(frameIndex, promise);
    }
  };

  const enqueueFrameFetch = (frameIndex: number, priority: number) => {
    if (frameIndex < 0 || frameIndex >= tier.totalFrames) return;
    if (blobCacheRef.current.has(frameIndex) || fetchPromisesRef.current.has(frameIndex)) return;

    const failedAttempts = failedFetchesRef.current.get(frameIndex) ?? 0;
    if (failedAttempts >= 2 && priority > 0) return;

    const queuedPriority = fetchQueueRef.current.get(frameIndex);
    if (queuedPriority === undefined || priority < queuedPriority) {
      fetchQueueRef.current.set(frameIndex, priority);
    }

    pumpFetchQueue();
  };

  const enqueueFrameDecode = (frameIndex: number, priority: number) => {
    if (frameIndex < 0 || frameIndex >= tier.totalFrames) return;
    if (decodedFramesRef.current.has(frameIndex) || activeDecodesRef.current.has(frameIndex)) {
      return;
    }

    const failedAttempts = failedDecodesRef.current.get(frameIndex) ?? 0;
    if (failedAttempts >= 2 && priority > 0) return;

    const queuedPriority = decodeQueueRef.current.get(frameIndex);
    if (queuedPriority === undefined || priority < queuedPriority) {
      decodeQueueRef.current.set(frameIndex, priority);
    }

    enqueueFrameFetch(frameIndex, priority);
    pumpDecodeQueue();
  };

  const pruneMobileDecodeQueue = (targetFrame: number) => {
    if (tier.name !== "mobile") return;

    const fallbackFrames = getFallbackFrameSet();
    const keepDistance = tier.prefetchRadius + 1;

    for (const frameIndex of decodeQueueRef.current.keys()) {
      if (
        !fallbackFrames.has(frameIndex) &&
        Math.abs(frameIndex - targetFrame) > keepDistance
      ) {
        decodeQueueRef.current.delete(frameIndex);
      }
    }
  };

  const enqueueTargetWork = (targetFrame: number) => {
    pruneMobileDecodeQueue(targetFrame);
    enqueueFrameDecode(targetFrame, 0);

    for (let distance = 1; distance <= tier.prefetchRadius; distance++) {
      enqueueFrameDecode(targetFrame + distance, distance);
      enqueueFrameDecode(targetFrame - distance, distance);
    }
  };

  useEffect(() => {
    let isActive = true;
    let backgroundHandle: BackgroundHandle = { timeoutId: null, idleId: null };
    const warmOrder = createMobileWarmOrder(tier);
    let warmCursor = 0;
    generationRef.current += 1;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      canvas.width = tier.width;
      canvas.height = tier.height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    const clearBackgroundHandle = () => {
      if (backgroundHandle.timeoutId !== null) {
        window.clearTimeout(backgroundHandle.timeoutId);
      }

      if (backgroundHandle.idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(backgroundHandle.idleId);
      }

      backgroundHandle = { timeoutId: null, idleId: null };
    };

    const scheduleBackgroundBatch = (callback: () => void) => {
      clearBackgroundHandle();
      backgroundHandle.timeoutId = window.setTimeout(() => {
        backgroundHandle.timeoutId = null;

        if ("requestIdleCallback" in window) {
          backgroundHandle.idleId = window.requestIdleCallback(
            () => {
              backgroundHandle.idleId = null;
              callback();
            },
            { timeout: 80 },
          );
          return;
        }

        callback();
      }, tier.backgroundFetchDelay);
    };

    const warmCompressedFrames = () => {
      if (!isActive || tier.name !== "mobile") return;

      let requestedFrames = 0;
      while (
        requestedFrames < tier.backgroundFetchBatchSize &&
        warmCursor < warmOrder.length
      ) {
        const frameIndex = warmOrder[warmCursor];
        warmCursor += 1;
        enqueueFrameFetch(frameIndex, 5);
        requestedFrames += 1;
      }

      if (warmCursor < warmOrder.length) {
        scheduleBackgroundBatch(warmCompressedFrames);
      }
    };

    const initialFrame = progressToFrameIndex(scrollYProgress.get(), tier.totalFrames);
    currentFrameRef.current = initialFrame;

    enqueueFrameDecode(0, 0);
    if (initialFrame !== 0) {
      enqueueFrameDecode(initialFrame, 0);
    }
    enqueueTargetWork(initialFrame);

    if (tier.name === "mobile") {
      window.setTimeout(() => {
        if (!isActive) return;

        for (const frameIndex of tier.fallbackFrames) {
          enqueueFrameFetch(frameIndex, 1);
          enqueueFrameDecode(frameIndex, 3);
        }

        scheduleBackgroundBatch(warmCompressedFrames);
      }, 40);
    }

    return () => {
      isActive = false;
      clearBackgroundHandle();
      generationRef.current += 1;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      for (const controller of abortControllersRef.current.values()) {
        controller.abort();
      }

      for (const frame of decodedFramesRef.current.values()) {
        frame.close?.();
      }

      decodedFramesRef.current.clear();
      blobCacheRef.current.clear();
      fetchQueueRef.current.clear();
      decodeQueueRef.current.clear();
      activeFetchesRef.current.clear();
      activeDecodesRef.current.clear();
      fetchPromisesRef.current.clear();
      abortControllersRef.current.clear();
      failedFetchesRef.current.clear();
      failedDecodesRef.current.clear();
    };
  }, [scrollYProgress, tier]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = progressToFrameIndex(latest, tier.totalFrames);
    currentFrameRef.current = targetFrame;
    enqueueTargetWork(targetFrame);
    scheduleDrawBestFrame();
  });

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
