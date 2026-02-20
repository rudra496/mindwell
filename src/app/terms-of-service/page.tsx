import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MindWell Terms of Service – usage guidelines, responsibilities, and legal information.',
};

export default function TermsOfServicePage() {
  const lastUpdated = '2025-01-01';

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl" id="main-content">
      <article>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using MindWell (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If
              you do not agree, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2>2. Nature of the Platform</h2>
            <p>
              MindWell is an open-source mental health education and wellbeing platform. It provides educational resources,
              self-reflection tools, and access to mental health support. It is <strong>not a medical service, diagnosis tool,
              or emergency service</strong>.
            </p>
          </section>

          <section>
            <h2>3. Not a Substitute for Professional Care</h2>
            <p>
              Content on MindWell is for educational and informational purposes only. It does not constitute medical advice,
              diagnosis, or treatment. Always seek the advice of qualified health providers for any medical concerns.
            </p>
          </section>

          <section>
            <h2>4. User Responsibilities</h2>
            <ul>
              <li>Use the Platform responsibly and in good faith.</li>
              <li>Do not misuse community features to spread misinformation or harmful content.</li>
              <li>Do not attempt to circumvent security measures.</li>
              <li>You are responsible for maintaining the confidentiality of any account credentials.</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              MindWell is open-source software licensed under its respective license. Content contributed by volunteers and
              team members retains attribution. You may not reproduce or distribute proprietary content without permission.
            </p>
          </section>

          <section>
            <h2>6. Privacy</h2>
            <p>
              Your use of the Platform is also governed by our{' '}
              <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>. We are committed to
              a privacy-first approach with minimal data collection.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              MindWell is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising
              from use of the Platform, including any reliance on educational content. See our{' '}
              <Link href="/medical-disclaimer" className="text-teal-600 hover:underline">Medical Disclaimer</Link> for more details.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the Platform after changes constitutes acceptance
              of the new terms. The &ldquo;Last updated&rdquo; date above reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              For questions about these terms, contact us at{' '}
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
