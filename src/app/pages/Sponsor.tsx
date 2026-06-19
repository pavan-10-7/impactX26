import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router";
import {
  Briefcase,
  Mail,
  Download,
  ArrowRight,
  Instagram,
  Linkedin,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
      <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
      {children}
    </span>
  );
}

function GlowOrb({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}
export function Sponsor() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
        }}
      />

      {/* HERO */}
      <section className="relative px-4 pt-40 sm:pt-48">
        <GlowOrb className="left-1/2 top-10 size-[520px] -translate-x-1/2 bg-primary/15 animate-pulse-glow" />
        <GlowOrb className="-left-20 top-60 size-[320px] bg-accent/20" />
        <GlowOrb className="-right-20 top-40 size-[320px] bg-primary/15" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative mx-auto max-w-5xl text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionTag>Sponsor ImpactX '26</SectionTag>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-5xl font-bold leading-[1.05] text-gradient sm:text-7xl md:text-[5.5rem]"
          >
            Power the builders<br className="hidden sm:block" /> shaping tomorrow.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Partner with Us.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.72_0.22_255_/_0.7)] transition-transform hover:-translate-y-0.5"
            >
              Become a Sponsor
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/ImpactX26-Brochure.pdf"
              className="glass-pill inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/[0.04]"
            >
              <Download className="size-4" /> Download Brochure
            </a>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { k: "150+", v: "Participants" },
              { k: "24h", v: "Build sprint" },
              { k: "25+", v: "Colleges" },
              { k: "₹1 Lakh", v: "Prize pool" },
            ].map((s) => (
              <div key={s.v} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-gradient sm:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* BROCHURE */}
      <section id="brochure" className="relative px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card relative overflow-hidden rounded-[2rem] p-8 sm:p-12"
          >
            <GlowOrb className="-right-20 -top-20 size-80 bg-primary/25" />
            <GlowOrb className="-bottom-20 -left-20 size-80 bg-accent/20" />

            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <SectionTag>Sponsorship Deck</SectionTag>
                <h2 className="mt-5 text-4xl font-bold leading-tight text-gradient sm:text-5xl">
                  The full pitch, in one PDF.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Everything — tiers, deliverables, audience demographics, past coverage, and
                  how we'll bring your brand to life across the 24 hours.
                </p>
                <a
                  href="/ImpactX26-Brochure.pdf"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.72_0.22_255_/_0.7)] transition-transform hover:-translate-y-0.5"
                >
                  <Download className="size-4" /> Download Brochure (PDF)
                </a>
              </div>

              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-card glow-ring relative mx-auto aspect-[3/4] w-56 rounded-2xl p-5"
                >
                  <div className="text-[0.6rem] uppercase tracking-[0.2em] text-primary">
                    ImpactX '26
                  </div>
                  <div className="mt-4 text-xl font-bold leading-tight text-foreground">
                    Sponsorship Brochure
                  </div>
                  <div className="mt-3 h-px bg-white/10" />
                  <div className="mt-3 space-y-1.5">
                    {["Why ImpactX", "About us", "Tiers", "Deliverables", "Contact"].map(
                      (l) => (
                        <div
                          key={l}
                          className="flex items-center gap-2 text-[0.7rem] text-muted-foreground"
                        >
                          <span className="size-1 rounded-full bg-primary/70" />
                          {l}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-[0.55rem] uppercase tracking-widest text-muted-foreground">
                    IEEE CS(CYBERSECURITY) · RNSIT
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* PREVIOUS EDITIONS */}
<Section
  id="gallery"
  tag="Our Legacy"
  title="Explore Previous Editions"
>
  <div className="-mt-8 glass-card rounded-3xl p-8 text-center">
    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
      Discover highlights, achievements, participant experiences,
      media coverage, and memorable moments from our previous events.
    </p>

    <Link
    to="/events#gallery"
    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.72_0.22_255_/_0.7)] transition-transform hover:-translate-y-0.5"
    >
      View Gallery
      <ArrowRight className="size-4" />
    </Link>
  </div>
</Section>
      {/* CONTACT */}
      <Section id="contact" tag="Get in Touch" title="Talk to the sponsorship team.">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Briefcase,
              role: "CHAIR",
              name: "Pavankumar G Aralikatti\u00a0",
              email: "pavankumargarallikatti24cy.rnsit.ac.in",
            },
            {
              icon: ShieldCheck,
              role: "Faculty Coordinator",
              name: "Dr. Swathi Darla",
              email: "swathidarla@rnsit.ac.in",
            },
          ].map((c) => (
            <div key={c.name} className="glass-card rounded-3xl p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-primary">
                    {c.role}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-foreground">{c.name}</div>
                </div>
                <div className="glass-pill grid size-12 shrink-0 place-items-center rounded-2xl text-primary">
                  <c.icon className="size-5" strokeWidth={1.6} />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Mail className="size-4 text-primary" />
                  {c.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-card relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <GlowOrb className="left-1/2 top-0 size-[500px] -translate-x-1/2 -translate-y-1/2 bg-primary/30 animate-pulse-glow" />
          <div className="relative">
            <SectionTag>Final Call</SectionTag>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] text-gradient sm:text-6xl">
              Build the next generation of talent&nbsp;
              <br />
              &nbsp;with your name on it.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              {"\n"}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_50px_-10px_oklch(0.72_0.22_255_/_0.8)] transition-transform hover:-translate-y-0.5"
              >
                Become a Sponsor
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/"className="glass-pill inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/[0.04]"
              >
                Back to home
                </a>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}

function Section({
  id,
  tag,
  title,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <SectionTag>{tag}</SectionTag>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] text-gradient sm:text-5xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
