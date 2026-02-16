import { Metadata } from 'next';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about MindWell mental health platform',
};

const faqItems = [
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
    question: 'How can I book an appointment?',
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
    question: 'What are common malpractices in mental health care in Bangladesh, and how can I protect myself?',
    answer:
      'Important risks include lack of licensing verification and practice outside professional competence. Always verify credentials and training before starting care. Examples of malpractice include: breaking confidentiality, inappropriate personal relationships with clients, practicing outside expertise, poor or inadequate assessment, and proceeding without informed consent. If you notice any of these issues, seek a second opinion and switch to a verified provider.',
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <section className="mb-10" aria-labelledby="faq-title">
        <h1 id="faq-title" className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h1>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
