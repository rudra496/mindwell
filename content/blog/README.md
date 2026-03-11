# MindWell Blog Publishing Guide

The MindWell blog is content-driven and reads Markdown files from `content/blog/posts`.

## Post format

Each post is a `.md` file with frontmatter:

```md
---
title: Post title
date: 2026-03-10
author: MindWell Team
coverImage: /images/blog/cover-image.jpg
excerpt: One to two sentence summary.
tags: [mental health, awareness]
category: mental health education
slug: post-title
---

Full markdown article body goes here.
```

## Publish a new post

1. Create a new file in `content/blog/posts`, for example:
   - `my-new-article.md`
2. Add frontmatter + markdown content.
3. Add any cover images in `public/images/blog`.
4. Commit and deploy.

The post appears automatically at:
- `/blog`
- `/blog/<slug>`
- related tag and category archive pages.

## Edit a post

1. Open and edit the existing markdown file.
2. Commit and deploy updates.

## Workflow summary

Write Markdown → commit to repository → deploy → post appears automatically.

## Future CMS integration

This structure is CMS-ready because content and rendering are decoupled. In future, frontmatter + markdown can come from a headless CMS and reuse the same render components and route structure:

CMS publish → pull content at build time → deploy.
