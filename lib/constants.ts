import {
  CalendarClock,
  Camera,
  Clapperboard,
  Crown,
  Medal,
  PartyPopper,
  Sparkles,
  Star,
  PersonStanding,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>> | LucideIcon;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Timeline", href: "#timeline" },
  { label: "Register", href: "#register" },
  { label: "Coordinators", href: "#coordinators" },
];

export interface EventSpec {
  id: string;
  emoji: string;
  name: string;
  theme: string;
  icon: IconType;
  specs: { label: string; value: string }[];
  description: string;
}

export const EVENTS: EventSpec[] = [
  {
    id: "campus-diaries",
    emoji: "🎬",
    name: "Campus Diaries",
    theme: "My First Week @ SVYASA",
    icon: Clapperboard,
    specs: [
      { label: "Duration", value: "30–60 sec Reel" },
      { label: "Format", value: "MP4" },
      { label: "Orientation", value: "Vertical 9:16" },
      { label: "Resolution", value: "Min 720p" },
      { label: "File Size", value: "Max 200 MB" },
    ],
    description:
      "Create a creative reel showcasing your first week at SVYASA — memorable moments, friendships, classrooms, campus exploration, orientation activities, and your journey as a new student.",
  },
  {
    id: "campus-vogue",
    emoji: "👑",
    name: "Campus Vogue",
    theme: "Style with Confidence",
    icon: Crown,
    specs: [
      { label: "Duration", value: "20–45 sec Fashion Reel" },
      { label: "Format", value: "MP4" },
      { label: "Orientation", value: "Vertical 9:16" },
      { label: "Resolution", value: "Min 720p" },
    ],
    description:
      "Create a stylish campus fashion reel highlighting your confidence, personality, creativity, and individuality while maintaining university values and decorum.",
  },
  {
    id: "minute-to-shine",
    emoji: "🌟",
    name: "Minute to Shine",
    theme: "Every Talent Has a Stage",
    icon: Star,
    specs: [
      { label: "Duration", value: "Max 60 sec Talent Video" },
      { label: "Format", value: "MP4" },
      { label: "Resolution", value: "Min 720p" },
    ],
    description:
      "Showcase your talent in one minute — singing, dancing, acting, instrumental music, painting, coding, poetry, photography, mimicry, magic, beatboxing, public speaking, Rubik's Cube solving, or any unique skill.",
  },
  {
    id: "yoga-in-motion",
    emoji: "🧘",
    name: "Yoga in Motion",
    theme: "Balance. Breathe. Become.",
    icon: PersonStanding,
    specs: [
      { label: "Duration", value: "30–60 sec Yoga Reel" },
      { label: "Format", value: "MP4" },
      { label: "Orientation", value: "Vertical 9:16" },
      { label: "Resolution", value: "Min 720p" },
    ],
    description:
      "Create a creative yoga reel demonstrating asanas, flexibility, balance, mindfulness, meditation, or Surya Namaskar while emphasizing proper posture and safety.",
  },
  {
    id: "campus-through-your-lens",
    emoji: "📸",
    name: "Campus Through Your Lens",
    theme: "The Beauty of SVYASA",
    icon: Camera,
    specs: [
      { label: "Format", value: "JPG / JPEG" },
      { label: "Resolution", value: "Min 1920 × 1080 px" },
      { label: "Editing", value: "Basic edits permitted" },
    ],
    description:
      "Capture photographs representing the beauty, culture, architecture, nature, student life, learning spaces, yoga environment, and memorable moments of the SVYASA campus.",
  },
];

export const TIMELINE = [
  {
    icon: CalendarClock,
    title: "Registration Opens",
    date: "03 / 08 / 2026",
  },
  {
    icon: CalendarClock,
    title: "Registration Closes",
    date: "27 / 08 / 2026",
  },
  {
    icon: Camera,
    title: "Submission Window",
    date: "05 / 08 / 2026 onward",
  },
  {
    icon: Medal,
    title: "Evaluation by Judges",
    date: "To be Announced",
  },
  {
    icon: PartyPopper,
    title: "Result Announcement",
    date: "During the Deeksharambh 2026 Valedictory Ceremony",
  },
  {
    icon: Trophy,
    title: "Prize Distribution",
    date: "During the Deeksharambh 2026 Valedictory Ceremony",
  },
];

export const COORDINATORS = [
  {
    name: "Nidhi Singh",
    role: "Organizing Committee",
    phone: "+91 94549 29255",
    tel: "+919454929255",
    whatsapp: "919454929255",
  },
  {
    name: "Kalmadi Saisiddi",
    role: "Organizing Committee",
    phone: "+91 87925 26242",
    tel: "+918792526242",
    whatsapp: "918792526242",
  },
  {
    name: "Tarun",
    role: "Organizing Committee",
    phone: "+91 99721 70225",
    tel: "+919972170225",
    whatsapp: "919972170225",
  },
  {
    name: "Dr. Amal M R",
    role: "Organizing Committee",
    phone: "+91 97467 18559",
    tel: "+919746718559",
    whatsapp: "919746718559",
  },
  {
    name: "Ms. Shylaja B",
    role: "Organizing Committee",
    phone: "+91 98450 84298",
    tel: "+919845084298",
    whatsapp: "919845084298",
  },
  {
    name: "Dr. Keerthi Mohan",
    role: "Organizing Committee",
    phone: "+91 98801 44818",
    tel: "+919880144818",
    whatsapp: "919880144818",
  },
  {
    name: "Mr. Veerendra Reddy",
    role: "Organizing Committee",
    phone: "+91 94838 58750",
    tel: "+919483858750",
    whatsapp: "919483858750",
  },
];

export const OBJECTIVES = [
  {
    icon: Sparkles,
    text: "Encourage creativity and self-expression among students.",
  },
  {
    icon: Users,
    text: "Promote student engagement during Deeksharambh 2026.",
  },
  {
    icon: Camera,
    text: "Showcase the beauty and culture of the SVYASA campus.",
  },
  {
    icon: Star,
    text: "Provide a platform for students to exhibit their talents.",
  },
  {
    icon: Video,
    text: "Foster digital content creation and storytelling skills.",
  },
  {
    icon: Trophy,
    text: "Recognize and reward outstanding creative work.",
  },
];

export const AWARDS = {
  winners: 5,
  recognition:
    "Certificates for Winners, Runners-up & all valid Participants.",
};
