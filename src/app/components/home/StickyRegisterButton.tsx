import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export function StickyRegisterButton() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [threshold, setThreshold] = useState(600);

  useEffect(() => {
    setThreshold(window.innerHeight * 0.8);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50,
        scale: isVisible ? 1 : 0.9 
      }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      className={`fixed bottom-8 right-8 z-50 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <Button
        onClick={handleRegisterClick}
        className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-black font-semibold px-8 py-6 text-lg rounded-full shadow-xl shadow-[#60A5FA]/20 hover:shadow-[#60A5FA]/40 transition-all duration-300 hover:scale-105 border border-[#60A5FA]/50 backdrop-blur-md"
      >
        Register Now
      </Button>
    </motion.div>
  );
}
