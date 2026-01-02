# Guide: Adding Remaining Disorders to seed.ts

## Overview

This guide provides instructions for adding the remaining 30 comprehensive disorders to reach the 63-disorder target.

## Location

All disorders are defined in: `prisma/seed.ts`

The disorders array starts at line 11 and currently ends around line 5780.

## Format Template

Each disorder follows this exact structure:

```typescript
{
  slug: 'disorder-name-slug',
  name: 'Full Disorder Name',
  category: 'Category Name',
  description: 'Comprehensive 1-2 sentence description',
  symptoms: JSON.stringify([
    // 15-20 detailed symptoms
    'Symptom 1 with detailed description',
    'Symptom 2 with detailed description',
    // ... 15-20 total
  ]),
  biologicalCauses: JSON.stringify([
    // 6-8 biological causes with research backing
    'Genetic predisposition with specific details',
    'Brain structure/chemistry changes',
    // ... 6-8 total
  ]),
  psychologicalCauses: JSON.stringify([
    // 6-8 psychological causes
    'Cognitive patterns or emotional factors',
    // ... 6-8 total
  ]),
  socialCauses: JSON.stringify([
    // 6-8 social/environmental causes
    'Environmental or social factors',
    // ... 6-8 total
  ]),
  prevalence: 'X% of population. Include source (NIMH, WHO, etc.)',
  ageOfOnset: 'Typical age or age range with details',
  courseOfIllness: 'Progression, duration, recovery patterns with details',
  riskFactors: JSON.stringify([
    // 9-10 risk factors
    'Specific risk factor with details',
    // ... 9-10 total
  ]),
  protectiveFactors: JSON.stringify([
    // 8 protective factors
    'Specific protective factor',
    // ... 8 total
  ]),
  comorbidities: JSON.stringify([
    // 5-7 common comorbidities
    'Co-occurring disorder (with %)' if known',
    // ... 5-7 total
  ]),
  naturalSolutions: JSON.stringify([
    // 20 evidence-based natural solutions
    'Specific intervention or self-help strategy',
    'Exercise-based approach with details',
    'Mindfulness or meditation practice',
    // ... 20 total
  ]),
  nutritionalRecs: JSON.stringify([
    // 15 nutritional recommendations
    'Specific nutrient or supplement (dose if applicable)',
    'Dietary pattern recommendation',
    // ... 15 total
  ]),
  therapyApproaches: JSON.stringify([
    // 10-13 therapy approaches
    'Evidence-based therapy (e.g., CBT) with details',
    'Medication options (if applicable)',
    'Specific treatment modality',
    // ... 10-13 total
  ]),
  whenToSeekHelp: JSON.stringify([
    // 10-12 indicators
    'Specific warning sign or severity indicator',
    // ... 10-12 total
  ]),
  crisisResources: JSON.stringify([
    // 5-6 crisis resources
    '988 Suicide & Crisis Lifeline: Call or text 988',
    'Crisis Text Line: Text HELLO to 741741',
    'Specific helpline with number',
    // ... 5-6 total
  ]),
  researchLinks: JSON.stringify([
    // 4 authoritative research links
    'https://www.nimh.nih.gov/...',
    'https://pubmed.ncbi.nlm.nih.gov/... - Brief description',
    'https://www.who.int/...',
    'https://www.apa.org/...'
  ]),
  dsmCriteria: JSON.stringify([
    // 8-12 DSM-5 diagnostic criteria
    'Primary diagnostic criterion A',
    'Criterion B with specific details',
    'Duration requirements',
    'Severity specifiers',
    'Exclusion criteria',
    // ... 8-12 total
  ])
}
```

## Categories

Disorders should be organized by category:

- **Mood Disorders**
- **Anxiety Disorders**  
- **Trauma & Stress-Related Disorders**
- **Obsessive-Compulsive and Related Disorders**
- **Substance Use Disorders**
- **Personality Disorders**
- **Psychotic Disorders**
- **Dissociative Disorders**
- **Sleep-Wake Disorders**
- **Neurodevelopmental Disorders**
- **Eating Disorders**

## Research Sources

### Required Sources
1. **DSM-5**: Official diagnostic criteria (must be accurate)
2. **NIMH**: Prevalence, statistics, treatment info
3. **PubMed**: Peer-reviewed research for treatments
4. **WHO**: International statistics and guidelines

### Recommended Sources
- APA (American Psychological Association)
- SAMHSA (Substance Abuse and Mental Health Services Administration)
- CDC (Centers for Disease Control)
- Cochrane Reviews (evidence-based treatment reviews)
- Specialty organizations (ADAA, NAMI, etc.)

## Step-by-Step Process

### 1. Research Phase (15-20 minutes per disorder)
- [ ] Review DSM-5 criteria
- [ ] Read NIMH disorder page
- [ ] Check latest prevalence statistics
- [ ] Review evidence-based treatments (Cochrane if available)
- [ ] Find 3-4 authoritative research links
- [ ] Note crisis resources specific to disorder

