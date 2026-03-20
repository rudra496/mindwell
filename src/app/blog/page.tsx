import type { Metadata } from "next"
import Link from "next/link"
import { BlogSearch } from "@/components/blog/BlogSearch"
import { getAllBlogPosts, slugify } from "@/lib/blog"

const description =
  "Mental health education, awareness articles, reflections, and evidence-based insights published by the MindWell team."

export const metadata: Metadata = {
  title: "MindWell Blog | Mental Health Guides, Updates & Stories by Rudra Sarker",
  description,
  keywords: [
    "MindWell blog",
    "Rudra Sarker",
    "mental health Bangladesh",
    "mental health awareness",
    "open source mental health",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "MindWell Blog",
    description,
    url: "/blog",
    type: "website",
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 10)
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    if (!acc[post.category]) acc[post.category] = []
    acc[post.category].push(post)
    return acc
  }, {})

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">MindWell Blog</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{description}</p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            #{tag}
          </Link>
        ))}
      </div>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/70">
        <h2 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white">Connect With Me</h2>
        <div className="flex flex-wrap gap-4 text-teal-700 dark:text-teal-400">
          <a href="https://github.com/rudra496" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/rudrasarker" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          <a href="https://x.com/Rudra496" target="_blank" rel="noopener noreferrer" className="hover:underline">X / Twitter</a>
          <a href="https://www.facebook.com/rudrasarker130" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70">
              <h3 className="font-semibold text-slate-900 dark:text-white">{category}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{items.length} post(s)</p>
              <Link href={`/blog/category/${slugify(category)}`} className="mt-2 inline-flex text-sm font-medium text-teal-700 hover:underline dark:text-teal-400">
                View category →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <BlogSearch posts={posts} />
    </div>
  )
}
