import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { BlogPost } from "@/components/blog/BlogPost"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog"
import { siteUrl } from "@/lib/site"

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

  const allPosts = await getAllBlogPosts()

  // Build hreflang alternates if a translation exists
  const alternates: Record<string, string> = {
    [post.locale ?? "en"]: siteUrl(`/blog/${post.slug}`),
  }
  if (post.translatedSlug && post.translatedLocale) {
    const translatedPost = allPosts.find((p) => p.slug === post.translatedSlug)
    if (translatedPost) {
      alternates[post.translatedLocale] = siteUrl(`/blog/${post.translatedSlug}`)
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: Object.keys(alternates).length > 1 ? alternates : undefined,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      authors: [post.author],
      url: `/blog/${post.slug}`,
      images: [{ url: post.coverImage, alt: post.imageAlt ?? post.title }],
      locale: post.locale === "bn" ? "bn_BD" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
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
    dateModified: post.lastModified ?? post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: post.coverImage,
    description: post.excerpt,
    inLanguage: post.locale ?? "en",
    mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
    publisher: {
      "@type": "Organization",
      name: "MindWell",
      url: siteUrl("/"),
    },
  }

  return (
    <div className="container mx-auto px-4">
      <Script id={`blog-post-${post.slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPost post={post} />
      <RelatedPosts posts={relatedPosts} />
    </div>
  )
}
