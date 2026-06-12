import { Link, useLocation } from "react-router";
import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Show register button after scrolling past hero section (approximately 800px)
      if (location.pathname === "/") {
        setShowRegisterButton(latest > 800);
      } else {
        setShowRegisterButton(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY, location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Themes", path: "/#themes" },
    { name: "Events", path: "/events" },
    { name: "Team", path: "/team" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("/#")) {
      e.preventDefault();
      const element = document.querySelector(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.nav
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="px-10 py-5 rounded-full backdrop-blur-[120px] bg-[#000814]/50 border border-white/[0.08] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_1px_0_rgba(255,255,255,0.08)_inset]"
        >
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-base font-medium transition-all duration-300 hover:text-[#60A5FA] hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.6)] ${
                  location.pathname === link.path ? "text-[#60A5FA] drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "text-[#F8FAFC]/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.nav>
      </motion.div>

      {/* Floating Register Button */}
      {showRegisterButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-[#60A5FA]/50 transition-all duration-300 hover:scale-105"
            onClick={() => {
              const element = document.querySelector("#registration");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Register Now
          </Button>
        </motion.div>
      )}
    </>
  );
}
