import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'MindWell Disclaimer – important information about limitations and appropriate use of this platform.',
};

export default function DisclaimerPage() {
  const lastUpdated = '2025-01-01';

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl" id="main-content">
      <article>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Disclaimer</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section className="border-l-4 border-amber-400 pl-4 bg-amber-50 dark:bg-amber-900/20 py-3 pr-3 rounded-r-lg">
            <p className="font-semibold text-amber-800 dark:text-amber-300">
              If you are in immediate danger or experiencing a mental health crisis, please contact emergency services
              (999 in Bangladesh, 911 in the US) or a local crisis helpline immediately.
            </p>
          </section>

          <section>
            <h2>Medical Disclaimer</h2>
            <p>
              MindWell is an educational and informational platform. Content on this Platform — including articles,
              self-reflection assessments, therapy technique descriptions, and any other material — is provided for
              general educational purposes only. It is <strong>not intended to be a substitute for professional medical
              advice, diagnosis, or treatment</strong>.
            </p>
            <p>
              Always seek the advice of your physician, clinical psychologist, or other qualified health provider with
              any questions you may have regarding a mental health condition or treatment. Never disregard professional
              medical advice or delay seeking it because of something you read on this Platform.
            </p>
          </section>

          <section>
            <h2>Self-Reflection Assessments</h2>
            <p>
              Assessments available on MindWell are screening tools intended for self-reflection and education.
              They are <strong>not diagnostic instruments</strong> and do not replace clinical evaluation by a qualified
              professional. Scores or results should be discussed with a healthcare provider for appropriate interpretation.
            </p>
          </section>

          <section>
            <h2>Psychologist Directory</h2>
            <p>
              MindWell lists psychologists who have volunteered to provide initial consultations. We verify credentials
              to the best of our ability, but we are not a licensing body and cannot guarantee the fitness or conduct
              of any individual professional. Users are encouraged to independently verify credentials before committing
              to ongoing care.
            </p>
          </section>

          <section>
            <h2>Open-Source Software Disclaimer</h2>
            <p>
              MindWell is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We do not warrant that
              the Platform will be uninterrupted, error-free, or free of viruses. See our{' '}
              <Link href="/terms" className="text-teal-600 hover:underline">Terms of Service</Link> for
              the full limitation of liability.
            </p>
          </section>

          <section>
            <h2>External Links</h2>
            <p>
              The Platform may link to third-party websites. We do not endorse or assume responsibility for the content,
              privacy practices, or availability of external sites.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For questions or concerns, contact{' '}
              <a href="mailto:contactmindwellorg@gmail.com" className="text-teal-600 hover:underline">
                contactmindwellorg@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
