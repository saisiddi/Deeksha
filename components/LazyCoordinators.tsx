"use client";

import dynamic from "next/dynamic";

const Coordinators = dynamic(
  () => import("./Coordinators").then((m) => m.Coordinators),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-maroon-900 px-4 py-20 md:py-28"
        aria-hidden="true"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto h-24 max-w-2xl" />
          <div className="mx-auto h-72 max-w-xs rounded-2xl bg-maroon-800/60 sm:max-w-sm" />
        </div>
      </div>
    ),
  },
);

export function LazyCoordinators() {
  return <Coordinators />;
}
