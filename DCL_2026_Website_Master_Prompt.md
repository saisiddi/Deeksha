# MASTER BUILD PROMPT
## Deeksharambh 2026 — Digital Creators League — Registration Website

Paste everything below (as-is) to your AI coding agent. Attach the file
`Digital_Creators_League_2026_Proposal_Final.docx` alongside it — the agent
must read it and pull exact copy (event descriptions, rules, timeline) from
there instead of inventing content.

---

## 1. PROJECT BRIEF

Build a **single-page, ultra-premium, luxury-themed marketing + registration
website** for **"Deeksharambh 2026 — Digital Creators League"**, a creative
contest series for newly admitted students of **S-VYASA Deemed to be
University, Bengaluru**.

The site has ONE job beyond looking incredible: **capture student
registrations and write each submission as a new row into a Google Sheet**,
reliably, with validation, and with zero data loss even on flaky mobile
networks.

This is a real, publicly-shared event page (shared via QR code + WhatsApp to
hundreds of new students), so it must feel like a professional agency built
it — not a college hackathon project. Treat visual polish, motion, and
responsiveness as first-class requirements, not nice-to-haves.

---

## 2. TECH STACK (use exactly this — do not substitute)

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + a small set of custom CSS variables for the
  luxury theme (see Section 3)
- **Animation:** Framer Motion (subtle, tasteful — never gimmicky)
- **Icons:** lucide-react
- **Fonts:** Google Fonts, self-hosted via `next/font` (see Section 3)
- **Form handling:** React Hook Form + Zod for validation
- **Backend:** No custom backend server. The registration form POSTs
  (as `application/x-www-form-urlencoded` via a hidden iframe or `no-cors`
  fetch — see Section 6) directly to a **Google Apps Script Web App URL**
  that appends rows to a Google Sheet. Wrap this call in a Next.js API route
  (`/app/api/register/route.ts`) that proxies the request server-side —
  this avoids CORS issues entirely and lets you validate/sanitize on the
  server before it ever reaches the sheet.
- **Deployment target:** Vercel
- **Responsiveness:** Mobile-first. Assume 70%+ of traffic is mobile
  (students scanning a QR code on their phone). Test at 375px, 768px,
  1024px, 1440px.

---

## 3. DESIGN SYSTEM — "Deeksharambh Luxury" theme

The theme is derived from the official Deeksharambh 2026 countdown poster
(deep maroon/wine gradient background, radiant gold typography, elegant
italic serif display type, minimal orange accreditation accent). Match this
exactly — do not default to generic purple/blue SaaS gradients.

### Color tokens (define as CSS variables in `globals.css`)

```css
:root {
  /* Core palette */
  --color-maroon-950: #1a0505;   /* deepest background / footer */
  --color-maroon-900: #2b0808;   /* section background */
  --color-maroon-800: #4a0e0e;   /* mid-tone panels, cards */
  --color-maroon-700: #6b1414;   /* hover states, borders */

  --color-gold-500: #d4af37;     /* primary accent — headings, CTAs */
  --color-gold-400: #e8c766;     /* gold hover / highlight */
  --color-gold-300: #f2dfa0;     /* soft gold, dividers */

  --color-cream-100: #faf5ea;    /* primary body text on dark bg */
  --color-cream-200: #ede0c8;    /* secondary text */

  --color-accent-orange: #e8632c; /* used SPARINGLY — badges, "A+" style tags only */

  --color-success: #3fae5c;
  --color-error: #d64545;
}
```

Background treatment: a deep radial/linear maroon gradient
(`--color-maroon-950` → `--color-maroon-800`) with a very subtle repeating
diagonal ray/vignette texture behind the hero (like the poster) — implement
as an SVG or CSS conic-gradient overlay at low opacity, never a stock photo.

### Typography

- **Display / Headings:** `Playfair Display` (italic weight 700/900 for
  hero numerals and hero title, matching the poster's elegant script-serif
  "Days To Go" / "Deeksharambh 2026" look). Use `font-style: italic` for
  hero headline text specifically.
- **Body / UI:** `Inter` or `Manrope` — clean, highly legible, works well
  in form fields.
- Headings in gold (`--color-gold-500`) on dark maroon backgrounds, or
  deep maroon on the light card sections if you introduce any.

### Visual language rules

- Gold hairline borders (1px, `--color-gold-500` at 30–40% opacity) on
  cards instead of heavy drop shadows.
- Buttons: gold gradient fill, deep maroon text, subtle scale + glow on
  hover (framer-motion `whileHover`), never flat/generic.
- Generous whitespace, large type scale — this should feel like an
  invitation card, not a bootstrap template.
- Use the official S-VYASA logo + "NAAC A+ Accredited University" lockup
  (from the reference image) in the navbar, sized tastefully — do not
  stretch or distort it.
- Subtle grain/noise texture overlay at ~3% opacity on dark sections adds
  premium feel — optional but encouraged.
- Micro-interactions: form fields get a soft gold glow on focus; success
  state on submit shows a tasteful confetti-free checkmark animation
  (no cheap confetti libraries — keep it elegant).

