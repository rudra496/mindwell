import type { BlogPostWithComputedFields } from "@/types/blog"
import { BlogCard } from "@/components/blog/BlogCard"

export function BlogList({ posts }: { posts: BlogPostWithComputedFields[] }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </section>
  )
}
