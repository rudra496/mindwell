#!/usr/bin/env python3
"""
Script to add comprehensive details to 32 mental health disorders
that currently lack detailed information in disorders.json
"""

import json
from pathlib import Path

DATA_FILE = Path(__file__).parent / 'src' / 'data' / 'disorders.json'

# Comprehensive disorder expansions for the 32 disorders
DISORDER_EXPANSIONS = {
    "separation-anxiety-disorder": {
        "description": "Excessive fear or anxiety about separation from attachment figures that is developmentally inappropriate and causes significant distress or impairment in functioning.",
        "symptoms": [
            "Excessive distress when separation from home or attachment figures occurs or is anticipated",
            "Persistent and excessive worry about losing major attachment figures",
            "Persistent worry that something bad will happen leading to separation (e.g., getting lost, kidnapped)",
            "Reluctance or refusal to go out away from home due to fear of separation",
            "Fear of being alone or without attachment figures at home",
            "Reluctance or refusal to sleep away from home or without attachment figure nearby",
            "Nightmares involving themes of separation",
            "Physical symptoms (headaches, stomachaches, nausea, vomiting) when separation occurs or is anticipated",
            "Clinging behavior",
            "Shadow following of parent or caregiver",
            "Difficulty attending school or other activities",
            "Difficulty sleeping alone",
            "Tantrums when separation anticipated",
            "Excessive need for reassurance",
            "Panic attacks related to separation",
            "Social withdrawal due to fear of separation"
        ],
        "biologicalCauses": [
            "Genetic predisposition to anxiety disorders",
            "Overactive amygdala (fear center)",
            "Neurotransmitter imbalances (serotonin, GABA)",
            "Temperamental factors (behavioral inhibition)",
            "Brain differences in threat detection circuits",
            "Family history of anxiety disorders"
        ],
        "psychologicalCauses": [
            "Insecure attachment patterns",
            "Overprotective or enmeshed parenting",
            "Parental anxiety modeling",
            "Traumatic separation experiences",
            "Loss of important person or pet",
            "Catastrophic thinking about separation",
            "Lack of development of autonomy"
        ],
        "socialCauses": [
            "Major life stressors or transitions",
            "Death of family member or close friend",
            "Parental divorce or separation",
            "Moving to new home or school",
            "Illness in family",
            "Overprotective family environment",
            "Cultural factors",
            "Lack of opportunities for independence"
        ],
        "prevalence": "Approximately 4% of children, 1.6% of adolescents, and 0.9-1.9% of adults. More common in children and adolescents.",
        "ageOfOnset": "Typically begins in childhood before age 12, but can persist into or emerge in adulthood.",
        "courseOfIllness": "Can be chronic if untreated. Often improves with age but may persist or recur with stress. Early intervention important. May evolve into other anxiety disorders in adolescence/adulthood.",
        "riskFactors": [
            "Family history of anxiety disorders",
            "Temperamental inhibition or shyness",
            "Overprotective parenting",
            "Life stress or trauma",
            "Parental anxiety or depression",
            "Insecure attachment",
            "Loss experiences",
            "Chronic illness in child or family member"
        ],
        "protectiveFactors": [
            "Secure attachment relationships",
            "Gradual exposure to separations",
            "Independent coping skills",
            "Parental confidence and calmness",
            "Social support",
            "Early intervention",
            "Cognitive behavioral skills",
            "Positive peer relationships"
        ],
        "comorbidities": [
            "Generalized Anxiety Disorder (75%)",
            "Specific Phobia",
            "Social Anxiety Disorder",
            "Panic Disorder",
            "Major Depressive Disorder",
            "School refusal behavior"
        ],
        "naturalSolutions": [
            "Gradual exposure to separations (start brief, increase duration)",
            "Practice separations in safe, predictable ways",
            "Establish consistent goodbye routines",
            "Transitional objects (photo, special item)",
            "Build independence through age-appropriate tasks",
            "Teach coping skills (deep breathing, positive self-talk)",
            "Cognitive restructuring of catastrophic thoughts",
            "Reward brave behavior and separation success",
            "Maintain calm, confident parental demeanor during separations",
            "Create predictable schedules and routines",
            "Gradual sleep independence training",
            "Play-based therapy for younger children",
            "Social skills development",
            "Relaxation techniques",
            "Problem-solving skills training",
            "Parent-child communication improvement",
            "Support groups for children and parents",
            "Mindfulness for children",
            "School-based interventions",
            "Family activities building confidence"
        ],
        "nutritionalRecs": [
            "Balanced, nutritious diet",
            "Omega-3 fatty acids for brain health",
            "Magnesium-rich foods (calming effect)",
            "B-complex vitamins for stress response",
            "Adequate protein for neurotransmitter production",
            "Complex carbohydrates for stable mood",
            "Limit sugar and processed foods",
            "Avoid excessive caffeine (in older children/adolescents)",
            "Regular meal times for routine",
            "Adequate hydration",
            "Vitamin D if deficient",
            "Zinc for immune and mood support",
            "Probiotic foods for gut-brain axis",
            "Chamomile tea (for older children)",
            "Avoid stimulants"
        ],
        "therapyApproaches": [
            "Cognitive Behavioral Therapy (CBT) - most effective",
            "Exposure therapy (gradual separations)",
            "Parent-Child Interaction Therapy (PCIT)",
            "Family therapy",
            "Play therapy for younger children",
            "Behavioral interventions",
            "Cognitive restructuring",
            "Relaxation training",
            "SSRIs if severe (fluoxetine, sertraline)",
            "School-based interventions",
            "Psychoeducation for family",
            "Attachment-based therapy"
        ],
        "whenToSeekHelp": [
            "Refusing to attend school persistently",
            "Unable to be alone in any situation",
            "Significant distress causing impairment",
            "Physical symptoms regularly",
            "Sleep severely disrupted",
            "Social activities avoided",
            "Symptoms persist beyond 4 weeks",
            "Worsening over time",
            "Family stress high",
            "Depression developing",
            "Panic attacks occurring"
        ],
        "crisisResources": [
            "Anxiety and Depression Association: adaa.org",
            "Child Mind Institute: childmind.org",
            "SAMHSA National Helpline: 1-800-662-4357",
            "988 Suicide & Crisis Lifeline",
            "NAMI HelpLine: 1-800-950-6264",
            "School counselors and psychologists"
        ],
        "researchLinks": [
            "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
            "https://www.aacap.org/ - American Academy of Child & Adolescent Psychiatry",
            "https://pubmed.ncbi.nlm.nih.gov/28214594/ - CBT for separation anxiety",
            "https://childmind.org/guide/separation-anxiety-disorder/"
        ],
        "dsmCriteria": [
            "Developmentally inappropriate and excessive fear or anxiety about separation",
            "Lasting at least 4 weeks in children/adolescents, typically 6+ months in adults",
            "At least 3 of the following symptoms:",
            "1) Recurrent excessive distress when separation occurs or anticipated",
            "2) Persistent worry about losing attachment figures",
            "3) Persistent worry about events causing separation",
            "4) Reluctance/refusal to go out due to fear of separation",
            "5) Fear of being alone without attachment figure",
            "6) Reluctance/refusal to sleep away from home or attachment figure",
            "7) Nightmares involving separation themes",
            "8) Physical complaints when separation occurs or anticipated",
            "Causes clinically significant distress or impairment",
            "Not better explained by another mental disorder"
        ]
    },
    
    "illness-anxiety-disorder": {
        "description": "Illness Anxiety Disorder (formerly Hypochondriasis) is characterized by preoccupation with having or acquiring a serious illness despite minimal or no somatic symptoms. High health anxiety persists even with medical reassurance.",
        "symptoms": [
            "Preoccupation with having or getting a serious disease",
            "High anxiety about health",
            "Easily alarmed about health status",
            "Excessive health-related behaviors (checking body for signs of illness, seeking reassurance)",
            "Maladaptive avoidance (avoiding medical appointments, hospitals)",
            "Repeatedly checking body for signs of illness",
            "Excessive internet research about diseases",
            "Frequently discussing suspected illnesses",
            "Seeking multiple medical opinions ('doctor shopping')",
            "Minimal or no somatic symptoms present",
            "Preoccupation persists despite negative medical evaluation",
            "Preoccupation causes significant distress",
            "Impaired social and occupational functioning",
            "Misinterpretation of normal body sensations",
            "Fear of having undiagnosed serious disease",
            "Difficulty being reassured by medical professionals"
        ],
        "biologicalCauses": [
            "Genetic predisposition to anxiety",
            "Dysregulation of bodily sensations perception",
            "Altered interoceptive processing",
            "Serotonin system abnormalities",
            "Heightened somatic amplification",
            "Family history of anxiety disorders"
        ],
        "psychologicalCauses": [
            "Catastrophic interpretation of body sensations",
            "Intolerance of uncertainty about health",
            "Excessive attention to bodily sensations",
            "Health anxiety beliefs",
            "Prior experience with serious illness in self or others",
            "Childhood illness or medical trauma",
            "Anxiety sensitivity"
        ],
        "socialCauses": [
            "Serious illness or death in family",
            "Childhood experiences with illness",
            "Media exposure to health threats",
            "Access to health information online",
            "Stressful life events",
            "Modeling of health anxiety by parents",
            "Cultural factors regarding health"
        ],
        "prevalence": "1-2% of general population. Equally common in men and women. Often begins in early to middle adulthood.",
        "ageOfOnset": "Most commonly begins in early adulthood (20s-30s), but can emerge at any age.",
        "courseOfIllness": "Usually chronic with waxing and waning symptoms. May worsen with stress or exposure to illness. Can improve with treatment but relapses common.",
        "riskFactors": [
            "History of childhood illness",
            "Serious illness in family member",
            "Major health anxiety in parents",
            "History of sexual or physical abuse",
            "Other anxiety disorders",
            "Stressful life events",
            "Trait anxiety",
            "Excessive health information seeking"
        ],
        "protectiveFactors": [
            "Cognitive behavioral therapy",
            "Healthy relationship with healthcare provider",
            "Stress management skills",
            "Limited health information seeking",
            "Strong social support",
            "Tolerance of uncertainty",
            "Mindfulness practice",
            "Early intervention"
        ],
        "comorbidities": [
            "Generalized Anxiety Disorder (common)",
            "Major Depressive Disorder",
            "Panic Disorder",
            "Obsessive-Compulsive Disorder",
            "Somatic Symptom Disorder",
            "Specific Phobia (medical procedures)"
        ],
        "naturalSolutions": [
            "Limit health-related internet searches (set specific time limits)",
            "Cognitive restructuring of catastrophic thoughts",
            "Reduce body checking behaviors",
            "Mindfulness meditation to accept body sensations",
            "Establish regular healthcare visits (not excessive)",
            "Anxiety management techniques",
            "Acceptance of normal body sensations",
            "Reduce reassurance seeking from others",
            "Exposure to health anxiety triggers without checking",
            "Keep worry diary to identify patterns",
            "Regular exercise for stress reduction",
            "Relaxation techniques",
            "Challenge catastrophic thinking",
            "Develop tolerance for uncertainty",
            "Focus attention externally",
            "Support groups",
            "Postpone checking behaviors",
            "Behavioral experiments to test fears",
            "Distraction techniques",
            "Self-compassion practice"
        ],
        "nutritionalRecs": [
            "Balanced, nutritious diet",
            "Limit caffeine (can increase anxiety and body sensations)",
            "Avoid alcohol",
            "Omega-3 fatty acids for anxiety",
            "Magnesium-rich foods",
            "B-complex vitamins",
            "Regular meals to avoid blood sugar fluctuations",
            "Adequate hydration",
            "Limit processed foods",
            "Probiotic foods for gut health",
            "Anti-inflammatory diet",
            "Chamomile tea for relaxation",
            "L-theanine",
            "Vitamin D if deficient",
            "Avoid supplements claiming miracle cures"
        ],
        "therapyApproaches": [
            "Cognitive Behavioral Therapy (CBT) - most effective",
            "Exposure and Response Prevention (ERP)",
            "Cognitive therapy focused on health beliefs",
            "Mindfulness-Based Cognitive Therapy",
            "Acceptance and Commitment Therapy (ACT)",
            "Psychoeducation about health anxiety",
            "Behavioral experiments",
            "Attention training",
            "SSRIs (paroxetine, fluoxetine, sertraline)",
            "SNRIs",
            "Group CBT",
            "Stress management training"
        ],
        "whenToSeekHelp": [
            "Preoccupation with illness persists for 6+ months",
            "Excessive medical visits or tests",
            "Avoiding medical care due to anxiety",
            "Significant distress or impairment",
            "Relationships affected",
            "Unable to work due to health worries",
            "Depression developing",
            "Quality of life severely impacted",
            "Excessive reassurance seeking",
            "Health anxiety worsening",
            "Using internet excessively for health research"
        ],
        "crisisResources": [
            "Anxiety and Depression Association: adaa.org",
            "SAMHSA National Helpline: 1-800-662-4357",
            "988 Suicide & Crisis Lifeline",
            "International OCD Foundation: iocdf.org (health anxiety resources)",
            "NAMI HelpLine: 1-800-950-6264"
        ],
        "researchLinks": [
            "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
            "https://adaa.org/understanding-anxiety/illness-anxiety-disorder",
            "https://pubmed.ncbi.nlm.nih.gov/30005170/ - CBT for health anxiety",
            "https://www.psychiatry.org/patients-families/somatic-symptom-disorder"
        ],
        "dsmCriteria": [
            "Preoccupation with having or acquiring a serious illness",
            "Somatic symptoms are not present or, if present, only mild intensity",
            "High level of anxiety about health",
            "Excessive health-related behaviors (checking, seeking reassurance) OR maladaptive avoidance",
            "Illness preoccupation present for at least 6 months",
            "Preoccupation not better explained by another mental disorder",
            "Specify if: Care-seeking type (medical care frequently used) or Care-avoidant type (medical care rarely used)",
            "Causes clinically significant distress or impairment"
        ]
    }
}

