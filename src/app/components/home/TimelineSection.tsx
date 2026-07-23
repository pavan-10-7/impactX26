import React from "react";
import { motion } from "motion/react";
import { Calendar, UserCheck, Trophy, Code } from "lucide-react";

export const TimelineSection = React.memo(function TimelineSection() {
  const timeline = [
    {
      icon: Calendar,
      title: "Registrations Open",
      date: "10th August 2026",
      description: "Register your team and get ready for the challenge",
    },
    {
      icon: UserCheck,
      title: "Shortlisting Round",
      date: "21st - 27th September 2026",
      description: "Teams will be shortlisted based on online idea submission",
    },
    {
      icon: Trophy,
      title: "Finalist Announcement",
      date: "28th -29th September 2026",
      description: "Selected teams will participate in the final offline round",
    },
    {
      icon: Code,
      title: "Hackathon Day",
      date: "8th -9th October 2026",
      description: "24 hours of intense coding, building, and innovation",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(96,165,250,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Event Timeline
          </h2>
          <p className="text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            Mark your calendars and stay updated with the event schedule
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#60A5FA]/50 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="inline-block p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10 group">
                    <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-6 h-6 text-[#60A5FA]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#F8FAFC]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#60A5FA] font-medium mb-2">{item.date}</p>
                    <p className="text-[#F8FAFC]/60">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] border-4 border-[#020617] shadow-lg shadow-[#60A5FA]/50 z-10 relative" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note about detailed schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#60A5FA]/10 to-[#3B82F6]/10 border border-white/10">
            <div className="w-2 h-2 bg-[#60A5FA] rounded-full" />
            <span className="text-sm text-[#F8FAFC]/60">
              Detailed hackathon day schedule will be announced closer to the event
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
