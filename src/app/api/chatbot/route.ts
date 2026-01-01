import { NextResponse } from 'next/server'
import { getFallbackResponse } from '@/lib/chat-fallback'

export async function POST(request: Request) {
  try {
    const { message, conversationHistory } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Use the enhanced fallback system with pattern matching
    // Note: Puter.js AI is attempted client-side in the modal component
    const result = getFallbackResponse(message, detectCrisisLevel(message))
    
    // Return response with metadata
    return NextResponse.json({
      response: result.response,
      crisisLevel: result.crisisLevel,
      timestamp: new Date().toISOString(),
      disclaimer: 'This is an AI assistant providing educational information only. Not a substitute for professional medical advice.'
    })
    
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

function detectCrisisLevel(message: string): 'crisis' | 'high-risk' | 'moderate' | 'low' {
  const lowerMessage = message.toLowerCase()
  
  const crisisKeywords = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
    'self-harm', 'self harm', 'cut myself', 'hurt myself', 'harm myself',
    'overdose', 'end it all', 'better off dead', 'no reason to live',
    'going to die', 'plan to kill', 'goodbye cruel world'
  ]
  
  const highRiskKeywords = [
    'depressed', 'hopeless', 'worthless', 'can\'t go on', 'give up',
    'no point', 'unbearable', 'can\'t take it', 'too much pain'
  ]
  
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'crisis'
  }
  
  if (highRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'high-risk'
  }
  
  if (lowerMessage.match(/anxious|anxiety|panic|worried|scared|afraid|stressed/)) {
    return 'moderate'
  }
  
  return 'low'
}

// Optional: GET endpoint for chatbot info
export async function GET() {
  return NextResponse.json({
    message: 'Mental Health Support Chatbot',
    description: 'An AI assistant providing mental health education, resources, and crisis support.',
    capabilities: [
      'Crisis detection and intervention',
      'Mental health education',
      'Resource recommendations',
      'Coping strategy suggestions',
      'Assessment tool guidance'
    ],
    disclaimer: 'This chatbot is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. In crisis, call 988.'
  })
}
