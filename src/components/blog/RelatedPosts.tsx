import { BlogCard } from "@/components/blog/BlogCard"
import type { BlogPostWithComputedFields } from "@/types/blog"

export function RelatedPosts({ posts }: { posts: BlogPostWithComputedFields[] }) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mx-auto mt-8 max-w-6xl border-t border-slate-200 pt-8 dark:border-slate-700">
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
