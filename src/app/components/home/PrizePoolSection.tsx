import { motion, useSpring, useTransform, useInView } from "motion/react";
import { Trophy, Award, Star, Sparkles } from "lucide-react";
import React, { useRef, useEffect } from "react";

// ... AnimatedNumber implementation ...
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  const displayValue = useTransform(springValue, (current) => 
    `₹${Math.round(current).toLocaleString('en-IN')}`
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export const PrizePoolSection = React.memo(function PrizePoolSection() {
  const topPrizes = [
    {
      icon: Trophy,
      title: "Track Winner 1",
      amount: "₹30,000",
      description: "Cybersecurity & Blockchain",
    },
    {
      icon: Trophy,
      title: "Track Winner 2",
      amount: "₹30,000",
      description: "Model Context Protocol",
    },
    {
      icon: Trophy,
      title: "Track Winner 3",
      amount: "₹30,000",
      description: "Agentic AI",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Prize Pool
          </h2>
          <p className="text-lg text-[#F8FAFC]/60 mb-8">
            Win exciting cash prizes and recognition
          </p>

          {/* Main Prize Pool Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block relative mb-12"
          >
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 backdrop-blur-md border border-[#60A5FA]/30 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-8 h-8 text-[#60A5FA]" />
              </div>
              <div className="absolute -bottom-4 -left-4">
                <Sparkles className="w-8 h-8 text-[#3B82F6]" />
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <Trophy className="w-12 h-12 text-[#60A5FA]" />
                <div className="text-6xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent">
                  <AnimatedNumber value={100000} />
                </div>
              </div>
              <div className="text-xl text-[#F8FAFC]/80">Total Prize Pool</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Prize Cards */}
        <div className="flex flex-col gap-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPrizes.map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10 flex flex-col items-center text-center"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/0 to-[#3B82F6]/0 group-hover:from-[#60A5FA]/5 group-hover:to-[#3B82F6]/5 transition-all duration-300" />
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="mb-4 p-3 w-fit rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <prize.icon className="w-8 h-8 text-[#60A5FA]" />
                  </div>

                  <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">
                    {prize.title}
                  </h3>

                  <div className="text-4xl font-bold text-[#60A5FA] mb-3">
                    {prize.amount}
                  </div>

                  <p className="text-sm text-[#F8FAFC]/60">
                    {prize.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/0 to-[#3B82F6]/0 group-hover:from-[#60A5FA]/5 group-hover:to-[#3B82F6]/5 transition-all duration-300" />
            
            <div className="relative z-10 flex items-center gap-6 flex-col md:flex-row">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-10 h-10 text-[#60A5FA]" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#F8FAFC] mb-1">
                  Best Unique Solution
                </h3>
                <p className="text-base text-[#F8FAFC]/60">
                  Most innovative approach across all tracks
                </p>
              </div>
            </div>
            
            <div className="relative z-10 text-5xl font-bold text-[#60A5FA]">
              ₹10,000
            </div>
          </motion.div>
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#60A5FA]/10 to-[#3B82F6]/10 border border-white/10">
            <Award className="w-6 h-6 text-[#60A5FA]" />
            <span className="text-sm text-[#F8FAFC]/70">
              All participants receive certificates • Winners get mentorship opportunities • Top teams eligible for incubation support
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
