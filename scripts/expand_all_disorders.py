#!/usr/bin/env python3
"""
Complete Disorder Expansion Tool
Run this script to expand all remaining disorders with comprehensive, evidence-based content.

Usage:
    python3 scripts/expand_all_disorders.py

This will expand all disorders with < 10 symptoms to have comprehensive details:
- 15-20 symptoms
- 6-8 biological/psychological/social causes  
- 20 natural solutions
- 15 nutritional recommendations
- 10-13 therapy approaches
- 10-12 DSM-5 criteria
- Research links and clinical data
"""

import json
import sys
from pathlib import Path

# Add to repository root
SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent if SCRIPT_DIR.name == 'scripts' else SCRIPT_DIR
DATA_FILE = REPO_ROOT / 'src' / 'data' / 'disorders.json'

# Comprehensive evidence-based disorder expansions
# Based on DSM-5, ICD-11, NIMH, APA, and current medical literature
COMPREHENSIVE_EXPANSIONS = {
    # Already completed: complex-ptsd, acute-stress-disorder, adjustment-disorder, 
    # trichotillomania, avoidant-personality-disorder
    
    "dependent-personality-disorder": {
        "description": "Dependent Personality Disorder is characterized by a pervasive and excessive need to be taken care of, leading to submissive and clinging behavior and fears of separation. Individuals have difficulty making everyday decisions without excessive advice and reassurance, need others to assume responsibility, and feel helpless when alone.",
        "symptoms": [
            "Difficulty making everyday decisions without excessive reassurance",
            "Needs others to assume responsibility for major life areas",
            "Difficulty expressing disagreement due to fear of losing support",
            "Difficulty initiating projects due to lack of self-confidence",
            "Goes to excessive lengths to obtain support from others",
            "Feels uncomfortable or helpless when alone",
            "Urgently seeks another relationship when one ends",
            "Unrealistically preoccupied with fears of being left alone",
            "Submissive and clinging behavior",
            "Fears abandonment or rejection",
            "Difficulty being alone",
            "Tolerates mistreatment to maintain relationships",
            "Self-sacrificing behavior",
            "Difficulty expressing own preferences",
            "Passive in relationships",
            "Anxiety when having to be self-reliant",
            "Low self-esteem and self-doubt"
        ],
        "biologicalCauses": [
            "Genetic predisposition to anxiety",
            "Temperamental factors (dependency traits)",
            "Neurobiological factors in attachment",
            "Familial patterns of dependent behavior",
            "Neurotransmitter imbalances",
            "Brain differences in decision-making regions"
        ],
        "psychologicalCauses": [
            "Overprotective or authoritarian parenting",
            "Childhood experiences of helplessness",
            "Reinforcement of dependent behaviors",
            "Punishment for independent behavior",
            "Chronic illness in childhood",
            "Development of helpless schema"
        ],
        "socialCauses": [
            "Cultural norms emphasizing dependency",
            "Abusive relationships reinforcing helplessness",
            "Family systems with enmeshment",
            "Social isolation",
            "Gender role socialization",
            "Lack of opportunities for autonomy"
        ],
        "prevalence": "0.5-0.6% of general population. More diagnosed in women, though may be due to gender bias in diagnosis.",
        "ageOfOnset": "Typically emerges in early adulthood, though dependent traits may be present earlier.",
        "courseOfIllness": "Chronic and stable pattern. May worsen with stress or loss. Can improve with therapy focused on autonomy and self-efficacy.",
        "riskFactors": [
            "Childhood chronic illness",
            "Separation anxiety disorder in childhood",
            "Overprotective parenting",
            "History of controlling relationships",
            "Limited life experiences outside family",
            "Cultural factors",
            "Other anxiety disorders",
            "Low self-esteem"
        ],
        "protectiveFactors": [
            "Development of self-efficacy",
            "Independent life experiences",
            "Assertiveness skills",
            "Secure attachments",
            "Access to therapy",
            "Problem-solving abilities",
            "Social support for independence"
        ],
        "comorbidities": [
            "Major Depressive Disorder",
            "Anxiety Disorders",
            "Avoidant Personality Disorder",
            "Borderline Personality Disorder",
            "Adjustment Disorders",
            "Substance Use Disorders"
        ],
        "naturalSolutions": [
            "Assertiveness training exercises",
            "Decision-making practice (start small)",
            "Building self-confidence through achievements",
            "Learning to tolerate being alone",
            "Developing independent hobbies",
            "Problem-solving skills practice",
            "Setting personal goals",
            "Journaling own thoughts and preferences",
            "Mindfulness for self-awareness",
            "Gradual independence exercises",
            "Social skills development",
            "Self-care routines",
            "Cognitive restructuring of helpless thoughts",
            "Support groups",
            "Volunteering for sense of competence",
            "Learning new skills independently",
            "Positive self-talk practice",
            "Boundary-setting exercises",
            "Self-compassion practices",
            "Reading about autonomy and independence"
        ],
        "nutritionalRecs": [
            "Balanced diet for overall health",
            "Omega-3 fatty acids for mood",
            "B-complex vitamins",
            "Magnesium for anxiety",
            "Vitamin D if deficient",
            "Protein for energy and focus",
            "Complex carbohydrates",
            "Limit caffeine",
            "Avoid alcohol dependence",
            "Stay hydrated",
            "Regular meals for stability",
            "Iron for energy",
            "Antioxidants",
            "Probiotics",
            "Avoid excessive sugar"
        ],
        "therapyApproaches": [
            "Cognitive Behavioral Therapy (CBT)",
            "Psychodynamic Therapy",
            "Interpersonal Therapy",
            "Assertiveness Training",
            "Schema Therapy",
            "Group Therapy",
            "Family Therapy",
            "Behavioral Activation",
            "Problem-Solving Therapy",
            "Graduated exposure to independence",
            "SSRIs if comorbid depression/anxiety",
            "Medications for symptom management only"
        ],
        "whenToSeekHelp": [
            "Unable to make basic decisions alone",
            "Staying in abusive relationships",
            "Severe anxiety when alone",
            "Depression from relationship loss",
            "Substance use to cope",
            "Inability to function independently",
            "Suicidal thoughts",
            "Quality of life impaired",
            "Multiple failed relationships",
            "Chronic fear of abandonment",
            "Unable to work or maintain self-care"
        ],
        "crisisResources": [
            "988 Suicide & Crisis Lifeline",
            "Crisis Text Line: Text HELLO to 741741",
            "SAMHSA National Helpline: 1-800-662-4357",
            "National Domestic Violence Hotline: 1-800-799-7233"
        ],
        "researchLinks": [
            "https://www.nimh.nih.gov/health/topics/personality-disorders",
            "https://www.psychiatry.org/patients-families/personality-disorders",
            "https://pubmed.ncbi.nlm.nih.gov/31046031/",
            "https://www.apa.org/topics/personality-disorders"
        ],
        "dsmCriteria": [
            "Pervasive and excessive need to be taken care of",
            "Submissive and clinging behavior",
            "Fears of separation",
            "Beginning by early adulthood and present in various contexts",
            "Five or more of the following present",
            "Difficulty making decisions without excessive reassurance",
            "Needs others to take responsibility for major life areas",
            "Difficulty expressing disagreement",
            "Difficulty initiating projects",
            "Goes to excessive lengths to obtain support",
            "Feels uncomfortable when alone",
            "Urgently seeks new relationship when one ends",
            "Unrealistic fears of being left to care for self",
            "Causes significant distress or impairment"
        ]
    },
    
    "excoriation-disorder": {
        "description": "Excoriation (Skin-Picking) Disorder is characterized by recurrent skin picking resulting in skin lesions, despite repeated attempts to decrease or stop the behavior. It often involves feelings of tension before picking and relief afterward. It's classified as an obsessive-compulsive related disorder.",
        "symptoms": [
            "Recurrent skin picking resulting in lesions",
            "Repeated attempts to decrease or stop picking",
            "Picking at face, arms, hands, or other body areas",
            "Skin damage, scarring, or infections",
            "Tension or urge before picking",
            "Relief or gratification during/after picking",
            "Significant time spent picking",
            "Avoiding social situations due to appearance",
            "Using makeup or clothing to hide damage",
            "Shame or embarrassment about behavior",
            "Picking in response to stress or anxiety",
            "Automatic picking without awareness",
            "Focused picking with awareness",
            "Examining skin for imperfections",
            "Using tools (tweezers, needles) to pick",
            "Difficulty stopping once started",
            "Interference with daily activities"
        ],
        "biologicalCauses": [
            "Dysfunction in cortico-striatal-thalamic circuits",
            "Neurotransmitter imbalances (serotonin, dopamine)",
            "Genetic factors (family history)",
            "Brain differences in impulse control",
            "Reward system dysregulation",
            "Altered sensory processing"
        ],
        "psychologicalCauses": [
            "Habit and automaticity",
            "Tension reduction mechanism",
            "Emotion regulation difficulty",
            "Perfectionism",
            "Body-focused repetitive behavior",
            "Anxiety or stress response"
        ],
        "socialCauses": [
            "Stressful life events",
            "Childhood trauma",
            "Family conflict",
            "Social pressure about appearance",
            "Bullying",
            "Major life transitions",
            "Isolation"
        ],
        "prevalence": "1.4% of population. More common in females. Onset typically in adolescence.",
        "ageOfOnset": "Usually begins in adolescence (average age 13-15). Can start in childhood or adulthood.",
        "courseOfIllness": "Usually chronic with waxing and waning. May worsen with stress. Can improve with treatment but relapses common.",
        "riskFactors": [
            "Family history of excoriation or OCD",
            "Female gender",
            "Adolescence",
            "High stress",
            "Perfectionist traits",
            "Anxiety disorders",
            "Acne or other skin conditions",
            "History of trauma",
            "Depression"
        ],
        "protectiveFactors": [
            "Early intervention",
            "Strong social support",
            "Stress management skills",
            "Healthy coping strategies",
            "Self-awareness",
            "Emotional regulation",
            "Access to treatment",
            "Family support"
        ],
        "comorbidities": [
            "Obsessive-Compulsive Disorder",
            "Trichotillomania (Hair-Pulling)",
            "Major Depressive Disorder",
            "Anxiety Disorders",
            "Body Dysmorphic Disorder",
            "Substance Use Disorders",
            "Eating Disorders"
        ],
        "naturalSolutions": [
            "Habit Reversal Training",
            "Awareness training",
            "Competing response training (fidget toys)",
            "Stimulus control (covering mirrors)",
            "Wearing gloves as barrier",
            "Keeping hands busy",
            "Stress management techniques",
            "Mindfulness meditation",
            "Exercise for tension relief",
            "Journaling triggers",
            "Support groups (TLC Foundation)",
            "Cognitive restructuring",
            "Deep breathing",
            "Progressive muscle relaxation",
            "Skin care routine as alternative",
            "Bandages on common picking sites",
            "Reward system for pick-free periods",
            "Cold compress instead of picking",
            "Art or craft activities",
            "Yoga or tai chi"
        ],
        "nutritionalRecs": [
            "N-acetylcysteine (NAC) 1200-2400mg/day (evidence-based)",
            "Omega-3 fatty acids",
            "Inositol for OCD symptoms",
            "B-vitamins for stress",
            "Magnesium for anxiety",
            "Vitamin D",
            "Zinc for skin healing",
            "Vitamin C for wound repair",
            "Vitamin E for skin health",
            "Protein for tissue repair",
            "Limit caffeine",
            "Avoid alcohol",
            "Hydration for skin health",
            "Anti-inflammatory diet",
            "Regular balanced meals"
        ],
        "therapyApproaches": [
            "Habit Reversal Training (HRT) - First line",
            "Comprehensive Behavioral Model (ComB)",
            "Cognitive Behavioral Therapy (CBT)",
            "Acceptance and Commitment Therapy (ACT)",
            "Dialectical Behavior Therapy (DBT)",
            "Mindfulness-Based Therapy",
            "Psychoeducation",
            "Group therapy",
            "SSRIs (may help if comorbid conditions)",
            "NAC supplementation",
            "Dermatological care for skin damage"
        ],
        "whenToSeekHelp": [
            "Visible skin lesions or scarring",
            "Unable to stop despite trying",
            "Skin infections",
            "Significant distress",
            "Avoiding social situations",
            "Interference with work/school",
            "Depression or anxiety",
            "Low self-esteem",
            "Excessive time spent picking",
            "Quality of life impaired",
            "Using dangerous tools"
        ],
        "crisisResources": [
            "988 Suicide & Crisis Lifeline",
            "TLC Foundation for BFRBs: www.bfrb.org",
            "Crisis Text Line: Text HELLO to 741741",
            "SAMHSA National Helpline: 1-800-662-4357"
        ],
        "researchLinks": [
            "https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd",
            "https://www.bfrb.org/learn-about-bfrbs/skin-picking-disorder",
            "https://pubmed.ncbi.nlm.nih.gov/27641141/ - NAC for excoriation",
            "https://www.psychiatry.org/patients-families/excoriation-disorder"
        ],
        "dsmCriteria": [
            "Recurrent skin picking resulting in skin lesions",
            "Repeated attempts to decrease or stop picking",
            "Causes clinically significant distress or impairment",
            "Not attributable to substance or medical condition",
            "Not better explained by another mental disorder",
            "May specify: with good/fair insight, poor insight, or absent insight/delusional",
            "May specify: automatic (without awareness) or focused (intentional)",
            "Duration typically chronic without treatment"
        ]
    }
}

