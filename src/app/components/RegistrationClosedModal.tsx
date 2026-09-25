import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { X, Lock } from "lucide-react";

export function RegistrationClosedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the modal has been closed in the current session
    const hasSeenModal = sessionStorage.getItem("hasSeenRegistrationClosedModal");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenRegistrationClosedModal", "true");
  };

  const handleSponsorClick = () => {
    handleClose();
    navigate("/sponsor");
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
              className="relative w-full max-w-[90%] md:max-w-[50%] p-6 sm:p-10 rounded-3xl bg-[#020617]/90 border border-white/10 shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphism Background & Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl -z-10" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/10 to-[#3B82F6]/10 -z-10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#60A5FA]/20 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3B82F6]/20 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#F8FAFC]/70 hover:text-[#F8FAFC] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-[#60A5FA]/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#60A5FA]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
                Registration Closed!
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#F8FAFC]/80 leading-relaxed mb-8">
                <p>
                  Registrations for ImpactX'26 are now officially closed.
                </p>
                <p>
                  Thank you for the overwhelming response. We look forward to welcoming all registered participants on 8th October 2026 for an exciting 24-hour national-level hackathon.
                </p>
                <p className="text-xs sm:text-sm text-[#F8FAFC]/50 mt-4">
                  Stay tuned to our official social media channels for updates and event announcements.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
