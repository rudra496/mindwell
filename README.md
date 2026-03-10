# MindWell

**MindWell Support** is the support and crisis-assistance service of the
MindWell open-source mental health platform.

## 📋 Project Overview

MindWell is an open-source mental health platform providing trusted, practical, and accessible wellbeing support to a global audience. The platform combines mental health education, self-reflection tools, wellbeing activities, and pathways to connect with psychologists. Designed with a privacy-first approach, MindWell empowers users to learn about mental health conditions, reflect on their wellbeing, and access professional support when needed.

## ✨ What MindWell Is

- ✅ Educational mental health resource platform
- ✅ Self-reflection and awareness tools
- ✅ Access to verified psychologists
- ✅ Privacy-first design
- ✅ Free and open-source

## 🚫 What MindWell Is Not

- ❌ Not a diagnostic tool
- ❌ Not a replacement for professional medical care
- ❌ Not an emergency crisis service
- ❌ Not AI-powered therapy or counseling

## 🎯 Features

### Mental Health Education

**393 Mental Health Conditions** - Comprehensive educational content covering:
- Anxiety Disorders (Generalized Anxiety, Panic Disorder, Social Anxiety, Phobias, etc.)
- Mood Disorders (Major Depression, Bipolar Disorder, Dysthymia, etc.)
- Trauma-Related Conditions (PTSD, Complex PTSD, Acute Stress Disorder)
- Eating Disorders (Anorexia, Bulimia, Binge Eating Disorder)
- Personality Disorders (Borderline, Narcissistic, Antisocial, etc.)
- Psychotic Disorders (Schizophrenia, Schizoaffective Disorder)
- Neurodevelopmental Conditions (ADHD, Autism Spectrum Disorder)
- Substance Use Disorders
- And many more mental health conditions

### Self-Reflection Tools

**20 Non-Diagnostic Assessments** - Screening tools for self-awareness and reflection:
- PHQ-9 (Depression screening)
- GAD-7 (Anxiety screening)
- PCL-5 (PTSD screening)
- AUDIT (Alcohol use screening)
- CAGE (Substance use screening)
- Y-BOCS (OCD symptoms)
- MDQ (Bipolar screening)
- ASRS (ADHD screening)
- EAT-26 (Eating disorder screening)
- And 11 additional specialized assessments

**Important**: These assessments are for educational and self-reflection purposes only, not for diagnosis.

### Therapy & Meditation

- **Evidence-based therapy techniques** - Educational resources on CBT (Cognitive Behavioral Therapy), DBT (Dialectical Behavior Therapy), and ACT (Acceptance and Commitment Therapy)
- **Guided meditation library** - Curated meditation resources with various techniques and durations

### Mood Tracking

- **Offline-first design** - Works without internet connection
- **Device-only storage** - Uses browser IndexedDB
- **No cloud sync or server storage** - Your data never leaves your device
- **Visual charts and pattern recognition** - Track emotional patterns over time
- **Complete privacy** - No one can access your mood data but you

### Community Support

- **Firewall-protected peer support** - Safe space for mental health discussions
- **Moderation logic and community guidelines** - Ensures respectful interactions
- **Not publicly indexed** - Protected from search engines
- **Anonymous participation** - Share experiences without revealing identity

### Clinical Support

- **Access to 2 assistant clinical psychologists** - Verified mental health professionals
- **First session free** (availability-based) - Initial consultation at no cost
- **Direct WhatsApp and phone contact** - Easy communication channels
- **Not intended to replace emergency or hospital care** - Complementary support only

### Crisis Resources

- **Bangladesh**: Kaan Pete Roi: 09678 676 777 (24/7)
- **US**: 988 Suicide & Crisis Lifeline
- **Global resources** organized by country

### Wellbeing Games

- Interactive tools for focus, stress relief, and emotional regulation
- Mindfulness activities
- Short guided exercises

### Bilingual Support

- 🇬🇧 **English** - Full support
- 🇧🇩 **Bengali (বাংলা)** - Full support

## 🔒 Privacy & Data Protection

### Our Privacy Commitments:

- ✅ **No server storage of mental health data** - Your sensitive information stays with you
- ✅ **Mood data stays on your device only** - Uses browser IndexedDB, never transmitted
- ✅ **No AI analysis or profiling** - No automated behavioral analysis
- ✅ **No selling or sharing data** - Your data is never monetized
- ✅ **Community posts firewall-protected** - Not publicly accessible
- ✅ **No tracking or behavioral analytics** - Privacy-first approach

### Technical Implementation:

- Mood tracker uses browser IndexedDB for local storage
- No authentication required for privacy-sensitive features
- Static generation where possible for performance
- Client-side rendering for sensitive features

## ⚕️ Medical & Ethical Disclaimer

**FOR EDUCATIONAL PURPOSES ONLY**

