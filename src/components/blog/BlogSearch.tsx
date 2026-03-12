"use client"

import { useMemo, useState, useEffect } from "react"
import { BlogList } from "@/components/blog/BlogList"
import { getCurrentLanguage } from "@/lib/i18n"
import type { BlogPostWithComputedFields } from "@/types/blog"

export function BlogSearch({ posts }: { posts: BlogPostWithComputedFields[] }) {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState<string>("en")

  useEffect(() => {
    setLanguage(getCurrentLanguage())

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      setLanguage(customEvent.detail)
    }
    window.addEventListener("languageChange", handleLanguageChange)
    return () => window.removeEventListener("languageChange", handleLanguageChange)
  }, [])

  const filteredPosts = useMemo(() => {
    // Filter by language: show only posts whose locale matches the current language.
    // Posts without a locale field default to "en" (set in parseFrontmatter).
    const localePosts = posts.filter((post) => (post.locale ?? "en") === language)

    const search = query.trim().toLowerCase()
    if (!search) return localePosts

    return localePosts.filter((post) => {
      const target = [
        post.title,
        post.excerpt,
        post.content,
        post.category,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()

      return target.includes(search)
    })
  }, [posts, query, language])

  const placeholder = language === "bn"
    ? "শিরোনাম, ট্যাগ বা বিষয় দিয়ে খুঁজুন"
    : "Search by title, tags, excerpt, or content"

  const searchLabel = language === "bn" ? "ব্লগ পোস্ট খুঁজুন" : "Search blog posts"
  const noResultsText = language === "bn"
    ? `"${query}" এর জন্য কোনো পোস্ট পাওয়া যায়নি।`
    : `No posts found for "${query}".`

  return (
    <section>
      <div className="mb-6">
        <label htmlFor="blog-search" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{searchLabel}</label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-teal-500 placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {filteredPosts.length > 0 ? (
        <BlogList posts={filteredPosts} />
      ) : (
        <p className="rounded-xl border border-slate-200 bg-white p-5 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {noResultsText}
        </p>
      )}
    </section>
  )
}
