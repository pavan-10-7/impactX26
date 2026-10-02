import React from "react";
import { motion } from "motion/react";
import { Code, Clock } from "lucide-react";

export const TimelineSection = React.memo(function TimelineSection() {
  const schedule8Oct = [
    { time: "8:00 AM", activity: "Registration Begins" },
    { time: "9:00 – 11:00 AM", activity: "Inauguration Ceremony" },
    { time: "11:00 AM", activity: "Hackathon Begins" },
    { time: "12:30 PM", activity: "1st Checkpoint" },
    { time: "2:00 – 3:00 PM", activity: "Lunch" },
    { time: "5:00 – 6:00 PM", activity: "Snacks" },
    { time: "6:00 PM", activity: "2nd Checkpoint" },
    { time: "8:30 – 9:30 PM", activity: "Dinner" },
    { time: "10:00 PM", activity: "Lockdown" },
  ];

  const schedule9Oct = [
    { time: "7:00 AM", activity: "Wake-Up Call" },
    { time: "8:00 – 9:00 AM", activity: "Breakfast" },
    { time: "9:30 AM", activity: "Final Evaluation & Last Checkpoint" },
    { time: "11:00 AM", activity: "Hackathon Concludes" },
    { time: "11:30 AM", activity: "Valedictory Ceremony" },
  ];

  const renderScheduleItem = (item: { time: string, activity: string }, globalIndex: number) => {
    const isEven = globalIndex % 2 === 0;
    return (
      <motion.div
        key={item.activity}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (globalIndex % 5) * 0.1 }}
        className={`flex items-center gap-6 md:gap-8 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } flex-row-reverse md:flex-row pl-6 md:pl-0 w-full`}
      >
        {/* Content Card */}
        <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} w-full`}>
          <div className="inline-block p-5 md:p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10 group w-full md:w-auto text-left">
            <div className={`flex flex-col gap-2 ${isEven ? "md:items-end" : "md:items-start"} items-start`}>
              <div className="flex items-center gap-2 text-[#60A5FA]">
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-sm md:text-base tracking-wide">{item.time}</span>
              </div>
              <h3 className="text-base md:text-xl font-bold text-[#F8FAFC]">
                {item.activity}
              </h3>
            </div>
          </div>
        </div>

        {/* Timeline Dot */}
        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] border-4 border-[#020617] shadow-lg shadow-[#60A5FA]/50 z-10 relative" />

        {/* Spacer for alternating layout */}
        <div className="hidden md:block flex-1" />
      </motion.div>
    );
  };

  return (
    <section id="event-timeline" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(96,165,250,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Event Timeline
          </h2>
          <p className="text-base md:text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            Mark your calendars and stay updated with the event schedule
          </p>
        </motion.div>

        {/* Hackathon Day Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-20 text-center relative z-10"
        >
          <div className="inline-block p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-[#60A5FA]/30 shadow-xl shadow-[#60A5FA]/10">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-[#60A5FA]/30">
                <Code className="w-8 h-8 text-[#60A5FA]" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-2">Hackathon Day</h3>
                <p className="text-lg text-[#60A5FA] font-semibold mb-2">8th & 9th October 2026</p>
                <p className="text-[#F8FAFC]/70">24 hours of intense coding, building, and innovation</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#60A5FA]/10 via-[#60A5FA]/40 to-transparent" />

          <div className="space-y-8 md:space-y-12">
            
            {/* 8 OCTOBER HEADING */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex mb-12 z-10"
            >
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-max bg-[#020617] px-6 py-2.5 rounded-full border border-[#60A5FA]/40 shadow-[0_0_20px_rgba(96,165,250,0.15)] text-[#60A5FA] font-bold tracking-widest uppercase text-sm md:text-base">
                8 October
              </div>
              <div className="h-10 w-full" />
            </motion.div>

            {schedule8Oct.map((item, idx) => renderScheduleItem(item, idx))}

            {/* 9 OCTOBER HEADING */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex mb-12 mt-16 z-10"
            >
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-max bg-[#020617] px-6 py-2.5 rounded-full border border-[#60A5FA]/40 shadow-[0_0_20px_rgba(96,165,250,0.15)] text-[#60A5FA] font-bold tracking-widest uppercase text-sm md:text-base">
                9 October
              </div>
              <div className="h-10 w-full" />
            </motion.div>

            {schedule9Oct.map((item, idx) => renderScheduleItem(item, schedule8Oct.length + idx))}

          </div>
        </div>
      </div>
    </section>
  );
});
