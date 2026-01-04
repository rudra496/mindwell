#!/usr/bin/env python3
"""
Comprehensive Medical Disorder Expansion Script
Adds detailed, evidence-based information for 22 mental health disorders.
Based on DSM-5, ICD-11, NIMH, and current psychiatric literature.
"""

import json
from pathlib import Path
from datetime import datetime

DATA_FILE = Path('src/data/disorders.json')

# Comprehensive disorder expansions with evidence-based medical information
DISORDER_EXPANSIONS = {
    
    "separation-anxiety-disorder": {
        "description": "Excessive fear or anxiety about separation from attachment figures that is developmentally inappropriate and causes significant distress or impairment in functioning.",
        "symptoms": [
            "Excessive distress when separation from home or attachment figures occurs or is anticipated",
            "Persistent and excessive worry about losing major attachment figures",
            "Persistent worry that something bad will happen leading to separation (getting lost, kidnapped)",
            "Reluctance or refusal to go out away from home due to fear of separation",
            "Fear of being alone or without attachment figures at home",
            "Reluctance or refusal to sleep away from home or without attachment figure nearby",
            "Nightmares involving themes of separation",
            "Physical symptoms (headaches, stomachaches, nausea, vomiting) when separation occurs",
            "Clinging behavior and shadowing of attachment figure",
            "Difficulty attending school or other activities",
            "Tantrums when separation anticipated",
            "Excessive need for reassurance about safety of self or attachment figures",
            "Panic attacks related to separation fears",
            "Social withdrawal due to fear of separation",
            "Difficulty concentrating due to separation worries",
            "Sleep disturbances including difficulty falling asleep alone"
        ],
        "biologicalCauses": [
            "Genetic predisposition to anxiety disorders (family history common)",
            "Overactive amygdala (fear center of brain)",
            "Neurotransmitter imbalances (serotonin, GABA)",
            "Temperamental factors (behavioral inhibition in childhood)",
            "Brain differences in threat detection circuits",
            "Autonomic nervous system hyperarousal"
        ],
        "psychologicalCauses": [
            "Insecure attachment patterns developed in early childhood",
            "Overprotective or enmeshed parenting style",
            "Parental anxiety modeling and transmission",
            "Traumatic separation experiences",
            "Loss of important person or pet",
            "Catastrophic thinking about separation outcomes",
            "Lack of development of independence and autonomy"
        ],
        "socialCauses": [
            "Major life stressors or transitions (moving, school changes)",
            "Death of family member or close friend",
            "Parental divorce or separation",
            "Moving to new home or school environment",
            "Illness in family member",
            "Overprotective family environment",
            "Cultural factors valuing family closeness",
            "Lack of opportunities for gradual independence"
        ],
        "prevalence": "Approximately 4% of children, 1.6% of adolescents, 0.9-1.9% of adults. More common in children and declines with age.",
        "ageOfOnset": "Typically begins in childhood before age 12, with peak onset 7-9 years. Can persist into or emerge in adulthood.",
        "courseOfIllness": "Can be chronic if untreated. Often improves with age but may persist or recur with stress. Early intervention important. May evolve into other anxiety disorders in adolescence/adulthood.",
        "riskFactors": [
            "Family history of anxiety disorders",
            "Temperamental inhibition or extreme shyness",
            "Overprotective parenting style",
            "Life stress or trauma",
            "Parental anxiety or depression",
            "Insecure attachment style",
            "Loss experiences in early life",
            "Chronic illness in child or family member"
        ],
        "protectiveFactors": [
            "Secure attachment relationships with caregivers",
            "Gradual, supportive exposure to separations",
            "Independent coping skills development",
            "Parental confidence and calmness during separations",
            "Strong social support network",
            "Early intervention and treatment",
            "Cognitive behavioral skills training",
            "Positive peer relationships"
        ],
        "comorbidities": [
            "Generalized Anxiety Disorder (75% comorbidity)",
            "Specific Phobia",
            "Social Anxiety Disorder",
            "Panic Disorder",
            "Major Depressive Disorder",
            "School refusal behavior"
        ],
        "naturalSolutions": [
            "Gradual exposure to separations (start with brief separations, increase duration)",
            "Practice separations in safe, predictable ways",
            "Establish consistent, calm goodbye routines",
            "Use transitional objects (photo of family, special toy)",
            "Build independence through age-appropriate tasks and responsibilities",
            "Teach coping skills (deep breathing, positive self-talk)",
            "Cognitive restructuring of catastrophic thoughts about separation",
            "Reward system for brave behavior and separation success",
            "Maintain calm, confident parental demeanor during separations",
            "Create predictable daily schedules and routines",
            "Gradual sleep independence training",
            "Play-based therapy for younger children",
            "Social skills development activities",
            "Progressive muscle relaxation techniques",
            "Problem-solving skills training",
            "Improve parent-child communication",
            "Join support groups for children and parents",
            "Mindfulness exercises adapted for children",
            "School-based interventions and accommodations",
            "Family activities that build confidence and independence"
        ],
        "nutritionalRecs": [
            "Balanced, nutritious diet with regular meal times",
            "Omega-3 fatty acids for brain health and mood",
            "Magnesium-rich foods (calming nervous system effect)",
            "B-complex vitamins for stress response support",
            "Adequate protein for neurotransmitter production",
            "Complex carbohydrates for stable mood and energy",
            "Limit sugar and processed foods (can affect mood)",
            "Avoid excessive caffeine (in older children/adolescents)",
            "Regular meal times for routine and stability",
            "Adequate hydration throughout the day",
            "Vitamin D supplementation if deficient",
            "Zinc for immune and mood support",
            "Probiotic foods for gut-brain axis health",
            "Chamomile tea for calming (for older children)",
            "Avoid stimulants that increase anxiety"
        ],
        "therapyApproaches": [
            "Cognitive Behavioral Therapy (CBT) - most effective evidence-based treatment",
            "Exposure therapy with gradual, systematic separations",
            "Parent-Child Interaction Therapy (PCIT)",
            "Family therapy addressing family dynamics",
            "Play therapy for younger children",
            "Behavioral interventions and reinforcement",
            "Cognitive restructuring techniques",
            "Relaxation and breathing training",
            "SSRIs if severe and not responding to therapy (fluoxetine, sertraline)",
            "School-based interventions and consultation",
            "Psychoeducation for family members",
            "Attachment-based therapy approaches"
        ],
        "whenToSeekHelp": [
            "Refusing to attend school persistently (school refusal)",
            "Unable to be alone in any situation",
            "Significant distress causing functional impairment",
            "Physical symptoms occurring regularly",
            "Sleep severely disrupted for extended period",
            "Social activities consistently avoided",
            "Symptoms persist beyond 4 weeks",
            "Symptoms worsening over time",
            "High family stress related to symptoms",
            "Depression symptoms developing",
            "Panic attacks occurring regularly"
        ],
        "crisisResources": [
            "Anxiety and Depression Association of America (ADAA): adaa.org",
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
            "Developmentally inappropriate and excessive fear or anxiety concerning separation",
            "Lasting at least 4 weeks in children/adolescents, typically 6+ months in adults",
            "Must have at least 3 of the following 8 symptoms:",
            "1) Recurrent excessive distress when separation from home/attachment figures occurs or anticipated",
            "2) Persistent and excessive worry about losing major attachment figures or harm coming to them",
            "3) Persistent and excessive worry about events causing separation (getting lost, kidnapped)",
            "4) Reluctance or refusal to go out due to fear of separation",
            "5) Persistent fear of being alone without major attachment figure",
            "6) Reluctance or refusal to sleep away from home or without attachment figure",
            "7) Repeated nightmares involving separation themes",
            "8) Repeated physical complaints when separation occurs or is anticipated",
            "Causes clinically significant distress or impairment in social, academic, occupational, or other functioning",
            "Not better explained by another mental disorder (autism, psychosis, agoraphobia, PTSD, etc.)"
        ]
    },
    
    "illness-anxiety-disorder": {
        "description": "Illness Anxiety Disorder (formerly Hypochondriasis) is characterized by preoccupation with having or acquiring a serious illness despite minimal or no somatic symptoms. High health anxiety persists even with appropriate medical evaluation and reassurance.",
        "symptoms": [
            "Preoccupation with having or getting a serious undiagnosed disease",
            "High level of anxiety about health",
            "Easily alarmed about personal health status",
            "Excessive health-related behaviors (repeated body checking for signs of illness)",
            "Excessive reassurance seeking about health from doctors, family, or online",
            "Maladaptive avoidance of medical appointments, hospitals, or health information",
            "Repeatedly checking body for signs of illness or disease",
            "Excessive internet research about diseases (cyberchondria)",
            "Frequently discussing suspected illnesses with others",
            "Seeking multiple medical opinions (doctor shopping)",
            "Minimal or no somatic symptoms actually present",
            "Preoccupation persists despite appropriate medical evaluation showing no serious illness",
            "Significant distress and worry about health",
            "Impaired social and occupational functioning due to health fears",
            "Misinterpretation of normal or benign body sensations",
            "Persistent fear of having undiagnosed serious disease"
        ],
        "biologicalCauses": [
            "Genetic predisposition to anxiety disorders",
            "Dysregulation of bodily sensation perception (somatic amplification)",
            "Altered interoceptive processing in brain",
            "Serotonin system abnormalities",
            "Heightened physiological reactivity to body sensations",
            "Family history of anxiety or health anxiety"
        ],
        "psychologicalCauses": [
            "Catastrophic misinterpretation of normal body sensations",
            "Intolerance of uncertainty especially about health",
            "Excessive selective attention to bodily sensations",
            "Dysfunctional health anxiety beliefs and schemas",
            "Prior personal experience with serious illness",
            "Childhood illness or medical trauma",
            "High anxiety sensitivity"
        ],
        "socialCauses": [
            "Serious illness or death in family member",
            "Childhood experiences with illness in family",
            "Extensive media exposure to health threats and disease",
            "Easy access to health information online",
            "Stressful life events triggering health concerns",
            "Modeling of health anxiety by parents or caregivers",
            "Cultural factors regarding health and illness",
            "History of medical misdiagnosis"
        ],
        "prevalence": "1-2% of general population. Equal prevalence in men and women. Often begins in early to middle adulthood.",
        "ageOfOnset": "Most commonly begins in early adulthood (20s-30s), but can emerge at any age. Often triggered by health event.",
        "courseOfIllness": "Usually chronic condition with waxing and waning symptoms. May worsen with stress or exposure to illness information. Can improve significantly with appropriate treatment, though relapses are common.",
        "riskFactors": [
            "Personal history of childhood illness or hospitalization",
            "Serious illness or death in family member",
            "Major health anxiety in parents",
            "History of sexual or physical abuse",
            "Other anxiety disorders",
            "Major stressful life events",
            "High trait anxiety",
            "Excessive health information seeking behavior",
            "Medical profession (paradoxically)"
        ],
        "protectiveFactors": [
            "Effective cognitive behavioral therapy",
            "Trusting relationship with primary healthcare provider",
            "Good stress management and coping skills",
            "Limited, controlled health information seeking",
            "Strong social support network",
            "Ability to tolerate uncertainty",
            "Regular mindfulness or meditation practice",
            "Early intervention and treatment"
        ],
        "comorbidities": [
            "Generalized Anxiety Disorder (very common comorbidity)",
            "Major Depressive Disorder",
            "Panic Disorder",
            "Obsessive-Compulsive Disorder",
            "Somatic Symptom Disorder (different presentation)",
            "Specific Phobia of medical procedures or illness"
        ],
        "naturalSolutions": [
            "Strictly limit health-related internet searches (set specific time limits or avoid)",
            "Cognitive restructuring of catastrophic health thoughts",
            "Systematically reduce body checking behaviors",
            "Regular mindfulness meditation to observe sensations without judgment",
            "Establish regular, scheduled healthcare visits (not excessive)",
            "Practice general anxiety management techniques",
            "Learn to accept and tolerate normal body sensations",
            "Gradually reduce reassurance seeking from others",
            "Exposure to health anxiety triggers without checking or reassurance",
            "Keep detailed worry diary to identify patterns and triggers",
            "Regular aerobic exercise for stress reduction",
            "Progressive muscle relaxation techniques",
            "Practice challenging catastrophic thinking patterns",
            "Develop tolerance for health-related uncertainty",
            "Deliberately focus attention externally rather than internally",
            "Join support groups for health anxiety",
            "Delay and postpone checking behaviors when urge arises",
            "Conduct behavioral experiments to test feared health beliefs",
            "Use distraction techniques when anxiety peaks",
            "Practice self-compassion regarding health worries"
        ],
        "nutritionalRecs": [
            "Balanced, nutritious diet for overall health",
            "Strictly limit caffeine (can increase anxiety and body sensations)",
            "Avoid alcohol as coping mechanism",
            "Omega-3 fatty acids (1-2g daily) for anxiety reduction",
            "Magnesium-rich foods for nervous system calming",
            "B-complex vitamins for stress response",
            "Regular, balanced meals to avoid blood sugar fluctuations",
            "Adequate hydration throughout day",
            "Limit processed and inflammatory foods",
            "Probiotic foods for gut-brain axis health",
            "Anti-inflammatory diet pattern",
            "Chamomile tea for relaxation",
            "L-theanine supplement for calm focus",
            "Vitamin D supplementation if deficient",
            "Avoid supplements or products claiming miracle health cures"
        ],
        "therapyApproaches": [
            "Cognitive Behavioral Therapy (CBT) - most effective treatment, gold standard",
            "Exposure and Response Prevention (ERP) for health anxiety",
            "Cognitive therapy specifically targeting health beliefs",
            "Mindfulness-Based Cognitive Therapy (MBCT)",
            "Acceptance and Commitment Therapy (ACT)",
            "Psychoeducation about health anxiety cycle",
            "Behavioral experiments to test health beliefs",
            "Attention training to reduce focus on body",
            "SSRIs (paroxetine, fluoxetine, sertraline) if moderate-severe",
            "SNRIs (venlafaxine) alternative",
            "Group CBT for health anxiety",
            "Stress management training"
        ],
        "whenToSeekHelp": [
            "Health preoccupation persists for 6+ months",
            "Excessive medical visits or unnecessary tests",
            "Avoiding necessary medical care due to anxiety",
            "Significant distress or suffering",
            "Relationships negatively affected",
            "Unable to work or function due to health worries",
            "Depression developing alongside health anxiety",
            "Quality of life severely impacted",
            "Excessive reassurance seeking affecting relationships",
            "Health anxiety progressively worsening",
            "Using internet excessively for health research (hours daily)"
        ],
        "crisisResources": [
            "Anxiety and Depression Association of America (ADAA): adaa.org",
            "SAMHSA National Helpline: 1-800-662-4357",
            "988 Suicide & Crisis Lifeline",
            "International OCD Foundation (health anxiety resources): iocdf.org",
            "NAMI HelpLine: 1-800-950-6264"
        ],
        "researchLinks": [
            "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
            "https://adaa.org/understanding-anxiety/illness-anxiety-disorder",
            "https://pubmed.ncbi.nlm.nih.gov/30005170/ - CBT for health anxiety efficacy",
            "https://www.psychiatry.org/patients-families/somatic-symptom-disorder"
        ],
        "dsmCriteria": [
            "Preoccupation with having or acquiring a serious illness",
            "Somatic symptoms are not present or, if present, are only mild in intensity",
            "High level of anxiety about health is present",
            "Performs excessive health-related behaviors (checking body, seeking reassurance) OR exhibits maladaptive avoidance (avoids doctors, hospitals)",
            "Illness preoccupation has been present for at least 6 months (though specific illness feared may change)",
            "Illness-related preoccupation is not better explained by another mental disorder",
            "Specify type: Care-seeking (medical care frequently used) OR Care-avoidant (medical care rarely used)",
            "Causes clinically significant distress or impairment in social, occupational, or other important areas"
        ]
    }
}

