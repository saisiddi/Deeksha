import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

export interface Person {
  name: string;
  role: string;
  phone?: string;
  tel?: string;
  whatsapp?: string;
  img?: string;
  imgPos?: string;
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <div className="hairline flex h-full flex-col items-center rounded-2xl bg-maroon-800/60 p-7 text-center transition-colors hover:border-gold-500/50">
      <span className="relative block size-28 overflow-hidden rounded-full border-2 border-gold-500/50 bg-maroon-900 shadow-[0_0_22px_rgba(212,175,55,0.2)]">
        {person.img ? (
          <Image
            src={person.img}
            alt={`${person.name} photo`}
            fill
            sizes="112px"
            className="object-cover"
            style={{ objectPosition: person.imgPos ?? "center 25%" }}
          />
        ) : (
          <span
            className="grid h-full w-full place-items-center font-display text-2xl font-bold italic text-gold-500"
            aria-hidden="true"
          >
            {person.name
              .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
        )}
      </span>
      <h3 className="mt-4 text-lg font-bold text-cream-100">{person.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300/80">
        {person.role}
      </p>

      {person.phone ? (
        <div className="mt-5 flex w-full flex-col gap-2.5">
          <a
            href={`tel:${person.tel}`}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold-500/35 px-4 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/70 hover:text-gold-300"
          >
            <Phone className="size-4 text-gold-400" aria-hidden="true" />
            {person.phone}
          </a>
          <a
            href={`https://wa.me/${person.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-4 text-sm font-bold text-maroon-950 transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      ) : null}
    </div>
  );
}
