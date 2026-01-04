"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  Heart, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Stethoscope,
  ClipboardList,
  Gamepad2,
  Phone,
  AlertCircle,
  Sparkles
} from "lucide-react"
import { DisordersModal } from "@/components/DisordersModal"
import { AssessmentModal } from "@/components/AssessmentModal"
import { GamesModal } from "@/components/GamesModal"
import { CrisisModal } from "@/components/CrisisModal"
import { ChatbotModal } from "@/components/ChatbotModal"
import { CommunityModal } from "@/components/CommunityModal"
import { MeditationModal } from "@/components/MeditationModal"
import { TherapyTechniquesModal } from "@/components/TherapyTechniquesModal"
import MoodTracker from "@/components/games/MoodTracker"
import { Footer } from "@/components/Footer"
import { VoiceControlPanel } from "@/components/VoiceControlPanel"

export default function HomePage() {
  const [disordersOpen, setDisordersOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [crisisOpen, setCrisisOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [therapyTechniquesOpen, setTherapyTechniquesOpen] = useState(false)

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      {/* Crisis Banner */}
      <div className="mb-6 sm:mb-8 rounded-lg bg-red-50 border-2 border-red-500 p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-red-900 mb-1 sm:mb-2 break-words">
              ⚠️ IN CRISIS? GET HELP NOW
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-red-800">
              <p className="break-words"><strong>US:</strong> Call or text <strong>988</strong> (Suicide & Crisis Lifeline) - Available 24/7</p>
              <p className="break-words"><strong>Crisis Text Line:</strong> Text <strong>HELLO</strong> to <strong>741741</strong></p>
              <p className="break-words"><strong>Emergency:</strong> Call <strong>911</strong> or go to nearest emergency room</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Brain className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
            MindWell
          </h1>
        </div>
        <p className="text-base sm:text-xl text-gray-700 mb-2 px-2">
          World's Largest Open-Source Mental Health Platform
        </p>
        <p className="text-xs sm:text-sm md:text-md text-gray-600 max-w-3xl mx-auto px-2 mb-4">
          Comprehensive, scientifically-backed, free mental health support with 63+ disorders, 
          20 validated assessments, 11 therapeutic games, 14 meditations, 20 therapy techniques, and crisis resources.
        </p>
        {/* Voice Control Panel */}
        <div className="flex justify-center mt-4">
          <VoiceControlPanel />
        </div>
      </header>

      {/* Medical Disclaimer */}
      <div className="mb-8 sm:mb-12 rounded-lg bg-amber-50 border-2 border-amber-400 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-2 break-words">
          ⚕️ Medical Disclaimer
        </h3>
        <p className="text-xs sm:text-sm text-amber-800 break-words">
          <strong>FOR EDUCATIONAL PURPOSES ONLY.</strong> This platform is NOT a substitute for professional medical advice, diagnosis, or treatment. 
          ALWAYS consult licensed mental health professionals. Assessments are screening tools, NOT diagnostic instruments.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Disorders Database */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <CardTitle className="text-base sm:text-lg break-words">Disorders Database</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              63+ Mental Health Conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Comprehensive DSM-5 information including symptoms, causes, treatments, and research-backed solutions for all major mental health disorders.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setDisordersOpen(true)}>
              Explore Disorders
            </Button>
          </CardContent>
        </Card>

        {/* Self-Assessments */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
              <CardTitle className="text-base sm:text-lg break-words">Self-Assessments</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              20 Validated Screening Tools
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Clinically validated questionnaires including PHQ-9 (Depression), GAD-7 (Anxiety), PCL-5 (PTSD), and more with proper scoring.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setAssessmentOpen(true)}>
              Take Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Therapeutic Games */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              <CardTitle className="text-base sm:text-lg break-words">Therapeutic Games</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              11 Interactive Wellness Tools
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Evidence-based activities including breathing exercises, grounding techniques, gratitude journaling, and CBT tools.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setGamesOpen(true)}>
              Play Games
            </Button>
          </CardContent>
        </Card>

        {/* AI Chatbot */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500" />
              <CardTitle className="text-base sm:text-lg break-words">AI Support Chatbot</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              24/7 Empathetic Companion
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Compassionate AI trained in mental health support, crisis detection, coping strategies, and psychoeducation. Available anytime.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setChatbotOpen(true)}>
              Chat Now
            </Button>
          </CardContent>
        </Card>

        {/* Community Forum */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              <CardTitle className="text-base sm:text-lg break-words">Community Forum</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Safe Peer Support Space
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Anonymous peer support with categories for Depression, Anxiety, Trauma, Recovery, and more. Moderated for safety.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setCommunityOpen(true)}>
              Join Community
            </Button>
          </CardContent>
        </Card>

        {/* Therapy Techniques */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-teal-500" />
              <CardTitle className="text-base sm:text-lg break-words">Therapy Library</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              20 Evidence-Based Techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Learn CBT, DBT, ACT, ERP, MBCT, and IPT techniques with step-by-step guides, examples, and practical applications.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setTherapyTechniquesOpen(true)}>
              Learn Techniques
            </Button>
          </CardContent>
        </Card>

        {/* Meditation Library */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
              <CardTitle className="text-base sm:text-lg break-words">Meditation Library</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              14 Guided Practices
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">
              Full guided meditation scripts including body scan, loving-kindness, breath work, progressive relaxation, and sleep meditation.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base" variant="outline" onClick={() => setMeditationOpen(true)}>
              Meditate Now
            </Button>
          </CardContent>
        </Card>

        {/* Crisis Resources */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-red-400 bg-red-50">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              <CardTitle className="text-base sm:text-lg text-red-900 break-words">Crisis Resources</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-red-700">
              Immediate Help Available
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-red-800 mb-3 sm:mb-4 break-words">
              Worldwide crisis hotlines, text lines, and emergency resources. Includes safety planning tool for managing suicidal thoughts.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white" onClick={() => setCrisisOpen(true)}>
              Get Help Now
            </Button>
          </CardContent>
        </Card>


      </div>

      {/* Mood Tracker Section */}
      <div className="mb-8 sm:mb-12">
        <MoodTracker />
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">63</div>
            <div className="text-sm text-gray-600">Mental Health Disorders</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-secondary mb-2">20</div>
            <div className="text-sm text-gray-600">Clinical Assessments</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-accent mb-2">11</div>
            <div className="text-sm text-gray-600">Therapeutic Games</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-teal-600 mb-2">14</div>
            <div className="text-sm text-gray-600">Guided Meditations</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">20</div>
            <div className="text-sm text-gray-600">Therapy Techniques</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-red-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Crisis Resources</div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <DisordersModal open={disordersOpen} onOpenChange={setDisordersOpen} />
      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <GamesModal open={gamesOpen} onOpenChange={setGamesOpen} />
      <CrisisModal open={crisisOpen} onOpenChange={setCrisisOpen} />
      <ChatbotModal open={chatbotOpen} onOpenChange={setChatbotOpen} />
      <CommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
      <MeditationModal open={meditationOpen} onOpenChange={setMeditationOpen} />
      <TherapyTechniquesModal open={therapyTechniquesOpen} onOpenChange={setTherapyTechniquesOpen} />
    </div>
  )
}
