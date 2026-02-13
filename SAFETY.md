# MindWell Safety & Ethical Guidelines

## 🛡️ Overview

This document outlines the safety and ethical restructuring implemented in MindWell to ensure user safety, clinical appropriateness, and ethical responsibility in mental health support.

## 🎯 Core Principles

1. **Safety over features** - User wellbeing takes precedence
2. **Clarity over complexity** - Information must be understandable
3. **Education over diagnosis** - We inform, not diagnose
4. **Guidance over treatment** - We guide to help, not provide treatment
5. **Connection over isolation** - We connect users to professionals
6. **Preserve over delete** - Features paused, not removed
7. **Gate over remove** - Sensitive content protected, not hidden

## 🚨 High-Risk Features - Actions Taken

### AI Chatbot - PAUSED

**Status**: Disabled with safety notice  
**Reason**: Requires clinical validation and proper crisis handling protocols  
**Location**: `/src/components/ChatbotModal.tsx`

**Implementation**:
- Feature flag: `featureFlags.enableAIChatbot = false`
- UI shows "FeaturePausedNotice" component
- Code preserved with comment: `// PAUSED FOR SAFETY REVIEW - DO NOT DELETE`
- Will be re-enabled after:
  - Clinical review
  - Crisis detection validation
  - Professional oversight protocols

### High-Risk Assessments - GATED

**Status**: Require informed consent before access  
**Location**: `/src/components/AssessmentModal.tsx`, `/src/components/gating/ConsentModal.tsx`

**High-Risk Criteria**:
- Contains the word "suicide", "self-harm", or "trauma"
- Included in `highRiskAssessmentSlugs` array
- May cause emotional distress

**Gating Mechanism**:
1. User clicks assessment
2. ConsentModal appears with:
   - Educational purpose disclaimer
   - Option to exit anytime
   - Crisis resources displayed
   - Emergency numbers visible
3. User must check all consent boxes
4. Only then can proceed to assessment

## 📋 Disclaimer System

### Medical Disclaimer
**Component**: `/src/components/safety/MedicalDisclaimer.tsx`  
**Variants**: Full (site footer) | Compact (homepage)  
**Languages**: English & Bangla

**Message**:
> "MindWell provides educational information and guidance only. We are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with questions about mental health conditions."

**Placement**:
- Homepage (below crisis banner)
- Footer (all pages)
- About page

### Assessment Disclaimer
**Component**: `/src/components/safety/AssessmentDisclaimer.tsx`  
**Languages**: English & Bangla

**Message**:
> "This self-reflection tool is for educational purposes only. Results are not a diagnosis. If you have concerns about your mental health, please consult a qualified professional."

**Placement**:
- Before all assessments
- Assessment results page

### Educational Disclaimer
**Component**: `/src/components/safety/EducationalDisclaimer.tsx`  
**Languages**: English & Bangla

**Message**:
> "This information is for educational purposes only and is not a medical diagnosis. Always consult with a qualified healthcare professional for proper diagnosis and treatment."

**Placement**:
- All disorder information pages
- Mental health education sections

## 🎯 Content Reorganization

### Language Changes

**Before** → **After**:
- "Disorders Database" → "Mental Health Education"
- "Self-Assessments" → "Self-Reflection Tools"
- "Take Assessment" → "Explore Tools"
- "AI Support Chatbot" → "AI Support (Paused)"
- Clinical/diagnostic language → Educational/awareness language

### Information Architecture

**New Homepage Structure**:
1. Hero Section (warm, welcoming)
2. Crisis Banner (Bangladesh + US numbers)
3. Medical Disclaimer
4. What MindWell Is
5. How MindWell Helps (features)
6. Access to Psychologists
7. Bangladesh Services
8. SDG 3 Alignment
9. Mood Tracker
10. Footer with disclaimers

## 🇧🇩 Bangladesh Context

### Crisis Resources
- **Kaan Pete Roi**: 09678 676 777 (24/7 emotional support)
- **Emergency**: 999

### Mental Health Services
1. **National Mental Health Institute (NIMH)**
2. **NIMH Hospital** - +880-2-9126613

### Cultural Considerations
- Full Bangla language support
- Culturally appropriate content
- Non-commercial tone
- Focus on free/accessible services
- Alignment with government/NGO initiatives

## 🌐 Bilingual Support

**Languages**: English (en) | Bangla (bn)  
**Storage**: localStorage with key `mindwell_language`  
**Implementation**: `/src/lib/i18n.ts`, `/src/lib/useLanguage.ts`

