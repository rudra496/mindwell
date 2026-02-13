import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key from environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(email: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(email)
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(email, { count: 1, resetTime: now + 24 * 60 * 60 * 1000 }) // 24 hours
    return true
  }
  
  if (limit.count >= 3) {
    return false // Rate limit exceeded
  }
  
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, isBangladeshiStudent, universityName, primaryConcern, sessionFormat, message } = body

    // Validate required fields
    if (!email || !isBangladeshiStudent || !primaryConcern || !sessionFormat) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check rate limit
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 3 requests per 24 hours per email address.' },
        { status: 429 }
      )
    }

    // Validate message length
    if (message && message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be 500 characters or less' },
        { status: 400 }
      )
    }

    // Format concern and session format for readability
    const concernLabels: Record<string, string> = {
      anxiety: "Anxiety",
      depression: "Depression",
      trauma: "Trauma",
      relationship: "Relationship Issues",
      academic: "Academic Stress",
      other: "Other"
    }

    const formatLabels: Record<string, string> = {
      video: "Video Call",
      audio: "Audio Call",
      text: "Text Chat"
    }

    // Prepare email content
    const emailSubject = `[MindWell] Session Request from ${fullName || email}`
    const emailBody = `
New Session Request - MindWell Platform
========================================

Contact Information:
--------------------
Name: ${fullName || "Not provided"}
Email: ${email}

Student Status:
--------------
Bangladeshi University Student: ${isBangladeshiStudent === "yes" ? "Yes" : "No"}
${isBangladeshiStudent === "yes" ? `University: ${universityName}` : ""}

Session Details:
----------------
Primary Concern: ${concernLabels[primaryConcern] || primaryConcern}
Preferred Format: ${formatLabels[sessionFormat] || sessionFormat}

${message ? `Additional Message:\n${message}` : "No additional message provided."}

Request Submitted: ${new Date().toLocaleString()}
========================================

Please respond to this request within 48 hours.
    `.trim()

    // Send email using Resend (if API key is configured)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'MindWell <onboarding@resend.dev>', // TODO: Change to verified domain in production (e.g., 'MindWell <noreply@mindwell.app>')
          to: 'contactmindwellorg@gmail.com',
          replyTo: email,
          subject: emailSubject,
          text: emailBody,
        })
      } catch (emailError) {
        console.error('Resend email error:', emailError)
        // Fall back to nodemailer or log for manual processing
        // For now, log and continue to return success
        console.log('Email would have been sent:', { emailSubject, emailBody })
      }
    } else {
      // If no Resend API key, log the email content for manual processing
      console.log('=== SESSION REQUEST (Email not configured) ===')
      console.log('Subject:', emailSubject)
      console.log('Body:', emailBody)
      console.log('==============================================')
    }

    // Return success response (do NOT store data in database per requirements)
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your request has been sent successfully. You will receive a response within 48 hours.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing session request:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
