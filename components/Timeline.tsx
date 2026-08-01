"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TIMELINE } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thresholdsRef = useRef<number[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const [litCount, setLitCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      thresholdsRef.current = dotRefs.current.map((dot) => {
        if (!dot) return 1;
        const rect = dot.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        const centerWithinList = rect.top - listRect.top + rect.height / 2;
        return Math.min(1, Math.max(0, centerWithinList / list.scrollHeight));
      });
    };
    measure();
    const t = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (prefersReducedMotion) return;
    const lit = thresholdsRef.current.reduce(
      (count, threshold) => count + (value >= threshold ? 1 : 0),
      0,
    );
    setLitCount((prev) => (prev === lit ? prev : lit));
  });

  return (
    <section id="timeline" className="relative bg-maroon-900 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="Timeline" title="Mark Your Calendar" />
        </Reveal>

        <ol ref={listRef} className="relative mx-auto max-w-2xl">
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-6 top-3 w-px bg-gold-500/15 md:left-[1.35rem]"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-3 left-6 top-3 w-px origin-top bg-gradient-to-b from-gold-500 to-gold-400/70 md:left-[1.35rem]"
          />
          {TIMELINE.map((step, index) => {
            const lit = prefersReducedMotion ? true : index < litCount;
            return (
              <li key={step.title} className="flex gap-4 pb-12 last:pb-0 md:gap-6">
                <Reveal delay={0.06 * index} className="flex w-full gap-4 md:gap-6">
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <span
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                      className={`relative grid size-12 place-items-center rounded-full border transition-all duration-500 ${
                        lit
                          ? "border-gold-400/70 bg-maroon-900 text-gold-400 shadow-[0_0_22px_rgba(212,175,55,0.45)]"
                          : "border-gold-500/20 bg-maroon-950 text-cream-200/30"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -inset-1 rounded-full bg-gold-500/15 transition-opacity duration-500 ${
                          lit ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {step.next && !prefersReducedMotion ? (
                        <span
                          aria-hidden="true"
                          className="milestone-ping absolute inset-0 rounded-full bg-gold-500/40"
                        />
                      ) : null}
                      <step.icon className="relative size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div
                    className={`pb-1 pt-2.5 transition-opacity duration-500 ${
                      lit ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
                      {step.date}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold italic text-cream-100 md:text-2xl">
                      {step.title}
                    </h3>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
