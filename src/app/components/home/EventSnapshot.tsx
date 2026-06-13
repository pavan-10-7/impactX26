import React from "react";
import { motion } from "motion/react";
import { Users, Clock, GraduationCap, Globe, Lightbulb, Award } from "lucide-react";

export const EventSnapshot = React.memo(function EventSnapshot() {
  const cards = [
    {
      icon: Globe,
      title: "Offline Hackathon",
      description: "In-person collaborative experience",
    },
    {
      icon: Users,
      title: "Team Size: 2-4 Members",
      description: "Build with your squad",
    },
    {
      icon: GraduationCap,
      title: "Open to B.E/B.Tech & MCA Students",
      description: "All years welcome",
    },
    {
      icon: Clock,
      title: "24 Hours",
      description: "Non-stop innovation",
    },
    {
      icon: Award,
      title: "National Level",
      description: "Compete across India",
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "Create impactful solutions",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.05),transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Event Snapshot
          </h2>
          <p className="text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            A premium hackathon experience designed for innovation and collaboration
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/0 to-[#3B82F6]/0 group-hover:from-[#60A5FA]/5 group-hover:to-[#3B82F6]/5 transition-all duration-300" />
              
              <div className="relative">
                <div className="mb-4 p-3 w-fit rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-6 h-6 text-[#60A5FA]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#F8FAFC]/60">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* IEEE Computer Society Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#60A5FA]/10 to-[#3B82F6]/10 border border-white/10">
            <div className="w-2 h-2 bg-[#60A5FA] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#F8FAFC]/80">
              Organized by IEEE Computer Society RNSIT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
