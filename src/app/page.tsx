"use client"

import { useState } from "react"
import { 
  AlertCircle, 
  Heart, 
  Briefcase, 
  Stethoscope,
  ClipboardList,
  BookOpen,
  Target,
  GraduationCap,
  Users,
  MapPin,
  Globe,
  BarChart3,
  DollarSign,
  Mail,
  Phone,
  Gamepad2,
  Sparkles,
  FileText
} from "lucide-react"
import { MinimalSection } from "@/components/homepage/MinimalSection"
import { EmergencySupportContent } from "@/components/homepage/EmergencySupportContent"
import { WhoWeAreContent } from "@/components/homepage/WhoWeAreContent"
import { ContactUsContent } from "@/components/homepage/ContactUsContent"
import { DonateContent } from "@/components/homepage/DonateContent"
import { NavigationBar } from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { DisordersModal } from "@/components/DisordersModal"
import { AssessmentModal } from "@/components/AssessmentModal"
import { GamesModal } from "@/components/GamesModal"
import { CrisisModal } from "@/components/CrisisModal"
import { CommunityModal } from "@/components/CommunityModal"
import { MeditationModal } from "@/components/MeditationModal"
import { TherapyTechniquesModal } from "@/components/TherapyTechniquesModal"
import { BangladeshServicesSection } from "@/components/BangladeshServicesSection"
import { SDGSection } from "@/components/SDGSection"
import MoodTracker from "@/components/games/MoodTracker"

