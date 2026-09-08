import React from "react";
import { motion } from "motion/react";
import { Lightbulb, Users2, Target, TrendingUp, Award } from "lucide-react";

export const AboutSection = React.memo(function AboutSection() {
  const features = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Push the boundaries of technology with cutting-edge solutions",
    },
    {
      icon: Users2,
      title: "Collaboration",
      description: "Work with talented minds from across the nation",
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Tackle real-world challenges with creative solutions",
    },
    {
      icon: TrendingUp,
      title: "Industry Relevance",
      description: "Work on themes that matter in today's tech landscape",
    },
    {
      icon: Award,
      title: "National Exposure",
      description: "Showcase your skills on a prestigious platform",
    },
  ];

  return (
    <section id="about" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            About ImpactX
          </h2>
          <p className="text-base md:text-lg text-[#F8FAFC]/70 max-w-3xl mx-auto leading-relaxed">
            ImpactX 26 is where innovation meets opportunity. A national-level hackathon
            that brings together the brightest minds to build solutions that matter. Over 24 hours,
            participants will collaborate, innovate, and compete to create impactful technology solutions
            under expert mentorship.
          </p>
        </motion.div>

        {/* Timeline-inspired layout */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#60A5FA]/50 to-transparent hidden lg:block" />

          <div className="space-y-8 lg:space-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className={`inline-block p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10 group`}>
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-[#60A5FA]" />
                      </div>
                      <h3 className="text-2xl font-semibold text-[#F8FAFC]">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[#F8FAFC]/60 max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex w-4 h-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] border-4 border-[#020617] shadow-lg shadow-[#60A5FA]/50 z-10" />

                {/* Spacer */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