---

## 4. PAGE STRUCTURE (single scrollable page, sticky nav)

### 4.1 Navbar (sticky, transparent → solid maroon on scroll)
- S-VYASA logo + "NAAC A+" lockup, left
- Links: Home, Events, Timeline, Register, Coordinators — right (smooth
  scroll to section)
- "Register Now" gold pill button, always visible

### 4.2 Hero Section
- Large italic serif headline: **"Deeksharambh 2026"**
- Subheading: **"Digital Creators League"**
- Tagline (from proposal doc): *"Create. Trend. Inspire."*
- Supporting line: *"Every creator has a story. Every story deserves a
  spotlight."*
- Registration window badge: **Registration Opens 03 Aug 2026 · Closes 27
  Aug 2026**
- Primary CTA button → scrolls to Register section
- Background: the maroon gradient + ray texture described in Section 3.
  Optionally echo the "countdown numeral" motif from the reference poster
  as a subtle large ghosted number/graphic — do not literally reuse "3"
  since that was the countdown poster, not evergreen; instead use a large
  ghosted gold "✦" or camera/reel icon motif, or omit if unsure.

### 4.3 About / Introduction
Pull directly from proposal Section 1 (Introduction) and Section 2
(Objectives) — paraphrase into 2–3 short, punchy paragraphs plus a 4–6
item objectives list with icons (lucide-react: Sparkles, Users, Camera,
Trophy, etc.)

### 4.4 Event Categories (5 cards, grid → carousel on mobile)
For each of the 5 events below, render a card with: emoji/icon, event
name, theme line, format/duration specs, short description. Content
source = proposal Section 3 & 4 (use exactly, do not shorten specs like
resolution/duration — those are compliance-critical):

1. 🎬 **Campus Diaries** — *My First Week @ SVYASA* — 30–60 sec Reel,
   MP4, vertical 9:16, min 720p, max 200MB
2. 👑 **Campus Vogue** — *Style with Confidence* — 20–45 sec Fashion
   Reel, MP4, vertical 9:16, min 720p
3. 🌟 **Minute to Shine** — *Every Talent Has a Stage* — max 60 sec
   Talent Video, MP4, min 720p
4. 🧘 **Yoga in Motion** — *Balance. Breathe. Become.* — 30–60 sec Yoga
   Reel, MP4, vertical 9:16, min 720p
5. 📸 **Campus Through Your Lens** — *The Beauty of SVYASA* — Photography,
   JPG/JPEG, min 1920×1080

### 4.5 Timeline (from proposal Section 12)
Elegant vertical/horizontal timeline component:
- Registration Opens — 03/08/2026
- Registration Closes — 27/08/2026
- Submission Window — 05/08/2026 onward
- Evaluation by Judges — To be Announced
- Result Announcement — During Valedictory Ceremony
- Prize Distribution — During Valedictory Ceremony

### 4.6 Awards (from proposal Section 11)
Short highlight strip: "5 Category Winners · ₹2,000 each (subject to
confirmation) · Certificates for Winners, Runners-up & all valid
Participants."

### 4.7 Registration Form Section — THE CORE FEATURE
Card-style form, centered, on a slightly lighter maroon panel with gold
border. Fields (exact set required per proposal Section 5):

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | text | ✅ | min 3 chars |
| USN | text | ✅ | uppercase, pattern-validate against SVYASA USN format if known, else min 6 chars |
| Department | select or text | ✅ | if you don't have a fixed department list, use free text |
| Group Number | text or number | ✅ | |
| WhatsApp Number | tel | ✅ | validate 10-digit Indian mobile, allow +91 prefix |
| Event(s) of Participation | multi-select checkboxes | ✅ (min 1) | the 5 events listed in 4.4 — students may select multiple |

Only these 6 fields are collected — no consent checkbox, no submission ID.

Submit button: **"Register Now"** — gold gradient, loading spinner state,
disabled while submitting.

On success: replace form with an elegant success panel — "You're
Registered! 🎉" + a short summary of the name, USN, and events they just
submitted + a note that submission (video/photo upload) happens
separately via the official Submission Form closer to the deadline.

On failure: clear, non-technical error message + a "Try Again" button;
never lose the user's already-typed data on error (keep form state).

### 4.8 Coordinators Section
Section title: **"Have Questions? Reach Out"**
Three elegant contact cards (name, role optional, phone number as a
tap-to-call `tel:` link, WhatsApp icon linking to `https://wa.me/91...`):

- **Nidhi Singh** — +91 94549 29255
- **Kalmadi Saisiddi** — +91 87925 26242
- **Tarun** — +91 99721 70225

### 4.9 Footer
- S-VYASA logo mark, small
- Quick links repeat
- Copyright line: `© 2026 S-VYASA Deemed to be University. All rights reserved.`
- Developer credit line, clearly separated:
  **"Developed by Kalmadi Saisiddi · 143saisiddi@gmail.com"**

---

## 5. RESPONSIVE & ACCESSIBILITY REQUIREMENTS

