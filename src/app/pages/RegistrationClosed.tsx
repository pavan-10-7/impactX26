import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Lock } from "lucide-react";

export function RegistrationClosed() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col text-foreground bg-transparent">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617] -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_50%)] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl w-full p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl text-center"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/10 to-[#3B82F6]/10 -z-10" />

          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#60A5FA]" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Registration Closed
          </h1>

          <p className="text-base md:text-lg text-[#F8FAFC]/80 mb-6 leading-relaxed">
            Registrations for ImpactX'26 are now officially closed.
          </p>
          <p className="text-base md:text-lg text-[#F8FAFC]/80 mb-10 leading-relaxed">
            Thank you to everyone who registered. We look forward to welcoming all participating teams on 8th October 2026 for an exciting 24-hour hackathon.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-black font-semibold px-8 py-6 text-lg rounded-full shadow-xl shadow-[#60A5FA]/20 hover:shadow-[#60A5FA]/40 transition-all duration-300 hover:scale-105 border border-[#60A5FA]/50 backdrop-blur-md"
          >
            Back to Home
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
