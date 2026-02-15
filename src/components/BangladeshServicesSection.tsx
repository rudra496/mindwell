"use client"

import { useEffect, useState } from "react"
import { Shield } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

/**
 * Bangladesh Services Section
 * Retains accessibility commitment messaging after homepage cleanup.
 */
export function BangladeshServicesSection() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800 transition-colors" id="bangladesh-services">
      <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-colors">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">
              {mounted
                ? (language === 'en' ? "Commitment to Accessibility" : "অ্যাক্সেসযোগ্যতার প্রতিশ্রুতি")
                : "Commitment to Accessibility"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {mounted
                ? (language === 'en'
                    ? "MindWell is developed with a focus on Bangladesh and similar low-resource settings. We align with government and NGO initiatives to improve mental health awareness and support in our communities."
                    : "মাইন্ডওয়েল বাংলাদেশ এবং অনুরূপ কম-সম্পদ সেটিংসের উপর ফোকাস করে তৈরি করা হয়েছে। আমরা আমাদের সম্প্রদায়গুলিতে মানসিক স্বাস্থ্য সচেতনতা এবং সহায়তা উন্নত করতে সরকারি এবং এনজিও উদ্যোগের সাথে সারিবদ্ধ।")
                : "MindWell is developed with a focus on Bangladesh and similar low-resource settings. We align with government and NGO initiatives to improve mental health awareness and support in our communities."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
