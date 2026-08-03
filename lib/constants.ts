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
  Recycle,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>> | LucideIcon;

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Events", href: "/#events" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Rules", href: "/rules" },
  { label: "Coordinators", href: "/#coordinators" },
];

export interface EventSpec {
  id: string;
  emoji: string;
  name: string;
  displayName?: string;
  theme: string;
    icon: IconType;
    specs: { label: string; value: string }[];
    description: string;
    poster: string;
    detailSections?: { heading: string; items: string[] }[];
  }

export const EVENTS: EventSpec[] = [
  {
    id: "campus-diaries",
    emoji: "🎬",
    name: "Campus Diaries",
    theme: "My First Week @ SVYASA",
    icon: Clapperboard,
    specs: [
      { label: "Duration", value: "30–60 seconds" },
      { label: "Format", value: "MP4" },
      { label: "Orientation", value: "Vertical (9:16)" },
      { label: "Resolution", value: "Min 720p" },
      { label: "File Size", value: "Max 200 MB" },
    ],
    description:
      "Create a creative reel showcasing your first week at SVYASA. Share memorable moments, friendships, classrooms, campus exploration, orientation activities, and your journey as a new student.",
    poster: "/poster/Cmapus-Diaries.webp",
  },
  {
    id: "campus-vogue",
    emoji: "👑",
    name: "Campus Vogue",
    theme: "Style with Confidence",
    icon: Crown,
    specs: [
      { label: "Duration", value: "20–45 seconds" },
      { label: "Format", value: "MP4" },
      { label: "Orientation", value: "Vertical (9:16)" },
      { label: "Resolution", value: "Min 720p" },
    ],
    description:
      "Create a stylish campus fashion reel highlighting your confidence, personality, creativity, and individuality while maintaining university values and decorum.",
    poster: "/poster/CampusVogue.webp",
  },
  {
    id: "minute-to-shine",
    emoji: "🌟",
    name: "Minute to Shine",
    theme: "Every Talent Has a Stage",
    icon: Star,
    specs: [
      { label: "Max Duration", value: "60 seconds" },
      { label: "Format", value: "MP4" },
      { label: "Resolution", value: "Min 720p" },
    ],
    description:
      "Showcase your talent in one minute. You may present singing, dancing, acting, instrumental music, painting, coding, poetry, photography, mimicry, magic, beatboxing, public speaking, Rubik's Cube solving, or any unique skill.",
    poster: "/poster/Mine2Shine.webp",
  },
  {
    id: "yoga-in-motion",
    emoji: "🧘",
    name: "Yoga in Motion",
    theme: "Balance. Breathe. Become.",
    icon: PersonStanding,
    specs: [
      { label: "Duration", value: "30–60 seconds" },
      { label: "Format", value: "MP4" },
      { label: "Orientation", value: "Vertical (9:16)" },
      { label: "Resolution", value: "Min 720p" },
    ],
    description:
      "Create a creative yoga reel demonstrating yoga asanas, flexibility, balance, mindfulness, meditation, or Surya Namaskar while emphasizing proper posture and safety.",
    poster: "/poster/YogaInMotion.webp",
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
      { label: "Editing", value: "Cropping, brightness & contrast permitted" },
    ],
    description:
      "Capture photographs representing the beauty, culture, architecture, nature, student life, learning spaces, yoga environment, and memorable moments of the SVYASA campus.",
    poster: "/poster/CampusTYLens.webp",
  },
  {
    id: "best-from-waste",
    emoji: "♻️",
    name: "Best From Waste — Creativity Beyond Waste",
    displayName: "Best From Waste",
    theme: "Reduce • Reuse • Recycle",
    icon: Recycle,
    specs: [
      { label: "Submission Mode", value: "Physical (bring to venue)" },
      { label: "Materials", value: "Waste & recyclables" },
      { label: "Judging", value: "Explain live (2–3 min)" },
    ],
    description:
      "Turn everyday waste materials into something innovative, useful, or artistic. Showcase your creativity by transforming discarded items into functional products, decorative pieces, or eco-friendly solutions that promote sustainability and environmental awareness.",
    poster: "/poster/BestFromWaste.webp",
    detailSections: [
      {
        heading: "Physical Submission Guidelines",
        items: [
          "Bring your completed model to the designated exhibition venue on the event day.",
          "The model should be created primarily using waste or recyclable materials such as paper, cardboard, plastic bottles, newspapers, fabric scraps, cans, CDs, wood pieces, etc.",
          "Attach a label with: Participant Name, Registration Number, School/Department, and Title of the Model.",
          "You must be present during judging to explain the concept and usefulness of your model (2–3 minutes).",
        ],
      },
      {
        heading: "Judging Criteria",
        items: [
          "Creativity & Innovation",
          "Effective Use of Waste Materials",
          "Functionality & Practicality",
          "Presentation & Finishing",
          "Environmental Awareness",
        ],
      },
      {
        heading: "Important Guidelines",
        items: [
          "Only original, self-made models will be accepted.",
          "The use of hazardous, flammable, or sharp materials is strictly prohibited.",
          "Ready-made or commercially purchased decorative items will not be considered.",
          "Models should be stable, portable, and easy to display.",
          "Participants are responsible for transporting their models to and from the exhibition venue.",
          "The decision of the judges will be final and binding.",
        ],
      },
    ],
  },
];

