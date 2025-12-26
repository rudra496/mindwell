import { NextResponse } from 'next/server'

// Crisis keywords that trigger immediate crisis resources
const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'self harm', 'cut myself', 'hurt myself', 'harm myself',
  'overdose', 'end it all', 'better off dead', 'no reason to live',
  'going to die', 'plan to kill', 'goodbye cruel world'
]

// High-risk keywords that need supportive response
const HIGH_RISK_KEYWORDS = [
  'depressed', 'hopeless', 'worthless', 'can\'t go on', 'give up',
  'no point', 'unbearable', 'can\'t take it', 'too much pain'
]

function detectCrisisLevel(message: string): 'crisis' | 'high-risk' | 'moderate' | 'low' {
  const lowerMessage = message.toLowerCase()
  
  // Check for crisis keywords
  if (CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    return 'crisis'
  }
  
  // Check for high-risk keywords
  if (HIGH_RISK_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
    return 'high-risk'
  }
  
  // Check for anxiety/distress keywords
  if (lowerMessage.match(/anxious|anxiety|panic|worried|scared|afraid|stressed/)) {
    return 'moderate'
  }
  
  return 'low'
}

function generateResponse(message: string, crisisLevel: string): string {
  // CRISIS: Immediate intervention
  if (crisisLevel === 'crisis') {
    return `**I'm very concerned about what you've shared. Your safety is the top priority right now.**

🚨 **PLEASE GET HELP IMMEDIATELY:**

• **Call or text 988** - Suicide & Crisis Lifeline (24/7)
• **Text HELLO to 741741** - Crisis Text Line
• **Call 911** or go to nearest emergency room
• **National Suicide Prevention Lifeline: 1-800-273-8255**

**You are not alone.** Crisis counselors are available right now to help you. They understand what you're going through and want to support you.

If you're in immediate danger, please call 911 or have someone take you to an emergency room.

These feelings are temporary, even though they don't feel that way right now. Please reach out for help - you deserve support and there is hope.`
  }
  
  // HIGH-RISK: Strong support and resources
  if (crisisLevel === 'high-risk') {
    return `I can hear that you're going through an incredibly difficult time. What you're feeling is real and valid.

**You don't have to face this alone.** Here are some resources that can provide support:

• **988 Suicide & Crisis Lifeline** - Call or text 988 (24/7)
• **Crisis Text Line** - Text HELLO to 741741
• **SAMHSA National Helpline** - 1-800-662-4357 (24/7, free, confidential)

**Right now, you could:**
1. Reach out to someone you trust
2. Use the 5-4-3-2-1 grounding technique (in our Games section)
3. Take slow, deep breaths
4. Go to a safe, comfortable place

What you're experiencing is temporary, even though it might not feel that way. Many people have felt this way and found relief. Professional help can make a real difference.

Is there something specific that's causing you pain right now? Sometimes talking about it can help.`
  }
  
  // MODERATE: Supportive guidance
  if (crisisLevel === 'moderate') {
    const anxietyTopics = ['breath', 'ground', 'calm', 'relax', 'panic', 'anxiety', 'worried']
    const isAnxietyRelated = anxietyTopics.some(topic => message.toLowerCase().includes(topic))
    
    if (isAnxietyRelated) {
      return `I understand you're feeling anxious or overwhelmed. These feelings are uncomfortable, but they will pass.

**Here are some techniques that can help right now:**

1. **4-7-8 Breathing**: Breathe in for 4, hold for 7, out for 8. Repeat 4 times.
2. **5-4-3-2-1 Grounding**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
3. **Body Scan**: Notice tension in your body and consciously release it.

You can find guided versions of these in our Meditations and Games sections.

**Remember:**
• Anxiety is uncomfortable but not dangerous
• This feeling will pass
• You've gotten through this before
• You're safe right now in this moment

If anxiety is interfering with your daily life, consider taking the GAD-7 assessment in our Assessments section, and talk to a healthcare provider.

What triggered these feelings? Sometimes identifying the cause can help us address it.`
    }
    
    return `Thank you for sharing that with me. It takes courage to reach out when you're struggling.

**Here are some ways I can help:**

• **Learn about mental health conditions** - Check our Disorders Database
• **Take a self-assessment** - PHQ-9 for depression, GAD-7 for anxiety
• **Try coping techniques** - Browse our Therapy Techniques section
• **Practice meditation** - Guided meditations for anxiety, depression, sleep
• **Use therapeutic games** - Breathing exercises, grounding techniques

**Remember:** This platform provides education and tools, but it's not a substitute for professional care. If symptoms persist or worsen, please consider reaching out to a mental health professional.

What specific area would you like help with? I can guide you to relevant resources.`
  }
  
  // LOW: General support and guidance
  return `Hello! I'm here to help you navigate mental health resources and support.

**I can help you with:**

• Understanding mental health disorders and their symptoms
• Finding validated self-assessment tools
• Learning evidence-based therapy techniques (CBT, DBT, ACT)
• Accessing guided meditations and relaxation exercises
• Finding crisis resources if needed

**Important to know:**
• I'm an AI assistant, not a therapist or medical professional
• This platform is for education and support, not diagnosis or treatment
• If you're in crisis, please call 988 or your local emergency number

What would you like help with today? You can ask me about specific mental health topics, request assessment tools, or learn about coping strategies.`
}

export async function POST(request: Request) {
  try {
    const { message, conversationHistory } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Detect crisis level
    const crisisLevel = detectCrisisLevel(message)
    
    // Generate response
    const response = generateResponse(message, crisisLevel)
    
    // Return response with metadata
    return NextResponse.json({
      response,
      crisisLevel,
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
