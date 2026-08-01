"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, to, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, to]);

  return (
    <span ref={ref}>{prefersReducedMotion ? to : value}</span>
  );
}
