"use client";

import dynamic from "next/dynamic";

const PosterCarousel = dynamic(
  () => import("./PosterCarousel").then((m) => m.PosterCarousel),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-maroon-900 px-4 py-16 md:py-20"
        aria-hidden="true"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 h-24 max-w-2xl" />
          <div className="mx-auto aspect-[7/10] max-w-xs rounded-2xl bg-maroon-800/60 sm:max-w-sm" />
        </div>
      </div>
    ),
  },
);

export function LazyPosterCarousel() {
  return <PosterCarousel />;
}
