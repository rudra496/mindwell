import { NextRequest, NextResponse } from 'next/server'
import { isRateLimited } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(`testimonials:${ip}`, 2, 60_000)) {
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

    const { text, rating } = body as Record<string, unknown>

    if (!text || typeof text !== 'string' || text.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Testimonial text must be at least 10 characters.' },
        { status: 400 }
      )
    }

    if (text.trim().length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Testimonial text must not exceed 1000 characters.' },
        { status: 400 }
      )
    }

    if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
      return NextResponse.json(
        { success: false, error: 'Rating must be a number between 1 and 5.' },
        { status: 400 }
      )
    }

    // Submissions are logged for admin review; no personal data is stored
    if (process.env.NODE_ENV === 'development') {
      console.log('New testimonial submission received (pending review)')
    }

    // Optional: notify admin via email service
    const adminEmail = process.env.ADMIN_EMAIL
    const brevoApiKey = process.env.BREVO_API_KEY
    if (adminEmail && brevoApiKey) {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { email: 'noreply@mindwell-navy.vercel.app', name: 'MindWell' },
          to: [{ email: adminEmail }],
          subject: 'New testimonial submission pending review',
          textContent: `A new anonymous testimonial has been submitted and is pending your review.\n\nRating: ${rating ?? 'not provided'}\nText: ${text.trim()}`,
        }),
      }).catch(() => {
        // Non-critical — don't fail the request if notification fails
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your testimonial! It will be reviewed before being published.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Testimonial submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

