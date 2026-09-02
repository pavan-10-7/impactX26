import { Link } from "react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState } from "react";

const generalTerms = [
  {
    title: "Eligibility and Registration",
    content:
      "ImpactX 26 is open to eligible students and participants who complete the registration process with accurate information. Each participant must follow the event instructions and present valid identification when requested.",
  },
  {
    title: "Team Participation",
    content:
      "Participants may compete individually or as part of a registered team, subject to the team-size limits and submission requirements communicated by the organizers. A participant may not be part of multiple teams for the same track.",
  },
  {
    title: "Project Submission and Ownership",
    content:
      "Projects must be created during the event unless an announced track says otherwise. Teams are responsible for ensuring that their submissions are original and do not infringe any third-party intellectual property, privacy, or other rights. Participants retain ownership of their work.",
  },
  {
    title: "Code of Conduct",
    content:
      "All participants are expected to behave respectfully toward other participants, mentors, judges, volunteers, and staff. Harassment, discrimination, cheating, impersonation, abuse of event systems, and disruptive or unsafe behavior may result in disqualification or removal from the event.",
  },
  {
    title: "Judging, Prizes and Event Changes",
    content:
      "Projects will be evaluated according to the criteria announced for the event. The organizers' and judges' decisions are final. The organizers may update the schedule, format, venue, rules, or prize details when necessary and will communicate material changes through official channels.",
  },
];

const paymentTerms = [
  {
    title: "Registration Payment",
    content:
      "The registration fee must be paid in full through the official payment method provided by the organisers.",
  },
  {
    title: "Confirmation",
    content:
      "Registration will be confirmed only after successful payment and verification.",
  },
  {
    title: "Refund Policy",
    content:
      "Registration fees are non-refundable and non-transferable once the payment is successfully completed.",
  },
  {
    title: "Duplicate and Failed Payments",
    content:
      "In case of a duplicate payment, the additional amount may be refunded after verification. If the amount is debited but registration is not confirmed, participants must share the transaction or UTR details with the organisers for verification.",
  },
  {
    title: "Withdrawal, Disqualification and Cancellation",
    content:
      "No refund will be provided if a participant or team withdraws, fails to attend, or is unable to participate. No refund will be provided in case of disqualification due to violation of the hackathon rules or code of conduct. If ImpactX 26 is cancelled by the organisers and is not rescheduled, the registration fee will be refunded as per the organisers' refund procedure.",
  },
];

function TermsAccordion({
  items,
}: {
  items: { title: string; content: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1525]/80 transition-all duration-300 hover:border-[#60A5FA]/25"
          >
            <button
              type="button"
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-7"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold leading-snug text-[#F8FAFC] sm:text-lg">
                {item.title}
              </span>

              <span className="flex size-6 shrink-0 items-center justify-center">
                <ChevronDown
                  className={`size-5 text-[#60A5FA] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 px-6 pb-6 pt-5 sm:px-7">
                  <p className="text-sm leading-7 text-[#F8FAFC]/55">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TermsAndConditions() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <Navbar />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 sm:pt-44">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_50%_18%,rgba(96,165,250,0.16),transparent_62%)]" />

        {/* Header */}
        <header className="mb-16 max-w-3xl">
  <Link
    to="/"
    className="mb-10 inline-flex items-center gap-2 text-sm text-[#F8FAFC]/60 transition-colors hover:text-[#60A5FA]"
  >
    <ArrowLeft className="size-4" />
    Back to ImpactX 26
  </Link>

  <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
    Participant information
  </p>

  <h1 className="mb-5 bg-gradient-to-r from-[#F8FAFC] to-[#60A5FA] bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-7xl">
    Terms &amp; Conditions
  </h1>

  <p className="max-w-2xl text-lg leading-relaxed text-[#F8FAFC]/60">
    Everything you need to know before participating in ImpactX 26.
  </p>
</header>
        {/* Two-column Terms */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* General Terms */}
          <section>
            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
                01
              </p>

              <h2 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
                General Terms &amp; Conditions
              </h2>

              <p className="mt-2 text-sm text-[#F8FAFC]/40">
                Rules and expectations for all participants.
              </p>
            </div>

            <TermsAccordion items={generalTerms} />
          </section>

          {/* Payment Terms */}
          <section>
            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
                02
              </p>

              <h2 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
                Payment Terms &amp; Conditions
              </h2>

              <p className="mt-2 text-sm text-[#F8FAFC]/40">
                Rules governing registration and payments.
              </p>
            </div>

            <TermsAccordion items={paymentTerms} />
          </section>
        </div>

        {/* Acceptance */}
        <div className="mx-auto mt-16 max-w-4xl border-t border-white/10 pt-8">
          <p className="text-center text-sm leading-7 text-[#F8FAFC]/40">
            By registering for or participating in ImpactX 26, and by
            completing any registration payment, you acknowledge that you have
            read, understood, and agree to these terms and the official rules
            of the event. For clarification, contact the organizing team at{" "}
            <a
              href="mailto:ieeecsrns@gmail.com"
              className="text-[#60A5FA] transition-colors hover:underline"
            >
              ieeecsrns@gmail.com
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}