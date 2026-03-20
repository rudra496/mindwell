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
  BarChart3,
  Users,
  Mail,
  Gamepad2,
  FileText,
  Phone,
} from "lucide-react"
import { useEffect, useState } from "react"
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
import { WhoWeAreGoalsAccordion } from "@/components/homepage/WhoWeAreGoalsAccordion"
import MoodTracker from "@/components/games/MoodTracker"
import { TrustBadges } from "@/components/TrustBadges"
import { Testimonials } from "@/components/Testimonials"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { consumeCommunityReopenFlag } from "@/lib/firebase"
import { useLanguage } from "@/lib/useLanguage"
import { tKey } from "@/lib/i18n"

export default function HomePage() {
  const [disordersOpen, setDisordersOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [meditationOpen, setMeditationOpen] = useState(false)
  const [therapyTechniquesOpen, setTherapyTechniquesOpen] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    if (!consumeCommunityReopenFlag()) return
    setCommunityOpen(true)
  }, [])

  return (
    <>
      <section className="relative min-h-[360px] sm:min-h-[440px] overflow-hidden shadow-lg">
        <Image
          src="/images/stock/hero_group_support.jpg"
          alt="Group counseling support session in a welcoming setting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />
        <div className="relative z-10 min-h-[360px] sm:min-h-[440px] flex items-center">
          <div className="container mx-auto max-w-7xl px-6 sm:px-10 py-12 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{tKey('homePage.heroTitle', language)}</h1>
            <p className="text-base sm:text-xl text-white/95 max-w-3xl mx-auto md:mx-0">{tKey('homePage.heroDesc', language)}</p>
          </div>
        </div>
      </section>

      <div id="home" className="container mx-auto px-4 py-8 max-w-7xl">
        <TrustBadges />
        <div className="space-y-6">
          <MinimalSection
            id="crisis-emergency-help"
            title="Emergency Support"
            icon={AlertCircle}
            stockPhotoUrl="/images/stock/one_on_one_counseling.jpg"
            stockPhotoAlt="Psychologist offering one-on-one counseling support"
            bgGradient="from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
          >
            <EmergencySupportContent />
          </MinimalSection>

          <MinimalSection
            id="learn-awareness"
            title={tKey('homePage.learnTitle', language)}
            icon={BookOpen}
            stockPhotoUrl="/images/stock/mental_health_awareness.jpg"
            stockPhotoAlt="Mental health awareness materials for learning and education"
            bgGradient="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
          >
            <WhoWeAreContent />
            <div className="mt-4">
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setDisordersOpen(true)}><BookOpen className="h-5 w-5 mr-2" />{tKey('homePage.openEducation', language)}</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="self-reflection-tools"
            title={tKey('homePage.selfToolsTitle', language)}
            icon={ClipboardList}
            stockPhotoUrl="/images/section-bg/self_reflection_bg.jpg"
            stockPhotoAlt=""
          >
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-700 dark:text-gray-300 text-lg">{tKey('homePage.selfToolsDesc', language)}</p>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setAssessmentOpen(true)}>{tKey('homePage.openAssessments', language)}</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="therapy-meditation"
            title={tKey('homePage.therapyTitle', language)}
            icon={Sparkles}
            stockPhotoUrl="/images/stock/community_worldwide_support.jpg"
            stockPhotoAlt="People participating in a supportive mental wellness community"
            bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
          >
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setTherapyTechniquesOpen(true)}>{tKey('homePage.therapyBtn', language)}</Button>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setMeditationOpen(true)} variant="outline">{tKey('homePage.meditationBtn', language)}</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="psychologists"
            title={tKey('homePage.psychTitle', language)}
            icon={Stethoscope}
            stockPhotoUrl="/images/stock/psychologists_professional.jpg"
            stockPhotoAlt="Professional clinical psychologist in a therapy office"
            bgGradient="from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center md:text-left">{tKey('homePage.psychDesc', language)}</p>
            <div className="mt-4">
              <Button className="text-lg px-7 py-3 h-auto" asChild><Link href="/psychologists">{tKey('homePage.psychBtn', language)}</Link></Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="wellbeing-games"
            title={tKey('homePage.gamesTitle', language)}
            icon={Gamepad2}
            stockPhotoUrl="/images/section-bg/wellbeing_games_bg.jpg"
            stockPhotoAlt=""
          >
            <div className="space-y-3 text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">{tKey('homePage.gamesTag', language)}</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">{tKey('homePage.gamesDesc', language)}</p>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setGamesOpen(true)}>{tKey('homePage.gamesBtn', language)}</Button>
            </div>
          </MinimalSection>
          <MinimalSection
            id="track-mood"
            title={tKey('homePage.moodTitle', language)}
            icon={BarChart3}
            stockPhotoUrl="/images/section-bg/mood_tracker_bg.jpg"
            stockPhotoAlt="Mood tracking and emotional wellbeing self-reflection"
            bgGradient="from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20"
          >
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">{tKey('homePage.moodTag', language)}</p>
            <MoodTracker />
          </MinimalSection>
          <MinimalSection
            id="community"
            title={tKey('homePage.communityTitle', language)}
            icon={Users}
            stockPhotoUrl="/images/stock/community_worldwide_support.jpg"
            stockPhotoAlt="Global peer support and inclusive mental wellness community"
            bgGradient="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          >
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">{tKey('homePage.communityTag', language)}</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg text-center md:text-left">{tKey('homePage.communityDesc', language)}</p>
            <Button className="text-lg px-7 py-3 h-auto" onClick={() => setCommunityOpen(true)}>{tKey('homePage.communityBtn', language)}</Button>
          </MinimalSection>

          <MinimalSection
            id="mindwell-blog"
            title={tKey('homePage.blogTitle', language)}
            icon={FileText}
            stockPhotoUrl="/images/section-bg/publications_media_bg.jpg"
            stockPhotoAlt="MindWell blog and publication highlights"
          >
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              {tKey('homePage.blogDesc', language)}
            </p>
            <div className="rounded-xl border border-teal-200 dark:border-teal-700 bg-white/85 dark:bg-slate-800/70 p-5 mb-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{tKey('homePage.blogReadTitle', language)}</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {tKey('homePage.blogReadDesc', language)}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
              >
                {tKey('homePage.blogBtn', language)}
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Link href="/blog/media-coverage-achievements-rudra-sarker" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-4 hover:border-teal-400">
                <h3 className="font-semibold text-slate-900 dark:text-white">Media Coverage & Achievements: SignTalk Journey</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">A roundup of press mentions, interviews, and innovation recognition.</p>
              </Link>
              <Link href="/blog/mindwell-open-source-mental-health-platform-update" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-4 hover:border-teal-400">
                <h3 className="font-semibold text-slate-900 dark:text-white">Building MindWell: Open-Source Lessons</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">A behind-the-scenes technical write-up of architecture and ethics decisions.</p>
              </Link>
            </div>
          </MinimalSection>
          <MinimalSection
            id="sdg-our-mission"
            title={tKey('homePage.goalsTitle', language)}
            icon={Target}
            stockPhotoUrl="/images/section-bg/sdg_mission_bg.jpg"
            stockPhotoAlt=""
          >
            <WhoWeAreGoalsAccordion />
          </MinimalSection>
          <MinimalSection
            id="funding-support"
            title={tKey('homePage.fundTitle', language)}
            icon={Mail}
            stockPhotoUrl="/images/section-bg/funding_support_bg.jpg"
            stockPhotoAlt=""
            bgGradient="from-slate-50 to-teal-50 dark:from-slate-900/40 dark:to-teal-900/20"
          >
            <div className="space-y-3 text-gray-700 dark:text-gray-300 text-center md:text-left">
              <p className="text-lg">{tKey('homePage.fundDesc', language)}</p>
              <p className="text-lg">Email: <a href="mailto:contactmindwellorg@gmail.com" className="text-teal-700 dark:text-teal-400 hover:underline">contactmindwellorg@gmail.com</a></p>
              <p className="text-lg">Phone: <a href="tel:+8801988223165" className="text-teal-700 dark:text-teal-400 hover:underline">+8801988223165</a></p>
            </div>
          </MinimalSection>
        </div>
        <div className="mt-10 space-y-10">
          <Testimonials />
          <NewsletterSignup />
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
