import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is ImpactX 26?",
    answer:
      "ImpactX 26 is a 24-hour national-level offline hackathon organized by IEEE Computer Society RNSIT and the Department of CSE (Cyber Security).",
  },
  {
    question: "When is ImpactX 26 happening?",
    answer:
      "ImpactX 26 will be held on 8th & 9th Oct, 2026 at RNS Institute of Technology, Bangalore.",
  },
  {
    question: "What is the last date to register?",
    answer:
      "Registrations close on 2nd October 2026.",
  },
  {
    question: "How many members can be there in a team?",
    answer:
      "Each team can have 2 to 4 members.",
  },
  {
    question: "What is the registration fee?",
    answer:
      "The registration fee is ₹1299 per team.",
  },
  {
    question: "Is the hackathon online or offline?",
    answer:
      "ImpactX 26 is an offline hackathon conducted at RNS Institute of Technology, Bangalore.",
  },
];

export const FAQSection = React.memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.08),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <p className="text-base md:text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            Everything you need to know about ImpactX 26
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-[#F8FAFC]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#60A5FA] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-[#F8FAFC]/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});