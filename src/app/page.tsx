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
  Sparkles,
  ArrowRight
} from "lucide-react"
import { DisordersModal } from "@/components/DisordersModal"
import { AssessmentModal } from "@/components/AssessmentModal"
import { GamesModal } from "@/components/GamesModal"
import { CrisisModal } from "@/components/CrisisModal"

import { CommunityModal } from "@/components/CommunityModal"
import { MeditationModal } from "@/components/MeditationModal"
import { TherapyTechniquesModal } from "@/components/TherapyTechniquesModal"
import { AdvisorsModal } from "@/components/AdvisorsModal"
import MoodTracker from "@/components/games/MoodTracker"
import { Footer } from "@/components/Footer"
import { VoiceControlPanel } from "@/components/VoiceControlPanel"
import { NavigationBar } from "@/components/NavigationBar"
import { HeroSection } from "@/components/HeroSection"
import { OurSupportSection } from "@/components/OurSupportSection"
import { BangladeshServicesSection } from "@/components/BangladeshServicesSection"
import { SDGSection } from "@/components/SDGSection"
import { PsychologistsAccessSection } from "@/components/PsychologistsAccessSection"
import { MedicalDisclaimer } from "@/components/safety/MedicalDisclaimer"
import { ContactForm } from "@/components/ContactForm"
import { config } from "@/lib/config"

