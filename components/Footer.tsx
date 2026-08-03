import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { BrandMark } from "./BrandMark";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";

const SOCIALS = [
  {
    label: "S-VYASA on LinkedIn",
    href: "https://www.linkedin.com/company/s-vyasa-global-city-campus/posts/?feedView=all",
    icon: LinkedinIcon,
  },
  {
    label: "S-VYASA on Instagram",
    href: "https://www.instagram.com/svyasa.university?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: InstagramIcon,
  },
  {
    label: "S-VYASA on Facebook",
    href: "https://www.facebook.com/svyasayoga",
    icon: FacebookIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-maroon-950 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <BrandMark logoOnly />
          <p className="max-w-xs text-center text-sm leading-relaxed text-cream-200/70 md:text-left">
            Deeksharambh 2026 · Digital Creators League — an online creative
            contest series for newly admitted students of S-VYASA.
          </p>
          <ul className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition-all hover:-translate-y-0.5 hover:border-gold-400/80 hover:bg-gold-500/10 hover:text-gold-300 hover:shadow-[0_0_18px_rgba(212,175,55,0.3)]"
                >
                  <social.icon className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream-200/80 transition-colors hover:text-gold-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-center md:text-right">
          <Link
            href="/#events"
            className="inline-flex min-h-11 items-center rounded-full border border-gold-500/40 px-5 text-sm font-bold text-gold-400 transition-colors hover:border-gold-400/70 hover:text-gold-300"
          >
            Register Now
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-gold-500/15 pt-6">
        <p className="text-center text-sm text-cream-200/70">
          © 2026 S-VYASA Deemed to be University. All rights reserved.
        </p>
        <p className="mt-2 text-center text-xs text-cream-200/50">
          Developed by{" "}
          <a
            href="mailto:143saisiddi@gmail.com"
            className="text-gold-400/90 transition-colors hover:text-gold-300"
          >
            Kalmadi Saisiddi
          </a>{" "}
          · 143saisiddi@gmail.com
        </p>
      </div>
    </footer>
  );
}
