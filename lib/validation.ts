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
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
