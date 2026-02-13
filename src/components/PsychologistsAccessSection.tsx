"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Briefcase, Award, User } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface PsychologistsAccessSectionProps {
  onRequestSupport?: () => void
}

/**
 * Access to Psychologists Section
 * Shows both psychologists with their information and contact options
 */
export function PsychologistsAccessSection({ onRequestSupport }: PsychologistsAccessSectionProps) {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const psychologists = [
    {
      name: "Md. Rifat Hasan Tarofder",
      title: { en: "Assistant Clinical Psychologist", bn: "সহকারী ক্লিনিক্যাল সাইকোলজিস্ট" },
      experience: { en: "2+ years", bn: "২+ বছর" },
      skills: [
        "Cognitive Behavioral Therapy",
        "Counseling Psychology",
        "Mental Health",
        "Active Listening",
        "Psychology",
        "Communication Skills",
        "Research Paper Writing",
        "Psychometrics",
        "Child Counseling",
        "Stress Management",
        "Client Management",
        "Crisis Management"
      ],
      whatsapp: "https://wa.me/+8801706520948",
      phone: "+880 1706-520948",
      photo: null // Using initials
    },
    {
      name: "Kamrul Hasan",
      title: { en: "Clinical Psychologist", bn: "ক্লিনিক্যাল সাইকোলজিস্ট" },
      experience: { en: "2+ years", bn: "২+ বছর" },
      skills: [
        "Cognitive Behavioral Therapy",
        "Counseling Psychology",
        "Mental Health",
        "Active Listening",
        "Psychology",
        "Communication Skills",
        "Research Paper Writing",
        "Psychometrics",
        "Child Counseling",
        "Stress Management",
        "Client Management",
        "Crisis Management"
      ],
      whatsapp: "https://wa.me/+8801706520948", // Temporary - same as Rifat
      phone: "+880 1706-520948", // Temporary - same as Rifat
      photo: "kamrul.jpg" // Placeholder - needs to be added
    }
  ]

  return (
    <section className="mb-12" id="psychologists">
      <Card className="border-2 border-teal-200 dark:border-teal-700 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 overflow-hidden">
        <CardHeader className="bg-white/50 dark:bg-gray-800/50 border-b border-teal-200 dark:border-teal-700">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-teal-900 dark:text-teal-100 text-center mb-2">
            {mounted
              ? (language === 'en' ? "1 Free Session for All - Worldwide Access" : "সবার জন্য ১টি বিনামূল্যে সেশন - বিশ্বব্যাপী অ্যাক্সেস")
              : "1 Free Session for All - Worldwide Access"}
          </CardTitle>
          <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
            {mounted
              ? (language === 'en' 
                  ? "Connect with our platform clinical psychologists"
                  : "আমাদের প্ল্যাটফর্ম ক্লিনিক্যাল সাইকোলজিস্টদের সাথে যোগাযোগ করুন")
              : "Connect with our platform clinical psychologists"}
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {psychologists.map((psychologist, index) => (
              <Card 
                key={index}
                className="bg-white dark:bg-gray-800 border-2 border-teal-100 dark:border-teal-800 hover:shadow-xl transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    {/* Photo/Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {psychologist.photo === "kamrul.jpg" ? (
                        <div className="text-center">
                          <User className="h-10 w-10" />
                          <p className="text-xs mt-1">Photo pending</p>
                        </div>
                      ) : (
                        psychologist.name.split(' ').map(n => n[0]).join('').substring(0, 2)
                      )}
                    </div>
                    
                    {/* Name and Title */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {psychologist.name}
                      </h3>
                      <p className="text-teal-700 dark:text-teal-400 font-semibold flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {mounted ? psychologist.title[language] : psychologist.title.en}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                        <Award className="h-4 w-4" />
                        {mounted ? psychologist.experience[language] : psychologist.experience.en} {mounted ? (language === 'en' ? 'experience' : 'অভিজ্ঞতা') : 'experience'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                      {mounted ? (language === 'en' ? 'Specializations:' : 'বিশেষত্ব:') : 'Specializations:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {psychologist.skills.slice(0, 6).map((skill, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {psychologist.skills.length > 6 && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1">
                          +{psychologist.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Contact Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button 
                      onClick={() => window.open(psychologist.whatsapp, '_blank')}
                      className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {mounted ? (language === 'en' ? 'WhatsApp (Chat Only)' : 'হোয়াটসঅ্যাপ (শুধুমাত্র চ্যাট)') : 'WhatsApp (Chat Only)'}
                    </Button>
                    <Button 
                      onClick={() => window.open(`tel:${psychologist.phone}`, '_blank')}
                      variant="outline"
                      className="w-full border-2 border-teal-600 dark:border-teal-500 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {mounted ? (language === 'en' ? 'Call' : 'কল করুন') : 'Call'}: {psychologist.phone}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Important Notes */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-600 dark:border-blue-500">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-blue-900 dark:text-blue-300">
                {mounted ? (language === 'en' ? '📌 Important Note:' : '📌 গুরুত্বপূর্ণ নোট:') : '📌 Important Note:'}
              </strong>
              <br />
              {mounted 
                ? (language === 'en'
                    ? "• This service is for worldwide access, not limited to any specific region"
                    : "• এই পরিষেবাটি বিশ্বব্যাপী অ্যাক্সেসের জন্য, কোনও নির্দিষ্ট অঞ্চলে সীমাবদ্ধ নয়")
                : "• This service is for worldwide access, not limited to any specific region"}
              <br />
              {mounted 
                ? (language === 'en'
                    ? "• WhatsApp is for chat only; phone numbers are provided for calling"
                    : "• হোয়াটসঅ্যাপ শুধুমাত্র চ্যাটের জন্য; ফোন নম্বরগুলি কল করার জন্য প্রদান করা হয়েছে")
                : "• WhatsApp is for chat only; phone numbers are provided for calling"}
              <br />
              {mounted 
                ? (language === 'en'
                    ? "• All sessions maintain strict confidentiality and follow professional ethical guidelines"
                    : "• সমস্ত সেশন কঠোর গোপনীয়তা বজায় রাখে এবং পেশাদার নৈতিক নির্দেশিকা অনুসরণ করে")
                : "• All sessions maintain strict confidentiality and follow professional ethical guidelines"}
            </p>
          </div>
          
          {/* Photo Placeholder Note for Kamrul */}
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-300 dark:border-yellow-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-yellow-900 dark:text-yellow-300">
                {mounted ? (language === 'en' ? '📸 For Developers:' : '📸 ডেভেলপারদের জন্য:') : '📸 For Developers:'}
              </strong>
              <br />
              {mounted 
                ? (language === 'en'
                    ? "Please add kamrul.jpg photo to /public/images/ directory. The photo should be a professional headshot with transparent or neutral background."
                    : "দয়া করে /public/images/ ডিরেক্টরিতে kamrul.jpg ফটো যোগ করুন। ফটোটি স্বচ্ছ বা নিরপেক্ষ পটভূমি সহ একটি পেশাদার হেডশট হওয়া উচিত।")
                : "Please add kamrul.jpg photo to /public/images/ directory. The photo should be a professional headshot with transparent or neutral background."}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