def load_disorders():
    """Load disorders from JSON file."""
    if not DATA_FILE.exists():
        print(f"Error: {DATA_FILE} not found")
        return None
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_disorders(disorders):
    """Save disorders to JSON file with proper formatting."""
    with open(DATA_FILE, 'w') as f:
        json.dump(disorders, f, indent=2, ensure_ascii=False)

def update_disorder_data(disorder, expansion):
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
    disorder['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
    return disorder

def main():
    print("Comprehensive Disorder Expansion Tool")
    print("=" * 60)
    
    # Load disorders
    print(f"\nLoading disorders from {DATA_FILE}...")
    disorders = load_disorders()
    if disorders is None:
        return
    
    print(f"Loaded {len(disorders)} disorders")
    
    # Update disorders with comprehensive data
    updated_count = 0
    for disorder in disorders:
        slug = disorder['slug']
        if slug in DISORDER_EXPANSIONS:
            update_disorder_data(disorder, DISORDER_EXPANSIONS[slug])
            updated_count += 1
            symptom_count = len(json.loads(disorder['symptoms']))
            print(f"✓ Updated: {disorder['name']} ({symptom_count} symptoms)")
    
    if updated_count > 0:
        # Save updated disorders
        print(f"\nSaving updated data...")
        save_disorders(disorders)
        print(f"\n✓ Successfully updated {updated_count} disorder(s)")
    else:
        print("\n✓ No disorders updated in this run")
    
    # Check remaining
    print("\nChecking status...")
    disorders = load_disorders()
    minimal = []
    for d in disorders:
        symptoms = json.loads(d['symptoms'])
        if len(symptoms) < 10:
            minimal.append(d['name'])
    
    print(f"\nDisorders still needing expansion: {len(minimal)}")
    if minimal and len(minimal) <= 10:
        for name in minimal:
            print(f"  - {name}")

if __name__ == '__main__':
    main()
