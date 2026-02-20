import { UserCheck } from "lucide-react";

type Advisor = {
  id: string;
  name: string;
  title: string;
  education: string;
  certifications: string[];
};

const advisors: Advisor[] = [
  {
    id: "advisor-001",
    name: "Md. Rifat Hasan Tarofder",
    title: "Assistant Clinical Psychologist",
    education: "MS in Clinical Psychology, University of Dhaka",
    certifications: ["CBT", "DBT"],
  },
  {
    id: "advisor-002",
    name: "Kamrul Hasan",
    title: "Assistant Clinical Psychologist",
    education: "Counseling and Clinical Practice",
    certifications: ["Counseling Psychology", "Psychometrics"],
  },
];

export function AdvisoryBoard() {
  return (
    <section aria-label="Medical advisory board" className="py-6">
      <div className="flex items-center gap-2 mb-4">
        <UserCheck className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Reviewed by Psychologists</h2>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
        MindWell content and tools are reviewed by trained clinical psychologists to ensure accuracy and ethical standards.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {advisors.map((advisor) => (
          <div
            key={advisor.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex gap-3"
          >
            <div className="shrink-0 bg-teal-100 dark:bg-teal-900/40 rounded-full h-12 w-12 flex items-center justify-center">
              <span className="text-teal-700 dark:text-teal-400 font-bold text-lg" aria-hidden="true">
                {advisor.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">{advisor.name}</p>
              <p className="text-xs text-teal-600 dark:text-teal-400 mb-1">{advisor.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{advisor.education}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {advisor.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
