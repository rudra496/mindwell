import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import disordersData from "@/data/disorders.json";
import { DisorderSectionNavigation } from "@/components/disorders/DisorderSectionNavigation";

type Disorder = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  symptoms: string;
  prevalence?: string;
  ageOfOnset?: string;
  therapyApproaches?: string;
  naturalSolutions?: string;
  whenToSeekHelp?: string;
  riskFactors?: string;
  crisisResources?: string;
};

const disorders = disordersData as Disorder[];

export async function generateStaticParams() {
  return disorders.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const disorder = disorders.find((d) => d.slug === slug);
  if (!disorder) return { title: "Not Found" };
  return {
    title: `${disorder.name} – Mental Health Information`,
    description: disorder.description.slice(0, 155),
    keywords: [disorder.name, disorder.category, "mental health", "symptoms", "treatment", "therapy"],
    openGraph: {
      title: `${disorder.name} | MindWell`,
      description: disorder.description.slice(0, 155),
      type: "article",
    },
  };
}

function parseJsonField<T = string>(value: string | undefined): T[] {
  if (!value) return [];
  try {
    return JSON.parse(value) as T[];
  } catch {
    return [];
  }
}

export default async function DisorderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disorder = disorders.find((d) => d.slug === slug);
  if (!disorder) notFound();

  const symptoms = parseJsonField(disorder.symptoms);
  const therapyApproaches = parseJsonField(disorder.therapyApproaches);
  const naturalSolutions = parseJsonField(disorder.naturalSolutions);
  const whenToSeekHelp = parseJsonField(disorder.whenToSeekHelp);
  const riskFactors = parseJsonField(disorder.riskFactors);
  const crisisResources = parseJsonField(disorder.crisisResources);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" id="main-content">
      <Link
        href="/#learn-awareness"
        className="inline-flex items-center gap-2 text-sm text-teal-700 dark:text-teal-400 hover:underline mb-6"
        aria-label="Back to Learn & Awareness"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Learn &amp; Awareness
      </Link>

      <article aria-labelledby="disorder-title">
        <span className="inline-block text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full mb-3">
          {disorder.category}
        </span>
        <h1 id="disorder-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {disorder.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{disorder.description}</p>

        <DisorderSectionNavigation />


        {disorder.prevalence && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 italic">Prevalence: {disorder.prevalence}</p>
        )}

        <div className="space-y-6">
          {symptoms.length > 0 && (
            <section id="symptoms" aria-labelledby="symptoms-heading">
              <h2 id="symptoms-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Common Symptoms</h2>
              <ul className="space-y-1.5" role="list">
                {symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {riskFactors.length > 0 && (
            <section id="causes" aria-labelledby="risk-heading">
              <h2 id="risk-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Risk Factors</h2>
              <ul className="space-y-1.5" role="list">
                {riskFactors.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-orange-500 mt-0.5 shrink-0" aria-hidden="true">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {therapyApproaches.length > 0 && (
            <section id="treatment" aria-labelledby="therapy-heading">
              <h2 id="therapy-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Treatment Approaches</h2>
              <ul className="space-y-1.5" role="list">
                {therapyApproaches.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-purple-500 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {naturalSolutions.length > 0 && (
            <section aria-labelledby="natural-heading">
              <h2 id="natural-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Self-Help &amp; Natural Approaches</h2>
              <ul className="space-y-1.5" role="list">
                {naturalSolutions.map((n, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-green-500 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {whenToSeekHelp.length > 0 && (
            <section
              aria-labelledby="seek-help-heading"
              className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5"
            >
              <h2 id="seek-help-heading" className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" /> When to Seek Professional Help
              </h2>
              <ul className="space-y-1.5" role="list">
                {whenToSeekHelp.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-900 dark:text-amber-200 text-sm">
                    <span className="mt-0.5 shrink-0" aria-hidden="true">!</span>
                    {w}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {crisisResources.length > 0 && (
            <section
              aria-labelledby="crisis-heading"
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-5"
            >
              <h2 id="crisis-heading" className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">Crisis Resources</h2>
              <ul className="space-y-1 text-sm text-red-900 dark:text-red-200" role="list">
                {crisisResources.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <Link
                href="/crisis-resources"
                className="inline-block mt-3 text-sm text-red-700 dark:text-red-300 hover:underline font-medium"
              >
                View all crisis resources →
              </Link>
            </section>
          )}
        </div>

        <p className="mt-8 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4">
          This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </article>
    </div>
  );
}
