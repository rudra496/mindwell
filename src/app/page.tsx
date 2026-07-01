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
  Heart,
  ChevronRight,
  ShieldCheck
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

// Clean, Accessible, NGO-style Service Card
function ServiceCard({
  title,
  description,
  icon: Icon,
  imageSrc,
  buttonText,
  onClick,
  href,
  accentColor = "text-teal-600 bg-teal-50",
  buttonVariant = "default"
}: {
  title: string
  description: string
  icon: any
  imageSrc?: string
  buttonText: string
  onClick?: () => void
  href?: string
  accentColor?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost"
}) {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 h-full group">
      {imageSrc && (
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl ${accentColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow text-base sm:text-lg leading-relaxed">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          {href ? (
            <Button variant={buttonVariant} className="w-full sm:w-auto font-semibold rounded-xl" size="lg" asChild>
              <Link href={href}>
                {buttonText} <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button variant={buttonVariant} className="w-full sm:w-auto font-semibold rounded-xl" size="lg" onClick={onClick}>
              {buttonText} <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          )}
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-teal-500/30">
      
      {/* 1. Clinical & Professional Hero Section */}
      <section className="relative bg-white dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-16 pb-20 lg:pt-24 lg:pb-28">
            
            {/* Left Content */}
            <div className="max-w-2xl animate-fade-in z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 mb-6 border border-teal-100 dark:border-teal-800">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase">Trusted Mental Health Support</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.15]">
                Empathetic Care for a <br className="hidden sm:block" />
                <span className="text-teal-600 dark:text-teal-400">Healthier Mind</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-xl">
                {tKey('homePage.heroDesc', language) || "Free, ethical mental health support and crisis management for everyone."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all"
                  onClick={() => setAssessmentOpen(true)}
                >
                  {tKey('homePage.heroCta', language)} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  asChild
                >
                  <Link href="/crisis-resources">
                    {tKey('homePage.heroCrisis', language)}
                  </Link>
                </Button>
              </div>
              
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {tKey('homePage.heroNote', language)}
              </p>
            </div>

            {/* Right Image (Clean, no messy blurs) */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl lg:transform lg:translate-x-4">
              <Image
                src="/images/stock/hero_group_support.jpg"
                alt="Group counseling support session"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Recognition */}
      <div className="bg-slate-50 dark:bg-slate-950 py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
           <TrustBadges />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 sm:py-24 space-y-16 sm:space-y-24">
        
        {/* 3. Emergency Support (High Visibility Block) */}
        <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-2xl p-5 sm:p-8 md:p-10 shadow-sm flex flex-col gap-6 w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
            <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">24/7 Emergency Support</h2>
          </div>
          
          <div className="w-full max-w-full overflow-hidden">
            <EmergencySupportContent />
          </div>

          <div className="w-full pt-4 border-t border-red-200 dark:border-red-800">
             <Button variant="destructive" size="lg" className="w-full md:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 rounded-xl shadow-md transition-transform active:scale-95" asChild>
                <Link href="/crisis-resources">View Emergency Hotlines</Link>
             </Button>
          </div>
        </div>

        {/* 4. Categorized Service Grid (The Core Foundation) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">How Can We Support You Today?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Navigate through our comprehensive, evidence-based tools and communities designed for every stage of your mental wellness journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <ServiceCard
              title={tKey('homePage.psychTitle', language)}
              description={tKey('homePage.psychDesc', language)}
              icon={Stethoscope}
              imageSrc="/images/stock/psychologists_professional.jpg"
              buttonText={tKey('homePage.psychBtn', language)}
              href="/psychologists"
              accentColor="bg-slate-100 text-teal-700 dark:bg-slate-800 dark:text-teal-400"
            />

            <ServiceCard
              title={tKey('homePage.therapyTitle', language)}
              description={tKey('homePage.selfToolsDesc', language) || "Access guided mental exercises and CBT techniques."}
              icon={Sparkles}
              imageSrc="/images/stock/one_on_one_counseling.jpg"
              buttonText={tKey('homePage.therapyBtn', language)}
              onClick={() => setTherapyTechniquesOpen(true)}
              accentColor="bg-slate-100 text-teal-700 dark:bg-slate-800 dark:text-teal-400"
            />

            <ServiceCard
              title={tKey('homePage.learnTitle', language)}
              description="Explore our clinical encyclopedia of conditions and coping strategies."
              icon={BookOpen}
              imageSrc="/images/stock/mental_health_awareness.jpg"
              buttonText={tKey('homePage.openEducation', language)}
              onClick={() => setDisordersOpen(true)}
              accentColor="bg-slate-100 text-teal-700 dark:bg-slate-800 dark:text-teal-400"
            />

            <ServiceCard
              title={tKey('homePage.selfToolsTitle', language)}
              description="Take clinically validated self-assessment tests to better understand your current mental state."
              icon={ClipboardList}
              imageSrc="/images/section-bg/self_reflection_bg.jpg"
              buttonText={tKey('homePage.openAssessments', language)}
              onClick={() => setAssessmentOpen(true)}
              accentColor="bg-slate-100 text-teal-700 dark:bg-slate-800 dark:text-teal-400"
            />

            <ServiceCard
              title={tKey('homePage.communityTitle', language)}
              description={tKey('homePage.communityDesc', language)}
              icon={Users}
              imageSrc="/images/stock/community_worldwide_support.jpg"
              buttonText={tKey('homePage.communityBtn', language)}
              onClick={() => setCommunityOpen(true)}
              accentColor="bg-slate-100 text-teal-700 dark:bg-slate-800 dark:text-teal-400"
            />

            <ServiceCard
              title={tKey('homePage.gamesTitle', language)}
              description={tKey('homePage.gamesDesc', language)}
              icon={Gamepad2}
              imageSrc="/images/section-bg/wellbeing_games_bg.jpg"
              buttonText={tKey('homePage.gamesBtn', language)}
              onClick={() => setGamesOpen(true)}
              accentColor="bg-slate-100 text-teal-700 dark:bg-slate-800 dark:text-teal-400"
            />

          </div>
        </div>

        {/* 5. Mood Tracker (Full Width Clinical Tool) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-400">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{tKey('homePage.moodTitle', language)}</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{tKey('homePage.moodTag', language)}</p>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 sm:p-8">
             <MoodTracker />
          </div>
        </div>

        {/* 6. Mission & Education (About Us) */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Mission Accordion */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 h-full">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tKey('homePage.goalsTitle', language)}</h2>
             </div>
             <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
                <WhoWeAreContent />
             </div>
             <WhoWeAreGoalsAccordion />
          </div>

          {/* Blog & Resources */}
          <div className="bg-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg h-full flex flex-col relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]" />
             
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-teal-800 text-teal-100">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{tKey('homePage.blogTitle', language)}</h2>
                </div>
                
                <p className="text-teal-100 text-lg mb-10 leading-relaxed">
                  {tKey('homePage.blogDesc', language)}
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-auto">
                  <h3 className="text-xl font-bold mb-3">{tKey('homePage.blogReadTitle', language)}</h3>
                  <p className="text-teal-50 mb-6">{tKey('homePage.blogReadDesc', language)}</p>
                  <Button className="w-full sm:w-auto bg-white text-teal-900 hover:bg-teal-50 rounded-xl font-semibold" size="lg" asChild>
                    <Link href="/blog">{tKey('homePage.blogBtn', language)}</Link>
                  </Button>
                </div>
             </div>
          </div>
        </div>

        {/* 7. Community Proof & Contact */}
        <div className="space-y-16">
          <Testimonials />
          
          {/* Contact Section */}
          <div className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-12 border border-slate-200 dark:border-slate-800">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">{tKey('homePage.fundTitle', language)}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">{tKey('homePage.fundDesc', language)}</p>
                <div className="space-y-6">
                  <a href="mailto:contactmindwellorg@gmail.com" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-shadow"><Mail className="w-6 h-6" /></div>
                    <span className="text-lg font-medium">contactmindwellorg@gmail.com</span>
                  </a>
                  <a href="tel:+8801988223165" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-shadow"><Phone className="w-6 h-6" /></div>
                    <span className="text-lg font-medium">+8801988223165</span>
                  </a>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
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
