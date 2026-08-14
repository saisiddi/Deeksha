"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowLeft, Check, Loader2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { registrationSchema, type RegistrationInput } from "@/lib/validation";

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
  children,
}: {
  index: string;
  label: string;
  htmlFor: string;
  error?: string;
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

export function EventRegistrationForm({
  eventName,
  icon,
}: {
  eventName: string;
  icon: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<RegistrationInput | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const {
    register,
    handleSubmit,
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
      events: eventName,
      agree: false,
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
          You&apos;re Registered! 🎉
        </h3>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-maroon-900 px-3.5 py-1.5 text-sm font-medium text-gold-300">
          {icon}
          {eventName}
        </span>

        <dl className="mt-6 w-full max-w-sm space-y-2 text-left text-sm">
          {[
            ["Name", submitted.fullName],
            ["USN", submitted.usn],
            ["Department", submitted.department],
            ["Group", submitted.groupNumber],
            ["Team Leader Email", submitted.teamLeaderEmail],
            ["WhatsApp", submitted.whatsapp],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-3 border-b border-gold-500/15 pb-1.5"
            >
              <dt className="shrink-0 text-xs font-semibold uppercase tracking-wider text-cream-200/70">
                {label}
              </dt>
              <dd className="text-right font-medium text-cream-100">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-cream-200/90">
          Want to enter another event? Wonderful — just register again on that
          event&apos;s page. Each submission covers one event.
        </p>

        <a
          href="https://chat.whatsapp.com/BAER6Dl6nXsKOskMeMk1XW"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-500 px-6 text-sm font-bold text-maroon-950 shadow-[0_8px_32px_rgba(212,175,55,0.4)] transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          Join the WhatsApp Group
        </a>
        <p className="mt-2.5 max-w-md font-body text-xs leading-relaxed text-cream-200/75">
          Event updates, submission links and announcements will be shared in
          the group — join to stay in the loop.
        </p>

        <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-cream-200">
          Ready to submit your entry?{" "}
          <Link
            href="/submit"
            className="font-semibold text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
          >
            Head to the Submission page →
          </Link>
        </p>

        <Link
          href="/#events"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold-500/40 px-6 text-sm font-bold text-gold-400 transition-colors hover:border-gold-400/70 hover:text-gold-300"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Browse Other Events
        </Link>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-y-6"
    >
      <Field index="01" label="Full Name" htmlFor="fullName" error={errors.fullName?.message}>
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

      <Field index="02" label="USN" htmlFor="usn" error={errors.usn?.message}>
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

      <Field index="03" label="Department" htmlFor="department" error={errors.department?.message}>
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

      <Field index="04" label="Group Number" htmlFor="groupNumber" error={errors.groupNumber?.message}>
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

      <Field index="05" label="Team Leader Email" htmlFor="teamLeaderEmail" error={errors.teamLeaderEmail?.message}>
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

      <Field index="06" label="WhatsApp Number" htmlFor="whatsapp" error={errors.whatsapp?.message}>
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

      <div className="min-w-0">
        <div className="mb-2 flex items-baseline gap-2.5">
          <span
            aria-hidden="true"
            className="font-display text-sm font-bold italic leading-none text-gold-500/80"
          >
            07
          </span>
          <span className="text-sm font-semibold text-cream-100">Event</span>
        </div>
        <FieldBox className="border-gold-500/50 bg-gold-500/[0.06]">
          <div className="absolute inset-0 flex items-center gap-3 px-4">
            {icon}
            <span className="truncate text-base font-semibold text-cream-100">
              {eventName}
            </span>
          </div>
        </FieldBox>
        <p className="mt-2 text-xs text-cream-200/60">
          Fixed for this page — to enter another event, use that event&apos;s page.
        </p>
        <input type="hidden" {...register("events")} />
      </div>

      <div className="min-w-0">
        <label
          htmlFor="agree"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id="agree"
            type="checkbox"
            className="peer sr-only"
            aria-invalid={Boolean(errors.agree)}
            {...register("agree")}
          />
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-gold-500/50 bg-maroon-950/70 text-transparent transition-all peer-checked:border-gold-400 peer-checked:bg-gold-500/15 peer-checked:text-gold-400 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-maroon-950"
          >
            <Check className="size-4" />
          </span>
          <span className="text-sm leading-relaxed text-cream-100">
            I have read the rules and regulations.{" "}
            <Link
              href="/rules"
              className="font-semibold text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
            >
              If not, click here.
            </Link>
          </span>
        </label>
        {errors.agree?.message ? (
          <p
            className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-snug text-error"
            role="alert"
          >
            <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {errors.agree.message}
          </p>
        ) : null}
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
              Registration didn&apos;t go through.
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
  );
}
