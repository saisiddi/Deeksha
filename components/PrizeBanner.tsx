"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Trophy, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PrizeBanner() {
  const [visible, setVisible] = useState(false);
  const [fromBottom] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const dismiss = () => setVisible(false);

  const hidden = fromBottom ? { opacity: 0, y: 48 } : { opacity: 0, x: 72 };
  const shown = { opacity: 1, x: 0, y: 0 };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={hidden}
          animate={shown}
          exit={hidden}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-40 md:inset-x-auto md:bottom-6 md:right-6 md:max-w-sm"
          role="complementary"
          aria-label="Prizes and registration highlight"
        >
          <div className="hairline flex items-start gap-3 rounded-2xl bg-maroon-900 py-3 pl-4 pr-2 shadow-[0_18px_48px_rgba(0,0,0,0.5)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-maroon-800 text-gold-400">
              <Trophy className="size-5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-sm leading-snug text-cream-100">
                <span className="font-semibold text-gold-400">
                  Exciting goodies &amp; cash prizes
                </span>{" "}
                for the Winners and Runners-up!
              </p>
              <Link
                href="/#events"
                className="mt-1.5 inline-flex min-h-8 items-center gap-1.5 text-xs font-bold text-gold-400 transition-colors hover:text-gold-300"
              >
                Register to claim exciting prizes
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss prizes banner"
              className="grid size-9 shrink-0 place-items-center rounded-full text-cream-200/70 transition-colors hover:bg-maroon-800 hover:text-gold-300"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
