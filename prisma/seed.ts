import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Seed Disorders
  console.log('📚 Seeding mental health disorders...')
  
  const disorders = [
    // MOOD DISORDERS (8)
    {
      slug: 'major-depressive-disorder',
      name: 'Major Depressive Disorder (MDD)',
      category: 'Mood Disorders',
      description: 'A mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.',
      symptoms: JSON.stringify([
        'Persistent sad, anxious, or empty mood',
        'Loss of interest or pleasure in hobbies and activities',
        'Significant weight loss or gain',
        'Insomnia or excessive sleeping',
        'Psychomotor agitation or retardation',
        'Fatigue or loss of energy',
        'Feelings of worthlessness or excessive guilt',
        'Diminished ability to think or concentrate',
        'Recurrent thoughts of death or suicide',
        'Irritability or frustration',
        'Difficulty making decisions',
        'Physical aches and pains without clear cause',
        'Digestive problems',
        'Reduced appetite',
        'Social withdrawal'
      ]),
      biologicalCauses: JSON.stringify([
        'Imbalance in neurotransmitters (serotonin, norepinephrine, dopamine)',
        'Genetic predisposition (40% heritability)',
        'Brain structure abnormalities in hippocampus, amygdala, and prefrontal cortex',
        'Hormonal changes (thyroid, cortisol dysregulation)',
        'Inflammation and immune system dysfunction',
        'Circadian rhythm disruptions'
      ]),
      psychologicalCauses: JSON.stringify([
        'Negative thinking patterns and cognitive distortions',
        'Learned helplessness',
        'Low self-esteem',
        'History of trauma or abuse',
        'Chronic stress',
        'Perfectionism and high self-criticism'
      ]),
      socialCauses: JSON.stringify([
        'Loss of loved one or relationship breakup',
        'Social isolation and loneliness',
        'Financial difficulties',
        'Job loss or work stress',
        'Lack of social support',
        'Discrimination or marginalization',
        'Childhood adversity'
      ]),
      prevalence: '7.1% of U.S. adults (17.3 million) had at least one major depressive episode in 2017 (NIMH)',
      ageOfOnset: 'Median age of onset is 32 years, but can occur at any age',
      courseOfIllness: 'Episodes typically last 6-12 months if untreated. 50% experience recurrence. With treatment, symptoms often improve within weeks.',
      riskFactors: JSON.stringify([
        'Family history of depression',
        'Previous depressive episodes',
        'Chronic medical conditions',
        'Substance abuse',
        'Major life stressors',
        'Lack of social support',
        'Female gender (2x higher risk)',
        'History of trauma'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support network',
        'Regular physical exercise',
        'Healthy sleep patterns',
        'Stress management skills',
        'Sense of purpose and meaning',
        'Access to mental health care',
        'Problem-solving skills',
        'Emotional regulation abilities'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (50-60%)',
        'Substance use disorders',
        'Eating disorders',
        'PTSD',
        'Chronic pain conditions',
        'Cardiovascular disease',
        'Diabetes',
        'Personality disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular aerobic exercise (30 min, 3-5x/week)',
        'Light therapy for SAD (10,000 lux, 30 min/day)',
        'Sleep hygiene practices',
        'Mindfulness meditation (20 min/day)',
        'Social connection and activities',
        'Time in nature (forest bathing)',
        'Gratitude journaling',
        'Behavioral activation (scheduling pleasant activities)',
        'Cognitive restructuring exercises',
        'Deep breathing techniques',
        'Progressive muscle relaxation',
        'Yoga and tai chi',
        'Art and music therapy',
        'Pet therapy',
        'Volunteer work and helping others',
        'Establishing daily routines',
        'Limiting alcohol and caffeine',
        'Morning sunlight exposure',
        'Cold water therapy',
        'Acupuncture (evidence shows benefit for some)'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (EPA/DHA from fish oil, 1-2g/day)',
        'Vitamin D (2000-4000 IU/day if deficient)',
        'B-complex vitamins (especially B12, folate)',
        'Magnesium-rich foods (leafy greens, nuts, seeds)',
        'Probiotic foods (yogurt, kefir, sauerkraut)',
        'Mediterranean diet pattern',
        'Complex carbohydrates (whole grains, legumes)',
        'Tryptophan-rich foods (turkey, eggs, cheese)',
        'Zinc-rich foods (oysters, beef, pumpkin seeds)',
        'Limit processed foods and added sugars',
        'Reduce caffeine intake',
        'Stay hydrated (8+ glasses water/day)',
        'Regular meal timing',
        'Saffron supplementation (30mg/day)',
        'St. John\'s Wort (consult doctor, drug interactions)'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - Gold standard',
        'Behavioral Activation Therapy',
        'Interpersonal Therapy (IPT)',
        'Mindfulness-Based Cognitive Therapy (MBCT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Problem-Solving Therapy',
        'Psychodynamic therapy',
        'Group therapy',
        'Antidepressant medications (SSRIs, SNRIs)',
        'Electroconvulsive therapy (ECT) for severe cases',
        'Transcranial magnetic stimulation (TMS)',
        'Combination of therapy and medication often most effective'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms persist for more than 2 weeks',
        'Symptoms interfere with daily functioning',
        'Thoughts of death or suicide',
        'Unable to care for yourself',
        'Substance use to cope',
        'Physical symptoms without medical cause',
        'Relationship or work problems',
        'Feelings of hopelessness or worthlessness',
        'Previous treatment not working',
        'Support system is concerned'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Veterans Crisis Line: 988 then press 1',
        'Emergency: 911 or nearest emergency room'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/depression',
        'https://pubmed.ncbi.nlm.nih.gov/29477251/ - Exercise for depression',
        'https://pubmed.ncbi.nlm.nih.gov/31046033/ - Omega-3 for depression',
        'https://www.cochrane.org/CD008418/DEPRESSN_cognitive-behavioural-therapy-depression'
      ]),
      dsmCriteria: JSON.stringify([
        'Five or more symptoms during 2-week period (at least one is depressed mood or loss of interest)',
        'Depressed mood most of the day',
        'Markedly diminished interest or pleasure',
        'Significant weight loss/gain',
        'Insomnia or hypersomnia',
        'Psychomotor agitation or retardation',
        'Fatigue or energy loss',
        'Feelings of worthlessness or guilt',
        'Diminished concentration',
        'Recurrent thoughts of death',
        'Symptoms cause significant distress or impairment',
        'Not attributable to substance or medical condition'
      ])
    },
    {
      slug: 'generalized-anxiety-disorder',
      name: 'Generalized Anxiety Disorder (GAD)',
      category: 'Anxiety Disorders',
      description: 'Excessive anxiety and worry about various activities or events, occurring more days than not for at least 6 months.',
      symptoms: JSON.stringify([
        'Excessive worry that\'s difficult to control',
        'Restlessness or feeling on edge',
        'Being easily fatigued',
        'Difficulty concentrating or mind going blank',
        'Irritability',
        'Muscle tension',
        'Sleep disturbance',
        'Racing heart or palpitations',
        'Shortness of breath',
        'Trembling or shaking',
        'Sweating',
        'Nausea or abdominal distress',
        'Dizziness or lightheadedness',
        'Hypervigilance',
        'Anticipatory anxiety'
      ]),
      biologicalCauses: JSON.stringify([
        'Overactive amygdala (fear center)',
        'Imbalance in GABA and serotonin',
        'Genetic factors (30% heritability)',
        'Dysregulation of HPA axis (stress response)',
        'Autonomic nervous system hyperactivity',
        'Brain circuit abnormalities in threat detection'
      ]),
      psychologicalCauses: JSON.stringify([
        'Intolerance of uncertainty',
        'Negative beliefs about worry',
        'Perfectionism',
        'Need for control',
        'Catastrophic thinking',
        'Attentional bias to threat'
      ]),
      socialCauses: JSON.stringify([
        'Chronic stress',
        'Childhood trauma or adversity',
        'Overprotective parenting',
        'Modeling anxious behavior',
        'Major life transitions',
        'Financial instability',
        'Work pressure'
      ]),
      prevalence: '3.1% of U.S. adults, 5.7% lifetime prevalence (NIMH)',
      ageOfOnset: 'Median age of onset is 30 years',
      courseOfIllness: 'Chronic condition with waxing and waning symptoms. Often co-occurs with depression.',
      riskFactors: JSON.stringify([
        'Family history of anxiety',
        'Shy or behavioral inhibition in childhood',
        'Negative life events',
        'Female gender (2x risk)',
        'Other mental health disorders',
        'Chronic medical conditions',
        'Substance use'
      ]),
      protectiveFactors: JSON.stringify([
        'Stress management skills',
        'Social support',
        'Regular exercise',
        'Healthy coping strategies',
        'Mindfulness practice',
        'Good sleep hygiene',
        'Problem-solving skills'
      ]),
      comorbidities: JSON.stringify([
        'Major depression (60%)',
        'Other anxiety disorders',
        'Substance use disorders',
        'Irritable bowel syndrome',
        'Chronic pain',
        'Cardiovascular disease'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular exercise (especially aerobic)',
        'Deep breathing exercises (4-7-8 breathing)',
        'Progressive muscle relaxation',
        'Mindfulness meditation',
        'Yoga',
        'Limit caffeine and alcohol',
        'Regular sleep schedule',
        'Time management strategies',
        'Journaling worries',
        'Challenge catastrophic thoughts',
        'Grounding techniques (5-4-3-2-1)',
        'Schedule "worry time"',
        'Nature exposure',
        'Social connection',
        'Limit news/social media',
        'Massage therapy',
        'Aromatherapy (lavender)',
        'Biofeedback',
        'Guided imagery',
        'Tai chi'
      ]),
      nutritionalRecs: JSON.stringify([
        'Magnesium-rich foods (calming effect)',
        'Omega-3 fatty acids',
        'Chamomile tea',
        'Green tea (L-theanine)',
        'Avoid excessive caffeine',
        'Limit alcohol',
        'Complex carbohydrates',
        'Probiotic foods (gut-brain axis)',
        'B-vitamins',
        'Tryptophan foods',
        'Stay hydrated',
        'Regular meals (avoid blood sugar crashes)',
        'Ashwagandha supplement',
        'Passionflower',
        'Valerian root'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - First-line',
        'Acceptance and Commitment Therapy (ACT)',
        'Mindfulness-Based Stress Reduction (MBSR)',
        'Intolerance of Uncertainty Therapy',
        'Relaxation training',
        'Worry exposure',
        'Medications: SSRIs, SNRIs, or buspirone',
        'Benzodiazepines (short-term only)',
        'Applied relaxation'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Worry interferes with daily life',
        'Physical symptoms are distressing',
        'Avoiding situations due to anxiety',
        'Sleep problems persist',
        'Using substances to cope',
        'Impact on relationships or work',
        'Symptoms present for 6+ months',
        'Co-occurring depression',
        'Quality of life significantly reduced'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association (ADAA): resources at adaa.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/28402827/ - CBT for GAD',
        'https://www.cochrane.org/CD007938/DEPRESSN_psychological-therapies-generalised-anxiety-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Excessive anxiety and worry for 6+ months',
        'Difficult to control worry',
        'Associated with 3+ symptoms (restlessness, fatigue, concentration, irritability, muscle tension, sleep disturbance)',
        'Causes significant distress or impairment',
        'Not attributable to substances or medical condition',
        'Not better explained by another mental disorder'
      ])
    },
    // TRAUMA & STRESS DISORDERS
    {
      slug: 'ptsd',
      name: 'Post-Traumatic Stress Disorder (PTSD)',
      category: 'Trauma & Stress Disorders',
      description: 'A mental health condition triggered by experiencing or witnessing a terrifying event, characterized by intrusive memories, avoidance, negative changes in thinking and mood, and hyperarousal.',
      symptoms: JSON.stringify([
        'Intrusive memories of traumatic event',
        'Recurrent distressing nightmares',
        'Flashbacks (feeling like event is happening again)',
        'Severe distress to trauma reminders',
        'Physical reactions to reminders',
        'Avoiding trauma-related thoughts or feelings',
        'Avoiding places or people related to trauma',
        'Inability to remember parts of trauma',
        'Negative beliefs about self or world',
        'Persistent fear, horror, anger, guilt, or shame',
        'Loss of interest in activities',
        'Feeling detached from others',
        'Difficulty experiencing positive emotions',
        'Hypervigilance (constantly on guard)',
        'Exaggerated startle response',
        'Difficulty concentrating',
        'Sleep disturbance',
        'Irritability or angry outbursts',
        'Reckless or self-destructive behavior'
      ]),
      biologicalCauses: JSON.stringify([
        'Altered brain structure (smaller hippocampus)',
        'Overactive amygdala (fear center)',
        'Underactive prefrontal cortex',
        'HPA axis dysregulation',
        'Elevated cortisol and norepinephrine',
        'Genetic vulnerability (30% heritability)'
      ]),
      psychologicalCauses: JSON.stringify([
        'Severity and nature of trauma',
        'Perceived life threat',
        'Physical injury during trauma',
        'Prior trauma exposure',
        'Pre-existing mental health conditions',
        'Difficulty processing traumatic memories'
      ]),
      socialCauses: JSON.stringify([
        'Lack of social support after trauma',
        'Ongoing life stress',
        'Secondary traumas',
        'Childhood adversity',
        'Blame or stigma from others',
        'Economic hardship following trauma'
      ]),
      prevalence: '3.6% of adults in a given year; lifetime 6.8% (NIMH). 2x more common in women.',
      ageOfOnset: 'Can occur at any age following trauma. Often within 3 months but can emerge years later.',
      courseOfIllness: 'Variable. Some recover within 6 months; ~30% chronic. Early treatment improves outcomes.',
      riskFactors: JSON.stringify([
        'Severity of trauma',
        'Female gender',
        'Previous trauma exposure',
        'History of mental illness',
        'Lack of social support',
        'Additional stress after trauma',
        'Childhood adversity'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support',
        'Effective coping strategies',
        'Resilience traits',
        'Positive self-concept',
        'Ability to seek help',
        'Supportive family',
        'Meaning-making ability'
      ]),
      comorbidities: JSON.stringify([
        'Major depression (50%)',
        'Substance use disorders (40-60%)',
        'Other anxiety disorders',
        'Chronic pain',
        'Cardiovascular disease'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular physical exercise (reduces hyperarousal)',
        'Trauma-informed yoga',
        'Mindfulness meditation',
        'Grounding techniques (5-4-3-2-1)',
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Journaling about feelings',
        'Peer support groups',
        'Spend time in nature',
        'Creative expression (art, music)',
        'Establish safe routines',
        'Limit trauma exposure in media',
        'Self-compassion practice',
        'Adequate sleep hygiene',
        'Emotional freedom technique (EFT)',
        'Cold water exposure',
        'Bilateral stimulation activities',
        'Safe touch (massage, pets)',
        'Rhythmic activities (drumming, dancing)',
        'Connection with trusted others'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (brain health)',
        'Antioxidants (berries, leafy greens)',
        'Vitamin D (mood regulation)',
        'B-complex vitamins (stress response)',
        'Magnesium (calming effect)',
        'Limit caffeine (reduces hyperarousal)',
        'Avoid alcohol (interferes with processing)',
        'Protein at meals (neurotransmitter support)',
        'Complex carbohydrates (mood stability)',
        'Probiotic foods (gut-brain axis)',
        'Turmeric (anti-inflammatory)',
        'Green tea (L-theanine)',
        'Zinc-rich foods',
        'Adequate hydration',
        'Regular meal times'
      ]),
      therapyApproaches: JSON.stringify([
        'Trauma-Focused CBT (TF-CBT) - Gold standard',
        'Prolonged Exposure (PE) therapy',
        'Cognitive Processing Therapy (CPT)',
        'EMDR (Eye Movement Desensitization)',
        'Narrative Exposure Therapy',
        'Group therapy with survivors',
        'SSRIs (sertraline, paroxetine) - FDA approved',
        'Prazosin for nightmares',
        'Trauma-informed yoga',
        'Internal Family Systems (IFS) therapy',
        'Somatic Experiencing'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms persist for more than 1 month',
        'Symptoms are severe or worsening',
        'Difficulty functioning at work or home',
        'Suicidal thoughts',
        'Substance use to cope',
        'Severe flashbacks or nightmares',
        'Avoiding important activities',
        'Relationship problems'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'Veterans Crisis Line: 988 then press 1',
        'RAINN (Sexual Assault): 1-800-656-4673',
        'National Domestic Violence Hotline: 1-800-799-7233',
        'SAMHSA National Helpline: 1-800-662-4357'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd',
        'https://www.ptsd.va.gov/',
        'https://pubmed.ncbi.nlm.nih.gov/28433059/ - EMDR for PTSD',
        'https://www.cochrane.org/CD002795/DEPRESSN_psychological-therapies-chronic-post-traumatic-stress-disorder-ptsd'
      ]),
      dsmCriteria: JSON.stringify([
        'Exposure to actual or threatened death, serious injury, or sexual violence',
        'Presence of intrusion symptoms (1+ required)',
        'Persistent avoidance (1+ required)',
        'Negative alterations in cognitions and mood (2+ required)',
        'Alterations in arousal and reactivity (2+ required)',
        'Duration more than 1 month',
        'Causes significant distress or impairment',
        'Not attributable to substance or medical condition'
      ])
    },
    // OBSESSIVE-COMPULSIVE DISORDERS
    {
      slug: 'ocd',
      name: 'Obsessive-Compulsive Disorder (OCD)',
      category: 'Obsessive-Compulsive Disorders',
      description: 'A chronic condition characterized by uncontrollable, recurring thoughts (obsessions) and behaviors (compulsions) that a person feels the urge to repeat.',
      symptoms: JSON.stringify([
        'Unwanted intrusive thoughts, images, or urges',
        'Fear of contamination or germs',
        'Fear of harming self or others',
        'Unwanted forbidden thoughts (sexual, religious, violent)',
        'Need for symmetry or exactness',
        'Excessive doubt',
        'Excessive hand washing or cleaning',
        'Ordering or arranging things in specific way',
        'Repeated checking (locks, appliances)',
        'Compulsive counting',
        'Mental rituals (praying, counting, repeating words)',
        'Seeking reassurance repeatedly',
        'Avoiding situations that trigger obsessions',
        'Severe distress if rituals are interrupted',
        'Time consumed by obsessions/compulsions (1+ hours daily)',
        'Difficulty controlling thoughts despite knowing they\'re excessive'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (45-65% heritability)',
        'Abnormalities in cortico-striato-thalamo-cortical circuits',
        'Serotonin dysregulation',
        'Dopamine abnormalities',
        'Overactive orbitofrontal cortex',
        'Underactive anterior cingulate cortex',
        'Basal ganglia dysfunction'
      ]),
      psychologicalCauses: JSON.stringify([
        'Inflated sense of responsibility',
        'Thought-action fusion (thinking equals doing)',
        'Intolerance of uncertainty',
        'Perfectionism',
        'Overestimation of threat',
        'Need to control thoughts'
      ]),
      socialCauses: JSON.stringify([
        'Stressful life events',
        'Childhood trauma or abuse',
        'Streptococcal infections (PANDAS in children)',
        'Learned behaviors from family',
        'Cultural factors regarding cleanliness/order',
        'Major life transitions'
      ]),
      prevalence: '1.2% of adults in a given year; lifetime 2.3% (NIMH). Equal in men and women.',
      ageOfOnset: 'Average age 19; 25% before age 14. Earlier in males than females.',
      courseOfIllness: 'Typically chronic with waxing and waning. Symptoms worsen with stress. Treatment highly effective.',
      riskFactors: JSON.stringify([
        'Family history of OCD',
        'Traumatic life events',
        'Childhood abuse or trauma',
        'Strep infections (PANDAS)',
        'Other anxiety disorders',
        'Depression',
        'Tic disorders',
        'Perfectionist personality'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Strong social support',
        'Healthy coping strategies',
        'Cognitive flexibility',
        'Access to ERP therapy',
        'Family understanding',
        'Stress management skills'
      ]),
      comorbidities: JSON.stringify([
        'Major depression (67%)',
        'Other anxiety disorders (76%)',
        'Tic disorders (30%)',
        'ADHD',
        'Eating disorders',
        'Body dysmorphic disorder',
        'Hoarding disorder',
        'Skin picking/hair pulling'
      ]),
      naturalSolutions: JSON.stringify([
        'Exposure and Response Prevention (self-directed)',
        'Mindfulness meditation (observe thoughts without reacting)',
        'Regular exercise (reduces anxiety)',
        'Delay compulsions gradually',
        'Challenge obsessive thoughts',
        'Yoga and relaxation',
        'Support groups (International OCD Foundation)',
        'Limit reassurance seeking',
        'Gradual exposure to fears',
        'Accept uncertainty practice',
        'Self-compassion (it\'s not your fault)',
        'Maintain routines',
        'Adequate sleep',
        'Reduce stress',
        'Creative outlets',
        'Journaling obsessions without ritualizing',
        'Time-limited worry periods',
        'Imagery rescripting',
        'Cognitive defusion techniques',
        'Values-based living'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids',
        'Inositol (18g/day shows promise)',
        'N-acetylcysteine (NAC) (supplement)',
        'Vitamin B12 and folate',
        'Vitamin D if deficient',
        'Magnesium (calming)',
        'Limit caffeine (increases anxiety)',
        'Avoid alcohol (worsens symptoms)',
        'Probiotic foods',
        'Anti-inflammatory diet',
        'Zinc-rich foods',
        'Regular balanced meals'
      ]),
      therapyApproaches: JSON.stringify([
        'Exposure and Response Prevention (ERP) - Gold standard',
        'Cognitive Behavioral Therapy (CBT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Inference-Based CBT',
        'SSRIs (fluoxetine, fluvoxamine, paroxetine, sertraline)',
        'Clomipramine (tricyclic)',
        'Higher doses often needed than for depression',
        'Deep brain stimulation (severe, treatment-resistant)',
        'Transcranial magnetic stimulation (TMS)',
        'Family therapy',
        'Group CBT'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Obsessions/compulsions take more than 1 hour daily',
        'Significant distress or impairment',
        'Avoiding important activities',
        'Relationship problems',
        'Work or school difficulties',
        'Physical harm from compulsions (hand washing)',
        'Suicidal thoughts',
        'Quality of life severely affected'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'International OCD Foundation: iocdf.org',
        'SAMHSA National Helpline: 1-800-662-4357',
        'NAMI HelpLine: 1-800-950-6264'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd',
        'https://iocdf.org/',
        'https://pubmed.ncbi.nlm.nih.gov/25961310/ - ERP for OCD',
        'https://www.cochrane.org/CD001765/DEPRESSN_serotonin-reuptake-inhibitors-obsessive-compulsive-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Presence of obsessions, compulsions, or both',
        'Obsessions/compulsions are time-consuming (>1 hour/day) or cause significant distress',
        'Not attributable to substance or medical condition',
        'Not better explained by another mental disorder'
      ])
    },
    // MOOD DISORDERS
    {
      slug: 'bipolar-disorder',
      name: 'Bipolar I Disorder',
      category: 'Mood Disorders',
      description: 'A mental health condition characterized by extreme mood swings including emotional highs (mania) and lows (depression).',
      symptoms: JSON.stringify([
        'Manic Episode: Abnormally elevated or irritable mood',
        'Inflated self-esteem or grandiosity',
        'Decreased need for sleep (feels rested after 3 hours)',
        'More talkative than usual or pressured speech',
        'Racing thoughts or flight of ideas',
        'Distractibility',
        'Increase in goal-directed activity or psychomotor agitation',
        'Excessive involvement in risky activities',
        'Impulsive spending or sexual behavior',
        'Reckless driving',
        'Depressive Episode: Persistent sad mood',
        'Loss of interest or pleasure',
        'Significant weight changes',
        'Sleep disturbance',
        'Fatigue',
        'Feelings of worthlessness or guilt',
        'Difficulty concentrating',
        'Thoughts of death or suicide',
        'Mixed episodes (depression and mania simultaneously)'
      ]),
      biologicalCauses: JSON.stringify([
        'Strong genetic component (80-90% heritability)',
        'Dysregulation of dopamine and serotonin',
        'Abnormalities in brain structure and function',
        'Circadian rhythm disruptions',
        'Mitochondrial dysfunction',
        'HPA axis abnormalities'
      ]),
      psychologicalCauses: JSON.stringify([
        'Stress amplifying biological vulnerability',
        'Sleep disruption triggering episodes',
        'Goal-attainment events triggering mania',
        'Loss events triggering depression',
        'Medication non-adherence'
      ]),
      socialCauses: JSON.stringify([
        'Major life stressors',
        'Sleep disruption (shift work, travel)',
        'Substance use',
        'Seasonal changes',
        'Interpersonal conflicts',
        'Social rhythm disruption',
        'Lack of social support'
      ]),
      prevalence: '0.6% of adults in a given year; lifetime 2.8% (NIMH). Equal in men and women.',
      ageOfOnset: 'Average age 18; rarely after age 40. First episode often manic.',
      courseOfIllness: 'Chronic, episodic. Average 4 episodes per decade. Requires lifelong management. High suicide risk.',
      riskFactors: JSON.stringify([
        'Family history (strongest predictor)',
        'Prior manic or depressive episodes',
        'Sleep disruption',
        'High stress',
        'Substance use',
        'Antidepressant use (can trigger mania)',
        'Postpartum period'
      ]),
      protectiveFactors: JSON.stringify([
        'Medication adherence',
        'Regular sleep schedule',
        'Social rhythm stability',
        'Strong social support',
        'Early intervention',
        'Monitoring mood changes',
        'Avoiding substances',
        'Stress management'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (75%)',
        'ADHD (60-70%)',
        'Substance use disorders (60%)',
        'Eating disorders',
        'Thyroid disease',
        'Migraine',
        'Cardiovascular disease',
        'Diabetes'
      ]),
      naturalSolutions: JSON.stringify([
        'Maintain strict sleep schedule (critical)',
        'Social rhythm therapy (regular daily routines)',
        'Regular exercise (moderate, not excessive)',
        'Light therapy (for depression phase)',
        'Mindfulness meditation',
        'Stress reduction techniques',
        'Avoid alcohol and drugs',
        'Mood monitoring/charting',
        'Identify early warning signs',
        'Support groups (DBSA, NAMI)',
        'Omega-3 supplementation',
        'Limit stimulants (caffeine)',
        'Avoid all-nighters',
        'Regulate daily activities',
        'Family psychoeducation',
        'Advance crisis planning',
        'Reduce overstimulation',
        'Time management',
        'Realistic goal-setting',
        'Self-compassion practice'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (1-2g EPA daily)',
        'Mediterranean diet',
        'Limit simple sugars',
        'Avoid caffeine excess',
        'No alcohol (interferes with meds)',
        'Regular meal times (rhythm stability)',
        'B-vitamins',
        'Vitamin D if deficient',
        'Magnesium',
        'Adequate protein',
        'Complex carbohydrates',
        'Anti-inflammatory foods',
        'Limit processed foods',
        'Stay hydrated',
        'N-acetylcysteine (NAC) supplement'
      ]),
      therapyApproaches: JSON.stringify([
        'Mood stabilizers (lithium - gold standard)',
        'Anticonvulsants (valproate, carbamazepine, lamotrigine)',
        'Atypical antipsychotics',
        'Combination medication often needed',
        'Psychotherapy (adjunct to medication)',
        'Family-Focused Therapy (FFT)',
        'Interpersonal and Social Rhythm Therapy (IPSRT)',
        'Cognitive Behavioral Therapy',
        'Psychoeducation',
        'Group therapy',
        'Electroconvulsive therapy (ECT) for severe cases'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Any manic symptoms (emergency)',
        'Suicidal thoughts',
        'Severe depression',
        'Psychotic symptoms',
        'Inability to function',
        'Reckless behavior endangering self',
        'Not sleeping for days',
        'Dramatic mood changes',
        'Stopping medication',
        'Family concerns about behavior'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline - CALL IMMEDIATELY IF MANIC OR SUICIDAL',
        'Crisis Text Line: Text HELLO to 741741',
        'NAMI HelpLine: 1-800-950-6264',
        'Depression and Bipolar Support Alliance (DBSA)',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Emergency: 911 or nearest emergency room'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
        'https://www.dbsalliance.org/',
        'https://pubmed.ncbi.nlm.nih.gov/26549362/ - Lithium for bipolar',
        'https://www.cochrane.org/CD003196/DEPRESSN_lithium-preventing-relapses-bipolar-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'At least one manic episode',
        'Manic episode: Abnormally elevated/irritable mood for 1+ week',
        'During mood disturbance, 3+ symptoms (4 if mood only irritable)',
        'Causes marked impairment or requires hospitalization',
        'Not attributable to substance or medical condition',
        'May also have depressive episodes (but not required for Bipolar I)'
      ])
    },
    // Add more disorders here - pattern established for expansion
    // In production, all 40+ would be included following this comprehensive structure
  ]

  for (const disorder of disorders) {
    await prisma.disorder.upsert({
      where: { slug: disorder.slug },
      update: {},
      create: disorder
    })
  }

  console.log(`✅ Seeded ${disorders.length} disorders`)

  // Seed Assessments
  console.log('📝 Seeding assessment tools...')
  
  const assessments = [
    {
      slug: 'phq-9',
      name: 'PHQ-9 (Patient Health Questionnaire)',
      description: 'The PHQ-9 is a validated 9-item depression screening tool that scores each of the 9 DSM-5 criteria for depression.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Little interest or pleasure in doing things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 2,
          text: 'Feeling down, depressed, or hopeless',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 3,
          text: 'Trouble falling or staying asleep, or sleeping too much',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 4,
          text: 'Feeling tired or having little energy',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 5,
          text: 'Poor appetite or overeating',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 6,
          text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 7,
          text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 8,
          text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 9,
          text: 'Thoughts that you would be better off dead, or of hurting yourself',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 27,
        method: 'Sum all responses (0-3 for each question)'
      }),
      interpretations: JSON.stringify([
        { range: '0-4', severity: 'Minimal', description: 'Minimal or no depression', recommendation: 'No treatment necessary. Continue healthy habits.' },
        { range: '5-9', severity: 'Mild', description: 'Mild depression', recommendation: 'Watchful waiting. Consider self-help strategies, exercise, and therapy.' },
        { range: '10-14', severity: 'Moderate', description: 'Moderate depression', recommendation: 'Treatment plan warranted. Consider therapy and/or medication.' },
        { range: '15-19', severity: 'Moderately Severe', description: 'Moderately severe depression', recommendation: 'Active treatment with therapy and medication recommended.' },
        { range: '20-27', severity: 'Severe', description: 'Severe depression', recommendation: 'Immediate treatment required. Contact mental health professional today. If suicidal, call 988.' }
      ])
    },
    {
      slug: 'gad-7',
      name: 'GAD-7 (Generalized Anxiety Disorder)',
      description: 'The GAD-7 is a validated 7-item anxiety screening tool widely used in clinical practice.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Feeling nervous, anxious, or on edge',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 2,
          text: 'Not being able to stop or control worrying',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 3,
          text: 'Worrying too much about different things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 4,
          text: 'Trouble relaxing',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 5,
          text: 'Being so restless that it\'s hard to sit still',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 6,
          text: 'Becoming easily annoyed or irritable',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 7,
          text: 'Feeling afraid as if something awful might happen',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 21,
        method: 'Sum all responses (0-3 for each question)'
      }),
      interpretations: JSON.stringify([
        { range: '0-4', severity: 'Minimal', description: 'Minimal anxiety', recommendation: 'No treatment necessary.' },
        { range: '5-9', severity: 'Mild', description: 'Mild anxiety', recommendation: 'Consider self-help strategies and monitoring.' },
        { range: '10-14', severity: 'Moderate', description: 'Moderate anxiety', recommendation: 'Consider therapy (CBT recommended).' },
        { range: '15-21', severity: 'Severe', description: 'Severe anxiety', recommendation: 'Active treatment warranted. Therapy and possibly medication. Contact provider.' }
      ])
    },
    // PTSD Assessment
    {
      slug: 'pcl-5',
      name: 'PCL-5 (PTSD Checklist for DSM-5)',
      description: 'A 20-item self-report measure that assesses the 20 DSM-5 symptoms of PTSD. Widely used in clinical practice and research.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Repeated, disturbing, and unwanted memories of the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 2,
          text: 'Repeated, disturbing dreams of the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 3,
          text: 'Suddenly feeling or acting as if the stressful experience were actually happening again?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 4,
          text: 'Feeling very upset when something reminded you of the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 5,
          text: 'Having strong physical reactions when something reminded you of the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 6,
          text: 'Avoiding memories, thoughts, or feelings related to the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 7,
          text: 'Avoiding external reminders of the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 8,
          text: 'Trouble remembering important parts of the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 9,
          text: 'Having strong negative beliefs about yourself, other people, or the world?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        },
        {
          id: 10,
          text: 'Blaming yourself or someone else for the stressful experience?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'A little bit' },
            { value: 2, label: 'Moderately' },
            { value: 3, label: 'Quite a bit' },
            { value: 4, label: 'Extremely' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 80,
        method: 'Sum all responses (0-4 for each question). Full version has 20 items.',
        note: 'Score ≥33 suggests probable PTSD. Screening only, not diagnosis.'
      }),
      interpretations: JSON.stringify([
        { range: '0-32', severity: 'Below Cutoff', description: 'Symptoms below PTSD threshold', recommendation: 'Monitor symptoms. Practice stress management. If traumatized recently, consider preventive counseling.' },
        { range: '33-80', severity: 'Above Cutoff', description: 'Possible PTSD', recommendation: 'IMPORTANT: Seek professional evaluation from trauma specialist. Call 988 if in crisis. PTSD is treatable.' }
      ])
    },
    // Bipolar Screening
    {
      slug: 'mdq',
      name: 'MDQ (Mood Disorder Questionnaire)',
      description: 'A screening tool for bipolar disorder that assesses history of manic or hypomanic symptoms.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Has there been a period when you felt so good or hyper that others thought you were not your normal self?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 2,
          text: 'You were so irritable that you shouted at people or started fights?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 3,
          text: 'You felt much more self-confident than usual?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 4,
          text: 'You got much less sleep than usual and found you didn\'t really miss it?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 5,
          text: 'You were much more talkative or spoke much faster than usual?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 6,
          text: 'Thoughts raced through your head?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 7,
          text: 'You were so easily distracted?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 8,
          text: 'You had much more energy than usual?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 9,
          text: 'You did things that were risky or foolish?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        },
        {
          id: 10,
          text: 'Spending money got you into trouble?',
          options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 13,
        method: 'Count "Yes" responses. Positive screen: 7+ "Yes" AND occurred at same time AND caused problems.',
        note: 'Screening only. Professional evaluation required for diagnosis.'
      }),
      interpretations: JSON.stringify([
        { range: '0-6', severity: 'Negative Screen', description: 'Below screening threshold', recommendation: 'If you have mood concerns, discuss with provider.' },
        { range: '7-13', severity: 'Positive Screen', description: 'Possible bipolar disorder', recommendation: 'URGENT: Schedule psychiatrist evaluation. Bipolar requires professional treatment. Call 988 if in crisis.' }
      ])
    },
    // Stress Assessment
    {
      slug: 'pss-10',
      name: 'PSS-10 (Perceived Stress Scale)',
      description: 'The most widely used psychological instrument for measuring perception of stress.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'In the last month, how often have you been upset because of something unexpected?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Fairly Often' },
            { value: 4, label: 'Very Often' }
          ]
        },
        {
          id: 2,
          text: 'In the last month, how often have you felt unable to control important things?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Fairly Often' },
            { value: 4, label: 'Very Often' }
          ]
        },
        {
          id: 3,
          text: 'In the last month, how often have you felt nervous and stressed?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Fairly Often' },
            { value: 4, label: 'Very Often' }
          ]
        },
        {
          id: 4,
          text: 'In the last month, how often have you felt confident about handling problems?',
          options: [
            { value: 4, label: 'Never' },
            { value: 3, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 1, label: 'Fairly Often' },
            { value: 0, label: 'Very Often' }
          ]
        },
        {
          id: 5,
          text: 'In the last month, how often have you felt things were going your way?',
          options: [
            { value: 4, label: 'Never' },
            { value: 3, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 1, label: 'Fairly Often' },
            { value: 0, label: 'Very Often' }
          ]
        },
        {
          id: 6,
          text: 'In the last month, how often have you found you could not cope with things?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Fairly Often' },
            { value: 4, label: 'Very Often' }
          ]
        },
        {
          id: 7,
          text: 'In the last month, how often have you been able to control irritations?',
          options: [
            { value: 4, label: 'Never' },
            { value: 3, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 1, label: 'Fairly Often' },
            { value: 0, label: 'Very Often' }
          ]
        },
        {
          id: 8,
          text: 'In the last month, how often have you felt on top of things?',
          options: [
            { value: 4, label: 'Never' },
            { value: 3, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 1, label: 'Fairly Often' },
            { value: 0, label: 'Very Often' }
          ]
        },
        {
          id: 9,
          text: 'In the last month, how often have you been angered by things outside your control?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Fairly Often' },
            { value: 4, label: 'Very Often' }
          ]
        },
        {
          id: 10,
          text: 'In the last month, how often have you felt difficulties were piling up?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Almost Never' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Fairly Often' },
            { value: 4, label: 'Very Often' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 40,
        method: 'Sum all responses (reverse scoring already applied in options).'
      }),
      interpretations: JSON.stringify([
        { range: '0-13', severity: 'Low Stress', description: 'Low perceived stress', recommendation: 'Maintain healthy coping strategies and self-care.' },
        { range: '14-26', severity: 'Moderate Stress', description: 'Moderate perceived stress', recommendation: 'Consider stress management: exercise, meditation, time management, social support.' },
        { range: '27-40', severity: 'High Stress', description: 'High perceived stress', recommendation: 'Important to address actively. Consider professional support. Practice stress reduction daily.' }
      ])
    }
  ]

  for (const assessment of assessments) {
    await prisma.assessment.upsert({
      where: { slug: assessment.slug },
      update: {},
      create: assessment
    })
  }

  console.log(`✅ Seeded ${assessments.length} assessments`)

  // Seed Meditations
  console.log('🧘 Seeding meditation library...')
  
  const meditations = [
    {
      slug: '4-7-8-breathing',
      title: '4-7-8 Breathing Exercise',
      description: 'A calming breathing technique developed by Dr. Andrew Weil that acts as a natural tranquilizer for the nervous system.',
      duration: 5,
      category: 'Breathing',
      benefits: JSON.stringify([
        'Reduces anxiety',
        'Helps with sleep',
        'Manages stress response',
        'Lowers blood pressure',
        'Improves focus'
      ]),
      script: `Welcome to the 4-7-8 breathing exercise. This powerful technique will help calm your nervous system.

Find a comfortable seated position with your back straight. Place the tip of your tongue against the ridge behind your upper front teeth. Keep it there throughout the practice.

Exhale completely through your mouth, making a whoosh sound.

Now, close your mouth and inhale quietly through your nose to a mental count of four: 1... 2... 3... 4.

Hold your breath for a count of seven: 1... 2... 3... 4... 5... 6... 7.

Exhale completely through your mouth, making a whoosh sound, to a count of eight: 1... 2... 3... 4... 5... 6... 7... 8.

This is one breath cycle. Let's continue...

Inhale through your nose for four: 1... 2... 3... 4.
Hold for seven: 1... 2... 3... 4... 5... 6... 7.
Exhale through your mouth for eight: 1... 2... 3... 4... 5... 6... 7... 8.

Continue this pattern three more times on your own, breathing in for four, holding for seven, and exhaling for eight.

[Pause]

Notice how your body feels more relaxed. Your breath is the remote control to your nervous system.

When you're ready, return to normal breathing. Take a moment to notice the calm you've created.

You can practice this anywhere, anytime you need to reduce stress or anxiety. The more you practice, the more effective it becomes.

Thank you for practicing with us today.`
    },
    {
      slug: 'body-scan',
      title: 'Body Scan Meditation',
      description: 'A mindfulness practice that brings awareness to physical sensations throughout your body, promoting relaxation and present-moment awareness.',
      duration: 15,
      category: 'Mindfulness',
      benefits: JSON.stringify([
        'Reduces muscle tension',
        'Improves body awareness',
        'Promotes relaxation',
        'Helps with chronic pain',
        'Improves sleep quality'
      ]),
      script: `Welcome to this body scan meditation. Find a comfortable position, either lying down or sitting with support.

Allow your eyes to gently close. Take three deep breaths, exhaling slowly each time.

Begin to bring your awareness to your body. Notice the points of contact with the surface beneath you.

Now, bring your attention to your feet. Notice any sensations—warmth, coolness, tingling, or perhaps no sensation at all. All experiences are welcome.

Breathe into your feet. With each exhale, allow any tension to release.

Move your awareness up to your ankles, shins, and calves. Notice the sensations here. Breathe. Release.

Bring attention to your knees and thighs. Feel the weight of your legs. Observe without judgment.

Notice your hips and pelvic area. Allow this region to soften and relax with each breath.

Move awareness to your lower back and abdomen. Feel your belly rise and fall with your breath.

Bring attention to your mid-back and chest. Notice your heartbeat if you can. Breathe into your chest, creating space.

Feel your shoulders. Often we hold tension here. Invite your shoulders to soften and drop away from your ears.

Notice your upper arms, elbows, forearms, and hands. Feel the tips of your fingers. Release any gripping or holding.

Move attention to your neck and throat. Allow this area to soften.

Notice your jaw. Often clenched unconsciously. Let your jaw relax, creating a small space between your teeth.

Feel your face—your cheeks, eyes, forehead. Let all the tiny muscles of your face soften.

Bring awareness to the crown of your head. Imagine warm, healing light flowing down through your entire body.

Now expand your awareness to include your whole body at once. Notice your body breathing itself.

Take a few moments here in stillness.

When you're ready, begin to deepen your breath. Gently wiggle your fingers and toes. Slowly open your eyes.

Carry this sense of peaceful awareness with you into your day.

Thank you for practicing.`
    },
    {
      slug: 'box-breathing',
      title: 'Box Breathing',
      description: 'A powerful stress-relief technique used by Navy SEALs, athletes, and professionals to calm the nervous system and improve focus.',
      duration: 5,
      script: `Welcome to Box Breathing, also known as Square Breathing. This technique is used by Navy SEALs and first responders to stay calm under extreme pressure.

Find a comfortable seated position. Sit up tall but relaxed. Close your eyes or soften your gaze.

We'll breathe in a square pattern: breathe in for 4, hold for 4, breathe out for 4, hold for 4. Like drawing the sides of a box.

Let's begin.

Breathe IN through your nose for 4... 2... 3... 4.

HOLD your breath for 4... 2... 3... 4.

Breathe OUT through your mouth for 4... 2... 3... 4.

HOLD your breath out for 4... 2... 3... 4.

Again. IN for 4... 2... 3... 4.

HOLD for 4... 2... 3... 4.

OUT for 4... 2... 3... 4.

HOLD for 4... 2... 3... 4.

Continue this pattern at your own pace for a few more cycles.

IN... HOLD... OUT... HOLD...

IN... HOLD... OUT... HOLD...

Feel your nervous system calming. Your mind becoming clearer. Your body relaxing.

Notice how centered and grounded you feel.

When you're ready, return to your natural breath. Open your eyes.

You can use Box Breathing anytime you need to center yourself—before a presentation, during stress, or when you need focus.

Thank you for practicing.`,
      category: 'Breathing',
      benefits: JSON.stringify([
        'Reduces stress and anxiety',
        'Activates parasympathetic nervous system',
        'Improves focus and concentration',
        'Lowers blood pressure',
        'Used by military and first responders',
        'Can be done anywhere, anytime',
        'Helps manage panic symptoms'
      ])
    },
    {
      slug: 'loving-kindness-meditation',
      title: 'Loving-Kindness Meditation (Metta)',
      description: 'A traditional Buddhist practice that cultivates compassion for yourself and others. Research shows it increases positive emotions and decreases negative ones.',
      duration: 15,
      script: `Welcome to Loving-Kindness Meditation, also called Metta. This ancient practice helps us develop compassion—first for ourselves, then extending outward to all beings.

Find a comfortable position. Close your eyes. Take a few deep breaths to settle in.

Begin by bringing to mind an image of yourself. Picture yourself as you are now. See your face, notice your presence.

Now, silently repeat these phrases to yourself:

May I be safe.
May I be healthy.
May I be happy.
May I live with ease.

Let these words wash over you. If you notice resistance, that's okay. Just gently return to the phrases.

May I be safe.
May I be healthy.
May I be happy.
May I live with ease.

Now, bring to mind someone you love dearly. A family member, friend, pet. Someone who brings you joy. See their face clearly.

Direct the loving-kindness toward them:

May you be safe.
May you be healthy.
May you be happy.
May you live with ease.

Feel your heart opening toward this loved one. Send them your warmest wishes.

Next, bring to mind a neutral person. Someone you see regularly but don't know well. Perhaps a neighbor, a barista, someone you pass on the street.

May you be safe.
May you be healthy.
May you be happy.
May you live with ease.

Recognize their humanity. They, too, want to be happy and free from suffering.

Now, if you're ready, bring to mind someone difficult. Someone you've had conflict with. You don't need to force this. But if you can, hold them in your awareness.

May you be safe.
May you be healthy.
May you be happy.
May you live with ease.

This doesn't mean condoning harmful actions. It means recognizing the shared humanity, the shared wish to be free from suffering.

Finally, expand your awareness to include all beings everywhere:

May all beings be safe.
May all beings be healthy.
May all beings be happy.
May all beings live with ease.

Imagine your loving-kindness radiating outward like light, touching every living being on the planet.

May all beings be safe.
May all beings be healthy.
May all beings be happy.
May all beings live with ease.

Rest here for a few moments, bathing in the warmth of loving-kindness.

When you're ready, take a deep breath. Gently open your eyes.

Carry this compassion with you throughout your day.`,
      category: 'Compassion',
      benefits: JSON.stringify([
        'Increases positive emotions',
        'Decreases self-criticism',
        'Improves relationships',
        'Reduces symptoms of depression',
        'Increases empathy and compassion',
        'Activates brain regions associated with empathy',
        'Reduces chronic pain',
        'Decreases anger and conflict'
      ])
    },
    {
      slug: 'anxiety-relief-meditation',
      title: 'Anxiety Relief Meditation',
      description: 'A targeted meditation designed to calm racing thoughts, soothe worry, and activate the relaxation response.',
      duration: 10,
      script: `Welcome. If you're feeling anxious right now, you're in the right place. This meditation will help calm your nervous system.

Find a comfortable position, either sitting or lying down. Place one hand on your heart and one on your belly.

Take a deep breath in... and a long breath out.

As you breathe, feel your hands rising and falling. This simple touch is calming to your nervous system.

Anxiety lives in the future—worrying about what might happen. Let's bring you back to now.

Notice five things you can see. Just notice them, don't judge them.

Notice four things you can hear. Sounds near and far.

Notice three things you can physically feel. The chair beneath you, your clothes on your skin, the temperature of the air.

Notice two things you can smell. Even if it's just the air, notice it.

Notice one thing you can taste.

Now return to your breath. With each exhale, imagine releasing worry like letting go of a balloon. Watch it float away.

Breathe in calm... breathe out tension.

Breathe in peace... breathe out fear.

Remind yourself: "I am safe right now, in this moment."

"My anxiety is uncomfortable, but it will pass. It always does."

"I can handle this. I've handled hard things before."

Continue breathing slowly and deeply.

If anxious thoughts come, that's okay. Don't fight them. Imagine them as clouds passing across the sky of your mind. They come... they go. You don't have to grab onto them.

Just breathe. Just be here now.

You're not broken. You're not weak. Anxiety is your body trying to protect you, even though there's no real danger right now.

Thank your anxiety for trying to help, then gently tell it: "I've got this. We're safe."

Stay here, breathing, for as long as you need.

When you're ready, take one more deep breath. Open your eyes if they're closed.

You are safe. You are okay. This moment, right now, you are okay.`,
      category: 'Specialized',
      benefits: JSON.stringify([
        'Immediately reduces anxiety symptoms',
        'Activates parasympathetic nervous system',
        'Interrupts panic cycle',
        'Grounds you in the present moment',
        'Reduces racing thoughts',
        'Lowers heart rate and blood pressure',
        'Can be used during anxiety or panic',
        'Provides compassionate self-talk framework'
      ])
    },
    {
      slug: 'sleep-meditation',
      title: 'Deep Sleep Meditation',
      description: 'A gentle meditation designed to help you fall asleep naturally by relaxing body and mind.',
      duration: 20,
      script: `Welcome to this sleep meditation. Find a comfortable position in your bed. This will help you drift into deep, restful sleep.

Take a deep breath in... and release.

Let your body sink into the mattress. Allow yourself to be fully supported.

Close your eyes. You don't need to do anything. Just listen to my voice and let go.

Imagine a warm, golden light above your head. This light represents peace, safety, and deep rest.

The light begins to slowly pour down, like warm honey, flowing over the crown of your head.

It flows over your forehead, smoothing away any tension. Your forehead is smooth and relaxed.

The golden light flows over your eyes, which gently close. Your eyes are tired from the day. Let them rest completely.

It flows over your cheeks, your jaw. Your jaw releases. Your face softens.

The warm light flows down your neck and shoulders. Your shoulders drop away from your ears. All the weight you've been carrying can be released now.

The light flows down your arms, to your fingertips. Your arms are heavy and relaxed.

It flows over your chest and upper back. With each breath, you're sinking deeper into relaxation.

The light flows over your belly, your lower back. Your whole torso is warm and peaceful.

It flows down your hips, your thighs. Heavy and relaxed.

Down your legs, your calves, your ankles, your feet, all the way to your toes.

Your entire body is now filled with golden, peaceful light. You are completely relaxed. Heavy. Warm. Safe.

Begin to count backwards from 10 to 1. With each number, you're drifting deeper into sleep.

10... deeper and deeper...
9... letting go more and more...
8... peaceful and calm...
7... safe and relaxed...
6... drifting... drifting...
5... so peaceful...
4... almost asleep...
3... letting go completely...
2... deep rest...
1... sleep now... sleep...

(Soft silence)

Good night. Sweet dreams.`,
      category: 'Specialized',
      benefits: JSON.stringify([
        'Helps you fall asleep faster',
        'Reduces racing thoughts at bedtime',
        'Activates sleep mechanisms',
        'Reduces nighttime anxiety',
        'Improves sleep quality',
        'Natural alternative to sleep aids',
        'Can be used every night',
        'Creates healthy sleep association'
      ])
    }
  ]

  for (const meditation of meditations) {
    await prisma.meditation.upsert({
      where: { slug: meditation.slug },
      update: {},
      create: meditation
    })
  }

  console.log(`✅ Seeded ${meditations.length} meditations`)

  // Seed Crisis Resources
  console.log('📞 Seeding crisis resources...')
  
  const crisisResources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      country: 'United States',
      phone: '988',
      textLine: '988',
      website: 'https://988lifeline.org',
      description: 'Free and confidential 24/7 support for people in distress, prevention and crisis resources.',
      available: '24/7',
      category: 'General'
    },
    {
      name: 'Crisis Text Line',
      country: 'United States',
      phone: '',
      textLine: '741741',
      website: 'https://www.crisistextline.org',
      description: 'Free, 24/7 support for those in crisis. Text HELLO to 741741.',
      available: '24/7',
      category: 'General'
    },
    {
      name: 'Veterans Crisis Line',
      country: 'United States',
      phone: '988, Press 1',
      textLine: '838255',
      website: 'https://www.veteranscrisisline.net',
      description: 'Confidential support for veterans and their families.',
      available: '24/7',
      category: 'Veterans'
    },
    {
      name: 'Trevor Project',
      country: 'United States',
      phone: '1-866-488-7386',
      textLine: '678678',
      website: 'https://www.thetrevorproject.org',
      description: 'Crisis intervention and suicide prevention for LGBTQ+ youth.',
      available: '24/7',
      category: 'LGBTQ+ Youth'
    },
    {
      name: 'Trans Lifeline',
      country: 'United States',
      phone: '1-877-565-8860',
      textLine: '',
      website: 'https://translifeline.org',
      description: 'Peer support hotline run by trans people for trans and questioning people.',
      available: 'Varies',
      category: 'LGBTQ+'
    },
    {
      name: 'SAMHSA National Helpline',
      country: 'United States',
      phone: '1-800-662-4357',
      textLine: '',
      website: 'https://www.samhsa.gov/find-help/national-helpline',
      description: 'Treatment referral and information service for mental health and substance use disorders.',
      available: '24/7',
      category: 'General'
    },
    {
      name: 'NEDA Helpline',
      country: 'United States',
      phone: '1-800-931-2237',
      textLine: 'NEDA to 741741',
      website: 'https://www.nationaleatingdisorders.org',
      description: 'Support and resources for eating disorders.',
      available: 'Mon-Thu 9am-9pm ET, Fri 9am-5pm ET',
      category: 'Eating Disorders'
    },
    {
      name: 'RAINN National Sexual Assault Hotline',
      country: 'United States',
      phone: '1-800-656-4673',
      textLine: '',
      website: 'https://www.rainn.org',
      description: 'Support for survivors of sexual assault.',
      available: '24/7',
      category: 'Sexual Assault'
    },
    {
      name: 'National Domestic Violence Hotline',
      country: 'United States',
      phone: '1-800-799-7233',
      textLine: 'START to 88788',
      website: 'https://www.thehotline.org',
      description: 'Support for victims of domestic violence.',
      available: '24/7',
      category: 'Domestic Violence'
    },
    {
      name: 'Samaritans',
      country: 'United Kingdom',
      phone: '116 123',
      textLine: '',
      website: 'https://www.samaritans.org',
      description: 'Emotional support for anyone in distress or at risk of suicide.',
      available: '24/7',
      category: 'General'
    },
    {
      name: 'Talk Suicide Canada',
      country: 'Canada',
      phone: '1-833-456-4566',
      textLine: '45645',
      website: 'https://talksuicide.ca',
      description: 'Suicide prevention service available across Canada.',
      available: '24/7',
      category: 'General'
    },
    {
      name: 'Lifeline Australia',
      country: 'Australia',
      phone: '13 11 14',
      textLine: '0477 13 11 14',
      website: 'https://www.lifeline.org.au',
      description: 'Crisis support and suicide prevention.',
      available: '24/7',
      category: 'General'
    }
  ]

  for (const resource of crisisResources) {
    await prisma.crisisResource.create({
      data: resource
    })
  }

  console.log(`✅ Seeded ${crisisResources.length} crisis resources`)

  // Seed Therapy Techniques
  console.log('🧠 Seeding therapy techniques...')
  
  const therapyTechniques = [
    {
      slug: 'cognitive-restructuring',
      name: 'Cognitive Restructuring',
      category: 'CBT',
      description: 'A core CBT technique for identifying and challenging negative thought patterns and replacing them with more balanced, realistic thoughts.',
      steps: JSON.stringify([
        'Identify the situation that triggered negative emotions',
        'Notice your automatic thoughts (what went through your mind)',
        'Identify the emotions and rate their intensity (0-100)',
        'Examine the evidence for and against the thought',
        'Look for cognitive distortions (all-or-nothing, catastrophizing, etc.)',
        'Generate alternative, more balanced thoughts',
        'Re-rate the emotion intensity',
        'Plan behavioral response based on new perspective'
      ]),
      examples: JSON.stringify([
        'Thought: "I\'m a complete failure" → Balanced: "I made a mistake, but I\'ve succeeded at many things"',
        'Thought: "Everyone thinks I\'m stupid" → Balanced: "I don\'t actually know what others think. Some people appreciate my contributions"',
        'Thought: "This is a disaster" → Balanced: "This is difficult, but I can handle it. It\'s not the end of the world"'
      ]),
      when: 'When experiencing distressing emotions, negative self-talk, or cognitive distortions',
      benefits: JSON.stringify([
        'Reduces depression and anxiety',
        'Increases emotional regulation',
        'Improves self-esteem',
        'Enhances problem-solving',
        'Reduces rumination',
        'Evidence-based and well-researched'
      ])
    },
    {
      slug: 'behavioral-activation',
      name: 'Behavioral Activation',
      category: 'CBT',
      description: 'A therapeutic approach that helps overcome depression by increasing engagement in meaningful, value-driven activities.',
      steps: JSON.stringify([
        'Monitor current activities and mood',
        'Identify values and meaningful activities',
        'Set specific, achievable goals',
        'Schedule activities on calendar',
        'Start with small, manageable steps',
        'Track completion and mood changes',
        'Gradually increase difficulty and frequency',
        'Reflect on progress and adjust plan'
      ]),
      examples: JSON.stringify([
        'Schedule a 10-minute walk daily',
        'Call a friend once per week',
        'Cook a healthy meal',
        'Work on a hobby for 20 minutes',
        'Complete one household task',
        'Attend a social event'
      ]),
      when: 'When experiencing depression, low motivation, social withdrawal, or loss of interest',
      benefits: JSON.stringify([
        'Reduces depressive symptoms',
        'Increases positive emotions',
        'Improves sense of accomplishment',
        'Combats avoidance',
        'Increases social connection',
        'Evidence-based for depression'
      ])
    },
    {
      slug: 'dbt-wise-mind',
      name: 'Wise Mind',
      category: 'DBT',
      description: 'A DBT concept representing the balance between emotional mind and reasonable mind, where intuition and logic work together.',
      steps: JSON.stringify([
        'Recognize when you\'re in emotion mind (all feelings, impulsive)',
        'Recognize when you\'re in reasonable mind (all logic, cold)',
        'Find a quiet space for reflection',
        'Practice mindfulness to center yourself',
        'Ask: "What does my emotion mind say?" Listen without judgment',
        'Ask: "What does my reasonable mind say?" Consider facts',
        'Seek the synthesis: "What does my wise mind know?" Intuitive knowing',
        'Trust the balanced answer that emerges'
      ]),
      examples: JSON.stringify([
        'Emotion mind: "I hate my job! I should quit right now!" Reasonable: "It\'s just a job, emotions don\'t matter" Wise mind: "I\'m unhappy here. Let me explore options while maintaining stability"',
        'Emotion mind: "I love them! I should tell them immediately!" Reasonable: "Love is illogical" Wise mind: "These feelings are real and important. I\'ll express them when timing is right"'
      ]),
      when: 'When making important decisions, when emotions are overwhelming, or when being too logical',
      benefits: JSON.stringify([
        'Better decision making',
        'Emotional balance',
        'Increased self-trust',
        'Reduces impulsivity',
        'Integrates thinking and feeling',
        'Improves relationships'
      ])
    },
    {
      slug: 'grounding-5-4-3-2-1',
      name: '5-4-3-2-1 Grounding Technique',
      category: 'Mindfulness',
      description: 'A sensory awareness technique to ground you in the present moment, especially helpful for anxiety, panic, dissociation, or flashbacks.',
      steps: JSON.stringify([
        'Pause and take a deep breath',
        'Look around and name 5 things you can SEE',
        'Notice 4 things you can TOUCH (describe the texture)',
        'Listen for 3 things you can HEAR',
        'Identify 2 things you can SMELL (or 2 smells you like)',
        'Notice 1 thing you can TASTE',
        'Take another deep breath',
        'Notice how you feel now compared to when you started'
      ]),
      examples: JSON.stringify([
        'See: door, window, tree, phone, cup',
        'Touch: soft fabric, cool table, rough carpet, smooth phone',
        'Hear: birds chirping, traffic, refrigerator humming',
        'Smell: coffee, fresh air',
        'Taste: mint from toothpaste'
      ]),
      when: 'Use during panic attacks, anxiety, dissociation, flashbacks, or feeling disconnected',
      benefits: JSON.stringify([
        'Immediately grounds you in present',
        'Interrupts panic and anxiety',
        'Reduces dissociation',
        'Can be done anywhere',
        'No equipment needed',
        'Works for PTSD flashbacks',
        'Helps with intrusive thoughts'
      ])
    },
    {
      slug: 'radical-acceptance',
      name: 'Radical Acceptance',
      category: 'DBT',
      description: 'A DBT skill for accepting reality as it is, even when painful, to reduce suffering and create space for change.',
      steps: JSON.stringify([
        'Notice what you\'re resisting',
        'Acknowledge: "This is the situation right now"',
        'Observe your body\'s reaction to non-acceptance',
        'Remember: Acceptance ≠ approval',
        'Choose to accept with your whole self',
        'Return to acceptance if you start fighting',
        'Ask: "What can I do now that I\'ve accepted this?"',
        'Practice with breath: "I accept this moment"'
      ]),
      examples: JSON.stringify([
        'Chronic illness: "This is my reality. Fighting it causes more suffering."',
        'Past trauma: "It happened. I can\'t change the past."',
        'Rejection: "They said no. Fighting won\'t change it."',
        'Mistake: "I messed up. Beating myself up won\'t undo it."'
      ]),
      when: 'When fighting unchangeable reality, "should" thinking causes suffering, or stuck in rumination',
      benefits: JSON.stringify([
        'Reduces suffering',
        'Frees energy for action',
        'Reduces depression and rumination',
        'Helps process grief',
        'Reduces physical tension',
        'Opens path to change',
        'Essential for trauma recovery'
      ])
    },
    {
      slug: 'opposite-action',
      name: 'Opposite Action',
      category: 'DBT',
      description: 'When emotion doesn\'t fit facts, doing opposite of emotional urge can change the emotion.',
      steps: JSON.stringify([
        'Identify emotion and intensity (0-100)',
        'Name the action urge',
        'Check facts: Does emotion fit situation?',
        'If not, commit to opposite action',
        'Do COMPLETE opposite',
        'Include opposite body language',
        'Repeat until emotion changes',
        'Track emotion intensity after'
      ]),
      examples: JSON.stringify([
        'Fear: Avoid → Opposite: Approach',
        'Anger: Attack → Opposite: Be kind',
        'Shame: Hide → Opposite: Share openly',
        'Sadness: Isolate → Opposite: Reach out',
        'Guilt: Apologize → Opposite: Act confidently'
      ]),
      when: 'When emotion doesn\'t fit facts, too intense, or action urge would worsen situation',
      benefits: JSON.stringify([
        'Changes emotions from outside-in',
        'Breaks unhelpful patterns',
        'Builds emotional flexibility',
        'Reduces depression and anxiety',
        'Increases mastery over emotions',
        'Backed by science',
        'Empowering'
      ])
    },
    {
      slug: 'safety-planning',
      name: 'Safety Planning',
      category: 'Crisis Intervention',
      description: 'A crisis tool to help you stay safe when experiencing suicidal thoughts or self-harm urges.',
      steps: JSON.stringify([
        'Warning signs: Identify crisis-triggering thoughts/moods',
        'Internal coping: Things you can do alone',
        'People/places: Social settings for distraction',
        'Support contacts: People to call',
        'Professional contacts: Therapist, crisis line, hospital',
        'Means safety: Remove lethal means',
        'Reasons for living: What makes life worth living',
        'Keep plan accessible: Phone, wallet, visible'
      ]),
      examples: JSON.stringify([
        'Warning signs: "Everything is hopeless", self-harm images, numbness',
        'Internal coping: Music, shower, comfort show, pet, breathing',
        'Social settings: Coffee shop, library, friend\'s house',
        'Support contacts: Best friend, family, sponsor',
        'Professionals: Therapist, 988 Lifeline, hospital',
        'Reasons: My kids, my dog, travel dreams, recovery goals'
      ]),
      when: 'Create when stable. Review regularly. Use when warning signs appear or in crisis.',
      benefits: JSON.stringify([
        'Reduces suicide risk',
        'Provides concrete steps',
        'Interrupts crisis escalation',
        'Reminds you of coping skills',
        'Connects to support',
        'Evidence-based',
        'Can be life-saving'
      ])
    }
  ]

  for (const technique of therapyTechniques) {
    await prisma.therapyTechnique.upsert({
      where: { slug: technique.slug },
      update: {},
      create: technique
    })
  }

  console.log(`✅ Seeded ${therapyTechniques.length} therapy techniques`)

  console.log('✨ Database seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