export default function HomePage() {
  // Modal states
  const [disordersOpen, setDisordersOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [crisisOpen, setCrisisOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [therapyTechniquesOpen, setTherapyTechniquesOpen] = useState(false)

  const handleNavigate = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Navigation Bar - Keep Emergency Number */}
      <NavigationBar onNavigate={handleNavigate} />

      <div id="home" className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        
        {/* Crisis Banner - Always Visible */}
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

        {/* Welcome Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src="/images/Mindwell.jpg" alt="MindWell logo" width={240} height={120} className="h-auto w-48 sm:w-60 rounded-xl shadow-md" priority />
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            World's Largest Free Mental Health Support Platform
          </p>
        </div>

        {/* Main Sections - 13 Minimal Sections */}
        <div className="space-y-6">
          
          {/* Section 1: Emergency Support */}
          <MinimalSection
            id="emergency-support"
            title="Emergency Support"
            icon={AlertCircle}
            iconColor="text-red-600 dark:text-red-400"
            stockPhotoUrl="/images/stock/emergency-support.svg"
            stockPhotoAlt="Mental health emergency support"
            bgGradient="from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
          >
            <EmergencySupportContent />
          </MinimalSection>

          {/* Section 2: Who We Are / What We Offer */}
          <MinimalSection
            id="who-we-are"
            title="Who We Are"
            icon={Heart}
            iconColor="text-pink-600 dark:text-pink-400"
            stockPhotoUrl="/images/stock/team-support.svg"
            stockPhotoAlt="Team collaboration and support"
            bgGradient="from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20"
          >
            <WhoWeAreContent />
          </MinimalSection>

          {/* Section 3: Our Services */}
          <MinimalSection
            id="our-services"
            title="Our Services"
            icon={Briefcase}
            iconColor="text-teal-600 dark:text-teal-400"
            stockPhotoUrl="/images/stock/services.svg"
            stockPhotoAlt="Mental health services"
            bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Comprehensive mental health resources and tools to support your wellbeing journey
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Subsection 3.1: Therapy Techniques */}
                <Card className="border-2 hover:shadow-lg transition-all cursor-pointer dark:border-gray-700" onClick={() => setTherapyTechniquesOpen(true)}>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-12 w-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Therapy Techniques
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Evidence-based therapeutic approaches including CBT, DBT, ACT and more
                    </p>
                  </CardContent>
                </Card>

                {/* Subsection 3.2: Games Section */}
                <Card className="border-2 hover:shadow-lg transition-all cursor-pointer dark:border-gray-700" onClick={() => setGamesOpen(true)}>
                  <CardContent className="p-6 text-center">
                    <Gamepad2 className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Wellness Activities
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Interactive mindfulness activities and cognitive exercises
                    </p>
                  </CardContent>
                </Card>

                {/* Subsection 3.3: Meditation Section */}
                <Card className="border-2 hover:shadow-lg transition-all cursor-pointer dark:border-gray-700" onClick={() => setMeditationOpen(true)}>
                  <CardContent className="p-6 text-center">
                    <Sparkles className="h-12 w-12 text-pink-600 dark:text-pink-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Meditation Library
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Guided meditation scripts for relaxation and mindfulness
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </MinimalSection>

          {/* Section 4: Assessment */}
          <MinimalSection
            id="assessment"
            title="Mental Health Assessment"
            icon={ClipboardList}
            iconColor="text-indigo-600 dark:text-indigo-400"
            stockPhotoUrl="/images/stock/assessment.svg"
            stockPhotoAlt="Mental health assessment"
            bgGradient="from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
          >
            <div className="space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-lg">
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-3">
                  ⚠️ Medical Disclaimer
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">
                  These self-reflection tools are for educational purposes only and are not diagnostic instruments. 
                  They cannot replace professional medical advice, diagnosis, or treatment. If you're experiencing 
                  mental health concerns, please consult with a qualified healthcare provider.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-teal-600 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAssessmentOpen(true)
                      }
                    }}
                  />
                  <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
                    I agree with the disclaimer and wish to continue
                  </span>
                </label>
              </div>
            </div>
          </MinimalSection>

          {/* Section 5: Blog Posts & Articles */}
          <MinimalSection
            id="blog-articles"
            title="Blog Posts & Articles"
            icon={FileText}
            iconColor="text-blue-600 dark:text-blue-400"
            stockPhotoUrl="/images/stock/reading.svg"
            stockPhotoAlt="Reading and education"
            bgGradient="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Mental health articles, tips, and resources from our community
              </p>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 dark:border-gray-700">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  📝 Blog content coming soon. Follow us on Facebook for the latest updates and articles.
                </p>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => window.open('https://www.facebook.com/share/17uZeJjmBc/', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Visit Our Facebook Page
                  </Button>
                </div>
              </div>
            </div>
          </MinimalSection>

          {/* Section 6: SDG Goals */}
          <MinimalSection
            id="sdg-goals"
            title="Our SDG Goals"
            icon={Target}
            iconColor="text-green-600 dark:text-green-400"
            stockPhotoUrl="/images/stock/sdg.svg"
            stockPhotoAlt="UN Sustainable Development Goals"
            bgGradient="from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
          >
            <SDGSection />
          </MinimalSection>

          {/* Section 7: Education Resources */}
          <MinimalSection
            id="education-resources"
            title="Education Resources"
            icon={GraduationCap}
            iconColor="text-orange-600 dark:text-orange-400"
            stockPhotoUrl="/images/stock/learning.svg"
            stockPhotoAlt="Learning and education"
            bgGradient="from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Comprehensive database of mental health conditions and educational resources
              </p>
              <Button
                onClick={() => setDisordersOpen(true)}
                className="w-full sm:w-auto"
                size="lg"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Browse Mental Health Disorders
              </Button>
            </div>
          </MinimalSection>

          {/* Section 8: Community */}
          <MinimalSection
            id="community"
            title="Community"
            icon={Users}
            iconColor="text-purple-600 dark:text-purple-400"
            stockPhotoUrl="/images/stock/community.svg"
            stockPhotoAlt="Community support"
            bgGradient="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Join our safe, anonymous peer support community. Share experiences, find support, and connect with others.
              </p>
              <Button
                onClick={() => setCommunityOpen(true)}
                className="w-full sm:w-auto"
                size="lg"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Community Forum
              </Button>
            </div>
          </MinimalSection>

          {/* Section 9: Free Mental Health Support in Bangladesh */}
          <MinimalSection
            id="bangladesh-support"
            title="Free Mental Health Support in Bangladesh"
            icon={MapPin}
            iconColor="text-green-700 dark:text-green-400"
            stockPhotoUrl="/images/stock/bangladesh.svg"
            stockPhotoAlt="Bangladesh mental health support"
            bgGradient="from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20"
          >
            <BangladeshServicesSection />
          </MinimalSection>

          {/* Section 10: Crisis Response Resources */}
          <MinimalSection
            id="crisis-resources"
            title="Global Crisis Resources"
            icon={Globe}
            iconColor="text-red-600 dark:text-red-400"
            stockPhotoUrl="/images/stock/global-support.svg"
            stockPhotoAlt="Global crisis support"
            bgGradient="from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Access emergency mental health resources and crisis hotlines organized by country
              </p>
              <Button
                onClick={() => setCrisisOpen(true)}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                size="lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                View Crisis Resources by Country
              </Button>
            </div>
          </MinimalSection>

          {/* Section 11: Mood Tracker */}
          <MinimalSection
            id="mood-tracker"
            title="Mood Tracker"
            icon={BarChart3}
            iconColor="text-cyan-600 dark:text-cyan-400"
            stockPhotoUrl="/images/stock/mood-tracking.svg"
            stockPhotoAlt="Mood tracking"
            bgGradient="from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20"
          >
            <MoodTracker />
          </MinimalSection>

          {/* Section 12: Donate / Provide Funding */}
          <MinimalSection
            id="donate"
            title="Want to Donate or Provide Funding?"
            icon={DollarSign}
            iconColor="text-emerald-600 dark:text-emerald-400"
            stockPhotoUrl="/images/stock/donation.svg"
            stockPhotoAlt="Donation and funding"
            bgGradient="from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
          >
            <DonateContent />
          </MinimalSection>

          {/* Section 13: Contact Us */}
          <MinimalSection
            id="contact-us"
            title="Contact Us"
            icon={Mail}
            iconColor="text-blue-600 dark:text-blue-400"
            stockPhotoUrl="/images/stock/contact.svg"
            stockPhotoAlt="Contact and communication"
            bgGradient="from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
          >
            <ContactUsContent />
          </MinimalSection>

        </div>
      </div>

      {/* Modals */}
      <DisordersModal open={disordersOpen} onOpenChange={setDisordersOpen} />
      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <GamesModal open={gamesOpen} onOpenChange={setGamesOpen} />
      <CrisisModal open={crisisOpen} onOpenChange={setCrisisOpen} />
      <CommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
      <MeditationModal open={meditationOpen} onOpenChange={setMeditationOpen} />
      <TherapyTechniquesModal open={therapyTechniquesOpen} onOpenChange={setTherapyTechniquesOpen} />
    </>
  )
}
