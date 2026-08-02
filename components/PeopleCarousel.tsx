"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { PersonCard, type Person } from "./PersonCard";

export function PeopleCarousel({ items }: { items: Person[] }) {
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
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-5">
          {items.map((person) => (
            <div
              key={`${person.name}-${person.role}`}
              className="min-w-0 shrink-0 basis-[82%] pl-5 sm:basis-[46%] lg:basis-[31%]"
            >
              <PersonCard person={person} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2.5">
        {items.map((person, index) => (
          <button
            key={`${person.name}-${person.role}`}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to ${person.name}`}
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
    </>
  );
}
