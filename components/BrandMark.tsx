import Image from "next/image";

export function BrandMark({
  compact = false,
  logoOnly = false,
}: {
  compact?: boolean;
  logoOnly?: boolean;
}) {
  if (logoOnly) {
    return (
      <span className="relative block h-[55px] w-[165px]">
        <Image
          src="/logo/vyasa.png"
          alt="S-VYASA Deemed to be University logo"
          fill
          sizes="120px"
          priority
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="relative h-10 w-16 shrink-0 sm:h-11 sm:w-[4.5rem]">
        <Image
          src="/logo/vyasa.png"
          alt="S-VYASA Deemed to be University logo"
          fill
          sizes="72px"
          priority
          className="object-contain object-left"
        />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-base font-bold italic tracking-wide text-gold-500">
          S-VYASA
        </span>
        {!compact ? (
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-200">
            NAAC A+ Accredited University
          </span>
        ) : null}
      </span>
    </span>
  );
}
