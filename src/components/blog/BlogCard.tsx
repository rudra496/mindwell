import Image from "next/image"
import Link from "next/link"
import type { BlogPostWithComputedFields } from "@/types/blog"

export function BlogCard({ post }: { post: BlogPostWithComputedFields }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="relative aspect-[16/9]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(post.date).toLocaleDateString()} · {post.readingTimeMinutes} min read</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{post.title}</h2>
        <p className="text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="inline-flex font-medium text-teal-700 hover:underline dark:text-teal-400">
          Read more →
        </Link>
      </div>
    </article>
  )
}
