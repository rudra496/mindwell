export type BlogPostFrontmatter = {
  title: string
  slug: string
  date: string
  author: string
  coverImage: string
  excerpt: string
  tags: string[]
  category: string
  /** BCP-47 language tag, e.g. "en" or "bn". Defaults to "en". */
  locale?: string
  /** Slug of the translated counterpart post (optional). */
  translatedSlug?: string
  /** Locale of the translated counterpart, e.g. "bn" or "en". */
  translatedLocale?: string
  /** ISO date string for when the post was last meaningfully updated. */
  lastModified?: string
  /** Alt text for the cover image (for accessibility and OG). */
  imageAlt?: string
}

export type BlogPost = BlogPostFrontmatter & {
  content: string
}

export type BlogPostWithComputedFields = BlogPost & {
  contentHtml: string
  readingTimeMinutes: number
}
