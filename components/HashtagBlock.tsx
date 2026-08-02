"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { HASHTAGS } from "@/lib/constants";

export function HashtagBlock({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyTags = async () => {
    try {
      await navigator.clipboard.writeText(HASHTAGS.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — chips remain visible for manual copy
    }
  };

  return (
    <div
      className={`rounded-xl border border-gold-500/40 bg-maroon-950/60 ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
        Mandatory Hashtags
      </p>
      <p className="mt-1 font-body text-sm leading-relaxed text-cream-200/90">
        Your submission caption must include all of these (copy-paste as-is):
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {HASHTAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-gold-300 sm:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={copyTags}
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold-500/40 px-4 text-sm font-semibold text-gold-400 transition-colors hover:border-gold-400/70 hover:bg-gold-500/10 hover:text-gold-300"
      >
        {copied ? (
          <>
            <Check className="size-4 text-success" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="size-4" aria-hidden="true" />
            Copy hashtags
          </>
        )}
      </button>
    </div>
  );
}
