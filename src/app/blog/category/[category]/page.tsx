import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogList } from "@/components/blog/BlogList"
import { getAllBlogPosts, getPostsByCategory, slugify } from "@/lib/blog"

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  const categories = Array.from(new Set(posts.map((post) => slugify(post.category)))).filter(Boolean)
  return categories.map((category) => ({ category }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const titleCategory = category.replace(/-/g, " ")

  return {
    title: `Category: ${titleCategory}`,
    description: `MindWell blog posts in ${titleCategory}.`,
    alternates: { canonical: `/blog/category/${category}` },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const posts = await getPostsByCategory(category)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Category: {category.replace(/-/g, " ")}</h1>
      <BlogList posts={posts} />
    </div>
  )
}
