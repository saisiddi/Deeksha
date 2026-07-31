import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dcl-2026.vercel.app"),
  title: "Deeksharambh 2026 · Digital Creators League | S-VYASA",
  description:
    "Register for Deeksharambh 2026 — Digital Creators League, an online creative contest series for newly admitted students of S-VYASA Deemed to be University. Create. Trend. Inspire.",
  keywords: [
    "Deeksharambh 2026",
    "Digital Creators League",
    "S-VYASA",
    "SVYASA",
    "contest",
    "registration",
  ],
  openGraph: {
    title: "Deeksharambh 2026 · Digital Creators League",
    description:
      "Create. Trend. Inspire. An online creative contest series for newly admitted students of S-VYASA Deemed to be University, Bengaluru.",
    type: "website",
    siteName: "S-VYASA Deemed to be University",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
