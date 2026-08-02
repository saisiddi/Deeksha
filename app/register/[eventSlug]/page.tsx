import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventRegistrationForm } from "@/components/EventRegistrationForm";
import { HashtagBlock } from "@/components/HashtagBlock";
import { EVENTS } from "@/lib/constants";

export function generateStaticParams() {
  return EVENTS.map((event) => ({ eventSlug: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventSlug: string }>;
}): Promise<Metadata> {
  const { eventSlug } = await params;
  const event = EVENTS.find((e) => e.id === eventSlug);
  if (!event) return {};
  return {
    title: `${event.name} — Register | Deeksharambh 2026 · Digital Creators League`,
    description: `Register for ${event.name} (${event.theme}) — ${event.description}`,
  };
}

export default async function EventRegisterPage({
  params,
}: {
  params: Promise<{ eventSlug: string }>;
}) {
  const { eventSlug } = await params;
  const event = EVENTS.find((e) => e.id === eventSlug);
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <main className="grain relative bg-maroon-950 px-4 pb-24 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#events"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Events
          </Link>

          <div className="mt-8 text-center">
            <span
              aria-hidden="true"
              className="mx-auto grid size-16 place-items-center rounded-2xl border border-gold-500/35 bg-maroon-900 text-gold-400"
            >
              <event.icon className="size-7" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold italic leading-tight text-gold-500 sm:text-5xl">
              {event.name}
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-cream-100 sm:text-base">
              {event.theme}
            </p>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-cream-200">
              {event.description}
            </p>
          </div>

          <div className="hairline mt-10 rounded-2xl bg-maroon-900/70 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold italic text-gold-500">
              Submission Specs
            </h2>
            <ul className="mt-5 space-y-2.5">
              {event.specs.map((spec) => (
                <li
                  key={spec.label}
                  className="flex items-baseline justify-between gap-3 border-b border-gold-500/15 pb-2 text-sm"
                >
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-cream-200/70">
                    {spec.label}
                  </span>
                  <span className="text-right font-medium text-gold-300">
                    {spec.value}
                  </span>
                </li>
              ))}
            </ul>

            {event.detailSections?.map((section) => (
              <div key={section.heading} className="mt-8 first:mt-8">
                <h3 className="font-display text-lg font-bold italic text-gold-500">
                  {section.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm leading-relaxed text-cream-100 md:text-base"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold-400"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="mt-8 rounded-xl border border-gold-500/25 bg-maroon-800/50 p-4 text-sm text-cream-200">
              General rules apply to every event —{" "}
              <Link
                href="/rules"
                className="font-semibold text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
              >
                read the full Rules &amp; Guidelines
              </Link>
              .
            </p>
          </div>

          <div className="mt-8">
            <HashtagBlock compact />
          </div>

          <div className="mt-12">
            <div className="text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                Registration
              </p>
              <h2 className="font-display text-3xl font-bold italic text-gold-500">
                Claim Your Spotlight
              </h2>
            </div>
            <div className="hairline mt-8 rounded-3xl bg-gradient-to-b from-maroon-800/80 to-maroon-900/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-10">
              <EventRegistrationForm
                eventName={event.name}
                icon={
                  <event.icon
                    className="size-5 shrink-0 text-gold-400"
                    aria-hidden="true"
                  />
                }
              />
            </div>
            <p className="mt-5 text-center text-xs text-cream-200/70">
              Only the fields above are collected — no other personal data is
              stored.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
