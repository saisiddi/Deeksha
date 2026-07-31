"use client";

import { motion } from "framer-motion";
import { CalendarRange, ChevronDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_120%_90%_at_50%_-10%,#4a0e0e_0%,#2b0808_48%,#1a0505_100%)] px-4 pb-20 pt-28 text-center"
    >
      <div aria-hidden="true" className="rays absolute inset-0" />

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[22rem] italic leading-none text-gold-500/[0.06] md:text-[34rem]"
      >
        ✦
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center"
      >
        <motion.p
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-maroon-800/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm sm:text-sm"
        >
          <CalendarRange className="size-4 text-gold-400" aria-hidden="true" />
          Registration Opens 03 Aug 2026 · Closes 27 Aug 2026
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-bold italic leading-[1.05] text-gold-500 drop-shadow-[0_6px_30px_rgba(212,175,55,0.25)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Deeksharambh 2026
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-lg font-semibold uppercase tracking-[0.35em] text-cream-100 sm:text-xl md:text-2xl"
        >
          Digital Creators League
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 font-display text-xl italic text-gold-300 sm:text-2xl"
        >
          Create. Trend. Inspire.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl text-base leading-relaxed text-cream-200 md:text-lg"
        >
          Every creator has a story. Every story deserves a spotlight.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <motion.a
            href="#register"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-8 py-4 text-base font-bold text-maroon-950 shadow-[0_8px_36px_rgba(212,175,55,0.4)] transition-shadow hover:shadow-[0_8px_48px_rgba(212,175,55,0.55)]"
          >
            Register Now
            <ChevronDown className="size-5" aria-hidden="true" />
          </motion.a>
          <motion.a
            href="#events"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/40 px-8 py-4 text-base font-semibold text-cream-100 transition-colors hover:border-gold-400/70 hover:text-gold-300"
          >
            Explore Events
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
