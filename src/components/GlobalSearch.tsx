"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import { Search, X, BookOpen, ClipboardList, Brain, Heart, Phone, HelpCircle } from "lucide-react";
import disordersData from "@/data/disorders.json";
import assessmentsData from "@/data/assessments.json";
import therapyData from "@/data/therapy-techniques.json";
import meditationsData from "@/data/meditations.json";

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: "disorder" | "assessment" | "therapy" | "meditation" | "crisis" | "faq";
  href: string;
};

type GlobalSearchProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DisorderEntry = { id: string; slug: string; name: string; description: string; category: string };
type AssessmentEntry = { id: string; slug: string; name: string; description: string };
type TherapyEntry = { id: string; slug: string; name: string; description: string };
type MeditationEntry = { id: string; slug: string; title: string; description: string };

const buildSearchData = (): SearchItem[] => {
  const items: SearchItem[] = [];

  (disordersData as DisorderEntry[]).forEach((d) => {
    items.push({
      id: `disorder-${d.slug}`,
      title: d.name,
      description: d.description.slice(0, 80),
      category: "disorder",
      href: `/disorders/${d.slug}`,
    });
  });

  (assessmentsData as AssessmentEntry[]).forEach((a) => {
    items.push({
      id: `assessment-${a.slug}`,
      title: a.name,
      description: a.description.slice(0, 80),
      category: "assessment",
      href: `/assessments/${a.slug}`,
    });
  });

  (therapyData as TherapyEntry[]).forEach((t) => {
    items.push({
      id: `therapy-${t.slug}`,
      title: t.name,
      description: t.description.slice(0, 80),
      category: "therapy",
      href: `/therapy-techniques/${t.slug}`,
    });
  });

  (meditationsData as MeditationEntry[]).forEach((m) => {
    items.push({
      id: `meditation-${m.slug}`,
      title: m.title,
      description: m.description.slice(0, 80),
      category: "meditation",
      href: `/meditations/${m.slug}`,
    });
  });

  items.push(
    { id: "crisis-bd", title: "Bangladesh Crisis Helpline", description: "Kaan Pete Roi: 01779-554391", category: "crisis", href: "/crisis-resources" },
    { id: "crisis-global", title: "Global Crisis Resources", description: "Crisis hotlines for 50+ countries", category: "crisis", href: "/verified-crisis-response" },
    { id: "faq-main", title: "Frequently Asked Questions", description: "Common questions about MindWell", category: "faq", href: "/faq" },
  );

  return items;
};

const searchData = buildSearchData();

const categoryIcons: Record<SearchItem["category"], React.ReactNode> = {
  disorder: <BookOpen className="h-4 w-4 text-blue-500" />,
  assessment: <ClipboardList className="h-4 w-4 text-green-500" />,
  therapy: <Brain className="h-4 w-4 text-purple-500" />,
  meditation: <Heart className="h-4 w-4 text-pink-500" />,
  crisis: <Phone className="h-4 w-4 text-red-500" />,
  faq: <HelpCircle className="h-4 w-4 text-teal-500" />,
};

const categoryLabels: Record<SearchItem["category"], string> = {
  disorder: "Disorder",
  assessment: "Assessment",
  therapy: "Therapy",
  meditation: "Meditation",
  crisis: "Crisis",
  faq: "FAQ",
};

const STORAGE_KEY = "mindwell_recent_searches";

export function GlobalSearch({ open: controlledOpen, onOpenChange }: GlobalSearchProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback((val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    else setInternalOpen(val);
  }, [onOpenChange]);

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
  }, [open, setOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ["title", "description", "category"],
    threshold: 0.35,
    ignoreLocation: true,
  }), []);

  const results = useMemo(
    () => query.length > 0 ? fuse.search(query).map((r) => r.item) : searchData.slice(0, 8),
    [query, fuse]
  );

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
    window.location.href = item.href;
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
              placeholder="Search disorders, assessments, therapy, meditation, crisis…"
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
