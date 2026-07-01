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
    <footer className="mt-16 bg-slate-900 dark:bg-black text-slate-300 transition-colors border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">
              {mounted ? t(translations.footer.about, language) : "About MindWell"}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-4">
              {mounted 
                ? tKey('footerLegacy.aboutDescription', language)
                : "MindWell – Open Source Mental Health Platform. Free access to mental health resources, with limited free psychologist sessions based on availability."}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              {mounted
                ? tKey('footerLegacy.createdWith', language)
                : "Created with"}{" "}
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />{" "}
              {mounted
                ? tKey('footerLegacy.awareness', language)
                : "for mental health awareness"}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {mounted ? t(translations.footer.contact, language) : "Contact"}
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                <div className="p-2 rounded-full bg-slate-800"><Mail className="h-4 w-4" /></div>
                <span>{config.contact.email}</span>
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-6">
              {mounted ? tKey('footerLegacy.inspiredBy', language) : "Inspired by"}{" "}
              <a
                href={config.advisors.farzanaLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                Prof. Farzana Hussain, Ph.D.
              </a>
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {mounted ? tKey('footerLegacy.quickLinks', language) : "Quick Links"}
            </h3>
            <div className="space-y-3 text-sm flex flex-col">
              <a href="/medical-disclaimer" className="text-slate-400 hover:text-white transition-colors">
                {mounted ? tKey('footerLegacy.disclaimer', language) : "Disclaimer"}
              </a>
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                {mounted ? tKey('footerLegacy.privacy', language) : "Privacy Policy"}
              </a>
              <a href="/faq" className="text-slate-400 hover:text-white transition-colors">
                {mounted ? tKey('footerLegacy.faq', language) : "FAQ"}
              </a>
              <a href="/ethics" className="text-slate-400 hover:text-white transition-colors">
                {mounted ? tKey('footerLegacy.ethics', language) : "Ethics & Safety"}
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors">
                {mounted ? tKey('footerLegacy.terms', language) : "Terms of Service"}
              </a>
            </div>
          </div>

          {/* Important Crisis Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {mounted ? tKey('footerLegacy.crisisSupport', language) : "🚨 Crisis Support"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="space-y-3 text-sm text-slate-300">
                <p><strong className="text-white">Bangladesh:</strong> {CRISIS_BANGLADESH.organization}: <strong className="text-red-400">{CRISIS_BANGLADESH.phone}</strong></p>
                <p><strong className="text-white">US:</strong> Call/text <strong className="text-red-400">{CRISIS_US.phone}</strong> ({CRISIS_US.organization})</p>
                <p><strong className="text-white">Emergency:</strong> <strong className="text-red-400">{EMERGENCY.BD}</strong> (BD) or <strong className="text-red-400">{EMERGENCY.US}</strong> (US)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Info & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-semibold text-white mb-1">
              {mounted ? tKey('footerLegacy.developedBy', language) : "Developed & Founded by"} {config.developer.name}
            </p>
            <div className="flex gap-4 mt-3">
              <a href={config.developer.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href={config.developer.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href={config.developer.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-slate-500 mb-2">
              &copy; {currentYear} MindWell. Licensed under MIT.
            </p>
            <p className="text-xs text-slate-600 max-w-sm">
              {mounted
                ? tKey('footerLegacy.educational', language)
                : "For educational purposes only. Not a substitute for professional medical advice, diagnosis, or treatment."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
