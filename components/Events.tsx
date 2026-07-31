import { EVENTS } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Events() {
  return (
    <section
      id="events"
      className="grain relative bg-maroon-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Event Categories"
            title="Five Ways to Shine"
            description="Participate in one — or more. Every entry is judged by a panel of faculty members and invited experts."
          />
        </Reveal>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {EVENTS.map((event, index) => (
            <Reveal
              key={event.id}
              delay={0.05 * index}
              className="min-w-[86%] snap-center sm:min-w-[340px] md:min-w-0"
            >
              <article className="hairline flex h-full flex-col rounded-2xl bg-maroon-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 md:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-xl border border-gold-500/35 bg-maroon-900 text-gold-400"
                    aria-hidden="true"
                  >
                    <event.icon className="size-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-cream-200/60">
                    Event {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold italic text-gold-500">
                  {event.name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-cream-100">
                  {event.theme}
                </p>

                <ul className="mt-5 space-y-2">
                  {event.specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex items-baseline justify-between gap-3 border-b border-gold-500/15 pb-1.5 text-sm"
                    >
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-cream-200/70">
                        {spec.label}
                      </span>
                      <span className="text-right font-medium text-gold-300">
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm leading-relaxed text-cream-200">
                  {event.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-cream-200/70 md:hidden">
          Swipe to explore all five events →
        </p>
      </div>
    </section>
  );
}
