import { JUDGES } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { PeopleCarousel } from "./PeopleCarousel";

export function JudgingPanel() {
  return (
    <section
      id="judging"
      className="grain relative bg-maroon-950 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Judging Panel"
            title="Meet the Experts"
            description="The faculty and experts evaluating your creativity — two judges assigned to each event category."
          />
        </Reveal>

        <PeopleCarousel items={JUDGES} />
      </div>
    </section>
  );
}
