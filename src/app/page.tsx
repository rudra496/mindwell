"use client"

import { useState } from "react"
import {
  AlertCircle,
  BookOpen,
  ClipboardList,
  Sparkles,
  Stethoscope,
  MapPin,
  Target,
  Users,
  Mail,
  Phone,
} from "lucide-react"
import { MinimalSection } from "@/components/homepage/MinimalSection"
import { EmergencySupportContent } from "@/components/homepage/EmergencySupportContent"
import { WhoWeAreContent } from "@/components/homepage/WhoWeAreContent"
import { ContactUsContent } from "@/components/homepage/ContactUsContent"
import { DonateContent } from "@/components/homepage/DonateContent"
import { Button } from "@/components/ui/button"
import { PsychologistCard } from "@/components/PsychologistCard"
import { psychologists } from "@/data/psychologists"
import { DisordersModal } from "@/components/DisordersModal"
import { AssessmentModal } from "@/components/AssessmentModal"
import { GamesModal } from "@/components/GamesModal"
import { CrisisModal } from "@/components/CrisisModal"
import { CommunityModal } from "@/components/CommunityModal"
import { MeditationModal } from "@/components/MeditationModal"
import { TherapyTechniquesModal } from "@/components/TherapyTechniquesModal"
import { BangladeshServicesSection } from "@/components/BangladeshServicesSection"
import { SDGSection } from "@/components/SDGSection"

const GLOBAL_PROMISE = "🌍 1 Free Session for Everyone – Worldwide Access"

export default function HomePage() {
  const [disordersOpen, setDisordersOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [crisisOpen, setCrisisOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [therapyTechniquesOpen, setTherapyTechniquesOpen] = useState(false)

  return (
    <>
      <div id="home" className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold text-teal-900 dark:text-teal-100 mb-4">MindWell – Open Source Mental Health Platform</h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">{GLOBAL_PROMISE}</p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mt-2">Free access to mental health resources, with limited free psychologist sessions based on availability.</p>
        </div>

        <div className="space-y-6">
          <MinimalSection id="crisis-emergency-help" title="Emergency Support" icon={AlertCircle} stockPhotoUrl="/images/homepage/crisis.svg" bgGradient="from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20" defaultOpen>
            <EmergencySupportContent />
          </MinimalSection>

          <MinimalSection id="learn-awareness" title="Learn & Awareness" icon={BookOpen} stockPhotoUrl="/images/homepage/learn.svg" bgGradient="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <WhoWeAreContent />
            <div className="mt-4">
              <Button onClick={() => setDisordersOpen(true)}><BookOpen className="h-4 w-4 mr-2" />Open educational resources</Button>
            </div>
          </MinimalSection>

          <MinimalSection id="self-reflection-tools" title="Self-Reflection Tools" icon={ClipboardList}>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">These tools are for self-reflection and education only, not diagnosis.</p>
              <Button onClick={() => setAssessmentOpen(true)}>Open self-reflection assessments</Button>
            </div>
          </MinimalSection>

          <MinimalSection id="therapy-meditation" title="Therapy & Meditation" icon={Sparkles} stockPhotoUrl="/images/homepage/therapy.svg" bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setTherapyTechniquesOpen(true)}>Therapy Techniques</Button>
              <Button onClick={() => setMeditationOpen(true)} variant="outline">Meditation Library</Button>
              <Button onClick={() => setGamesOpen(true)} variant="outline">Wellness Activities</Button>
            </div>
          </MinimalSection>

          <MinimalSection id="psychologists" title="Psychologists" icon={Stethoscope} stockPhotoUrl="/images/homepage/psychologists.svg" bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
            <h3 className="text-xl font-semibold mb-4">{GLOBAL_PROMISE}</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {psychologists.map((psychologist) => <PsychologistCard key={psychologist.name} psychologist={psychologist} />)}
            </div>
          </MinimalSection>

          <MinimalSection id="free-services-bangladesh" title="Free Services in Bangladesh 🇧🇩" icon={MapPin}>
            <BangladeshServicesSection />
          </MinimalSection>

          <MinimalSection id="sdg-our-mission" title="SDG & Our Mission" icon={Target}>
            <SDGSection />
          </MinimalSection>

          <MinimalSection id="community" title="Community" icon={Users} stockPhotoUrl="/images/homepage/community.svg" bgGradient="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <p className="mb-4 text-gray-700 dark:text-gray-300">Join peer support discussions with safe and respectful community standards.</p>
            <Button onClick={() => setCommunityOpen(true)}>Open Community</Button>
          </MinimalSection>

          <MinimalSection id="contact-support" title="Contact & Support" icon={Mail}>
            <DonateContent />
            <ContactUsContent />
            <div className="mt-6">
              <Button onClick={() => setCrisisOpen(true)} className="bg-red-600 hover:bg-red-700"><Phone className="h-4 w-4 mr-2" />View crisis resources by country</Button>
            </div>
          </MinimalSection>
        </div>
      </div>

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
