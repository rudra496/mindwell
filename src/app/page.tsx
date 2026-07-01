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
  ArrowRight,
  Heart
} from "lucide-react"
import { useEffect, useState } from "react"
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

function GlassCard({ 
  title, 
  icon: Icon, 
  children, 
  className = "", 
  accentColor = "bg-teal-500",
  bgImage = ""
}: { 
  title: string, 
  icon: any, 
  children: React.ReactNode, 
  className?: string, 
  accentColor?: string,
  bgImage?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:-translate-y-1 group ${className}`}>
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image src={bgImage} alt="" fill className="object-cover opacity-20 dark:opacity-10 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-slate-900/90 dark:via-slate-900/50" />
        </div>
      )}
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-2xl ${accentColor} text-white shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{title}</h3>
        </div>
        <div className="flex-1 text-slate-600 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  )
}

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-teal-500/30">
      
      {/* 1. Stunning Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-teal-950/20 dark:to-slate-950 z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] animate-float" />
        
        <div className="container relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-teal-500/20 text-teal-700 dark:text-teal-300 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">Your Safe Space</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
              Find Peace in a <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                Fast-Paced World
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mb-12 leading-relaxed">
              {tKey('homePage.heroDesc', language) || "Comprehensive mental health support, professional therapy, and engaging self-care tools. All completely free."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-2xl bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-500/25 transition-all hover:scale-105"
                onClick={() => setAssessmentOpen(true)}
              >
                {tKey('homePage.heroCta', language)} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg rounded-2xl border-2 border-red-500/20 bg-red-50/50 hover:bg-red-50 dark:bg-red-950/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 backdrop-blur-md transition-all hover:scale-105 hover:border-red-500/40"
                asChild
              >
                <Link href="/crisis-resources">
                  <AlertCircle className="mr-2 w-5 h-5" /> {tKey('homePage.heroCrisis', language)}
                </Link>
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
              {tKey('homePage.heroNote', language)}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges */}
      <div className="relative z-20 -mt-10 mb-20 px-4">
        <div className="max-w-5xl mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
           <TrustBadges />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl pb-24">
        
        {/* 3. Emergency & Education (Split Grid) */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <GlassCard 
            title="Emergency Support" 
            icon={AlertCircle} 
            accentColor="bg-red-500" 
            className="md:col-span-2 lg:col-span-1 border-red-500/10"
            bgImage="/images/stock/one_on_one_counseling.jpg"
          >
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <EmergencySupportContent />
            </div>
          </GlassCard>

          <GlassCard 
            title={tKey('homePage.learnTitle', language)} 
            icon={BookOpen} 
            accentColor="bg-blue-500"
            className="md:col-span-2 lg:col-span-1"
            bgImage="/images/stock/mental_health_awareness.jpg"
          >
             <div className="mb-6">
                <WhoWeAreContent />
             </div>
             <div className="flex flex-wrap gap-4 mt-auto">
              <Button className="rounded-xl shadow-lg" onClick={() => setDisordersOpen(true)}>
                <BookOpen className="w-4 h-4 mr-2" /> {tKey('homePage.openEducation', language)}
              </Button>
              <Button variant="ghost" className="rounded-xl text-blue-600 dark:text-blue-400" asChild>
                <Link href="/disorders">Browse all conditions →</Link>
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* 4. Core Features Bento Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Therapy & Meditation */}
          <GlassCard 
            title={tKey('homePage.therapyTitle', language)} 
            icon={Sparkles} 
            accentColor="bg-violet-500"
            className="md:col-span-2"
            bgImage="/images/stock/community_worldwide_support.jpg"
          >
            <p className="text-lg mb-8">{tKey('homePage.selfToolsDesc', language) || "Access guided therapy techniques and mindfulness meditation sessions crafted by professionals."}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-xl bg-violet-600 hover:bg-violet-700 shadow-lg" size="lg" onClick={() => setTherapyTechniquesOpen(true)}>
                {tKey('homePage.therapyBtn', language)}
              </Button>
              <Button className="rounded-xl border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-900/30" variant="outline" size="lg" onClick={() => setMeditationOpen(true)}>
                {tKey('homePage.meditationBtn', language)}
              </Button>
            </div>
          </GlassCard>

          {/* Psychologists */}
          <GlassCard 
            title={tKey('homePage.psychTitle', language)} 
            icon={Stethoscope} 
            accentColor="bg-emerald-500"
            bgImage="/images/stock/psychologists_professional.jpg"
          >
            <p className="mb-8">{tKey('homePage.psychDesc', language)}</p>
            <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg" size="lg" asChild>
              <Link href="/psychologists">{tKey('homePage.psychBtn', language)}</Link>
            </Button>
          </GlassCard>

          {/* Self-Assessment */}
          <GlassCard 
            title={tKey('homePage.selfToolsTitle', language)} 
            icon={ClipboardList} 
            accentColor="bg-amber-500"
          >
            <p className="mb-8">{tKey('homePage.selfToolsDesc', language)}</p>
            <Button className="w-full rounded-xl bg-amber-600 hover:bg-amber-700 shadow-lg" size="lg" onClick={() => setAssessmentOpen(true)}>
              {tKey('homePage.openAssessments', language)}
            </Button>
          </GlassCard>

          {/* Wellbeing Games */}
          <GlassCard 
            title={tKey('homePage.gamesTitle', language)} 
            icon={Gamepad2} 
            accentColor="bg-indigo-500"
            bgImage="/images/section-bg/wellbeing_games_bg.jpg"
          >
            <p className="text-sm font-semibold text-indigo-500 mb-2 uppercase tracking-wider">{tKey('homePage.gamesTag', language)}</p>
            <p className="mb-8">{tKey('homePage.gamesDesc', language)}</p>
            <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg mt-auto" size="lg" onClick={() => setGamesOpen(true)}>
              {tKey('homePage.gamesBtn', language)}
            </Button>
          </GlassCard>

          {/* Community */}
          <GlassCard 
            title={tKey('homePage.communityTitle', language)} 
            icon={Users} 
            accentColor="bg-pink-500"
          >
            <p className="text-sm font-semibold text-pink-500 mb-2 uppercase tracking-wider">{tKey('homePage.communityTag', language)}</p>
            <p className="mb-8">{tKey('homePage.communityDesc', language)}</p>
            <Button className="w-full rounded-xl bg-pink-600 hover:bg-pink-700 shadow-lg mt-auto" size="lg" onClick={() => setCommunityOpen(true)}>
              {tKey('homePage.communityBtn', language)}
            </Button>
          </GlassCard>
        </div>

        {/* 5. Mood Tracker Section */}
        <div className="mb-8">
          <GlassCard 
            title={tKey('homePage.moodTitle', language)} 
            icon={BarChart3} 
            accentColor="bg-sky-500"
          >
            <p className="mb-6 font-medium text-sky-600 dark:text-sky-400">{tKey('homePage.moodTag', language)}</p>
            <div className="bg-white/50 dark:bg-slate-950/50 rounded-2xl p-2 sm:p-6 shadow-inner">
               <MoodTracker />
            </div>
          </GlassCard>
        </div>

        {/* 6. Blog & Mission (Split) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <GlassCard 
            title={tKey('homePage.blogTitle', language)} 
            icon={FileText} 
            accentColor="bg-teal-600"
          >
            <p className="text-lg mb-8">{tKey('homePage.blogDesc', language)}</p>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-teal-500/20">
              <h4 className="font-bold text-xl mb-2">{tKey('homePage.blogReadTitle', language)}</h4>
              <p className="mb-6 text-sm">{tKey('homePage.blogReadDesc', language)}</p>
              <Button className="w-full rounded-xl" asChild>
                <Link href="/blog">{tKey('homePage.blogBtn', language)}</Link>
              </Button>
            </div>
          </GlassCard>

          <GlassCard 
            title={tKey('homePage.goalsTitle', language)} 
            icon={Target} 
            accentColor="bg-emerald-600"
          >
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <WhoWeAreGoalsAccordion />
            </div>
          </GlassCard>
        </div>

        {/* 7. Bottom Elements */}
        <div className="space-y-16">
          <Testimonials />
          
          <div className="relative overflow-hidden rounded-3xl bg-teal-900 text-white p-10 md:p-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/30 rounded-full blur-[100px]" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">{tKey('homePage.fundTitle', language)}</h2>
                <p className="text-teal-100 text-lg mb-6">{tKey('homePage.fundDesc', language)}</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-teal-50">
                    <div className="p-3 bg-teal-800 rounded-full"><Mail className="w-5 h-5" /></div>
                    <a href="mailto:contactmindwellorg@gmail.com" className="hover:text-white transition-colors">contactmindwellorg@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-4 text-teal-50">
                    <div className="p-3 bg-teal-800 rounded-full"><Phone className="w-5 h-5" /></div>
                    <a href="tel:+8801988223165" className="hover:text-white transition-colors">+8801988223165</a>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                 <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <DisordersModal open={disordersOpen} onOpenChange={setDisordersOpen} />
      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <GamesModal open={gamesOpen} onOpenChange={setGamesOpen} />
      <CommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
      <MeditationModal open={meditationOpen} onOpenChange={setMeditationOpen} />
      <TherapyTechniquesModal open={therapyTechniquesOpen} onOpenChange={setTherapyTechniquesOpen} />
    </div>
  )
}