export default function HomePage() {
  const [disordersOpen, setDisordersOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [crisisOpen, setCrisisOpen] = useState(false)

  const [communityOpen, setCommunityOpen] = useState(false)
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [therapyTechniquesOpen, setTherapyTechniquesOpen] = useState(false)
  const [advisorsOpen, setAdvisorsOpen] = useState(false)

  const handleNavigate = (section: string) => {
    switch (section) {
      case "home":
        // Scroll to top or reset view
        window.scrollTo({ top: 0, behavior: "smooth" })
        break
      case "self-help":
        // Scroll to self-help section
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
        break
      case "therapy":
        setTherapyTechniquesOpen(true)
        break
      case "psychologists":
        document.getElementById("psychologists")?.scrollIntoView({ behavior: "smooth" })
        break
      case "crisis":
        setCrisisOpen(true)
        break
      case "bangladesh":
        document.getElementById("bangladesh-services")?.scrollIntoView({ behavior: "smooth" })
        break
      case "sdg":
        document.getElementById("sdg-mission")?.scrollIntoView({ behavior: "smooth" })
        break
      case "about":
        document.getElementById("our-support")?.scrollIntoView({ behavior: "smooth" })
        break
      case "contact":
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        break
      case "disorders":
        setDisordersOpen(true)
        break
      case "assessments":
        setAssessmentOpen(true)
        break
      case "games":
        setGamesOpen(true)
        break
      case "meditation":
        setMeditationOpen(true)
        break
      case "chatbot":
        // Chatbot removed due to clinical liability concerns
        // Human support available via licensed psychologist
        break
      case "community":
        setCommunityOpen(true)
        break
      default:
        break
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <NavigationBar onNavigate={handleNavigate} />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      
      {/* Hero Section */}
      <HeroSection 
        onGetSupport={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        onEmergencyHelp={() => setCrisisOpen(true)}
      />

      {/* Crisis Banner */}
      <div className="mb-6 sm:mb-8 rounded-lg bg-red-50 dark:bg-red-950/30 border-2 border-red-500 dark:border-red-700 p-3 sm:p-4 transition-colors">
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-red-900 dark:text-red-200 mb-1 sm:mb-2 break-words">
              In Crisis? Get Help Now
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-red-800 dark:text-red-300">
              <p className="break-words"><strong>Bangladesh:</strong> Call <strong>Kaan Pete Roi: 09678 676 777</strong> (24/7)</p>
              <p className="break-words"><strong>US:</strong> Call or text <strong>988</strong> (Suicide & Crisis Lifeline)</p>
              <p className="break-words"><strong>Emergency:</strong> Call <strong>999</strong> (Bangladesh) or <strong>911</strong> (US)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer variant="compact" className="mb-8 sm:mb-12" />

      {/* Voice Control Panel */}
      <div className="flex justify-center mb-8">
        <VoiceControlPanel />
      </div>

      {/* Our Support Section */}
      <OurSupportSection />

      {/* Psychologists Access Section - MOVED TO TOP */}
      <PsychologistsAccessSection 
        onRequestSupport={() => window.location.href = '/psychologists'}
      />

      {/* Main Features Grid */}
      <div id="features" className="mb-8 sm:mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
            How MindWell Helps
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Guidance, education, and support for your mental wellbeing journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Mental Health Education */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary dark:hover:border-teal-400 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-primary dark:text-teal-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">Mental Health Education</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
              Learn About Mental Health Conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              Educational information about mental health conditions, symptoms, and evidence-based approaches. For awareness and understanding, not diagnosis.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base transition-all hover:scale-105 dark:hover:bg-slate-700" variant="outline" onClick={() => setDisordersOpen(true)}>
              Learn More
            </Button>
          </CardContent>
        </Card>

        {/* Self-Reflection Tools */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary dark:hover:border-teal-400 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in animate-delay-100 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-secondary dark:text-indigo-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">Self-Reflection Tools</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
              Validated Screening Questionnaires
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              Self-reflection questionnaires to help understand your wellbeing. These are educational screening tools, not diagnostic instruments.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base transition-all hover:scale-105 dark:hover:bg-slate-700" variant="outline" onClick={() => setAssessmentOpen(true)}>
              Explore Tools
            </Button>
          </CardContent>
        </Card>

        {/* Therapeutic Games */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary dark:hover:border-teal-400 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in animate-delay-200 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent dark:text-pink-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">Wellness Activities</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
              Interactive Mindfulness Tools
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              Evidence-based interactive activities including breathing exercises, memory challenges, cognitive training, and mindfulness practices.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base transition-all hover:scale-105 dark:hover:bg-slate-700" variant="outline" onClick={() => setGamesOpen(true)}>
              Try Activities
            </Button>
          </CardContent>
        </Card>

        {/* AI Support - PAUSED */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-400 dark:hover:border-orange-500 hover:scale-105 bg-orange-50/50 dark:bg-orange-950/20 backdrop-blur-sm animate-fade-in animate-delay-300 opacity-75 dark:border-orange-800">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 dark:text-orange-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">AI Support (Paused)</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-orange-700 dark:text-orange-300">
              Under Safety Review
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              AI chatbot removed due to clinical liability concerns. Human support available via licensed psychologist.
            </p>
            <Button 
              className="w-full min-h-[44px] text-sm sm:text-base transition-all dark:hover:bg-slate-700" 
              variant="outline" 
              onClick={() => { window.location.href = '/psychologists' }}
            >
              Get Human Support →
            </Button>
          </CardContent>
        </Card>

        {/* Community Forum */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary dark:hover:border-teal-400 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in animate-delay-400 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 dark:text-purple-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">Community Forum</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
              Safe Peer Support Space
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              Anonymous peer support with categories for Depression, Anxiety, Trauma, Recovery, and more. Moderated for safety.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base transition-all hover:scale-105 dark:hover:bg-slate-700" variant="outline" onClick={() => setCommunityOpen(true)}>
              Join Community
            </Button>
          </CardContent>
        </Card>

        {/* Therapy Techniques */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary dark:hover:border-teal-400 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-teal-500 dark:text-teal-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">Therapy Library</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
              20 Evidence-Based Techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              Learn CBT, DBT, ACT, ERP, MBCT, and IPT techniques with step-by-step guides, examples, and practical applications.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base transition-all hover:scale-105 dark:hover:bg-slate-700" variant="outline" onClick={() => setTherapyTechniquesOpen(true)}>
              Learn Techniques
            </Button>
          </CardContent>
        </Card>

        {/* Meditation Library */}
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary dark:hover:border-teal-400 hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in animate-delay-100 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500 dark:text-pink-400 transition-transform hover:scale-110 hover:rotate-12" />
              <CardTitle className="text-base sm:text-lg break-words dark:text-gray-100">Meditation Library</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
              14 Guided Practices
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 break-words">
              Full guided meditation scripts including body scan, loving-kindness, breath work, progressive relaxation, and sleep meditation.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base transition-all hover:scale-105 dark:hover:bg-slate-700" variant="outline" onClick={() => setMeditationOpen(true)}>
              Meditate Now
            </Button>
          </CardContent>
        </Card>

        {/* Crisis Resources */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-red-400 dark:hover:border-red-500 bg-red-50 dark:bg-red-950/30 animate-fade-in animate-delay-200 dark:border-red-800">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400 transition-transform hover:scale-110 animate-pulse-soft" />
              <CardTitle className="text-base sm:text-lg text-red-900 dark:text-red-200 break-words">Crisis Resources</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-red-700 dark:text-red-300">
              Immediate Help Available
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm text-red-800 dark:text-red-300 mb-3 sm:mb-4 break-words">
              Worldwide crisis hotlines, text lines, and emergency resources. Includes safety planning tool for managing suicidal thoughts.
            </p>
            <Button className="w-full min-h-[44px] text-sm sm:text-base bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white" onClick={() => setCrisisOpen(true)}>
              Get Help Now
            </Button>
          </CardContent>
        </Card>


      </div>
      </div>

      {/* Bangladesh Services Section */}
      <BangladeshServicesSection />

      {/* Contact Form Section */}
      <div id="contact" className="mb-8 sm:mb-12">
        <ContactForm />
      </div>

      {/* SDG Section */}
      <SDGSection />

      {/* Mood Tracker Section */}
      <div className="mb-8 sm:mb-12">
        <MoodTracker />
      </div>

      {/* Footer */}
      <Footer />
      </div>

      {/* Modals */}
      <DisordersModal open={disordersOpen} onOpenChange={setDisordersOpen} />
      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <GamesModal open={gamesOpen} onOpenChange={setGamesOpen} />
      <CrisisModal 
        open={crisisOpen} 
        onOpenChange={setCrisisOpen}
        onOpenAdvisors={() => setAdvisorsOpen(true)}
      />
      <CommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
      <MeditationModal open={meditationOpen} onOpenChange={setMeditationOpen} />
      <TherapyTechniquesModal open={therapyTechniquesOpen} onOpenChange={setTherapyTechniquesOpen} />
      <AdvisorsModal open={advisorsOpen} onOpenChange={setAdvisorsOpen} />
      {/* ChatbotModal removed - AI chatbot removed due to clinical liability concerns. 
          Human support available via licensed psychologist at /psychologists */}
    </>
  )
}
