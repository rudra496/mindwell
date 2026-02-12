import { FAQAccordion } from '@/components/FAQAccordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about MindWell mental health platform',
};

export default function FAQPage() {
  const faqItems = [
    {
      question: 'Is MindWell a substitute for professional mental health care?',
      answer: 'No. MindWell is NOT a substitute for professional medical advice, clinical diagnosis, medical treatment, therapy, counseling, psychiatric care, or emergency services. It provides educational information and self-help resources only.'
    },
    {
      question: 'What does MindWell provide?',
      answer: 'MindWell provides:\n\n✅ Educational Information: Evidence-based information about mental health conditions\n✅ Screening Tools: Self-assessment questionnaires to help identify potential concerns\n✅ Self-Help Resources: Coping strategies, wellness activities, and therapeutic techniques\n✅ Crisis Information: Links to professional crisis hotlines and emergency resources'
    },
    {
      question: 'Are the assessment tools diagnostic?',
      answer: 'No. The self-assessment tools are screening instruments, NOT diagnostic tools. They should be used as a starting point for discussion with healthcare providers and cannot replace a comprehensive evaluation by a qualified professional. Results should ALWAYS be discussed with a licensed healthcare professional.'
    },
    {
      question: 'What should I do in a crisis?',
      answer: 'IF YOU ARE IN CRISIS OR HAVING THOUGHTS OF SUICIDE, CALL EMERGENCY SERVICES IMMEDIATELY.\n\n🚨 United States: Call or text 988 (Suicide & Crisis Lifeline)\n🚨 Crisis Text Line (US): Text HELLO to 741741\n🚨 Bangladesh: Call 09678 676 789 (Kaan Pete Roi)\n\nMindWell is NOT a crisis intervention service. Always contact emergency services or professional crisis hotlines.'
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Yes. MindWell is built with privacy as a core principle. Whenever possible, user-generated data (mood tracking, journaling, self-assessment results) is stored locally on your device. We do not sell, rent, or monetize user data. See our Privacy Policy for full details.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No. Authentication is NOT required to access core educational features. Google (Gmail) authentication is only needed for limited features like community participation and to help prevent abuse and spam.'
    },
    {
      question: 'Is MindWell really free?',
      answer: 'Yes. MindWell is 100% free and open source. We believe mental health support should be accessible to everyone. There are no hidden fees, subscriptions, or premium features.'
    },
    {
      question: 'Where does the information come from?',
      answer: 'All information on MindWell is evidence-based and sourced from reputable organizations including the National Institute of Mental Health (NIMH), World Health Organization (WHO), American Psychiatric Association (APA), and peer-reviewed research from PubMed. See our Data Sources page for full citations.'
    },
    {
      question: 'Can I use MindWell on mobile devices?',
      answer: 'Yes. MindWell is a Progressive Web App (PWA) that works on all devices - desktop, tablet, and mobile. You can install it on your phone for a native app-like experience.'
    },
    {
      question: 'How can I contribute to MindWell?',
      answer: 'MindWell is open source! You can contribute by reporting issues, suggesting features, improving documentation, or contributing code on our GitHub repository: https://github.com/rudra496/mindwell'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Find answers to common questions about MindWell
        </p>
      </div>
      
      <FAQAccordion items={faqItems} />
      
      <div className="mt-12 p-6 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Still have questions?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you couldn't find the answer you were looking for, feel free to reach out.
        </p>
        <a
          href="mailto:rudrasarker125@gmail.com"
          className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
