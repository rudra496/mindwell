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
    // For now, we'll log it and return success
    
    const emailData = {
      to: 'rudrasarker125@gmail.com',
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

    // Log the email data (in production, this would be sent via email service)
    console.log('Contact form submission:', emailData)

    // TODO: Integrate with actual email service
    // Example with SendGrid:
    // await sendgrid.send({
    //   to: 'rudrasarker125@gmail.com',
    //   from: 'noreply@mindwell.app',
    //   subject: emailData.subject,
    //   text: emailData.body,
    //   replyTo: email
    // })

    // For now, we'll simulate success
    // In production, replace this with actual email sending logic
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received. Email functionality needs to be configured with a service like SendGrid, Resend, or EmailJS.',
        note: 'Contact form data logged to console. Integrate email service to actually send emails.'
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
