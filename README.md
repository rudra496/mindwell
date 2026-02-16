# MindWell – Open Source Mental Health Platform

## Project Overview

MindWell is an open-source mental health platform built to make trusted, practical, and accessible wellbeing support available to a global audience. The project combines mental health education, self-reflection tools, wellbeing activities, and pathways to connect with psychologists.

MindWell is designed with an ethical and non-diagnostic approach. It supports awareness, reflection, and informed help-seeking, while clearly avoiding clinical diagnosis claims.

## Key Features

- **Emergency Support**: Prominent crisis-oriented guidance and pathways to urgent support resources.
- **Learn & Awareness**: Educational content and awareness-focused mental health resources.
- **Self-Reflection Tools**: Structured self-assessment experiences for personal reflection (not diagnosis).
- **Track Mood (Mood Tracker)**: A dedicated mood logging experience to help users observe emotional patterns over time.
- **Therapy & Meditation**: Practical therapeutic techniques and meditation resources.
- **Psychologists**: Access to verified psychologist profiles and contact pathways.
- **Wellbeing Games**: Short, guided interactive tools for focus, regulation, and stress relief.
- **Community**: Peer-oriented community access with safety-centered engagement expectations.
- **Publications & Media**: MindWell posts, educational media placeholders, and related updates.
- **Funding & Support**: Direct channels for partnership and funding communication.

## Tech Stack

- **Next.js (App Router)** for modern React-based application architecture.
- **TypeScript** for safer, scalable, and maintainable code.
- **Tailwind CSS** for consistent utility-first styling.
- **Next.js Image Optimization** via the `next/image` pipeline.
- **Accessibility-first design** patterns across content and interactions.
- **SEO-friendly architecture** through semantic structure and discoverable content organization.

## Local Development Setup

### Prerequisites

- **Node.js**: 18.18+ (recommended: latest active LTS)
- **npm**: 9+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run lint checks

```bash
npm run lint
```

### Folder structure overview

```text
src/
  app/                 # Next.js App Router pages, layouts, and route-level composition
  components/          # Shared UI blocks, homepage sections, modals, and feature components
  lib/                 # Utility logic and browser storage helpers (e.g., IndexedDB integrations)
public/
  images/              # Static media used by homepage sections and supporting content
```

## Performance & SEO

MindWell is built with web performance, accessibility, and search visibility in mind:

- Lighthouse-friendly patterns through efficient rendering and lean client interactions.
- Optimized responsive imagery via Next.js image tooling.
- Accessibility practices including readable hierarchy, clear content labeling, and keyboard-friendly interactions.
- Semantic HTML structure to improve both usability and indexing.
- Responsive, mobile-first layouts for consistent behavior across devices.
- PWA-ready foundation suitable for progressive enhancement workflows.

## Ethics & Medical Disclaimer

MindWell is for educational and self-reflection purposes only.

- It is **not** a diagnostic system.
- It is **not** a replacement for licensed medical or psychological care.
- Users in crisis should use emergency support pathways and contact local emergency or crisis services immediately.

## Contribution Guidelines

Contributions are welcome from developers, designers, mental health advocates, and accessibility reviewers.

### How contributors can help

- Improve educational clarity and usability.
- Expand wellbeing tools and content quality.
- Strengthen accessibility, performance, and localization readiness.
- Fix bugs and improve reliability.

### Code style expectations

- Use TypeScript-first patterns and keep components focused and readable.
- Follow existing project conventions and Tailwind utility style.
- Preserve ethical language and non-diagnostic framing.
- Avoid unrelated refactors in feature-specific pull requests.

### Pull request guidelines

- Keep PR scope focused and clearly described.
- Include rationale, testing steps, and any user-facing impact.
- Ensure lint/build checks pass before requesting review.
- Preserve existing UX patterns unless a change is explicitly requested.

## Credits & Inspiration

- **Creator**: Rudra Sarker
- Inspired by academic and clinical best practices in mental health education, safety, and compassionate support design.
