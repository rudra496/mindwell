"use client";

import { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import { Search, X, BookOpen, ClipboardList, Brain, Heart } from "lucide-react";

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: "disorder" | "assessment" | "therapy" | "meditation";
  href?: string;
  action?: () => void;
};

type GlobalSearchProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const searchData: SearchItem[] = [
  // Disorders
  { id: "anxiety", title: "Anxiety Disorders", description: "Learn about anxiety, panic, phobias", category: "disorder" },
  { id: "depression", title: "Depression", description: "Understanding major depressive disorder", category: "disorder" },
  { id: "ptsd", title: "PTSD", description: "Post-traumatic stress disorder information", category: "disorder" },
  { id: "ocd", title: "OCD", description: "Obsessive-compulsive disorder overview", category: "disorder" },
  { id: "bipolar", title: "Bipolar Disorder", description: "Bipolar I, II, and cyclothymia", category: "disorder" },
  { id: "schizophrenia", title: "Schizophrenia", description: "Psychotic disorders explained", category: "disorder" },
  // Assessments
  { id: "phq9", title: "PHQ-9 Depression Screen", description: "Depression severity self-assessment", category: "assessment" },
  { id: "gad7", title: "GAD-7 Anxiety Screen", description: "Anxiety severity self-assessment", category: "assessment" },
  { id: "dass21", title: "DASS-21", description: "Depression, anxiety, stress scale", category: "assessment" },
  // Therapy
  { id: "cbt", title: "Cognitive Behavioral Therapy", description: "Evidence-based CBT techniques", category: "therapy" },
  { id: "dbt", title: "Dialectical Behavior Therapy", description: "DBT skills for emotion regulation", category: "therapy" },
  { id: "mindfulness", title: "Mindfulness", description: "Mindfulness-based techniques", category: "therapy" },
  // Meditation
  { id: "breathing", title: "Breathing Exercises", description: "Guided relaxation breathing", category: "meditation" },
  { id: "grounding", title: "Grounding Techniques", description: "5-4-3-2-1 and other grounding methods", category: "meditation" },
];

const fuse = new Fuse(searchData, {
  keys: ["title", "description", "category"],
  threshold: 0.4,
});

const categoryIcons: Record<SearchItem["category"], React.ReactNode> = {
  disorder: <BookOpen className="h-4 w-4 text-blue-500" />,
  assessment: <ClipboardList className="h-4 w-4 text-green-500" />,
  therapy: <Brain className="h-4 w-4 text-purple-500" />,
  meditation: <Heart className="h-4 w-4 text-pink-500" />,
};

const categoryLabels: Record<SearchItem["category"], string> = {
  disorder: "Disorder",
  assessment: "Assessment",
  therapy: "Therapy",
  meditation: "Meditation",
};

const STORAGE_KEY = "mindwell_recent_searches";

export function GlobalSearch({ open: controlledOpen, onOpenChange }: GlobalSearchProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    else setInternalOpen(val);
  };
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(!open);
    }
    if (e.key === "Escape") setOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const results = query.length > 0 ? fuse.search(query).map((r) => r.item) : searchData.slice(0, 6);

  const saveSearch = (title: string) => {
    const updated = [title, ...recentSearches.filter((s) => s !== title)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSelect = (item: SearchItem) => {
    saveSearch(item.title);
    setOpen(false);
    setQuery("");
    if (item.action) {
      item.action();
    } else if (item.href) {
      window.location.href = item.href;
    } else {
      window.location.href = `/#learn-awareness`;
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Command className="flex flex-col" shouldFilter={false}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <Search className="h-5 w-5 text-slate-400 shrink-0" aria-hidden="true" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search disorders, assessments, therapy techniques…"
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm"
              aria-label="Search"
              autoFocus
            />
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Close search"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <Command.Empty className="py-6 text-center text-sm text-slate-500">
                No results found for &ldquo;{query}&rdquo;
              </Command.Empty>
            )}

            {results.length > 0 && (
              <Command.Group
                heading={
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2">
                    {query ? "Results" : "Explore"}
                  </span>
                }
              >
                {results.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 data-[selected=true]:bg-teal-50 dark:data-[selected=true]:bg-teal-900/20"
                  >
                    <span className="shrink-0">{categoryIcons[item.category]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 truncate">{item.description}</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full shrink-0">
                      {categoryLabels[item.category]}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {recentSearches.length > 0 && !query && (
              <Command.Group
                heading={
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2 mt-2 block">
                    Recent Searches
                  </span>
                }
              >
                {recentSearches.map((s) => (
                  <Command.Item
                    key={s}
                    value={s}
                    onSelect={() => {
                      setQuery(s);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {s}
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center gap-4 text-xs text-slate-400">
            <span><kbd className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">↵</kbd> select</span>
            <span><kbd className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">Esc</kbd> close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
