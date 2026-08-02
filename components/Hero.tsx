"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { CalendarRange } from "lucide-react";
import { useRef, useState } from "react";

const TITLE = "Deeksharambh 2026";

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function burstSpec(index: number, side: "left" | "right") {
  const seed = side === "left" ? index * 7 + 3 : index * 11 + 5;
  const rand = (n: number) => {
    const x = Math.sin((seed + n) * 97.13) * 10000;
    return x - Math.floor(x);
  };
  const inward = side === "left" ? 1 : -1;
  return {
    top: 18 + rand(0) * 60,
    x: inward * (50 + rand(1) * 170),
    y: (rand(2) - 0.5) * 260,
    rotate: rand(3) * 540 - 270,
    dur: 1.1 + rand(4) * 1.1,
    delay: rand(5) * 0.45,
    size: 5 + rand(6) * 7,
  };
}

const BURST_PARTICLES = (["left", "right"] as const).flatMap((side) =>
  Array.from({ length: 12 }, (_, i) => ({ id: `${side}-${i}`, side, ...burstSpec(i, side) })),
);

function HeroBurst() {
  const prefersReducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const completedRef = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 24) setDone(true);
  });

  if (prefersReducedMotion || done) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden md:block"
    >
      {BURST_PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-400"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            [p.side]: 0,
            boxShadow: "0 0 10px rgba(212,175,55,0.7)",
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: p.x,
            y: p.y,
            scale: [0.4, 1, 0.15],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: "easeOut",
            times: [0, 0.25, 0.6, 1],
          }}
          onAnimationComplete={() => {
            completedRef.current += 1;
            if (completedRef.current >= BURST_PARTICLES.length) setDone(true);
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_120%_90%_at_50%_-10%,#4a0e0e_0%,#2b0808_48%,#1a0505_100%)] px-4 pb-20 pt-28 text-center"
    >
      <div aria-hidden="true" className="rays absolute inset-0" />
      <HeroBurst />

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[22rem] italic leading-none text-gold-500/[0.06] md:text-[34rem]"
      >
        ✦
      </motion.span>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <h1
          aria-label={TITLE}
          className="hero-title-metallic font-display font-black leading-[1.06]"
          style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}
        >
          {["Deeksharambh", "2026"].map((word, index) => (
            <motion.span
              key={word}
              className="block whitespace-nowrap"
              initial={
                prefersReducedMotion
                  ? undefined
                  : { clipPath: "inset(-10% 100% -10% 0%)" }
              }
              animate={{ clipPath: "inset(-10% 0% -10% 0%)" }}
              transition={{
                duration: 0.7,
                delay: 0.15 + index * 0.4,
                ease: "easeInOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          {...(prefersReducedMotion ? {} : fade(0.95))}
          className="mt-3 font-display text-2xl font-bold italic text-gold-500 sm:text-3xl md:text-4xl"
        >
          Digital Creators League
        </motion.p>

        <motion.p
          {...(prefersReducedMotion ? {} : fade(1.05))}
          className="mt-5 font-display text-xl italic text-gold-300 sm:text-2xl"
        >
          Create. Trend. Inspire.
        </motion.p>

        <motion.p
          {...(prefersReducedMotion ? {} : fade(1.12))}
          className="mt-4 max-w-xl font-body text-base leading-relaxed text-cream-200 md:text-lg"
        >
          Every creator has a story. Every story deserves a spotlight.
        </motion.p>

        <motion.p
          {...(prefersReducedMotion ? {} : fade(1.18))}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-maroon-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-300 sm:text-sm"
        >
          <CalendarRange className="size-4 text-gold-400" aria-hidden="true" />
          Registration Opens 03 Aug 2026 · Closes 27 Aug 2026
        </motion.p>

        <motion.div
          {...(prefersReducedMotion ? {} : fade(1.25))}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#events"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-8 py-4 text-base font-bold text-maroon-950 shadow-[0_8px_36px_rgba(212,175,55,0.4)] transition-shadow hover:shadow-[0_8px_48px_rgba(212,175,55,0.55)]"
          >
            Register Now
          </motion.a>
          <motion.a
            href="#events"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/40 px-8 py-4 text-base font-semibold text-cream-100 transition-colors hover:border-gold-400/70 hover:text-gold-300"
          >
            Explore Events
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