export const TIMELINE: {
  icon: IconType;
  title: string;
  date: string;
  next?: boolean;
}[] = [
  {
    icon: CalendarClock,
    title: "Registration Opens",
    date: "03 / 08 / 2026",
    next: true,
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
    date: "To be announced at the official Deeksharambh 2026 event",
  },
  {
    icon: Trophy,
    title: "Prize Distribution",
    date: "Winners will be felicitated at the official Deeksharambh 2026 event",
  },
];

export const COORDINATORS = [
  {
    name: "Kalmadi Saisiddi",
    role: "Organizing Committee",
    phone: "+91 87925 26242",
    tel: "+918792526242",
    whatsapp: "918792526242",
    img: "/img/saisiddi.jpg",
    imgPos: "center 45%",
  },
  {
    name: "Tarun",
    role: "Organizing Committee",
    phone: "+91 99721 70225",
    tel: "+919972170225",
    whatsapp: "919972170225",
    img: "/img/tarun.jpeg",
    imgPos: "center 45%",
  },
  {
    name: "Ujwal",
    role: "Organizing Committee",
    phone: "+91 86183 56663",
    tel: "+918618356663",
    whatsapp: "918618356663",
    img: "/img/ujwal.jpeg",
  },
  {
    name: "Monish",
    role: "Organizing Committee",
    phone: "+91 70268 27604",
    tel: "+917026827604",
    whatsapp: "917026827604",
    img: "/img/monish.jpg",
  },
  {
    name: "Skanda Sai",
    role: "Organizing Committee",
    phone: "+91 99029 56084",
    tel: "+919902956084",
    whatsapp: "919902956084",
    img: "/img/skanda.jpeg",
  },
  {
    name: "Ramanee Kaanth",
    role: "Organizing Committee",
    phone: "+91 87549 73733",
    tel: "+918754973733",
    whatsapp: "918754973733",
    img: "/img/ramanee_kaanth.jpg",
  },
  {
    name: "Joylin",
    role: "Organizing Committee",
    phone: "+91 90193 90235",
    tel: "+919019390235",
    whatsapp: "919019390235",
    img: "/img/joy.png",
  },
];

export const JUDGES = [
  { name: "Dr. Amal M R", role: "Judge — Campus Diaries", img: "/judge/amal.jpg" },
  { name: "Ms. Nidhi Singh", role: "Judge — Campus Diaries", img: "/judge/nidhi.jpg" },
  { name: "Ms. Sai Sree Basnet", role: "Judge — Campus Vogue", img: "/judge/saisree.png" },
  { name: "Ms. Sanjana Gupta", role: "Judge — Campus Vogue", img: "/judge/sanjana.png" },
  { name: "Ms. Shylaja B", role: "Judge — Minute to Shine", img: "/judge/Shailaja.jpg" },
  { name: "Ms. Sangeeta Behra", role: "Judge — Minute to Shine", img: "/judge/sangeeta.png" },
  { name: "Mr. Ritik Nagar", role: "Judge — Yoga in Motion", img: "/judge/ritik.jpg" },
  { name: "Mr. Yeeshu Prajapati", role: "Judge — Yoga in Motion", img: "/judge/yeshu.jpg" },
  { name: "Dr. Keerthi Mohan", role: "Judge — Campus Through Your Lens", img: "/judge/keethi.jpg" },
  { name: "Mr. Veerendra Reddy", role: "Judge — Campus Through Your Lens", img: "/judge/reddy.jpg" },
  { name: "Dr. Mrutyunjaya M S", role: "Judge — Best From Waste", img: "/judge/murthunjay.jpg" },
  { name: "Mr. Shubham Kumar", role: "Judge — Best From Waste", img: "/judge/Shubham.jpg" },
];

