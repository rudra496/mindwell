# Disorder Expansion Guide

This guide explains how to expand the remaining 31 disorders with comprehensive, evidence-based content.

## Progress

- **Completed**: 29 disorders with comprehensive details (15-20 symptoms, DSM criteria, etc.)
- **Remaining**: 31 disorders need expansion

## Using the Expansion Tool

### Quick Start

```bash
# Run the expansion tool
python3 scripts/expand_all_disorders.py
```

This will:
1. Show how many disorders need expansion
2. Expand all disorders with data in the script
3. List remaining disorders

### Adding New Disorder Expansions

Edit `scripts/expand_all_disorders.py` and add to the `COMPREHENSIVE_EXPANSIONS` dictionary:

```python
COMPREHENSIVE_EXPANSIONS = {
    "disorder-slug": {
        "description": "Clear, medical description (2-3 sentences)",
        "symptoms": [
            "Symptom 1",
            "Symptom 2",
            # Add 15-20 symptoms total
        ],
        "biologicalCauses": [
            "Cause 1",
            # Add 6-8 biological causes
        ],
        "psychologicalCauses": [
            "Cause 1",
            # Add 6-8 psychological causes
        ],
        "socialCauses": [
            "Cause 1",
            # Add 6-8 social causes
        ],
        "prevalence": "Statistics from research",
        "ageOfOnset": "Typical age range",
        "courseOfIllness": "Disease progression and prognosis",
        "riskFactors": [
            "Risk factor 1",
            # Add 8-10 risk factors
        ],
        "protectiveFactors": [
            "Protective factor 1",
            # Add 7-8 protective factors
        ],
        "comorbidities": [
            "Common comorbidity 1",
            # Add 5-7 comorbidities
        ],
        "naturalSolutions": [
            "Solution 1",
            # Add 20 natural solutions
        ],
        "nutritionalRecs": [
            "Recommendation 1",
            # Add 15 nutritional recommendations
        ],
        "therapyApproaches": [
            "Therapy 1 - Description",
            # Add 10-13 therapy approaches
        ],
        "whenToSeekHelp": [
            "Indicator 1",
            # Add 10-12 when to seek help indicators
        ],
        "crisisResources": [
            "988 Suicide & Crisis Lifeline",
            "Crisis Text Line: Text HELLO to 741741",
            "SAMHSA National Helpline: 1-800-662-4357",
            # Add 4-6 crisis resources
        ],
        "researchLinks": [
            "https://www.nimh.nih.gov/...",
            # Add 4 research links
        ],
        "dsmCriteria": [
            "DSM-5 criterion 1",
            # Add 8-12 DSM-5 criteria
        ]
    }
}
```

## Remaining Disorders to Expand

1. **Schizoaffective Disorder** - Psychotic disorder with mood episodes
2. **Delusional Disorder** - Fixed false beliefs without other psychotic symptoms
3. **Brief Psychotic Disorder** - Sudden psychotic episode lasting < 1 month
4. **Intellectual Disability** - Significant limitations in intellectual and adaptive functioning
5. **Tourette Disorder** - Multiple motor and vocal tics
6. **Social Communication Disorder** - Difficulty with social use of language
7. **Oppositional Defiant Disorder** - Pattern of defiant, hostile behavior toward authority
8. **Conduct Disorder** - Violation of rights of others and societal norms
9. **Intermittent Explosive Disorder** - Recurrent behavioral outbursts
10. **Separation Anxiety Disorder** - Excessive anxiety about separation from attachment figures
11. **Illness Anxiety Disorder** - Preoccupation with having serious illness
12. **Reactive Attachment Disorder** - Inhibited, withdrawn attachment behavior
13. **Disinhibited Social Engagement Disorder** - Overly familiar behavior with strangers
14. **Premenstrual Dysphoric Disorder** - Severe mood symptoms before menstruation
15. **Disruptive Mood Dysregulation Disorder** - Chronic irritability and temper outbursts in children
16. **Cyclothymic Disorder** - Mild form of bipolar with mood swings
17. **Somatic Symptom Disorder** - Excessive focus on physical symptoms
18. **Conversion Disorder** - Neurological symptoms without medical cause
19. **Factitious Disorder** - Feigning illness for attention
20. **Rumination Disorder** - Regurgitation and re-chewing of food
21. **Avoidant/Restrictive Food Intake Disorder** - Limited eating not due to body image
22. **Pica** - Eating non-food substances
23. **Insomnia Disorder** - Difficulty falling or staying asleep
24. **Hypersomnolence Disorder** - Excessive sleepiness
25. **Narcolepsy** - Sudden sleep attacks and cataplexy
26. **Obstructive Sleep Apnea** - Breathing interruptions during sleep
27. **Restless Legs Syndrome** - Urge to move legs, especially at night
28. **Erectile Disorder** - Difficulty achieving or maintaining erection
29. **Female Orgasmic Disorder** - Difficulty achieving orgasm
30. **Premature Ejaculation** - Ejaculation occurring too quickly
31. **Female Sexual Interest/Arousal Disorder** - Reduced sexual interest or arousal
32. **Male Hypoactive Sexual Desire Disorder** - Reduced sexual desire in men

