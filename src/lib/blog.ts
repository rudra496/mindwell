import { promises as fs } from "fs"
import path from "path"
import { convertMarkdownToHTML } from "@/lib/markdown-to-html"
import type {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostWithComputedFields
} from "@/types/blog"

const BLOG_POSTS_PATH = path.join(process.cwd(), "content", "blog", "posts")

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 220))
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function parseListValue(value: string): string[] {
  const cleaned = value.trim().replace(/^\[/, "").replace(/\]$/, "")
  if (!cleaned) return []

  return cleaned
    .split(",")
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean)
}

function parseFrontmatter(frontmatterRaw: string): BlogPostFrontmatter {
  const lines = frontmatterRaw.split("\n")
  const data: Record<string, string> = {}

  for (const line of lines) {
    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (key) {
      data[key] = value
    }
  }

  const slug = data.slug
    ? normalizeSlug(data.slug)
    : normalizeSlug(data.title || "")

  return {
    title: data.title || "Untitled",
    slug,
    date: data.date || new Date().toISOString().slice(0, 10),
    author: data.author || "MindWell Team",
    coverImage:
      data.coverImage || "/images/stock/mental_health_awareness.jpg",
    excerpt: data.excerpt || "",
    tags: parseListValue(data.tags || ""),
    category: data.category || "general"
  }
}

function parseMarkdownFile(fileContents: string): BlogPost | null {
  const frontmatterMatch = fileContents.match(
    /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  )

  if (!frontmatterMatch) {
    console.warn("Skipping invalid markdown post (missing frontmatter)")
    return null
  }

  const [, frontmatterRaw, contentRaw] = frontmatterMatch
  const frontmatter = parseFrontmatter(frontmatterRaw)

  return {
    ...frontmatter,
    content: contentRaw.trim()
  }
}

function withComputedFields(
  post: BlogPost
): BlogPostWithComputedFields {
  return {
    ...post,
    contentHtml: convertMarkdownToHTML(post.content),
    readingTimeMinutes: calculateReadingTime(post.content)
  }
}

export async function getAllBlogPosts(): Promise<
  BlogPostWithComputedFields[]
> {
  const files = await fs.readdir(BLOG_POSTS_PATH)

  const markdownFiles = files.filter((file) => file.endsWith(".md"))

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(BLOG_POSTS_PATH, fileName)
      const fileContents = await fs.readFile(fullPath, "utf8")

      const parsed = parseMarkdownFile(fileContents)

      if (!parsed) return null

      return withComputedFields(parsed)
    })
  )

  return posts
    .filter(
      (post): post is BlogPostWithComputedFields => post !== null
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostWithComputedFields | null> {
  const posts = await getAllBlogPosts()
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getPostsByTag(
  tag: string
): Promise<BlogPostWithComputedFields[]> {
  const posts = await getAllBlogPosts()
  const normalizedTag = normalizeSlug(tag)

  return posts.filter((post) =>
    post.tags.some(
      (item) => normalizeSlug(item) === normalizedTag
    )
  )
}

export async function getPostsByCategory(
  category: string
): Promise<BlogPostWithComputedFields[]> {
  const posts = await getAllBlogPosts()
  const normalizedCategory = normalizeSlug(category)

  return posts.filter(
    (post) =>
      normalizeSlug(post.category) === normalizedCategory
  )
}

export function getRelatedPosts(
  currentPost: BlogPostWithComputedFields,
  allPosts: BlogPostWithComputedFields[],
  limit = 4
): BlogPostWithComputedFields[] {
  const currentTags = new Set(
    currentPost.tags.map(normalizeSlug)
  )

  const currentCategory = normalizeSlug(currentPost.category)

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const tagMatches = post.tags
        .map(normalizeSlug)
        .filter((tag) => currentTags.has(tag)).length

      const categoryMatch =
        normalizeSlug(post.category) === currentCategory
          ? 1
          : 0

      return {
        post,
        score: tagMatches * 2 + categoryMatch
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}

export function slugify(value: string): string {
  return normalizeSlug(value)
}