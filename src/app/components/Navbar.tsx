import { Link, useLocation } from "react-router";
import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();

  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
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
    { name: "Sponsor", path: "/sponsor" },
    { name: "Team", path: "/team" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path.startsWith("/#")) {
      e.preventDefault();
      const element = document.querySelector(path.substring(1));

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }

    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto"
      >
        <motion.nav
          animate={{ y: [-5, 5, -5] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="backdrop-blur-[32px] bg-[#000814]/60 border border-white/10 rounded-full md:rounded-full shadow-xl px-4 md:px-8 py-3"
        >
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-base transition-all duration-300 hover:text-[#60A5FA] ${
                  location.pathname === link.path
                    ? "text-[#60A5FA]"
                    : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center justify-between w-full">
            <span className="text-white font-semibold text-lg">
              ImpactX
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden mt-3 rounded-2xl bg-[#000814]/90 backdrop-blur-xl border border-white/10 p-5"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-center text-lg transition ${
                    location.pathname === link.path
                      ? "text-[#60A5FA]"
                      : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

    
      
    </>
  );
}