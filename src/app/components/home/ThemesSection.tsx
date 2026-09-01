import React from "react";
import { motion } from "motion/react";
import { Shield, Network, Bot, Star } from "lucide-react";

export const ThemesSection = React.memo(function ThemesSection() {
  const themes = [
    {
      icon: Shield,
      title: "Cybersecurity & Blockchain",
      description: "Build secure, decentralized solutions that protect digital assets and ensure data integrity. Explore cryptography, smart contracts, and distributed ledger technologies.",
      gradient: "from-[#60A5FA]/20 to-[#3B82F6]/10",
      borderGradient: "from-[#60A5FA]/50 to-[#3B82F6]/30",
    },
    {
      icon: Network,
      title: "MCP (Model Context Protocol)",
      description: "Create intelligent systems that leverage contextual understanding to enhance AI model performance. Focus on data integration, context management, and protocol design.",
      gradient: "from-[#3B82F6]/20 to-[#60A5FA]/10",
      borderGradient: "from-[#3B82F6]/50 to-[#60A5FA]/30",
    },
    {
      icon: Bot,
      title: "Agentic AI",
      description: "Develop autonomous AI agents capable of complex decision-making and task execution. Explore reinforcement learning, multi-agent systems, and autonomous workflows.",
      gradient: "from-[#60A5FA]/20 to-[#3B82F6]/10",
      borderGradient: "from-[#60A5FA]/50 to-[#3B82F6]/30",
    },
  ];

  return (
    <section id="themes" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(96,165,250,0.08),transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Hackathon Themes
          </h2>
          <p className="text-base md:text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            Choose your track and build cutting-edge solutions in emerging technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#60A5FA]/20 overflow-hidden">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 p-4 w-fit rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <theme.icon className="w-8 h-8 text-[#60A5FA]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 group-hover:text-[#60A5FA] transition-colors duration-300">
                    {theme.title}
                  </h3>

                  <p className="text-[#F8FAFC]/70 leading-relaxed">
                    {theme.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center gap-2 text-[#60A5FA] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span className="text-sm font-medium">Explore Track</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#60A5FA]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sponsor Specific Track - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 group relative"
        >
          <div className="relative h-full p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#60A5FA]/20 overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-shrink-0">
              <div className="mb-6 md:mb-0 p-4 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Star className="w-8 h-8 text-[#60A5FA]" />
              </div>
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#60A5FA] transition-colors duration-300">
                Sponsor Specific Track
              </h3>
              <p className="text-[#F8FAFC]/70 leading-relaxed">
                This track will be curated in collaboration with the Title Sponsor, allowing them to define a real-world industry problem statement aligned with their domain. Participants will build innovative solutions specifically for this sponsor challenge, giving the sponsor direct exposure to high-quality ideas and talent.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
