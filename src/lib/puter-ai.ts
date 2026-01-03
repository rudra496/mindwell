/**
 * Puter.js AI Integration for Free Chatbot
 * Provides 100% free AI chat capabilities without API keys
 */

import { getFallbackResponse } from './chat-fallback'

declare global {
  interface Window {
    puter?: {
      ai?: {
        chat: (message: string, options?: {
          model?: string
          systemPrompt?: string
          temperature?: number
        }) => Promise<string>
      }
    }
  }
}

const SYSTEM_PROMPT = `You are MindWell, a compassionate mental health support assistant. 

Your role:
- Provide evidence-based information about mental health conditions
- Offer emotional support and validation
- Suggest coping strategies and self-help techniques
- Guide users to appropriate resources
- Detect crisis situations and provide immediate help

Important guidelines:
- You NEVER diagnose mental health conditions
- You ALWAYS recommend professional help for serious concerns
- You detect crisis keywords (suicide, self-harm) and provide immediate crisis resources
- You are warm, empathetic, non-judgmental, and supportive
- You use simple, clear language
- You validate feelings while offering hope

Crisis resources you should mention when needed:
- 988 Suicide & Crisis Lifeline (call or text)
- Crisis Text Line: Text HELLO to 741741
- 911 for emergencies

You have access to information about:
- Mental health disorders (depression, anxiety, PTSD, OCD, bipolar, etc.)
- Validated assessment tools (PHQ-9, GAD-7, PCL-5, etc.)
- Therapy techniques (CBT, DBT, ACT, mindfulness)
- Meditation and relaxation exercises
- Coping strategies and self-help tools

Always be supportive, compassionate, and focus on providing practical help.`

export async function getChatResponse(
  message: string, 
  conversationHistory: { role: string; content: string }[] = []
): Promise<{ response: string; crisisLevel: string; usingAI: boolean }> {
  
  // Try Puter.js AI first
  if (typeof window !== 'undefined' && window.puter?.ai?.chat) {
    try {
      const aiResponse = await window.puter.ai.chat(message, {
        model: 'gpt-4o-mini',
        systemPrompt: SYSTEM_PROMPT,
        temperature: 0.7
      })
      
      // Extract string content from response - handle both string and object formats
      let response: string
      if (typeof aiResponse === 'string') {
        response = aiResponse
      } else if (aiResponse && typeof aiResponse === 'object') {
        // Handle OpenAI-style response format
        const resp = aiResponse as any
        if (resp.message) {
          response = typeof resp.message === 'string' 
            ? resp.message 
            : resp.message.content || String(resp.message)
        } else if (resp.choices && Array.isArray(resp.choices) && resp.choices[0]) {
          response = resp.choices[0].message?.content || resp.choices[0].text || String(aiResponse)
        } else if (resp.content) {
          response = resp.content
        } else if (resp.text) {
          response = resp.text
        } else {
          response = String(aiResponse)
        }
      } else {
        response = String(aiResponse || '')
      }
      
      // Detect crisis level from the message
      const crisisLevel = detectCrisisLevel(message)
      
      return {
        response: response || getFallbackResponse(message, crisisLevel).response,
        crisisLevel,
        usingAI: true
      }
    } catch (error) {
      console.error('Puter.js AI error, falling back to pattern matching:', error)
    }
  }
  
  // Fallback to rule-based responses
  const fallbackResult = getFallbackResponse(message, detectCrisisLevel(message))
  return {
    ...fallbackResult,
    usingAI: false
  }
}

function detectCrisisLevel(message: string): 'crisis' | 'high-risk' | 'moderate' | 'low' {
  const lowerMessage = message.toLowerCase()
  
  // Crisis keywords
  const crisisKeywords = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
    'self-harm', 'self harm', 'cut myself', 'hurt myself', 'harm myself',
    'overdose', 'end it all', 'better off dead', 'no reason to live',
    'going to die', 'plan to kill', 'goodbye cruel world'
  ]
  
  // High-risk keywords
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
