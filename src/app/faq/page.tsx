import { Metadata } from 'next';
import { FAQAccordion } from '@/components/FAQAccordion';
import crisisResourcesData from '@/data/crisis-resources.json';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about MindWell mental health platform',
};

type CrisisResource = {
  id: string;
  name: string;
  country: string;
  phone: string;
  textLine: string;
  website: string;
  available: string;
  mapLink?: string;
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
  const resourcesByCountry = (crisisResourcesData as CrisisResource[]).reduce<Record<string, CrisisResource[]>>((acc, resource) => {
    if (!acc[resource.country]) {
      acc[resource.country] = [];
    }
    acc[resource.country].push(resource);
    return acc;
  }, {});

  const countries = Object.keys(resourcesByCountry).sort((a, b) => a.localeCompare(b));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <section className="mb-10" aria-labelledby="faq-title">
        <h1 id="faq-title" className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h1>
        <FAQAccordion items={faqItems} />
      </section>

      <section aria-labelledby="crisis-resources-title">
        <h2 id="crisis-resources-title" className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Crisis Resources by Country
        </h2>

        <div className="space-y-4">
          {countries.map((country) => (
            <details
              key={country}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
            >
              <summary className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                {country}
              </summary>

              <div className="px-6 pb-5 pt-2 space-y-4">
                {resourcesByCountry[country].map((resource) => (
                  <div key={resource.id} className="rounded-md border border-gray-100 dark:border-slate-700 p-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
                    {resource.phone && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        <span className="font-medium">Phone:</span> {resource.phone}
                      </p>
                    )}
                    {resource.textLine && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span className="font-medium">Text:</span> {resource.textLine}
                      </p>
                    )}
                    {resource.available && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span className="font-medium">Availability:</span> {resource.available}
                      </p>
                    )}
                    {resource.website && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-all">
                        <span className="font-medium">Website:</span>{' '}
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-700 dark:text-teal-400 hover:underline"
                        >
                          {resource.website}
                        </a>
                      </p>
                    )}
                    {resource.mapLink && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-all">
                        <span className="font-medium">Google Maps:</span>{' '}
                        <a
                          href={resource.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-700 dark:text-teal-400 hover:underline"
                        >
                          Open location
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
