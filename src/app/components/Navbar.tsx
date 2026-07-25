import { Link, useLocation } from "react-router";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Themes", path: "/#themes" },
    { name: "Events", path: "/events" },
    { name: "Sponsor", path: "/sponsor" },
    { name: "Team", path: "/team" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsOpen(false);
    if (path.startsWith("/#")) {
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.querySelector(path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (path === "/" && location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 md:top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[92vw] sm:max-w-[85vw] md:w-auto"
      >
        <motion.nav
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="rounded-full backdrop-blur-[32px] bg-[#000814]/60 border border-white/[0.08] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_1px_0_rgba(255,255,255,0.08)_inset]"
        >
          {/* Desktop Nav */}
          <div className="hidden md:flex px-10 py-5 items-center gap-10">
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

          {/* Mobile Nav Header */}
          <div className="md:hidden flex items-center justify-between px-6 py-4">
            <div className="text-[#F8FAFC] font-semibold tracking-widest uppercase text-sm">
              IMPACTX
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F8FAFC]/80 hover:text-[#60A5FA] transition-colors p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl backdrop-blur-[32px] bg-[#000814]/90 border border-white/[0.08] shadow-2xl flex flex-col gap-2 origin-top"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 flex items-center ${
                    location.pathname === link.path 
                      ? "text-[#60A5FA] bg-[#60A5FA]/10 border border-[#60A5FA]/20" 
                      : "text-[#F8FAFC]/80 hover:text-[#60A5FA] hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
