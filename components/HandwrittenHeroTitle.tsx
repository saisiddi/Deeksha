"use client";

import { motion, useReducedMotion } from "framer-motion";
import heroPaths from "@/lib/heroPaths.json";

const STROKE_DURATION = 1.6;
const LINE_STAGGER = 0.3;

export function HandwrittenHeroTitle() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="mx-auto"
      style={{ width: "100%", maxWidth: "min(90vw, 900px)" }}
    >
      <span className="sr-only">Deeksharambh 2026</span>

      <svg
        aria-hidden="true"
        viewBox={heroPaths.viewBox}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="gold-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff9e6" />
            <stop offset="25%" stopColor="#e8c766" />
            <stop offset="50%" stopColor="#b8860b" />
            <stop offset="75%" stopColor="#f5d576" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>

        {heroPaths.lines.map((line, index) => {
          const delay = index * (STROKE_DURATION + LINE_STAGGER);
          return (
            <g key={line.text}>
              <motion.path
                d={line.d}
                fill="none"
                stroke="#e8c766"
                strokeWidth={2}
                strokeLinecap="round"
                initial={
                  prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                }
                animate={{ pathLength: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : STROKE_DURATION,
                  delay: prefersReducedMotion ? 0 : delay,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d={line.d}
                fill="url(#gold-fill)"
                stroke="none"
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion
                    ? 0
                    : delay + STROKE_DURATION - 0.3,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
