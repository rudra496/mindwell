export type BlogPostFrontmatter = {
  title: string
  slug: string
  date: string
  author: string
  coverImage: string
  excerpt: string
  tags: string[]
  category: string
}

export type BlogPost = BlogPostFrontmatter & {
  content: string
}

export type BlogPostWithComputedFields = BlogPost & {
  contentHtml: string
  readingTimeMinutes: number
}
