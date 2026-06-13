import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { Calendar, Users, MapPin, Trophy, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CoverflowGallery } from "../components/ui/CoverflowGallery";
import { useLocation } from "react-router-dom";



export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
  const scrollToHash = () => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const timeout = setTimeout(scrollToHash, 300);

  return () => clearTimeout(timeout);
}, [location]);

  const events = [
    {
      id: 1,
      name: "ImpactX 26",
      year: "2026-27",
      status: "Upcoming",
      date: "October 2026",
      participants: "150+",
      location: "RNSIT, Bangalore",
      prize: "₹1,00,000",
      description: "Our upcoming national-level 24-hour hackathon featuring cutting-edge themes in Cybersecurity, MCP, and Agentic AI.",
      gradient: "from-[#60A5FA]/20 to-[#3B82F6]/10",
      borderGradient: "from-[#60A5FA]/50 to-[#3B82F6]/30",
      link: "/",
    },
    {
      id: 2,
      name: "ImpactX 25",
      year: "2025-26",
      status: "Completed",
      date: "October 2025",
      participants: "120+",
      location: "RNSIT, Bangalore",
      prize: "₹50,000",
      description: "A successful edition featuring innovative solutions in AI/ML, Web3, and IoT. Amazing projects and incredible talent showcase.",
      gradient: "from-[#3B82F6]/20 to-[#60A5FA]/10",
      borderGradient: "from-[#3B82F6]/50 to-[#60A5FA]/30",
      link: "https://ieeecsrnsit.netlify.app/impactx",
    },
  ];

  

  // Gallery images from previous events
  const galleryImages = [
    { id: 1, src: "/Pictures25/IMG_7969.JPG", alt: "ImpactX 25 Event Photo 1" },
    { id: 2, src: "/Pictures25/IMG_8014.JPG", alt: "ImpactX 25 Event Photo 2" },
    { id: 3, src: "/Pictures25/IMG_8087.JPG", alt: "ImpactX 25 Event Photo 3" },
    { id: 4, src: "/Pictures25/IMG_8121.JPG", alt: "ImpactX 25 Event Photo 4" },
    { id: 5, src: "/Pictures25/IMG_8124.JPG", alt: "ImpactX 25 Event Photo 5" },
    { id: 6, src: "/Pictures25/IMG_8230.JPG", alt: "ImpactX 25 Event Photo 6" },
    { id: 7, src: "/Pictures25/IMG_8234.JPG", alt: "ImpactX 25 Event Photo 7" },
  ];

  return (
    <div className="relative min-h-screen text-foreground bg-transparent">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(96,165,250,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
              Events
            </h1>
            <p className="text-xl text-[#F8FAFC]/60">
              Explore our journey of innovation and collaboration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => {
                  setSelectedEvent(event.id);
                  if (event.link.startsWith('/')) {
                    navigate(event.link);
                  } else {
                    window.open(event.link, '_blank');
                  }
                }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#60A5FA]/20">
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      event.status === "Upcoming"
                        ? "bg-gradient-to-r from-[#60A5FA]/20 to-[#3B82F6]/10 border border-[#60A5FA]/30 text-[#60A5FA]"
                        : "bg-white/5 border border-white/10 text-[#F8FAFC]/60"
                    }`}>
                      {event.status}
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#60A5FA] transition-colors duration-300">
                      {event.name}
                    </h2>
                    <p className="text-lg text-[#F8FAFC]/60 mb-6">{event.year}</p>

                    <p className="text-[#F8FAFC]/70 mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10">
                          <Calendar className="w-5 h-5 text-[#60A5FA]" />
                        </div>
                        <div>
                          <div className="text-xs text-[#F8FAFC]/50">Date</div>
                          <div className="text-sm text-[#F8FAFC]">{event.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10">
                          <Users className="w-5 h-5 text-[#60A5FA]" />
                        </div>
                        <div>
                          <div className="text-xs text-[#F8FAFC]/50">Participants</div>
                          <div className="text-sm text-[#F8FAFC]">{event.participants}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10">
                          <MapPin className="w-5 h-5 text-[#60A5FA]" />
                        </div>
                        <div>
                          <div className="text-xs text-[#F8FAFC]/50">Location</div>
                          <div className="text-sm text-[#F8FAFC]">{event.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10">
                          <Trophy className="w-5 h-5 text-[#60A5FA]" />
                        </div>
                        <div>
                          <div className="text-xs text-[#F8FAFC]/50">Prize Pool</div>
                          <div className="text-sm text-[#F8FAFC]">{event.prize}</div>
                        </div>
                      </div>
                    </div>

                    {/* View Details */}
                    <div className="flex items-center gap-2 text-[#60A5FA] group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gallery Section */}
          <motion.div
            id="gallery"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
              Event Gallery
            </h2>
            <p className="text-center text-[#F8FAFC]/60 mb-12">
              Moments captured from our previous events
            </p>

            <CoverflowGallery images={galleryImages} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
