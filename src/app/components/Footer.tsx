import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = React.memo(function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-computer-society-rnsit", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/computer_society_rnsit_/", label: "Instagram" },
    //{ icon: Youtube, href: "#", label: "YouTube" },
  ];

  const contactInfo = [
    { icon: Mail, text: "ieeecsrns@gmail.com", href: "mailto:ieeecsrns@gmail.com" },
    { icon: Phone, text: "+91 72591 05691", href: "tel:+917259105691" },
    {
      icon: MapPin,
      text: "RNS Institute of Technology, Bangalore",
      href: "https://www.google.com/maps/search/?api=1&query=RNS+Institute+of+Technology+Bengaluru",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <footer
  id="contact"
  className="relative py-16 border-t border-white/10 bg-gradient-to-b from-[#020617] to-[#000814] overflow-hidden"
>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.05),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
              ImpactX 26
            </h3>
            <p className="text-[#F8FAFC]/60 mb-4">
              A national-level 24-hour hackathon organized by IEEE Computer Society RNSIT and Department of CSE (Cyber Security).
            </p>
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#60A5FA]/10 to-[#3B82F6]/10 border border-white/10">
              <span className="text-sm text-[#60A5FA] font-medium">IEEE Computer Society RNSIT</span>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="flex items-start gap-3 text-[#F8FAFC]/60 hover:text-[#60A5FA] transition-colors group"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{item.text}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#60A5FA]/20 group"
                >
                  <social.icon className="w-5 h-5 text-[#F8FAFC]/60 group-hover:text-[#60A5FA] group-hover:scale-110 transition-all" />
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10">
              <p className="text-sm text-[#F8FAFC]/60">
                Stay updated with the latest announcements and event updates
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-white/10 text-center"
        >
          <p className="text-sm text-[#F8FAFC]/40">
            © {new Date().getFullYear()} ImpactX 26. Organized by IEEE Computer Society RNSIT & Department of CSE (Cyber Security). All rights reserved.
          </p>
          <Link
            to="/terms-and-conditions"
            className="mt-3 inline-block text-sm text-[#F8FAFC]/50 transition-colors hover:text-[#60A5FA]"
          >
            Terms &amp; Conditions
          </Link>
        </motion.div>
      </div>
    </footer>
  );
});
