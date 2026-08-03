# Deeksharambh 2026 — Digital Creators League

Single-page, luxury-themed registration website for the Digital Creators League,
an online creative contest series for newly admitted students of **S-VYASA
Deemed to be University, Bengaluru**. Registrations are written straight into a
Google Sheet via a Next.js API route → Google Apps Script Web App.

Theme: **Create. Trend. Inspire.**

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS (v4, CSS-first config)
- Framer Motion
- lucide-react
- React Hook Form + Zod
- Google Apps Script Web App (appends rows to a Google Sheet)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Connecting the Google Sheet (back-end)

1. **Create the sheet** — name it `Deeksharambh 2026 - DCL Registrations`,
   with a single tab `Registrations`. Row 1 headers, in this exact order:

   | A1 | B1 | C1 | D1 | E1 | F1 | G1 |
   |---|---|---|---|---|---|---|
   | `FullName` | `USN` | `Department` | `GroupNumber` | `TeamLeaderEmail` | `WhatsAppNumber` | `EventsSelected` |

   Freeze row 1 (optional polish: bold headers, gold fill).

2. **Attach the Apps Script** — in the Sheet: `Extensions → Apps Script`,
   paste the code from below into `Code.gs`, then
   `Deploy → New deployment → Web app` with **Execute as: Me** and
   **Who has access: Anyone**. Copy the resulting `/exec` URL.

3. **Set the environment variable** — copy `.env.example` to `.env.local` and
   paste the URL:

   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

   `.env.local` is git-ignored. **Also set `GOOGLE_SCRIPT_URL` in Vercel's
   project environment variables** before deploying.

### Apps Script Code.gs

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Registrations') || ss.getSheets()[0];
  const data = JSON.parse(e.postData.contents);

  // Basic server-side required-field check
  const required = ['fullName', 'usn', 'department', 'groupNumber', 'teamLeaderEmail', 'whatsapp', 'events'];
  for (const field of required) {
    if (!data[field]) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: 'Missing field: ' + field })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  const eventName = Array.isArray(data.events) ? data.events.join(', ') : data.events;
  const usn = String(data.usn).toUpperCase().trim();

  // De-dup: same USN + same event already registered → return success
  // WITHOUT appending (prevents double entries on retries)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const usns = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
    const eventsCol = sheet.getRange(2, 7, lastRow - 1, 1).getValues().flat();
    for (let i = 0; i < usns.length; i++) {
      if (
        String(usns[i]).toUpperCase().trim() === usn &&
        String(eventsCol[i]).trim() === eventName
      ) {
        return ContentService.createTextOutput(
          JSON.stringify({ status: 'success', duplicate: true, message: 'Already registered for this event.' })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  sheet.appendRow([
    data.fullName,
    usn,
    data.department,
    data.groupNumber,
    data.teamLeaderEmail,
    data.whatsapp,
    eventName
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

> The tab must be named exactly **`Registrations`** (case-sensitive). If it
> isn't, the script falls back to the first tab instead of failing.
>
> Column order above matches the headers — `TeamLeaderEmail` sits between
> `GroupNumber` and `WhatsAppNumber`. If you already have rows in the sheet,
> insert the `TeamLeaderEmail` column in that position before testing.
>
> **After any edit to `Code.gs`**: redeploy via **Deploy → Manage deployments →
> Edit → Version: New version → Deploy**. The `/exec` URL stays the same, so
> `GOOGLE_SCRIPT_URL` does not need to change.

### Troubleshooting: 502 / 500 from `/api/register`

The route proxies to the Apps Script URL. If the script returns an HTML
error page (Apps Script errors are served as HTML with HTTP 200), the route
responds 502. The most common causes, in order:

1. **Sheet tab name mismatch** — the tab isn't named exactly `Registrations`
   (often still `Sheet1`). Rename the tab. The script now falls back to the
   first tab, but the exact name is still the correct setup.
2. **Deployment settings** — in Apps Script: `Deploy → Manage deployments`,
   edit the deployment: *Execute as* = **Me**, *Who has access* = **Anyone**
   (not "Anyone with a Google account" — that redirects to a login page and
   returns HTML, not JSON). After editing, create a **New version** and
   redeploy, or the live `/exec` URL won't change.
3. **Script errors** — check `Extensions → Apps Script → Executions` (clock
   icon) for the failed run and read the error. The route logs a summary of
   the Apps Script response to the server console.

## How the form flows

1. Browser validates with the same Zod schema (`lib/validation.ts`).
2. POST → `app/api/register/route.ts` — re-validates server-side, rate-limits
   per IP, and proxies to the Apps Script URL (kept out of the browser).
3. Apps Script appends a row (name, USN, department, group, team leader
   email, WhatsApp, selected event) and returns `{ status: 'success' }`.
4. On success the form is replaced by an elegant confirmation panel; on
   failure the user's typed data is preserved and a "Try Again" button appears.

## Structure

```
app/
  layout.tsx          Fonts (Playfair Display + Manrope), metadata
  page.tsx            Single-page composition
  globals.css         Design tokens, grain/rays textures, focus styles
  api/register/       POST proxy → Google Apps Script
components/           Navbar, Hero, About, Events, Timeline, Awards,
                      RegistrationForm, Coordinators, Footer, shared bits
lib/
  constants.ts        Events, timeline, coordinators, objectives (source: proposal)
  validation.ts       Shared Zod schema (client + server)
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

In the Vercel dashboard, add `GOOGLE_SCRIPT_URL` under
**Project → Settings → Environment Variables** and redeploy.

## Notes

- Content (event specs, timeline, awards, coordinator contacts) is pulled
  from `Digital_Creators_League_2026_Proposal_Final.docx`.
