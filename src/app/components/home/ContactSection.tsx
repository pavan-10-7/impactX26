import React from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, Linkedin } from "lucide-react";

const contactPeople = [
  {
    role: "IEEE Chair",
    name: "Pavankumar G Aralikatti",
    email: "pavankumargarallikatti24cy@rnsit.ac.in",
    whatsapp: "917259105691",
    linkedin: "https://www.linkedin.com/in/pavankumar-g-aralikatti-9715aa271/",
  },
  {
    role: "IEEE Vice Chair",
    name: "Nishita Bhat",
    email: "nishitabhat24cy@rnsit.ac.in",
    whatsapp: "919019656767",
    linkedin: "https://www.linkedin.com/in/nishita-bhat-76615b37a/",
  },
];

export const ContactSection = React.memo(function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.08),transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Contact Us
          </h2>

          <p className="text-base md:text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto">
            Need assistance during ImpactX 26? Reach out to our organizing
            team for event-related queries and emergency assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {contactPeople.map((person, index) => (
            <motion.div
              key={person.role}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-7 md:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#60A5FA]/40 transition-all duration-300"
            >
              <p className="text-sm font-medium text-[#60A5FA] mb-2">
                {person.role}
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-[#F8FAFC] mb-6">
                {person.name}
              </h3>

              <div className="space-y-3">
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#60A5FA]/40 transition-all"
                >
                  <Mail className="w-5 h-5 text-[#60A5FA]" />
                  <span className="text-sm text-[#F8FAFC]/70 break-all">
                    {person.email}
                  </span>
                </a>

                <a
                  href={`https://wa.me/${person.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${person.name}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#60A5FA]/40 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-[#60A5FA]" />
                  <span className="text-sm text-[#F8FAFC]/70">
                    WhatsApp
                  </span>
                </a>

                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#60A5FA]/40 transition-all"
                >
                  <Linkedin className="w-5 h-5 text-[#60A5FA]" />
                  <span className="text-sm text-[#F8FAFC]/70">
                    LinkedIn
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});