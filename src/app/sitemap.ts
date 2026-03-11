import type { MetadataRoute } from "next"
import { getAllBlogPosts, slugify } from "@/lib/blog"

const baseUrl = "https://mindwell-navy.vercel.app"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/blog", "/disorders"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))

  const blogPosts = await getAllBlogPosts()

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const tagRoutes: MetadataRoute.Sitemap = Array.from(new Set(blogPosts.flatMap((post) => post.tags.map((tag) => slugify(tag))))).map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = Array.from(new Set(blogPosts.map((post) => slugify(post.category)))).map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...tagRoutes, ...categoryRoutes]
}
