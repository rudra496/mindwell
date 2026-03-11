"use client"

import { useMemo, useState } from "react"
import { BlogList } from "@/components/blog/BlogList"
import type { BlogPostWithComputedFields } from "@/types/blog"

export function BlogSearch({ posts }: { posts: BlogPostWithComputedFields[] }) {
  const [query, setQuery] = useState("")

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return posts

    return posts.filter((post) => {
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
  }, [posts, query])

  return (
    <section>
      <div className="mb-6">
        <label htmlFor="blog-search" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Search blog posts</label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, tags, excerpt, or content"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-teal-500 placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {filteredPosts.length > 0 ? (
        <BlogList posts={filteredPosts} />
      ) : (
        <p className="rounded-xl border border-slate-200 bg-white p-5 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          No posts found for "{query}".
        </p>
      )}
    </section>
  )
}
