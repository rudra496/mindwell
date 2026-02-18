"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Fuse from "fuse.js"

type SearchResult = {
  type: "condition" | "assessment" | "resource" | "page"
  title: string
  description: string
  url: string
  category: string
}

const searchData: SearchResult[] = [
  // Mental health conditions (sample - would need all 63)
  {
    type: "condition",
    title: "Depression",
    description: "Persistent sadness, loss of interest, and low energy affecting daily life",
    url: "/conditions/depression",
    category: "Mood Disorders"
  },
  {
    type: "condition",
    title: "Anxiety",
    description: "Excessive worry, nervousness, and fear affecting quality of life",
    url: "/conditions/anxiety",
    category: "Anxiety Disorders"
  },
  {
    type: "condition",
    title: "PTSD",
    description: "Post-traumatic stress disorder from experiencing traumatic events",
    url: "/conditions/ptsd",
    category: "Trauma Disorders"
  },
  // Assessments (sample - would need all 20)
  {
    type: "assessment",
    title: "PHQ-9 Depression Screening",
    description: "9-question assessment to evaluate depression severity",
    url: "/assessments/phq9",
    category: "Depression Assessment"
  },
  {
    type: "assessment",
    title: "GAD-7 Anxiety Screening",
    description: "7-question assessment to measure anxiety symptoms",
    url: "/assessments/gad7",
    category: "Anxiety Assessment"
  },
  // Resources
  {
    type: "resource",
    title: "Crisis Resources",
    description: "24/7 hotlines and emergency mental health support",
    url: "/crisis-resources",
    category: "Crisis Support"
  },
  {
    type: "resource",
    title: "Psychologists",
    description: "Find verified mental health professionals",
    url: "/psychologists",
    category: "Professional Support"
  },
  // Pages
  {
    type: "page",
    title: "FAQ",
    description: "Frequently asked questions about mental health",
    url: "/faq",
    category: "Information"
  },
  {
    type: "page",
    title: "About MindWell",
    description: "Learn about our mission and values",
    url: "/about",
    category: "Information"
  }
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ["title", "description", "category"],
    threshold: 0.3,
    includeScore: true,
  }), [])

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mindwell-recent-searches")
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored))
        } catch (e) {
          console.error("Error loading recent searches:", e)
        }
      }
    }
  }, [])

  // Handle Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Save search to recent searches
  const saveRecentSearch = useCallback((searchQuery: string) => {
    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5) // Keep only 5 recent searches
    setRecentSearches(updated)
    if (typeof window !== "undefined") {
      localStorage.setItem("mindwell-recent-searches", JSON.stringify(updated))
    }
  }, [recentSearches])

  // Handle arrow key navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        // Navigate directly
        const result = results[selectedIndex]
        saveRecentSearch(query)
        window.location.href = result.url
        setIsOpen(false)
      }
    },
    [results, selectedIndex, query, saveRecentSearch]
  )

  // Perform search
  useEffect(() => {
    if (query.trim()) {
      const searchResults = fuse.search(query)
      setResults(searchResults.map((result) => result.item))
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query, fuse])

  // Handle result selection
  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(query)
    window.location.href = result.url
    setIsOpen(false)
  }

  // Popular searches
  const popularSearches = [
    "depression",
    "anxiety",
    "stress management",
    "crisis help",
  ]

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conditions, assessments, resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder-gray-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {query && results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.title}`}
                    onClick={() => handleSelectResult(result)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      index === selectedIndex ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {result.description}
                      </p>
                      <span className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                        {result.category}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            ) : query && results.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <p>No results found for &quot;{query}&quot;</p>
                <p className="text-sm mt-2">
                  Try searching for conditions, assessments, or resources
                </p>
              </div>
            ) : (
              <div className="py-4">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Recent Searches
                    </div>
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setQuery(search)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular searches */}
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                    <TrendingUp className="h-3 w-3" />
                    Popular Searches
                  </div>
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 capitalize"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd>
                Close
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
