"use client"

import Image from "next/image"
import Link from "next/link"
import {
  AlertCircle,
  BadgeCheck,
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
  PlayCircle,
  ShieldCheck,
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
import { WhoWeAreGoalsAccordion } from "@/components/homepage/WhoWeAreGoalsAccordion"
import MoodTracker from "@/components/games/MoodTracker"

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
            <p className="text-base sm:text-xl text-white/95 max-w-3xl mx-auto md:mx-0">Trusted mental health education, self-reflection tools, and
MindWell Support — free, ethical mental health support & crisis guidance.</p>
            <p className="mt-4 text-sm sm:text-base text-white/90 font-medium">Trusted by 10,000+ people worldwide for privacy-first, evidence-based mental health support.</p>
            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-white border border-white/30">
                <BadgeCheck className="h-4 w-4" /> Reviewed by Licensed Mental Health Professionals
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-white border border-white/30">
                <ShieldCheck className="h-4 w-4" /> Evidence-informed education and privacy-first standards
              </span>
            </div>
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
            id="wellbeing-games"
            title="Wellbeing Games"
            icon={Gamepad2}
            stockPhotoUrl="/images/section-bg/wellbeing_games_bg.jpg"
            stockPhotoAlt=""
          >
            <div className="space-y-3 text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">Mindfulness games, stress relief activities</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">Use short, guided wellbeing games to support focus, calm, and emotional regulation.</p>
              <Button className="text-lg px-7 py-3 h-auto" onClick={() => setGamesOpen(true)}>Open Wellbeing Games</Button>
            </div>
          </MinimalSection>
          <MinimalSection
            id="track-mood"
            title="Mood Tracker"
            icon={BarChart3}
            stockPhotoUrl="/images/section-bg/mood_tracker_bg.jpg"
            stockPhotoAlt="Mood tracking and emotional wellbeing self-reflection"
            bgGradient="from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20"
          >
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">Daily mood tracking, emotional awareness, mental wellbeing</p>
            <MoodTracker />
          </MinimalSection>
          <MinimalSection
            id="community"
            title="Community"
            icon={Users}
            stockPhotoUrl="/images/stock/community_worldwide_support.jpg"
            stockPhotoAlt="Global peer support and inclusive mental wellness community"
            bgGradient="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          >
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">Peer mental health support, safe discussions</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg text-center md:text-left">Join peer support discussions with safe and respectful community standards.</p>
            <Button className="text-lg px-7 py-3 h-auto" onClick={() => setCommunityOpen(true)}>Open Community</Button>
          </MinimalSection>

          <MinimalSection
            id="advisory-board"
            title="Medical Advisory Board"
            icon={BadgeCheck}
            stockPhotoUrl="/images/stock/team-support.svg"
            stockPhotoAlt="Professional advisory team collaborating on ethical mental health guidance"
            bgGradient="from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
          >
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white/90 dark:bg-slate-800/70 p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Farzana Hussain, M.Sc. in Clinical Psychology</p>
                <p>Senior Clinical Psychologist &amp; Trainer — content validation and ethical oversight.</p>
              </div>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white/90 dark:bg-slate-800/70 p-4">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Clinical Review Team</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Dr. Kamrul Hasan (Assistant Clinical Psychologist)</li>
                  <li>Rifat Hossain (Assistant Clinical Psychologist)</li>
                </ul>
                <p className="mt-3 text-sm">Advisors needed: Psychiatrist (MD), Social Worker (MSW), Research Psychologist (Ph.D.).</p>
              </div>
            </div>
          </MinimalSection>

          <MinimalSection
            id="trust-stories"
            title="Community Trust & Testimonials"
            icon={Users}
            stockPhotoUrl="/images/stock/community_worldwide_support.jpg"
            stockPhotoAlt="People sharing stories of hope and recovery in a supportive environment"
            bgGradient="from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
          >
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "MindWell helped me understand my anxiety and take my first step toward professional help.",
                "The self-reflection tools gave me language for what I was feeling, without judgment.",
                "I appreciated the crisis resources and clear reminders that I am not alone."
              ].map((quote) => (
                <blockquote key={quote} className="rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white/90 dark:bg-slate-800/70 p-4 text-base italic">
                  “{quote}”
                  <footer className="mt-2 text-sm not-italic text-gray-600 dark:text-gray-400">— Anonymous MindWell user</footer>
                </blockquote>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Stories are anonymized to protect user privacy and dignity.</p>
          </MinimalSection>

          <MinimalSection
            id="publications-media"
            title="MindWell Publications & Media"
            icon={FileText}
            stockPhotoUrl="/images/section-bg/publications_media_bg.jpg"
            stockPhotoAlt=""
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mental health education, awareness articles</p>
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
                  aria-label="MindWell Support Facebook mental health publications and updates"
                  className="block text-xl font-medium text-teal-700 dark:text-teal-400 hover:underline"
                >
                  MindWell Support on Facebook – Mental Health Awareness &amp; Updates
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
            id="sdg-our-mission"
            title="Who We Are & Our Goals"
            icon={Target}
            stockPhotoUrl="/images/section-bg/sdg_mission_bg.jpg"
            stockPhotoAlt=""
          >
            <WhoWeAreGoalsAccordion />
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