def load_disorders():
    """Load disorders from JSON file."""
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_disorders(disorders):
    """Save disorders to JSON file."""
    with open(DATA_FILE, 'w') as f:
        json.dump(disorders, f, indent=2, ensure_ascii=False)

def update_disorder(disorder, slug, expansion):
    """Update a single disorder with comprehensive data."""
    disorder['description'] = expansion['description']
    disorder['symptoms'] = json.dumps(expansion['symptoms'])
    disorder['biologicalCauses'] = json.dumps(expansion['biologicalCauses'])
    disorder['psychologicalCauses'] = json.dumps(expansion['psychologicalCauses'])
    disorder['socialCauses'] = json.dumps(expansion['socialCauses'])
    disorder['prevalence'] = expansion['prevalence']
    disorder['ageOfOnset'] = expansion['ageOfOnset']
    disorder['courseOfIllness'] = expansion['courseOfIllness']
    disorder['riskFactors'] = json.dumps(expansion['riskFactors'])
    disorder['protectiveFactors'] = json.dumps(expansion['protectiveFactors'])
    disorder['comorbidities'] = json.dumps(expansion['comorbidities'])
    disorder['naturalSolutions'] = json.dumps(expansion['naturalSolutions'])
    disorder['nutritionalRecs'] = json.dumps(expansion['nutritionalRecs'])
    disorder['therapyApproaches'] = json.dumps(expansion['therapyApproaches'])
    disorder['whenToSeekHelp'] = json.dumps(expansion['whenToSeekHelp'])
    disorder['crisisResources'] = json.dumps(expansion['crisisResources'])
    disorder['researchLinks'] = json.dumps(expansion['researchLinks'])
    disorder['dsmCriteria'] = json.dumps(expansion['dsmCriteria'])
    return disorder

def main():
    print("Loading disorders...")
    disorders = load_disorders()
    
    updated_count = 0
    for disorder in disorders:
        slug = disorder['slug']
        if slug in DISORDER_EXPANSIONS:
            update_disorder(disorder, slug, DISORDER_EXPANSIONS[slug])
            updated_count += 1
            print(f"✓ Updated: {disorder['name']}")
    
    if updated_count > 0:
        save_disorders(disorders)
        print(f"\n✓ Successfully updated {updated_count} disorder(s)")
    else:
        print("\nNo disorders updated")

if __name__ == '__main__':
    main()