## Research Resources

### Primary Sources
- **DSM-5**: American Psychiatric Association Diagnostic and Statistical Manual
- **NIMH**: https://www.nimh.nih.gov/health/topics
- **WHO ICD-11**: https://icd.who.int/
- **APA**: https://www.psychiatry.org/patients-families

### Research Databases
- **PubMed**: https://pubmed.ncbi.nlm.nih.gov/
- **Cochrane Library**: https://www.cochranelibrary.com/
- **Google Scholar**: https://scholar.google.com/

### Clinical Guidelines
- **NICE Guidelines**: https://www.nice.org.uk/
- **APA Practice Guidelines**: https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines

## Quality Standards

Each disorder expansion should be:

1. **Medically Accurate**: Based on DSM-5 and current research
2. **Comprehensive**: 15-20 symptoms minimum
3. **Evidence-Based**: Include research citations
4. **Practical**: Include actionable solutions
5. **Accessible**: Written for general audience
6. **Current**: Based on latest diagnostic criteria

## Workflow

1. **Research** (30-60 min per disorder)
   - Read DSM-5 criteria
   - Review NIMH information
   - Check recent research (PubMed)
   - Note statistics and prevalence

2. **Write Content** (30-45 min per disorder)
   - Start with DSM-5 criteria
   - Add symptoms from clinical sources
   - Include evidence-based treatments
   - Add natural solutions and lifestyle recommendations

3. **Add to Script** (5 min per disorder)
   - Format as Python dictionary
   - Add to COMPREHENSIVE_EXPANSIONS

4. **Run Tool** (1 min)
   - Execute: `python3 scripts/expand_all_disorders.py`
   - Verify expansion completed
   - Check output

5. **Commit Changes** (2 min)
   - Git add and commit
   - Push to repository

## Estimated Time

- **Per Disorder**: 60-90 minutes (research + writing)
- **Remaining 31 Disorders**: ~40-50 hours total
- **Batch Processing**: Can do 3-5 disorders per session

## Tips for Efficiency

1. **Batch Similar Disorders**: Group by category (e.g., all personality disorders, all sleep disorders)
2. **Template Reuse**: Copy structure from completed disorders
3. **Research First**: Research 3-5 disorders before writing
4. **Quality Over Speed**: Accuracy is critical for medical content
5. **Peer Review**: Have medical professionals review when possible

## Example: Quick Expansion

Here's a minimal working example for a new disorder:

```python
"tourette-disorder": {
    "description": "Tourette Disorder is a neurodevelopmental condition characterized by multiple motor tics and at least one vocal tic present for more than one year. Tics are sudden, rapid, recurrent, nonrhythmic movements or vocalizations.",
    "symptoms": [
        "Multiple motor tics (e.g., eye blinking, head jerking)",
        "At least one vocal tic (e.g., throat clearing, grunting)",
        "Tics occurring many times per day",
        # ... add 12-17 more symptoms
    ],
    # ... complete all other fields
}
```

## Getting Help

- **Medical Questions**: Consult DSM-5 or NIMH resources
- **Technical Issues**: Check script syntax
- **Time Constraints**: Consider focusing on most common disorders first

## Priority Order (by prevalence)

1. **Insomnia Disorder** - Very common (~30% adults)
2. **Separation Anxiety Disorder** - Common in children (4%)
3. **Oppositional Defiant Disorder** - Common in children (3.3%)
4. **Conduct Disorder** - Affects 2-10% of children
5. **Intermittent Explosive Disorder** - 2.7% lifetime prevalence
6. Then continue with others

---

**Note**: This is a substantial medical content creation task. Consider:
- Working with medical professionals for review
- Doing in batches over time
- Prioritizing most common/requested disorders
- Ensuring all content is evidence-based and accurate
