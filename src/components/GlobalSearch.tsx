'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import disorders from '@/data/disorders.json'
import assessments from '@/data/assessments.json'
import { Search } from 'lucide-react'

type SearchItem = {
  id: string
  label: string
  href: string
  group: 'Disorders' | 'Assessments' | 'Resources'
}

const staticResources: SearchItem[] = [
  { id: 'faq', label: 'Frequently Asked Questions', href: '/faq', group: 'Resources' },
  { id: 'crisis', label: 'Crisis Resources', href: '/crisis-resources', group: 'Resources' },
  { id: 'privacy', label: 'Privacy Policy', href: '/privacy', group: 'Resources' },
  { id: 'terms', label: 'Terms of Service', href: '/terms', group: 'Resources' },
]

function normalize(text: string) {
  return text.toLowerCase().trim()
}

function fuzzyIncludes(text: string, query: string) {
  const source = normalize(text)
  const q = normalize(query)
  if (!q) return true
  if (source.includes(q)) return true
  let pointer = 0
  for (const char of source) {
    if (char === q[pointer]) pointer += 1
    if (pointer === q.length) return true
  }
  return false
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const items = useMemo<SearchItem[]>(() => {
    const disorderItems = disorders.slice(0, 200).map((item) => ({
      id: `d-${item.slug}`,
      label: item.name,
      href: '/#learn-awareness',
      group: 'Disorders' as const,
    }))

    const assessmentItems = assessments.map((item) => ({
      id: `a-${item.slug}`,
      label: item.name,
      href: '/#self-reflection-tools',
      group: 'Assessments' as const,
    }))

    return [...disorderItems, ...assessmentItems, ...staticResources]
  }, [])

  const filtered = useMemo(() => {
    if (!query) return items.slice(0, 10)
    return items.filter((item) => fuzzyIncludes(item.label, query)).slice(0, 12)
  }, [items, query])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        aria-label="Open global search"
      >
        <Search className="h-3.5 w-3.5" /> Search
        <span className="hidden md:inline text-[10px] text-slate-500">Ctrl/Cmd + K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/50 p-4 flex items-start sm:items-center justify-center">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <div className="flex gap-2">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search disorders, assessments, resources..."
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm"
              />
              <button className="text-sm px-3" onClick={() => setOpen(false)} aria-label="Close search">Close</button>
            </div>
            <div className="mt-3 max-h-[50vh] overflow-auto divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-500">No results found.</p>
              ) : (
                filtered.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2.5 px-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
                  >
                    <span className="text-sm text-slate-900 dark:text-slate-100">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.group}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
