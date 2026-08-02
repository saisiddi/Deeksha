import { Scale, Sparkles, Users } from "lucide-react";
import type { IconType } from "@/lib/constants";
import { COMMITTEES, EVENTS } from "@/lib/constants";
import { Reveal } from "./Reveal";

function CardHeader({
  icon: Icon,
  title,
  designation,
}: {
  icon: IconType;
  title: string;
  designation: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-maroon-900 text-gold-400 shadow-[0_0_14px_rgba(212,175,55,0.18)]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-xl font-bold italic text-gold-500">
          {title}
        </h3>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300/80">
          {designation}
        </p>
      </div>
    </div>
  );
}

function eventIcon(eventName: string): IconType | undefined {
  return EVENTS.find(
    (event) => event.displayName === eventName || event.name.startsWith(eventName),
  )?.icon;
}

export function CommitteeStructure() {
  const { organizing, coordinators, judgePanel } = COMMITTEES;
  const simpleGroups = [organizing, coordinators];

  return (
    <div className="mt-16">
      <Reveal>
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
          The Full Team
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {simpleGroups.map((group) => (
            <div
              key={group.title}
              className="hairline h-full rounded-2xl bg-maroon-800/60 p-6 md:p-7"
            >
              <CardHeader
                icon={group === organizing ? Users : Sparkles}
                title={group.title}
                designation={group.designation}
              />
              <ul className="mt-5 space-y-2.5">
                {group.members.map((member) => (
                  <li
                    key={member}
                    className="flex items-start gap-3 font-body text-sm leading-relaxed text-cream-100"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-400"
                    />
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="hairline mt-5 rounded-2xl bg-maroon-800/60 p-6 md:p-7">
          <CardHeader
            icon={Scale}
            title={judgePanel.title}
            designation={judgePanel.designation}
          />
          <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
            {judgePanel.assignments.map((assignment) => {
              const Icon = eventIcon(assignment.event);
              return (
                <div key={assignment.event} className="flex items-center gap-3">
                  {Icon ? (
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-lg border border-gold-500/35 bg-maroon-900 text-gold-400"
                    >
                      <Icon className="size-4" />
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-cream-100">
                      {assignment.event}
                    </p>
                    <p className="mt-0.5 font-body text-sm text-cream-200/85">
                      {assignment.judges.join(" & ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
