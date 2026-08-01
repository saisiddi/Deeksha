import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RulesAccordion } from "@/components/RulesAccordion";
import { RULES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rules & Guidelines | Deeksharambh 2026 · Digital Creators League",
  description:
    "General rules, evaluation criteria, judging process and plagiarism policy for the Digital Creators League — Deeksharambh 2026.",
};

export default function RulesPage() {
  return (
    <>
      <Navbar />
      <main className="grain relative bg-maroon-950 px-4 pb-24 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
              Deeksharambh 2026 · Digital Creators League
            </p>
            <h1 className="font-display text-4xl font-bold italic text-gold-500 sm:text-5xl">
              Rules &amp; Guidelines
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-cream-200 md:text-lg">
              Read these carefully before you register — they cover
              eligibility, originality, how entries are judged, and what gets
              disqualified.
            </p>
          </div>

          <div className="mt-12">
            <RulesAccordion groups={RULES} />
          </div>

          <p className="mt-12 text-center">
            <Link
              href="/#events"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-8 text-sm font-bold text-maroon-950 shadow-[0_8px_32px_rgba(212,175,55,0.4)] transition-transform hover:scale-[1.03]"
            >
              Browse Events &amp; Register
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
