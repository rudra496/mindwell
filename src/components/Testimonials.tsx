import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "MindWell helped me understand what I was experiencing. The educational resources on anxiety were clear and non-judgmental.",
    attribution: "Anonymous user, Bangladesh",
  },
  {
    id: 2,
    text: "I used the self-reflection assessments to better understand my mood patterns. Having free, accessible tools makes a real difference.",
    attribution: "Anonymous user, South Asia",
  },
  {
    id: 3,
    text: "The crisis resources section was the first place I found reliable helpline information in one place. Thank you for building this.",
    attribution: "Anonymous user, global",
  },
];

export function Testimonials() {
  return (
    <section aria-label="User testimonials" className="py-6">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-5 text-center">
        What People Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col gap-3"
          >
            <Quote className="h-5 w-5 text-teal-400 shrink-0" aria-hidden="true" />
            <blockquote className="flex-1">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            </blockquote>
            <figcaption className="text-xs text-slate-400">— {t.attribution}</figcaption>
          </figure>
        ))}
      </div>
      <p className="text-xs text-slate-400 text-center mt-4">
        Testimonials are anonymous and shared with permission. Have feedback?{" "}
        <a href="/faq" className="text-teal-600 hover:underline">Visit our FAQ</a> or{" "}
        <a href="mailto:contactmindwellorg@gmail.com" className="text-teal-600 hover:underline">contact us</a>.
      </p>
    </section>
  );
}
