"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { EVENTS } from "@/lib/constants";

export function PosterCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
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
      id="posters"
      aria-label="Event posters"
      className="relative bg-maroon-900 px-4 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            The Posters
          </p>
          <h2 className="font-display text-3xl font-bold italic text-gold-500 sm:text-4xl">
            One Poster, One Arena
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-5">
            {EVENTS.map((event) => (
              <div
                key={event.id}
                className="min-w-0 shrink-0 basis-[82%] pl-5 sm:basis-[46%] lg:basis-[32%]"
              >
                <div className="hairline relative aspect-[7/10] overflow-hidden rounded-2xl bg-maroon-900">
                  <Image
                    src={event.poster}
                    alt={`${event.name} poster`}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 82vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-cream-100">
                  {event.displayName ?? event.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2.5">
          {EVENTS.map((event, index) => (
            <button
              key={event.id}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to ${event.name} poster`}
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
          Swipe to browse →
        </p>
      </div>
    </section>
  );
}
