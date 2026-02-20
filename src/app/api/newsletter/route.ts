import { NextRequest, NextResponse } from 'next/server'
import { isRateLimited } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(`newsletter:${ip}`, 3, 60_000)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request body format.' },
        { status: 400 }
      )
    }

    const { email } = body as Record<string, unknown>

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      )
    }

    // Optional: Brevo (formerly Sendinblue) integration via env var
    const brevoApiKey = process.env.BREVO_API_KEY
    if (brevoApiKey) {
      const brevoListId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : undefined
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          listIds: brevoListId ? [brevoListId] : [],
          updateEnabled: true,
        }),
      })

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}))
        // Duplicate contact is not an error for users
        if ((data as { code?: string }).code !== 'duplicate_parameter') {
          return NextResponse.json(
            { success: false, error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
          )
        }
      }
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for subscribing to the MindWell newsletter!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