### 2. Writing Phase (20-30 minutes per disorder)
- [ ] Create slug (lowercase, hyphenated)
- [ ] Write clear description
- [ ] List 15-20 symptoms (prioritize DSM criteria + common additional symptoms)
- [ ] Document 6-8 causes in each category (biological, psychological, social)
- [ ] Add prevalence with source
- [ ] Describe course of illness
- [ ] List 9-10 risk factors
- [ ] List 8 protective factors
- [ ] List 5-7 common comorbidities
- [ ] Add 20 natural solutions (variety: behavioral, social, physical, mindfulness)
- [ ] Add 15 nutritional recommendations (evidence-based)
- [ ] Add 10-13 therapy approaches (include medications if standard)
- [ ] Add 10-12 "when to seek help" indicators
- [ ] Add 5-6 crisis resources
- [ ] Add 4 research links
- [ ] Add 8-12 DSM-5 criteria

### 3. Review Phase (5-10 minutes per disorder)
- [ ] Check for medical accuracy
- [ ] Verify all links work
- [ ] Ensure consistency with other disorders
- [ ] Check JSON formatting (use JSON.stringify())
- [ ] Verify slug is unique
- [ ] Proofread for typos

### 4. Testing (once all added)
- [ ] Run `npm run prisma:generate`
- [ ] Run `npm run build`
- [ ] Test seeding: `npm run prisma:seed`
- [ ] Verify no errors

## Adding to seed.ts

### Location to Add
Add new disorders before the closing bracket of the disorders array:
- Currently around line 5780
- Look for: `    },` followed by `  ]`
- Add new disorder entries before the `  ]`

### Example Addition
```typescript
    }, // End of previous disorder
    {
      slug: 'new-disorder',
      name: 'New Disorder Name',
      // ... all fields ...
    },
  ] // End of disorders array
```

## Quality Checklist

### Content Quality
- [ ] All information medically accurate
- [ ] Sources cited for statistics
- [ ] Treatment approaches evidence-based
- [ ] DSM-5 criteria match official text
- [ ] Language appropriate and sensitive
- [ ] Avoid stigmatizing terminology

### Technical Quality
- [ ] Slug is unique and lowercase-hyphenated
- [ ] All required fields included
- [ ] JSON.stringify() used for arrays
- [ ] Proper comma placement
- [ ] No syntax errors
- [ ] Consistent formatting with existing disorders

### Completeness
- [ ] 15-20 symptoms ✓
- [ ] 6-8 biological causes ✓
- [ ] 6-8 psychological causes ✓
- [ ] 6-8 social causes ✓
- [ ] Prevalence with source ✓
- [ ] Age of onset ✓
- [ ] Course of illness ✓
- [ ] 9-10 risk factors ✓
- [ ] 8 protective factors ✓
- [ ] 5-7 comorbidities ✓
- [ ] 20 natural solutions ✓
- [ ] 15 nutritional recs ✓
- [ ] 10-13 therapy approaches ✓
- [ ] 10-12 when to seek help ✓
- [ ] 5-6 crisis resources ✓
- [ ] 4 research links ✓
- [ ] 8-12 DSM criteria ✓

## Common Mistakes to Avoid

1. **Incomplete Information**: Don't leave fields with only 3-4 items when 15-20 are required
2. **Copy-Paste Errors**: Ensure disorder-specific information, not generic
3. **Missing JSON.stringify()**: All arrays must use JSON.stringify()
4. **Broken Links**: Verify all research links work
5. **Outdated Statistics**: Use most recent prevalence data
6. **Missing Commas**: Check syntax carefully
7. **Stigmatizing Language**: Use person-first, respectful language
8. **Treatment Exaggeration**: Only include evidence-based treatments

## Estimated Time

- **Per disorder**: 30-60 minutes (research + writing + review)
- **30 remaining disorders**: 15-30 hours total
- **Recommended approach**: 3-5 disorders per session

## Tips for Efficiency

1. **Batch Research**: Research similar disorders together (e.g., all substance use disorders)
2. **Template Reuse**: Adapt similar sections from related disorders
3. **Parallel Work**: Multiple contributors can work on different categories
4. **Focus Sessions**: Dedicate 2-3 hour blocks for quality work
5. **Medical Review**: Have clinicians review batches for accuracy

## Getting Help

- **Medical Questions**: Consult DSM-5 or licensed clinician
- **Technical Issues**: Check existing disorders for syntax examples
- **Research Access**: Use institutional access or PubMed for papers
- **Crisis Resources**: Verify current numbers at samhsa.gov or 988lifeline.org

## Examples to Reference

Look at these comprehensive disorders already in seed.ts as examples:
- Complex PTSD (lines ~4800-5200)
- Opioid Use Disorder (lines ~5400-5600)
- Cannabis Use Disorder (lines ~5600-5800)
- Adjustment Disorders (lines ~5000-5200)

## Final Notes

- **Quality over speed**: Accurate, comprehensive content is essential
- **Medical accuracy is critical**: Lives may depend on this information
- **Stay updated**: Use current research and statistics
- **Be compassionate**: This information helps real people in distress
- **Collaborate**: Multiple reviewers improve quality

## After Completion

1. Run full test suite
2. Update DISORDER_EXPANSION_STATUS.md
3. Update README statistics
4. Create PR for medical review
5. Test database seeding
6. Verify platform functionality
7. Celebrate completion! 🎉
