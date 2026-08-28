import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogList } from "@/components/blog/BlogList"
import { getAllBlogPosts, getPostsByTag, slugify } from "@/lib/blog"

type TagPageProps = {
  params: Promise<{ tag: string }>
}

// Route params arrive percent-encoded for non-ASCII tags (e.g. Bengali),
// so decode before matching against post tags. Already-decoded values are
// unaffected; malformed sequences fall back to the raw value.
function decodeTag(tag: string): string {
  try {
    return decodeURIComponent(tag)
  } catch {
    return tag
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags.map((tag) => slugify(tag))))).filter(Boolean)
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: rawTag } = await params
  const tag = decodeTag(rawTag)
  const titleTag = tag.replace(/-/g, " ")

  return {
    title: `Tag: ${titleTag}`,
    description: `MindWell blog posts tagged with ${titleTag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: rawTag } = await params
  const tag = decodeTag(rawTag)
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
