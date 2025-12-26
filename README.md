# 🌍 MindWell - World's Largest Open-Source Mental Health Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748)](https://www.prisma.io/)

> **Comprehensive, scientifically-backed, free mental health support platform**

![MindWell Homepage](https://github.com/user-attachments/assets/4fcbd87f-d712-4be0-abb1-d7f76e9c3116)

## 🎯 Mission

Create the most comprehensive, scientifically-backed mental health support platform. **100% Free. 100% Open Source.**

## ✨ Complete Features

### 📚 Mental Health Disorders Database (10+)
- **5 Anxiety Disorders**: Panic Disorder, Social Anxiety, Agoraphobia, Specific Phobias, Selective Mutism, GAD
- **Mood Disorders**: Major Depression, Bipolar I
- **Trauma & Stress**: PTSD
- **OCD-Related**: OCD
- Each disorder includes:
  - 15-20 symptoms
  - Biological, psychological, and social causes
  - Prevalence data (NIMH/WHO)
  - Age of onset and course of illness
  - Risk factors and protective factors
  - Comorbidities
  - 20+ natural solutions
  - 15+ nutritional recommendations
  - Evidence-based therapy approaches
  - When to seek help guidelines
  - Crisis resources
  - Research links (PubMed, NIMH)
  - DSM-5 criteria

### 📝 Validated Assessment Tools (5)
- **PHQ-9** - Patient Health Questionnaire (Depression)
- **GAD-7** - Generalized Anxiety Disorder Scale
- **PCL-5** - PTSD Checklist
- **MDQ** - Mood Disorder Questionnaire (Bipolar)
- **PSS-10** - Perceived Stress Scale
- Complete scoring algorithms
- Severity interpretations
- Crisis detection for severe scores
- Professional recommendations

### 🎮 Therapeutic Games & Activities (5)
1. **Breathing Circle** - 4-7-8 breathing technique for instant calm
2. **5-4-3-2-1 Grounding** - Sensory grounding for anxiety and panic
3. **Affirmations Spinner** - Random positive affirmations with save feature
4. **Mood Tracker** - Daily mood logging with statistics and patterns
5. **Gratitude Journal** - Daily gratitude practice with prompts

### 🤖 AI Support Chatbot
- 24/7 empathetic AI companion
- Crisis keyword detection
- Coping strategies and psychoeducation
- Suggested conversation prompts
- Immediate 988 crisis resource display

### 👥 Anonymous Community Forum
- Safe peer support space
- 12 categories (Depression, Anxiety, PTSD, Success Stories, etc.)
- Anonymous posting with auto-generated usernames
- Trigger warning system
- Comment and reply functionality
- Upvoting system
- Crisis resource auto-display for concerning content

### 🧘 Guided Meditation Library (6)
- **4-7-8 Breathing** - Dr. Andrew Weil technique
- **Body Scan** - Full-body awareness meditation
- **Box Breathing** - 4-4-4-4 technique
- **Loving-Kindness** - Metta meditation
- **Anxiety Relief** - Targeted anxiety reduction
- **Sleep Meditation** - Progressive relaxation for sleep
- Full guided scripts
- Duration tracking
- Benefits listed
- Category filtering

### 🧠 Therapy Techniques Library (7)
- **CBT**: Cognitive Restructuring, Behavioral Activation
- **DBT**: Wise Mind, TIPP Skills (coming)
- **Mindfulness**: 5-4-3-2-1 Grounding
- **Exposure**: Exposure Hierarchy (coming)
- **ACT**: Acceptance techniques (coming)
- Step-by-step instructions
- Examples and applications
- When to use guidance
- Printable format

### 📞 Crisis Resources (12)
- **US**: 988 Suicide & Crisis Lifeline, Crisis Text Line (741741)
- **International**: Multiple countries
- **Specialized**: Veterans, LGBTQ+, Youth
- 24/7 availability information
- Website links
- Category organization

### 🛡️ Safety Features
- Medical disclaimers throughout
- Crisis detection in chatbot
- Crisis resource display on concerning posts
- Trigger warning system in community
- Anonymous posting
- Client-side data storage (privacy-first)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database with all data
npm run prisma:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

## 📁 Project Structure

```
mindwell/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── assessments/
│   │   │   ├── chatbot/
│   │   │   ├── community/
│   │   │   ├── crisis-resources/
│   │   │   ├── disorders/
│   │   │   ├── meditations/
│   │   │   └── therapy-techniques/
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── games/            # Therapeutic game components
│   │   ├── ui/               # Reusable UI components
│   │   ├── AssessmentModal.tsx
│   │   ├── ChatbotModal.tsx
│   │   ├── CommunityModal.tsx
│   │   ├── CrisisModal.tsx
│   │   ├── DisordersModal.tsx
│   │   ├── GamesModal.tsx
│   │   ├── MeditationModal.tsx
│   │   └── TherapyTechniquesModal.tsx
│   └── lib/
│       └── utils.ts
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seed data
├── MEDICAL_DISCLAIMER.md
├── SOURCES.md
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1 (React 18)
- **Language**: TypeScript 5.7
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 🗄️ Database Schema

- **Disorder**: Mental health disorders database
- **Assessment**: Validated screening tools
- **Meditation**: Guided meditation scripts
- **TherapyTechnique**: Evidence-based techniques
- **CrisisResource**: Crisis hotlines and resources
- **CommunityPost**: Anonymous forum posts
- **CommunityReply**: Post comments/replies
- **MoodEntry**: Mood tracking entries
- **GratitudeEntry**: Gratitude journal entries
- **SafetyPlan**: Crisis safety plans

## 📖 API Documentation

### Disorders
- `GET /api/disorders` - List all disorders
- `GET /api/disorders/[slug]` - Get specific disorder

### Assessments
- `GET /api/assessments` - List all assessments

### Meditations
- `GET /api/meditations` - List all meditations

### Therapy Techniques
- `GET /api/therapy-techniques` - List all techniques

### Crisis Resources
- `GET /api/crisis-resources` - List all resources

### Chatbot
- `POST /api/chatbot` - Send message to AI chatbot

### Community
- `GET /api/community/posts` - List posts (with filters)
- `POST /api/community/posts` - Create new post
- `GET /api/community/posts/[id]` - Get specific post
- `GET /api/community/posts/[id]/comments` - Get post comments
- `POST /api/community/posts/[id]/comments` - Add comment

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rudra496/mindwell)

1. Push to GitHub
2. Import project to Vercel
3. Set environment variable: `DATABASE_URL` (for production database)
4. Deploy

### Deploy to Other Platforms

1. Build the application: `npm run build`
2. Set up SQLite database or use PostgreSQL/MySQL
3. Run migrations: `npx prisma db push`
4. Seed database: `npm run prisma:seed`
5. Start server: `npm start`

## 🤝 Contributing

Contributions are welcome! This is an open-source project focused on mental health awareness and support.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure medical accuracy (cite sources)
- Maintain privacy and safety features

## 📚 Data Sources

All medical information is sourced from:
- National Institute of Mental Health (NIMH)
- World Health Organization (WHO)
- American Psychiatric Association (APA)
- PubMed peer-reviewed research
- Cochrane Reviews
- DSM-5 Diagnostic Criteria

See [SOURCES.md](./SOURCES.md) for detailed citations.

## ⚠️ Medical Disclaimer

**FOR EDUCATIONAL PURPOSES ONLY.** This platform is NOT a substitute for professional medical advice, diagnosis, or treatment. ALWAYS consult licensed mental health professionals. Assessments are screening tools, NOT diagnostic instruments.

**In Crisis:**
- US: Call or text **988** (Suicide & Crisis Lifeline)
- Crisis Text Line: Text **HELLO** to **741741**
- Emergency: Call **911** or go to nearest emergency room

See [MEDICAL_DISCLAIMER.md](./MEDICAL_DISCLAIMER.md) for full disclaimer.

## 📄 License

MIT License - Open source and free to use.

See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Built with care for mental health awareness
- Inspired by the need for accessible mental health resources
- Thanks to all contributors and mental health professionals who review content

## 📧 Contact

For questions, suggestions, or concerns:
- Open an issue on GitHub
- Contributions and feedback welcome

---

**You are not alone. Help is available. Recovery is possible.** 💚

**Mental health is health. Taking care of your mind is not optional—it's essential.**
