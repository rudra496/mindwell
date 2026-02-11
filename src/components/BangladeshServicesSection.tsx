"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"

/**
 * Free Services in Bangladesh Section
 * Lists all free services available in BD with government/NGO alignment tone
 */
export function BangladeshServicesSection() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const services = [
    { 
      en: "All Mental Health Assessments", 
      bn: "সমস্ত মানসিক স্বাস্থ্য মূল্যায়ন" 
    },
    { 
      en: "Wellness Activities & Interactive Tools", 
      bn: "সুস্থতা কার্যক্রম এবং ইন্টারঅ্যাক্টিভ সরঞ্জাম" 
    },
    { 
      en: "Meditation & Mindfulness Guides", 
      bn: "ধ্যান এবং মননশীলতা গাইড" 
    },
    { 
      en: "Therapy Techniques & Resources", 
      bn: "থেরাপি কৌশল এবং সম্পদ" 
    },
    { 
      en: "Crisis Support Information", 
      bn: "সংকট সহায়তা তথ্য" 
    },
    { 
      en: "Community Support Forums", 
      bn: "কমিউনিটি সহায়তা ফোরাম" 
    },
    { 
      en: "Mental Health Education on 63+ Conditions", 
      bn: "৬৩+ ব্যাধি সম্পর্কে শিক্ষামূলক উপাদান" 
    },
    {
      en: "24/7 Kaan Pete Roi Helpline: 09678 676 777",
      bn: "২৪/৭ কান পেতে রই হেল্পলাইন: ০৯৬৭৮ ৬৭৬ ৭৭৭"
    }
  ]

  const bdResources = [
    {
      name: { en: "Kaan Pete Roi", bn: "কান পেতে রই" },
      description: { en: "24/7 Emotional Support Helpline", bn: "২৪/৭ আবেগিক সহায়তা হেল্পলাইন" },
      contact: "09678 676 777"
    },
    {
      name: { en: "National Mental Health Institute", bn: "জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট" },
      description: { en: "Professional Mental Health Services", bn: "পেশাদার মানসিক স্বাস্থ্য সেবা" },
      contact: "Sher-e-Bangla Nagar, Dhaka"
    },
    {
      name: { en: "NIMH Hospital", bn: "এনআইএমএইচ হাসপাতাল" },
      description: { en: "Psychiatric Treatment & Counseling", bn: "মানসিক রোগের চিকিৎসা এবং পরামর্শ" },
      contact: "Contact: +880-2-9126613"
    }
  ]

  return (
    <section className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200" id="bangladesh-services">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-3">
          {mounted ? t(translations.bangladesh.title, language) : "Free Services in Bangladesh 🇧🇩"}
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          {mounted ? t(translations.bangladesh.description, language) : "All MindWell services are completely free for users in Bangladesh. We are committed to making mental health support accessible to everyone."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 bg-white/80 rounded-lg p-4 border border-green-200 hover:shadow-md transition-all"
          >
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span className="text-gray-800 font-medium">
              {mounted ? (language === 'en' ? service.en : service.bn) : service.en}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white/60 rounded-xl p-6 border border-green-200 mb-6">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-green-900 mb-2">
              {mounted 
                ? (language === 'en' ? "Commitment to Accessibility" : "অ্যাক্সেসযোগ্যতার প্রতিশ্রুতি")
                : "Commitment to Accessibility"}
            </h3>
            <p className="text-gray-700 text-sm">
              {mounted
                ? (language === 'en'
                    ? "MindWell is developed with a focus on Bangladesh and similar low-resource settings. We align with government and NGO initiatives to improve mental health awareness and support in our communities."
                    : "মাইন্ডওয়েল বাংলাদেশ এবং অনুরূপ কম-সম্পদ সেটিংসের উপর ফোকাস করে তৈরি করা হয়েছে। আমরা আমাদের সম্প্রদায়গুলিতে মানসিক স্বাস্থ্য সচেতনতা এবং সহায়তা উন্নত করতে সরকারি এবং এনজিও উদ্যোগের সাথে সারিবদ্ধ।")
                : "MindWell is developed with a focus on Bangladesh and similar low-resource settings. We align with government and NGO initiatives to improve mental health awareness and support in our communities."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 rounded-xl p-6 border border-green-200">
        <h3 className="font-bold text-green-900 mb-4 text-lg">
          {mounted 
            ? (language === 'en' ? "Bangladesh Mental Health Resources" : "বাংলাদেশ মানসিক স্বাস্থ্য সংস্থান")
            : "Bangladesh Mental Health Resources"}
        </h3>
        <div className="space-y-4">
          {bdResources.map((resource, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Users className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {mounted ? (language === 'en' ? resource.name.en : resource.name.bn) : resource.name.en}
                </h4>
                <p className="text-sm text-gray-700">
                  {mounted ? (language === 'en' ? resource.description.en : resource.description.bn) : resource.description.en}
                </p>
                <p className="text-sm text-green-700 font-medium mt-1">
                  {resource.contact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
