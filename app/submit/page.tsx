import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Share2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HashtagBlock } from "@/components/HashtagBlock";
import { SubmissionForm } from "@/components/SubmissionForm";
import { SUBMISSION_EVENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Submit Your Entry | Deeksharambh 2026 · Digital Creators League",
  description:
    "Already registered for Deeksharambh 2026 — Digital Creators League? Submit your reel, video or photo entry here with a Google Drive link.",
};

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event: eventSlug } = await searchParams;
  const prefillEvent = eventSlug
    ? SUBMISSION_EVENTS.find((event) => event.id === eventSlug)
    : undefined;

  return (
    <>
      <Navbar />
      <main className="grain relative bg-maroon-950 px-4 pb-24 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto grid size-16 place-items-center rounded-2xl border border-gold-500/35 bg-maroon-900 text-gold-400"
            >
              <Share2 className="size-7" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold italic text-gold-500 sm:text-5xl">
              Submit Your Entry
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-cream-200 md:text-lg">
              Already registered? Paste your entry&apos;s Drive link here.
              Remember — submissions must follow the{" "}
              <Link
                href="/rules"
                className="font-semibold text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
              >
                Rules &amp; Guidelines
              </Link>{" "}
              and include the mandatory hashtags below. Videos on Drive must
              be shared as &quot;Anyone with the link&quot;.
            </p>
          </div>

          <div className="mt-8">
            <HashtagBlock compact />
          </div>

          <div className="mt-12">
            <div className="text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                Submission
              </p>
              <h2 className="font-display text-3xl font-bold italic text-gold-500">
                Your Entry Details
              </h2>
            </div>
            <div className="hairline mt-8 rounded-3xl bg-gradient-to-b from-maroon-800/80 to-maroon-900/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-10">
              <SubmissionForm prefillEventName={prefillEvent?.name} />
            </div>
            <p className="mt-5 text-center text-xs text-cream-200/70">
              Only the fields above are collected — no other personal data is
              stored.
            </p>

            <p className="mt-8 text-center">
              <Link
                href="/#events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
              >
                Not registered yet? Browse events to register
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
