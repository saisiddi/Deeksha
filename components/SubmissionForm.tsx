"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { SUBMISSION_EVENTS, type EventSpec } from "@/lib/constants";
import { submissionSchema, type SubmissionInput } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

function FieldBox({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`hairline field-glow relative h-14 overflow-hidden rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

const fieldInputClasses =
  "absolute inset-0 h-full w-full appearance-none bg-maroon-950/70 px-4 text-base text-cream-100 outline-none placeholder:text-cream-200/40";

function Field({
  index,
  label,
  htmlFor,
  error,
  optional = false,
  children,
}: {
  index: string;
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-baseline gap-2.5">
        <span
          aria-hidden="true"
          className="font-display text-sm font-bold italic leading-none text-gold-500/80"
        >
          {index}
        </span>
        <label htmlFor={htmlFor} className="text-sm font-semibold text-cream-100">
          {label}{" "}
          {optional ? (
            <span className="text-xs font-normal text-cream-200/60">(optional)</span>
          ) : (
            <span className="text-gold-400" aria-hidden="true">*</span>
          )}
        </label>
      </div>
      {children}
      {error ? (
        <p
          className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-snug text-error"
          role="alert"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SubmissionForm({
  prefillEventName,
}: {
  prefillEventName?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<SubmissionInput | null>(null);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventSpec | null>(
    () => SUBMISSION_EVENTS.find((e) => e.name === prefillEventName) ?? null,
  );
  const eventsListRef = useRef<HTMLUListElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  useEffect(() => {
    if (!eventsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (
        eventsListRef.current &&
        target instanceof Node &&
        eventsListRef.current.contains(target)
      ) {
        return;
      }
      setEventsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEventsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [eventsOpen]);

  const selectEvent = (event: EventSpec) => {
    setSelectedEvent(event);
    setValue("eventName", event.name, { shouldValidate: true, shouldDirty: true });
    setEventsOpen(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SubmissionInput>({
    resolver: zodResolver(submissionSchema),
    mode: "onTouched",
    defaultValues: {
      eventName: prefillEventName ?? "",
      teamName: "",
      teamLeaderName: "",
      teamSize: "",
      department: "",
      contactNumber: "",
      driveLink: "",
      socialMediaLink: "",
      agreeRules: false,
      agreeDrive: false,
    },
  });

  const onSubmit = async (data: SubmissionInput) => {
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => null)) as {
        status?: string;
        message?: string;
      } | null;

      if (!response.ok || result?.status !== "success") {
        throw new Error(result?.message ?? "Something went wrong.");
      }

      setSubmitted(data);
      setStatus("success");
    } catch {
      setErrorMessage(
        "We couldn't save your submission. Check your internet connection and try again — your details are still here.",
      );
      setStatus("error");
    }
  };

  const submitAnother = () => {
    setSubmitted(null);
    setStatus("idle");
    setSelectedEvent(null);
    reset();
  };

  if (status === "success" && submitted) {
    return (
      <motion.div
        ref={successRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
        role="status"
        aria-live="polite"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
          className="grid size-20 place-items-center rounded-full border border-success/50 bg-success/10"
        >
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
          >
            <motion.path
              d="M4 12.5 L9.5 18 L20 6.5"
              initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.span>

        <h3 className="mt-6 font-display text-3xl font-bold italic text-gold-500">
          Entry Submitted! 🎉
        </h3>
        <p className="mt-3 max-w-md font-body text-cream-200">
          We&apos;ve received <span className="font-semibold text-cream-100">{submitted.teamName}</span>&apos;s
          entry for:
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-maroon-900 px-3.5 py-1.5 text-sm font-medium text-gold-300">
          {submitted.eventName}
        </span>
        <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-cream-200/90">
          Results will be announced per the timeline — winners are revealed at
          the official Deeksharambh 2026 event. Keep your Drive link shared
          as &quot;Anyone with the link&quot; so our judges can view it.
        </p>

        <button
          type="button"
          onClick={submitAnother}
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold-500/40 px-6 text-sm font-bold text-gold-400 transition-colors hover:border-gold-400/70 hover:text-gold-300"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Submit Another Entry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-y-6"
    >
      <Field index="01" label="Event Name" htmlFor="eventName" error={errors.eventName?.message}>
        {prefillEventName && selectedEvent ? (
          <div className="min-w-0">
            <FieldBox className="border-gold-500/50 bg-gold-500/[0.06]">
              <div className="absolute inset-0 flex items-center gap-3 px-4">
                <selectedEvent.icon className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                <span className="truncate text-base font-semibold text-cream-100">
                  {selectedEvent.name}
                </span>
              </div>
            </FieldBox>
            <p className="mt-2 text-xs text-cream-200/60">
              Pre-selected from the event card — to submit for another event,
              use that event card&apos;s Submit button.
            </p>
            <input type="hidden" {...register("eventName")} />
          </div>
        ) : (
          <div className="relative">
          <FieldBox className="cursor-pointer">
            <button
              type="button"
              id="eventName"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setEventsOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={eventsOpen}
              className="absolute inset-0 flex h-full w-full items-center gap-3 px-4 text-left"
            >
              {selectedEvent ? (
                <>
                  <selectedEvent.icon className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                  <span className="truncate text-base font-medium text-cream-100">
                    {selectedEvent.name}
                  </span>
                  <span className="ml-auto hidden truncate text-sm text-cream-200/60 sm:block">
                    {selectedEvent.theme}
                  </span>
                </>
              ) : (
                <span className="text-base text-cream-200/40">Select your event…</span>
              )}
            </button>
            <ChevronDown
              className={`pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gold-400 transition-transform duration-200 ${eventsOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </FieldBox>

          <AnimatePresence>
            {eventsOpen ? (
              <motion.ul
                ref={eventsListRef}
                role="listbox"
                aria-labelledby="eventName"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="hairline absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-maroon-900 shadow-[0_18px_48px_rgba(0,0,0,0.55)]"
              >
                {SUBMISSION_EVENTS.map((event) => {
                  const selected = selectedEvent?.name === event.name;
                  return (
                    <li key={event.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => selectEvent(event)}
                        className={`flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selected
                            ? "bg-gold-500/15 text-gold-300"
                            : "text-cream-100 hover:bg-maroon-800/80"
                        }`}
                      >
                        <event.icon className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                        <span className="text-sm font-medium">{event.name}</span>
                        {selected ? (
                          <Check className="ml-auto size-4 shrink-0 text-gold-400" aria-hidden="true" />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            ) : null}
          </AnimatePresence>
          </div>
        )}
      </Field>

      <Field index="02" label="Team Name" htmlFor="teamName" error={errors.teamName?.message}>
        <FieldBox>
          <input
            id="teamName"
            type="text"
            autoComplete="off"
            placeholder="e.g. Golden Frames"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.teamName)}
            {...register("teamName")}
          />
        </FieldBox>
      </Field>

      <Field index="03" label="Team Leader Name" htmlFor="teamLeaderName" error={errors.teamLeaderName?.message}>
        <FieldBox>
          <input
            id="teamLeaderName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Ananya Sharma"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.teamLeaderName)}
            {...register("teamLeaderName")}
          />
        </FieldBox>
      </Field>

      <Field index="04" label="Team Size" htmlFor="teamSize" error={errors.teamSize?.message}>
        <FieldBox>
          <input
            id="teamSize"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="e.g. 3"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.teamSize)}
            {...register("teamSize")}
          />
        </FieldBox>
      </Field>

      <Field index="05" label="Department" htmlFor="department" error={errors.department?.message}>
        <FieldBox>
          <input
            id="department"
            type="text"
            autoComplete="organization"
            placeholder="e.g. Yoga & Life Sciences"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.department)}
            {...register("department")}
          />
        </FieldBox>
      </Field>

      <Field index="06" label="Contact Number" htmlFor="contactNumber" error={errors.contactNumber?.message}>
        <FieldBox>
          <input
            id="contactNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="10-digit mobile, e.g. 98765 43210"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.contactNumber)}
            {...register("contactNumber")}
          />
        </FieldBox>
      </Field>

      <Field index="07" label="Drive Link (video / photo entry)" htmlFor="driveLink" error={errors.driveLink?.message}>
        <FieldBox>
          <input
            id="driveLink"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://drive.google.com/… (Anyone with the link)"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.driveLink)}
            {...register("driveLink")}
          />
        </FieldBox>
      </Field>

      <Field
        index="08"
        label="Social Media Link"
        htmlFor="socialMediaLink"
        error={errors.socialMediaLink?.message}
      >
        <FieldBox>
          <input
            id="socialMediaLink"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://www.instagram.com/reel/…"
            className={fieldInputClasses}
            aria-invalid={Boolean(errors.socialMediaLink)}
            {...register("socialMediaLink")}
          />
        </FieldBox>
      </Field>

      <div className="space-y-3">
        <div className="min-w-0">
          <label
            htmlFor="agreeRules"
            className="flex cursor-pointer items-start gap-3"
          >
            <input
              id="agreeRules"
              type="checkbox"
              className="peer sr-only"
              aria-invalid={Boolean(errors.agreeRules)}
              {...register("agreeRules")}
            />
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-gold-500/50 bg-maroon-950/70 text-transparent transition-all peer-checked:border-gold-400 peer-checked:bg-gold-500/15 peer-checked:text-gold-400 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-maroon-950"
            >
              <Check className="size-4" />
            </span>
            <span className="text-sm leading-relaxed text-cream-100">
              I have followed all the rules and regulations.
            </span>
          </label>
          {errors.agreeRules?.message ? (
            <p
              className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-snug text-error"
              role="alert"
            >
              <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {errors.agreeRules.message}
            </p>
          ) : null}
        </div>

        <div className="min-w-0">
          <label
            htmlFor="agreeDrive"
            className="flex cursor-pointer items-start gap-3"
          >
            <input
              id="agreeDrive"
              type="checkbox"
              className="peer sr-only"
              aria-invalid={Boolean(errors.agreeDrive)}
              {...register("agreeDrive")}
            />
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-gold-500/50 bg-maroon-950/70 text-transparent transition-all peer-checked:border-gold-400 peer-checked:bg-gold-500/15 peer-checked:text-gold-400 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-maroon-950"
            >
              <Check className="size-4" />
            </span>
            <span className="text-sm leading-relaxed text-cream-100">
              I have kept the Drive link shared to everyone (Anyone with the
              link).
            </span>
          </label>
          {errors.agreeDrive?.message ? (
            <p
              className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-snug text-error"
              role="alert"
            >
              <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {errors.agreeDrive.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-error/40 bg-error/10 p-4"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-error" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-cream-100">
              Submission didn&apos;t go through.
            </p>
            <p className="mt-1 text-sm text-cream-200">{errorMessage}</p>
          </div>
        </motion.div>
      ) : null}

      <div className="sticky bottom-3 z-30">
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={status === "submitting" ? undefined : { scale: 1.02 }}
          whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
          className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-8 text-lg font-bold text-maroon-950 shadow-[0_8px_32px_rgba(212,175,55,0.4)] transition-shadow hover:shadow-[0_8px_44px_rgba(212,175,55,0.55)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : status === "error" ? (
            "Try Again"
          ) : (
            "Submit Entry"
          )}
        </motion.button>
      </div>
    </form>
  );
}
