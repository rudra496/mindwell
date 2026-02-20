import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import assessmentsData from "@/data/assessments.json";

type Assessment = {
  id: string;
  slug: string;
  name: string;
  description: string;
  scoringGuide?: string;
  interpretations?: string;
};

const assessments = assessmentsData as Assessment[];

export async function generateStaticParams() {
  return assessments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const assessment = assessments.find((a) => a.slug === slug);
  if (!assessment) return { title: "Not Found" };
  return {
    title: `${assessment.name} – Self-Reflection Assessment`,
    description: assessment.description.slice(0, 155),
    keywords: [assessment.name, "self-assessment", "mental health screening", "psychology"],
    openGraph: {
      title: `${assessment.name} | MindWell`,
      description: assessment.description.slice(0, 155),
      type: "article",
    },
  };
}

type ScoringGuide = { maxScore?: number; method?: string };
type Interpretation = { range: string; severity: string; description: string; recommendation: string };

function parseJsonField<T>(value: string | undefined): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

function parseScoringGuide(value: string | undefined): ScoringGuide | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as ScoringGuide;
  } catch {
    return null;
  }
}

export default async function AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const assessment = assessments.find((a) => a.slug === slug);
  if (!assessment) notFound();

  const scoringGuide = parseScoringGuide(assessment.scoringGuide);
  const interpretations = parseJsonField<Interpretation>(assessment.interpretations);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" id="main-content">
      <Link
        href="/#self-reflection-tools"
        className="inline-flex items-center gap-2 text-sm text-teal-700 dark:text-teal-400 hover:underline mb-6"
        aria-label="Back to Self-Reflection Tools"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Self-Reflection Tools
      </Link>

      <article aria-labelledby="assessment-title">
        <span className="inline-block text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full mb-3">
          Assessment
        </span>
        <h1 id="assessment-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {assessment.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{assessment.description}</p>

        {scoringGuide && (
          <section aria-labelledby="scoring-heading" className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 mb-6">
            <h2 id="scoring-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Scoring Guide</h2>
            {scoringGuide.maxScore !== undefined && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <span className="font-medium">Max Score:</span> {scoringGuide.maxScore}
              </p>
            )}
            {scoringGuide.method && (
              <p className="text-sm text-gray-700 dark:text-gray-300">{scoringGuide.method}</p>
            )}
          </section>
        )}

        {interpretations.length > 0 && (
          <section aria-labelledby="interpretations-heading">
            <h2 id="interpretations-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Score Interpretations</h2>
            <div className="space-y-3">
              {interpretations.map((interp, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded">
                      Score: {interp.range}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{interp.severity}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{interp.description}</p>
                  <p className="text-sm text-teal-700 dark:text-teal-400 italic">{interp.recommendation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
          <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-1">Important Disclaimer</p>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            This assessment is for self-reflection and educational purposes only. It is <strong>not</strong> a clinical
            diagnosis tool. Please consult a qualified mental health professional for an accurate diagnosis and
            treatment plan.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/#self-reflection-tools"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Take Assessment on MindWell
          </Link>
          <Link
            href="/psychologists"
            className="inline-flex items-center gap-2 border border-teal-600 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Talk to a Psychologist
          </Link>
        </div>
      </article>
    </div>
  );
}
