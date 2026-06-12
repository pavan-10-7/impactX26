import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export function Team() {
  const [selectedYear, setSelectedYear] = useState("2026-27");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const years = ["2026-27", "2025-26"];

  // Team data structure
  const teamData = {
    "2026-27": {
      hod: {
        name: "Dr. Abhijith H V",
        role: "Head of Department",
        department: "CSE (Cyber Security)",
        linkedin: "#",
      },
      facultyAdvisor: {
        name: "Prof. Swathi Darla",
        role: "Faculty Advisor",
        department: "IEEE Computer Society",
        linkedin: "#",
      },
      coreTeam: [
        { name: "Pavankumar G Aralikatti", role: "Chair", linkedin: "#" },
        { name: "Nishita Bhat", role: "Vice Chair", linkedin: "#" },
        { name: "Tanmayi Prashanth", role: "Secretary", linkedin: "#" },
        { name: "Gokul S", role: "Treasurer", linkedin: "#" },
        { name: "Bhoomika S", role: "Webmaster", linkedin: "#" },
        { name: "Tanushree M", role: "Ex-Com", linkedin: "#" },
      ],
    },
    "2025-26": {
      hod: {
        name: "Dr. Kiran P",
        role: "Head of Department",
        department: "CSE (Cyber Security)",
        linkedin: "#",
      },
      facultyAdvisor: {
        name: "Prof. Swathi Darla",
        role: "Faculty Advisor",
        department: "IEEE Computer Society",
        linkedin: "#",
      },
      coreTeam: [
        { name: "Nithyashree", role: "Chair", linkedin: "#" },
        { name: "Siri V Hegde", role: "Vice Chair", linkedin: "#" },
        { name: "Dev Kukreja", role: "Secretary", linkedin: "#" },
        { name: "Mukund", role: "Treasurer", linkedin: "#" },
        { name: "Anirudh M", role: "Joint Treasurer", linkedin: "#" },
        { name: "Rithika", role: "Webmaster", linkedin: "#" },
        { name: "Chetana", role: "Ex-Com", linkedin: "#" },
      ],
    },
  };

  const currentTeam = teamData[selectedYear as keyof typeof teamData];

  const MemberCard = ({ member, isLarge = false }: { member: any; isLarge?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <div className={`relative ${isLarge ? "p-8" : "p-6"} rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10`}>
        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/0 to-[#3B82F6]/0 group-hover:from-[#60A5FA]/5 group-hover:to-[#3B82F6]/5 transition-all duration-300" />

        <div className="relative z-10">
          {/* Photo Placeholder */}
          <div className={`${isLarge ? "w-32 h-32" : "w-24 h-24"} mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            <div className="text-[#F8FAFC]/30 text-xs">Photo</div>
          </div>

          {/* Name */}
          <h3 className={`${isLarge ? "text-xl" : "text-lg"} font-semibold text-[#F8FAFC] text-center mb-1`}>
            {member.name}
          </h3>

          {/* Role */}
          <p className="text-[#60A5FA] text-center text-sm font-medium mb-1">
            {member.role}
          </p>

          {/* Department (for HOD and Faculty) */}
          {member.department && (
            <p className="text-[#F8FAFC]/50 text-center text-xs mb-3">
              {member.department}
            </p>
          )}

          {/* LinkedIn */}
          {member.linkedin && (
            <div className="flex justify-center mt-4">
              <a
                href={member.linkedin}
                className="p-2 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#60A5FA]" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

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
              Our Team
            </h1>
            <p className="text-xl text-[#F8FAFC]/60">
              Meet the people behind ImpactX
            </p>
          </motion.div>

          {/* Year Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-16"
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedYear === year
                    ? "bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-white shadow-lg shadow-[#60A5FA]/30"
                    : "bg-white/5 text-[#F8FAFC]/60 border border-white/10 hover:border-[#60A5FA]/50 hover:text-[#F8FAFC]"
                }`}
              >
                {year}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* HOD and Faculty Advisor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-[#F8FAFC]">
              Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <MemberCard member={currentTeam.hod} isLarge />
              <MemberCard member={currentTeam.facultyAdvisor} isLarge />
            </div>
          </motion.div>

          {/* Office Bearers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-[#F8FAFC]">
              Office Bearers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {currentTeam.coreTeam.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