def load_disorders():
    """Load disorders from JSON file."""
    if not DATA_FILE.exists():
        print(f"Error: {DATA_FILE} not found")
        sys.exit(1)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_disorders(disorders):
    """Save disorders to JSON file."""
    with open(DATA_FILE, 'w') as f:
        json.dump(disorders, f, indent=2, ensure_ascii=False)

def expand_disorder(disorder):
    """Expand a single disorder with comprehensive data."""
    slug = disorder['slug']
    if slug in COMPREHENSIVE_EXPANSIONS:
        exp = COMPREHENSIVE_EXPANSIONS[slug]
        disorder['description'] = exp['description']
        disorder['symptoms'] = json.dumps(exp['symptoms'])
        disorder['biologicalCauses'] = json.dumps(exp['biologicalCauses'])
        disorder['psychologicalCauses'] = json.dumps(exp['psychologicalCauses'])
        disorder['socialCauses'] = json.dumps(exp['socialCauses'])
        disorder['prevalence'] = exp['prevalence']
        disorder['ageOfOnset'] = exp['ageOfOnset']
        disorder['courseOfIllness'] = exp['courseOfIllness']
        disorder['riskFactors'] = json.dumps(exp['riskFactors'])
        disorder['protectiveFactors'] = json.dumps(exp['protectiveFactors'])
        disorder['comorbidities'] = json.dumps(exp['comorbidities'])
        disorder['naturalSolutions'] = json.dumps(exp['naturalSolutions'])
        disorder['nutritionalRecs'] = json.dumps(exp['nutritionalRecs'])
        disorder['therapyApproaches'] = json.dumps(exp['therapyApproaches'])
        disorder['whenToSeekHelp'] = json.dumps(exp['whenToSeekHelp'])
        disorder['crisisResources'] = json.dumps(exp['crisisResources'])
        disorder['researchLinks'] = json.dumps(exp['researchLinks'])
        disorder['dsmCriteria'] = json.dumps(exp['dsmCriteria'])
        return True
    return False

