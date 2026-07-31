"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { EVENTS, type EventSpec } from "@/lib/constants";
import { registrationSchema, type RegistrationInput } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

function FieldBox({ className = "", children }: { className?: string; children: ReactNode }) {
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
  className = "",
  children,
}: {
  index: string;
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="mb-2 flex items-baseline gap-2.5">
        <span
          aria-hidden="true"
          className="font-display text-sm font-bold italic leading-none text-gold-500/80"
        >
          {index}
        </span>
        <label htmlFor={htmlFor} className="text-sm font-semibold text-cream-100">
          {label} <span className="text-gold-400" aria-hidden="true">*</span>
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

export function RegistrationForm() {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<RegistrationInput | null>(null);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventSpec | null>(null);
  const eventsListRef = useRef<HTMLUListElement | null>(null);

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

  const selectEvent = (name: string) => {
    setSelectedEvent(EVENTS.find((event) => event.name === name) ?? null);
    setValue("events", name, { shouldValidate: true, shouldDirty: true });
    setEventsOpen(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      usn: "",
      department: "",
      groupNumber: "",
      teamLeaderEmail: "",
      whatsapp: "",
      events: "",
    },
  });

  const onSubmit = async (data: RegistrationInput) => {
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/register", {
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
        "We couldn't save your registration. Check your internet connection and try again — your details are still here.",
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="register"
      className="grain relative bg-maroon-950 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            Registration
          </p>
          <h2 className="font-display text-3xl font-bold italic text-gold-500 sm:text-4xl md:text-5xl">
            Claim Your Spotlight
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-200 md:text-lg">
            Registration is mandatory for every participant. Choose the event
            you&apos;d like to enter.
          </p>
        </div>

        <div className="hairline relative rounded-3xl bg-gradient-to-b from-maroon-800/80 to-maroon-900/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" && submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center py-8 text-center"
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
                  You&apos;re Registered! 🎉
                </h3>
                <p className="mt-3 max-w-md text-cream-200">
                  Thanks, <span className="font-semibold text-cream-100">{submitted.fullName}</span>{" "}
                  ({submitted.usn}). We&apos;ve received your registration for:
                </p>
                <span className="mt-4 inline-flex rounded-full border border-gold-500/40 bg-maroon-900 px-3.5 py-1.5 text-sm font-medium text-gold-300">
                  {submitted.events}
                </span>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-200/80">
                  Your entry (video / photo) is submitted separately via the
                  official Submission Form, which opens closer to the deadline.
                  Watch official Deeksharambh channels for the link.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form
                  id="register-form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2"
                >
                  <Field
                    index="01"
                    label="Full Name"
                    htmlFor="fullName"
                    error={errors.fullName?.message}
                  >
                    <FieldBox>
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Ananya Sharma"
                        className={fieldInputClasses}
                        aria-invalid={Boolean(errors.fullName)}
                        {...register("fullName")}
                      />
                    </FieldBox>
                  </Field>

                  <Field
                    index="02"
                    label="USN"
                    htmlFor="usn"
                    error={errors.usn?.message}
                  >
                    <FieldBox>
                      <input
                        id="usn"
                        type="text"
                        autoComplete="off"
                        placeholder="e.g. SU26DCL001"
                        className={`${fieldInputClasses} uppercase`}
                        aria-invalid={Boolean(errors.usn)}
                        {...register("usn")}
                      />
                    </FieldBox>
                  </Field>

                  <Field
                    index="03"
                    label="Department"
                    htmlFor="department"
                    error={errors.department?.message}
                  >
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

                  <Field
                    index="04"
                    label="Group Number"
                    htmlFor="groupNumber"
                    error={errors.groupNumber?.message}
                  >
                    <FieldBox>
                      <input
                        id="groupNumber"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="e.g. 12"
                        className={fieldInputClasses}
                        aria-invalid={Boolean(errors.groupNumber)}
                        {...register("groupNumber")}
                      />
                    </FieldBox>
                  </Field>

                  <Field
                    index="05"
                    label="Team Leader Email"
                    htmlFor="teamLeaderEmail"
                    error={errors.teamLeaderEmail?.message}
                  >
                    <FieldBox>
                      <input
                        id="teamLeaderEmail"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="e.g. ananya123@gmail.com"
                        className={fieldInputClasses}
                        aria-invalid={Boolean(errors.teamLeaderEmail)}
                        {...register("teamLeaderEmail")}
                      />
                    </FieldBox>
                  </Field>

                  <Field
                    index="06"
                    label="WhatsApp Number"
                    htmlFor="whatsapp"
                    error={errors.whatsapp?.message}
                    className="sm:col-span-2"
                  >
                    <FieldBox>
                      <input
                        id="whatsapp"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="10-digit mobile, e.g. 98765 43210"
                        className={fieldInputClasses}
                        aria-invalid={Boolean(errors.whatsapp)}
                        {...register("whatsapp")}
                      />
                    </FieldBox>
                  </Field>

                  <Field
                    index="07"
                    label="Event of Participation"
                    htmlFor="events"
                    error={errors.events?.message}
                    className="sm:col-span-2"
                  >
                    <div className="relative">
                      <FieldBox className="cursor-pointer">
                        <button
                          type="button"
                          id="events"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => setEventsOpen((v) => !v)}
                          aria-haspopup="listbox"
                          aria-expanded={eventsOpen}
                          className="absolute inset-0 flex h-full w-full items-center gap-3 px-4 text-left"
                        >
                          {selectedEvent ? (
                            <>
                              <selectedEvent.icon
                                className="size-5 shrink-0 text-gold-400"
                                aria-hidden="true"
                              />
                              <span className="truncate text-base font-medium text-cream-100">
                                {selectedEvent.name}
                              </span>
                              <span className="ml-auto hidden truncate text-sm text-cream-200/60 sm:block">
                                {selectedEvent.theme}
                              </span>
                            </>
                          ) : (
                            <span className="text-base text-cream-200/40">
                              Select your event…
                            </span>
                          )}
                        </button>
                        <ChevronDown
                          className={`pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gold-400 transition-transform duration-200 ${
                            eventsOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </FieldBox>

                      <AnimatePresence>
                        {eventsOpen ? (
                          <motion.ul
                            ref={eventsListRef}
                            role="listbox"
                            aria-labelledby="events"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="hairline absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-maroon-900 shadow-[0_18px_48px_rgba(0,0,0,0.55)]"
                          >
                            {EVENTS.map((event) => {
                              const selected = selectedEvent?.name === event.name;
                              return (
                                <li key={event.id}>
                                  <button
                                    type="button"
                                    role="option"
                                    aria-selected={selected}
                                    onClick={() => selectEvent(event.name)}
                                    className={`flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                                      selected
                                        ? "bg-gold-500/15 text-gold-300"
                                        : "text-cream-100 hover:bg-maroon-800/80"
                                    }`}
                                  >
                                    <event.icon
                                      className="size-4 shrink-0 text-gold-400"
                                      aria-hidden="true"
                                    />
                                    <span className="text-sm font-medium">
                                      {event.name}
                                    </span>
                                    {selected ? (
                                      <Check
                                        className="ml-auto size-4 shrink-0 text-gold-400"
                                        aria-hidden="true"
                                      />
                                    ) : null}
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </Field>

                  {status === "error" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-error/40 bg-error/10 p-4 sm:col-span-2"
                      role="alert"
                    >
                      <AlertCircle className="mt-0.5 size-5 shrink-0 text-error" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-cream-100">
                          Registration didn&apos;t go through.
                        </p>
                        <p className="mt-1 text-sm text-cream-200">{errorMessage}</p>
                      </div>
                    </motion.div>
                  ) : null}

                  <div className="sm:col-span-2">
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
                          Registering…
                        </>
                      ) : status === "error" ? (
                        "Try Again"
                      ) : (
                        "Register Now"
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-5 text-center text-xs text-cream-200/70">
          Only the 7 fields above are collected — no other personal data is stored.
        </p>
      </div>
    </section>
  );
}
