"use client"

import { Heart, Mail, Globe, Github, Facebook, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t, tKey } from "@/lib/i18n"
import { config } from "@/lib/config"
import { CRISIS_BANGLADESH, CRISIS_US, EMERGENCY } from "@/lib/crisis-info"

export function Footer() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {mounted ? t(translations.footer.about, language) : "About MindWell"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words mb-3">
              {mounted 
                ? tKey('footerLegacy.aboutDescription', language)
                : "MindWell – Open Source Mental Health Platform. Free access to mental health resources, with limited free psychologist sessions based on availability."}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {mounted
                ? tKey('footerLegacy.createdWith', language)
                : "Created with"}{" "}
              <Heart className="inline h-3 w-3 text-red-500" />{" "}
              {mounted
                ? tKey('footerLegacy.awareness', language)
                : "for mental health awareness"}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {mounted ? t(translations.footer.contact, language) : "Contact"}
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors break-words"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{config.contact.email}</span>
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {mounted ? tKey('footerLegacy.inspiredBy', language) : "Inspired by"}{" "}
              <a
                href={config.advisors.farzanaLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
              >
                Prof. Farzana Hussain, Ph.D.
                <Linkedin className="h-3 w-3" />
              </a>
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {mounted ? tKey('footerLegacy.quickLinks', language) : "Quick Links"}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <a href="/medical-disclaimer" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? tKey('footerLegacy.disclaimer', language) : "Disclaimer"}
              </a>
              <a href="/privacy" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? tKey('footerLegacy.privacy', language) : "Privacy Policy"}
              </a>
              <a href="/faq" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? tKey('footerLegacy.faq', language) : "FAQ"}
              </a>
              <a href="/ethics" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? tKey('footerLegacy.ethics', language) : "Ethics & Safety"}
              </a>
              <a href="/terms" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? tKey('footerLegacy.terms', language) : "Terms of Service"}
              </a>
            </div>
          </div>
        </div>

        {/* Important Crisis Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-300 dark:border-red-700">
            <h4 className="font-bold text-red-900 dark:text-red-300 mb-2 text-sm">
              {mounted ? tKey('footerLegacy.crisisSupport', language) : "🚨 Crisis Support"}
            </h4>
            <div className="space-y-1 text-xs text-red-800 dark:text-red-300">
              <p><strong>Bangladesh:</strong> {CRISIS_BANGLADESH.organization}: <strong>{CRISIS_BANGLADESH.phone}</strong> ({CRISIS_BANGLADESH.hours})</p>
              <p><strong>US:</strong> Call or text <strong>{CRISIS_US.phone}</strong> ({CRISIS_US.organization})</p>
              <p><strong>Emergency:</strong> <strong>{EMERGENCY.BD}</strong> (Bangladesh) or <strong>{EMERGENCY.US}</strong> (US)</p>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {mounted ? tKey('footerLegacy.developedBy', language) : "Developed & Founded by"}
            </p>
            <p className="text-base font-bold text-teal-700 dark:text-teal-400 mb-3">
              {config.developer.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Phone: {config.developer.phone}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href={config.developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={config.developer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={config.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {currentYear} MindWell.{" "}
            {mounted ? t(translations.footer.copyright, language) : "Open-source mental health platform."}
            <br className="sm:hidden" /> Licensed under MIT.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {mounted
              ? tKey('footerLegacy.educational', language)
              : "For educational purposes only. Not a substitute for professional medical advice, diagnosis, or treatment."}
          </p>
        </div>
      </div>
    </footer>
  )
}
