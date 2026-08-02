"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { EVENTS } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Events() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      breakpoints: { "(min-width: 768px)": { active: false } },
    },
    [
      Autoplay({
        delay: 4500,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <section
      id="events"
      className="grain relative bg-maroon-950 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Event Categories"
            title="Six Ways to Shine"
            description="Pick an event to see its full details and register. Entering more than one? Register separately for each event."
          />
        </Reveal>

        <div className="overflow-hidden md:overflow-visible" ref={emblaRef}>
          <div className="flex -ml-5 md:ml-0 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {EVENTS.map((event, index) => (
              <div
                key={event.id}
                className="min-w-0 shrink-0 basis-[80%] pl-5 sm:basis-[46%] md:basis-auto md:shrink md:pl-0"
              >
                <Reveal delay={0.05 * index} className="h-full">
                  <article className="hairline flex h-full flex-col rounded-2xl bg-maroon-800/60 p-6 transition-all duration-300 active:scale-[1.02] hover:-translate-y-1 hover:border-gold-500/60 md:p-7">
                    <div className="mb-5 flex items-center justify-between">
                      <span
                        className="grid size-14 shrink-0 place-items-center rounded-xl border border-gold-500/35 bg-maroon-900 text-gold-400 transition-colors group-hover:border-gold-500/60"
                        aria-hidden="true"
                      >
                        <event.icon className="size-6" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-cream-200/60">
                        Event {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="min-h-[2.3em] font-display text-2xl font-bold italic text-gold-500">
                      {event.displayName ?? event.name}
                    </h3>
                    <p className="mt-1 min-h-[2.6em] text-sm font-semibold uppercase tracking-[0.15em] text-cream-100">
                      {event.theme}
                    </p>

                    <p className="mt-4 font-body text-sm leading-relaxed text-cream-200">
                      {event.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {event.specs.map((spec) => (
                        <li
                          key={spec.label}
                          className="flex items-baseline justify-between gap-3 border-b border-gold-500/15 pb-1.5 text-sm"
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

                    <div className="mt-auto pt-6">
                      <Link
                        href={`/register/${event.id}`}
                        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 text-sm font-bold text-gold-400 transition-colors hover:border-gold-400/70 hover:bg-gold-500/10 hover:text-gold-300"
                      >
                        View Details &amp; Register
                        <ArrowRight
                          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2.5 md:hidden">
          {EVENTS.map((event, index) => (
            <button
              key={event.id}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to ${event.displayName ?? event.name}`}
              aria-current={index === selected}
              className={`size-2.5 rounded-full transition-all duration-300 ${
                index === selected
                  ? "scale-x-[2.6] bg-gold-500 opacity-100"
                  : "bg-gold-500/30 opacity-70 hover:bg-gold-500/60"
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-cream-200/70 md:hidden">
          Swipe to explore all six events →
        </p>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center">
            <Link
              href="/rules"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
            >
              Read full Rules &amp; Guidelines
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
