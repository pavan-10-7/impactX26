import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src?: string;
  alt: string;
}

export function CoverflowGallery({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      nextSlide();
    } else if (swipe > 50) {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false}>
        {images.map((image, index) => {
          // Calculate relative position (-2 to 2)
          let relativeIndex = index - currentIndex;
          if (relativeIndex > Math.floor(images.length / 2)) {
            relativeIndex -= images.length;
          } else if (relativeIndex < -Math.floor(images.length / 2)) {
            relativeIndex += images.length;
          }

          // Only render items close to the center to improve performance
          if (Math.abs(relativeIndex) > 2) return null;

          const isCenter = relativeIndex === 0;
          const xOffset = relativeIndex * 200;
          const zOffset = -Math.abs(relativeIndex) * 100;
          const rotateY = relativeIndex * -15;

          return (
            <motion.div
              key={image.id}
              className={`absolute w-64 md:w-96 aspect-video rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border ${isCenter ? 'border-[#60A5FA] shadow-2xl shadow-[#60A5FA]/30' : 'border-white/10'}`}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              initial={false}
              animate={{
                x: xOffset,
                z: zOffset,
                rotateY: rotateY,
                scale: isCenter ? 1 : 0.8,
                opacity: Math.abs(relativeIndex) > 1 ? 0 : 1,
                zIndex: 10 - Math.abs(relativeIndex),
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (!isCenter) {
                  if (relativeIndex > 0) nextSlide();
                  if (relativeIndex < 0) prevSlide();
                }
              }}
            >
              {image.src ? (
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-[#F8FAFC]/50 text-center">
                    <div className="text-lg font-medium mb-1">Event Photo</div>
                    <div className="text-sm">{image.alt}</div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-12 z-20 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-[#60A5FA]/20 hover:border-[#60A5FA]/50 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-12 z-20 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-[#60A5FA]/20 hover:border-[#60A5FA]/50 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
