import React from "react";
import { motion } from "motion/react";
import { Shield, Network, Bot, Star, ExternalLink } from "lucide-react";

const AGENTIC_PROBLEM_STATEMENT_URL = "https://drive.google.com/file/d/1DSUIH3_739kV8pgfjDoS1ZCj47LXpG3Q/view?usp=drive_link";

export const ThemesSection = React.memo(function ThemesSection() {
  const themes = [
    {
      id: "cybersecurity",
      icon: Shield,
      title: "Cybersecurity & Blockchain",
      description: "Build secure, decentralized solutions that protect digital assets and ensure data integrity. Explore cryptography, smart contracts, and distributed ledger technologies.",
      gradient: "from-[#60A5FA]/20 to-[#3B82F6]/10",
      borderGradient: "from-[#60A5FA]/50 to-[#3B82F6]/30",
    },
    {
      id: "mcp",
      icon: Network,
      title: "MCP (Model Context Protocol)",
      description: "Create intelligent systems that leverage contextual understanding to enhance AI model performance. Focus on data integration, context management, and protocol design.",
      gradient: "from-[#3B82F6]/20 to-[#60A5FA]/10",
      borderGradient: "from-[#3B82F6]/50 to-[#60A5FA]/30",
    },
    {
      id: "agentic-ai",
      icon: Bot,
      title: "Agentic AI",
      description: "Develop autonomous AI agents capable of complex decision-making and task execution. Explore reinforcement learning, multi-agent systems, and autonomous workflows.",
      gradient: "from-[#60A5FA]/20 to-[#3B82F6]/10",
      borderGradient: "from-[#60A5FA]/50 to-[#3B82F6]/30",
      hasProblemStatement: true,
    },
  ];

  const hasProblemStatementUrl = Boolean(
    AGENTIC_PROBLEM_STATEMENT_URL && AGENTIC_PROBLEM_STATEMENT_URL.trim().length > 0
  );

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
              <div className="relative h-full p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#60A5FA]/20 overflow-hidden flex flex-col justify-between">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-6 p-4 w-fit rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <theme.icon className="w-8 h-8 text-[#60A5FA]" />
                    </div>

                    <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 group-hover:text-[#60A5FA] transition-colors duration-300">
                      {theme.title}
                    </h3>

                    <p className="text-[#F8FAFC]/70 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  {theme.hasProblemStatement && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      {hasProblemStatementUrl ? (
                        <a
                          href={AGENTIC_PROBLEM_STATEMENT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[#60A5FA] bg-[#60A5FA]/10 hover:bg-[#60A5FA]/20 border border-[#60A5FA]/30 hover:border-[#60A5FA]/60 transition-all duration-300 shadow-sm hover:shadow-[#60A5FA]/20"
                        >
                          <span>View Industry Problem Statement</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-[#F8FAFC]/40 bg-white/5 border border-white/10 cursor-not-allowed opacity-60 transition-all duration-300"
                          title="Problem statement coming soon"
                        >
                          <span>View Industry Problem Statement</span>
                          <ExternalLink className="w-4 h-4 opacity-50" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#60A5FA]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
