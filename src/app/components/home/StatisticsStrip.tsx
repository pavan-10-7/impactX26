import React from "react";
import { motion } from "motion/react";
import { Clock, Trophy, Users, Building2, Globe } from "lucide-react";

export const StatisticsStrip = React.memo(function StatisticsStrip() {
  const stats = [
    { icon: Clock, value: "24 Hours", label: "Hackathon" },
    { icon: Trophy, value: "₹75,000", label: "Prize Pool" },
    { icon: Users, value: "150+", label: "Participants" },
    { icon: Building2, value: "20+", label: "Colleges" },
    { icon: Globe, value: "National", label: "Level Event" },
  ];

  return (
    <section className="relative py-16 border-y border-white/10 bg-gradient-to-r from-[#000814] via-[#020617] to-[#000814]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-[#60A5FA]/10 to-[#3B82F6]/5 border border-white/10 group-hover:border-[#60A5FA]/50 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-[#60A5FA]" />
              </div>
              <div className="text-3xl font-bold text-[#F8FAFC] mb-1">{stat.value}</div>
              <div className="text-sm text-[#F8FAFC]/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
