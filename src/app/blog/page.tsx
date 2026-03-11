import type { Metadata } from "next"
import Link from "next/link"
import { BlogSearch } from "@/components/blog/BlogSearch"
import { getAllBlogPosts, slugify } from "@/lib/blog"

const description =
  "Mental health education, awareness articles, reflections, and evidence-based insights published by the MindWell team."

export const metadata: Metadata = {
  title: "MindWell Blog",
  description,
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

      <BlogSearch posts={posts} />
    </div>
  )
}
