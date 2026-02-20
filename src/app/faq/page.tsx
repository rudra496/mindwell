import { Metadata } from 'next';
import Script from 'next/script';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about MindWell mental health platform – therapy, assessments, privacy, crisis resources and more.',
  keywords: ['mental health FAQ', 'therapy questions', 'CBT DBT', 'Bangladesh mental health', 'crisis support'],
};

const faqItems = [
  {
    question: 'What is MindWell?',
    answer:
      'MindWell is a free, open-source mental health education and wellbeing platform. It offers mental health disorder information, self-reflection assessments, therapy technique guides, crisis resources, and access to volunteer clinical psychologists – primarily for Bangladesh and underserved communities worldwide.',
  },
  {
    question: 'Is MindWell free to use?',
    answer:
      'Yes. Core features – educational resources, assessments, crisis resources, and community – are entirely free. MindWell is an open-source, non-commercial project maintained by volunteers.',
  },
  {
    question: 'What is the difference between a Psychologist and a Psychiatrist?',
    answer:
      'A psychologist primarily provides psychological assessment and psychotherapy. A psychiatrist is a medical doctor who can diagnose mental disorders, prescribe medication, and provide medical treatment. Many people benefit from coordinated care between both professionals when needed.',
  },
  {
    question: 'How long does therapy usually take?',
    answer:
      'Therapy duration varies by person, goals, and clinical needs. Some concerns may improve in a few focused sessions, while complex issues may require longer-term support. Your psychologist should discuss goals, expected timeline, and periodic progress reviews with you.',
  },
  {
    question: 'What should I do if I feel uncomfortable during therapy?',
    answer:
      'You have the right to feel safe and respected. You can raise your concern directly, request a change in approach, ask for another professional, or pause sessions. Informed consent and professional boundaries should always be maintained.',
  },
  {
    question: 'Where can I get free mental health services in Bangladesh?',
    answer:
      'You can explore public facilities and low-cost options through the Bangladesh services section on this platform. Availability may change by location and schedule, so confirm directly with the service provider before visiting.',
  },
  {
    question: 'How can I book an appointment with a psychologist?',
    answer:
      'Go to the Psychologists section, open the profile of your preferred psychologist, and use the listed contact options (phone or WhatsApp) to request an appointment directly.',
  },
  {
    question: 'What is CBT?',
    answer:
      'CBT (Cognitive Behavioral Therapy) is an evidence-based psychotherapy that helps people identify and change unhelpful thought patterns and behaviors. It is commonly used for anxiety, depression, stress, and related concerns.',
  },
  {
    question: 'What is DBT?',
    answer:
      'DBT (Dialectical Behavior Therapy) is an evidence-based therapy that focuses on emotion regulation, distress tolerance, mindfulness, and interpersonal effectiveness. It can be helpful for intense emotions, self-harm risk reduction, and relationship difficulties.',
  },
  {
    question: 'Are the self-reflection assessments a diagnosis?',
    answer:
      'No. Assessments on MindWell are self-reflection and screening tools based on validated scales (e.g., PHQ-9, GAD-7). They are not diagnostic instruments. Results should be discussed with a qualified mental health professional for proper evaluation.',
  },
  {
    question: 'How does MindWell protect my privacy?',
    answer:
      'MindWell is privacy-first. We collect minimal data, do not sell personal information, and use open-source code that anyone can review. Preferences like theme and tour status are stored only in your browser\'s local storage and never sent to our servers. See our Privacy Policy for full details.',
  },
  {
    question: 'What are common malpractices in mental health care in Bangladesh, and how can I protect myself?',
    answer:
      'Important risks include lack of licensing verification and practice outside professional competence. Always verify credentials and training before starting care. Examples of malpractice include: breaking confidentiality, inappropriate personal relationships with clients, practicing outside expertise, poor or inadequate assessment, and proceeding without informed consent. If you notice any of these issues, seek a second opinion and switch to a verified provider.',
  },
  {
    question: 'What should I do in a mental health emergency?',
    answer:
      'If you or someone else is in immediate danger, call emergency services immediately (999 in Bangladesh, 911 in the US). MindWell provides crisis resource listings and helpline numbers in the Crisis Resources section, but we are not an emergency service.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />
      <section className="mb-10" aria-labelledby="faq-title">
        <h1 id="faq-title" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Find answers to common questions about MindWell, mental health support, privacy, and how to access care.
        </p>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
