import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import therapyData from "@/data/therapy-techniques.json";

type TherapyTechnique = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  steps?: string;
  examples?: string;
  when?: string;
  benefits?: string;
};

const techniques = therapyData as TherapyTechnique[];

export async function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tech = techniques.find((t) => t.slug === slug);
  if (!tech) return { title: "Not Found" };
  return {
    title: `${tech.name} – Therapy Technique`,
    description: tech.description.slice(0, 155),
    keywords: [tech.name, tech.category, "therapy technique", "mental health", "DBT", "CBT", "mindfulness"],
    openGraph: {
      title: `${tech.name} | MindWell`,
      description: tech.description.slice(0, 155),
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

export default async function TherapyTechniquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = techniques.find((t) => t.slug === slug);
  if (!tech) notFound();

  const steps = parseJsonField(tech.steps);
  const examples = parseJsonField(tech.examples);
  const benefits = parseJsonField(tech.benefits);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" id="main-content">
      <Link
        href="/#therapy-meditation"
        className="inline-flex items-center gap-2 text-sm text-teal-700 dark:text-teal-400 hover:underline mb-6"
        aria-label="Back to Therapy & Meditation"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Therapy &amp; Meditation
      </Link>

      <article aria-labelledby="therapy-title">
        <span className="inline-block text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full mb-3">
          {tech.category}
        </span>
        <h1 id="therapy-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {tech.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{tech.description}</p>

        {tech.when && (
          <p className="text-sm text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-lg mb-6">
            <span className="font-semibold">When to use:</span> {tech.when}
          </p>
        )}

        <div className="space-y-6">
          {steps.length > 0 && (
            <section aria-labelledby="steps-heading">
              <h2 id="steps-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Steps</h2>
              <ol className="space-y-2" role="list">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="shrink-0 w-6 h-6 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full flex items-center justify-center text-xs font-bold" aria-hidden="true">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {examples.length > 0 && (
            <section aria-labelledby="examples-heading">
              <h2 id="examples-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Examples</h2>
              <ul className="space-y-1.5" role="list">
                {examples.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-purple-500 mt-0.5 shrink-0" aria-hidden="true">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {benefits.length > 0 && (
            <section aria-labelledby="benefits-heading">
              <h2 id="benefits-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Benefits</h2>
              <ul className="space-y-1.5" role="list">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-green-500 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <p className="mt-8 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4">
          This technique is for self-help purposes. For clinical conditions, always work with a qualified therapist.
        </p>
      </article>
    </div>
  );
}
