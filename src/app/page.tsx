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
  FileText,
  PlayCircle,
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
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">MindWell – Open Source Mental Health Platform</h1>
            <p className="text-base sm:text-xl text-white/95 max-w-3xl mx-auto md:mx-0">Trusted mental health education, self-reflection tools, and psychologist access that prioritizes safety, clarity, and compassionate support.</p>
          </div>
        </div>
      </section>

      <div id="home" className="container mx-auto px-4 py-8 max-w-7xl">
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
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setDisordersOpen(true)}><BookOpen className="h-5 w-5 mr-2" />Open educational resources</Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="self-reflection-tools"
            title="Self-Reflection Tools"
            icon={ClipboardList}
            stockPhotoUrl="/images/section-bg/self_reflection_bg.jpg"
            stockPhotoAlt=""
          >
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-700 dark:text-gray-300 text-lg">These tools are for self-reflection and education only, not diagnosis.</p>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setAssessmentOpen(true)}>Open self-reflection assessments</Button>
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
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setTherapyTechniquesOpen(true)}>Therapy Techniques</Button>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setMeditationOpen(true)} variant="outline">Meditation Library</Button>
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
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center md:text-left">Explore verified psychologist profiles and connect using direct call or WhatsApp links through our dedicated psychologists page.</p>
            <div className="mt-4">
              <Button className="text-lg px-7 py-3 h-auto" asChild><Link href="/psychologists">View all psychologists</Link></Button>
            </div>
          </MinimalSection>

          <MinimalSection
            id="sdg-our-mission"
            title="SDG & Our Mission"
            icon={Target}
            stockPhotoUrl="/images/section-bg/sdg_mission_bg.jpg"
            stockPhotoAlt=""
          >
            <SDGSection />
          </MinimalSection>

          <MinimalSection
            id="wellbeing-games"
            title="Wellbeing Games"
            icon={Gamepad2}
            stockPhotoUrl="/images/section-bg/wellbeing_games_bg.jpg"
            stockPhotoAlt=""
          >
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-700 dark:text-gray-300 text-lg">Use short, guided wellbeing games to support focus, calm, and emotional regulation.</p>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setGamesOpen(true)}>Open Wellbeing Games</Button>
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
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg text-center md:text-left">Join peer support discussions with safe and respectful community standards.</p>
            <Button className="text-lg px-7 py-3 h-auto" onClick={() => setCommunityOpen(true)}>Open Community</Button>
          </MinimalSection>

          <MinimalSection
            id="publications-media"
            title="MindWell Publications & Media"
            icon={FileText}
            stockPhotoUrl="/images/section-bg/publications_media_bg.jpg"
            stockPhotoAlt=""
          >
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Evidence-based mental health insights, reflections, and educational media shared by the MindWell team across trusted platforms.
            </p>

            <div className="rounded-xl border border-teal-200 dark:border-teal-700 bg-white/85 dark:bg-slate-800/70 p-5 mb-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Posts</h3>
              <div className="space-y-4">
                <a
                  href="https://www.facebook.com/share/1cCvSmWzPz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MindWell Facebook mental health publications and updates"
                  className="block text-xl font-medium text-teal-700 dark:text-teal-400 hover:underline"
                >
                  MindWell on Facebook – Mental Health Awareness &amp; Updates
                </a>
                <p className="text-xl text-gray-700 dark:text-gray-300">Written reflections and blog publications will be listed here.</p>

                <div className="ml-3 sm:ml-6 border-l-2 border-teal-200 dark:border-teal-700 pl-4 sm:pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Videos</h4>
                  <div aria-label="Upcoming educational and meditation video library" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["Video Series Placeholder 1", "Video Series Placeholder 2", "Video Series Placeholder 3"].map((title) => (
                      <article key={title} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 p-4 shadow-sm">
                        <div className="aspect-video rounded-lg border border-dashed border-teal-300 dark:border-teal-700 bg-teal-50/80 dark:bg-teal-900/10 flex items-center justify-center mb-3">
                          <PlayCircle className="h-10 w-10 text-teal-500 dark:text-teal-400" />
                          {/* Future YouTube embed placeholder:
                          <iframe
                            src=""
                            title="MindWell educational video"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                          />
                          */}
                        </div>
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h5>
                        <p className="text-xl text-gray-700 dark:text-gray-300">Educational &amp; Meditation Video (Coming Soon)</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MinimalSection>

          <MinimalSection
  id="funding-support"
  title="Funding & Support"
  icon={Mail}
  stockPhotoUrl="/images/section-bg/funding_support_bg.jpg"
  stockPhotoAlt=""
  bgGradient="from-slate-50 to-teal-50 dark:from-slate-900/40 dark:to-teal-900/20"
>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 text-center md:text-left">
              <p className="text-lg">For funding and partnership communication, please contact MindWell directly.</p>
              <p className="text-lg">Email: <a href="mailto:contactmindwellorg@gmail.com" className="text-teal-700 dark:text-teal-400 hover:underline">contactmindwellorg@gmail.com</a></p>
              <p className="text-lg">Phone: <a href="tel:+8801988223165" className="text-teal-700 dark:text-teal-400 hover:underline">+8801988223165</a></p>
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
