import { OBJECTIVES } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative bg-maroon-950 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="About the League"
            title="A Stage for Every New Story"
          />
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <Reveal delay={0.05}>
            <p className="font-body text-base leading-relaxed text-cream-100 md:text-lg">
              Digital Creators League is an online creative contest series
              organized as part of <strong className="font-semibold text-gold-400">Deeksharambh 2026</strong> to
              encourage newly admitted students to showcase their creativity,
              innovation, confidence, and digital storytelling skills.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-cream-200 md:text-lg">
              The competition gives every student an opportunity to express
              themselves through reels, photography, talent performances, and
              yoga — all while celebrating their first experiences at SVYASA.
              It also creates engaging digital content that reflects the
              vibrant campus culture and promotes student participation during
              Deeksharambh 2026.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((objective, index) => (
            <Reveal key={objective.text} delay={0.05 * index}>
              <div className="hairline flex h-full items-start gap-4 rounded-xl bg-maroon-900/70 p-5 transition-colors hover:border-gold-500/50">
                <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-maroon-800 text-gold-400">
                  <objective.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-cream-100 md:text-base">
                  {objective.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
