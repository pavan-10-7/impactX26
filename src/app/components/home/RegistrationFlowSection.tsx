import React from "react";
import { motion } from "motion/react";
import { Info, ArrowRight } from "lucide-react";

export const RegistrationFlowSection = React.memo(function RegistrationFlowSection() {
  const steps = [
    {
      title: "Register",
      description: "Click the \"Register\" button to begin your registration process.",
      important: false,
    },
    {
      title: "Complete Individual Registration",
      description: "You will be redirected to the Hack2Skill platform. Every team member must create their own individual account and complete the registration process.",
      important: false,
    },
    {
      title: "Create or Join a Team",
      description: "The Team Leader should create the team on Hack2Skill. Remaining members can join the team using the invitation/team joining option.",
      important: false,
    },
    {
      title: "Complete Payment",
      description: "Complete the registration payment to confirm your team's participation. Your registration is considered successful only after payment is completed.",
      important: true,
    },
    {
      title: "Submit Your Idea",
      description: "Upload a short Idea Presentation (PDF) as part of the registration process.",
      note: "This submission is only for our internal reference and WILL NOT be used for shortlisting or evaluation.",
      important: false,
    },
    {
      title: "You're All Set!",
      description: "We'll see you at ImpactX'26 on 8th October 2026. Get ready for an exciting 24-hour hackathon experience!",
      important: false,
    }
  ];

  return (
    <section id="registration-flow" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent w-full">
            Registration Flow
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto leading-relaxed">
            Follow these simple steps to complete your registration and secure your participation in ImpactX'26.
          </p>
        </motion.div>

        {/* Flow Container */}
        <div className="relative">
          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#60A5FA]/50 via-[#60A5FA]/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
             {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md border ${step.important ? 'border-[#60A5FA]/50 shadow-[0_0_20px_rgba(96,165,250,0.15)]' : 'border-white/10'} shadow-xl flex flex-col h-full group hover:border-white/20 transition-all`}
                >
                  <div className="flex items-center gap-4 mb-5 md:flex-col md:items-start md:gap-4">
                     <div className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-br ${step.important ? 'from-[#60A5FA] to-[#3B82F6] text-white' : 'from-[#60A5FA]/20 to-[#3B82F6]/10 text-[#60A5FA] border border-[#60A5FA]/30'} flex items-center justify-center font-bold text-xl relative z-10`}>
                        {index + 1}
                     </div>
                     <h3 className="text-xl font-semibold text-[#F8FAFC]">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[#F8FAFC]/70 mb-4 flex-grow leading-relaxed">
                    {step.description}
                  </p>
                  {step.note && (
                    <div className="mt-4 p-3 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex gap-3 items-start">
                      <Info className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#F8FAFC]/80 leading-relaxed">{step.note}</p>
                    </div>
                  )}

                  {/* Connectors for desktop */}
                  {index % 3 !== 2 && index !== steps.length - 1 && (
                     <div className="hidden lg:flex absolute top-12 -right-6 translate-x-1/2 -translate-y-1/2 w-8 items-center justify-center text-[#60A5FA]/40 z-0">
                        <ArrowRight className="w-6 h-6" />
                     </div>
                  )}
                  {/* Connectors for tablet */}
                  {index % 2 !== 1 && index !== steps.length - 1 && (
                     <div className="hidden md:flex lg:hidden absolute top-12 -right-6 translate-x-1/2 -translate-y-1/2 w-8 items-center justify-center text-[#60A5FA]/40 z-0">
                        <ArrowRight className="w-6 h-6" />
                     </div>
                  )}
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
});
