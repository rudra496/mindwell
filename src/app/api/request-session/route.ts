import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Session-request endpoint.
 *
 * Sends a REAL email to the MindWell team via Resend and reports the TRUE
 * outcome. Previously this swallowed Resend errors and returned `success`
 * while sending from an unverified sandbox address — so a student (possibly in
 * distress) requesting a psychologist session could be silently dropped. Now
 * mirrors the contact endpoint: honest 503/502, verified-domain sender, and a
 * bounded (non-leaking) best-effort rate limit.
 */
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const SESSION_TO = process.env.CONTACT_EMAIL || 'contactmindwellorg@gmail.com'
const SESSION_FROM = process.env.RESEND_FROM || 'MindWell <onboarding@resend.dev>'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 2_000

// Best-effort, email-keyed rate limit: N requests per window per email.
// NOTE: serverless instances are ephemeral, so this is not a hard guarantee;
// the durable solution is Vercel Firewall / Upstash. The Map is capped to
// avoid unbounded growth across warm requests (the old version leaked).
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 3
const RATE_LIMIT_WINDOW_MS = (Number(process.env.RATE_LIMIT_WINDOW) || 86400) * 1000
const RATE_LIMIT_MAP_MAX_ENTRIES = 1000
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimitAllowed(key: string): boolean {
  const now = Date.now()
  if (rateLimitMap.size > RATE_LIMIT_MAP_MAX_ENTRIES) rateLimitMap.clear()
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
    const contentLength = Number(request.headers.get('content-length') || '0')
    if (contentLength > 64 * 1024) return fail('Request too large.', 413)

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return fail('Invalid request body.', 400)
    }

    const fields = (body || {}) as Record<string, string>
    const { fullName, email, isBangladeshiStudent, universityName, primaryConcern, sessionFormat, message } = fields

    if (!email || !isBangladeshiStudent || !primaryConcern || !sessionFormat) {
      return fail('Missing required fields.', 400)
    }
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return fail('Invalid email address.', 400)
    }
    if (message && message.length > MAX_MESSAGE) {
      return fail('Message is too long.', 400)
    }

    if (!rateLimitAllowed(email.toLowerCase())) {
      return fail('You have reached the request limit. Please try again later.', 429)
    }

    if (!resend) {
      console.warn('Session request submitted but RESEND_API_KEY is not configured.')
      return NextResponse.json(
        {
          success: false,
          error: `Request delivery is not configured right now. Please email us directly at ${SESSION_TO}.`,
        },
        { status: 503 },
      )
    }

    const concernLabels: Record<string, string> = {
      anxiety: 'Anxiety',
      depression: 'Depression',
      trauma: 'Trauma',
      relationship: 'Relationship Issues',
      academic: 'Academic Stress',
      other: 'Other',
    }
    const formatLabels: Record<string, string> = {
      video: 'Video Call',
      audio: 'Audio Call',
      text: 'Text Chat',
    }

    const subject = `[MindWell] Session Request from ${fullName || email}`
    const text = [
      'New Session Request — MindWell Platform',
      '========================================',
      '',
      `Name: ${fullName || 'Not provided'}`,
      `Email: ${email}`,
      '',
      'Student Status:',
      `Bangladeshi University Student: ${isBangladeshiStudent === 'yes' ? 'Yes' : 'No'}`,
      ...(isBangladeshiStudent === 'yes' ? [`University: ${universityName || 'Not provided'}`] : []),
      '',
      'Session Details:',
      `Primary Concern: ${concernLabels[primaryConcern] || primaryConcern}`,
      `Preferred Format: ${formatLabels[sessionFormat] || sessionFormat}`,
      '',
      message ? `Additional Message:\n${message}` : 'No additional message provided.',
      '',
      `Submitted: ${new Date().toISOString()}`,
      '========================================',
      'Please respond to this request within 48 hours.',
    ].join('\n')

    try {
      const { error } = await resend.emails.send({
        from: SESSION_FROM,
        to: SESSION_TO,
        replyTo: email,
        subject,
        text,
      })
      if (error) {
        console.error('Resend rejected session-request email:', error)
        return fail('We could not send your request. Please try again later.', 502)
      }
    } catch (sendError) {
      console.error('Resend send threw for session request:', sendError)
      return fail('We could not send your request. Please try again later.', 502)
    }

    return NextResponse.json(
      { success: true, message: 'Your request has been sent. You will receive a response within 48 hours.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing session request:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
