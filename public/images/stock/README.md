# Stock Photos for Homepage Sections

This directory contains placeholder images for the homepage sections. Replace these with professional stock photos.

## Required Images

### Image Specifications
- **Format**: JPG or PNG
- **Size**: 1200x600px minimum (2:1 aspect ratio recommended)
- **Quality**: High resolution, optimized for web
- **Style**: Professional, transparent-friendly, works in light and dark modes

### Images Needed

1. **emergency-support.jpg** (Section 1)
   - Theme: Mental health emergency support, crisis intervention
   - Suggested: Professional therapist, calm supportive environment
   - Color tones: Warm, reassuring

2. **team-support.jpg** (Section 2)
   - Theme: Team collaboration, support network
   - Suggested: Diverse team working together, supportive community
   - Color tones: Bright, positive

3. **services.jpg** (Section 3)
   - Theme: Mental health services, therapy
   - Suggested: Therapy session, counseling environment
   - Color tones: Calm, professional

4. **assessment.jpg** (Section 4)
   - Theme: Mental health assessment, evaluation
   - Suggested: Assessment tools, questionnaires, reflection
   - Color tones: Clinical yet friendly

5. **reading.jpg** (Section 5)
   - Theme: Reading, education, articles
   - Suggested: Person reading, books, learning
   - Color tones: Scholarly, inviting

6. **sdg.jpg** (Section 6)
   - Theme: UN SDG goals, sustainability
   - Suggested: UN SDG logos, global impact imagery
   - Color tones: Vibrant UN colors

7. **learning.jpg** (Section 7)
   - Theme: Education, learning resources
   - Suggested: Educational materials, studying
   - Color tones: Academic, inspiring

8. **community.jpg** (Section 8)
   - Theme: Community support, peer groups
   - Suggested: Support group, people connecting
   - Color tones: Warm, inclusive

9. **bangladesh.jpg** (Section 9)
   - Theme: Bangladesh mental health support
   - Suggested: Bangladesh flag/landmarks, local support
   - Color tones: National colors (red/green)

10. **global-support.jpg** (Section 10)
    - Theme: Global crisis resources
    - Suggested: World map, international support
    - Color tones: Global, universal

11. **mood-tracking.jpg** (Section 11)
    - Theme: Mood tracking, emotions
    - Suggested: Charts, emotional tracking, journaling
    - Color tones: Varied, emotional spectrum

12. **donation.jpg** (Section 12)
    - Theme: Donation, funding, charity
    - Suggested: Giving hands, charity concept
    - Color tones: Generous, hopeful

13. **contact.jpg** (Section 13)
    - Theme: Contact, communication
    - Suggested: Communication devices, reaching out
    - Color tones: Connected, accessible

## Stock Photo Sources

### Free Stock Photo Sites
- **Unsplash**: https://unsplash.com/ (Free, high-quality)
- **Pexels**: https://www.pexels.com/ (Free, no attribution required)
- **Pixabay**: https://pixabay.com/ (Free, commercial use)
- **Freepik**: https://www.freepik.com/ (Free tier available)

### Search Terms
- "mental health support"
- "therapy session"
- "counseling"
- "community support"
- "emotional wellbeing"
- "meditation"
- "crisis support"

## Image Optimization

After adding images, optimize them:

```bash
# Using ImageOptim (Mac)
# Or online tools like TinyPNG, Squoosh

# Recommended dimensions: 1200x600px
# File size: < 200KB per image
```

## Implementation

Images are automatically loaded in the homepage sections. The system will gracefully handle missing images by showing the gradient background.

## Alternative: Use Placeholder Service

If you want temporary placeholders, you can modify the image URLs in `/src/app/page.tsx` to use:

```
https://placehold.co/1200x600/teal/white?text=Section+Name
```

Replace with actual stock photos for production.
