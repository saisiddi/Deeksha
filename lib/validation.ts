import { z } from "zod";
import { EVENTS } from "./constants";

export const EVENT_NAMES = EVENTS.map((event) => event.name) as [
  (typeof EVENTS)[number]["name"],
  ...(typeof EVENTS)[number]["name"][],
];

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Please enter your full name (min 3 characters)."),
  usn: z
    .string()
    .trim()
    .toUpperCase()
    .min(6, "USN should be at least 6 characters.")
    .max(15, "USN looks too long — please check it.")
    .regex(/^[A-Z0-9]+$/, "USN should contain only letters and numbers."),
  department: z
    .string()
    .trim()
    .min(2, "Please enter your department.")
    .max(60, "Department name is too long."),
  groupNumber: z
    .string()
    .trim()
    .min(1, "Please enter your group number.")
    .max(20, "Group number is too long.")
    .regex(
      /^[A-Za-z0-9-]+$/,
      "Group number should contain only letters, numbers or dashes.",
    ),
  teamLeaderEmail: z
    .string()
    .trim()
    .min(1, "Please enter the team leader's email.")
    .email("Please enter a valid email address."),
  whatsapp: z
    .string()
    .trim()
    .regex(
      /^(\+91)?[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number (e.g. 98765 43210).",
    ),
  events: z.enum(EVENT_NAMES, {
    message: "Please select an event.",
  }),
  agree: z
    .boolean()
    .refine((v) => v === true, "Please confirm you've read the Rules & Guidelines."),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

const digitalEventNames = EVENTS.filter((e) => e.id !== "best-from-waste").map(
  (e) => e.name,
) as [string, ...string[]];

export const submissionSchema = z.object({
  eventName: z.enum(digitalEventNames, {
    message: "Please select an event.",
  }),
  teamName: z
    .string()
    .trim()
    .min(2, "Please enter your team name.")
    .max(60, "Team name is too long."),
  teamLeaderName: z
    .string()
    .trim()
    .min(3, "Please enter the team leader's name (min 3 characters).")
    .max(60, "Name is too long."),
  teamSize: z
    .string()
    .trim()
    .regex(/^\d{1,2}$/, "Enter the team size as a number (1–50).")
    .refine(
      (value) => {
        const size = Number(value);
        return size >= 1 && size <= 50;
      },
      "Team size must be between 1 and 50.",
    ),
  department: z
    .string()
    .trim()
    .min(2, "Please enter your department.")
    .max(60, "Department name is too long."),
  contactNumber: z
    .string()
    .trim()
    .regex(
      /^(\+91)?[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number (e.g. 98765 43210).",
    ),
  driveLink: z
    .string()
    .trim()
    .min(1, "Please paste the Drive link to your entry.")
    .url("Please paste a valid Drive link (must start with http/https)."),
  socialMediaLink: z
    .string()
    .trim()
    .min(1, "Please paste the link to your social media post.")
    .url("Please paste a valid link (must start with http/https)."),
  agreeRules: z
    .boolean()
    .refine(
      (v) => v === true,
      "Please confirm you've followed the rules and regulations.",
    ),
  agreeDrive: z
    .boolean()
    .refine(
      (v) => v === true,
      "Please confirm the Drive link is shared to everyone.",
    ),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
