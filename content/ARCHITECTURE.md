# Content Hub Architecture

MindWell uses a content-driven architecture to scale from blog publishing to a full mental health content hub.

## Current

- `content/blog/posts/*.md` → blog posts with frontmatter metadata.
- `src/lib/blog.ts` → markdown parsing, indexing, sorting, related-post logic.
- `src/app/blog/*` → list, post, tag, and category routes.

## Planned scalable expansion

- `content/disorders/*.md` for 400+ structured disorder pages.
- `content/resources/*.md` for guides, coping tools, and practical resources.
- `content/research/*.md` for evidence summaries and publication-style entries.

Shared rendering helpers in `src/lib` and reusable presentational components in `src/components` keep the system maintainable as page count grows.
