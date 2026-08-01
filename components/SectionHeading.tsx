export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold italic text-gold-500 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 font-body text-base leading-relaxed text-cream-200 md:text-lg">
          {description}
        </p>
      ) : null}
      <div className="mx-auto mt-6 flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/60" />
        <span className="text-gold-500">✦</span>
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/60" />
      </div>
    </div>
  );
}
