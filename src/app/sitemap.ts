import type { MetadataRoute } from "next"
import { getAllBlogPosts, slugify } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

const RELEASE_DATE = new Date("2026-03-20T00:00:00Z")

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" },
  { path: "/disorders", priority: 0.9, changeFrequency: "weekly" },
  { path: "/psychologists", priority: 0.8, changeFrequency: "weekly" },
  { path: "/crisis-resources", priority: 0.9, changeFrequency: "weekly" },
  { path: "/assessments", priority: 0.8, changeFrequency: "weekly" },
  { path: "/meditations", priority: 0.7, changeFrequency: "weekly" },
  { path: "/therapy-techniques", priority: 0.7, changeFrequency: "weekly" },
  { path: "/bangladesh-services", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/request-session", priority: 0.7, changeFrequency: "monthly" },
  { path: "/verified-crisis-response", priority: 0.8, changeFrequency: "monthly" },
  { path: "/disclaimer", priority: 0.5, changeFrequency: "yearly" },
  { path: "/medical-disclaimer", priority: 0.5, changeFrequency: "yearly" },
  { path: "/ethics", priority: 0.5, changeFrequency: "yearly" },
  { path: "/transparency", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.5, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.4, changeFrequency: "yearly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: RELEASE_DATE,
    changeFrequency,
    priority,
  }))

  const blogPosts = await getAllBlogPosts()

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const tagRoutes: MetadataRoute.Sitemap = Array.from(new Set(blogPosts.flatMap((post) => post.tags.map((tag) => slugify(tag))))).map((tag) => ({
    url: `${SITE_URL}/blog/tag/${tag}`,
    lastModified: RELEASE_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = Array.from(new Set(blogPosts.map((post) => slugify(post.category)))).map((category) => ({
    url: `${SITE_URL}/blog/category/${category}`,
    lastModified: RELEASE_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...tagRoutes, ...categoryRoutes]
}
