"use client"

import Image from "next/image"
import Link from "next/link"
import {
  AlertCircle,
  BookOpen,
  ClipboardList,
  Sparkles,
  Stethoscope,
  Target,
  Users,
  Mail,
  Gamepad2,
} from "lucide-react"
import { useState } from "react"
import { MinimalSection } from "@/components/homepage/MinimalSection"
import { EmergencySupportContent } from "@/components/homepage/EmergencySupportContent"
import { WhoWeAreContent } from "@/components/homepage/WhoWeAreContent"
import { Button } from "@/components/ui/button"
import { DisordersModal } from "@/components/DisordersModal"
import { AssessmentModal } from "@/components/AssessmentModal"
import { GamesModal } from "@/components/GamesModal"
import { CommunityModal } from "@/components/CommunityModal"
import { MeditationModal } from "@/components/MeditationModal"
import { TherapyTechniquesModal } from "@/components/TherapyTechniquesModal"
import { SDGSection } from "@/components/SDGSection"

export default function HomePage() {
  const [disordersOpen, setDisordersOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [therapyTechniquesOpen, setTherapyTechniquesOpen] = useState(false)

  return (
    <>
      <div id="home" className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        <section className="relative min-h-[360px] sm:min-h-[440px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/stock/hero_group_support.jpg"
            alt="Group counseling support session in a welcoming setting"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />
          <div className="relative z-10 h-full min-h-[360px] sm:min-h-[440px] flex items-center">
            <div className="w-full px-6 sm:px-10 py-12 text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">MindWell – Open Source Mental Health Platform</h1>
              <p className="text-base sm:text-xl text-white/95 max-w-3xl mx-auto md:mx-0">Trusted mental health education, self-reflection tools, and psychologist access that prioritizes safety, clarity, and compassionate support.</p>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <MinimalSection
            id="crisis-emergency-help"
            title="Emergency Support"
            icon={AlertCircle}
            stockPhotoUrl="/images/stock/one_on_one_counseling.jpg"
            stockPhotoAlt="Psychologist offering one-on-one counseling support"
            bgGradient="from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
            defaultOpen
          >
            <EmergencySupportContent />
          </MinimalSection>

          <MinimalSection
            id="learn-awareness"
            title="Learn & Awareness"
            icon={BookOpen}
            stockPhotoUrl="/images/stock/mental_health_awareness.jpg"
            stockPhotoAlt="Mental health awareness materials for learning and education"
            bgGradient="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
          >
            <WhoWeAreContent />
            <div className="mt-4">
              <Button onClick={() => setDisordersOpen(true)}><BookOpen className="h-4 w-4 mr-2" />Open educational resources</Button>
            </div>
          </MinimalSection>

          <MinimalSection id="self-reflection-tools" title="Self-Reflection Tools" icon={ClipboardList}>
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-700 dark:text-gray-300">These tools are for self-reflection and education only, not diagnosis.</p>
              <Button onClick={() => setAssessmentOpen(true)}>Open self-reflection assessments</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="therapy-meditation"
            title="Therapy & Meditation"
            icon={Sparkles}
            stockPhotoUrl="/images/stock/community_worldwide_support.jpg"
            stockPhotoAlt="People participating in a supportive mental wellness community"
            bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
          >
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button onClick={() => setTherapyTechniquesOpen(true)}>Therapy Techniques</Button>
              <Button onClick={() => setMeditationOpen(true)} variant="outline">Meditation Library</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="psychologists"
            title="Psychologists"
            icon={Stethoscope}
            stockPhotoUrl="/images/stock/psychologists_professional.jpg"
            stockPhotoAlt="Professional clinical psychologist in a therapy office"
            bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
          >
            <p className="text-gray-700 dark:text-gray-300 text-center md:text-left">Explore verified psychologist profiles and connect using direct call or WhatsApp links through our dedicated psychologists page.</p>
            <div className="mt-4">
              <Button asChild><Link href="/psychologists">View all psychologists</Link></Button>
            </div>
          </MinimalSection>

          <MinimalSection id="sdg-our-mission" title="SDG & Our Mission" icon={Target}>
            <SDGSection />
          </MinimalSection>

          <MinimalSection id="wellbeing-games" title="Wellbeing Games" icon={Gamepad2}>
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-700 dark:text-gray-300">Use short, guided wellbeing games to support focus, calm, and emotional regulation.</p>
              <Button onClick={() => setGamesOpen(true)}>Open Wellbeing Games</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="community"
            title="Community"
            icon={Users}
            stockPhotoUrl="/images/stock/community_worldwide_support.jpg"
            stockPhotoAlt="Global peer support and inclusive mental wellness community"
            bgGradient="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          >
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-center md:text-left">Join peer support discussions with safe and respectful community standards.</p>
            <Button onClick={() => setCommunityOpen(true)}>Open Community</Button>
          </MinimalSection>

          <MinimalSection
            id="funding-support"
            title="Funding & Support"
            icon={Mail}
            stockPhotoUrl="/images/stock/one_on_one_counseling.jpg"
            stockPhotoAlt="Support contact for mental health consultations"
          >
            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-center md:text-left">
              <p>MindWell is sustained through responsible support and transparent collaboration.</p>
              <p>For funding, partnerships, or support requests, contact us directly:</p>
              <p>Email: <a href="mailto:contactmindwellorg@gmail.com" className="text-teal-700 dark:text-teal-400 hover:underline">contactmindwellorg@gmail.com</a></p>
              <p>Phone: <a href="tel:+8801988223165" className="text-teal-700 dark:text-teal-400 hover:underline">+8801988223165</a></p>
            </div>
          </MinimalSection>
        </div>
      </div>

      <DisordersModal open={disordersOpen} onOpenChange={setDisordersOpen} />
      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <GamesModal open={gamesOpen} onOpenChange={setGamesOpen} />
      <CommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
      <MeditationModal open={meditationOpen} onOpenChange={setMeditationOpen} />
      <TherapyTechniquesModal open={therapyTechniquesOpen} onOpenChange={setTherapyTechniquesOpen} />
    </>
  )
}
