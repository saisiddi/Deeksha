import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";

export function TeamMessage() {
  return (
    <section
      id="message"
      className="grain relative bg-maroon-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            Message from the Deeksharambh 2026 Team
          </p>
          <h2 className="font-display text-3xl font-bold italic text-gold-500 sm:text-4xl md:text-5xl">
            Every story deserves a stage.
          </h2>
          <p className="mt-3 font-display text-xl italic text-gold-300 sm:text-2xl">
            Every talent deserves recognition.
          </p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/60" />
            <span className="text-gold-500">✦</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/60" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="hairline relative mt-10 rounded-3xl bg-gradient-to-b from-maroon-800/70 to-maroon-900/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-12">
            <span
              aria-hidden="true"
              className="mx-auto -mt-16 grid size-14 place-items-center rounded-full border border-gold-500/40 bg-maroon-900 text-gold-400 shadow-[0_0_22px_rgba(212,175,55,0.25)]"
            >
              <Quote className="size-6" />
            </span>

            <div className="mt-8 space-y-6 text-left font-body text-base leading-relaxed text-cream-100 sm:text-center md:text-lg">
              <p>
                The Deeksharambh 2026 Digital Creators League is a
                celebration of creativity, innovation, and the unique spirit
                of our students. This initiative provides a platform for every
                participant to express ideas, showcase talents, and capture
                the memorable moments that make the beginning of university
                life truly special.
              </p>

              <p>
                For students, it is an opportunity to learn, create,
                collaborate, and build confidence while exploring their
                creative potential. For the Deeksharambh Team, it is a
                meaningful way to encourage student engagement, strengthen
                the university community, and create lasting memories that
                reflect the values and vibrant culture of S-VYASA.
              </p>

              <p>
                Together, let us create, inspire, and celebrate a journey
                where every idea matters, every talent shines, and every
                contribution becomes a part of the Deeksharambh 2026 legacy.
              </p>
            </div>

            <div className="mx-auto mt-10 flex items-center justify-center gap-3">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/60" />
              <span className="text-gold-500">✦</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/60" />
            </div>

            <p className="mt-6 font-display text-2xl font-bold italic text-gold-500 sm:text-3xl">
              Create. Inspire. Celebrate.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
