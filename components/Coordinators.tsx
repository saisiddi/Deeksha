import { COORDINATORS } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { PeopleCarousel } from "./PeopleCarousel";

export function Coordinators() {
  return (
    <section
      id="coordinators"
      className="grain relative bg-maroon-900 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Coordinators"
            title="Have Questions? Reach Out"
            description="Questions about registration, submissions, or event guidelines? Contact the Digital Creators League Organizing Committee."
          />
        </Reveal>

        <PeopleCarousel items={COORDINATORS} />
      </div>
    </section>
  );
}
