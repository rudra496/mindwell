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

### 📚 Mental Health Disorders Database (63+)
- **Comprehensive Coverage**: 63+ mental health conditions with detailed information
- **Categories Include**: Anxiety Disorders, Mood Disorders, Trauma & Stress, OCD-Related, Personality Disorders, Eating Disorders, Psychotic Disorders, and more
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

### 🎮 Therapeutic Games & Activities (9)
1. **Breathing Circle** - 4-7-8 breathing technique for instant calm
2. **5-4-3-2-1 Grounding** - Sensory grounding for anxiety and panic
3. **Thought Challenger** - CBT tool to challenge negative automatic thoughts
4. **Emotion Wheel** - Identify and name emotions with greater precision
5. **Mindfulness Timer** - Customizable meditation timer with visual progress
6. **Memory Match** - Card matching game for cognitive training
7. **Affirmations Spinner** - Random positive affirmations with save feature
8. **Mood Tracker** - Daily mood logging with statistics and patterns
9. **Gratitude Journal** - Daily gratitude practice with prompts

### 🤖 AI Support Chatbot
- **FREE Rule-Based Engine** - 500+ intelligent responses
- **No API Key Required** - Works 100% offline
- Advanced pattern matching for mental health support
- Crisis keyword detection and immediate resources
- Covers: depression, anxiety, stress, trauma, PTSD, OCD, bipolar, eating disorders, ADHD, relationships, grief, substance use
- Coping strategies and psychoeducation
- Therapy and medication information
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

**No database setup required!** The platform works entirely client-side with static data.

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

### For Development with Database (Optional)

If you want to modify the seed data and re-export:

```bash
# Generate Prisma client
npx prisma generate

# Create and seed database
echo 'DATABASE_URL="file:./dev.db"' > .env
npx prisma db push
npm run prisma:seed

# Export data to static JSON files
npm run export-data
```

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
- **Data Storage**: Static JSON + IndexedDB (client-side)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **PWA**: Service Worker + Manifest
- **Charts**: Recharts

## 📦 Data Architecture

**100% Client-Side & Privacy-First:**

- **Static Data** (disorders, assessments, meditations, etc.): Pre-loaded JSON files in `/src/data/`
- **User Data** (mood entries, assessments, community posts, chat history): Stored locally in IndexedDB
- **No External Database**: All data persists in the browser for maximum privacy
- **Offline Support**: Full PWA with service worker caching

### Data Files

- `src/data/disorders.json` - 10+ mental health disorders with comprehensive information
- `src/data/assessments.json` - 5 validated screening tools (PHQ-9, GAD-7, PCL-5, MDQ, PSS-10)
- `src/data/meditations.json` - 6+ guided meditation scripts
- `src/data/therapy-techniques.json` - 7+ evidence-based therapy techniques
- `src/data/crisis-resources.json` - 12+ crisis hotlines and resources

### Client-Side Storage (IndexedDB)

- `moodEntries` - Daily mood tracking with notes and activities
- `gratitudeEntries` - Gratitude journal entries
- `assessmentResults` - Assessment history with scores and interpretations
- `communityPosts` - Anonymous community posts (local-first)
- `communityReplies` - Post replies and comments
- `chatHistory` - Chatbot conversation history

## 📖 API Documentation

All API routes serve static data or provide client-side functionality.

### Core Data APIs (Read-Only, Static)

- `GET /api/disorders` - List all disorders from static JSON
- `GET /api/disorders/[slug]` - Get specific disorder details
- `GET /api/assessments` - List all validated assessment tools
- `GET /api/meditations` - List all guided meditations
- `GET /api/therapy-techniques` - List all therapy techniques
- `GET /api/crisis-resources` - List all crisis resources

### Interactive APIs (Client-Side Storage)

- `POST /api/chatbot` - Process chatbot messages (rule-based, no external AI)
  - Crisis detection
  - Mental health education
  - Coping strategies
- `GET/POST /api/community/posts` - Community posts (stored in IndexedDB)
  - Note: API provides initial welcome post, actual storage is client-side

## 🔒 Privacy & Security

- **No User Tracking**: Zero analytics, no cookies, no tracking
- **Client-Side Storage**: All personal data stays in your browser
- **No Sign-Up Required**: Anonymous usage throughout
- **Offline-First**: Works completely offline after first load
- **No External APIs**: No third-party service calls
- **Open Source**: Fully auditable code

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

# Export seed data to static JSON (if you've modified data)
npm run export-data
```

## 🚀 Deployment

### One-Click Deployment to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rudra496/mindwell)

**Steps:**
1. Click the "Deploy" button above
2. Sign in to Vercel (free account)
3. Click "Deploy"
4. Done! Your site is live at `https://your-app-name.vercel.app`

**No environment variables needed!** The app works entirely client-side.

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

### Deploy to Other Static Hosts

The site can be deployed to any static hosting service:

- **Cloudflare Pages**
- **GitHub Pages** (with proper configuration)
- **Railway**
- **Render**
- **Fly.io**

**Build configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Self-Hosting

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use a process manager like PM2
npm install -g pm2
pm2 start npm --name "mindwell" -- start
```

The app will run on port 3000 by default. Use a reverse proxy (nginx, Apache) for production.

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t mindwell .
docker run -p 3000:3000 mindwell
```

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