- Fully responsive at 375px / 390px / 768px / 1024px / 1440px+ — test
  every section, not just the hero.
- Touch targets ≥ 44px on mobile (buttons, checkboxes, nav links).
- Form must be fully usable with mobile keyboards (correct `inputmode`
  and `type` per field — e.g. `inputmode="numeric"` for phone/group
  number).
- Color contrast: gold-on-maroon text must meet at least WCAG AA for body
  text (verify with a contrast checker — darken/lighten tokens slightly
  if needed rather than breaking the palette).
- All interactive elements keyboard-navigable, visible focus states
  (gold outline, not browser default blue).
- `alt` text on all images/logos.
- Page must score 90+ on Lighthouse mobile for Performance and
  Accessibility — lazy-load non-critical images, use `next/image`
  everywhere, avoid layout shift (reserve space for the logo/hero).

---

## 6. BACKEND: GOOGLE SHEETS INTEGRATION (do exactly this)

**Architecture:** Browser → Next.js API route (`/api/register`) → Google
Apps Script Web App (deployed as "Execute as: Me", "Who has access:
Anyone") → appends a row to the Google Sheet.

Do NOT call the Apps Script URL directly from client-side JS — always
proxy through the Next.js API route so you can validate input server-side
first and so the Apps Script URL is never exposed in browser devtools.

### 6.1 Google Sheet — exact structure

Create a Google Sheet named **`Deeksharambh 2026 - DCL Registrations`**
with a single tab named **`Registrations`**. Row 1 must contain these
exact headers, in this exact column order:

| Cell | Header |
|---|---|
| A1 | `Timestamp` |
| B1 | `Full Name` |
| C1 | `USN` |
| D1 | `Department` |
| E1 | `Group Number` |
| F1 | `WhatsApp Number` |
| G1 | `Events Selected` |

Notes:
- `G1` (`Events Selected`) stores the chosen events as a single comma-
  separated string, e.g. `Campus Diaries, Yoga in Motion`.
- Freeze row 1 and apply basic formatting (bold headers, gold fill to
  match brand — optional polish).

### 6.2 Google Apps Script (Code.gs) — attach this to the Sheet

Deploy this from **Extensions → Apps Script** inside the target Sheet,
then **Deploy → New deployment → Web app** (Execute as: Me, Access:
Anyone). Copy the resulting `/exec` URL into the Next.js API route as an
environment variable `GOOGLE_SCRIPT_URL`.

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
  const data = JSON.parse(e.postData.contents);

  // Basic server-side required-field check
  const required = ['fullName', 'usn', 'department', 'groupNumber', 'whatsapp', 'events'];
  for (const field of required) {
    if (!data[field]) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: `Missing field: ${field}` })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  sheet.appendRow([
    new Date(),
    data.fullName,
    data.usn.toUpperCase(),
    data.department,
    data.groupNumber,
    data.whatsapp,
    Array.isArray(data.events) ? data.events.join(', ') : data.events
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### 6.3 Next.js API route (`/app/api/register/route.ts`)

- Accept POST with JSON body matching the Zod schema used on the
  client (fullName, usn, department, groupNumber, whatsapp, events[]).
- Re-validate server-side (never trust client validation alone).
- Forward the validated payload to `process.env.GOOGLE_SCRIPT_URL` via
  `fetch(url, { method: 'POST', body: JSON.stringify(payload) })`.
- Return the Apps Script's JSON response back to the client so the
  success screen can confirm the registration went through.
- Wrap in try/catch; on any failure return a clean `{ status: 'error' }`
  with HTTP 500 — never leak the Apps Script URL or raw error stack to
  the client.
- Add basic rate-limiting or duplicate-submission guard if easy (e.g.
  disable the submit button immediately on click, re-enable only on
  error).

### 6.4 Environment variables
`.env.local`:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```
Add this to `.gitignore` and document it in the README so it's set again
in Vercel's project environment variables at deploy time.

---

## 7. CONTENT SOURCE OF TRUTH

All factual copy (event rules, dates, prize amounts, eligibility rules,
evaluation criteria) MUST be pulled from
`Digital_Creators_League_2026_Proposal_Final.docx` — do not invent or
alter dates, durations, resolutions, or prize amounts. Note that prize
amounts are explicitly marked "Not Confirmed yet" in the source document
— preserve that caveat in the UI (e.g. small "*subject to confirmation"
note) rather than presenting ₹2,000 as guaranteed.

---

## 8. DELIVERABLES CHECKLIST

- [ ] Next.js 14 TypeScript project, clean folder structure
- [ ] Fully responsive, luxury maroon/gold themed single-page site
- [ ] Hero, About, Events, Timeline, Awards, Registration Form,
      Coordinators, Footer — all sections implemented per spec above
- [ ] Working registration form → Next.js API route → Google Apps
      Script → Google Sheet, with the exact column structure in 6.1
- [ ] Client + server-side validation, loading/success/error states
- [ ] Lighthouse mobile score 90+ on Performance & Accessibility
- [ ] README with setup steps, including how to plug in the Apps Script
      URL and deploy to Vercel
