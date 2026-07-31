import { MessageCircle, Phone } from "lucide-react";
import { COORDINATORS } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Coordinators() {
  return (
    <section
      id="coordinators"
      className="grain relative bg-maroon-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="Coordinators"
            title="Have Questions? Reach Out"
            description="Questions about registration, submissions, or event guidelines? Contact the Digital Creators League Organizing Committee."
          />
        </Reveal>

        <div className="flex flex-wrap justify-center gap-5">
          {COORDINATORS.map((coordinator, index) => (
            <Reveal
              key={coordinator.name}
              delay={0.05 * index}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1.25rem)]"
            >
              <div className="hairline flex h-full flex-col items-center rounded-2xl bg-maroon-800/60 p-7 text-center transition-colors hover:border-gold-500/50">
                <span
                  className="grid size-16 place-items-center rounded-full border border-gold-500/40 bg-maroon-900 font-display text-2xl font-bold italic text-gold-500"
                  aria-hidden="true"
                >
                  {coordinator.name
                    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <h3 className="mt-4 text-lg font-bold text-cream-100">
                  {coordinator.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-cream-200/70">
                  {coordinator.role}
                </p>

                <div className="mt-5 flex w-full flex-col gap-2.5">
                  <a
                    href={`tel:${coordinator.tel}`}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold-500/35 px-4 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/70 hover:text-gold-300"
                  >
                    <Phone className="size-4 text-gold-400" aria-hidden="true" />
                    {coordinator.phone}
                  </a>
                  <a
                    href={`https://wa.me/${coordinator.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-4 text-sm font-bold text-maroon-950 transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