**Translated Elements**:
- All navigation items
- All UI buttons and labels
- All disclaimers
- Crisis resources
- Consent modals
- Assessment titles

## 🎨 UI/UX Safety Features

### Calming Design
- **Color Palette**: Blues, greens, neutrals
- **Typography**: Clear hierarchy, readable fonts
- **Animations**: Respect `prefers-reduced-motion`
- **Spacing**: Generous whitespace
- **Smooth Scroll**: CSS `scroll-behavior: smooth`

### Accessibility (WCAG AA)
- Focus rings on all interactive elements
- ARIA labels throughout
- Keyboard navigation support
- Minimum touch target: 44x44px
- Color contrast ratios meet standards
- Screen reader compatible

### Visual Safety
- Replaced ❌ icons with text ("Back", "Previous", "Next")
- No red/alarming colors except crisis warnings
- Soft gradients and rounded corners
- Non-triggering imagery

## 🔧 Feature Flags

**Location**: `/src/lib/featureFlags.ts`

```typescript
export const featureFlags = {
  // AI Chatbot - PAUSED FOR SAFETY REVIEW
  enableAIChatbot: false,
  
  // High-risk assessments require consent
  gateHighRiskAssessments: true,
  
  // Voice features restricted
  enableVoiceForTherapy: true,
  enableVoiceForMeditation: true,
  enableVoiceForAssessments: false,
  enableVoiceForCrisis: false,
  
  // Consent modals
  requireConsentForAssessments: true,
  requireConsentForDisorders: false,
}
```

## 🎤 Voice Features

**Status**: Safe implementation  
**Location**: `/src/components/VoiceControlPanel.tsx`

**Restrictions**:
- ✅ Enabled for therapy techniques
- ✅ Enabled for meditation guides
- ❌ Disabled for assessments
- ❌ Disabled for crisis pages
- ❌ No auto-play

**Controls**:
- Play/Pause/Resume buttons
- Volume control
- Speed adjustment
- Pitch adjustment
- Voice selection

## 📊 Statistics & Metrics

All content counts centralized in `/src/lib/constants.ts`:

```typescript
export const CONTENT_COUNTS = {
  disorders: 63,
  assessments: 20,
  therapeuticGames: 16,
  meditations: 14,
  therapyTechniques: 20,
  crisisResources: 12,
}
```

## 🔐 Security & Privacy

### CodeQL Analysis
- **Status**: ✅ Passed (0 vulnerabilities)
- **Analyzed**: All JavaScript/TypeScript files
- **Date**: Latest commit

### Data Privacy
- No personal data collected without consent
- No tracking cookies
- localStorage only for:
  - Language preference
  - Voice settings
  - Assessment results (local only)
- No external analytics

## 🌍 SDG 3 Alignment

**Goal**: Good Health & Well-Being  
**Location**: `/src/components/SDGSection.tsx`

**Impact Areas**:
1. **Global Reach** - Accessible worldwide
2. **Community Impact** - Evidence-based, culturally sensitive
3. **Sustainable Growth** - Open-source ensures longevity

**Grant-Friendly Language**:
- Non-commercial tone
- Focus on public health impact
- Measurable outcomes
- Alignment with UN SDGs

## 👨‍⚕️ Professional Trust

### Psychologist Directory
**Location**: `/src/components/PsychologistsAccessSection.tsx`

**Features**:
- Qualified professionals highlighted
- Complete confidentiality assured
- Ethical standards commitment
- Evidence-based approach
- No commercial transactions

**Status**: Coming soon (partnerships in progress)

## 📝 Code Comments

All paused features marked with:
```typescript
// PAUSED FOR SAFETY REVIEW - DO NOT DELETE
// Reason: [specific reason]
```

## 🚀 Future Enhancements

### Planned (Post-Safety Review)
1. AI Chatbot (after clinical validation)
2. More high-risk assessments (with proper gating)
3. Telemedicine integration (with licensed professionals)
4. Group therapy features (with moderation)

### Safety Requirements Before Launch
- [ ] Clinical psychologist review
- [ ] Legal compliance check
- [ ] Accessibility audit
- [ ] Security penetration test
- [ ] User testing with mental health professionals

## 📞 Support & Contact

**Emergency**: Always recommend emergency services first  
**Platform Support**: contactmindwellorg@gmail.com  
**GitHub**: https://github.com/rudra496/mindwell

## 📜 License

MIT License - See LICENSE file

---

**Last Updated**: February 2026  
**Version**: 2.0 (Safety & Ethical Restructuring)  
**Maintained By**: MindWell Team
