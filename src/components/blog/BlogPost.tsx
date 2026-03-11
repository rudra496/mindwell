import Link from "next/link"
import Image from "next/image"
import type { BlogPostWithComputedFields } from "@/types/blog"
import { slugify } from "@/lib/blog"

export function BlogPost({ post }: { post: BlogPostWithComputedFields }) {
  return (
    <article className="mx-auto max-w-4xl py-10">
      <div className="relative mb-8 aspect-[16/8] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="100vw" />
      </div>
      <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-700">
        <Link href={`/blog/category/${slugify(post.category)}`} className="mb-3 inline-flex text-sm font-medium uppercase tracking-wide text-teal-700 hover:underline dark:text-teal-400">
          {post.category}
        </Link>
        <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
        <p className="text-slate-500 dark:text-slate-400">By {post.author} · {new Date(post.date).toLocaleDateString()} · {post.readingTimeMinutes} min read</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      <div
        className="markdown-content space-y-5 text-lg leading-8 text-slate-700 dark:text-slate-200"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  )
}
