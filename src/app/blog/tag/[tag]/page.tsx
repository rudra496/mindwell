import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogList } from "@/components/blog/BlogList"
import { getAllBlogPosts, getPostsByTag, slugify } from "@/lib/blog"

type TagPageProps = {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags.map((tag) => slugify(tag)))))
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const titleTag = tag.replace(/-/g, " ")

  return {
    title: `Tag: ${titleTag}`,
    description: `MindWell blog posts tagged with ${titleTag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = await getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Tag: {tag.replace(/-/g, " ")}</h1>
      <BlogList posts={posts} />
    </div>
  )
}
