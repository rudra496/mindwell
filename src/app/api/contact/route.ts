import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Contact form endpoint.
 *
 * Sends a REAL email to the MindWell team via Resend and — crucially — reports
 * the TRUE outcome to the client. It only returns `{ success: true }` when an
 * email was actually accepted by Resend.
 *
 * The previous implementation returned `{ success: true }` while never sending
 * anything. On a mental-health platform that is unsafe: someone reaching out
 * for help would be told their message was delivered when it was silently
 * dropped. This version treats "not configured" and "send failed" as honest
 * failures (503 / 502) instead of silent successes.
 */

// Resend is initialized once per serverless instance. When RESEND_API_KEY is
// absent we still answer the request, but with an honest 503 (see below).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Recipient (the team inbox) and sender. The sender MUST be a Resend-verified
// address for reliable delivery. The shared sandbox address only delivers to
// the Resend account owner — fine for local/dev, not for production.
const CONTACT_TO = process.env.CONTACT_EMAIL || 'contactmindwellorg@gmail.com'
const CONTACT_FROM =
  process.env.RESEND_FROM || 'MindWell <onboarding@resend.dev>'

// The contact reason must match one of the form's <Select> options.
const ALLOWED_REASONS = new Set([
  'psychologist',
  'service-request',
  'general-inquiry',
  'feedback',
  'partnership',
  'other',
])

// Field length caps — keep messages bounded and reject obvious abuse.
const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_PREFERRED_TIME = 200
const MAX_MESSAGE = 5_000

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// --- Best-effort IP rate limiting ---------------------------------------
// NOTE: Vercel serverless functions are ephemeral, so an in-process Map is NOT
// a hard guarantee — a cold instance starts with empty state. This raises the
// bar for trivial spam and protects the Resend quota; the durable solution is
// Vercel Firewall / Upstash. The Map is capped to avoid unbounded memory
// growth across warm requests (unlike an unbounded Map, which leaks).
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 5
const RATE_LIMIT_WINDOW_MS = (Number(process.env.RATE_LIMIT_WINDOW) || 3600) * 1000
const RATE_LIMIT_MAP_MAX_ENTRIES = 1000
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

function rateLimitAllowed(key: string): boolean {
  const now = Date.now()

  // Bound the map: if it has grown too large, wipe it and start fresh. Losing
  // some rate-limit state occasionally is acceptable for best-effort limiting.
  if (rateLimitMap.size > RATE_LIMIT_MAP_MAX_ENTRIES) {
    rateLimitMap.clear()
  }

  const entry = rateLimitMap.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  entry.count += 1
  return entry.count <= RATE_LIMIT_MAX
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function POST(request: NextRequest) {
  try {
    // Guard payload size before parsing (Vercel/Next also cap this).
    const contentLength = Number(request.headers.get('content-length') || '0')
    if (contentLength > 64 * 1024) {
      return fail('Request too large.', 413)
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return fail('Invalid request body.', 400)
    }

    const fields = (body || {}) as Record<string, string>
    const { name, email, reason, preferredTime, message } = fields

    // Required fields.
    if (!name || !email || !reason || !message) {
      return fail('Missing required fields.', 400)
    }

    // Reason must match the form's defined options.
    if (!ALLOWED_REASONS.has(reason)) {
      return fail('Invalid contact reason.', 400)
    }

    // Email format + length caps on every free-text field.
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL) {
      return fail('Invalid email address.', 400)
    }
    if (name.length > MAX_NAME) {
      return fail('Name is too long.', 400)
    }
    if (preferredTime && preferredTime.length > MAX_PREFERRED_TIME) {
      return fail('Preferred time is too long.', 400)
    }
    if (message.length > MAX_MESSAGE) {
      return fail('Message is too long.', 400)
    }

    // Best-effort rate limit by client IP.
    if (!rateLimitAllowed(getClientIp(request))) {
      return fail('Too many requests. Please try again later.', 429)
    }

    // If email delivery isn't configured, say so honestly — never fake success.
    if (!resend) {
      console.warn('Contact form submitted but RESEND_API_KEY is not configured.')
      return NextResponse.json(
        {
          success: false,
          error: `Email delivery is not configured right now. Please email us directly at ${CONTACT_TO}.`,
        },
        { status: 503 },
      )
    }

    const subject = `MindWell Contact Form: ${reason}`
    const text = [
      'New contact form submission — MindWell',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Reason: ${reason}`,
      `Preferred time: ${preferredTime ? preferredTime : 'Not specified'}`,
      '',
      'Message:',
      message,
      '',
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n')

    try {
      // Resend returns `{ data, error }`. It does NOT always throw on failure
      // (e.g. an unverified sender yields a non-throwing error), so we must
      // inspect `error` ourselves — otherwise we'd report success on failure.
      const { error } = await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject,
        text,
      })

      if (error) {
        console.error('Resend rejected contact email:', error)
        return fail('We could not send your message. Please try again later.', 502)
      }
    } catch (sendError) {
      console.error('Resend send threw for contact form:', sendError)
      return fail('We could not send your message. Please try again later.', 502)
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you soon.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
