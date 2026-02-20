import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import meditationsData from "@/data/meditations.json";

type Meditation = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  duration?: number;
  script?: string;
  benefits?: string;
};

const meditations = meditationsData as Meditation[];

export async function generateStaticParams() {
  return meditations.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const med = meditations.find((m) => m.slug === slug);
  if (!med) return { title: "Not Found" };
  return {
    title: `${med.title} – Guided Meditation`,
    description: med.description.slice(0, 155),
    keywords: [med.title, med.category, "meditation", "mindfulness", "relaxation", "mental health"],
    openGraph: {
      title: `${med.title} | MindWell`,
      description: med.description.slice(0, 155),
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

export default async function MeditationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const med = meditations.find((m) => m.slug === slug);
  if (!med) notFound();

  const benefits = parseJsonField(med.benefits);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" id="main-content">
      <Link
        href="/#therapy-meditation"
        className="inline-flex items-center gap-2 text-sm text-teal-700 dark:text-teal-400 hover:underline mb-6"
        aria-label="Back to Meditation Library"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Meditation Library
      </Link>

      <article aria-labelledby="meditation-title">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-block text-xs font-semibold text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-3 py-1 rounded-full">
            {med.category}
          </span>
          {med.duration && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {med.duration} min
            </span>
          )}
        </div>
        <h1 id="meditation-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {med.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{med.description}</p>

        {benefits.length > 0 && (
          <section aria-labelledby="benefits-heading" className="mb-6">
            <h2 id="benefits-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Benefits</h2>
            <ul className="space-y-1.5" role="list">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <span className="text-pink-500 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </section>
        )}

        {med.script && (
          <section aria-labelledby="script-heading">
            <h2 id="script-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Guided Script</h2>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line border border-slate-200 dark:border-slate-700">
              {med.script}
            </div>
          </section>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            href="/#therapy-meditation"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Open Meditation Player
          </Link>
        </div>
      </article>
    </div>
  );
}
