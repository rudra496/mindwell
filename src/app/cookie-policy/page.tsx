import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'MindWell Cookie Policy – how we use cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  const lastUpdated = '2025-01-01';

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl" id="main-content">
      <article>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Cookie Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit websites. They help sites remember
              preferences and provide a better experience.
            </p>
          </section>

          <section>
            <h2>How MindWell Uses Cookies</h2>
            <p>MindWell uses a minimal number of cookies and browser storage mechanisms:</p>
            <ul>
              <li>
                <strong>Functional storage (localStorage):</strong> We store preferences such as theme choice (dark/light mode),
                onboarding tour completion status, and recent search history in your browser&apos;s local storage. This data
                never leaves your device and is not sent to our servers.
              </li>
              <li>
                <strong>Session cookies:</strong> If you use authenticated features (such as community posting), a session
                cookie may be used to maintain your login state.
              </li>
              <li>
                <strong>No tracking cookies:</strong> We do not use advertising, profiling, or cross-site tracking cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2>Third-Party Cookies</h2>
            <p>
              MindWell does not load third-party advertising or analytics scripts that set cookies. If you embed or share
              content from external platforms (e.g., social media), those platforms may set their own cookies governed by
              their own policies.
            </p>
          </section>

          <section>
            <h2>Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings. Disabling cookies or clearing local storage will reset
              your preferences (such as theme and tour status) but will not affect your ability to use the core platform.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy as the Platform evolves. The &ldquo;Last updated&rdquo; date above reflects the most recent
              revision.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions? Email us at{' '}
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
