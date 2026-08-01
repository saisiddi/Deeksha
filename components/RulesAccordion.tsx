"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type RuleGroup = {
  title: string;
  items?: readonly string[];
  table?: readonly { criteria: string; marks: number }[];
};

export function RulesAccordion({ groups }: { groups: readonly RuleGroup[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {groups.map((group, index) => {
        const open = openIndex === index;
        return (
          <div
            key={group.title}
            className="hairline overflow-hidden rounded-2xl bg-maroon-900/70"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={`rules-panel-${index}`}
              id={`rules-button-${index}`}
              className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="font-display text-lg font-bold italic text-gold-500 sm:text-xl">
                {group.title}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`size-5 shrink-0 text-gold-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={`rules-panel-${index}`}
              role="region"
              aria-labelledby={`rules-button-${index}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`min-h-0 overflow-hidden transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="border-t border-gold-500/15 px-5 py-5 sm:px-6">
                  {group.table ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gold-500/25 text-left">
                          <th className="py-2.5 pr-4 font-semibold uppercase tracking-wider text-cream-200/80">
                            Criteria
                          </th>
                          <th className="py-2.5 text-right font-semibold uppercase tracking-wider text-cream-200/80">
                            Marks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.table.map((row) => (
                          <tr
                            key={row.criteria}
                            className="border-b border-gold-500/10"
                          >
                            <td className="py-3 pr-4 font-body text-cream-100">
                              {row.criteria}
                            </td>
                            <td className="py-3 text-right font-bold text-gold-300">
                              {row.marks}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-3 pr-4 font-bold text-gold-400">
                            Total
                          </td>
                          <td className="py-3 text-right font-bold text-gold-400">
                            100
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <ul className="space-y-3">
                      {group.items?.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-sm leading-relaxed text-cream-100 md:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-400"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
