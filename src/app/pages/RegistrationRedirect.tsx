import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";

const REGISTRATION_URL = "";

export function RegistrationRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (REGISTRATION_URL) {
      const timer = setTimeout(() => {
        window.location.href = REGISTRATION_URL;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative min-h-screen text-foreground bg-transparent flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)]" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-2xl">
              Registration Portal
            </h1>
            <p className="text-lg md:text-xl text-[#F8FAFC]/60">
              You're being redirected to the official registration portal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-8"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/10 to-[#3B82F6]/10 pointer-events-none" />

            <div className="relative z-10 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-[#F8FAFC] mb-8">
                Preparing your registration experience...
              </h3>
              
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="p-4 rounded-full bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-[#60A5FA]/30"
                >
                  <Loader2 className="w-10 h-10 text-[#60A5FA]" />
                </motion.div>
              </div>

              <div className="space-y-2 text-[#F8FAFC]/70">
                <p className="font-medium text-[#F8FAFC]">The registration portal will be available shortly.</p>
                <p className="text-sm">We're currently finalizing registrations. Please check back soon.</p>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-black font-semibold px-8 py-6 text-base rounded-full shadow-xl shadow-[#60A5FA]/20 hover:shadow-[#60A5FA]/50 transition-all duration-300 hover:scale-105"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    const sponsorsEl = document.getElementById("sponsors");
                    if (sponsorsEl) sponsorsEl.scrollIntoView({ behavior: "smooth" });
                    else window.location.hash = "sponsors";
                  }, 100);
                }}
                className="bg-white/5 border border-white/10 text-white font-semibold px-8 py-6 text-base rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Sponsor Us
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
