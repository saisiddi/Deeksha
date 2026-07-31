import { TIMELINE } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  return (
    <section id="timeline" className="relative bg-maroon-950 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="Timeline" title="Mark Your Calendar" />
        </Reveal>

        <ol className="mx-auto max-w-2xl">
          {TIMELINE.map((step, index) => {
            const isLast = index === TIMELINE.length - 1;
            return (
              <li key={step.title} className="flex gap-4 pb-12 last:pb-0 md:gap-6">
                <Reveal delay={0.06 * index} className="flex w-full gap-4 md:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="grid size-12 place-items-center rounded-full border border-gold-500/50 bg-maroon-900 text-gold-400 shadow-[0_0_18px_rgba(212,175,55,0.25)]">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    {!isLast ? (
                      <span
                        aria-hidden="true"
                        className="mt-2 block w-px flex-1 bg-gradient-to-b from-gold-500/40 to-gold-500/10"
                      />
                    ) : null}
                  </div>
                  <div className="pb-1 pt-2.5">
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