- MindWell is **NOT** a diagnostic system
- MindWell is **NOT** a substitute for licensed medical or psychological care
- Self-reflection assessments are screening tools, not diagnostic instruments
- In crisis, use emergency support: 999 (Bangladesh), 911 (US), or local emergency services
- Always consult qualified healthcare professionals for diagnosis and treatment

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Storage**: IndexedDB (client-side)
- **Deployment**: Vercel
- **Performance**: Lighthouse-optimized
- **Accessibility**: WCAG AA compliant

## 💻 Local Development Setup

### Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/rudra496/mindwell.git
cd mindwell

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

### Folder Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/       # React components
│   ├── homepage/     # Homepage sections
│   ├── layout/       # Layout components
│   ├── safety/       # Safety and crisis components
│   └── ui/           # Shadcn UI components
├── lib/              # Utilities and configurations
└── data/             # Static data (psychologists, disorders, etc.)

public/
├── images/           # Static images
└── manifest.json     # PWA manifest
```

## 🌍 Deployment

### Vercel (Recommended)

MindWell is optimized for Vercel deployment:

1. Fork this repository
2. Import to Vercel
3. Deploy with default settings
4. No environment variables required for basic features

**Live Site**: https://mindwell-navy.vercel.app/

### Other Platforms

Compatible with any Next.js hosting provider:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted Node.js

## 📱 Capacitor Android Wrapper (Hosted URL mode)

This repository includes Capacitor configuration for wrapping the hosted web app in an Android shell.

- Config file: `capacitor.config.ts`
- Runtime bootstrap: `src/components/capacitor/CapacitorRuntimeBootstrap.tsx`
- Scripts:
  - `npm run cap:sync`
  - `npm run cap:sync:android`
  - `npm run cap:open:android`

See `CAPACITOR_ANDROID_SETUP.md` for full setup, hardening, and release guidance.

## 🎨 Performance & SEO

- ✅ Lighthouse score optimized
- ✅ Core Web Vitals compliant
- ✅ Responsive mobile-first design
- ✅ PWA-ready with offline support
- ✅ Semantic HTML for accessibility
- ✅ Open Graph and Twitter Card metadata

## 🌐 Internationalization

- 🇬🇧 **English** - Full support
- 🇧🇩 **Bengali (বাংলা)** - Full support

Language preference stored locally, no server required.

## 🤝 Contributing

Contributions welcome from:
- Developers (features, bug fixes, performance)
- Designers (UX/UI improvements)
- Mental health professionals (content accuracy)
- Accessibility experts (WCAG compliance)
- Translators (additional languages)

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

### Contribution Guidelines

- Respect privacy-first design principles
- Maintain educational (not diagnostic) tone
- Follow existing code style
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately

Conditions:
- Include original license and copyright notice

## 📞 Contact & Support

### For General Inquiries:
- **Email**: contactmindwellorg@gmail.com
- **Phone**: +8801988223165

### For Funding & Partnerships:
- Email: contactmindwellorg@gmail.com

### Connect with MindWell:
- **Facebook**: https://www.facebook.com/share/17uZeJjmBc/
- **LinkedIn**: https://www.linkedin.com/in/rudrasarker
- **GitHub**: https://github.com/rudra496/mindwell

### Developer:
- **Rudra Sarker** - Founder & Lead Developer
- Portfolio: https://rudra496.github.io/site

### Inspired by:
- **Dr. Farzana Hussain, Ph.D.** - Clinical Psychology Professor
- LinkedIn: https://www.linkedin.com/in/farzanahussain/

## 🌟 Acknowledgments

- All mental health professionals who reviewed content
- Open-source community contributors
- Organizations providing crisis resources (SAMHSA, NAMI, Crisis Text Line, etc.)
- UN Sustainable Development Goals (SDG 3: Good Health & Well-being, SDG 4: Quality Education)

## 📊 Project Stats

- **393** Mental health conditions documented
- **20** Self-reflection assessments
- **2** Assistant clinical psychologists
- **2** Languages supported (English, Bengali)
- **100%** Open-source
- **0** Data collected on servers

## 🚀 Roadmap

- [ ] Expand psychologist network
- [ ] Add more crisis resources by country
- [ ] Additional language support
- [ ] Enhanced accessibility features
- [ ] Community moderation tools
- [ ] Educational video content

## ⚠️ Important Notes

1. **Not for Emergencies**: If you're in crisis, contact local emergency services immediately
2. **Not Diagnostic**: Assessments are for self-reflection only, not medical diagnosis
3. **Privacy First**: Your mental health data never leaves your device
4. **Professional Care**: Always consult licensed professionals for mental health concerns

---

**Made with care for mental health awareness 💚**

**Aligned with UN SDG 3 (Good Health & Well-being) and SDG 4 (Quality Education)**
