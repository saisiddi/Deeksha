"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { COORDINATORS } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Coordinators() {
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
      id="coordinators"
      className="grain relative bg-maroon-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Coordinators"
            title="Have Questions? Reach Out"
            description="Questions about registration, submissions, or event guidelines? Contact the Digital Creators League Organizing Committee."
          />
        </Reveal>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-5">
            {COORDINATORS.map((coordinator) => (
              <div
                key={coordinator.name}
                className="min-w-0 shrink-0 basis-[82%] pl-5 sm:basis-[46%] lg:basis-[31%]"
              >
                <div className="hairline flex h-full flex-col items-center rounded-2xl bg-maroon-800/60 p-7 text-center transition-colors hover:border-gold-500/50">
                  <span className="relative block size-28 overflow-hidden rounded-full border-2 border-gold-500/50 bg-maroon-900 shadow-[0_0_22px_rgba(212,175,55,0.2)]">
                    {coordinator.img ? (
                      <Image
                        src={coordinator.img}
                        alt={`${coordinator.name} photo`}
                        fill
                        sizes="112px"
                        className="object-cover"
                        style={{ objectPosition: coordinator.imgPos ?? "center 25%" }}
                      />
                    ) : (
                      <span
                        className="grid h-full w-full place-items-center font-display text-2xl font-bold italic text-gold-500"
                        aria-hidden="true"
                      >
                        {coordinator.name
                          .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    )}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-cream-100">
                    {coordinator.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-cream-200/70">
                    {coordinator.role}
                  </p>

                  <div className="mt-5 flex w-full flex-col gap-2.5">
                    <a
                      href={`tel:${coordinator.tel}`}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold-500/35 px-4 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/70 hover:text-gold-300"
                    >
                      <Phone className="size-4 text-gold-400" aria-hidden="true" />
                      {coordinator.phone}
                    </a>
                    <a
                      href={`https://wa.me/${coordinator.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-4 text-sm font-bold text-maroon-950 transition-transform hover:scale-[1.02]"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2.5">
          {COORDINATORS.map((coordinator, index) => (
            <button
              key={coordinator.name}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to ${coordinator.name}`}
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
          Swipe to browse the team →
        </p>
      </div>
    </section>
  );
}
