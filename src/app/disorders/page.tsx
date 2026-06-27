import Link from "next/link";
import { Metadata } from "next";
import { getClustersWithCounts } from "@/lib/disorder-clusters";
import {
  Brain,
  CloudRain,
  ShieldAlert,
  Pill,
  Utensils,
  Users,
  Eye,
  Puzzle,
  Moon,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mental Health Conditions Library",
  description:
    "Browse hundreds of mental health conditions, organized into approachable categories. Educational, not diagnostic.",
};

const ICONS: Record<string, LucideIcon> = {
  anxiety: Brain,
  mood: CloudRain,
  trauma: ShieldAlert,
  substance: Pill,
  eating: Utensils,
  personality: Users,
  psychotic: Eye,
  neuro: Puzzle,
  "sleep-other": Moon,
};

export default function DisordersLanding() {
  const clusters = getClustersWithCounts();
  const total = clusters.reduce((s, c) => s + c.count, 0);

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl" id="main-content">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          Mental Health Conditions
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          {total} conditions, organized into {clusters.length} approachable categories. For education and
          self-reflection — not diagnosis.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((c) => {
          const Icon = ICONS[c.id] ?? Brain;
          return (
            <Link
              key={c.id}
              href={`/disorders/cluster/${c.id}`}
              className="group block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-teal-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">{c.shortName}</h2>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{c.description}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal-700 dark:text-teal-400">
                {c.count} conditions <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
