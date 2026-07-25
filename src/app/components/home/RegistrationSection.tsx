import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Users, IndianRupee, Calendar, Clock, AlignCenter } from "lucide-react";

export const RegistrationSection = React.memo(function RegistrationSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date (example: March 1, 2027)
    const targetDate = new Date("2026-10-09T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const registrationDetails = [
    {
      icon: IndianRupee,
      label: "Registration Fee",
      value: "₹1299 per team",
    },
    {
      icon: Users,
      label: "Team Size",
      value: "2-4 Members",
    },
    {
      icon: Calendar,
      label: "Registration Deadline",
      value: "September 20, 2026",
    },
  ];

  return (
    <section id="registration" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.15),transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent w-full">
            Registration
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#F8FAFC]/60 max-w-[280px] sm:max-w-md md:max-w-none mx-auto leading-relaxed">
            Secure your spot in India's most prestigious hackathon
          </p>
        </motion.div>

        {/* Main Registration Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-6 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md border border-white/10 shadow-2xl"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/10 to-[#3B82F6]/10" />

          <div className="relative z-10">
            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-[#60A5FA] hidden sm:block" />
                <h3 className="text-lg sm:text-xl font-semibold text-[#F8FAFC] text-center">Registration Closes In</h3>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto">
                {[
                  { label: "Days", value: timeLeft.days, align: 'centre' },
                  { label: "Hours", value: timeLeft.hours, align: 'centre' },
                  { label: "Min", value: timeLeft.minutes, align: 'centre' },
                  { label: "Sec", value: timeLeft.seconds, align: 'centre' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10"
                  >
                    <div className="text-2xl md:text-4xl font-bold text-[#60A5FA] mb-1">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-[#F8FAFC]/60 uppercase tracking-wide">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {registrationDetails.map((detail, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-[#60A5FA]/20 to-[#3B82F6]/10 border border-white/10">
                      <detail.icon className="w-5 h-5 text-[#60A5FA]" />
                    </div>
                    <h4 className="text-sm text-[#F8FAFC]/60">{detail.label}</h4>
                  </div>
                  <p className="text-lg font-semibold text-[#F8FAFC]">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Important Information */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#60A5FA]/10 to-[#3B82F6]/10 border border-[#60A5FA]/20">
              <h4 className="text-sm font-semibold text-[#60A5FA] mb-2">Important Information</h4>
              <ul className="text-sm text-[#F8FAFC]/70 space-y-2">
                <li>• Teams will be shortlisted based on idea submissions</li>
                <li>• Selected teams will receive confirmation via email</li>
                <li>• Registration deadline will not be extended</li>
                <li>• All team members must be current students (B.E/B.Tech/MCA)</li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-[#60A5FA]/50 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </Button>
              <p className="mt-4 text-sm text-[#F8FAFC]/50">
                Limited spots available. Register early to secure your team's place.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
