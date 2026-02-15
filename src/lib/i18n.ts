/**
 * Internationalization (i18n) system for MindWell
 * Supports English and Bangla with localStorage persistence
 */

export type Language = 'en' | 'bn'

export interface Translation {
  en: string
  bn: string
}

// Language persistence key
const LANGUAGE_KEY = 'mindwell_language'

/**
 * Get the current language from localStorage or default to English
 */
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const stored = localStorage.getItem(LANGUAGE_KEY)
  if (stored === 'en' || stored === 'bn') {
    return stored
  }
  return 'en'
}

/**
 * Set the current language and persist to localStorage
 */
export function setCurrentLanguage(lang: Language): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LANGUAGE_KEY, lang)
}

/**
 * Get translated text based on current language
 */
export function t(translation: Translation, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage()
  return translation[currentLang]
}

/**
 * Core translations for the platform
 */
export const translations = {
  // Navigation
  nav: {
    home: { en: 'Home', bn: 'হোম' },
    selfHelpTools: { en: 'Self-Help Tools', bn: 'স্ব-সহায়তা সরঞ্জাম' },
    therapyMeditation: { en: 'Therapy & Meditation', bn: 'থেরাপি এবং ধ্যান' },
    psychologists: { en: 'Psychologists', bn: 'মনোবিজ্ঞানী' },
    crisisHelp: { en: 'Crisis & Emergency Help', bn: 'সংকট এবং জরুরি সাহায্য' },
    bangladeshServices: { en: 'Free Services in Bangladesh 🇧🇩', bn: 'বাংলাদেশে বিনামূল্যে সেবা 🇧🇩' },
    sdgMission: { en: 'SDG & Our Mission', bn: 'SDG এবং আমাদের মিশন' },
    about: { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
    contact: { en: 'Contact & Support', bn: 'যোগাযোগ এবং সহায়তা' },
  },
  
  // Hero Section
  hero: {
    title: { en: 'MindWell', bn: 'মাইন্ডওয়েল' },
    subtitle: { en: "Open-Source Mental Health Platform", bn: 'ওপেন-সোর্স মানসিক স্বাস্থ্য প্ল্যাটফর্ম' },
    description: { 
      en: 'Comprehensive, scientifically-backed, free mental health support with 63+ disorders, 20 validated assessments, 16 therapeutic games, 14 meditations, 20 therapy techniques, and crisis resources.',
      bn: '৬৩+ ব্যাধি, ২০টি যাচাইকৃত মূল্যায়ন, ১৬টি থেরাপিউটিক গেম, ১৪টি ধ্যান, ২০টি থেরাপি কৌশল এবং সংকট সংস্থান সহ ব্যাপক, বৈজ্ঞানিকভাবে সমর্থিত, বিনামূল্যে মানসিক স্বাস্থ্য সহায়তা।'
    },
    getSupportBtn: { en: 'Get Support', bn: 'সহায়তা পান' },
    emergencyHelpBtn: { en: 'Emergency Help', bn: 'জরুরি সাহায্য' },
  },
  
  // Our Support Section
  support: {
    title: { en: 'Our Support', bn: 'আমাদের সহায়তা' },
    emotional: { en: 'Emotional Support', bn: 'আবেগিক সহায়তা' },
    emotionalDesc: { en: 'Compassionate resources for managing emotions and mental health challenges', bn: 'আবেগ এবং মানসিক স্বাস্থ্য চ্যালেঞ্জ পরিচালনার জন্য সহানুভূতিশীল সম্পদ' },
    selfHelp: { en: 'Self-Help Resources', bn: 'স্ব-সহায়তা সম্পদ' },
    selfHelpDesc: { en: 'Evidence-based tools and techniques for personal growth and wellness', bn: 'ব্যক্তিগত বৃদ্ধি এবং সুস্থতার জন্য প্রমাণ-ভিত্তিক সরঞ্জাম এবং কৌশল' },
    professional: { en: 'Professional Guidance', bn: 'পেশাদার নির্দেশনা' },
    professionalDesc: { en: 'Access to qualified psychologists and mental health professionals', bn: 'যোগ্য মনোবিজ্ঞানী এবং মানসিক স্বাস্থ্য পেশাদারদের অ্যাক্সেস' },
    community: { en: 'Community Care', bn: 'সম্প্রদায় যত্ন' },
    communityDesc: { en: 'Safe peer support spaces for sharing experiences and finding connection', bn: 'অভিজ্ঞতা ভাগ করে নেওয়ার এবং সংযোগ খুঁজে পাওয়ার জন্য নিরাপদ সহকর্মী সহায়তা স্থান' },
  },
  
  // Features
  features: {
    title: { en: 'What MindWell Offers', bn: 'মাইন্ডওয়েল কী অফার করে' },
    disorders: { en: 'Disorders Database', bn: 'ব্যাধি ডেটাবেস' },
    assessments: { en: 'Self-Assessments', bn: 'স্ব-মূল্যায়ন' },
    games: { en: 'Therapeutic Games', bn: 'থেরাপিউটিক গেম' },
    chatbot: { en: 'AI Support Chatbot', bn: 'AI সহায়তা চ্যাটবট' },
    community: { en: 'Community Forum', bn: 'কমিউনিটি ফোরাম' },
    therapy: { en: 'Therapy Library', bn: 'থেরাপি লাইব্রেরি' },
    meditation: { en: 'Meditation Library', bn: 'ধ্যান লাইব্রেরি' },
    crisis: { en: 'Crisis Resources', bn: 'সংকট সম্পদ' },
  },
  
  // Bangladesh Section
  bangladesh: {
    title: { en: 'Free Services in Bangladesh 🇧🇩', bn: 'বাংলাদেশে বিনামূল্যে সেবা 🇧🇩' },
    description: { 
      en: 'All MindWell services are completely free for users in Bangladesh. We are committed to making mental health support accessible to everyone.',
      bn: 'বাংলাদেশের ব্যবহারকারীদের জন্য সমস্ত মাইন্ডওয়েল পরিষেবা সম্পূর্ণ বিনামূল্যে। আমরা সবার জন্য মানসিক স্বাস্থ্য সহায়তা অ্যাক্সেসযোগ্য করতে প্রতিশ্রুতিবদ্ধ।'
    },
  },
  
  // SDG Section
  sdg: {
    title: { en: 'SDG 3: Good Health & Well-Being', bn: 'SDG 3: সুস্বাস্থ্য এবং কল্যাণ' },
    description: {
      en: 'MindWell contributes to the United Nations Sustainable Development Goal 3 by providing accessible mental health resources and support to communities worldwide.',
      bn: 'মাইন্ডওয়েল বিশ্বব্যাপী সম্প্রদায়গুলিতে অ্যাক্সেসযোগ্য মানসিক স্বাস্থ্য সংস্থান এবং সহায়তা প্রদান করে জাতিসংঘের টেকসই উন্নয়ন লক্ষ্য ৩-এ অবদান রাখে।'
    },
  },
  
  // Psychologists Section
  psychologists: {
    title: { en: 'Access to Psychologists', bn: 'মনোবিজ্ঞানীদের অ্যাক্সেস' },
    description: {
      en: 'Connect with qualified psychologists who can provide professional guidance and support.',
      bn: 'যোগ্য মনোবিজ্ঞানীদের সাথে সংযুক্ত হন যারা পেশাদার নির্দেশনা এবং সহায়তা প্রদান করতে পারেন।'
    },
    requestBtn: { en: 'Request Support', bn: 'সহায়তার অনুরোধ করুন' },
  },
  
  // Crisis
  crisis: {
    title: { en: 'IN CRISIS? GET HELP NOW', bn: 'সংকটে? এখনই সাহায্য পান' },
    us: { en: 'US', bn: 'মার্কিন যুক্তরাষ্ট্র' },
    emergency: { en: 'Emergency', bn: 'জরুরি' },
  },
  
  // Medical Disclaimer
  disclaimer: {
    title: { en: 'Medical Disclaimer', bn: 'চিকিৎসা দাবিত্যাগ' },
    text: {
      en: 'FOR EDUCATIONAL PURPOSES ONLY. This platform is NOT a substitute for professional medical advice, diagnosis, or treatment. ALWAYS consult licensed mental health professionals. Assessments are screening tools, NOT diagnostic instruments.',
      bn: 'শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এই প্ল্যাটফর্মটি পেশাদার চিকিৎসা পরামর্শ, নির্ণয় বা চিকিত্সার বিকল্প নয়। সর্বদা লাইসেন্সপ্রাপ্ত মানসিক স্বাস্থ্য পেশাদারদের সাথে পরামর্শ করুন। মূল্যায়ন হল স্ক্রীনিং সরঞ্জাম, ডায়াগনস্টিক যন্ত্র নয়।'
    },
  },
  
  // Buttons
  buttons: {
    explore: { en: 'Explore', bn: 'অন্বেষণ করুন' },
    start: { en: 'Start', bn: 'শুরু করুন' },
    back: { en: 'Back', bn: 'পিছনে' },
    next: { en: 'Next', bn: 'পরবর্তী' },
    previous: { en: 'Previous', bn: 'আগের' },
    close: { en: 'Close', bn: 'বন্ধ করুন' },
    learnMore: { en: 'Learn More', bn: 'আরও জানুন' },
    getHelp: { en: 'Get Help Now', bn: 'এখনই সাহায্য পান' },
  },
  
  // Common
  common: {
    inspiredBy: { en: 'Inspired by Prof. Farzana Hussain, Ph.D.', bn: 'অনুপ্রাণিত: প্রফেসর ফারজানা হুসেন, পিএইচডি' },
  },
  
  // Voice Controls
  voice: {
    play: { en: 'Play', bn: 'প্লে' },
    pause: { en: 'Pause', bn: 'বিরাম' },
    resume: { en: 'Resume', bn: 'পুনরায় শুরু' },
    stop: { en: 'Stop', bn: 'থামুন' },
  },
  
  // Footer
  footer: {
    about: { en: 'About MindWell', bn: 'মাইন্ডওয়েল সম্পর্কে' },
    contact: { en: 'Contact', bn: 'যোগাযোগ' },
    important: { en: 'Important', bn: 'গুরুত্বপূর্ণ' },
    copyright: { 
      en: 'MindWell. Open-source mental health platform.',
      bn: 'মাইন্ডওয়েল। ওপেন-সোর্স মানসিক স্বাস্থ্য প্ল্যাটফর্ম।'
    },
  },
}
