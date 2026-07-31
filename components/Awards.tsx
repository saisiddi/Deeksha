import { Award, Medal, Users } from "lucide-react";
import { AWARDS } from "@/lib/constants";
import { Reveal } from "./Reveal";

export function Awards() {
  const stats = [
    {
      icon: Award,
      value: `${AWARDS.winners} Category Winners`,
      note: "A cash prize for every winning entry",
    },
    {
      icon: Users,
      value: "Certificates of Achievement",
      note: "Winners, Runner-up & Second Runner-up",
    },
    {
      icon: Medal,
      value: "Certificates of Participation",
      note: "All valid participants",
    },
  ];

  return (
    <section
      id="awards"
      className="grain relative border-y border-gold-500/20 bg-maroon-900 px-4 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
              Awards & Recognition
            </p>
            <h2 className="font-display text-3xl font-bold italic text-gold-500 sm:text-4xl">
              Great Work Deserves a Spotlight
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.value} delay={0.06 * index}>
              <div className="hairline flex h-full flex-col items-center gap-3 rounded-2xl bg-maroon-800/60 p-7 text-center">
                <span className="grid size-12 place-items-center rounded-full border border-gold-500/40 bg-maroon-900 text-gold-400">
                  <stat.icon className="size-6" aria-hidden="true" />
                </span>
                <p className="text-base font-bold text-cream-100 md:text-lg">
                  {stat.value}
                </p>
                <p className="text-sm text-cream-200">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-cream-200">
            Prizes and certificates are presented at the Deeksharambh 2026
            Valedictory Ceremony.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
