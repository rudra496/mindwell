import { NextRequest, NextResponse } from 'next/server'

// Simple email sending using a free service or SMTP
// For production, you would use a service like SendGrid, AWS SES, or similar
// This is a basic implementation using mailto: for now
// In a real app, integrate with EmailJS, Resend, or SendGrid

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, reason, preferredTime, message } = body

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In a production environment, you would send an actual email here
    // using a service like SendGrid, AWS SES, Resend, or EmailJS
    
    const emailData = {
      to: 'contactmindwellorg@gmail.com',
      from: email,
      subject: `MindWell Contact Form: ${reason}`,
      body: `
Name: ${name}
Email: ${email}
Reason: ${reason}
Preferred Time: ${preferredTime || 'Not specified'}

Message:
${message}
      `,
      timestamp: new Date().toISOString()
    }

    // TODO: Integrate with actual email service
    // Example with SendGrid:
    // await sendgrid.send({
    //   to: 'contactmindwellorg@gmail.com',
    //   from: 'noreply@mindwell.app',
    //   subject: emailData.subject,
    //   text: emailData.body,
    //   replyTo: email
    // })

    // For development, log minimal info (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission received from:', email)
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
