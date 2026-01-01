import { NextRequest, NextResponse } from 'next/server'
import { generateChatbotResponse } from '@/lib/chatbot-engine'

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { 
          response: "I'm having trouble understanding your message. Please try again.",
          crisisLevel: 'normal'
        },
        { status: 200 } // Return 200 so client doesn't show error
      )
    }
    
    const { message } = body
    
    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { 
          response: "Please send a message so I can help you.",
          crisisLevel: 'normal'
        },
        { status: 200 }
      )
    }
    
    // Trim and validate message length
    const trimmedMessage = message.trim()
    if (trimmedMessage.length === 0) {
      return NextResponse.json(
        { 
          response: "Please send a message so I can help you.",
          crisisLevel: 'normal'
        },
        { status: 200 }
      )
    }
    
    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { 
          response: "Your message is too long. Please keep it under 5000 characters.",
          crisisLevel: 'normal'
        },
        { status: 200 }
      )
    }
    
    // Generate response using the comprehensive chatbot engine
    const result = generateChatbotResponse(trimmedMessage)
    
    // Return response with metadata
    return NextResponse.json({
      response: result.response,
      crisisLevel: result.crisisLevel,
      timestamp: new Date().toISOString(),
      disclaimer: 'This is an AI assistant providing educational information only. Not a substitute for professional medical advice.'
    })
    
  } catch (error) {
    // Log error for debugging but don't expose details to client
    console.error('Chatbot API error:', error)
    
    // Return a helpful fallback response instead of an error
    return NextResponse.json(
      { 
        response: "I'm having trouble right now. Please try again or reach out to 988 if you're in crisis.",
        crisisLevel: 'normal',
        timestamp: new Date().toISOString()
      },
      { status: 200 } // Return 200 so client doesn't show error page
    )
  }
}

// GET endpoint for chatbot info
export async function GET() {
  return NextResponse.json({
    message: 'Mental Health Support Chatbot',
    description: 'A comprehensive mental health chatbot providing education, resources, and crisis support with 500+ responses.',
    capabilities: [
      'Crisis detection and intervention',
      'Mental health education (depression, anxiety, PTSD, OCD, bipolar, eating disorders, ADHD, etc.)',
      'Coping strategies and techniques',
      'Resource recommendations',
      'Assessment tool guidance',
      'Therapy and medication information',
      'Sleep, stress, and relationship guidance'
    ],
    features: [
      '500+ intelligent responses',
      'Pattern-matched mental health support',
      'Crisis keyword detection',
      'Empathetic and evidence-based advice'
    ],
    disclaimer: 'This chatbot is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. In crisis, call 988 or text HELLO to 741741.'
  })
}
