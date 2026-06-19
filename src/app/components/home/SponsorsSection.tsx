import { motion } from "motion/react";

interface Sponsor {
  name: string;
  size?: string;
}

export function SponsorsSection() {
  const sponsorCategories: { title: string; sponsors: Sponsor[] }[] = [
    {
      title: "Title Sponsor",
      sponsors: [{ name: "Title Sponsor", size: "large" }],
    },
    {
      title: "Co-Sponsor",
      sponsors: [{ name: "Co-Sponsor 1" }, { name: "Co-Sponsor 2" }],
    },
    {
      title: "Supporting Sponsor",
      sponsors: [
        { name: "Supporting 1" },
        { name: "Supporting 2" },
        { name: "Supporting 3" },
      ],
    },
    {
      title: "Community Partners",
      sponsors: [
        { name: "Partner 1" },
        { name: "Partner 2" },
        { name: "Partner 3" },
        { name: "Partner 4" },
      ],
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000814] to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-transparent">
            Our Sponsors
          </h2>
          <p className="text-lg text-[#F8FAFC]/60">
            Powered by industry leaders and innovation partners
          </p>
        </motion.div>

        <div className="space-y-16">
          {sponsorCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-[#60A5FA] text-center mb-8">
                {category.title}
              </h3>

              <div
                className={`grid gap-6 ${category.sponsors.length === 1
                    ? "grid-cols-1 max-w-md mx-auto"
                    : category.sponsors.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                      : category.sponsors.length === 3
                        ? "grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto"
                        : "grid-cols-2 md:grid-cols-4"
                  }`}
              >
                {category.sponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className={`group relative rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#60A5FA]/10 ${sponsor.size === "large" ? "p-16" : "p-12"
                      }`}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#60A5FA]/0 to-[#3B82F6]/0 group-hover:from-[#60A5FA]/5 group-hover:to-[#3B82F6]/5 transition-all duration-300" />

                    <div className="relative flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-[#F8FAFC]/40 font-medium">
                          {sponsor.name}
                        </div>
                        <div className="mt-2 text-xs text-[#F8FAFC]/20">Logo</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sponsorship CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10">
            <p className="text-lg text-[#F8FAFC]/80">
              Interested in sponsoring ImpactX 26?
            </p>
            <a
              href="mailto:ieeecsrns@gmail.com"
              className="text-[#60A5FA] hover:text-[#3B82F6] transition-colors font-medium"
            >
              ieeecsrns@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
