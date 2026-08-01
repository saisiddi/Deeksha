"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { BrandMark } from "./BrandMark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none";
    document.body.prepend(sentinel);
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" },
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold-500/20 bg-maroon-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto grid h-20 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 md:flex md:h-24 md:justify-between"
        aria-label="Main navigation"
      >
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded text-cream-100"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <a
          href="#home"
          className="min-w-0 justify-self-center rounded md:justify-self-start"
          aria-label="S-VYASA â€” Deeksharambh 2026 home"
        >
          <BrandMark logoOnly />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded px-3 py-2 text-sm font-medium text-cream-100/90 transition-colors hover:text-gold-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/#events"
            className="hidden rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-5 py-2.5 text-sm font-bold text-maroon-950 shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-transform hover:scale-[1.03] hover:shadow-[0_4px_28px_rgba(212,175,55,0.5)] md:inline-flex"
          >
            Register Now
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-t border-gold-500/15 bg-maroon-950 md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded px-4 py-3 text-base font-medium text-cream-100/90 transition-colors hover:bg-maroon-800/60 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#events"
                  onClick={closeMenu}
                  className="mt-2 block rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-5 py-3 text-center text-base font-bold text-maroon-950"
                >
                  Register Now
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}


