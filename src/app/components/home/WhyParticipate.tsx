import React from "react";
import { motion } from "motion/react";
import { Users, Globe2, Trophy, Rocket } from "lucide-react";

export const WhyParticipate = React.memo(function WhyParticipate() {
  const benefits = [
    {
      icon: Users,
      title: "Mentorship Support",
      description: "Get guidance from industry experts and experienced mentors throughout your journey",
    },
    {
      icon: Globe2,
      title: "Global Impact",
      description: "Build solutions that address real-world problems and make a difference",
    },
    {
      icon: Trophy,
      title: "Recognition & Prizes",
      description: "Win exciting prizes and gain recognition for your innovative solutions",
    },
    {
      icon: Rocket,
      title: "Incubation Opportunities",
      description: "Get access to incubation programs to take your idea to the next level",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Why Participate
          </h2>
          <p className="text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            Join ImpactX 26 and unlock opportunities that go beyond just a hackathon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/0 to-[#3B82F6]/0 group-hover:from-[#60A5FA]/5 group-hover:to-[#3B82F6]/5 transition-all duration-300" />
              
              <div className="relative flex gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-[#60A5FA]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#F8FAFC]/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
