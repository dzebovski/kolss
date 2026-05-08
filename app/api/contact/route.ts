import { NextResponse } from "next/server";

import {
  contactSchema,
  type ContactErrorResponse,
  type ContactPayload,
  type ContactResponse,
  zodErrorsToFieldErrors,
} from "@/lib/validation/contact";

type RateLimitEntry = {
  windowStartMs: number;
  count: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_PER_WINDOW = 8;
const rateLimitByIp = new Map<string, RateLimitEntry>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string, nowMs: number): boolean {
  const entry = rateLimitByIp.get(ip);
  if (!entry) {
    rateLimitByIp.set(ip, { windowStartMs: nowMs, count: 1 });
    return false;
  }

  if (nowMs - entry.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    rateLimitByIp.set(ip, { windowStartMs: nowMs, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_PER_WINDOW;
}

function json(
  body: ContactResponse,
  init?: { status?: number },
): NextResponse<ContactResponse> {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: {
      "cache-control": "no-store",
    },
  });
}

function badRequest(body: ContactErrorResponse) {
  return json(body, { status: 400 });
}

export async function POST(request: Request) {
  const nowMs = Date.now();
  const ip = getClientIp(request);

  if (isRateLimited(ip, nowMs)) {
    return json(
      {
        ok: false,
        formError: "Zbyt wiele zgłoszeń. Spróbuj ponownie później.",
      },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return badRequest({
      ok: false,
      formError: "Nieprawidłowe dane formularza.",
    });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return badRequest({
      ok: false,
      fieldErrors: zodErrorsToFieldErrors(parsed.error),
    });
  }

  const payload: ContactPayload = parsed.data;

  // Honeypot: treat as success to avoid giving signal to bots.
  if (payload.website && payload.website.trim().length > 0) {
    return json({ ok: true });
  }

  // CRM-first placeholder: structured log (no persistence).
  console.info("[contact]", {
    ip,
    at: new Date(nowMs).toISOString(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    location: payload.location,
    projectType: payload.projectType,
    messageLen: payload.message?.length ?? 0,
    attachmentsMeta: payload.attachments?.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    })),
  });

  return json({ ok: true });
}