export const COMMITTEES = {
  organizing: {
    title: "Organizing Committee",
    designation: "Core Activity Committee",
    members: [
      "Dr. Mrutyunjaya MS (SET)",
      "Ms. Nidhi Singh (SET)",
      "Ms. Shylaja B (SET)",
      "Dr. Keerthi Mohan (SET)",
      "Dr. Amal M R (SET)",
      "Mr. Veerendra Reddy (SET)",
    ],
  },
  coordinators: {
    title: "Event Coordinators",
    designation: "Student Coordinators",
    members: [
      "Kalmadi Saisiddi",
      "Anish Joylin",
      "Skanda Sai",
      "Tarun A",
      "Ujwal",
      "Ramneekanth",
      "Monish R",
    ],
  },
  judgePanel: {
    title: "Event Judge Panel",
    designation: "Faculty & Staff Judges",
    assignments: [
      { event: "Campus Diaries", judges: ["Dr. Amal M R", "Ms. Nidhi Singh"] },
      { event: "Campus Vogue", judges: ["Ms. Sai Sree Basnet", "Ms. Sanjana Gupta"] },
      { event: "Minute to Shine", judges: ["Ms. Shylaja B", "Ms. Sangeeta Behra"] },
      { event: "Yoga in Motion", judges: ["Mr. Ritik Nagar", "Mr. Yeeshu Prajapati"] },
      { event: "Campus Through Your Lens", judges: ["Dr. Keerthi Mohan", "Mr. Veerendra Reddy"] },
      { event: "Best From Waste", judges: ["Dr. Mrutyunjaya MS", "Mr. Shubham Kumar"] },
    ],
  },
} as const;

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
  winners: 6,
  recognition:
    "Certificates for Winners, Runners-up & all valid Participants.",
};

export const HASHTAGS = [
  "#Deeksharambhsvyasa",
  "#SVYASA",
  "#SVYASAUniversity",
  "#CampusLife",
  "#HigherEducation",
];

export const RULES = [
  {
    title: "General Rules",
    items: [
      "Participation is open exclusively to students attending Deeksharambh 2026.",
      "Students may participate in multiple events — register separately for each event.",
      "All submissions must be original and created by the participant.",
      "Entries must strictly follow the respective event theme.",
      "Content should be respectful and align with university values.",
      "Obscene, offensive, political, religious, discriminatory, or copyrighted content is prohibited.",
      "Excessive AI-generated content that replaces original participant creativity is not permitted.",
      "The organizing committee reserves the right to reject any entry that violates the guidelines.",
      "The decision of the judges shall be final and binding.",
    ],
    hashtags: true,
  },
  {
    title: "Evaluation Criteria",
    blocks: [
      {
        heading: "Judge Panel Evaluation (50%)",
        table: [
          { criteria: "Creativity & Innovation", marks: "10" },
          { criteria: "Effective Use of Waste Materials", marks: "10" },
          { criteria: "Functionality & Practicality", marks: "10" },
          { criteria: "Presentation & Finishing", marks: "10" },
          { criteria: "Environmental Awareness", marks: "10" },
        ],
      },
      {
        heading: "Social Media Evaluation (50%)",
        table: [
          { criteria: "Maximum Views & Likes", marks: "20" },
          { criteria: "Proper Use of Official Hashtags", marks: "10" },
          { criteria: "Comments & Audience Engagement", marks: "10" },
          { criteria: "Reposts/Shares", marks: "10" },
        ],
        total: "Total 100 Marks",
      },
      {
        heading: "Best From Waste — Physical Submission",
        items: [
          "Creativity & Innovation",
          "Effective Use of Waste Materials",
          "Functionality & Practicality",
          "Presentation & Finishing",
          "Environmental Awareness",
        ],
      },
    ],
  },
  {
    title: "Judging Process",
    items: [
      "Entries will be evaluated by a panel of faculty members and invited experts.",
      "Each entry will be assessed independently based on the evaluation criteria.",
      "The judges' decision shall be final and binding.",
      "Any attempt to influence the judging process will result in disqualification.",
    ],
  },
  {
    title: "Plagiarism Policy",
    items: [
      "Submitted work must be original.",
      "Participants are responsible for ensuring that their submissions do not infringe on copyright.",
      "Plagiarized or copied entries will be disqualified.",
      "The organizing committee may request the original media files for verification if required.",
    ],
  },
] as const;