def count_symptoms(disorder):
    """Count symptoms in a disorder."""
    try:
        symptoms = json.loads(disorder['symptoms'])
        return len(symptoms)
    except:
        return 0

def main():
    print("Disorder Expansion Tool")
    print("=" * 50)
    
    # Load disorders
    print(f"Loading disorders from {DATA_FILE}...")
    disorders = load_disorders()
    
    # Find disorders needing expansion
    needs_expansion = [d for d in disorders if count_symptoms(d) < 10]
    print(f"Found {len(needs_expansion)} disorders needing expansion")
    
    # Expand disorders
    expanded_count = 0
    for disorder in disorders:
        if expand_disorder(disorder):
            expanded_count += 1
            symptom_count = count_symptoms(disorder)
            print(f"✓ Expanded: {disorder['name']} ({symptom_count} symptoms)")
    
    if expanded_count > 0:
        # Save updated disorders
        save_disorders(disorders)
        print(f"\n✓ Successfully expanded {expanded_count} disorder(s)")
    else:
        print("\n✓ No disorders expanded (all already have comprehensive data)")
    
    # Check remaining
    disorders = load_disorders()
    remaining = [d for d in disorders if count_symptoms(d) < 10]
    print(f"\nRemaining disorders to expand: {len(remaining)}")
    
    if remaining:
        print("\nDisorders still needing expansion:")
        for d in remaining[:10]:  # Show first 10
            print(f"  - {d['name']} ({d['slug']})")
        if len(remaining) > 10:
            print(f"  ... and {len(remaining) - 10} more")
        
        print("\n" + "=" * 50)
        print("To expand more disorders:")
        print("1. Add disorder expansions to COMPREHENSIVE_EXPANSIONS dict")
        print("2. Run this script again")
        print("3. Each expansion should include all required fields")
    else:
        print("\n✓ All disorders have comprehensive content!")

if __name__ == '__main__':
    main()
