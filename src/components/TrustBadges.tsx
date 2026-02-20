import { ShieldCheck, Lock, Heart } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "Evidence-Based",
    description: "All content reviewed against peer-reviewed research and clinical guidelines.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
  },
  {
    icon: Lock,
    title: "Privacy-First",
    description: "No personal data sold or shared. Minimal data collection, open-source codebase.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  {
    icon: Heart,
    title: "Free Forever",
    description: "Core features always free. Mental health support should be accessible to everyone.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
  },
];

export function TrustBadges() {
  return (
    <section aria-label="Trust signals" className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className={`flex flex-col items-center text-center p-5 rounded-xl border ${badge.bg} ${badge.border}`}
          >
            <badge.icon className={`h-8 w-8 mb-3 ${badge.color}`} aria-hidden="true" />
            <h3 className={`font-semibold text-sm mb-1 ${badge.color}`}>{badge.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
