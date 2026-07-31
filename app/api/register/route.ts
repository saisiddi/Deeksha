import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 10;
const requests = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || entry.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  entry.count += 1;
  if (entry.count > maxRequestsPerWindow) {
    return true;
  }
  requests.delete(ip);
  requests.set(ip, entry);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Too many attempts. Please wait a minute and try again.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { status: "error", message: "Please check your details and try again." },
      { status: 400 },
    );
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not configured.");
    return NextResponse.json(
      {
        status: "error",
        message: "Registration is temporarily unavailable. Please try again later.",
      },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(20_000),
    });

    const raw = await upstream.text();

    let result: { status?: string; message?: string } | null = null;
    try {
      result = JSON.parse(raw);
    } catch {
      const isHtml = raw.trimStart().startsWith("<");
      console.error(
        `Apps Script returned ${isHtml ? "an HTML error page" : "non-JSON"}. ${
          isHtml
            ? "Check the deployment (Execute as: Me, Access: Anyone) and that the sheet has a tab named exactly 'Registrations'."
            : `Raw body: ${raw.slice(0, 300)}`
        }`,
      );
      return NextResponse.json(
        {
          status: "error",
          message: "We couldn't save your registration. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    if (!upstream.ok || result?.status !== "success") {
      console.error("Apps Script returned failure:", result?.message ?? upstream.status);
      return NextResponse.json(
        {
          status: "error",
          message: "We couldn't save your registration. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Registration proxy error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "We couldn't save your registration. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
