import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { BlogPost } from "@/components/blog/BlogPost"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `/blog/${post.slug}`,
      images: [{ url: post.coverImage, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllBlogPosts()
  const relatedPosts = getRelatedPosts(post, allPosts, 4)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: post.coverImage,
    description: post.excerpt,
    mainEntityOfPage: `https://mindwell-navy.vercel.app/blog/${post.slug}`,
  }

  return (
    <div className="container mx-auto px-4">
      <Script id={`blog-post-${post.slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPost post={post} />
      <RelatedPosts posts={relatedPosts} />
    </div>
  )
}
