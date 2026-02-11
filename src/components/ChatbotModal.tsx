"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Send, Loader2, RotateCcw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  role: "user" | "assistant"
  content: string
  showCrisis?: boolean
}

interface ChatbotModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatbotModal({ open, onOpenChange }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversation history from IndexedDB on mount
  useEffect(() => {
    if (open) {
      loadConversationHistory()
    }
  }, [open])

  const loadConversationHistory = async () => {
    try {
      const { ChatHistory } = await import('@/lib/indexeddb')
      const history = await ChatHistory.getAllMessages()
      if (history.length > 0) {
        const formattedMessages = history.flatMap(h => [
          { role: "user" as const, content: h.message },
          { role: "assistant" as const, content: h.response, showCrisis: h.crisisLevel === 'crisis' }
        ])
        setMessages(formattedMessages)
        setShowDisclaimer(false)
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedPrompts = [
    "I'm feeling anxious",
    "Tell me about depression",
    "I need coping strategies",
    "Teach me a breathing exercise"
  ]

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)
    setShowDisclaimer(false)

    try {
      // Try Puter.js AI first (client-side)
      let response
      let crisisLevel = 'low'
      
      if (typeof window !== 'undefined' && (window as any).puter?.ai?.chat) {
        try {
          const aiResponse = await (window as any).puter.ai.chat(userMessage, {
            model: 'gpt-4o-mini',
            systemPrompt: `You are MindWell, a compassionate mental health support assistant. 
You provide evidence-based information, emotional support, and coping strategies.
You NEVER diagnose. You ALWAYS recommend professional help for serious concerns.
You detect crisis situations and provide immediate resources (988 Suicide & Crisis Lifeline).
You are warm, empathetic, and non-judgmental.`,
            temperature: 0.7
          })
          
          // Extract string content from response - handle both string and object formats
          if (typeof aiResponse === 'string') {
            response = aiResponse
          } else if (aiResponse && typeof aiResponse === 'object') {
            // Handle OpenAI-style response format
            if (aiResponse.message) {
              response = typeof aiResponse.message === 'string' 
                ? aiResponse.message 
                : aiResponse.message.content || String(aiResponse.message)
            } else if (aiResponse.choices && Array.isArray(aiResponse.choices) && aiResponse.choices[0]) {
              response = aiResponse.choices[0].message?.content || aiResponse.choices[0].text || String(aiResponse)
            } else if (aiResponse.content) {
              response = aiResponse.content
            } else if (aiResponse.text) {
              response = aiResponse.text
            } else {
              // Last resort: convert to string
              response = String(aiResponse)
            }
          } else {
            response = String(aiResponse || '')
          }
          
          // Detect crisis level from user message
          const lowerMsg = userMessage.toLowerCase()
          if (/suicide|suicidal|kill myself|want to die|self-harm|end my life/.test(lowerMsg)) {
            crisisLevel = 'crisis'
          } else if (/hopeless|worthless|can't go on/.test(lowerMsg)) {
            crisisLevel = 'high-risk'
          } else if (/anxious|anxiety|panic|stressed/.test(lowerMsg)) {
            crisisLevel = 'moderate'
          }
        } catch (aiError) {
          console.log('Puter.js AI not available, using fallback')
          // Fall through to API fallback
        }
      }
      
      // If Puter.js didn't work, use API fallback
      if (!response) {
        const apiResponse = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage })
        })

        const data = await apiResponse.json()
        response = data.response
        crisisLevel = data.crisisLevel
      }
      
      // Ensure response is a string before rendering
      const responseText = typeof response === 'string' ? response : String(response || 'I apologize, but I had trouble generating a response. Please try again.')
      
      const assistantMessage = {
        role: "assistant" as const,
        content: responseText,
        showCrisis: crisisLevel === 'crisis'
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
      // Save to IndexedDB
      try {
        const { ChatHistory } = await import('@/lib/indexeddb')
        await ChatHistory.addMessage({
          message: userMessage,
          response: responseText,
          crisisLevel: crisisLevel,
          timestamp: new Date()
        })
      } catch (error) {
        console.error('Error saving chat message:', error)
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again or contact support if the issue persists."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const clearConversation = async () => {
    try {
      const { ChatHistory } = await import('@/lib/indexeddb')
      await ChatHistory.clearAll()
      setMessages([])
      setShowDisclaimer(true)
    } catch (error) {
      console.error('Error clearing chat history:', error)
      // Still clear local state even if DB clear fails
      setMessages([])
      setShowDisclaimer(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] sm:h-[600px] flex flex-col p-0 w-[95vw] sm:w-full">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b">
          <DialogTitle className="text-xl sm:text-2xl break-words">AI Mental Health Support Chat</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Talk to our AI assistant for support, coping strategies, and resources
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {showDisclaimer && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <AlertDescription className="text-xs sm:text-sm text-blue-900">
                <strong>Important:</strong> This AI chatbot provides general information and support. 
                It is NOT a substitute for professional medical advice, diagnosis, or treatment. 
                If you're in crisis, call 988 (Suicide & Crisis Lifeline) or 911 immediately.
              </AlertDescription>
            </Alert>
          )}

          {messages.length === 0 && !isLoading && (
            <div className="text-center py-4 sm:py-8 space-y-4">
              <p className="text-muted-foreground mb-4 text-sm sm:text-base px-2">Start a conversation by typing a message or choosing a suggestion:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto px-2">
                {suggestedPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="text-xs sm:text-sm min-h-[44px]"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index}>
              <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
              
              {message.showCrisis && (
                <div className="mt-3 space-y-3">
                  {/* PRIMARY EMERGENCY BANNER - FIRST AND MOST PROMINENT */}
                  <Alert className="border-2 border-red-600 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 animate-pulse" />
                    <AlertDescription className="text-sm sm:text-base text-red-900">
                      <p className="font-bold mb-2">⚠️ CRISIS DETECTED - Get Help Immediately:</p>
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <p className="font-semibold">🚨 <strong>Call 911</strong> or go to nearest emergency room (Life-threatening)</p>
                        <p className="font-semibold">☎️ Call or text <strong>988</strong> - Suicide & Crisis Lifeline (24/7, Free)</p>
                        <p className="font-semibold">💬 Text <strong>HELLO</strong> to <strong>741741</strong> - Crisis Text Line</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                  
                  {/* IMPORTANT INFORMATION */}
                  <Alert className="border-amber-400 bg-amber-50">
                    <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <AlertDescription className="text-xs sm:text-sm text-amber-900">
                      <strong>You are not alone.</strong> Professional help is available right now. 
                      Crisis counselors are trained to help people in your exact situation. 
                      Reaching out is a sign of strength, not weakness.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-3 sm:p-4 space-y-2">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              className="mb-2 text-xs sm:text-sm min-h-[40px]"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Conversation
            </Button>
          )}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 text-sm sm:text-base min-h-[44px]"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="min-h-[44px] min-w-[44px]"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
