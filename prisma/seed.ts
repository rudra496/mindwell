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
    // ANXIETY DISORDERS (5 more)
    {
      slug: 'panic-disorder',
      name: 'Panic Disorder',
      category: 'Anxiety Disorders',
      description: 'Characterized by recurrent unexpected panic attacks and persistent concern about having additional attacks or their consequences.',
      symptoms: JSON.stringify([
        'Sudden episodes of intense fear',
        'Palpitations or accelerated heart rate',
        'Sweating profusely',
        'Trembling or shaking',
        'Shortness of breath or smothering sensation',
        'Feeling of choking',
        'Chest pain or discomfort',
        'Nausea or abdominal distress',
        'Feeling dizzy, unsteady, lightheaded, or faint',
        'Chills or heat sensations',
        'Numbness or tingling sensations',
        'Derealization (feelings of unreality)',
        'Depersonalization (feeling detached from oneself)',
        'Fear of losing control or "going crazy"',
        'Fear of dying',
        'Avoiding places where attacks have occurred',
        'Constant worry about next attack'
      ]),
      biologicalCauses: JSON.stringify([
        'Overactive fear circuitry in brain',
        'Dysregulation of norepinephrine system',
        'Abnormal sensitivity to CO2 and lactate',
        'Genetic predisposition (40% heritability)',
        'Amygdala hyperactivity',
        'Respiratory irregularities'
      ]),
      psychologicalCauses: JSON.stringify([
        'Catastrophic misinterpretation of bodily sensations',
        'Anxiety sensitivity (fear of anxiety symptoms)',
        'Interoceptive conditioning',
        'Hypervigilance to physical sensations',
        'Fear of fear cycle',
        'Learned alarm reactions'
      ]),
      socialCauses: JSON.stringify([
        'Major life stressors',
        'History of childhood separation anxiety',
        'Loss or separation from important person',
        'Physical or sexual abuse',
        'Overprotective parenting',
        'Social modeling of anxious behavior'
      ]),
      prevalence: '2-3% of adults annually; lifetime prevalence 4.7% (NIMH). 2x more common in women.',
      ageOfOnset: 'Typical onset in early 20s, but can occur at any age',
      courseOfIllness: 'Often chronic without treatment. Can lead to agoraphobia. Treatment highly effective.',
      riskFactors: JSON.stringify([
        'Family history of panic disorder',
        'Major life stress',
        'History of childhood abuse',
        'Smoking',
        'Caffeine sensitivity',
        'Female gender',
        'Temperamental anxiety',
        'Other anxiety disorders'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Cognitive behavioral therapy',
        'Strong social support',
        'Understanding of panic mechanisms',
        'Regular exercise',
        'Stress management skills',
        'Avoidance of substances'
      ]),
      comorbidities: JSON.stringify([
        'Agoraphobia (30-50%)',
        'Major depression (50-60%)',
        'Other anxiety disorders',
        'Substance use disorders',
        'Personality disorders',
        'Suicidal ideation (higher risk)'
      ]),
      naturalSolutions: JSON.stringify([
        'Interoceptive exposure exercises',
        'Diaphragmatic breathing',
        'Grounding techniques during attacks',
        'Regular aerobic exercise',
        'Reduce caffeine intake',
        'Quit smoking',
        'Progressive muscle relaxation',
        'Mindfulness meditation',
        'Accept rather than fight panic sensations',
        'Cognitive restructuring of catastrophic thoughts',
        'Gradual exposure to feared situations',
        'Yoga',
        'Adequate sleep',
        'Limit alcohol',
        'Support groups',
        'Temperature change (cold water on face)',
        'Physical exercise during panic',
        'Panic diary to identify triggers',
        'Self-compassion practice',
        'Relaxation breathing apps'
      ]),
      nutritionalRecs: JSON.stringify([
        'Reduce or eliminate caffeine',
        'Limit alcohol consumption',
        'Omega-3 fatty acids',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'Adequate hydration',
        'Regular balanced meals',
        'Avoid blood sugar crashes',
        'Chamomile tea',
        'Passionflower supplement',
        'Inositol supplementation',
        'Avoid stimulants',
        'Green tea (L-theanine)',
        'Tryptophan-rich foods',
        'Probiotic foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - Most effective',
        'Panic-focused CBT',
        'Interoceptive exposure',
        'Breathing retraining',
        'Cognitive restructuring',
        'SSRIs (first-line medication)',
        'SNRIs',
        'Benzodiazepines (short-term only)',
        'Combination of therapy and medication often best',
        'Virtual reality exposure therapy',
        'Mindfulness-based therapies'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Frequent panic attacks (more than one per week)',
        'Persistent worry about panic attacks',
        'Avoiding important activities',
        'Developing agoraphobia',
        'Impact on work or relationships',
        'Co-occurring depression',
        'Substance use to cope',
        'Suicidal thoughts',
        'Quality of life significantly reduced'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association: adaa.org',
        'NAMI HelpLine: 1-800-950-6264'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/panic-disorder',
        'https://adaa.org/understanding-anxiety/panic-disorder',
        'https://pubmed.ncbi.nlm.nih.gov/24559346/ - CBT for panic disorder',
        'https://www.cochrane.org/CD001997/DEPRESSN_cognitive-behavioural-therapy-panic-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent unexpected panic attacks',
        'At least one month of persistent concern or worry about additional attacks',
        'Significant maladaptive change in behavior related to attacks',
        'Not attributable to substances or medical condition',
        'Not better explained by another mental disorder'
      ])
    },
    {
      slug: 'social-anxiety-disorder',
      name: 'Social Anxiety Disorder (Social Phobia)',
      category: 'Anxiety Disorders',
      description: 'Marked fear or anxiety about social situations in which the individual may be scrutinized by others.',
      symptoms: JSON.stringify([
        'Intense fear of social situations',
        'Fear of being judged negatively',
        'Worry about embarrassing or humiliating oneself',
        'Fear of showing anxiety symptoms',
        'Avoidance of social situations',
        'Enduring social situations with intense distress',
        'Excessive self-consciousness',
        'Blushing, sweating, trembling in social situations',
        'Rapid heartbeat in social settings',
        'Nausea or upset stomach',
        'Difficulty making eye contact',
        'Speaking in a soft or quiet voice',
        'Mind going blank',
        'Rigid body posture',
        'Worrying for days or weeks before social event',
        'Post-event rumination',
        'Fear of being the center of attention'
      ]),
      biologicalCauses: JSON.stringify([
        'Overactive amygdala',
        'Genetic factors (30-40% heritability)',
        'Serotonin imbalance',
        'Inherited temperamental traits (behavioral inhibition)',
        'Autonomic nervous system hyperactivity',
        'Brain structure differences in fear circuits'
      ]),
      psychologicalCauses: JSON.stringify([
        'Negative self-beliefs',
        'Perfectionistic standards for social performance',
        'Biased attention to social threats',
        'Safety behaviors that maintain anxiety',
        'Post-event processing (rumination)',
        'Overestimation of social standards',
        'Belief that anxiety is visible to others'
      ]),
      socialCauses: JSON.stringify([
        'Bullying or teasing experiences',
        'Social rejection',
        'Childhood abuse or neglect',
        'Overcontrolling or critical parenting',
        'Lack of social skills development',
        'Traumatic social experience',
        'Cultural factors valuing social performance',
        'Family modeling of social anxiety'
      ]),
      prevalence: '7.1% of adults annually; lifetime prevalence 12.1% (NIMH). Slightly more common in women.',
      ageOfOnset: 'Median age 13 years; typically begins in adolescence',
      courseOfIllness: 'Often chronic without treatment. Usually persists for years. Treatment highly effective.',
      riskFactors: JSON.stringify([
        'Family history of social anxiety',
        'Behavioral inhibition in childhood',
        'Negative social experiences',
        'New social or work demands',
        'Physical appearance concerns',
        'Visible condition (stuttering, tremor)',
        'Female gender',
        'Low socioeconomic status'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support',
        'Social skills training',
        'Positive early social experiences',
        'Secure attachment',
        'Self-compassion',
        'Cognitive flexibility',
        'Early treatment'
      ]),
      comorbidities: JSON.stringify([
        'Major depression (50%)',
        'Other anxiety disorders',
        'Substance use disorders (20%)',
        'Avoidant personality disorder',
        'Eating disorders',
        'Body dysmorphic disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Gradual exposure to feared social situations',
        'Practice social skills',
        'Join social groups or clubs',
        'Mindfulness meditation',
        'Self-compassion exercises',
        'Challenge negative thoughts',
        'Role-play social situations',
        'Focus attention externally (not on self)',
        'Video feedback (seeing yourself)',
        'Drop safety behaviors gradually',
        'Regular exercise',
        'Deep breathing before social events',
        'Positive self-talk',
        'Join support groups',
        'Volunteer work (gradual exposure)',
        'Yoga',
        'Limit social media comparison',
        'Accept imperfection',
        'Progressive muscle relaxation',
        'Cognitive defusion techniques'
      ]),
      nutritionalRecs: JSON.stringify([
        'Limit caffeine (increases anxiety)',
        'Avoid alcohol (temporary relief worsens long-term)',
        'Omega-3 fatty acids',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'L-theanine (green tea)',
        'Chamomile tea',
        'Regular balanced meals',
        'Adequate hydration',
        'Probiotic foods',
        'Avoid excessive sugar',
        'Ashwagandha supplement',
        'Vitamin D if deficient',
        'Zinc-rich foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - Gold standard',
        'Exposure therapy',
        'Social skills training',
        'Cognitive restructuring',
        'Attention training',
        'Video feedback',
        'SSRIs (first-line medication)',
        'SNRIs (venlafaxine)',
        'Beta-blockers (performance situations)',
        'Group CBT',
        'Acceptance and Commitment Therapy (ACT)',
        'Mindfulness-based therapies'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Avoiding important social or work situations',
        'Significant distress in social settings',
        'Impact on career or education',
        'Relationship difficulties',
        'Using substances to cope',
        'Depression develops',
        'Isolated and lonely',
        'Suicidal thoughts',
        'Quality of life severely reduced'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Social Anxiety Association: socialphobia.org',
        'Anxiety and Depression Association: adaa.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/social-anxiety-disorder',
        'https://www.socialphobia.org/',
        'https://pubmed.ncbi.nlm.nih.gov/28092257/ - CBT for social anxiety',
        'https://www.cochrane.org/CD008906/DEPRESSN_psychotherapy-social-anxiety-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Marked fear or anxiety about social situations',
        'Fear of negative evaluation by others',
        'Social situations almost always provoke fear',
        'Social situations are avoided or endured with intense distress',
        'Fear is out of proportion to actual threat',
        'Duration 6 months or more',
        'Causes significant distress or impairment',
        'Not attributable to substance or medical condition'
      ])
    },
    {
      slug: 'agoraphobia',
      name: 'Agoraphobia',
      category: 'Anxiety Disorders',
      description: 'Marked fear or anxiety about situations where escape might be difficult or help unavailable if panic-like symptoms occur.',
      symptoms: JSON.stringify([
        'Fear of using public transportation',
        'Fear of being in open spaces (parking lots, bridges)',
        'Fear of being in enclosed spaces (shops, theaters)',
        'Fear of standing in line or being in crowds',
        'Fear of being outside home alone',
        'Avoidance of feared situations',
        'Needing companion when going out',
        'Enduring situations with intense anxiety',
        'Panic attacks in feared situations',
        'Feeling trapped or helpless',
        'Fear of having panic attack',
        'Restricted lifestyle',
        'Homebound in severe cases',
        'Anticipatory anxiety',
        'Physical symptoms (sweating, rapid heart rate)'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition',
        'Overactive fear circuitry',
        'Dysregulation of neurotransmitters',
        'Amygdala hyperactivity',
        'Often develops after panic attacks',
        'Conditioned fear responses'
      ]),
      psychologicalCauses: JSON.stringify([
        'Fear of having panic attack in public',
        'Fear of embarrassment',
        'Feeling unable to escape',
        'Loss of sense of safety',
        'Catastrophic thinking',
        'Anxiety sensitivity',
        'Learned avoidance'
      ]),
      socialCauses: JSON.stringify([
        'Traumatic event in public place',
        'History of panic attacks',
        'Stressful life events',
        'Childhood separation anxiety',
        'Overprotective parenting',
        'Lack of independent functioning in childhood'
      ]),
      prevalence: '0.9% of adults annually; lifetime 1.3%. 2x more common in women.',
      ageOfOnset: 'Typically late teens to early 30s',
      courseOfIllness: 'Often chronic without treatment. Can severely limit functioning. Treatment effective.',
      riskFactors: JSON.stringify([
        'History of panic disorder',
        'Other phobic conditions',
        'Adverse childhood experiences',
        'Anxious or nervous temperament',
        'Family history of agoraphobia',
        'Female gender',
        'Major stressors'
      ]),
      protectiveFactors: JSON.stringify([
        'Early treatment of panic attacks',
        'Strong social support',
        'Gradual exposure practice',
        'Cognitive behavioral skills',
        'Stress management',
        'Healthy coping strategies'
      ]),
      comorbidities: JSON.stringify([
        'Panic disorder (50%)',
        'Major depression',
        'Other anxiety disorders',
        'Substance use disorders',
        'Personality disorders',
        'PTSD'
      ]),
      naturalSolutions: JSON.stringify([
        'Gradual systematic exposure to feared situations',
        'Start with less feared situations',
        'Practice going out with trusted person',
        'Gradually increase time and distance',
        'Deep breathing exercises',
        'Grounding techniques',
        'Challenge catastrophic thoughts',
        'Create hierarchy of feared situations',
        'Regular exercise',
        'Mindfulness meditation',
        'Yoga',
        'Support groups',
        'Virtual reality exposure',
        'Self-compassion practice',
        'Acceptance of anxiety',
        'Reduce avoidance behaviors',
        'Celebrate small victories',
        'Maintain daily routines',
        'Limit caffeine',
        'Adequate sleep'
      ]),
      nutritionalRecs: JSON.stringify([
        'Reduce caffeine intake',
        'Limit alcohol',
        'Omega-3 fatty acids',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'Regular balanced meals',
        'Adequate hydration',
        'Avoid blood sugar fluctuations',
        'Chamomile tea',
        'L-theanine',
        'Probiotic foods',
        'Vitamin D',
        'Anti-anxiety herbs (consult doctor)'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - Most effective',
        'Exposure therapy (in vivo)',
        'Cognitive restructuring',
        'Interoceptive exposure',
        'Virtual reality exposure',
        'SSRIs',
        'SNRIs',
        'Benzodiazepines (short-term)',
        'Acceptance and Commitment Therapy',
        'Group therapy',
        'Online CBT programs'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Significant avoidance limiting life',
        'Unable to leave home',
        'Dependent on others for daily activities',
        'Depression develops',
        'Substance use to cope',
        'Suicidal thoughts',
        'Job loss or inability to work',
        'Social isolation',
        'Quality of life severely impacted'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association: adaa.org',
        'NAMI HelpLine: 1-800-950-6264'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        'https://adaa.org/understanding-anxiety/agoraphobia',
        'https://pubmed.ncbi.nlm.nih.gov/25961310/ - CBT for agoraphobia',
        'https://www.cochrane.org/CD001459/DEPRESSN_cognitive-behavioural-therapy-agoraphobia'
      ]),
      dsmCriteria: JSON.stringify([
        'Marked fear or anxiety about 2+ situations (public transport, open spaces, enclosed spaces, crowds, being outside home alone)',
        'Fear these situations due to difficulty escaping or getting help',
        'Situations almost always provoke fear',
        'Situations avoided or endured with intense distress',
        'Fear out of proportion to danger',
        'Duration 6+ months',
        'Causes significant distress or impairment',
        'Not better explained by another disorder'
      ])
    },
    {
      slug: 'specific-phobia',
      name: 'Specific Phobia',
      category: 'Anxiety Disorders',
      description: 'Marked fear or anxiety about a specific object or situation that is actively avoided or endured with intense fear.',
      symptoms: JSON.stringify([
        'Immediate intense fear when exposed to phobic stimulus',
        'Panic-like symptoms when confronted',
        'Recognition that fear is excessive',
        'Active avoidance of phobic object/situation',
        'Anticipatory anxiety about encountering phobia',
        'Distress about having the phobia',
        'Rapid heartbeat near phobic stimulus',
        'Sweating or trembling',
        'Shortness of breath',
        'Nausea or dizziness',
        'Fear of fainting',
        'Feeling of losing control',
        'Interference with daily activities',
        'Limiting life choices due to phobia'
      ]),
      biologicalCauses: JSON.stringify([
        'Evolutionary preparedness for certain fears',
        'Genetic predisposition',
        'Amygdala hyperreactivity',
        'Fear conditioning',
        'Traumatic experiences',
        'Inherited temperamental factors'
      ]),
      psychologicalCauses: JSON.stringify([
        'Classical conditioning (learned association)',
        'Observational learning (seeing others fear)',
        'Informational transmission (being told something is dangerous)',
        'Traumatic experience with object',
        'Catastrophic thinking',
        'Anxiety sensitivity'
      ]),
      socialCauses: JSON.stringify([
        'Cultural beliefs about danger',
        'Parental modeling of fear',
        'Overprotective parenting',
        'Traumatic event involving phobic object',
        'Media portrayals of danger',
        'Social reinforcement of avoidance'
      ]),
      prevalence: '7-9% of adults annually. Most common anxiety disorder. More common in women.',
      ageOfOnset: 'Varies by type: animal phobias (childhood), blood-injection-injury (childhood), situational phobias (early 20s)',
      courseOfIllness: 'Often chronic without treatment. Childhood phobias may remit. Treatment highly effective.',
      riskFactors: JSON.stringify([
        'Traumatic experience',
        'Family history of phobias or anxiety',
        'Childhood temperament (behavioral inhibition)',
        'Negative information about stimulus',
        'Female gender',
        'Other anxiety disorders'
      ]),
      protectiveFactors: JSON.stringify([
        'Early exposure therapy',
        'Positive experiences with feared object',
        'Cognitive flexibility',
        'Strong coping skills',
        'Social support',
        'Accurate information about risks'
      ]),
      comorbidities: JSON.stringify([
        'Other specific phobias (75%)',
        'Social anxiety disorder',
        'Panic disorder',
        'Major depression',
        'Substance use disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Gradual exposure therapy (self-directed)',
        'Progressive desensitization',
        'Systematic exposure hierarchy',
        'Relaxation techniques before exposure',
        'Deep breathing during exposure',
        'Cognitive restructuring of fearful thoughts',
        'Mindfulness during exposure',
        'Virtual reality exposure',
        'Observing others safely interact',
        'Education about phobic object',
        'Challenge catastrophic predictions',
        'Acceptance of anxiety during exposure',
        'Support groups',
        'Self-compassion practice',
        'Regular exercise',
        'Stress management',
        'Sleep hygiene',
        'Yoga',
        'Limit avoidance behaviors',
        'Celebrate exposure successes'
      ]),
      nutritionalRecs: JSON.stringify([
        'Limit caffeine before exposures',
        'Avoid alcohol as coping mechanism',
        'Omega-3 fatty acids',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'Regular balanced diet',
        'Adequate hydration',
        'Chamomile tea for relaxation',
        'L-theanine',
        'Avoid blood sugar crashes'
      ]),
      therapyApproaches: JSON.stringify([
        'Exposure Therapy - Gold standard (80-90% success)',
        'Systematic desensitization',
        'Virtual reality exposure',
        'One-session treatment (OST) for specific phobias',
        'Cognitive restructuring',
        'Applied tension (for blood-injection-injury type)',
        'Medications rarely needed',
        'Benzodiazepines (occasionally for specific situations)',
        'D-cycloserine to enhance exposure',
        'Acceptance and Commitment Therapy'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Phobia interferes with work or school',
        'Avoiding important activities',
        'Limiting travel or experiences',
        'Relationship problems due to phobia',
        'Severe distress',
        'Multiple phobias',
        'Co-occurring depression or substance use',
        'Unable to do self-directed exposure',
        'Phobia worsening over time'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association: adaa.org',
        'NAMI HelpLine: 1-800-950-6264'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/specific-phobia',
        'https://adaa.org/understanding-anxiety/specific-phobias',
        'https://pubmed.ncbi.nlm.nih.gov/28709021/ - One-session treatment',
        'https://www.cochrane.org/CD007474/DEPRESSN_psychotherapies-specific-phobias-adults'
      ]),
      dsmCriteria: JSON.stringify([
        'Marked fear or anxiety about specific object or situation',
        'Phobic object/situation almost always provokes immediate fear',
        'Actively avoided or endured with intense fear',
        'Fear out of proportion to actual danger',
        'Duration 6+ months',
        'Causes significant distress or impairment',
        'Not better explained by another mental disorder'
      ])
    },
    {
      slug: 'selective-mutism',
      name: 'Selective Mutism',
      category: 'Anxiety Disorders',
      description: 'Consistent failure to speak in specific social situations where speaking is expected, despite speaking in other situations.',
      symptoms: JSON.stringify([
        'Inability to speak in specific social situations',
        'Speaking normally in comfortable settings (home)',
        'Interferes with school or work achievement',
        'Impairs social communication',
        'Lasts at least 1 month',
        'Anxiety or shyness in social settings',
        'Freezing when expected to speak',
        'Using nonverbal communication (nodding, writing)',
        'Clinging to caregivers',
        'Social withdrawal',
        'Sensitivity to sensory stimuli',
        'Difficulty with eye contact',
        'Expressionless face',
        'Awkward body language',
        'Fear of embarrassment'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition to anxiety',
        'Amygdala hyperactivity',
        'Inherited temperamental traits',
        'Speech or language disorders',
        'Auditory processing difficulties',
        'Brain differences in anxiety circuits'
      ]),
      psychologicalCauses: JSON.stringify([
        'Extreme social anxiety',
        'Fear of speaking and being judged',
        'Perfectionism about speech',
        'Low self-esteem',
        'Difficulty with transitions',
        'Traumatic event related to speaking',
        'Embarrassment about accent or speech'
      ]),
      socialCauses: JSON.stringify([
        'Overprotective parenting',
        'Family history of social anxiety',
        'Immigration or bilingualism stress',
        'Bullying or teasing',
        'Traumatic social experiences',
        'Social isolation',
        'Cultural factors',
        'Family communication patterns'
      ]),
      prevalence: '0.03-1% of children. More common in girls. Often begins before age 5.',
      ageOfOnset: 'Typically noticed when child enters school (age 3-5)',
      courseOfIllness: 'Can be chronic if untreated. Early intervention improves outcomes. May evolve into social anxiety disorder.',
      riskFactors: JSON.stringify([
        'Family history of anxiety disorders',
        'Behavioral inhibition',
        'Speech or language delays',
        'Bilingualism',
        'Immigration',
        'Shy or anxious temperament',
        'Female gender'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Supportive school environment',
        'Patient, understanding caregivers',
        'Gradual exposure to speaking situations',
        'Speech therapy if needed',
        'Building confidence gradually'
      ]),
      comorbidities: JSON.stringify([
        'Social anxiety disorder (90%)',
        'Specific phobia',
        'Separation anxiety disorder',
        'Generalized anxiety disorder',
        'Speech or language disorders',
        'Developmental delays'
      ]),
      naturalSolutions: JSON.stringify([
        'Gradual exposure to speaking situations',
        'Start with comfortable listeners',
        'Positive reinforcement for attempts',
        'Reduce pressure to speak',
        'Build confidence in other areas',
        'Play-based interactions',
        'Sliding-in technique (gradual introductions)',
        'Self-modeling videos',
        'Brave talking program',
        'Stimulus fading',
        'Shaping (reinforce approximations)',
        'Practice at home',
        'Role-playing',
        'Build social skills',
        'Address underlying anxiety',
        'Avoid forcing speech',
        'Celebrate small successes',
        'Patient, consistent approach',
        'School accommodations',
        'Support groups for parents'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet',
        'Limit sugar and processed foods',
        'Omega-3 fatty acids',
        'Adequate protein',
        'B-vitamins',
        'Magnesium-rich foods',
        'Avoid excessive caffeine (if older child)',
        'Regular meal times',
        'Adequate hydration',
        'Probiotic foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Behavioral therapy - Most effective',
        'Gradual exposure',
        'Stimulus fading',
        'Shaping techniques',
        'Positive reinforcement',
        'Parent-child interaction therapy',
        'Play therapy',
        'School-based interventions',
        'Speech therapy (if language issues)',
        'SSRIs (for severe cases)',
        'Family therapy',
        'Social skills training'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Mutism persists beyond 1 month in school',
        'Interfering with learning',
        'Social isolation',
        'Child is distressed',
        'Not improving with time',
        'Affecting self-esteem',
        'Family stress high',
        'Need school accommodations'
      ]),
      crisisResources: JSON.stringify([
        'Selective Mutism Association: selectivemutism.org',
        'Anxiety and Depression Association: adaa.org',
        'SAMHSA National Helpline: 1-800-662-4357',
        'School counselors and psychologists',
        'Child Mind Institute: childmind.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        'https://selectivemutism.org/',
        'https://childmind.org/guide/guide-to-selective-mutism/',
        'https://pubmed.ncbi.nlm.nih.gov/28301772/ - Treatment of selective mutism'
      ]),
      dsmCriteria: JSON.stringify([
        'Consistent failure to speak in specific social situations',
        'Speaks in other situations',
        'Interferes with educational/occupational achievement or social communication',
        'Duration at least 1 month (not limited to first month of school)',
        'Not due to lack of knowledge of spoken language',
        'Not better explained by communication disorder',
        'Not better explained by autism spectrum disorder, schizophrenia, or other psychotic disorder'
      ])
    },
    // MOOD DISORDERS CONTINUED
    {
      slug: 'bipolar-ii-disorder',
      name: 'Bipolar II Disorder',
      category: 'Mood Disorders',
      description: 'A mental health condition characterized by a pattern of depressive episodes and hypomanic episodes, but not the full-blown manic episodes that are typical of Bipolar I.',
      symptoms: JSON.stringify([
        'Episodes of hypomania (elevated mood but less severe than mania)',
        'Major depressive episodes',
        'Increased energy during hypomanic episodes',
        'Decreased need for sleep during hypomania',
        'More talkative than usual',
        'Racing thoughts',
        'Increased goal-directed activity',
        'Risky behavior during hypomania',
        'Rapid mood changes',
        'Irritability',
        'Poor judgment during hypomanic episodes',
        'Difficulty concentrating',
        'Feelings of euphoria or grandiosity during hypomania',
        'Severe depression between hypomanic episodes',
        'Suicidal thoughts during depressive episodes'
      ]),
      biologicalCauses: JSON.stringify([
        'Strong genetic component (80-90% heritability)',
        'Brain structure differences in prefrontal cortex and amygdala',
        'Neurotransmitter imbalances (dopamine, serotonin, norepinephrine)',
        'Circadian rhythm disruptions',
        'Hormonal dysregulation (thyroid, cortisol)',
        'Abnormalities in mitochondrial function',
        'Ion channel dysfunction'
      ]),
      psychologicalCauses: JSON.stringify([
        'Stress sensitivity',
        'Cognitive patterns during mood episodes',
        'Poor stress management skills',
        'Low insight into mood changes',
        'Difficulty regulating emotions',
        'History of trauma may trigger episodes'
      ]),
      socialCauses: JSON.stringify([
        'Disrupted sleep-wake cycle',
        'Major life stressors',
        'Relationship conflicts',
        'Work or academic pressures',
        'Social isolation during depressive episodes',
        'Substance use',
        'Seasonal changes'
      ]),
      prevalence: '0.8% of U.S. adults. Often misdiagnosed as major depression (NIMH)',
      ageOfOnset: 'Average age of onset is late teens to early 20s',
      courseOfIllness: 'Chronic, lifelong condition. Average of 4-5 episodes over lifetime. Depressive episodes last longer than hypomanic episodes.',
      riskFactors: JSON.stringify([
        'Family history of bipolar disorder',
        'First-degree relative with bipolar I or II',
        'Childhood trauma or abuse',
        'Major stressful life events',
        'Substance abuse',
        'Sleep disruption',
        'Seasonal changes',
        'Female gender (slightly higher risk)',
        'History of other mental health disorders'
      ]),
      protectiveFactors: JSON.stringify([
        'Medication adherence',
        'Regular sleep schedule',
        'Strong social support',
        'Stress management skills',
        'Regular therapy',
        'Mood tracking and awareness',
        'Avoiding alcohol and drugs',
        'Healthy lifestyle habits',
        'Early warning sign recognition'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (50-60%)',
        'ADHD (20-30%)',
        'Substance use disorders (40-50%)',
        'Eating disorders',
        'PTSD',
        'Personality disorders',
        'Thyroid disorders',
        'Migraine headaches'
      ]),
      naturalSolutions: JSON.stringify([
        'Strict sleep hygiene (same bedtime/wake time daily)',
        'Light therapy in morning',
        'Regular aerobic exercise (30 min, 4-5x/week)',
        'Avoid stimulants (caffeine, energy drinks)',
        'Omega-3 fatty acids supplementation',
        'Mindfulness meditation',
        'Stress reduction techniques',
        'Social rhythm therapy principles',
        'Avoid alcohol and recreational drugs',
        'Regular meal times',
        'Limit screen time before bed',
        'Temperature regulation (cool bedroom)',
        'Avoid triggers (late nights, excessive stress)',
        'Daily mood tracking',
        'Routine and structure',
        'Sunlight exposure in morning',
        'Avoid shift work if possible',
        'Support groups',
        'Cognitive stimulation activities',
        'Yoga and relaxation exercises'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (EPA/DHA, 2-4g/day)',
        'Vitamin D (2000-5000 IU/day)',
        'B-complex vitamins (B6, B12, folate)',
        'Magnesium (400-500mg/day)',
        'Zinc-rich foods',
        'Mediterranean diet pattern',
        'Limit caffeine (especially after noon)',
        'Avoid alcohol completely',
        'Complex carbohydrates for stable blood sugar',
        'Protein with each meal',
        'N-acetylcysteine (NAC) 1000mg 2x/day (research support)',
        'Avoid simple sugars',
        'Stay hydrated',
        'Regular meal timing',
        'Tryptophan-containing foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Mood stabilizers (Lithium, Lamotrigine) - first-line treatment',
        'Cognitive Behavioral Therapy for Bipolar (CBT-BD)',
        'Interpersonal and Social Rhythm Therapy (IPSRT)',
        'Family-Focused Therapy (FFT)',
        'Psychoeducation about the disorder',
        'Antidepressants (with caution, with mood stabilizer)',
        'Group therapy',
        'Dialectical Behavior Therapy (DBT) for emotion regulation',
        'Mindfulness-Based Cognitive Therapy (MBCT)',
        'Relapse prevention planning',
        'Sleep hygiene therapy',
        'Lifestyle modification counseling'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Experiencing a hypomanic or depressive episode',
        'Mood changes affecting work or relationships',
        'Sleep patterns significantly disrupted',
        'Engaging in risky behaviors',
        'Thoughts of suicide or self-harm',
        'Substance use to manage moods',
        'Family expresses concern about behavior',
        'Difficulty maintaining routine',
        'Medication side effects',
        'Need for medication adjustment'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'DBSA (Depression and Bipolar Support Alliance): 1-800-826-3632',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
        'https://pubmed.ncbi.nlm.nih.gov/27569528/ - Omega-3 for bipolar',
        'https://pubmed.ncbi.nlm.nih.gov/28942852/ - IPSRT therapy',
        'https://www.dbsalliance.org/'
      ]),
      dsmCriteria: JSON.stringify([
        'At least one hypomanic episode',
        'At least one major depressive episode',
        'Hypomanic episode: distinct period of elevated/irritable mood lasting at least 4 days',
        'Three or more symptoms during hypomanic episode (four if mood is only irritable)',
        'Episode associated with change in functioning observable by others',
        'Episode not severe enough to cause marked impairment or hospitalization',
        'Not attributable to substances or medical condition',
        'Never had a manic episode',
        'Not better explained by schizophrenia spectrum disorder',
        'Symptoms cause significant distress or impairment',
        'Major depressive episode criteria met',
        'Cycling between depression and hypomania'
      ])
    },
    {
      slug: 'cyclothymic-disorder',
      name: 'Cyclothymic Disorder (Cyclothymia)',
      category: 'Mood Disorders',
      description: 'A chronic mood disorder characterized by numerous periods of hypomanic symptoms and depressive symptoms that do not meet full criteria for hypomanic or depressive episodes.',
      symptoms: JSON.stringify([
        'Frequent mood swings',
        'Periods of elevated mood (not full hypomania)',
        'Periods of low mood (not full depression)',
        'Mood instability for extended periods',
        'Unpredictable mood changes',
        'Brief periods of normal mood (less than 2 months)',
        'Increased energy during up periods',
        'Irritability',
        'Impulsivity',
        'Fatigue during down periods',
        'Sleep changes',
        'Difficulty with relationships due to mood changes',
        'Work or school problems',
        'Racing thoughts',
        'Low self-esteem during down periods'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family history of bipolar disorder)',
        'Neurotransmitter irregularities',
        'Brain structure differences',
        'Circadian rhythm abnormalities',
        'May be early or mild form of bipolar disorder',
        'Neurochemical sensitivity'
      ]),
      psychologicalCauses: JSON.stringify([
        'Temperamental factors',
        'Emotional dysregulation',
        'Stress sensitivity',
        'Maladaptive coping patterns',
        'Low distress tolerance',
        'Identity issues related to mood instability'
      ]),
      socialCauses: JSON.stringify([
        'Unstable relationships',
        'Chronic stress',
        'Disrupted sleep patterns',
        'Substance use',
        'Lack of routine',
        'Poor social support',
        'Occupational instability'
      ]),
      prevalence: '0.4-1% of U.S. population. Equal in males and females. 15-50% may develop bipolar I or II',
      ageOfOnset: 'Typically begins in adolescence or early adulthood',
      courseOfIllness: 'Chronic, with symptoms present for at least 2 years (1 year in children/adolescents). May progress to bipolar disorder.',
      riskFactors: JSON.stringify([
        'Family history of bipolar disorder',
        'First-degree relative with mood disorder',
        'Early age of mood symptom onset',
        'High stress environment',
        'Substance use',
        'Sleep disruption',
        'Childhood adversity',
        'Trauma history'
      ]),
      protectiveFactors: JSON.stringify([
        'Regular sleep-wake schedule',
        'Stable daily routine',
        'Mood monitoring',
        'Supportive relationships',
        'Stress management skills',
        'Avoidance of alcohol and drugs',
        'Regular therapy',
        'Healthy lifestyle'
      ]),
      comorbidities: JSON.stringify([
        'Substance use disorders (high rates)',
        'Sleep disorders',
        'Anxiety disorders',
        'ADHD',
        'Personality disorders',
        'May progress to bipolar I or II (15-50%)'
      ]),
      naturalSolutions: JSON.stringify([
        'Strict sleep hygiene (critical)',
        'Daily routine and structure',
        'Mood tracking daily',
        'Regular exercise (moderate, not excessive)',
        'Stress reduction techniques',
        'Avoid stimulants and depressants',
        'Mindfulness meditation',
        'Social rhythm stability',
        'Limit major life changes',
        'Morning light exposure',
        'Avoid alcohol and drugs completely',
        'Balanced diet',
        'Consistent meal times',
        'Support groups',
        'Journaling',
        'Grounding techniques',
        'Temperature regulation for sleep',
        'Limit screen time',
        'Regular social activities',
        'Creative outlets'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (2g/day)',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'Vitamin D supplementation',
        'Stable blood sugar (complex carbs)',
        'Avoid caffeine excess',
        'No alcohol',
        'Adequate protein',
        'Mediterranean diet',
        'Tryptophan-containing foods',
        'Zinc-rich foods',
        'Limit processed foods',
        'Stay hydrated',
        'Regular meal schedule',
        'Avoid sugar spikes'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT)',
        'Interpersonal and Social Rhythm Therapy (IPSRT)',
        'Dialectical Behavior Therapy (DBT) for mood regulation',
        'Psychoeducation',
        'Family therapy',
        'Mood stabilizers (if progressing to bipolar)',
        'Group therapy',
        'Mindfulness-Based Cognitive Therapy',
        'Lifestyle modification counseling',
        'Relapse prevention',
        'Sleep hygiene therapy'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Mood swings interfering with daily life',
        'Relationship or work problems due to mood',
        'Symptoms worsening or becoming more frequent',
        'Developing full hypomanic or depressive episodes',
        'Substance use to manage moods',
        'Sleep significantly disrupted',
        'Risky behaviors during elevated moods',
        'Suicidal thoughts during low moods',
        'Family history of bipolar disorder',
        'Unable to maintain stability'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'DBSA (Depression and Bipolar Support Alliance): 1-800-826-3632',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
        'https://pubmed.ncbi.nlm.nih.gov/23429693/ - Cyclothymia and bipolar',
        'https://www.dbsalliance.org/',
        'https://pubmed.ncbi.nlm.nih.gov/25622767/ - Treatment approaches'
      ]),
      dsmCriteria: JSON.stringify([
        'Numerous periods with hypomanic symptoms',
        'Numerous periods with depressive symptoms',
        'Symptoms do not meet criteria for hypomanic or depressive episode',
        'Symptoms present at least 2 years in adults (1 year in children/adolescents)',
        'Never without symptoms for more than 2 months at a time',
        'Criteria for major depressive, manic, or hypomanic episode never met',
        'Not better explained by schizophrenia spectrum disorder',
        'Not attributable to substances or medical condition',
        'Symptoms cause significant distress or impairment',
        'Persistent mood instability'
      ])
    },
    {
      slug: 'persistent-depressive-disorder',
      name: 'Persistent Depressive Disorder (Dysthymia)',
      category: 'Mood Disorders',
      description: 'A chronic form of depression where a person experiences depressed mood for most days for at least two years, along with at least two other depressive symptoms.',
      symptoms: JSON.stringify([
        'Depressed mood most of the day, more days than not',
        'Poor appetite or overeating',
        'Insomnia or hypersomnia',
        'Low energy or fatigue',
        'Low self-esteem',
        'Poor concentration or difficulty making decisions',
        'Feelings of hopelessness',
        'Chronic sadness',
        'Loss of interest in activities',
        'Social withdrawal',
        'Irritability',
        'Decreased productivity',
        'Guilt about the past',
        'Pessimistic attitude',
        'Functional but not thriving'
      ]),
      biologicalCauses: JSON.stringify([
        'Neurotransmitter imbalances (serotonin, norepinephrine)',
        'Genetic predisposition',
        'Chronic stress effects on brain',
        'HPA axis dysregulation',
        'Inflammation markers',
        'Brain structure changes in hippocampus and prefrontal cortex',
        'Cortisol dysregulation'
      ]),
      psychologicalCauses: JSON.stringify([
        'Chronic negative thinking patterns',
        'Low self-esteem',
        'Learned helplessness',
        'Cognitive distortions become habitual',
        'Perfectionism',
        'History of early trauma',
        'Chronic stress'
      ]),
      socialCauses: JSON.stringify([
        'Chronic stressors (financial, relationship)',
        'Social isolation',
        'Lack of social support',
        'Childhood adversity or neglect',
        'Chronic illness in family',
        'Occupational stress',
        'Limited resources or opportunities'
      ]),
      prevalence: '1.5% of U.S. adults per year. 3-6% lifetime prevalence. More common in women (NIMH)',
      ageOfOnset: 'Often begins in childhood, adolescence, or early adulthood',
      courseOfIllness: 'Chronic, lasting years to decades. May have periods of major depression. 10-25% may develop bipolar disorder.',
      riskFactors: JSON.stringify([
        'Family history of depression',
        'Childhood trauma or adversity',
        'Chronic medical conditions',
        'Other mental health disorders',
        'Chronic stress',
        'Female gender',
        'Low socioeconomic status',
        'Early onset of depressive symptoms',
        'Personality traits (neuroticism)'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support',
        'Therapy and treatment adherence',
        'Regular exercise',
        'Sense of purpose',
        'Problem-solving skills',
        'Positive relationships',
        'Healthy lifestyle habits',
        'Mindfulness practices',
        'Access to mental health care'
      ]),
      comorbidities: JSON.stringify([
        'Major depressive disorder (can overlap)',
        'Anxiety disorders (50-60%)',
        'Substance use disorders',
        'Personality disorders',
        'Eating disorders',
        'Chronic medical conditions',
        'Sleep disorders',
        'ADHD'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular aerobic exercise (critical for chronic depression)',
        'Behavioral activation therapy principles',
        'Light therapy (especially with seasonal component)',
        'Sleep hygiene',
        'Social engagement activities',
        'Mindfulness meditation',
        'Gratitude practices',
        'Cognitive restructuring daily',
        'Goal-setting and achievement',
        'Volunteer work',
        'Time in nature regularly',
        'Creative pursuits',
        'Pet companionship',
        'Support groups',
        'Structured daily routine',
        'Morning sunlight exposure',
        'Yoga or tai chi',
        'Journaling',
        'Limit social media',
        'Music therapy'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (1-2g/day)',
        'Vitamin D (check levels, supplement if low)',
        'B-complex vitamins',
        'Folate-rich foods',
        'Magnesium-rich foods',
        'Mediterranean diet pattern',
        'Probiotic foods for gut-brain axis',
        'Complex carbohydrates',
        'Adequate protein',
        'Limit caffeine',
        'Avoid alcohol',
        'Tryptophan sources',
        'Zinc-rich foods',
        'Regular meal timing',
        'SAMe (S-adenosylmethionine) supplement (under doctor supervision)'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - effective for chronic patterns',
        'Mindfulness-Based Cognitive Therapy (MBCT)',
        'Cognitive Behavioral Analysis System of Psychotherapy (CBASP) - specific for PDD',
        'Interpersonal Therapy (IPT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Behavioral Activation',
        'Antidepressants (SSRIs, SNRIs) - often needed long-term',
        'Combination of therapy and medication most effective',
        'Psychodynamic therapy',
        'Group therapy',
        'Long-term supportive therapy'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Chronic low mood for years',
        'Unable to experience joy or pleasure',
        'Functioning impaired at work or relationships',
        'Self-medication with substances',
        'Development of major depressive episode',
        'Suicidal thoughts',
        'Quality of life significantly reduced',
        'Previous treatment ineffective',
        'Physical health declining',
        'Relationship breakdown due to depression'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Veterans Crisis Line: 988 then press 1',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/depression/index.shtml',
        'https://pubmed.ncbi.nlm.nih.gov/16634355/ - CBASP for chronic depression',
        'https://pubmed.ncbi.nlm.nih.gov/28903117/ - Treatment resistant depression',
        'https://www.cochrane.org/CD008950/DEPRESSN_treatments-chronic-depression'
      ]),
      dsmCriteria: JSON.stringify([
        'Depressed mood for most of the day, for more days than not',
        'Duration at least 2 years (1 year in children/adolescents)',
        'Two or more of: poor appetite or overeating, insomnia or hypersomnia, low energy, low self-esteem, poor concentration, feelings of hopelessness',
        'Never without symptoms for more than 2 months at a time',
        'May have concurrent major depressive disorder',
        'Never had manic or hypomanic episode',
        'Not better explained by psychotic disorder',
        'Not attributable to substances or medical condition',
        'Symptoms cause significant distress or impairment',
        'Chronic, unremitting course'
      ])
    },
    {
      slug: 'seasonal-affective-disorder',
      name: 'Seasonal Affective Disorder (SAD)',
      category: 'Mood Disorders',
      description: 'A type of depression that occurs at a specific time of year, usually in the fall and winter when there is less natural sunlight, with symptoms that resolve in spring and summer.',
      symptoms: JSON.stringify([
        'Depressed mood during specific seasons',
        'Loss of interest in activities',
        'Low energy and fatigue',
        'Hypersomnia (oversleeping)',
        'Increased appetite, especially carbohydrate cravings',
        'Weight gain',
        'Difficulty concentrating',
        'Social withdrawal ("hibernation")',
        'Irritability',
        'Feelings of hopelessness',
        'Lack of motivation',
        'Daytime drowsiness',
        'Difficulty waking up',
        'Craving starchy and sweet foods',
        'Symptoms improve with season change'
      ]),
      biologicalCauses: JSON.stringify([
        'Reduced sunlight disrupts circadian rhythm',
        'Decreased serotonin levels due to less sunlight',
        'Increased melatonin production (darkness)',
        'Vitamin D deficiency',
        'Genetic predisposition',
        'Retinal sensitivity to light',
        'Disrupted biological clock'
      ]),
      psychologicalCauses: JSON.stringify([
        'Anticipation of winter symptoms',
        'Negative associations with seasons',
        'Behavioral changes (less activity in winter)',
        'Social isolation during winter months',
        'Stress about seasonal pattern',
        'Reduced positive activities'
      ]),
      socialCauses: JSON.stringify([
        'Less outdoor activity in winter',
        'Reduced social interaction',
        'Shorter days and less light exposure',
        'Holiday stress',
        'Living at higher latitudes',
        'Indoor lifestyle in winter',
        'Weather-related isolation'
      ]),
      prevalence: '5% of U.S. adults. More common in women (4:1 ratio). Higher prevalence at northern latitudes (NIMH)',
      ageOfOnset: 'Typically begins in early adulthood (18-30 years)',
      courseOfIllness: 'Recurrent pattern, symptoms appear in fall/winter and remit in spring/summer. Pattern usually consistent year to year.',
      riskFactors: JSON.stringify([
        'Living far from equator (higher latitudes)',
        'Family history of SAD or depression',
        'Having depression or bipolar disorder',
        'Female gender',
        'Younger age',
        'Vitamin D deficiency',
        'Low exposure to sunlight',
        'Working indoors with limited natural light',
        'Personal history of SAD'
      ]),
      protectiveFactors: JSON.stringify([
        'Light therapy use',
        'Regular outdoor activity in daylight',
        'Vitamin D supplementation',
        'Maintaining social connections',
        'Regular exercise',
        'Anticipating and preparing for seasonal change',
        'Keeping active schedule',
        'Travel to sunny locations'
      ]),
      comorbidities: JSON.stringify([
        'Major depressive disorder',
        'Bipolar disorder (seasonal pattern)',
        'Anxiety disorders',
        'Eating disorders',
        'ADHD',
        'Substance use disorders',
        'Chronic fatigue syndrome'
      ]),
      naturalSolutions: JSON.stringify([
        'Light therapy (10,000 lux light box, 30 min/morning) - MOST EFFECTIVE',
        'Maximize natural light exposure',
        'Morning outdoor walks',
        'Regular exercise (especially outdoors)',
        'Dawn simulator alarm clock',
        'Keep curtains open during day',
        'Sit near windows at work',
        'Winter vacation to sunny location',
        'Social engagement activities',
        'Maintain regular sleep schedule',
        'Cognitive behavioral therapy for SAD',
        'Behavioral activation',
        'Negative ion generator',
        'Vitamin D supplementation',
        'Minimize carbohydrate cravings',
        'Plan enjoyable winter activities',
        'Regular routines',
        'Bright indoor environments',
        'Reflective surfaces to increase light',
        'Avoid oversleeping'
      ]),
      nutritionalRecs: JSON.stringify([
        'Vitamin D (2000-5000 IU/day in winter)',
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Magnesium',
        'Complex carbohydrates (not simple sugars)',
        'Adequate protein to stabilize mood',
        'Limit refined carbohydrates',
        'Tryptophan-rich foods',
        'Mediterranean diet',
        'Avoid excessive caffeine',
        'Moderate alcohol intake',
        'Regular meal timing',
        'Folate-rich foods',
        'Balanced meals to prevent carb crashes',
        'Stay hydrated'
      ]),
      therapyApproaches: JSON.stringify([
        'Light therapy - First-line treatment (10,000 lux, 30 min/day)',
        'Cognitive Behavioral Therapy for SAD (CBT-SAD)',
        'Behavioral activation',
        'Antidepressants (SSRIs) - especially for severe cases',
        'Bupropion (Wellbutrin) - FDA approved for prevention',
        'Dawn simulation',
        'Vitamin D supplementation',
        'Combination of light therapy and CBT most effective',
        'Mindfulness-Based Cognitive Therapy',
        'Group therapy',
        'Preventive treatment before symptom onset'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms significantly impair functioning',
        'Pattern of seasonal depression for 2+ years',
        'Unable to manage symptoms with light therapy alone',
        'Suicidal thoughts',
        'Substance use to cope',
        'Relationship or work problems',
        'Severe carbohydrate cravings and weight gain',
        'Extreme fatigue interfering with life',
        'Social isolation becoming severe',
        'Want to prevent next seasonal episode'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Veterans Crisis Line: 988 then press 1',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder',
        'https://pubmed.ncbi.nlm.nih.gov/26423349/ - Light therapy efficacy',
        'https://pubmed.ncbi.nlm.nih.gov/27071560/ - CBT for SAD',
        'https://www.psychiatry.org/patients-families/depression/seasonal-affective-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pattern of major depressive episodes at characteristic times of year',
        'Full remissions also occur at characteristic times',
        'Seasonal episodes substantially outnumber non-seasonal episodes',
        'Pattern present for at least 2 years',
        'Most commonly occurs in winter with remission in summer',
        'Meets full criteria for major depressive episode during season',
        'Specified as "with seasonal pattern" in diagnosis',
        'Not better explained by seasonal psychosocial stressors',
        'Symptoms include atypical features (oversleeping, overeating)',
        'Recurrent and predictable pattern'
      ])
    },
    {
      slug: 'postpartum-depression',
      name: 'Postpartum Depression (PPD)',
      category: 'Mood Disorders',
      description: 'A serious mood disorder that can affect women after childbirth, characterized by feelings of extreme sadness, anxiety, and exhaustion that may make it difficult to care for oneself or the baby.',
      symptoms: JSON.stringify([
        'Depressed mood or severe mood swings',
        'Excessive crying',
        'Difficulty bonding with baby',
        'Withdrawing from family and friends',
        'Loss of appetite or eating much more than usual',
        'Inability to sleep (insomnia) or sleeping too much',
        'Overwhelming fatigue or loss of energy',
        'Reduced interest and pleasure in activities',
        'Intense irritability and anger',
        'Fear of not being a good mother',
        'Feelings of worthlessness, shame, guilt or inadequacy',
        'Diminished ability to think clearly or make decisions',
        'Severe anxiety and panic attacks',
        'Thoughts of harming self or baby',
        'Recurrent thoughts of death or suicide'
      ]),
      biologicalCauses: JSON.stringify([
        'Dramatic drop in hormones (estrogen, progesterone) after delivery',
        'Thyroid hormone changes',
        'Sleep deprivation',
        'Physical recovery from childbirth',
        'Genetic predisposition',
        'Neurotransmitter changes',
        'Immune system changes',
        'Blood volume and pressure changes'
      ]),
      psychologicalCauses: JSON.stringify([
        'Overwhelmed by new responsibilities',
        'Anxiety about ability to care for baby',
        'Loss of identity or sense of control',
        'Adjustment to motherhood',
        'History of depression or anxiety',
        'Traumatic birth experience',
        'Perfectionist expectations',
        'Body image concerns'
      ]),
      socialCauses: JSON.stringify([
        'Lack of social support',
        'Relationship problems',
        'Financial stress',
        'Single parenthood',
        'Unplanned or unwanted pregnancy',
        'Infant health problems',
        'Social isolation',
        'Unrealistic expectations from society'
      ]),
      prevalence: '10-15% of new mothers. Can occur up to 1 year after birth. More common than recognized (APA)',
      ageOfOnset: 'Typically within first 4 weeks after delivery, but can occur up to 1 year postpartum',
      courseOfIllness: 'Can last weeks to months if untreated. With treatment, most women recover fully. Risk of recurrence in future pregnancies.',
      riskFactors: JSON.stringify([
        'History of depression or anxiety',
        'Previous postpartum depression',
        'Bipolar disorder',
        'Depression during pregnancy',
        'Stressful life events',
        'Lack of social support',
        'Relationship problems',
        'Financial difficulties',
        'Complications during pregnancy or delivery',
        'Unplanned or unwanted pregnancy',
        'Infant with special needs or health problems',
        'Young maternal age'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support network',
        'Supportive partner',
        'Help with childcare and household tasks',
        'Adequate sleep (assistance with night feedings)',
        'Realistic expectations',
        'Self-care practices',
        'Professional support (doula, lactation consultant)',
        'Mental health screening and early intervention',
        'Support groups for new mothers'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (often co-occurs)',
        'Panic disorder',
        'PTSD (especially after traumatic birth)',
        'Obsessive-compulsive disorder',
        'Thyroid disorders',
        'Anemia',
        'Bipolar disorder',
        'Postpartum psychosis (rare but serious)'
      ]),
      naturalSolutions: JSON.stringify([
        'Accept help from family and friends',
        'Rest when baby sleeps',
        'Make time for self-care',
        'Gentle exercise (walking with baby)',
        'Nutritious meals (meal prep help)',
        'Sunlight exposure',
        'Connect with other new mothers',
        'Support groups (PPD-specific)',
        'Realistic expectations (home doesn\'t need to be perfect)',
        'Bond with baby through skin-to-skin contact',
        'Talk about your feelings',
        'Avoid isolation',
        'Limit visitors if overwhelming',
        'Accept that not all tasks get done',
        'Partner involvement in childcare',
        'Professional help for household tasks',
        'Mindfulness and relaxation',
        'Journaling',
        'Avoid major life decisions',
        'Know it\'s not your fault'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (EPA/DHA, 2g/day)',
        'Iron-rich foods (if anemic)',
        'Vitamin D supplementation',
        'B-complex vitamins (especially B12, folate)',
        'Adequate protein for recovery and milk production',
        'Complex carbohydrates',
        'Stay well-hydrated',
        'Limit caffeine',
        'Avoid alcohol (especially if breastfeeding)',
        'Regular, balanced meals',
        'Magnesium-rich foods',
        'Probiotic foods',
        'Choline-rich foods',
        'Zinc-rich foods',
        'Prenatal vitamin continuation'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - highly effective',
        'Interpersonal Therapy (IPT)',
        'Mother-infant therapy',
        'Support groups for new mothers',
        'Antidepressants (SSRIs safe with breastfeeding)',
        'Zulresso (brexanolone) - FDA-approved IV for severe PPD',
        'Zurzuvae (zuranolone) - oral medication for PPD',
        'Hormone therapy (in some cases)',
        'Couples therapy',
        'Home visits from mental health professionals',
        'Telehealth options',
        'Brief interventions effective'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms last more than 2 weeks',
        'Symptoms getting worse',
        'Difficulty caring for baby',
        'Difficulty caring for yourself',
        'Thoughts of harming self or baby',
        'Unable to sleep even when baby sleeps',
        'Panic attacks',
        'Extreme anxiety',
        'Unable to eat',
        'Feel disconnected from baby',
        'Thoughts of death or suicide',
        'Partner or family expresses concern'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'Postpartum Support International: 1-800-944-4773 (text 503-894-9453)',
        'PSI Online Support Groups: www.postpartum.net',
        'Emergency: 911',
        'National Maternal Mental Health Hotline: 1-833-TLC-MAMA (1-833-852-6262)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.postpartum.net/',
        'https://www.nimh.nih.gov/health/publications/perinatal-depression',
        'https://pubmed.ncbi.nlm.nih.gov/28102401/ - Omega-3 for PPD',
        'https://pubmed.ncbi.nlm.nih.gov/23857022/ - CBT for PPD'
      ]),
      dsmCriteria: JSON.stringify([
        'Major depressive episode',
        'Onset during pregnancy or within 4 weeks after delivery (peripartum onset)',
        'Specifier: "with peripartum onset"',
        'Five or more depressive symptoms for 2+ weeks',
        'At least one symptom is depressed mood or loss of interest/pleasure',
        'Symptoms cause significant distress or impairment',
        'Not attributable to substances or medical condition',
        'Differentia from "baby blues" (which resolves in 2 weeks)',
        'May include anxious distress',
        'May include severe features requiring immediate intervention',
        'Screen all postpartum women for depression'
      ])
    },
    {
      slug: 'premenstrual-dysphoric-disorder',
      name: 'Premenstrual Dysphoric Disorder (PMDD)',
      category: 'Mood Disorders',
      description: 'A severe form of premenstrual syndrome (PMS) causing significant mood symptoms and physical discomfort in the week or two before menstruation, significantly impairing daily functioning.',
      symptoms: JSON.stringify([
        'Marked mood swings',
        'Marked irritability or anger',
        'Marked depressed mood or feelings of hopelessness',
        'Marked anxiety and tension',
        'Decreased interest in usual activities',
        'Difficulty concentrating',
        'Fatigue or low energy',
        'Changes in appetite or food cravings',
        'Sleep problems (insomnia or hypersomnia)',
        'Feeling overwhelmed or out of control',
        'Physical symptoms (breast tenderness, bloating, joint/muscle pain)',
        'Weight gain',
        'Symptoms appear 1-2 weeks before period',
        'Symptoms resolve within days of period starting',
        'Suicidal thoughts in severe cases'
      ]),
      biologicalCauses: JSON.stringify([
        'Abnormal response to normal hormone fluctuations',
        'Serotonin deficiency during luteal phase',
        'Sensitivity to progesterone metabolites (allopregnanolone)',
        'GABA-A receptor changes',
        'Genetic predisposition',
        'Altered stress response system',
        'Inflammatory response to hormonal changes'
      ]),
      psychologicalCauses: JSON.stringify([
        'History of depression or anxiety',
        'Stress sensitivity',
        'Trauma history may worsen symptoms',
        'Negative beliefs about menstruation',
        'Poor coping strategies',
        'Perfectionism',
        'Emotional dysregulation'
      ]),
      socialCauses: JSON.stringify([
        'High stress levels',
        'Lack of social support',
        'Relationship conflicts',
        'Work pressures',
        'Sleep disruption',
        'Poor self-care during luteal phase',
        'Stigma around menstrual symptoms'
      ]),
      prevalence: '3-8% of menstruating women. Peak prevalence in 20s-30s. Often misdiagnosed or undertreated',
      ageOfOnset: 'Can begin anytime after menarche, often worsens in 30s',
      courseOfIllness: 'Cyclical pattern tied to menstrual cycle. Symptoms resolve with menopause or hysterectomy. May worsen with age. Responds well to treatment.',
      riskFactors: JSON.stringify([
        'Personal or family history of depression',
        'History of postpartum depression',
        'History of trauma or abuse',
        'High stress levels',
        'Smoking',
        'Obesity',
        'Lack of exercise',
        'Poor nutrition',
        'History of severe PMS',
        'Family history of PMDD'
      ]),
      protectiveFactors: JSON.stringify([
        'Regular exercise',
        'Stress management',
        'Adequate sleep',
        'Supportive relationships',
        'Tracking symptoms',
        'Healthy diet',
        'Not smoking',
        'Limiting alcohol and caffeine',
        'Strong social support'
      ]),
      comorbidities: JSON.stringify([
        'Major depressive disorder (70%)',
        'Anxiety disorders',
        'Seasonal affective disorder',
        'ADHD',
        'Chronic pain conditions',
        'Migraine headaches',
        'Irritable bowel syndrome',
        'Fibromyalgia'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular aerobic exercise (30 min, 5-6x/week)',
        'Calcium supplementation (1200mg/day)',
        'Magnesium supplementation (200-400mg/day)',
        'Vitamin B6 (50-100mg/day)',
        'Vitamin D if deficient',
        'Chasteberry (Vitex agnus-castus) 20-40mg/day',
        'Evening primrose oil (for breast pain)',
        'Stress reduction techniques',
        'Cognitive behavioral therapy',
        'Light therapy',
        'Acupuncture',
        'Yoga',
        'Mindfulness meditation',
        'Sleep hygiene',
        'Symptom tracking (helps identify patterns)',
        'Scheduled pleasant activities during luteal phase',
        'Reduce salt intake',
        'Limit caffeine and alcohol',
        'Complex carbohydrates',
        'Frequent small meals'
      ]),
      nutritionalRecs: JSON.stringify([
        'Calcium-rich foods or supplement (1200mg/day)',
        'Magnesium-rich foods (dark leafy greens, nuts, seeds)',
        'Vitamin B6 (50-100mg/day)',
        'Vitamin E (400 IU/day)',
        'Omega-3 fatty acids',
        'Complex carbohydrates (whole grains)',
        'Frequent small meals to stabilize blood sugar',
        'Limit salt intake',
        'Reduce caffeine (especially in luteal phase)',
        'Limit alcohol',
        'Adequate protein',
        'Tryptophan-rich foods',
        'Avoid refined sugars',
        'Stay hydrated',
        'Chasteberry supplement (under doctor guidance)'
      ]),
      therapyApproaches: JSON.stringify([
        'SSRIs (fluoxetine, sertraline) - highly effective, taken daily or in luteal phase only',
        'Cognitive Behavioral Therapy (CBT)',
        'Oral contraceptives (continuous dosing to eliminate periods)',
        'GnRH agonists (severe cases)',
        'Drospirenone-containing birth control (Yaz) - FDA approved for PMDD',
        'Calcium and vitamin supplementation',
        'Lifestyle modifications',
        'Mindfulness-Based Cognitive Therapy',
        'Dialectical Behavior Therapy for emotion regulation',
        'Complementary therapies (acupuncture, yoga)',
        'Hysterectomy with oophorectomy (last resort for severe cases)',
        'Hormone therapy'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms significantly impair daily functioning',
        'Symptoms tracked for 2+ cycles confirm PMDD',
        'Relationship problems due to symptoms',
        'Unable to work during luteal phase',
        'Suicidal thoughts',
        'Self-medication with alcohol or drugs',
        'Physical symptoms severe',
        'Quality of life significantly reduced',
        'Previous treatments ineffective',
        'Need confirmation of diagnosis'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'International Association for Premenstrual Disorders: https://iapmd.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://iapmd.org/',
        'https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome/premenstrual-dysphoric-disorder-pmdd',
        'https://pubmed.ncbi.nlm.nih.gov/26928794/ - SSRIs for PMDD',
        'https://pubmed.ncbi.nlm.nih.gov/27063598/ - Calcium for PMDD'
      ]),
      dsmCriteria: JSON.stringify([
        'At least 5 symptoms present in week before menses',
        'At least 1 symptom must be: mood swings, irritability, depressed mood, or anxiety',
        'Symptoms improve within a few days of menses onset',
        'Symptoms minimal or absent in week post-menses',
        'Symptoms must be confirmed by prospective daily ratings over at least 2 cycles',
        'Symptoms cause significant distress or interference with work, school, relationships',
        'Not merely exacerbation of another disorder',
        'Not attributable to substance use or medical condition',
        'Symptoms occur during most menstrual cycles',
        'Marked affective lability, irritability, dysphoria, or anxiety',
        'Symptoms interfere with functioning',
        'Documentation of symptoms required for diagnosis'
      ])
    },
    {
      slug: 'separation-anxiety-disorder',
      name: 'Separation Anxiety Disorder',
      category: 'Anxiety Disorders',
      description: 'Excessive fear or anxiety concerning separation from home or attachment figures that is inappropriate for developmental level, persistent, and causes significant distress or impairment.',
      symptoms: JSON.stringify([
        'Excessive distress when anticipating or experiencing separation',
        'Persistent worry about losing attachment figures',
        'Persistent worry about harm befalling attachment figures',
        'Refusal to go out away from home (school, work)',
        'Fear of being alone',
        'Refusal to sleep away from home or without attachment figure',
        'Repeated nightmares about separation',
        'Physical complaints (headaches, stomachaches) when separation occurs',
        'Clinging behavior',
        'Following attachment figure around the house',
        'Difficulty concentrating',
        'Sleep difficulties',
        'Social withdrawal',
        'Panic symptoms during separation',
        'Excessive worry about safety'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition to anxiety',
        'Overactive amygdala (fear center)',
        'Dysregulated stress response system',
        'Temperamental factors (behavioral inhibition)',
        'Neurochemical imbalances (GABA, serotonin)',
        'Family history of anxiety disorders'
      ]),
      psychologicalCauses: JSON.stringify([
        'Insecure attachment style',
        'Overprotective parenting',
        'Traumatic separation experiences',
        'Loss of significant person or pet',
        'Major life transitions',
        'Learned fear responses',
        'Low self-efficacy',
        'Catastrophic thinking patterns'
      ]),
      socialCauses: JSON.stringify([
        'Parental anxiety or overprotection',
        'Enmeshed family relationships',
        'Lack of opportunities for independence',
        'Bullying or school problems',
        'Family stress or conflict',
        'Moves or relocations',
        'Parental illness',
        'Cultural factors emphasizing family closeness'
      ]),
      prevalence: '4% of children, 1.6% of adolescents, 0.9-1.9% of adults. More common in females',
      ageOfOnset: 'Can occur at any age. Peak onset around 7-9 years. Can persist into adulthood',
      courseOfIllness: 'Often chronic if untreated. May wax and wane with stressors. Early intervention improves outcomes. May evolve into panic disorder or agoraphobia in adults.',
      riskFactors: JSON.stringify([
        'Family history of anxiety',
        'Overprotective parenting',
        'Traumatic life events',
        'Parental mental health issues',
        'Behavioral inhibition in childhood',
        'Life stress',
        'Death of loved one or pet',
        'Chronic illness in family',
        'Female gender'
      ]),
      protectiveFactors: JSON.stringify([
        'Secure attachment relationships',
        'Gradual exposure to separations',
        'Supportive school environment',
        'Good coping skills',
        'Parental mental health',
        'Stable home environment',
        'Opportunities for independence',
        'Positive peer relationships',
        'Early intervention'
      ]),
      comorbidities: JSON.stringify([
        'Generalized anxiety disorder (50-60%)',
        'Specific phobia',
        'Social anxiety disorder',
        'Panic disorder (in adults)',
        'Agoraphobia',
        'Major depressive disorder',
        'Oppositional defiant disorder (children)',
        'School refusal'
      ]),
      naturalSolutions: JSON.stringify([
        'Gradual exposure to separations (start small)',
        'Establish predictable goodbye routines',
        'Practice separations in safe environment',
        'Transitional objects (comfort items)',
        'Praise brave behavior',
        'Model calm departures and returns',
        'Don\'t reinforce anxiety (stay calm)',
        'Build independence gradually',
        'Relaxation techniques',
        'Deep breathing exercises',
        'Positive self-talk scripts',
        'Social skills training',
        'Problem-solving skills',
        'Scheduled worry time',
        'Cognitive restructuring (challenge catastrophic thoughts)',
        'Maintain routines',
        'Communication tools (phone calls, notes)',
        'Reward systems for independence',
        'Parent training',
        'School-based interventions'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet for overall health',
        'Omega-3 fatty acids',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'Limit caffeine and sugar',
        'Adequate protein',
        'Complex carbohydrates',
        'Stay hydrated',
        'Avoid stimulants',
        'Regular meal times',
        'Chamomile tea (calming)',
        'L-theanine (calming amino acid)',
        'Probiotic foods (gut-brain axis)',
        'Adequate sleep hygiene',
        'Vitamin D if deficient'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - gold standard',
        'Exposure therapy (gradual separations)',
        'Parent-Child Interaction Therapy',
        'Family therapy',
        'Play therapy (for children)',
        'SSRIs (if CBT insufficient)',
        'School-based interventions',
        'Behavioral interventions',
        'Relaxation training',
        'Social skills training',
        'Attachment-based therapy',
        'Combination of therapy and medication for moderate-severe cases'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms persist for 4+ weeks (6+ months for diagnosis)',
        'Interferes with school attendance or work',
        'Significant distress for child or family',
        'Development delayed due to anxiety',
        'Physical symptoms frequent',
        'Family functioning impaired',
        'Symptoms worsening',
        'Other anxiety symptoms developing',
        'Depression developing',
        'Quality of life significantly reduced'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association of America: adaa.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        'https://adaa.org/',
        'https://pubmed.ncbi.nlm.nih.gov/25667133/ - CBT for separation anxiety',
        'https://www.aacap.org/AACAP/Families_and_Youth/Facts_for_Families/FFF-Guide/Children-Who-Wont-Go-To-School-007.aspx'
      ]),
      dsmCriteria: JSON.stringify([
        'Developmentally inappropriate and excessive fear or anxiety about separation',
        'Duration at least 4 weeks in children (6 months in adults)',
        'Three or more symptoms',
        'Symptoms cause clinically significant distress or impairment',
        'Not better explained by another mental disorder',
        'Persistent worry about losing attachment figures',
        'Reluctance to be away from attachment figures',
        'Repeated nightmares about separation',
        'Physical symptoms when separation occurs or anticipated',
        'Symptoms present more days than not'
      ])
    },
    {
      slug: 'illness-anxiety-disorder',
      name: 'Illness Anxiety Disorder (Hypochondriasis)',
      category: 'Anxiety Disorders',
      description: 'Preoccupation with having or acquiring a serious illness, with high health anxiety despite minimal or no somatic symptoms, leading to excessive health-related behaviors or maladaptive avoidance.',
      symptoms: JSON.stringify([
        'Preoccupation with having a serious illness',
        'High level of health anxiety',
        'Minimal or no somatic symptoms present',
        'Excessive health-related behaviors (checking body, seeking reassurance)',
        'Or maladaptive avoidance (avoiding doctors, hospitals)',
        'Easily alarmed by health information',
        'Misinterpretation of bodily sensations',
        'Frequent self-examination',
        'Excessive internet research about illnesses',
        'Repeatedly checking for signs of illness',
        'Seeking reassurance from doctors or family',
        'Doctor shopping',
        'Significant distress about health',
        'Interference with daily functioning',
        'Symptoms persist despite medical reassurance'
      ]),
      biologicalCauses: JSON.stringify([
        'Heightened interoceptive awareness (body sensations)',
        'Overactive threat detection system',
        'Genetic predisposition to anxiety',
        'Dysregulation of fear circuits',
        'Altered pain perception',
        'Family history of anxiety or somatic disorders'
      ]),
      psychologicalCauses: JSON.stringify([
        'Catastrophic misinterpretation of bodily sensations',
        'Intolerance of uncertainty',
        'Attention bias toward health threats',
        'Belief that one is fragile or vulnerable',
        'Previous serious illness (self or others)',
        'Childhood illness or hospitalization',
        'Loss of loved one to illness',
        'Traumatic medical experiences',
        'Perfectionism and need for control'
      ]),
      socialCauses: JSON.stringify([
        'Parental anxiety about health',
        'Family focus on illness',
        'Media portrayal of diseases',
        'Easy access to medical information online',
        'Social reinforcement of sick role',
        'Stress and life transitions',
        'Witnessing serious illness in others',
        'Medical professionals\' uncertainty'
      ]),
      prevalence: '4-6% of medical patients. Equal in males and females. Often begins in early-middle adulthood',
      ageOfOnset: 'Typically emerges in early to middle adulthood (20s-30s)',
      courseOfIllness: 'Usually chronic with waxing and waning course. May worsen with stress. Can improve with CBT. May shift focus from one illness to another.',
      riskFactors: JSON.stringify([
        'Family history of illness anxiety',
        'Childhood serious illness',
        'History of abuse or trauma',
        'Major life stress',
        'Serious illness in family member',
        'Personality traits (neuroticism)',
        'History of anxiety or depression',
        'Medical ambiguity or uncertainty',
        'Internet access (cyberchondria)',
        'Trait anxiety'
      ]),
      protectiveFactors: JSON.stringify([
        'Good medical relationship with trusted doctor',
        'Ability to tolerate uncertainty',
        'Strong social support',
        'Good coping skills',
        'Mindfulness practices',
        'Limited health-related internet use',
        'Psychological treatment',
        'Ability to accept reassurance',
        'Healthy lifestyle'
      ]),
      comorbidities: JSON.stringify([
        'Generalized anxiety disorder (70%)',
        'Panic disorder',
        'Obsessive-compulsive disorder',
        'Major depressive disorder',
        'Somatic symptom disorder',
        'Personality disorders',
        'Other anxiety disorders',
        'Substance use disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Limit body checking behaviors',
        'Reduce reassurance seeking',
        'Limit internet health searches (set time limits)',
        'Exposure to health anxiety triggers',
        'Mindfulness of body sensations without judgment',
        'Accept uncertainty about health',
        'Schedule single primary care provider',
        'Relaxation techniques',
        'Exercise regularly',
        'Stress management',
        'Limit health news consumption',
        'Distraction techniques',
        'Engage in meaningful activities',
        'Challenge catastrophic thoughts',
        'Thought stopping techniques',
        'Keep health diary to identify patterns',
        'Support groups',
        'Reduce avoidance behaviors',
        'Practice acceptance',
        'Gradual exposure to feared situations'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet for overall health',
        'Omega-3 fatty acids for anxiety',
        'Magnesium-rich foods',
        'B-complex vitamins',
        'Limit caffeine',
        'Avoid stimulants',
        'Adequate hydration',
        'Complex carbohydrates',
        'Protein at each meal',
        'Limit alcohol',
        'L-theanine for relaxation',
        'Chamomile tea',
        'Probiotics',
        'Vitamin D if deficient',
        'Regular meal schedule'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - most effective',
        'Exposure and Response Prevention (ERP)',
        'Acceptance and Commitment Therapy (ACT)',
        'Mindfulness-Based Cognitive Therapy',
        'Interoceptive exposure',
        'Cognitive restructuring',
        'Response prevention (reduce checking, reassurance)',
        'SSRIs (if CBT alone insufficient)',
        'Group therapy',
        'Psychoeducation about anxiety',
        'Relaxation training',
        'Regular visits with single provider (limit doctor shopping)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Preoccupation with illness for 6+ months',
        'Significant distress or impairment',
        'Excessive medical visits or testing',
        'Avoiding medical care due to anxiety',
        'Relationships affected',
        'Work or daily functioning impaired',
        'Quality of life reduced',
        'Depression developing',
        'Unable to accept medical reassurance',
        'Family concerned about behavior'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association of America: adaa.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://adaa.org/',
        'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/31953927/ - CBT for health anxiety',
        'https://pubmed.ncbi.nlm.nih.gov/30005170/ - Internet-based CBT'
      ]),
      dsmCriteria: JSON.stringify([
        'Preoccupation with having or acquiring a serious illness',
        'Somatic symptoms are not present or are only mild',
        'High level of anxiety about health',
        'Excessive health-related behaviors or maladaptive avoidance',
        'Preoccupation present for at least 6 months',
        'Not better explained by another mental disorder',
        'Specify if care-seeking type or care-avoidant type',
        'Illness preoccupation is excessive or disproportionate',
        'Distress or impairment in functioning',
        'Preoccupation not restricted to specific illness concern'
      ])
    },
    {
      slug: 'anorexia-nervosa',
      name: 'Anorexia Nervosa',
      category: 'Eating Disorders',
      description: 'A serious eating disorder characterized by restriction of energy intake, intense fear of gaining weight, and distorted body image, leading to significantly low body weight.',
      symptoms: JSON.stringify([
        'Significantly low body weight',
        'Intense fear of gaining weight',
        'Distorted body image',
        'Denial of seriousness of low weight',
        'Severe food restriction',
        'Excessive exercise',
        'Preoccupation with food, calories, weight',
        'Rituals around eating',
        'Avoidance of eating with others',
        'Wearing loose clothes to hide weight loss',
        'Fatigue and weakness',
        'Dizziness or fainting',
        'Irregular or absent menstruation',
        'Cold intolerance',
        'Fine hair on body (lanugo)',
        'Thinning hair on head',
        'Constipation',
        'Social withdrawal',
        'Mood irritability'
      ]),
      biologicalCauses: JSON.stringify([
        'Strong genetic component (50-80% heritability)',
        'Brain structure abnormalities (insula, reward circuits)',
        'Serotonin dysregulation',
        'Dopamine abnormalities in reward system',
        'Altered interoceptive awareness',
        'Hormonal changes secondary to starvation',
        'Genetic variations affecting eating behavior'
      ]),
      psychologicalCauses: JSON.stringify([
        'Perfectionism',
        'Obsessive-compulsive traits',
        'Low self-esteem',
        'Need for control',
        'Cognitive rigidity',
        'History of trauma or abuse',
        'Anxiety and fear-based avoidance',
        'Body dissatisfaction'
      ]),
      socialCauses: JSON.stringify([
        'Cultural emphasis on thinness',
        'Social media and appearance ideals',
        'Weight-based teasing or bullying',
        'Participation in appearance-focused activities (modeling, ballet)',
        'Family emphasis on weight or appearance',
        'Dieting culture',
        'Peer pressure',
        'Trauma or abuse'
      ]),
      prevalence: '0.3-1% of young women. 10:1 female to male ratio. Increasing in males and diverse populations',
      ageOfOnset: 'Peak onset 14-18 years. Can occur in children or adults',
      courseOfIllness: 'Variable. 50% recover, 30% improve, 20% chronic. Highest mortality rate of any mental disorder (5-10%). Early intervention critical.',
      riskFactors: JSON.stringify([
        'Female gender',
        'Adolescence',
        'Family history of eating disorders',
        'Dieting or weight loss',
        'Perfectionism',
        'Anxiety disorders',
        'OCD traits',
        'Type 1 diabetes',
        'History of trauma',
        'Western culture',
        'Participation in weight-focused sports or activities'
      ]),
      protectiveFactors: JSON.stringify([
        'Positive body image',
        'Strong self-esteem',
        'Healthy family attitudes about food and weight',
        'Critical media literacy',
        'Diverse social relationships',
        'Early intervention',
        'Good coping skills',
        'Emotional expression',
        'Family meals'
      ]),
      comorbidities: JSON.stringify([
        'Depression (50-75%)',
        'Anxiety disorders (60%)',
        'OCD (40%)',
        'Substance use disorders',
        'Self-harm',
        'Personality disorders',
        'PTSD',
        'Medical complications (cardiac, bone, hormonal)'
      ]),
      naturalSolutions: JSON.stringify([
        'Structured meal plan (medical supervision required)',
        'Family-Based Treatment (FBT/Maudsley) for adolescents',
        'Mechanical eating (eating by clock, not hunger)',
        'Supervised meals',
        'Eliminate exercise initially',
        'Gradual reintroduction of feared foods',
        'Distraction after meals',
        'Challenge cognitive distortions',
        'Body image exposure exercises',
        'Mindful eating (later in recovery)',
        'Self-compassion practices',
        'Support groups',
        'Art therapy',
        'Music therapy',
        'Journaling (not food/weight focused)',
        'Social support',
        'Stress management',
        'Sleep hygiene',
        'Medical monitoring (vital signs, labs)',
        'Nutritional rehabilitation'
      ]),
      nutritionalRecs: JSON.stringify([
        'Medical nutrition therapy (registered dietitian essential)',
        'Structured meal plan (3 meals, 2-3 snacks)',
        'Gradual calorie increase (start 1000-1600, increase to 2500-3500 for weight restoration)',
        'Balanced macronutrients',
        'Calcium and vitamin D for bone health',
        'Multivitamin supplement',
        'Phosphorus monitoring (refeeding syndrome risk)',
        'Adequate protein',
        'Complex carbohydrates',
        'Healthy fats',
        'Electrolyte monitoring',
        'Iron supplementation if anemic',
        'B vitamins',
        'Zinc supplementation',
        'Supervised eating (initially)'
      ]),
      therapyApproaches: JSON.stringify([
        'Family-Based Treatment (FBT) - first-line for adolescents',
        'Cognitive Behavioral Therapy (CBT-E) - adults',
        'Maudsley Anorexia Treatment for Adults (MANTRA)',
        'Medical stabilization (hospitalization if severe)',
        'Nutritional rehabilitation',
        'Enhanced Cognitive Behavioral Therapy (CBT-E)',
        'Dialectical Behavior Therapy (DBT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Interpersonal Therapy',
        'Medications (limited efficacy, may help comorbid conditions)',
        'Residential treatment (severe cases)',
        'Multidisciplinary team (medical, nutrition, therapy)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Rapid weight loss',
        'BMI under 17.5 (adults) or below 5th percentile (youth)',
        'Restriction of food intake',
        'Intense fear of weight gain',
        'Distorted body image',
        'Irregular or absent periods',
        'Medical complications (fainting, irregular heartbeat)',
        'Suicidal thoughts',
        'Purging behaviors',
        'Excessive exercise',
        'Social isolation',
        'Family unable to manage at home'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'National Eating Disorders Association (NEDA) Helpline: 1-800-931-2237',
        'NEDA Crisis Text: Text "NEDA" to 741741',
        'Emergency: 911',
        'The Alliance for Eating Disorders Awareness: 866-662-1235'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nationaleatingdisorders.org/',
        'https://www.nimh.nih.gov/health/topics/eating-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/20855043/ - Family-based treatment',
        'https://www.aedweb.org/ - Academy for Eating Disorders'
      ]),
      dsmCriteria: JSON.stringify([
        'Restriction of energy intake leading to significantly low body weight',
        'Intense fear of gaining weight or becoming fat',
        'Persistent behavior interfering with weight gain',
        'Disturbance in way body weight or shape is experienced',
        'Undue influence of weight/shape on self-evaluation',
        'Denial of seriousness of current low body weight',
        'Specify type: Restricting type or Binge-eating/purging type',
        'Specify severity based on BMI (adults) or BMI percentile (youth)',
        'Mild: BMI ≥17, Moderate: BMI 16-16.99, Severe: BMI 15-15.99, Extreme: BMI <15',
        'Not solely during episodes of bulimia nervosa'
      ])
    },
    {
      slug: 'bulimia-nervosa',
      name: 'Bulimia Nervosa',
      category: 'Eating Disorders',
      description: 'An eating disorder characterized by recurrent episodes of binge eating followed by compensatory behaviors (purging, fasting, excessive exercise) to prevent weight gain, with self-evaluation unduly influenced by body shape and weight.',
      symptoms: JSON.stringify([
        'Recurrent binge eating episodes',
        'Feeling loss of control during binges',
        'Recurrent compensatory behaviors (vomiting, laxatives, diuretics, fasting, excessive exercise)',
        'Preoccupation with weight and body shape',
        'Self-evaluation based on weight and shape',
        'Eating in secret',
        'Disappearing after meals (to purge)',
        'Bathroom smell or running water after meals',
        'Dental erosion',
        'Swollen salivary glands (chipmunk cheeks)',
        'Calluses on knuckles (Russell\'s sign)',
        'Fluctuating weight',
        'Electrolyte imbalances',
        'Gastrointestinal problems',
        'Shame and guilt',
        'Mood swings',
        'Social withdrawal',
        'Hoarding food',
        'Food wrappers hidden'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (50-60% heritability)',
        'Serotonin dysregulation',
        'Impulsivity-related brain circuits',
        'Reward system abnormalities',
        'Altered satiety signals',
        'Family history of eating disorders or addiction',
        'Neurotransmitter imbalances'
      ]),
      psychologicalCauses: JSON.stringify([
        'Low self-esteem',
        'Body dissatisfaction',
        'Perfectionism',
        'Impulsivity',
        'Emotion dysregulation',
        'History of trauma or abuse',
        'Difficulty expressing emotions',
        'Negative self-image',
        'Need for control'
      ]),
      socialCauses: JSON.stringify([
        'Cultural emphasis on thinness',
        'Weight-based teasing',
        'Social media pressures',
        'Dieting and weight loss attempts',
        'Peer influence',
        'Family focus on weight',
        'Participation in appearance/weight-focused activities',
        'Trauma or abuse'
      ]),
      prevalence: '1-1.5% of young women. 10:1 female to male ratio. More common than anorexia',
      ageOfOnset: 'Peak onset late adolescence to early 20s (18-25 years)',
      courseOfIllness: 'Often chronic with periods of remission and relapse. 50% recover, 30% have relapses, 20% chronic. Better prognosis than anorexia with treatment.',
      riskFactors: JSON.stringify([
        'Female gender',
        'Adolescence/young adulthood',
        'Dieting or weight concerns',
        'Body dissatisfaction',
        'Low self-esteem',
        'Family history of eating disorders',
        'History of abuse or trauma',
        'Perfectionism',
        'Impulsivity',
        'Anxiety or depression',
        'Substance use',
        'Type 1 diabetes'
      ]),
      protectiveFactors: JSON.stringify([
        'Positive body image',
        'Healthy coping skills',
        'Strong self-esteem',
        'Supportive family environment',
        'Emotional regulation skills',
        'Early intervention',
        'Critical media literacy',
        'Healthy attitudes about food',
        'Good social support'
      ]),
      comorbidities: JSON.stringify([
        'Depression (50-70%)',
        'Anxiety disorders (65%)',
        'Substance use disorders (30-40%)',
        'Borderline personality disorder',
        'PTSD',
        'Self-harm',
        'Bipolar disorder',
        'Medical complications (cardiac, dental, GI, electrolyte)'
      ]),
      naturalSolutions: JSON.stringify([
        'Structured meal plan (3 meals, 2-3 snacks)',
        'Eliminate compensatory behaviors',
        'DBT skills for emotion regulation',
        'Delay between urge and behavior',
        'Distraction after meals',
        'Remove scale',
        'Challenge diet mentality',
        'Intuitive eating principles (later in recovery)',
        'Body image work',
        'Self-compassion practices',
        'Identify triggers (emotions, situations)',
        'Alternative coping skills',
        'Support groups',
        'Journaling',
        'Mindfulness practices',
        'Social support',
        'Eliminate diet foods/products',
        'Regular eating schedule',
        'Supervised meals initially',
        'Stress management'
      ]),
      nutritionalRecs: JSON.stringify([
        'Regular, balanced meal plan (dietitian essential)',
        'Three meals plus 2-3 snacks daily',
        'No food restrictions (all foods allowed)',
        'Adequate calories (avoid restriction)',
        'Balanced macronutrients',
        'Eliminate diet foods',
        'Stay hydrated',
        'Calcium and vitamin D',
        'Multivitamin',
        'Adequate protein at each meal',
        'Complex carbohydrates',
        'Healthy fats',
        'Electrolyte monitoring if purging',
        'Iron if needed',
        'Avoid skipping meals'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT-E) - gold standard',
        'Dialectical Behavior Therapy (DBT)',
        'Interpersonal Therapy (IPT)',
        'Family therapy',
        'Fluoxetine (Prozac) - FDA approved for bulimia (60-80mg/day)',
        'Nutritional counseling',
        'Enhanced CBT (CBT-E)',
        'Group therapy',
        'Acceptance and Commitment Therapy (ACT)',
        'Motivational interviewing',
        'Self-help guided by therapist',
        'Intensive outpatient or partial hospitalization if severe'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Binge-purge cycles occurring regularly',
        'Unable to stop compensatory behaviors',
        'Medical complications (electrolyte imbalances, cardiac issues)',
        'Significant distress',
        'Interference with daily life',
        'Depression or anxiety',
        'Suicidal thoughts',
        'Substance use to cope',
        'Self-harm behaviors',
        'Dental problems',
        'Gastrointestinal issues',
        'Unable to manage on own'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'National Eating Disorders Association (NEDA) Helpline: 1-800-931-2237',
        'NEDA Crisis Text: Text "NEDA" to 741741',
        'Emergency: 911',
        'The Alliance for Eating Disorders Awareness: 866-662-1235'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nationaleatingdisorders.org/',
        'https://www.nimh.nih.gov/health/topics/eating-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/23217606/ - CBT-E for bulimia',
        'https://pubmed.ncbi.nlm.nih.gov/12728102/ - Fluoxetine for bulimia'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent episodes of binge eating',
        'Binge characterized by: eating large amount + sense of lack of control',
        'Recurrent inappropriate compensatory behaviors to prevent weight gain',
        'Behaviors include: vomiting, laxatives, diuretics, fasting, excessive exercise',
        'Binge eating and compensatory behaviors occur at least once weekly for 3 months',
        'Self-evaluation unduly influenced by body shape and weight',
        'Does not occur exclusively during anorexia nervosa',
        'Specify severity: Mild (1-3 episodes/week), Moderate (4-7), Severe (8-13), Extreme (14+)',
        'Specify if in partial or full remission',
        'Significant distress about binge eating'
      ])
    },
    {
      slug: 'binge-eating-disorder',
      name: 'Binge Eating Disorder (BED)',
      category: 'Eating Disorders',
      description: 'Recurrent episodes of binge eating without regular compensatory behaviors, associated with marked distress and loss of control, making it the most common eating disorder.',
      symptoms: JSON.stringify([
        'Recurrent binge eating episodes',
        'Eating large amounts in discrete period',
        'Sense of lack of control during binges',
        'Eating more rapidly than normal',
        'Eating until uncomfortably full',
        'Eating large amounts when not hungry',
        'Eating alone due to embarrassment',
        'Feeling disgusted, depressed, or guilty after',
        'Marked distress about binge eating',
        'No regular compensatory behaviors',
        'Weight fluctuations',
        'Often overweight or obese',
        'Eating in secret',
        'Food hoarding',
        'Emotional eating',
        'Shame about eating',
        'Body image concerns',
        'Social withdrawal',
        'Depression and anxiety'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (40-50% heritability)',
        'Dopamine reward system dysregulation',
        'Serotonin abnormalities',
        'Impaired satiety signals',
        'Leptin and ghrelin dysregulation',
        'Brain reward circuits sensitized to food',
        'Family history of eating disorders or obesity'
      ]),
      psychologicalCauses: JSON.stringify([
        'Emotion dysregulation',
        'Using food to cope with emotions',
        'Low self-esteem',
        'Body dissatisfaction',
        'History of dieting (restriction)',
        'Stress and anxiety',
        'Depression',
        'History of trauma or abuse',
        'Impulsivity',
        'Negative self-image'
      ]),
      socialCauses: JSON.stringify([
        'Diet culture and weight stigma',
        'Food restriction leading to bingeing',
        'Social isolation',
        'Stress and life pressures',
        'Childhood experiences with food',
        'Family dynamics around eating',
        'Weight-based teasing or bullying',
        'Cultural food attitudes',
        'Easy access to highly palatable foods'
      ]),
      prevalence: '2-3% of adults. Most common eating disorder. 1.6:1 female to male ratio (more equal than other EDs)',
      ageOfOnset: 'Late adolescence to early 20s, but can occur at any age',
      courseOfIllness: 'Often chronic with periods of remission. 60% remission rate with treatment. May fluctuate with stress and life events. Good prognosis with CBT.',
      riskFactors: JSON.stringify([
        'History of dieting',
        'Body dissatisfaction',
        'Low self-esteem',
        'Depression or anxiety',
        'Family history of eating disorders',
        'Childhood obesity',
        'Negative comments about weight/eating',
        'Trauma or abuse history',
        'Emotion regulation difficulties',
        'Perfectionism',
        'Weight cycling (yo-yo dieting)',
        'Family dysfunction'
      ]),
      protectiveFactors: JSON.stringify([
        'Healthy emotion regulation skills',
        'Body acceptance',
        'Self-compassion',
        'Intuitive eating approach',
        'No food restriction',
        'Strong support system',
        'Healthy coping mechanisms',
        'Early intervention',
        'Therapy and treatment',
        'Positive body image'
      ]),
      comorbidities: JSON.stringify([
        'Depression (50-60%)',
        'Anxiety disorders (65%)',
        'Bipolar disorder',
        'Substance use disorders (20-30%)',
        'ADHD',
        'Personality disorders',
        'PTSD',
        'Obesity and related medical conditions (diabetes, cardiovascular, sleep apnea)'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular eating schedule (3 meals, 2-3 snacks)',
        'No food restriction or "forbidden" foods',
        'Mindful eating practices',
        'Identify emotional triggers',
        'Develop alternative coping skills',
        'DBT skills for emotion regulation',
        'Delay between urge and binge',
        'Distraction techniques',
        'Self-compassion practices',
        'Body image work',
        'Reject diet mentality',
        'Intuitive eating principles',
        'Support groups (OA, NEDA groups)',
        'Stress management',
        'Regular sleep',
        'Physical activity for well-being (not weight loss)',
        'Journaling feelings',
        'Social support',
        'Remove triggers (keeping binge foods out initially)',
        'Challenge all-or-nothing thinking'
      ]),
      nutritionalRecs: JSON.stringify([
        'Regular meal and snack schedule',
        'No food restrictions (all foods allowed)',
        'Adequate, balanced meals',
        'Don\'t skip meals',
        'Include all macronutrients',
        'Satisfying portions at meals',
        'Mindful eating',
        'Eat variety of foods',
        'Stay adequately nourished',
        'Avoid "diet" mentality',
        'Include foods you enjoy',
        'Eat in supportive environment',
        'Dietitian specialized in eating disorders',
        'Focus on nourishment, not weight loss',
        'Adequate protein and fiber for satiety'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - most effective',
        'Dialectical Behavior Therapy (DBT)',
        'Interpersonal Therapy (IPT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Lisdexamfetamine (Vyvanse) - FDA approved for BED',
        'Topiramate (off-label, reduces binge frequency)',
        'SSRIs for comorbid depression',
        'Group therapy',
        'Nutritional counseling',
        'Self-help guided programs',
        'Motivational interviewing',
        'Weight-neutral approach'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Binge eating at least once a week for 3 months',
        'Significant distress about eating',
        'Loss of control during eating',
        'Eating affecting health',
        'Depression or anxiety',
        'Body image causing distress',
        'Relationship problems due to eating',
        'Unable to stop bingeing on own',
        'Weight gain causing medical issues',
        'Suicidal thoughts',
        'Quality of life impaired',
        'Previous attempts to stop unsuccessful'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'National Eating Disorders Association (NEDA) Helpline: 1-800-931-2237',
        'NEDA Crisis Text: Text "NEDA" to 741741',
        'Emergency: 911',
        'Overeaters Anonymous: oa.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nationaleatingdisorders.org/',
        'https://www.nimh.nih.gov/health/topics/eating-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/28190142/ - CBT for BED',
        'https://pubmed.ncbi.nlm.nih.gov/26735119/ - Lisdexamfetamine for BED'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent episodes of binge eating',
        'Binge eating episodes associated with 3 or more: eating rapidly, eating until uncomfortably full, eating large amounts when not hungry, eating alone due to embarrassment, feeling disgusted/depressed/guilty',
        'Marked distress regarding binge eating',
        'Binge eating occurs at least once a week for 3 months',
        'Not associated with recurrent compensatory behavior',
        'Does not occur exclusively during anorexia or bulimia',
        'Specify severity: Mild (1-3 episodes/week), Moderate (4-7), Severe (8-13), Extreme (14+)',
        'Specify if in partial or full remission',
        'Sense of lack of control',
        'Eating in discrete period (e.g., 2 hours)'
      ])
    },
    {
      slug: 'arfid',
      name: 'Avoidant/Restrictive Food Intake Disorder (ARFID)',
      category: 'Eating Disorders',
      description: 'An eating disorder characterized by avoidance or restriction of food intake not driven by weight or body image concerns, leading to significant nutritional deficiency, weight loss, or psychosocial impairment.',
      symptoms: JSON.stringify([
        'Avoidance of certain foods or food groups',
        'Restriction of amount or variety of food',
        'Lack of interest in eating',
        'Concerns about consequences of eating (choking, vomiting)',
        'Sensory sensitivities to food (texture, taste, smell, appearance)',
        'Weight loss or poor growth',
        'Nutritional deficiencies',
        'Dependence on supplements or tube feeding',
        'Interference with social functioning',
        'Limited food repertoire',
        'Anxiety around meals',
        'Prolonged meal times',
        'No body image disturbance',
        'No fear of weight gain',
        'Development delays possible',
        'Fatigue',
        'Concentration difficulties',
        'Medical complications from malnutrition',
        'Social isolation due to eating'
      ]),
      biologicalCauses: JSON.stringify([
        'Heightened sensory sensitivities',
        'Genetic predisposition',
        'Autism spectrum traits',
        'Gastrointestinal disorders',
        'Early feeding difficulties',
        'Traumatic medical experiences (choking, severe GI illness)',
        'Anxiety disorder predisposition'
      ]),
      psychologicalCauses: JSON.stringify([
        'Anxiety about eating or consequences',
        'Traumatic eating experiences',
        'Fear of aversive consequences (vomiting, choking)',
        'Lack of appetite or interest in food',
        'Sensory over-responsivity',
        'Obsessive-compulsive traits',
        'Anxiety disorders',
        'Autism spectrum traits'
      ]),
      socialCauses: JSON.stringify([
        'Limited food exposure in childhood',
        'Family meal environment',
        'Pressure to eat (can worsen)',
        'Social anxiety around eating',
        'Bullying about eating habits',
        'Cultural food differences',
        'School meal challenges',
        'Social expectations around eating'
      ]),
      prevalence: '0.3-3% of children and adolescents. Equal in males and females. Often begins in childhood',
      ageOfOnset: 'Typically begins in infancy or childhood, but can occur in adolescents or adults',
      courseOfIllness: 'Variable. Some children expand food repertoire with age. Others persist into adulthood. Early intervention improves outcomes. Can be chronic without treatment.',
      riskFactors: JSON.stringify([
        'Autism spectrum disorder',
        'ADHD',
        'Anxiety disorders',
        'OCD',
        'Sensory processing differences',
        'Gastrointestinal problems',
        'Food allergies or intolerances',
        'Traumatic eating event (choking, vomiting)',
        'Early feeding difficulties',
        'Premature birth',
        'Developmental delays'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Positive mealtime environment',
        'Gradual food exposure',
        'No pressure to eat',
        'Addressing sensory needs',
        'Treating underlying anxiety',
        'Family support',
        'Multidisciplinary treatment',
        'Occupational therapy for sensory issues'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (50-75%)',
        'Autism spectrum disorder (20-40%)',
        'ADHD',
        'OCD',
        'Developmental delays',
        'Sensory processing disorder',
        'GI disorders',
        'Mood disorders',
        'Other medical conditions'
      ]),
      naturalSolutions: JSON.stringify([
        'Food chaining (gradually introduce similar foods)',
        'Sensory-based food introduction',
        'No pressure approach',
        'Division of responsibility (parent provides, child decides)',
        'Repeated exposures without pressure',
        'Positive mealtime environment',
        'Modeling eating desired foods',
        'Play with food (reduce anxiety)',
        'Cooking together',
        'Gradual desensitization',
        'Occupational therapy for sensory issues',
        'Reward trying (not eating) new foods',
        'Small steps (look, touch, lick, taste, eat)',
        'Preferred foods alongside new foods',
        'Predictable meal routine',
        'Reduce mealtime battles',
        'Address underlying anxiety',
        'Social eating opportunities',
        'Food exposure through non-eating activities',
        'Patience and consistency'
      ]),
      nutritionalRecs: JSON.stringify([
        'Nutritional supplements if deficient',
        'Multivitamin',
        'Caloric supplementation if needed',
        'High-calorie tolerated foods',
        'Dietitian specializing in feeding disorders',
        'Monitor growth and nutrition',
        'Address specific deficiencies',
        'Fortify accepted foods',
        'Ensure adequate protein',
        'Smoothies or shakes if accepted',
        'Variety within accepted foods',
        'Regular meal and snack schedule',
        'Medical nutrition therapy',
        'Tube feeding if medically necessary',
        'Gradual tube weaning protocols'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT)',
        'Exposure therapy (graduated food exposure)',
        'Family-Based Treatment',
        'Behavioral interventions',
        'Occupational therapy for sensory issues',
        'Speech therapy if oral-motor issues',
        'Parent training',
        'Anxiety management',
        'Multidisciplinary team approach',
        'Nutritional rehabilitation',
        'Medical monitoring',
        'Sometimes medications for comorbid anxiety',
        'Play therapy for children',
        'Sequential Oral Sensory (SOS) approach',
        'Tube weaning programs if applicable'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Poor growth or weight loss',
        'Nutritional deficiencies',
        'Very limited food repertoire (fewer than 20 foods)',
        'Refusal of entire food groups',
        'Anxiety around eating',
        'Dependence on supplements or tube feeding',
        'Social impairment due to eating',
        'Medical complications',
        'Family distress around feeding',
        'Mealtime taking over 30-45 minutes regularly',
        'Gagging or vomiting with food',
        'Unable to expand foods without professional help'
      ]),
      crisisResources: JSON.stringify([
        'National Eating Disorders Association (NEDA) Helpline: 1-800-931-2237',
        'NEDA Crisis Text: Text "NEDA" to 741741',
        'Emergency: 911 (if severe malnutrition)',
        'ARFID Awareness UK: arfidawarenessuk.org',
        'Feeding Matters: feedingmatters.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nationaleatingdisorders.org/arfid',
        'https://www.nimh.nih.gov/health/topics/eating-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/26467281/ - ARFID overview',
        'https://www.feedingmatters.org/'
      ]),
      dsmCriteria: JSON.stringify([
        'Avoidance or restriction of food intake',
        'One or more: significant weight loss (or failure to achieve expected growth), significant nutritional deficiency, dependence on oral supplements or tube feeding, marked interference with psychosocial functioning',
        'Not better explained by lack of available food or cultural practice',
        'Not occurring exclusively during anorexia or bulimia',
        'No disturbance in body image',
        'Not attributable to medical condition or mental disorder',
        'May be based on: sensory characteristics, concern about aversive consequences, lack of interest in eating',
        'Onset usually in childhood',
        'Can occur at any age',
        'Severity based on level of impairment and need for intervention'
      ])
    },
    // SUBSTANCE USE DISORDERS
    {
      slug: 'alcohol-use-disorder',
      name: 'Alcohol Use Disorder (AUD)',
      category: 'Substance Use Disorders',
      description: 'A chronic disease characterized by compulsive alcohol use, loss of control over alcohol intake, and negative emotional state when not drinking.',
      symptoms: JSON.stringify([
        'Drinking more or longer than intended',
        'Unsuccessful attempts to cut down or stop',
        'Spending significant time obtaining, using, or recovering from alcohol',
        'Cravings or strong urges to drink',
        'Failing to fulfill obligations due to drinking',
        'Continuing despite social or relationship problems',
        'Giving up activities for drinking',
        'Drinking in hazardous situations (driving)',
        'Continuing despite physical or psychological problems',
        'Tolerance (need more to get same effect)',
        'Withdrawal symptoms when stopping',
        'Blackouts or memory loss',
        'Drinking alone or hiding drinking',
        'Neglecting hygiene or appearance',
        'Personality changes when drinking'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (50-60% heritability)',
        'Altered brain reward pathways',
        'Changes in dopamine and GABA systems',
        'Neuroplasticity changes with chronic use',
        'Family history increases risk 4x',
        'Acetaldehyde metabolism differences'
      ]),
      psychologicalCauses: JSON.stringify([
        'Using alcohol to cope with stress or emotions',
        'Low self-esteem',
        'History of trauma',
        'Impulsivity',
        'Sensation-seeking personality',
        'Depression or anxiety disorders',
        'Poor coping skills'
      ]),
      socialCauses: JSON.stringify([
        'Easy availability of alcohol',
        'Social/cultural acceptance of drinking',
        'Peer pressure',
        'Stressful environment',
        'Lack of support system',
        'Early exposure to alcohol',
        'Media glorification of drinking',
        'Economic factors'
      ]),
      prevalence: '14.5 million Americans age 12+ had AUD in 2019 (NIAAA). 5.8% of adults.',
      ageOfOnset: 'Can begin at any age. Highest rates of onset in late teens to early 20s.',
      courseOfIllness: 'Progressive if untreated. Can lead to liver disease, brain damage, social problems. Recovery possible with treatment.',
      riskFactors: JSON.stringify([
        'Starting drinking at young age',
        'Family history of alcoholism',
        'Mental health disorders',
        'History of trauma',
        'High stress',
        'Peer drinking',
        'Low socioeconomic status',
        'Male gender (higher rates)',
        'Certain occupations'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong family bonds',
        'Religious/spiritual involvement',
        'Healthy coping skills',
        'Supportive environment',
        'Access to treatment',
        'Education about risks',
        'Delaying first drink',
        'Involvement in positive activities'
      ]),
      comorbidities: JSON.stringify([
        'Depression (30-40%)',
        'Anxiety disorders (20-30%)',
        'Bipolar disorder',
        'PTSD',
        'Other substance use disorders',
        'Antisocial personality disorder',
        'Liver disease',
        'Cardiovascular disease'
      ]),
      naturalSolutions: JSON.stringify([
        'Complete abstinence (most effective)',
        'Attend AA or other support groups',
        'Build sober support network',
        'Identify and avoid triggers',
        'Develop healthy coping mechanisms',
        'Exercise regularly',
        'Mindfulness and meditation',
        'Therapy (CBT, motivational interviewing)',
        'Address co-occurring mental health issues',
        'Create structured daily routine',
        'Find meaningful activities',
        'Volunteer or help others in recovery',
        'Practice self-care',
        'Get adequate sleep',
        'Manage stress',
        'Celebrate milestones',
        'Be patient with yourself',
        'Plan for relapse prevention',
        'Remove alcohol from home',
        'Tell people about your goals'
      ]),
      nutritionalRecs: JSON.stringify([
        'B-complex vitamins (depleted by alcohol)',
        'Thiamine (B1) supplement to prevent Wernicke-Korsakoff',
        'Magnesium for nervous system',
        'Zinc for immune function',
        'Vitamin C for liver support',
        'Milk thistle for liver health',
        'Omega-3 fatty acids for brain health',
        'Protein for healing',
        'Complex carbohydrates for energy',
        'Stay well-hydrated',
        'Avoid caffeine excess',
        'L-glutamine to reduce cravings',
        'Healthy fats',
        'Antioxidant-rich foods',
        'Regular balanced meals'
      ]),
      therapyApproaches: JSON.stringify([
        'Medical detox (if physically dependent)',
        'Cognitive-Behavioral Therapy (CBT)',
        'Motivational Interviewing',
        'Medication: Naltrexone, Acamprosate, Disulfiram',
        '12-Step programs (AA)',
        'SMART Recovery',
        'Contingency management',
        'Family therapy',
        'Group therapy',
        'Residential treatment (if severe)',
        'Intensive outpatient programs',
        'Relapse prevention training'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to control drinking',
        'Drinking causing problems in life',
        'Withdrawal symptoms when stopping',
        'Failed attempts to quit',
        'Health problems from drinking',
        'Relationship damage',
        'Work or school problems',
        'Legal issues',
        'Hiding drinking or lying about it',
        'Drinking in dangerous situations'
      ]),
      crisisResources: JSON.stringify([
        'SAMHSA National Helpline: 1-800-662-4357 (24/7, free)',
        'Alcoholics Anonymous: aa.org',
        'SMART Recovery: smartrecovery.org',
        'Local detox facilities',
        'Emergency room if severe withdrawal'
      ]),
      researchLinks: JSON.stringify([
        'https://www.niaaa.nih.gov/',
        'https://www.samhsa.gov/find-help/national-helpline',
        'https://pubmed.ncbi.nlm.nih.gov/32978715/ - AUD treatment',
        'https://www.aa.org/'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of alcohol use leading to impairment or distress',
        '2+ of following in 12-month period:',
        'Drinking more/longer than intended',
        'Persistent desire or unsuccessful efforts to cut down',
        'Great deal of time spent on alcohol-related activities',
        'Craving or strong desire to drink',
        'Failure to fulfill major obligations',
        'Continued use despite social/interpersonal problems',
        'Important activities given up',
        'Recurrent use in hazardous situations',
        'Continued despite physical/psychological problems',
        'Tolerance',
        'Withdrawal',
        'Severity: Mild (2-3 criteria), Moderate (4-5), Severe (6+)'
      ])
    },
    {
      slug: 'adhd',
      name: 'Attention-Deficit/Hyperactivity Disorder (ADHD)',
      category: 'Neurodevelopmental Disorders',
      description: 'A neurodevelopmental disorder characterized by persistent inattention, hyperactivity, and/or impulsivity that interferes with functioning.',
      symptoms: JSON.stringify([
        'Difficulty sustaining attention on tasks',
        'Easily distracted by external stimuli',
        'Difficulty organizing tasks and activities',
        'Loses things necessary for tasks',
        'Forgetful in daily activities',
        'Fails to give close attention to details',
        'Difficulty following through on instructions',
        'Avoids tasks requiring sustained mental effort',
        'Fidgets or squirms in seat',
        'Leaves seat when remaining seated expected',
        'Talks excessively',
        'Blurts out answers',
        'Difficulty waiting turn',
        'Interrupts or intrudes on others',
        'Feels restless internally (adults)'
      ]),
      biologicalCauses: JSON.stringify([
        'Strong genetic component (70-80% heritability)',
        'Differences in brain structure (prefrontal cortex, basal ganglia)',
        'Dopamine and norepinephrine dysregulation',
        'Delayed brain maturation',
        'Prenatal exposure to toxins, alcohol, or nicotine',
        'Low birth weight or premature birth'
      ]),
      psychologicalCauses: JSON.stringify([
        'Executive function deficits',
        'Difficulty with working memory',
        'Impaired inhibitory control',
        'Time perception difficulties',
        'Emotional dysregulation',
        'Motivational deficits'
      ]),
      socialCauses: JSON.stringify([
        'Early childhood adversity',
        'Chaotic or stressful environment',
        'Inconsistent parenting',
        'Limited structure and routine',
        'Overstimulating environment',
        'High-stress family dynamics',
        'Lack of support'
      ]),
      prevalence: '9.4% of U.S. children ages 2-17 (6.1 million). 4.4% of adults. More common in males (ADHD.org).',
      ageOfOnset: 'Symptoms must be present before age 12. Often diagnosed in elementary school years.',
      courseOfIllness: 'Chronic, lifelong condition. Symptoms may change with age. Hyperactivity often decreases in adults.',
      riskFactors: JSON.stringify([
        'Family history of ADHD',
        'Prenatal exposure to substances',
        'Premature birth',
        'Low birth weight',
        'Brain injury',
        'Environmental toxins (lead)',
        'Male gender',
        'Early childhood adversity'
      ]),
      protectiveFactors: JSON.stringify([
        'Early diagnosis and treatment',
        'Structured environment',
        'Consistent routines',
        'Supportive family',
        'Accommodations at school/work',
        'Exercise and physical activity',
        'Medication when appropriate',
        'Learning coping strategies'
      ]),
      comorbidities: JSON.stringify([
        'Learning disabilities (30-50%)',
        'Anxiety disorders (25-35%)',
        'Depression (18%)',
        'Oppositional defiant disorder',
        'Conduct disorder',
        'Substance use disorders (adults)',
        'Sleep disorders',
        'Autism spectrum disorder (overlap)'
      ]),
      naturalSolutions: JSON.stringify([
        'Regular exercise (30+ min daily)',
        'Structured daily routine',
        'Break tasks into smaller steps',
        'Use timers and reminders',
        'Minimize distractions when working',
        'Organization systems',
        'Adequate sleep (consistent schedule)',
        'Limit screen time',
        'Mindfulness meditation',
        'Cognitive-behavioral strategies',
        'Dietary approaches (limit sugar, food dyes)',
        'Omega-3 supplements',
        'Time management tools',
        'External motivation systems',
        'Body doubling (work alongside others)',
        'Fidget tools',
        'Movement breaks',
        'Visual schedules',
        'Accountability partner',
        'Celebrate small wins'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (EPA/DHA) 1000mg daily',
        'Protein-rich breakfast',
        'Complex carbohydrates',
        'Iron (if deficient)',
        'Zinc 15-30mg daily',
        'Magnesium',
        'Vitamin B6',
        'Avoid excess sugar',
        'Avoid artificial colors/flavors',
        'Regular, balanced meals',
        'Stay hydrated',
        'Limit caffeine',
        'Whole foods diet',
        'Avoid food sensitivities',
        'Consider elimination diet trial'
      ]),
      therapyApproaches: JSON.stringify([
        'Stimulant medications (methylphenidate, amphetamines) - most effective',
        'Non-stimulant medications (atomoxetine, guanfacine)',
        'Cognitive-Behavioral Therapy (CBT)',
        'Parent training for children',
        'Behavioral interventions',
        'Organizational skills training',
        'Social skills training',
        'Coaching',
        'School accommodations (IEP/504 plan)',
        'Workplace accommodations',
        'Combination medication + therapy most effective',
        'Support groups'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms interfering with school/work',
        'Relationship problems due to ADHD',
        'Chronic disorganization causing distress',
        'Inability to complete tasks',
        'Frequent job loss or academic failure',
        'Low self-esteem',
        'Risky behavior',
        'Suspected ADHD in child',
        'Co-occurring depression or anxiety',
        'Wanting to try medication'
      ]),
      crisisResources: JSON.stringify([
        'CHADD (Children and Adults with ADHD): chadd.org, 1-800-233-4050',
        'ADHD Foundation: adhdfoundation.org',
        'ADDitude Magazine: additudemag.com',
        'Mental health professionals specializing in ADHD'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd',
        'https://chadd.org/',
        'https://pubmed.ncbi.nlm.nih.gov/33316087/ - ADHD in adults',
        'https://pubmed.ncbi.nlm.nih.gov/32045436/ - ADHD treatment'
      ]),
      dsmCriteria: JSON.stringify([
        'Persistent pattern of inattention and/or hyperactivity-impulsivity',
        '6+ symptoms of inattention and/or 6+ of hyperactivity-impulsivity (5+ for adults)',
        'Symptoms present for at least 6 months',
        'Symptoms present before age 12',
        'Symptoms present in 2+ settings',
        'Clear evidence of interference with functioning',
        'Not better explained by another mental disorder',
        'Three presentations: Predominantly Inattentive, Predominantly Hyperactive-Impulsive, Combined',
        'Specify severity: Mild, Moderate, Severe',
        'In children: 6+ symptoms; In adults/adolescents 17+: 5+ symptoms'
      ])
    },
    {
      slug: 'autism-spectrum-disorder',
      name: 'Autism Spectrum Disorder (ASD)',
      category: 'Neurodevelopmental Disorders',
      description: 'A developmental disorder affecting communication, social interaction, and behavior, with a wide range of symptoms and severity.',
      symptoms: JSON.stringify([
        'Difficulty with social communication and interaction',
        'Limited eye contact',
        'Difficulty understanding social cues',
        'Challenges with back-and-forth conversation',
        'Difficulty understanding others\' perspectives',
        'Restricted, repetitive behaviors or interests',
        'Repetitive movements (hand flapping, rocking)',
        'Insistence on sameness',
        'Highly restricted interests',
        'Sensory sensitivities (sound, touch, light)',
        'Difficulty with transitions',
        'Literal understanding of language',
        'Unusual tone of voice or speech patterns',
        'Preference for solitude',
        'Difficulty making or keeping friends'
      ]),
      biologicalCauses: JSON.stringify([
        'Strong genetic component (80-90% heritability)',
        'Differences in brain structure and connectivity',
        'Prenatal factors (advanced parental age)',
        'Gene mutations',
        'Not caused by vaccines (thoroughly debunked)',
        'Possibly prenatal exposure to certain medications'
      ]),
      psychologicalCauses: JSON.stringify([
        'Differences in information processing',
        'Atypical sensory processing',
        'Different social-emotional development',
        'Differences in executive functioning',
        'Unique cognitive profile',
        'Theory of mind differences'
      ]),
      socialCauses: JSON.stringify([
        'Not caused by parenting or environment',
        'Social challenges can be exacerbated by lack of understanding',
        'Bullying and social rejection common',
        'Increased stress from navigating neurotypical world',
        'Lack of appropriate support',
        'Stigma and discrimination'
      ]),
      prevalence: '1 in 36 children in U.S. (CDC 2023). About 4x more common in boys than girls.',
      ageOfOnset: 'Symptoms present in early childhood, typically by age 2-3. Diagnosed throughout life.',
      courseOfIllness: 'Lifelong condition. Not a disease to cure, but neurodevelopmental difference. Appropriate support improves functioning.',
      riskFactors: JSON.stringify([
        'Having older parents',
        'Having a sibling with ASD (10-20x risk)',
        'Certain genetic conditions (Fragile X, Rett syndrome)',
        'Very low birth weight',
        'Prenatal medication exposure (valproic acid)',
        'Male gender'
      ]),
      protectiveFactors: JSON.stringify([
        'Early diagnosis and intervention',
        'Family support and acceptance',
        'Appropriate accommodations',
        'Neurodiversity-affirming approach',
        'Special education services',
        'Speech and occupational therapy',
        'Connection with autistic community',
        'Strength-based perspective'
      ]),
      comorbidities: JSON.stringify([
        'ADHD (50-70%)',
        'Anxiety disorders (40-50%)',
        'Depression',
        'Epilepsy (20-30%)',
        'Intellectual disability (30%)',
        'Sleep disorders',
        'GI issues',
        'Sensory processing disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Structured routines and predictability',
        'Visual supports and schedules',
        'Sensory accommodations',
        'Clear, direct communication',
        'Special interests as motivation',
        'Social skills practice in safe environment',
        'Occupational therapy for sensory issues',
        'Speech therapy if needed',
        'Noise-canceling headphones',
        'Weighted blankets or compression',
        'Safe spaces to decompress',
        'Respect for need for alone time',
        'Accommodations at school/work',
        'Connect with autistic community',
        'Neurodiversity-affirming therapy',
        'Self-advocacy skills',
        'Celebration of strengths',
        'AAC (augmentative communication) if needed',
        'Executive function supports',
        'Respect stimming behaviors'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet',
        'Address any food sensitivities',
        'Omega-3 fatty acids',
        'Probiotics for gut health',
        'Adequate protein',
        'B vitamins',
        'Magnesium',
        'Zinc',
        'Vitamin D',
        'Iron if deficient',
        'Stay hydrated',
        'Respect food preferences/aversions',
        'Consider texture sensitivities',
        'No special "autism diet" proven effective',
        'Consult dietitian if needed'
      ]),
      therapyApproaches: JSON.stringify([
        'Early intensive behavioral intervention (controversial)',
        'Speech and language therapy',
        'Occupational therapy',
        'Social skills training',
        'CBT for anxiety/depression',
        'Medication for co-occurring conditions only',
        'Educational supports (IEP)',
        'Family support and education',
        'AAC if needed',
        'Neurodiversity-affirming approaches preferred',
        'Avoid ABA (controversial, focus on acceptance not compliance)',
        'Sensory integration therapy',
        'Support groups'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Developmental delays or differences noticed',
        'Social communication challenges',
        'Need for diagnosis for school accommodations',
        'Co-occurring mental health issues',
        'Need support services',
        'Family needs guidance',
        'Transitioning to adulthood',
        'Employment support needed',
        'Self-injurious behavior',
        'Severe anxiety or depression'
      ]),
      crisisResources: JSON.stringify([
        'Autism Society: autism-society.org, 1-800-328-8476',
        'Autistic Self Advocacy Network (ASAN): autisticadvocacy.org',
        'Autism Speaks: autismspeaks.org (note: controversial)',
        'Local autism support groups',
        'Special education advocacy'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd',
        'https://www.cdc.gov/autism/',
        'https://autisticadvocacy.org/',
        'https://pubmed.ncbi.nlm.nih.gov/33914271/ - ASD research'
      ]),
      dsmCriteria: JSON.stringify([
        'Persistent deficits in social communication and interaction across multiple contexts',
        'Deficits in social-emotional reciprocity',
        'Deficits in nonverbal communication',
        'Deficits in developing/maintaining relationships',
        'Restricted, repetitive patterns of behavior, interests, or activities (2+ of following):',
        'Stereotyped or repetitive motor movements, speech, or object use',
        'Insistence on sameness, inflexible routines, ritualized patterns',
        'Highly restricted, fixated interests',
        'Hyper- or hypo-reactivity to sensory input or unusual sensory interests',
        'Symptoms present in early developmental period',
        'Symptoms cause clinically significant impairment',
        'Not better explained by intellectual disability',
        'Specify severity level: 1 (requiring support), 2 (requiring substantial support), 3 (requiring very substantial support)'
      ])
    },
    {
      slug: 'insomnia-disorder',
      name: 'Insomnia Disorder',
      category: 'Sleep-Wake Disorders',
      description: 'A persistent difficulty falling asleep, staying asleep, or waking too early, despite adequate opportunity to sleep, causing daytime impairment.',
      symptoms: JSON.stringify([
        'Difficulty initiating sleep',
        'Difficulty maintaining sleep (frequent awakenings)',
        'Early morning awakening',
        'Daytime fatigue or sleepiness',
        'Difficulty concentrating',
        'Mood disturbances (irritability, dysphoria)',
        'Decreased performance at work or school',
        'Worry or distress about sleep',
        'Physical tension',
        'Daytime dysfunction',
        'Headaches',
        'Gastrointestinal symptoms',
        'Ongoing concerns about sleep',
        'Low energy',
        'Behavioral problems from fatigue'
      ]),
      biologicalCauses: JSON.stringify([
        'Hyperarousal of stress response system',
        'Circadian rhythm disruptions',
        'Genetic predisposition',
        'Hormonal changes (menopause, thyroid)',
        'Neurochemical imbalances',
        'Medical conditions causing pain or discomfort',
        'Medications with alerting effects'
      ]),
      psychologicalCauses: JSON.stringify([
        'Anxiety and worry (especially about sleep)',
        'Depression',
        'Stress',
        'Rumination',
        'Perfectionism about sleep',
        'Conditioned arousal in bed',
        'Catastrophic thinking about sleeplessness',
        'Hypervigilance'
      ]),
      socialCauses: JSON.stringify([
        'Work stress',
        'Shift work',
        'Jet lag',
        'Major life stressors',
        'Noise in environment',
        'Uncomfortable sleep environment',
        'Irregular schedule',
        'Screen use before bed',
        'Caffeine or alcohol use',
        'Lack of sleep hygiene'
      ]),
      prevalence: '10-30% of adults. More common in women, older adults. Chronic insomnia: 10% of population.',
      ageOfOnset: 'Can begin at any age. Often starts during periods of stress. More common with aging.',
      courseOfIllness: 'Can be acute (days-weeks) or chronic (3+ months). Without treatment, often becomes chronic.',
      riskFactors: JSON.stringify([
        'Female gender',
        'Older age',
        'Shift work',
        'High stress',
        'Mental health disorders',
        'Medical conditions',
        'Certain medications',
        'Low socioeconomic status',
        'Worry-prone personality'
      ]),
      protectiveFactors: JSON.stringify([
        'Good sleep hygiene',
        'Regular schedule',
        'Stress management',
        'Healthy lifestyle',
        'Supportive environment',
        'Treating underlying conditions',
        'Exercise (not close to bedtime)',
        'Relaxation skills'
      ]),
      comorbidities: JSON.stringify([
        'Depression (40%)',
        'Anxiety disorders (50-60%)',
        'Chronic pain',
        'PTSD',
        'Substance use disorders',
        'Cardiovascular disease',
        'Diabetes',
        'Obesity',
        'Gastrointestinal disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy for Insomnia (CBT-I) - most effective',
        'Sleep restriction therapy',
        'Stimulus control (bed only for sleep)',
        'Consistent sleep schedule',
        'Relaxation techniques',
        'Mindfulness meditation',
        'No screens 1-2 hours before bed',
        'Dark, cool, quiet bedroom',
        'Avoid caffeine after noon',
        'Avoid alcohol',
        'Regular exercise (not close to bedtime)',
        'Light exposure in morning',
        'Limit naps (or 20-30 min only)',
        'Get out of bed if can\'t sleep after 20 min',
        'Address worries before bed',
        'Relaxing bedtime routine',
        'No clock-watching',
        'Paradoxical intention (try to stay awake)',
        'Progressive muscle relaxation',
        '4-7-8 breathing'
      ]),
      nutritionalRecs: JSON.stringify([
        'Avoid caffeine 6+ hours before bed',
        'Avoid large meals before bed',
        'Light snack if hungry',
        'Foods with tryptophan (turkey, milk)',
        'Complex carbohydrates',
        'Magnesium-rich foods',
        'Avoid alcohol (disrupts sleep)',
        'Stay hydrated but limit fluids before bed',
        'Herbal tea (chamomile, valerian)',
        'Tart cherry juice (natural melatonin)',
        'B vitamins',
        'Vitamin D',
        'Calcium',
        'Avoid heavy, spicy, or acidic foods at night'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy for Insomnia (CBT-I) - GOLD STANDARD',
        'Sleep restriction',
        'Stimulus control',
        'Sleep hygiene education',
        'Relaxation training',
        'Cognitive restructuring of sleep beliefs',
        'Mindfulness-based therapy',
        'Medication (short-term only): benzodiazepines, Z-drugs, melatonin',
        'Avoid long-term sleep medication',
        'Treat underlying conditions',
        'Light therapy for circadian issues',
        'Online CBT-I programs available'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Insomnia lasting 3+ months',
        'Significant daytime impairment',
        'Affecting work, relationships, or health',
        'Co-occurring depression or anxiety',
        'Using alcohol or drugs to sleep',
        'Possible sleep apnea (loud snoring, gasping)',
        'Restless legs syndrome suspected',
        'Medication causing insomnia',
        'Self-help not working',
        'Want CBT-I treatment'
      ]),
      crisisResources: JSON.stringify([
        'National Sleep Foundation: sleepfoundation.org',
        'American Academy of Sleep Medicine: aasm.org',
        'Society of Behavioral Sleep Medicine: behavioralsleep.org',
        'Primary care doctor',
        'Sleep medicine specialist',
        'CBT-I therapist'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/sleep-disorders',
        'https://www.sleepfoundation.org/',
        'https://pubmed.ncbi.nlm.nih.gov/33007045/ - CBT-I efficacy',
        'https://pubmed.ncbi.nlm.nih.gov/32847525/ - Insomnia treatment'
      ]),
      dsmCriteria: JSON.stringify([
        'Predominant complaint of dissatisfaction with sleep quantity or quality',
        'One or more of: difficulty initiating sleep, maintaining sleep, or early-morning awakening',
        'Causes clinically significant distress or impairment',
        'Occurs at least 3 nights per week',
        'Present for at least 3 months',
        'Despite adequate opportunity for sleep',
        'Not better explained by another sleep disorder',
        'Not attributable to substance or medical condition',
        'Not adequately explained by coexisting mental disorder',
        'Specify: Episodic (1-3 months), Persistent (3+ months), Recurrent (2+ episodes within a year)'
      ])
    },
    {
      slug: 'body-dysmorphic-disorder',
      name: 'Body Dysmorphic Disorder (BDD)',
      category: 'Obsessive-Compulsive Disorders',
      description: 'Preoccupation with perceived flaws in physical appearance that are not observable or appear slight to others, causing significant distress.',
      symptoms: JSON.stringify([
        'Preoccupation with perceived physical defect(s)',
        'Repetitive behaviors (mirror checking, excessive grooming)',
        'Skin picking to "fix" perceived flaws',
        'Seeking reassurance about appearance',
        'Comparing appearance with others',
        'Camouflaging (makeup, clothing, posture)',
        'Avoidance of social situations',
        'Avoidance of mirrors or reflective surfaces',
        'Belief that others notice and judge the "flaw"',
        'Significant distress or impairment',
        'Difficulty concentrating due to preoccupation',
        'Seeking cosmetic procedures',
        'Never satisfied with appearance',
        'Suicidal thoughts (high rate)',
        'Most commonly focused on: skin, hair, nose, weight'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic vulnerability',
        'Brain differences (visual processing, emotional regulation)',
        'Serotonin dysregulation',
        'Family history of OCD or BDD',
        'Neurotransmitter imbalances',
        'Differences in frontal-striatal circuits'
      ]),
      psychologicalCauses: JSON.stringify([
        'Perfectionism',
        'Low self-esteem',
        'History of bullying or teasing about appearance',
        'Trauma',
        'Excessive emphasis on appearance in family',
        'Personality traits (neuroticism, harm avoidance)',
        'Negative body image',
        'Cognitive biases about appearance'
      ]),
      socialCauses: JSON.stringify([
        'Societal emphasis on physical appearance',
        'Media portrayal of "ideal" bodies',
        'Social media and filters',
        'Bullying or teasing',
        'Peer pressure',
        'Cultural beauty standards',
        'Comparison with others',
        'Objectification'
      ]),
      prevalence: '2.4% of U.S. population. Underdiagnosed. Equal in males and females. Onset typically teens-20s.',
      ageOfOnset: 'Usually begins in adolescence (12-13 years old). Can begin in childhood or adulthood.',
      courseOfIllness: 'Chronic and severe if untreated. Usually affects multiple body areas. High suicide risk. Treatment can be effective.',
      riskFactors: JSON.stringify([
        'Family history of BDD or OCD',
        'Bullying about appearance',
        'Perfectionism',
        'Low self-esteem',
        'Social anxiety',
        'History of trauma',
        'Certain personality traits',
        'Adolescence',
        'Exposure to appearance-focused media'
      ]),
      protectiveFactors: JSON.stringify([
        'Early treatment',
        'Supportive relationships',
        'Positive body image education',
        'Reduced social media use',
        'Media literacy',
        'Strong self-esteem',
        'Healthy coping skills',
        'Access to mental health care'
      ]),
      comorbidities: JSON.stringify([
        'Major Depression (75%)',
        'Social Anxiety Disorder (40%)',
        'OCD (30%)',
        'Substance Use Disorders',
        'Eating Disorders',
        'Suicidal ideation (very high)',
        'Skin picking disorder',
        'Trichotillomania'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive-Behavioral Therapy (CBT) - MOST EFFECTIVE',
        'Exposure and Response Prevention (ERP)',
        'Limit mirror checking and reassurance-seeking',
        'Challenge appearance-related thoughts',
        'Reduce social media use',
        'Avoid cosmetic procedures (often make BDD worse)',
        'Mindfulness practices',
        'Self-compassion exercises',
        'Focus on functionality over appearance',
        'Engage in valued activities',
        'Reduce appearance-focused conversations',
        'Support groups',
        'Body neutrality approach',
        'Avoid photo filters',
        'Reduce time grooming',
        'Practice exposure to avoided situations',
        'Thought records',
        'Behavioral experiments',
        'Build life meaning beyond appearance',
        'Journaling'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet',
        'Omega-3 fatty acids',
        'B vitamins',
        'Magnesium',
        'Vitamin D',
        'Zinc',
        'Protein',
        'Complex carbohydrates',
        'Antioxidants',
        'Stay hydrated',
        'Limit caffeine',
        'Avoid restrictive dieting',
        'Intuitive eating',
        'Don\'t use food to "fix" appearance',
        'Focus on nourishment not appearance'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive-Behavioral Therapy (CBT) - FIRST LINE',
        'Exposure and Response Prevention (ERP)',
        'SSRIs (high doses): fluoxetine, escitalopram - often helpful',
        'Group therapy',
        'Family therapy',
        'Avoid reassurance-giving',
        'Address co-occurring disorders',
        'Motivational interviewing',
        'Acceptance and Commitment Therapy (ACT)',
        'Avoid unnecessary cosmetic procedures',
        'Inpatient if severe/suicidal',
        'Long-term treatment usually needed'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Preoccupation causing significant distress',
        'Avoiding social situations',
        'Spending hours daily on appearance concerns',
        'Unable to stop repetitive behaviors',
        'Considering or seeking cosmetic surgery',
        'Depression or suicidal thoughts',
        'Relationship or work problems',
        'Unable to function normally',
        'Skin damage from picking',
        'Substance use to cope'
      ]),
      crisisResources: JSON.stringify([
        'International OCD Foundation BDD Program: bdd.iocdf.org',
        'BDD Foundation: bddfoundation.org',
        'Body Dysmorphic Disorder Program at MGH',
        'IOCDF: iocdf.org',
        'Mental health crisis line: 988',
        'BDD specialist therapist'
      ]),
      researchLinks: JSON.stringify([
        'https://iocdf.org/expert-opinions/body-dysmorphic-disorder/',
        'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd',
        'https://pubmed.ncbi.nlm.nih.gov/31145535/ - BDD treatment',
        'https://pubmed.ncbi.nlm.nih.gov/28238207/ - CBT for BDD'
      ]),
      dsmCriteria: JSON.stringify([
        'Preoccupation with one or more perceived defects/flaws in appearance not observable or appear slight to others',
        'At some point, performed repetitive behaviors (mirror checking, excessive grooming, skin picking, reassurance seeking) or mental acts (comparing appearance)',
        'Preoccupation causes clinically significant distress or impairment',
        'Not better explained by eating disorder concerns',
        'Specify if: With muscle dysmorphia (preoccupation that build is too small/insufficiently muscular)',
        'Specify insight: Good/fair, Poor, Absent/delusional beliefs',
        'Note: About 25% of people with BDD have delusional beliefs about their appearance'
      ])
    },
    // TRAUMA & STRESS DISORDERS (Additional)
    {
      slug: 'complex-ptsd',
      name: 'Complex PTSD (C-PTSD)',
      category: 'Trauma & Stress-Related Disorders',
      description: 'A condition that develops from prolonged, repeated trauma, often in situations where escape is difficult or impossible, resulting in severe emotional dysregulation and interpersonal difficulties beyond standard PTSD symptoms.',
      symptoms: JSON.stringify([
        'All symptoms of PTSD (flashbacks, avoidance, hypervigilance)',
        'Severe difficulty regulating emotions',
        'Persistent negative self-perception (shame, guilt, worthlessness)',
        'Difficulty trusting others',
        'Relationship difficulties and avoidance of relationships',
        'Feeling permanently damaged or changed',
        'Dissociative symptoms',
        'Emotional numbness',
        'Explosive anger or extreme passivity',
        'Difficulty experiencing positive emotions',
        'Chronic feelings of emptiness',
        'Suicidal thoughts or self-harm',
        'Somatic symptoms (chronic pain, gastrointestinal issues)',
        'Difficulty with identity and sense of self',
        'Feeling detached from body or surroundings',
        'Reliving traumatic experiences repeatedly',
        'Extreme sensitivity to rejection',
        'Problems with concentration and memory'
      ]),
      biologicalCauses: JSON.stringify([
        'Prolonged activation of stress response system (HPA axis)',
        'Structural brain changes (smaller hippocampus, altered amygdala)',
        'Dysregulation of cortisol and other stress hormones',
        'Changes in neurotransmitter systems (serotonin, dopamine, norepinephrine)',
        'Epigenetic changes from chronic trauma exposure',
        'Altered autonomic nervous system functioning',
        'Inflammatory markers elevation'
      ]),
      psychologicalCauses: JSON.stringify([
        'Prolonged childhood abuse (physical, sexual, emotional)',
        'Chronic domestic violence',
        'Being a prisoner of war or in captivity',
        'Human trafficking or slavery',
        'Prolonged exposure to war or genocide',
        'Repeated traumatic events during development',
        'Lack of safe attachment in childhood',
        'Betrayal trauma from caregivers'
      ]),
      socialCauses: JSON.stringify([
        'Lack of support during/after trauma',
        'Social isolation',
        'Ongoing abuse in family or relationship',
        'Inability to escape traumatic situation',
        'Lack of resources or power',
        'Societal neglect or institutional abuse',
        'Revictimization',
        'Stigma preventing help-seeking'
      ]),
      prevalence: '1-3% of general population. Higher in those with trauma history (12-30%). More common in women.',
      ageOfOnset: 'Can develop at any age, often originates from childhood trauma',
      courseOfIllness: 'Chronic and persistent without treatment. Recovery requires specialized trauma therapy over extended period. Symptoms can improve significantly with appropriate treatment but may have lasting effects.',
      riskFactors: JSON.stringify([
        'Childhood trauma or abuse',
        'Prolonged traumatic experiences',
        'Multiple traumatic events',
        'Lack of social support',
        'History of mental health issues',
        'Female gender',
        'Early age at first trauma',
        'Interpersonal trauma (vs. accident/disaster)',
        'Betrayal by caregiver or trusted person'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support network',
        'Access to trauma-informed therapy',
        'Safe, stable living environment',
        'Healthy coping skills',
        'Sense of empowerment and control',
        'Supportive relationships',
        'Community resources',
        'Financial stability'
      ]),
      comorbidities: JSON.stringify([
        'Major depressive disorder (very common)',
        'PTSD',
        'Borderline personality disorder (overlapping symptoms)',
        'Substance use disorders (50-70%)',
        'Eating disorders',
        'Dissociative disorders',
        'Chronic pain syndromes',
        'Autoimmune conditions'
      ]),
      naturalSolutions: JSON.stringify([
        'Trauma-focused therapy (EMDR, CPT, DBT)',
        'Grounding techniques for dissociation',
        'Body-based practices (yoga, somatic experiencing)',
        'Mindfulness and meditation (with trauma considerations)',
        'Safe relationships and community',
        'Creative expression (art, music, writing)',
        'Nature exposure and outdoor activities',
        'Regular exercise (non-triggering)',
        'Establishing safety and routine',
        'Emotional regulation skills practice',
        'Self-compassion practices',
        'Peer support groups',
        'Breathing exercises',
        'Progressive muscle relaxation',
        'Journaling (with safety considerations)',
        'Animal-assisted therapy',
        'Limit triggers when possible',
        'Sleep hygiene practices',
        'Advocacy and empowerment activities',
        'Volunteer work or helping others'
      ]),
      nutritionalRecs: JSON.stringify([
        'Anti-inflammatory diet (Mediterranean style)',
        'Omega-3 fatty acids (2g/day for brain health)',
        'B-complex vitamins for stress',
        'Vitamin D supplementation (often deficient)',
        'Magnesium for nervous system (400-500mg/day)',
        'Probiotic foods for gut-brain axis',
        'Adequate protein for neurotransmitter production',
        'Complex carbohydrates for serotonin',
        'Limit caffeine (can increase anxiety)',
        'Avoid alcohol (worsens symptoms)',
        'Zinc-rich foods',
        'Antioxidant-rich foods',
        'Stable blood sugar (regular meals)',
        'Adequate hydration',
        'Consider L-theanine for calm focus'
      ]),
      therapyApproaches: JSON.stringify([
        'Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)',
        'Eye Movement Desensitization and Reprocessing (EMDR)',
        'Dialectical Behavior Therapy (DBT) - for emotion regulation',
        'Cognitive Processing Therapy (CPT)',
        'Somatic Experiencing',
        'Internal Family Systems (IFS)',
        'Schema Therapy',
        'Sensorimotor Psychotherapy',
        'Prolonged Exposure Therapy (modified for C-PTSD)',
        'Group therapy with trauma survivors',
        'Medications: SSRIs, SNRIs (for depression/anxiety symptoms)',
        'Prazosin for nightmares',
        'Stabilization phase before trauma processing'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Severe emotional dysregulation',
        'Suicidal thoughts or self-harm',
        'Unable to function in daily life',
        'Dissociative episodes',
        'Flashbacks interfering with life',
        'Substance abuse to cope',
        'Relationship breakdown',
        'Chronic physical symptoms',
        'Feeling unsafe in current environment',
        'Previous trauma therapy not helping',
        'Ready to address past trauma',
        'Need for stabilization'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'RAINN National Sexual Assault Hotline: 1-800-656-4673',
        'National Domestic Violence Hotline: 1-800-799-7233',
        'Veterans Crisis Line: 988 then press 1',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd',
        'https://www.ptsd.va.gov/',
        'https://pubmed.ncbi.nlm.nih.gov/29632869/ - C-PTSD diagnosis',
        'https://www.istss.org/ - International Society for Traumatic Stress Studies'
      ]),
      dsmCriteria: JSON.stringify([
        'Exposure to prolonged or repeated traumatic events',
        'All diagnostic criteria for PTSD met',
        'Additional disturbances in self-organization:',
        '1. Severe problems in affect regulation',
        '2. Persistent negative beliefs about oneself',
        '3. Persistent difficulties in sustaining relationships',
        'Symptoms cause significant distress or impairment',
        'Not attributable to substances or medical condition',
        'Distinct from Borderline Personality Disorder',
        'Listed in ICD-11 (not yet in DSM-5 as separate diagnosis)',
        'Requires assessment of developmental trauma',
        'Often involves betrayal trauma or attachment trauma'
      ])
    },
    {
      slug: 'acute-stress-disorder',
      name: 'Acute Stress Disorder',
      category: 'Trauma & Stress-Related Disorders',
      description: 'A short-term condition that develops within one month of exposure to a traumatic event, characterized by intrusive memories, dissociation, avoidance, and arousal symptoms lasting 3 days to 1 month.',
      symptoms: JSON.stringify([
        'Intrusive memories or flashbacks of trauma',
        'Recurrent distressing dreams',
        'Dissociative reactions (feeling detached)',
        'Intense psychological distress to trauma reminders',
        'Inability to remember important aspects of trauma',
        'Persistent negative emotional state',
        'Inability to experience positive emotions',
        'Avoidance of trauma reminders',
        'Avoidance of memories, thoughts, or feelings',
        'Difficulty sleeping',
        'Irritability or angry outbursts',
        'Hypervigilance',
        'Exaggerated startle response',
        'Problems with concentration',
        'Feeling dazed or in shock',
        'Altered sense of reality',
        'Physical symptoms (rapid heartbeat, sweating)',
        'Emotional numbness'
      ]),
      biologicalCauses: JSON.stringify([
        'Acute activation of stress response (fight-flight-freeze)',
        'Elevated cortisol and adrenaline',
        'Overactivation of amygdala (fear center)',
        'Disrupted hippocampus functioning (memory)',
        'Autonomic nervous system dysregulation',
        'Rapid neurotransmitter changes',
        'Genetic vulnerability to stress'
      ]),
      psychologicalCauses: JSON.stringify([
        'Exposure to traumatic event (death, injury, violence)',
        'Perception of life threat',
        'Feeling of helplessness during trauma',
        'Previous trauma history',
        'Lack of coping skills',
        'Negative appraisal of trauma',
        'Peri-traumatic dissociation',
        'Lack of social support'
      ]),
      socialCauses: JSON.stringify([
        'Type of trauma (interpersonal often worse)',
        'Lack of immediate support after trauma',
        'Additional life stressors',
        'Social isolation',
        'Lack of resources',
        'Ongoing threat or danger',
        'Secondary victimization (e.g., legal process)',
        'Media exposure to trauma'
      ]),
      prevalence: '5-20% of those exposed to trauma develop ASD. Risk higher with severe trauma. Can progress to PTSD in 50% if untreated.',
      ageOfOnset: 'Can occur at any age, develops within 1 month of trauma',
      courseOfIllness: 'Lasts 3 days to 1 month after trauma. If symptoms persist beyond 1 month, diagnosis changes to PTSD. Early intervention can prevent PTSD development.',
      riskFactors: JSON.stringify([
        'Prior trauma history',
        'Prior mental health issues',
        'Female gender',
        'Severity of trauma',
        'Peri-traumatic dissociation',
        'Lack of social support',
        'High level of exposure to trauma',
        'Perceived life threat',
        'Interpersonal trauma'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support',
        'Early intervention and treatment',
        'Good coping skills',
        'Previous resilience',
        'Sense of control',
        'Meaning-making ability',
        'Access to mental health care',
        'Safe environment post-trauma'
      ]),
      comorbidities: JSON.stringify([
        'Often progresses to PTSD (50%)',
        'Major depressive disorder',
        'Other anxiety disorders',
        'Substance use disorders',
        'Adjustment disorders',
        'Panic disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Early psychological first aid',
        'Social support and connection',
        'Grounding techniques',
        'Breathing exercises',
        'Gradual return to normal activities',
        'Physical exercise',
        'Maintain routine where possible',
        'Limit exposure to trauma reminders initially',
        'Talk to supportive people',
        'Avoid alcohol and drugs',
        'Adequate sleep and rest',
        'Mindfulness (brief, grounding-focused)',
        'Nature exposure',
        'Journaling',
        'Creative expression',
        'Self-compassion',
        'Limit news/media about trauma',
        'Pet companionship',
        'Relaxation techniques',
        'Gentle yoga or stretching'
      ]),
      nutritionalRecs: JSON.stringify([
        'Maintain regular meals (stress affects appetite)',
        'Complex carbohydrates for serotonin',
        'Adequate protein',
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Magnesium for calming',
        'Limit caffeine (increases anxiety)',
        'Avoid alcohol',
        'Stay hydrated',
        'Vitamin C for stress',
        'Chamomile tea',
        'Warm milk (tryptophan)',
        'Avoid sugar crashes',
        'Probiotic foods',
        'Small, frequent meals if needed'
      ]),
      therapyApproaches: JSON.stringify([
        'Trauma-Focused Cognitive Behavioral Therapy (TF-CBT) - early intervention',
        'Cognitive Processing Therapy (CPT)',
        'Eye Movement Desensitization and Reprocessing (EMDR)',
        'Psychological first aid',
        'Brief psychoeducation about normal trauma reactions',
        'Exposure therapy (gradual)',
        'Stress inoculation training',
        'Supportive counseling',
        'Crisis intervention',
        'SSRIs or SNRIs (if severe)',
        'Short-term anti-anxiety medication (used cautiously)',
        'Group therapy with other trauma survivors'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms persist beyond 2 weeks',
        'Symptoms interfere with daily functioning',
        'Suicidal thoughts',
        'Severe dissociation',
        'Unable to care for self or others',
        'Substance use to cope',
        'Flashbacks increasing in frequency',
        'Physical symptoms concerning',
        'Not improving with support',
        'Avoidance preventing return to life',
        'Severe sleep problems',
        'Risk of developing PTSD'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA Disaster Distress Helpline: 1-800-985-5990',
        'RAINN (if sexual assault): 1-800-656-4673',
        'Veterans Crisis Line: 988 then press 1',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/coping-with-traumatic-events',
        'https://www.ptsd.va.gov/understand/types/acute_stress.asp',
        'https://pubmed.ncbi.nlm.nih.gov/30550646/ - Early intervention for ASD',
        'https://www.apa.org/ptsd-guideline/treatments/acute-stress-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Exposure to actual or threatened death, serious injury, or sexual violation',
        'Symptoms begin or worsen after trauma',
        'Duration: 3 days to 1 month after trauma',
        'Presence of 9+ symptoms from 5 categories:',
        '  - Intrusion (memories, dreams, flashbacks, distress, reactions)',
        '  - Negative mood',
        '  - Dissociation (altered reality, inability to remember)',
        '  - Avoidance (memories, external reminders)',
        '  - Arousal (sleep, concentration, irritability, hypervigilance, startle)',
        'Clinically significant distress or impairment',
        'Not attributable to substances or medical condition',
        'Not better explained by brief psychotic disorder',
        'If symptoms last >1 month, diagnose as PTSD instead'
      ])
    },
    {
      slug: 'adjustment-disorders',
      name: 'Adjustment Disorders',
      category: 'Trauma & Stress-Related Disorders',
      description: 'Emotional or behavioral symptoms that develop within 3 months of a specific stressor, with symptoms that are more severe than expected and cause significant impairment, but don\'t meet criteria for other disorders.',
      symptoms: JSON.stringify([
        'Depressed mood',
        'Anxiety or worry',
        'Feeling overwhelmed',
        'Difficulty concentrating',
        'Sleep disturbances',
        'Changes in appetite',
        'Tearfulness or crying',
        'Hopelessness',
        'Social withdrawal',
        'Irritability or anger',
        'Reckless behavior',
        'Physical complaints (headaches, stomachaches)',
        'Difficulty performing at work/school',
        'Relationship problems',
        'Loss of interest in usual activities',
        'Truancy or avoiding responsibilities',
        'Thoughts of suicide (in severe cases)',
        'Substance use increase'
      ]),
      biologicalCauses: JSON.stringify([
        'Stress response activation',
        'Cortisol elevation',
        'Neurotransmitter fluctuations',
        'Genetic vulnerability to stress',
        'Existing biological sensitivities',
        'Sleep disruption effects',
        'Immune system changes from stress'
      ]),
      psychologicalCauses: JSON.stringify([
        'Identifiable stressor or life change',
        'Poor coping skills',
        'Negative thinking patterns',
        'Low resilience',
        'Perfectionism',
        'Difficulty with change',
        'Previous mental health issues',
        'Limited problem-solving skills'
      ]),
      socialCauses: JSON.stringify([
        'Major life changes (divorce, job loss, moving)',
        'Relationship problems',
        'Financial difficulties',
        'Academic pressures',
        'Family conflicts',
        'Illness in self or family',
        'Retirement',
        'Lack of social support',
        'Cultural or life transitions',
        'Multiple stressors at once',
        'Work stress or changes',
        'Loss of significant relationship'
      ]),
      prevalence: '5-20% of those in outpatient mental health treatment. Very common in primary care. Can occur at any age.',
      ageOfOnset: 'Can occur at any age, any time after a stressor',
      courseOfIllness: 'Begins within 3 months of stressor. Usually resolves within 6 months after stressor ends. Chronic if stressor continues (e.g., chronic illness).',
      riskFactors: JSON.stringify([
        'Recent significant life change',
        'Multiple concurrent stressors',
        'Low social support',
        'Prior mental health issues',
        'Poor coping skills',
        'Chronic stress',
        'Financial instability',
        'Childhood adversity',
        'Personality factors (neuroticism)'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support',
        'Good coping skills',
        'Resilience',
        'Problem-solving abilities',
        'Previous success managing stress',
        'Sense of control',
        'Optimism',
        'Access to resources',
        'Healthy lifestyle'
      ]),
      comorbidities: JSON.stringify([
        'May progress to depression or anxiety disorders',
        'Substance use (to cope)',
        'Often occurs alone',
        'Can co-occur with medical conditions',
        'Physical health problems from stress'
      ]),
      naturalSolutions: JSON.stringify([
        'Problem-focused coping (address stressor if possible)',
        'Social support and connection',
        'Regular exercise',
        'Maintain routine',
        'Stress management techniques',
        'Relaxation practices',
        'Mindfulness meditation',
        'Journaling',
        'Time management',
        'Self-care activities',
        'Limit additional stressors',
        'Breathing exercises',
        'Creative outlets',
        'Nature exposure',
        'Pet companionship',
        'Support groups',
        'Volunteer work',
        'Hobbies and pleasant activities',
        'Adequate sleep',
        'Balanced perspective (cognitive reframing)'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, regular meals',
        'Complex carbohydrates for mood',
        'Adequate protein',
        'Omega-3 fatty acids',
        'B-complex vitamins for stress',
        'Magnesium-rich foods',
        'Limit caffeine',
        'Limit alcohol',
        'Stay hydrated',
        'Vitamin D',
        'Probiotic foods',
        'Antioxidant-rich foods',
        'Avoid comfort eating',
        'Herbal teas (chamomile, lavender)',
        'Regular meal schedule'
      ]),
      therapyApproaches: JSON.stringify([
        'Brief psychotherapy (most effective)',
        'Cognitive Behavioral Therapy (CBT)',
        'Problem-solving therapy',
        'Supportive counseling',
        'Stress management training',
        'Family therapy (if stressor involves family)',
        'Group therapy',
        'Crisis intervention',
        'Interpersonal therapy',
        'Antidepressants (SSRIs) if symptoms severe',
        'Short-term anti-anxiety medication (used cautiously)',
        'Usually improves with therapy alone'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms not improving after 2-4 weeks',
        'Unable to function at work or school',
        'Relationship breakdown',
        'Suicidal thoughts',
        'Substance use increasing',
        'Physical health declining',
        'Symptoms worsening',
        'Severe anxiety or depression',
        'Risky or impulsive behaviors',
        'Need help coping with stressor',
        'Symptoms persisting after stressor resolved',
        'Isolation increasing'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Employee Assistance Program (if available)',
        'Local community mental health center',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/coping-with-traumatic-events',
        'https://pubmed.ncbi.nlm.nih.gov/28945333/ - Treatment of adjustment disorders',
        'https://www.psychiatry.org/patients-families/adjustment-disorders',
        'https://www.apa.org/topics/stress'
      ]),
      dsmCriteria: JSON.stringify([
        'Emotional or behavioral symptoms in response to identifiable stressor(s)',
        'Symptoms occur within 3 months of onset of stressor',
        'Symptoms are clinically significant, evidenced by:',
        '  - Marked distress out of proportion to stressor, OR',
        '  - Significant impairment in functioning',
        'Not meeting criteria for another mental disorder',
        'Not merely exacerbation of pre-existing disorder',
        'Not normal bereavement',
        'Once stressor ends, symptoms resolve within 6 months',
        'Specify subtype: With depressed mood, anxious mood, mixed anxiety/depression, disturbed conduct, mixed disturbance of emotions/conduct, or unspecified',
        'Specify: Acute (<6 months) or Persistent/Chronic (>6 months)',
        'Diagnosis is "rule out" - ensure symptoms not better explained by other disorder'
      ])
    },
    // OCD SPECTRUM DISORDER (Additional)
    {
      slug: 'trichotillomania',
      name: 'Trichotillomania (Hair-Pulling Disorder)',
      category: 'Obsessive-Compulsive and Related Disorders',
      description: 'A disorder characterized by recurrent pulling out of one\'s hair, resulting in hair loss, despite repeated attempts to stop, causing significant distress or impairment.',
      symptoms: JSON.stringify([
        'Recurrent pulling out of own hair',
        'Noticeable hair loss',
        'Repeated attempts to decrease or stop hair pulling',
        'Hair pulling causes distress or impairment',
        'Sense of tension before pulling',
        'Sense of relief or pleasure during/after pulling',
        'Automatic (without awareness) or focused pulling',
        'Examination of hair root after pulling',
        'Playing with pulled hair',
        'Eating hair (trichophagia - in some)',
        'Avoidance of social situations due to hair loss',
        'Using wigs, hats, or makeup to hide bald spots',
        'Shame and embarrassment',
        'Most common sites: scalp, eyebrows, eyelashes',
        'Can also pull body hair, pubic hair',
        'Triggers: stress, boredom, anxiety'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family clustering)',
        'Brain abnormalities (frontostriatal circuits)',
        'Neurotransmitter imbalances (serotonin, dopamine)',
        'Reward system dysfunction',
        'Habit formation in basal ganglia',
        'Similar biology to OCD and addictions'
      ]),
      psychologicalCauses: JSON.stringify([
        'Emotional regulation difficulties',
        'Stress or anxiety relief mechanism',
        'Boredom or under-stimulation',
        'Perfectionism',
        'Body-focused repetitive behavior (BFRB)',
        'Learned habit reinforced by relief',
        'Low distress tolerance',
        'Cognitive distortions about hair'
      ]),
      socialCauses: JSON.stringify([
        'Stressful life events or trauma',
        'Family history of hair pulling',
        'Social anxiety or isolation',
        'Perfectionism pressure',
        'Modeling of pulling behavior',
        'Lack of healthy coping skills',
        'Shame preventing help-seeking'
      ]),
      prevalence: '1-2% of population. More common in females (10:1 ratio). Onset typically in adolescence.',
      ageOfOnset: 'Usually begins in early adolescence (10-13 years), can begin in childhood or adulthood',
      courseOfIllness: 'Often chronic with waxing and waning. Can have periods of remission. Early intervention improves outcomes. Can lead to permanent hair loss if severe.',
      riskFactors: JSON.stringify([
        'Female gender',
        'Adolescence onset',
        'Family history of trichotillomania or OCD',
        'Other BFRBs (skin picking, nail biting)',
        'Anxiety or mood disorders',
        'Stress or trauma',
        'Perfectionism',
        'ADHD',
        'Autism spectrum'
      ]),
      protectiveFactors: JSON.stringify([
        'Early treatment',
        'Strong support system',
        'Stress management skills',
        'Awareness of triggers',
        'Healthy coping mechanisms',
        'Self-compassion',
        'Access to specialized treatment',
        'Support groups'
      ]),
      comorbidities: JSON.stringify([
        'Other BFRBs (skin picking 38%)',
        'Anxiety disorders (57%)',
        'Depression (39%)',
        'OCD',
        'Substance use disorders',
        'Eating disorders',
        'ADHD'
      ]),
      naturalSolutions: JSON.stringify([
        'Habit Reversal Training (HRT) - most effective',
        'Identify triggers (stress, boredom, etc.)',
        'Fidget toys or stress balls as substitute',
        'Keep hands busy (knitting, drawing, puzzles)',
        'Wear gloves or bandages during high-risk times',
        'Hair styling to limit access',
        'Stimulus control (remove tweezers, avoid mirrors)',
        'Mindfulness and awareness training',
        'Stress reduction techniques',
        'Exercise for stress relief',
        'Adequate sleep',
        'Support groups (TLC Foundation)',
        'Self-compassion practices',
        'Competing response (clench fists, sit on hands)',
        'Track pulling episodes',
        'Reward pulling-free periods',
        'Therapy (CBT, ACT)',
        'Address underlying anxiety/depression',
        'Limit screen time if trigger',
        'Create pulling-free zones'
      ]),
      nutritionalRecs: JSON.stringify([
        'N-acetylcysteine (NAC) 1200-2400mg/day (evidence for reducing pulling)',
        'Vitamin D (often deficient)',
        'B-complex vitamins',
        'Omega-3 fatty acids',
        'Magnesium for anxiety',
        'Inositol (may help impulse control)',
        'Biotin for hair health',
        'Protein for hair growth',
        'Iron (if deficient)',
        'Zinc',
        'Limit caffeine',
        'Avoid alcohol',
        'Balanced diet',
        'Stay hydrated',
        'Probiotic foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Habit Reversal Training (HRT) - Gold standard',
        'Cognitive Behavioral Therapy (CBT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Dialectical Behavior Therapy (DBT) for emotion regulation',
        'Comprehensive Behavioral (ComB) Model',
        'Medications: SSRIs (limited efficacy)',
        'NAC (N-acetylcysteine) supplement',
        'Clomipramine or other tricyclics',
        'Group therapy',
        'Online interventions (apps)',
        'Mindfulness-based therapies',
        'Family therapy (for children/teens)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Noticeable hair loss or bald patches',
        'Unable to stop despite trying',
        'Pulling interfering with life',
        'Avoidance of social situations',
        'Significant distress or shame',
        'Eating hair (trichophagia)',
        'Gastrointestinal symptoms (from hairballs)',
        'Depression or anxiety worsening',
        'Skin infections from pulling',
        'Ready for behavior change',
        'Need support and strategies',
        'Children pulling hair'
      ]),
      crisisResources: JSON.stringify([
        'TLC Foundation for BFRBs: 831-457-1004, www.bfrb.org',
        'SAMHSA National Helpline: 1-800-662-4357',
        'International OCD Foundation: iocdf.org',
        'Crisis Text Line: Text HELLO to 741741',
        '988 Suicide & Crisis Lifeline (if distressed)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.bfrb.org/ - TLC Foundation',
        'https://pubmed.ncbi.nlm.nih.gov/28301962/ - NAC for trichotillomania',
        'https://pubmed.ncbi.nlm.nih.gov/26114054/ - Habit reversal training',
        'https://iocdf.org/about-trichotillomania/'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent pulling out of one\'s hair, resulting in hair loss',
        'Repeated attempts to decrease or stop hair pulling',
        'Hair pulling causes clinically significant distress or impairment in social, occupational, or other important areas',
        'Not attributable to another medical condition (dermatological)',
        'Not better explained by symptoms of another mental disorder (e.g., body dysmorphic disorder)',
        'May specify: With good insight, Poor insight, or Absent insight/delusional beliefs',
        'Automatic (without awareness) and/or focused (with awareness) pulling',
        'Note: Hair pulling can occur from any region of the body',
        'Must rule out other causes of hair loss',
        'Often worse during relaxation or concentration',
        'Chronic and distressing if left untreated'
      ])
    },
    // SUBSTANCE USE DISORDERS (Additional - 6 disorders)
    {
      slug: 'opioid-use-disorder',
      name: 'Opioid Use Disorder',
      category: 'Substance Use Disorders',
      description: 'A problematic pattern of opioid use (prescription painkillers or heroin) leading to significant impairment or distress, characterized by tolerance, withdrawal, compulsive use, and continued use despite negative consequences.',
      symptoms: JSON.stringify([
        'Taking opioids in larger amounts or longer than intended',
        'Unable to cut down or control opioid use',
        'Spending significant time obtaining, using, or recovering',
        'Intense cravings for opioids',
        'Failing to fulfill work, school, or home obligations',
        'Continuing use despite social or relationship problems',
        'Giving up important activities for opioid use',
        'Using in hazardous situations (driving while impaired)',
        'Continuing despite knowing physical/psychological harm',
        'Tolerance (needing more for same effect)',
        'Withdrawal symptoms (sweating, nausea, pain, anxiety)',
        'Overdose risk',
        'Track marks or injection sites (if injecting)',
        'Constricted (pinpoint) pupils',
        'Drowsiness or nodding off',
        'Slurred speech',
        'Doctor shopping for prescriptions',
        'Stealing medications or money'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (40-60% heritability)',
        'Opioids hijack brain\'s reward system',
        'Changes in dopamine and endorphin systems',
        'Neuroplastic changes with chronic use',
        'Physical dependence develops quickly',
        'Dysregulation of pain and pleasure pathways',
        'Altered mu-opioid receptors'
      ]),
      psychologicalCauses: JSON.stringify([
        'Using opioids to cope with emotional pain',
        'History of trauma or abuse',
        'Co-occurring mental health disorders',
        'Low self-esteem',
        'Impulsivity',
        'Sensation-seeking',
        'Chronic pain leading to dependence',
        'Poor coping skills'
      ]),
      socialCauses: JSON.stringify([
        'Over-prescription of opioid painkillers',
        'Easy availability',
        'Peer influence',
        'Lack of social support',
        'Poverty and unemployment',
        'Chronic stress',
        'Exposure to drug use',
        'Stigma preventing treatment'
      ]),
      prevalence: '2.1 million Americans with OUD in 2020. Leading cause of overdose deaths (70% in 2019). Males slightly higher rates.',
      ageOfOnset: 'Can begin at any age. Often starts with prescription opioids in 20s-30s. Heroin use often begins in late teens-20s.',
      courseOfIllness: 'Progressive if untreated. High overdose risk. Chronic relapsing condition but recovery possible with medication-assisted treatment (MAT).',
      riskFactors: JSON.stringify([
        'Prescription opioid use for pain',
        'Family history of substance use',
        'Personal history of substance use',
        'Mental health disorders',
        'History of trauma',
        'Young age at first use',
        'Male gender (slightly higher)',
        'Unemployment or low income',
        'Easy access to opioids',
        'Chronic pain conditions'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong family bonds',
        'Early intervention',
        'Access to MAT (medication-assisted treatment)',
        'Supportive environment',
        'Employment',
        'Healthy coping skills',
        'Treatment for co-occurring disorders',
        'Harm reduction services'
      ]),
      comorbidities: JSON.stringify([
        'Depression (30-50%)',
        'Anxiety disorders',
        'PTSD (common)',
        'Other substance use disorders',
        'Chronic pain',
        'Hepatitis C (if injecting)',
        'HIV (if injecting)',
        'Infections from injection'
      ]),
      naturalSolutions: JSON.stringify([
        'Medication-assisted treatment (MAT) - buprenorphine, methadone, naltrexone',
        'Medically supervised detox (NEVER stop opioids suddenly)',
        'Cognitive Behavioral Therapy',
        'Contingency management',
        'Peer support groups (NA, SMART Recovery)',
        'Build sober support network',
        'Remove access to opioids',
        'Identify triggers',
        'Develop healthy coping mechanisms',
        'Regular exercise',
        'Mindfulness and meditation',
        'Address underlying mental health issues',
        'Structured daily routine',
        'Vocational training or employment support',
        'Family therapy',
        'Carry naloxone (Narcan) for overdose reversal',
        'Harm reduction strategies',
        'Long-term residential treatment (if needed)',
        'Celebrate recovery milestones',
        'Plan for relapse prevention'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet (opioid use depletes nutrition)',
        'B-complex vitamins',
        'Vitamin C for immune support',
        'Magnesium for withdrawal symptoms',
        'Zinc for immune function',
        'Protein for healing',
        'Complex carbohydrates',
        'Stay well-hydrated',
        'Omega-3 fatty acids for brain health',
        'Calcium and vitamin D',
        'Probiotics for gut health',
        'Avoid caffeine excess during withdrawal',
        'Regular meal schedule',
        'L-tyrosine (for dopamine)',
        'Multivitamin supplement'
      ]),
      therapyApproaches: JSON.stringify([
        'Medication-Assisted Treatment (MAT) - CRITICAL: buprenorphine, methadone, or naltrexone',
        'Medically supervised detox',
        'Cognitive Behavioral Therapy (CBT)',
        'Contingency Management',
        'Motivational Interviewing',
        'Residential treatment programs',
        'Intensive outpatient programs',
        'Naloxone (Narcan) access for overdose',
        'Peer support (NA, SMART Recovery)',
        'Family therapy',
        'Group therapy',
        'Relapse prevention training',
        'Treatment for co-occurring disorders'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to stop using opioids',
        'Experiencing tolerance or withdrawal',
        'Overdose risk',
        'Using despite wanting to quit',
        'Health problems from use',
        'Relationship or work damage',
        'Using in dangerous situations',
        'Injecting drugs',
        'Legal problems',
        'Financial problems',
        'Mixing opioids with other substances',
        'Ready for recovery'
      ]),
      crisisResources: JSON.stringify([
        'SAMHSA National Helpline: 1-800-662-4357 (24/7, free, confidential)',
        'Overdose: Call 911 immediately, administer naloxone if available',
        'Narcotics Anonymous: na.org',
        'SMART Recovery: smartrecovery.org',
        'Substance Abuse Treatment Locator: findtreatment.gov',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.drugabuse.gov/drug-topics/opioids',
        'https://www.samhsa.gov/medication-assisted-treatment',
        'https://pubmed.ncbi.nlm.nih.gov/32678465/ - MAT for OUD',
        'https://www.cdc.gov/opioids/'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of opioid use leading to impairment or distress',
        'Occurring within 12-month period with 2+ of the following:',
        '  - Opioids taken in larger amounts or longer than intended',
        '  - Persistent desire or unsuccessful efforts to cut down',
        '  - Great deal of time spent obtaining, using, or recovering',
        '  - Craving or strong desire to use',
        '  - Recurrent use resulting in failure to fulfill obligations',
        '  - Continued use despite social/interpersonal problems',
        '  - Important activities given up or reduced',
        '  - Recurrent use in hazardous situations',
        '  - Continued use despite physical/psychological problems',
        '  - Tolerance',
        '  - Withdrawal',
        'Specify severity: Mild (2-3 criteria), Moderate (4-5), Severe (6+)',
        'Note: Tolerance and withdrawal normal with prescribed use; context matters'
      ])
    },
    {
      slug: 'cannabis-use-disorder',
      name: 'Cannabis Use Disorder',
      category: 'Substance Use Disorders',
      description: 'A problematic pattern of cannabis (marijuana) use leading to significant impairment or distress, characterized by tolerance, withdrawal, inability to reduce use, and continued use despite negative consequences.',
      symptoms: JSON.stringify([
        'Using cannabis more or longer than intended',
        'Unable to cut down or quit despite wanting to',
        'Spending significant time using or recovering',
        'Cravings or strong urges to use cannabis',
        'Failing to meet work, school, or home responsibilities',
        'Continuing use despite relationship or social problems',
        'Giving up activities for cannabis use',
        'Using in hazardous situations (driving while high)',
        'Continuing despite physical or psychological harm',
        'Tolerance (needing more for same effect)',
        'Withdrawal symptoms (irritability, anxiety, insomnia, decreased appetite)',
        'Bloodshot eyes',
        'Impaired memory and concentration',
        'Reduced motivation',
        'Respiratory problems (if smoking)',
        'Anxiety or paranoia (especially with high-THC products)',
        'Financial problems from purchasing',
        'Social withdrawal or change in friend groups'
      ]),
      biologicalCauses: JSON.stringify([
        'THC affects brain\'s endocannabinoid system',
        'Changes in dopamine reward pathways',
        'Genetic factors (30-80% heritability)',
        'Adolescent brain especially vulnerable',
        'Neuroplastic changes with heavy use',
        'CB1 receptor downregulation',
        'Prefrontal cortex development affected (in adolescents)'
      ]),
      psychologicalCauses: JSON.stringify([
        'Using cannabis to cope with stress or emotions',
        'Self-medication for anxiety or depression',
        'Boredom or lack of motivation',
        'Low self-esteem',
        'Impulsivity',
        'Sensation-seeking',
        'Belief that cannabis is harmless',
        'Poor coping skills'
      ]),
      socialCauses: JSON.stringify([
        'Increasing legalization and availability',
        'Social acceptance and normalization',
        'Peer influence',
        'Marketing and commercialization',
        'High-potency products (concentrates, edibles)',
        'Lack of awareness of risks',
        'Unemployment or lack of structure',
        'Social isolation'
      ]),
      prevalence: '16.3 million Americans with cannabis use disorder (2020). About 9% of users develop CUD. 30% of current users may have CUD.',
      ageOfOnset: 'Most often begins in adolescence or young adulthood. Earlier use = higher addiction risk.',
      courseOfIllness: 'Can be chronic with multiple quit attempts. Earlier onset and heavier use associated with worse outcomes. Recovery possible with treatment.',
      riskFactors: JSON.stringify([
        'Early age of first use (before 18)',
        'Frequent use (daily or near-daily)',
        'High-potency THC products',
        'Family history of substance use',
        'Mental health disorders',
        'Male gender (slightly higher rates)',
        'Peer use',
        'Easy access',
        'Lack of parental monitoring (adolescents)'
      ]),
      protectiveFactors: JSON.stringify([
        'Later age of first use',
        'Strong family bonds',
        'Academic success',
        'Healthy coping skills',
        'Treatment for co-occurring disorders',
        'Supportive environment',
        'Structured activities',
        'Knowledge of risks'
      ]),
      comorbidities: JSON.stringify([
        'Other substance use disorders (40%)',
        'Anxiety disorders',
        'Depression',
        'ADHD',
        'Bipolar disorder',
        'Schizophrenia (cannabis may trigger in vulnerable)',
        'Conduct disorder (adolescents)'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy',
        'Motivational Enhancement Therapy',
        'Contingency Management',
        'Support groups (MA - Marijuana Anonymous)',
        'Identify triggers and high-risk situations',
        'Develop healthy coping mechanisms',
        'Exercise regularly',
        'Mindfulness and meditation',
        'Address underlying mental health issues',
        'Create structured daily routine',
        'Avoid people/places associated with use',
        'Find alternative activities and hobbies',
        'Improve sleep hygiene',
        'Social support network',
        'Journaling',
        'Delay or distract when craving',
        'Celebrate milestones',
        'Vocational or educational goals',
        'Family involvement',
        'Relapse prevention planning'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet (cannabis use can affect appetite)',
        'Stay hydrated',
        'Omega-3 fatty acids for brain health',
        'B-complex vitamins',
        'Magnesium for relaxation',
        'Protein for neurotransmitter production',
        'Complex carbohydrates',
        'Limit caffeine',
        'Avoid alcohol',
        'Antioxidant-rich foods',
        'Vitamin D',
        'Probiotics for gut health',
        'Zinc',
        'Regular meal schedule',
        'Limit processed foods and sugar'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - most effective',
        'Motivational Enhancement Therapy (MET)',
        'Contingency Management',
        'Family-Based Therapy (for adolescents)',
        'Group therapy',
        'Adolescent Community Reinforcement Approach (A-CRA)',
        'Mindfulness-Based Relapse Prevention',
        'No FDA-approved medications for CUD (yet)',
        'Treatment for co-occurring disorders',
        'Peer support groups (Marijuana Anonymous)',
        'Brief interventions',
        'Residential treatment (if severe)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to stop despite wanting to',
        'Daily or near-daily use',
        'Using first thing in morning',
        'Life problems from cannabis use',
        'Relationship or work issues',
        'Using while driving or at work',
        'Financial problems',
        'Mental health worsening',
        'Tolerance developed',
        'Withdrawal symptoms when not using',
        'Failed quit attempts',
        'Adolescent use (especially important)'
      ]),
      crisisResources: JSON.stringify([
        'SAMHSA National Helpline: 1-800-662-4357',
        'Marijuana Anonymous: marijuana-anonymous.org',
        'SMART Recovery: smartrecovery.org',
        'Substance Abuse Treatment Locator: findtreatment.gov',
        '988 Suicide & Crisis Lifeline (if mental health crisis)',
        'Crisis Text Line: Text HELLO to 741741'
      ]),
      researchLinks: JSON.stringify([
        'https://www.drugabuse.gov/drug-topics/cannabis-marijuana',
        'https://pubmed.ncbi.nlm.nih.gov/31880853/ - Treatment for CUD',
        'https://www.cdc.gov/marijuana/health-effects/',
        'https://www.samhsa.gov/marijuana'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of cannabis use leading to impairment or distress',
        'Occurring within 12-month period with 2+ of the following:',
        '  - Cannabis taken in larger amounts or longer than intended',
        '  - Persistent desire or unsuccessful efforts to cut down',
        '  - Great deal of time spent obtaining, using, or recovering',
        '  - Craving or strong desire to use',
        '  - Recurrent use resulting in failure to fulfill obligations',
        '  - Continued use despite social/interpersonal problems',
        '  - Important activities given up or reduced',
        '  - Recurrent use in hazardous situations',
        '  - Continued use despite knowledge of problems',
        '  - Tolerance',
        '  - Withdrawal (irritability, anxiety, sleep difficulty, appetite change, restlessness, depressed mood)',
        'Specify severity: Mild (2-3 criteria), Moderate (4-5), Severe (6+)',
        'Cannabis withdrawal officially recognized in DSM-5'
      ])
    },
    {
      slug: 'stimulant-use-disorder',
      name: 'Stimulant Use Disorder',
      category: 'Substance Use Disorders',
      description: 'A problematic pattern of amphetamine-type, cocaine, or other stimulant use leading to significant impairment or distress, characterized by tolerance, withdrawal, compulsive use, and continued use despite negative consequences.',
      symptoms: JSON.stringify([
        'Using more stimulants or for longer than intended',
        'Unable to cut down or control use',
        'Spending significant time obtaining, using, or recovering',
        'Intense cravings for stimulants',
        'Failing to fulfill work, school, or home obligations',
        'Continuing use despite social or relationship problems',
        'Giving up important activities for stimulant use',
        'Using in hazardous situations',
        'Continuing despite physical or psychological harm',
        'Tolerance (needing more for same effect)',
        'Withdrawal symptoms (fatigue, depression, increased appetite, sleep disturbances)',
        'Hyperactivity and increased energy followed by crashes',
        'Rapid speech and pressured talking',
        'Paranoia or psychotic symptoms (with heavy use)',
        'Weight loss and malnutrition',
        'Cardiovascular problems (rapid heart rate, high blood pressure)',
        'Risky sexual behavior',
        'Financial problems',
        'Aggressive or violent behavior',
        'Dental problems ("meth mouth" with methamphetamine)'
      ]),
      biologicalCauses: JSON.stringify([
        'Massive dopamine release in reward pathways',
        'Genetic predisposition (40-60% heritability)',
        'Neuroplastic changes with chronic use',
        'Depletion of dopamine and other neurotransmitters',
        'Damage to dopamine receptors',
        'Cardiovascular and neurological damage',
        'Disruption of prefrontal cortex functioning'
      ]),
      psychologicalCauses: JSON.stringify([
        'Using stimulants for enhanced performance or energy',
        'Self-medication for ADHD symptoms',
        'Depression or low energy',
        'Impulsivity and sensation-seeking',
        'Low self-esteem',
        'Trauma history',
        'Belief that stimulants enhance productivity or creativity'
      ]),
      socialCauses: JSON.stringify([
        'Peer pressure and social use',
        'Work or academic performance pressure',
        'Availability and accessibility',
        'Party and club culture',
        'Lack of social support',
        'Economic factors',
        'Occupational demands (long hours, shift work)',
        'Media portrayal of stimulant use'
      ]),
      prevalence: '0.2% of U.S. adults have stimulant use disorder (SAMHSA 2019). Higher in certain populations (students, shift workers).',
      ageOfOnset: 'Often begins in late teens to mid-20s. Cocaine use peaks in 20s-30s, methamphetamine varies.',
      courseOfIllness: 'Progressive if untreated. High relapse rates. Can lead to severe health complications. Recovery possible with comprehensive treatment.',
      riskFactors: JSON.stringify([
        'Young age of first use',
        'Family history of substance use',
        'ADHD or other mental health disorders',
        'History of trauma or abuse',
        'Peer use',
        'Easy access to stimulants',
        'High-stress environment',
        'Male gender (slightly higher rates)',
        'Prescription stimulant misuse'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong family bonds',
        'Treatment for co-occurring disorders',
        'Healthy coping skills',
        'Supportive environment',
        'Employment or education',
        'Early intervention',
        'Access to comprehensive treatment',
        'Community support'
      ]),
      comorbidities: JSON.stringify([
        'Depression (very common)',
        'Anxiety disorders',
        'ADHD',
        'Bipolar disorder',
        'Other substance use disorders',
        'Personality disorders',
        'Psychotic symptoms (with heavy use)',
        'Cardiovascular disease'
      ]),
      naturalSolutions: JSON.stringify([
        'Comprehensive addiction treatment program',
        'Cognitive Behavioral Therapy',
        'Contingency Management (rewards for abstinence)',
        'Support groups (CA - Cocaine Anonymous, CMA - Crystal Meth Anonymous)',
        'Address underlying mental health issues (ADHD, depression)',
        'Build sober support network',
        'Identify and avoid triggers',
        'Develop healthy coping mechanisms',
        'Regular exercise (helps with dopamine regulation)',
        'Adequate sleep and sleep hygiene',
        'Structured daily routine',
        'Mindfulness and stress management',
        'Vocational or educational support',
        'Family therapy',
        'Address co-occurring disorders',
        'Nutritional rehabilitation',
        'Avoid high-risk situations',
        'Relapse prevention planning',
        'Residential treatment (if severe)',
        'Long-term aftercare and monitoring'
      ]),
      nutritionalRecs: JSON.stringify([
        'Replenish depleted nutrients (B vitamins, vitamin C)',
        'Adequate protein for neurotransmitter production',
        'Complex carbohydrates for energy',
        'L-tyrosine (dopamine precursor - under supervision)',
        'Omega-3 fatty acids for brain health',
        'Magnesium for nervous system',
        'Zinc for immune function',
        'Antioxidant-rich foods',
        'Stay well-hydrated',
        'Regular, balanced meals',
        '5-HTP (for serotonin - under supervision)',
        'Avoid caffeine excess',
        'Vitamin D',
        'Probiotics for gut health',
        'Multivitamin supplement'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - most effective',
        'Contingency Management (CM)',
        'Matrix Model (comprehensive approach)',
        'Motivational Interviewing',
        'Community Reinforcement Approach',
        'Group therapy',
        'Family therapy',
        'Treatment for co-occurring disorders (ADHD, depression, anxiety)',
        'Currently no FDA-approved medications for stimulant use disorder',
        'Medications for withdrawal symptoms (sleep aids, antidepressants)',
        'Residential treatment programs',
        'Intensive outpatient programs',
        'Relapse prevention training'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to stop using stimulants',
        'Experiencing tolerance or withdrawal',
        'Cardiovascular symptoms (chest pain, irregular heartbeat)',
        'Psychotic symptoms or paranoia',
        'Severe weight loss',
        'Relationship or work problems',
        'Financial crisis from drug use',
        'Risky or dangerous behavior',
        'Legal problems',
        'Using despite wanting to quit',
        'Failed quit attempts',
        'Health problems from use'
      ]),
      crisisResources: JSON.stringify([
        'SAMHSA National Helpline: 1-800-662-4357 (24/7, free, confidential)',
        'Cocaine Anonymous: ca.org',
        'Crystal Meth Anonymous: crystalmeth.org',
        'SMART Recovery: smartrecovery.org',
        'Substance Abuse Treatment Locator: findtreatment.gov',
        'Emergency: 911 (especially for cardiovascular symptoms)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.drugabuse.gov/drug-topics/cocaine',
        'https://www.drugabuse.gov/drug-topics/methamphetamine',
        'https://pubmed.ncbi.nlm.nih.gov/29783134/ - Treatment for stimulant use disorder',
        'https://www.samhsa.gov/medication-assisted-treatment'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of amphetamine-type, cocaine, or other stimulant use leading to impairment or distress',
        'Occurring within 12-month period with 2+ of the following:',
        '  - Stimulants taken in larger amounts or longer than intended',
        '  - Persistent desire or unsuccessful efforts to cut down',
        '  - Great deal of time spent obtaining, using, or recovering',
        '  - Craving or strong desire to use',
        '  - Recurrent use resulting in failure to fulfill obligations',
        '  - Continued use despite social/interpersonal problems',
        '  - Important activities given up or reduced',
        '  - Recurrent use in hazardous situations',
        '  - Continued use despite knowledge of problems',
        '  - Tolerance',
        '  - Withdrawal (dysphoric mood, fatigue, vivid dreams, insomnia/hypersomnia, increased appetite, psychomotor retardation/agitation)',
        'Specify severity: Mild (2-3 criteria), Moderate (4-5), Severe (6+)',
        'Specify substance: Amphetamine-type, Cocaine, or Other/Unspecified'
      ])
    },
    {
      slug: 'tobacco-use-disorder',
      name: 'Tobacco Use Disorder',
      category: 'Substance Use Disorders',
      description: 'A problematic pattern of tobacco use leading to significant impairment or distress, characterized by nicotine dependence, tolerance, withdrawal, and difficulty quitting despite knowledge of health risks.',
      symptoms: JSON.stringify([
        'Smoking or using tobacco more than intended',
        'Unable to quit despite repeated attempts',
        'Spending significant time using tobacco',
        'Strong cravings for nicotine',
        'Continuing despite health problems',
        'Using tobacco in hazardous situations',
        'Tolerance (needing more for same effect)',
        'Withdrawal symptoms (irritability, anxiety, difficulty concentrating, increased appetite)',
        'Smoking first thing in morning',
        'Unable to go long periods without tobacco',
        'Smoking even when ill',
        'Continuing despite social disapproval',
        'Planning activities around smoking',
        'Feeling anxious about running out',
        'Unsuccessful quit attempts'
      ]),
      biologicalCauses: JSON.stringify([
        'Nicotine addiction (highly addictive substance)',
        'Nicotine affects dopamine reward pathways',
        'Genetic factors (50% heritability)',
        'Rapid nicotine absorption and brain effects',
        'Physical dependence develops quickly',
        'Nicotinic acetylcholine receptors upregulation',
        'Metabolic factors affecting nicotine processing'
      ]),
      psychologicalCauses: JSON.stringify([
        'Using tobacco to cope with stress',
        'Habit and routine associations',
        'Self-medication for negative emotions',
        'Low self-efficacy for quitting',
        'Belief that smoking helps concentration',
        'Social learning and modeling',
        'Impulsivity'
      ]),
      socialCauses: JSON.stringify([
        'Peer influence and social smoking',
        'Marketing and advertising (historical)',
        'Easy availability',
        'Stress and work environment',
        'Low socioeconomic status',
        'Cultural acceptance in some groups',
        'Early exposure and experimentation',
        'Lack of smoke-free policies'
      ]),
      prevalence: '14% of U.S. adults smoke cigarettes (CDC 2019). Leading cause of preventable death (480,000 deaths/year in U.S.).',
      ageOfOnset: 'Most start in adolescence or young adulthood. 90% of adult smokers started before age 18.',
      courseOfIllness: 'Chronic, relapsing condition. Average smoker tries to quit 8-10 times before success. Causes multiple health problems. Quitting possible at any age with significant health benefits.',
      riskFactors: JSON.stringify([
        'Starting smoking in adolescence',
        'Peer and family smoking',
        'Low socioeconomic status',
        'Mental health disorders (depression, anxiety, ADHD)',
        'Alcohol or other substance use',
        'Low education level',
        'Stress',
        'Male gender (historically higher, now converging)',
        'Certain occupations'
      ]),
      protectiveFactors: JSON.stringify([
        'Never starting (most important)',
        'Smoke-free environment',
        'Strong anti-smoking social norms',
        'Access to cessation support',
        'Higher education and income',
        'Treatment for mental health issues',
        'Smoke-free policies',
        'Support from family and friends'
      ]),
      comorbidities: JSON.stringify([
        'Depression (2-3x higher in smokers)',
        'Anxiety disorders',
        'ADHD',
        'Alcohol use disorder',
        'Other substance use disorders',
        'Schizophrenia (very high smoking rates)',
        'Chronic obstructive pulmonary disease (COPD)',
        'Cardiovascular disease',
        'Cancer (lung, throat, many others)'
      ]),
      naturalSolutions: JSON.stringify([
        'Quit date planning and preparation',
        'Nicotine replacement therapy (NRT - patch, gum, lozenge)',
        'Identify and avoid triggers',
        'Behavioral strategies (4 Ds: Delay, Deep breathe, Drink water, Do something else)',
        'Support groups or quitlines (1-800-QUIT-NOW)',
        'Counseling and behavioral therapy',
        'Smartphone apps for quit support',
        'Exercise (reduces cravings)',
        'Mindfulness and stress management',
        'Remove tobacco from environment',
        'Tell people about quit plan',
        'Address underlying stress or mental health',
        'Celebrate milestones',
        'Be prepared for withdrawal',
        'Avoid alcohol (common trigger)',
        'Change routines associated with smoking',
        'Use oral substitutes (carrots, gum, toothpicks)',
        'Practice refusal skills',
        'Save money from not smoking',
        'Track benefits of quitting'
      ]),
      nutritionalRecs: JSON.stringify([
        'Stay well-hydrated (helps flush nicotine)',
        'Fruits and vegetables (make cigarettes taste worse)',
        'Avoid caffeine excess (increases jitteriness during quitting)',
        'Limit alcohol (common smoking trigger)',
        'Vitamin C (depleted by smoking)',
        'Antioxidant-rich foods',
        'B-complex vitamins',
        'Omega-3 fatty acids',
        'Magnesium for relaxation',
        'Healthy snacks to manage oral fixation',
        'Regular meals (avoid blood sugar crashes)',
        'Limit sugar (may increase cravings)',
        'Zinc',
        'Vitamin D',
        'Probiotics'
      ]),
      therapyApproaches: JSON.stringify([
        'Nicotine Replacement Therapy (NRT): patch, gum, lozenge, nasal spray, inhaler',
        'Medications: Varenicline (Chantix) - most effective',
        'Medications: Bupropion (Zyban/Wellbutrin)',
        'Cognitive Behavioral Therapy (CBT)',
        'Motivational Interviewing',
        'Quitline counseling (1-800-QUIT-NOW)',
        'Group therapy',
        'Combination therapy (NRT + medication + counseling) - most effective',
        'Brief interventions from healthcare providers',
        'Digital and smartphone-based interventions',
        'Mindfulness-based approaches',
        'Contingency management'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Ready to quit smoking',
        'Previous failed quit attempts',
        'Health problems from smoking',
        'Pregnancy or planning pregnancy',
        'Smoking heavily (1+ pack/day)',
        'Strong nicotine dependence',
        'Co-occurring mental health issues',
        'Need medication support',
        'Want professional guidance',
        'Family history of smoking-related illness',
        'Concerned about secondhand smoke effects on others',
        'Any time - quitting is beneficial at any age'
      ]),
      crisisResources: JSON.stringify([
        'National Quitline: 1-800-QUIT-NOW (1-800-784-8669)',
        'Smokefree.gov: Free resources and support',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Text QUIT to 47848 for tips',
        'Freedom From Smoking: lung.org',
        'Healthcare provider for cessation medications'
      ]),
      researchLinks: JSON.stringify([
        'https://www.cdc.gov/tobacco/',
        'https://smokefree.gov/',
        'https://pubmed.ncbi.nlm.nih.gov/30158207/ - Tobacco cessation interventions',
        'https://www.lung.org/quit-smoking'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of tobacco use leading to impairment or distress',
        'Occurring within 12-month period with 2+ of the following:',
        '  - Tobacco used in larger amounts or longer than intended',
        '  - Persistent desire or unsuccessful efforts to cut down',
        '  - Great deal of time spent using tobacco',
        '  - Craving or strong desire to use',
        '  - Recurrent use resulting in failure to fulfill obligations',
        '  - Continued use despite social/interpersonal problems',
        '  - Important activities given up or reduced',
        '  - Recurrent use in hazardous situations',
        '  - Continued use despite knowledge of physical/psychological problems',
        '  - Tolerance',
        '  - Withdrawal (irritability, frustration, anger, anxiety, difficulty concentrating, increased appetite, restlessness, depressed mood, insomnia)',
        'Specify severity: Mild (2-3 criteria), Moderate (4-5), Severe (6+)',
        'Note: Most regular daily smokers meet criteria for moderate to severe tobacco use disorder'
      ])
    },
    {
      slug: 'borderline-personality-disorder',
      name: 'Borderline Personality Disorder (BPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of instability in interpersonal relationships, self-image, and emotions, with marked impulsivity, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Frantic efforts to avoid real or imagined abandonment',
        'Pattern of unstable and intense relationships',
        'Unstable self-image or sense of self',
        'Impulsivity in at least two areas (spending, sex, substance use, reckless driving, binge eating)',
        'Recurrent suicidal behavior, gestures, or self-harm',
        'Emotional instability (intense episodes lasting hours)',
        'Chronic feelings of emptiness',
        'Inappropriate, intense anger or difficulty controlling anger',
        'Transient stress-related paranoid ideation or severe dissociation',
        'Splitting (seeing things as all good or all bad)',
        'Fear of being alone',
        'Intense mood swings',
        'Unstable goals and values',
        'Difficulty trusting others',
        'Self-destructive behaviors'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (40-50% heritability)',
        'Amygdala overactivity (emotion processing)',
        'Reduced hippocampus and prefrontal cortex volume',
        'Serotonin dysfunction',
        'HPA axis dysregulation',
        'Brain differences in emotion regulation circuits',
        'Neurotransmitter imbalances'
      ]),
      psychologicalCauses: JSON.stringify([
        'Childhood trauma or abuse (very common)',
        'Invalidating environment in childhood',
        'Emotional neglect',
        'Insecure attachment',
        'Identity disturbance',
        'Difficulty regulating emotions',
        'Cognitive distortions (black and white thinking)',
        'Low distress tolerance'
      ]),
      socialCauses: JSON.stringify([
        'Childhood adversity',
        'Unstable family environment',
        'Separation from caregivers',
        'Invalidation of emotional experiences',
        'Physical, sexual, or emotional abuse',
        'Witnessing violence',
        'Chaotic home environment',
        'Lack of secure attachments'
      ]),
      prevalence: '1.4% of U.S. adults. Equally common in males and females (females more often diagnosed). 75% attempt suicide at least once.',
      ageOfOnset: 'Symptoms emerge in adolescence or early adulthood',
      courseOfIllness: 'Often improves with age (40s-50s). Effective treatment can significantly improve symptoms. High remission rates with proper treatment (85% within 10 years with treatment).',
      riskFactors: JSON.stringify([
        'Childhood trauma or abuse',
        'Family history of BPD or other mental health disorders',
        'Invalidating childhood environment',
        'Early separation from caregivers',
        'Female gender (for clinical diagnosis)',
        'Other mental health disorders',
        'Temperamental factors (emotional sensitivity)',
        'Neurobiological vulnerabilities',
        'Chronic stress'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Specialized therapy (DBT)',
        'Strong therapeutic relationship',
        'Supportive relationships',
        'Emotional regulation skills',
        'Distress tolerance skills',
        'Mindfulness practice',
        'Stable living environment'
      ]),
      comorbidities: JSON.stringify([
        'Depression (over 50%)',
        'Anxiety disorders',
        'PTSD (30-60%)',
        'Eating disorders',
        'Substance use disorders (50-70%)',
        'Bipolar disorder (differential diagnosis)',
        'Other personality disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Dialectical Behavior Therapy (DBT) - most effective, gold standard',
        'Mindfulness and distress tolerance skills',
        'Emotion regulation strategies',
        'Interpersonal effectiveness skills',
        'Self-soothing techniques',
        'Crisis survival skills',
        'Radical acceptance',
        'Building healthy relationships',
        'Journaling emotions',
        'Exercise for emotion regulation',
        'Sleep hygiene',
        'Avoid substances',
        'Create safety plan',
        'Support groups',
        'Self-compassion practices',
        'Routine and structure',
        'Healthy boundaries',
        'Art or music therapy',
        'Pet companionship',
        'Avoid triggering situations'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (may reduce aggression and impulsivity)',
        'B-complex vitamins for mood',
        'Magnesium for emotional regulation',
        'Vitamin D (often deficient)',
        'Stable blood sugar (regular meals)',
        'Limit caffeine (can increase anxiety)',
        'Avoid alcohol (worsens symptoms)',
        'Adequate protein',
        'Complex carbohydrates',
        'Stay hydrated',
        'Mediterranean diet pattern',
        'Probiotic foods',
        'Antioxidant-rich foods',
        'Limit processed foods',
        'Regular meal schedule'
      ]),
      therapyApproaches: JSON.stringify([
        'Dialectical Behavior Therapy (DBT) - First-line treatment',
        'Mentalization-Based Therapy (MBT)',
        'Schema-Focused Therapy',
        'Transference-Focused Psychotherapy (TFP)',
        'General Psychiatric Management (GPM)',
        'Cognitive Behavioral Therapy (CBT)',
        'Group therapy (DBT skills groups)',
        'Medications: No specific BPD medication, but may treat symptoms',
        '  - SSRIs for mood/anxiety',
        '  - Mood stabilizers for impulsivity',
        '  - Atypical antipsychotics for severe symptoms',
        'Crisis intervention when needed',
        'Family therapy',
        'Long-term psychotherapy (several years often needed)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Self-harm or suicidal thoughts',
        'Intense emotional crises',
        'Relationship patterns causing distress',
        'Impulsive behaviors causing problems',
        'Chronic emptiness or identity confusion',
        'Unable to function in daily life',
        'Substance use to cope',
        'Intense anger or rage',
        'Ready for change',
        'Previous therapy not helping',
        'Need for specialized treatment (DBT)',
        'Risk of harm to self or others'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Education Alliance for BPD: borderlinepersonalitydisorder.org',
        'DBT Self-Help: dbtselfhelp.com',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/borderline-personality-disorder',
        'https://www.borderlinepersonalitydisorder.org/',
        'https://pubmed.ncbi.nlm.nih.gov/16884123/ - DBT for BPD',
        'https://behavioraltech.org/resources/faqs/dialectical-behavior-therapy-dbt/'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of instability of interpersonal relationships, self-image, and affects, and marked impulsivity',
        'Beginning by early adulthood and present in various contexts',
        'Five (or more) of the following:',
        '1. Frantic efforts to avoid real or imagined abandonment',
        '2. Pattern of unstable and intense interpersonal relationships (idealization/devaluation)',
        '3. Identity disturbance: markedly unstable self-image',
        '4. Impulsivity in at least two potentially self-damaging areas',
        '5. Recurrent suicidal behavior, gestures, threats, or self-mutilating behavior',
        '6. Affective instability due to marked reactivity of mood',
        '7. Chronic feelings of emptiness',
        '8. Inappropriate, intense anger or difficulty controlling anger',
        '9. Transient, stress-related paranoid ideation or severe dissociative symptoms',
        'Not better explained by another mental disorder',
        'Symptoms cause significant distress or impairment'
      ])
    },
    {
      slug: 'narcissistic-personality-disorder',
      name: 'Narcissistic Personality Disorder (NPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of grandiosity, need for admiration, and lack of empathy, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Grandiose sense of self-importance',
        'Preoccupied with fantasies of unlimited success, power, brilliance, beauty',
        'Believes they are special and unique',
        'Requires excessive admiration',
        'Sense of entitlement',
        'Interpersonally exploitative',
        'Lacks empathy',
        'Often envious of others or believes others are envious of them',
        'Arrogant, haughty behaviors or attitudes',
        'Difficulty handling criticism',
        'Fragile self-esteem (despite grandiosity)',
        'Takes advantage of others',
        'Preoccupied with appearance and status',
        'Difficulty maintaining relationships',
        'Blames others for failures'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (moderate heritability)',
        'Brain differences in empathy and emotional processing regions',
        'Reduced gray matter in prefrontal cortex',
        'Abnormalities in insular cortex',
        'Temperamental factors (high reactivity)',
        'Neurobiological vulnerability'
      ]),
      psychologicalCauses: JSON.stringify([
        'Excessive parental pampering or overvaluation',
        'Excessive criticism or neglect (paradoxically)',
        'Unpredictable or inconsistent parenting',
        'Defense against low self-esteem',
        'Learned behaviors (modeling narcissistic parents)',
        'Inability to develop healthy self-esteem',
        'Trauma or adversity',
        'Cultural emphasis on individualism and success'
      ]),
      socialCauses: JSON.stringify([
        'Cultural values emphasizing achievement and status',
        'Social media and self-promotion culture',
        'Overemphasis on appearance and success',
        'Competitive environments',
        'Fame or celebrity status reinforcement',
        'Lack of consequences for entitled behavior',
        'Parenting styles (permissive or authoritarian extremes)'
      ]),
      prevalence: '0-6.2% of general population (varies by study). More common in males. Higher in clinical populations seeking treatment.',
      ageOfOnset: 'Pattern emerges in late adolescence or early adulthood',
      courseOfIllness: 'Chronic and pervasive. May moderate with age. Often individuals don\'t seek treatment unless experiencing consequences or depression. Change is possible but requires significant self-awareness.',
      riskFactors: JSON.stringify([
        'Temperament (high sensitivity to criticism)',
        'Overindulgent parenting',
        'Excessive criticism or abuse',
        'Cultural or societal factors',
        'Male gender',
        'Family history of personality disorders',
        'Early childhood trauma',
        'Genetics',
        'Modeling of narcissistic behavior'
      ]),
      protectiveFactors: JSON.stringify([
        'Healthy, balanced parenting',
        'Development of genuine empathy',
        'Realistic self-appraisal',
        'Healthy self-esteem not based on external validation',
        'Strong prosocial values',
        'Accountability and consequences',
        'Emotional intelligence',
        'Supportive relationships'
      ]),
      comorbidities: JSON.stringify([
        'Other personality disorders (borderline, antisocial, histrionic)',
        'Depression (when facing failures or aging)',
        'Anxiety disorders',
        'Substance use disorders',
        'Eating disorders (especially in females)',
        'Bipolar disorder (differential diagnosis)',
        'Somatic symptom disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Psychotherapy (requires genuine motivation for change)',
        'Develop empathy through practice',
        'Mindfulness to increase self-awareness',
        'Challenge grandiose thoughts',
        'Learn to tolerate criticism',
        'Build genuine relationships',
        'Volunteer or help others',
        'Therapy focused on emotion regulation',
        'Address underlying insecurity',
        'Accept limitations and imperfections',
        'Practice gratitude',
        'Reduce social media overuse',
        'Develop intrinsic motivation',
        'Learn accountability',
        'Process childhood experiences',
        'Group therapy (with caution)',
        'Journaling for self-reflection',
        'Learn healthy coping mechanisms',
        'Build distress tolerance',
        'Family therapy (if appropriate)'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, healthy diet',
        'Omega-3 fatty acids for brain health',
        'B-complex vitamins',
        'Magnesium for stress',
        'Vitamin D',
        'Limit caffeine and stimulants',
        'Avoid alcohol excess',
        'Adequate protein',
        'Complex carbohydrates',
        'Stay hydrated',
        'Antioxidant-rich foods',
        'Probiotic foods',
        'Regular meal schedule',
        'Limit processed foods',
        'Mediterranean diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Psychodynamic therapy',
        'Schema-Focused Therapy',
        'Transference-Focused Psychotherapy',
        'Mentalization-Based Therapy',
        'Cognitive Behavioral Therapy (CBT)',
        'Group therapy (with skilled facilitator)',
        'No FDA-approved medications for NPD',
        'Medications for comorbid conditions (depression, anxiety)',
        'Long-term therapy often needed',
        'Empathy training',
        'Emotion-focused therapy',
        'Family therapy (if appropriate)',
        'Note: Treatment challenging due to lack of insight and resistance'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Relationship problems and isolation',
        'Work or career difficulties',
        'Depression or suicidal thoughts',
        'Substance use problems',
        'Legal or ethical violations',
        'Recognition of pattern causing problems',
        'Emptiness despite achievements',
        'Difficulty coping with aging or failure',
        'Family members concerned',
        'Court-mandated treatment',
        'Ready to examine behavior honestly',
        'Consequences mounting'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Crisis Text Line: Text HELLO to 741741',
        'Mental health professionals specializing in personality disorders',
        'Psychology Today therapist finder: psychologytoday.com',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/30153906/ - Treatment of NPD',
        'https://www.mayoclinic.org/diseases-conditions/narcissistic-personality-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of grandiosity, need for admiration, and lack of empathy',
        'Beginning by early adulthood and present in various contexts',
        'Five (or more) of the following:',
        '1. Grandiose sense of self-importance',
        '2. Preoccupied with fantasies of unlimited success, power, brilliance, beauty, or ideal love',
        '3. Believes they are "special" and unique and can only be understood by other special people',
        '4. Requires excessive admiration',
        '5. Has sense of entitlement',
        '6. Is interpersonally exploitative',
        '7. Lacks empathy: unwilling to recognize or identify with feelings/needs of others',
        '8. Often envious of others or believes others envious of them',
        '9. Shows arrogant, haughty behaviors or attitudes',
        'Not better explained by another mental disorder',
        'Causes significant distress or impairment'
      ])
    },
    {
      slug: 'schizophrenia',
      name: 'Schizophrenia',
      category: 'Psychotic Disorders',
      description: 'A chronic and severe mental disorder characterized by distortions in thinking, perception, emotions, language, sense of self, and behavior, including psychotic experiences such as hallucinations and delusions.',
      symptoms: JSON.stringify([
        'Hallucinations (hearing voices is most common)',
        'Delusions (false beliefs despite contrary evidence)',
        'Disorganized thinking and speech',
        'Grossly disorganized or abnormal motor behavior (including catatonia)',
        'Negative symptoms (diminished emotional expression, avolition)',
        'Lack of motivation or initiative',
        'Social withdrawal',
        'Difficulty experiencing pleasure',
        'Flat affect (reduced emotional expression)',
        'Poverty of speech',
        'Cognitive impairments (attention, memory, executive function)',
        'Paranoia',
        'Difficulty distinguishing reality from non-reality',
        'Inappropriate or bizarre behavior',
        'Decline in self-care and functioning'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (80% heritability, multiple genes involved)',
        'Brain structure abnormalities (enlarged ventricles, reduced gray matter)',
        'Neurotransmitter imbalances (dopamine hyperactivity, glutamate dysfunction)',
        'Prenatal complications (malnutrition, viral infections)',
        'Birth complications',
        'Neurodevelopmental disruptions',
        'Immune system abnormalities'
      ]),
      psychologicalCauses: JSON.stringify([
        'Chronic stress exacerbates symptoms',
        'Childhood trauma increases risk',
        'Cognitive biases in psychotic thinking',
        'Difficulty with reality testing',
        'Impaired emotional regulation',
        'Social cognition deficits'
      ]),
      socialCauses: JSON.stringify([
        'Urban upbringing (slightly higher risk)',
        'Migration and minority status',
        'Social isolation',
        'Childhood adversity',
        'Cannabis use in adolescence (may trigger in vulnerable)',
        'Psychosocial stressors',
        'Lack of social support',
        'Stigma and discrimination'
      ]),
      prevalence: '0.3-0.7% of population worldwide. Affects about 1 in 100 people. Equal in males and females, but earlier onset in males.',
      ageOfOnset: 'Typically late teens to early 30s. Males: late teens-early 20s. Females: mid-20s-early 30s. Rare before puberty or after 40.',
      courseOfIllness: 'Chronic with periods of exacerbation and remission. First episode often preceded by prodromal phase. Early intervention improves outcomes. 20-30% achieve significant recovery, 50% have ongoing symptoms, 20-30% have persistent severe symptoms.',
      riskFactors: JSON.stringify([
        'Family history (10x risk if first-degree relative affected)',
        'Genetic vulnerability',
        'Prenatal exposure to malnutrition or infection',
        'Birth complications',
        'Adolescent cannabis use',
        'Urban environment',
        'Migration or minority status',
        'Childhood trauma',
        'Advanced paternal age',
        'Winter/spring birth (slightly elevated)'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention and treatment',
        'Medication adherence',
        'Strong family support',
        'Stable housing',
        'Psychosocial rehabilitation',
        'Avoiding substance use',
        'Structured environment',
        'Social support networks',
        'Vocational rehabilitation'
      ]),
      comorbidities: JSON.stringify([
        'Substance use disorders (47%)',
        'Depression (50%)',
        'Anxiety disorders',
        'Obsessive-compulsive symptoms',
        'PTSD',
        'Metabolic syndrome (from medications)',
        'Cardiovascular disease',
        'Diabetes (2-3x higher risk)'
      ]),
      naturalSolutions: JSON.stringify([
        'Antipsychotic medications (essential for most)',
        'Cognitive Behavioral Therapy for psychosis (CBTp)',
        'Family psychoeducation and support',
        'Supported employment',
        'Social skills training',
        'Cognitive remediation therapy',
        'Assertive Community Treatment (ACT)',
        'Case management',
        'Peer support',
        'Structured daily activities',
        'Regular sleep schedule',
        'Avoid alcohol and drugs (especially cannabis)',
        'Stress management',
        'Exercise (moderate, regular)',
        'Healthy diet',
        'Medication adherence critical',
        'Early warning sign monitoring',
        'Crisis planning',
        'Vocational training',
        'Housing support'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet (medications can cause weight gain)',
        'Monitor metabolic parameters',
        'Omega-3 fatty acids (may have modest benefit)',
        'Antioxidant-rich foods',
        'B-complex vitamins',
        'Vitamin D (often deficient)',
        'Adequate protein',
        'Complex carbohydrates',
        'Limit processed foods and sugar',
        'Stay hydrated',
        'Regular meals',
        'Monitor weight due to medication effects',
        'Folate-rich foods',
        'Avoid caffeine excess',
        'Mediterranean diet pattern'
      ]),
      therapyApproaches: JSON.stringify([
        'Antipsychotic medications - ESSENTIAL (first-generation: haloperidol; second-generation: risperidone, olanzapine, quetiapine, aripiprazole, others)',
        'Cognitive Behavioral Therapy for psychosis (CBTp)',
        'Family therapy and psychoeducation',
        'Social skills training',
        'Cognitive remediation',
        'Supported employment (Individual Placement and Support)',
        'Assertive Community Treatment (ACT)',
        'Early intervention services (first episode)',
        'Coordinated Specialty Care',
        'Long-acting injectable antipsychotics (for adherence)',
        'Clozapine for treatment-resistant schizophrenia',
        'Hospitalization when needed for safety',
        'Electroconvulsive therapy (ECT) in severe cases'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Hearing voices or seeing things others don\'t',
        'Believing things that aren\'t true (delusions)',
        'Confused or disorganized thinking',
        'Significant withdrawal from activities',
        'Decline in self-care or functioning',
        'Paranoia or suspiciousness',
        'Bizarre or inappropriate behavior',
        'Family history and early warning signs',
        'First episode of psychosis (SEEK IMMEDIATE HELP)',
        'Suicidal thoughts (30-40% attempt suicide)',
        'Medication non-adherence',
        'Substance use worsening symptoms'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'NAMI HelpLine: 1-800-950-6264',
        'Early Psychosis Intervention Network: scan.psychiatry.northwestern.edu',
        'Emergency: 911 (for immediate safety concerns)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/schizophrenia',
        'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Schizophrenia',
        'https://pubmed.ncbi.nlm.nih.gov/28360956/ - Treatment of schizophrenia',
        'https://www.psychiatry.org/patients-families/schizophrenia'
      ]),
      dsmCriteria: JSON.stringify([
        'Two (or more) of the following, each present for significant portion of time during 1-month period (or less if successfully treated). At least one must be (1), (2), or (3):',
        '1. Delusions',
        '2. Hallucinations',
        '3. Disorganized speech',
        '4. Grossly disorganized or catatonic behavior',
        '5. Negative symptoms',
        'Level of functioning in one or more major areas markedly below level prior to onset',
        'Continuous signs of disturbance persist for at least 6 months',
        'Schizoaffective disorder and depressive/bipolar disorder with psychotic features ruled out',
        'Not attributable to substance or medical condition',
        'If history of autism spectrum disorder or communication disorder, diagnosis only if prominent delusions/hallucinations present for at least 1 month',
        'Specify: First episode vs. Multiple episodes vs. Continuous',
        'Specify severity and course'
      ])
    },
    {
      slug: 'antisocial-personality-disorder',
      name: 'Antisocial Personality Disorder (ASPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of disregard for and violation of the rights of others, beginning in childhood or early adolescence and continuing into adulthood, characterized by deceitfulness, impulsivity, aggression, and lack of remorse.',
      symptoms: JSON.stringify([
        'Failure to conform to social norms and lawful behaviors',
        'Deceitfulness (repeated lying, use of aliases, conning others)',
        'Impulsivity and failure to plan ahead',
        'Irritability and aggressiveness (repeated physical fights or assaults)',
        'Reckless disregard for safety of self or others',
        'Consistent irresponsibility (work, financial obligations)',
        'Lack of remorse (indifference to or rationalization of hurting others)',
        'Manipulation of others for personal gain',
        'Charm and superficial charisma (often)',
        'Violation of rights of others',
        'Criminal behavior',
        'Poor behavioral controls',
        'Early behavioral problems',
        'Lack of empathy',
        'Shallow emotions'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (50% heritability)',
        'Reduced prefrontal cortex activity',
        'Amygdala abnormalities (emotion processing)',
        'Low serotonin levels',
        'Testosterone levels (associated with aggression)',
        'Brain structure differences in moral reasoning areas',
        'Autonomic nervous system underarousal'
      ]),
      psychologicalCauses: JSON.stringify([
        'Childhood conduct disorder',
        'Lack of empathy development',
        'Poor attachment in early childhood',
        'Learning aggressive behaviors',
        'Cognitive distortions (self-serving bias)',
        'Impulsivity and poor self-control',
        'History of childhood abuse or neglect',
        'Reinforcement of antisocial behaviors'
      ]),
      socialCauses: JSON.stringify([
        'Childhood abuse or neglect',
        'Inconsistent or harsh parenting',
        'Association with delinquent peers',
        'Low socioeconomic status',
        'Family instability',
        'Lack of positive role models',
        'Exposure to violence',
        'Substance use in family'
      ]),
      prevalence: '0.2-3.3% of general population. 3-30% in clinical populations. More common in males (3:1 ratio).',
      ageOfOnset: 'Must be at least 18 for diagnosis. Pattern begins in childhood/adolescence (conduct disorder before age 15).',
      courseOfIllness: 'Chronic condition that may improve after age 40. Criminal behavior often decreases with age but interpersonal problems persist. Early intervention can improve outcomes.',
      riskFactors: JSON.stringify([
        'Conduct disorder in childhood',
        'Family history of ASPD or substance use',
        'Child abuse or neglect',
        'Inconsistent parenting',
        'Male gender',
        'Low socioeconomic status',
        'Substance use',
        'Peer delinquency',
        'Early aggressive behavior',
        'ADHD'
      ]),
      protectiveFactors: JSON.stringify([
        'Stable family environment',
        'Positive role models',
        'Early intervention for conduct problems',
        'Education and employment',
        'Consistent consequences for behavior',
        'Development of empathy',
        'Treatment engagement',
        'Supportive relationships'
      ]),
      comorbidities: JSON.stringify([
        'Substance use disorders (very common)',
        'Depression',
        'Anxiety disorders',
        'Other personality disorders',
        'ADHD',
        'Pathological gambling',
        'Higher mortality rate (accidents, violence, suicide)'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (challenging criminal thinking)',
        'Address substance use (often primary)',
        'Develop empathy through perspective-taking',
        'Anger management',
        'Social skills training',
        'Vocational training and employment',
        'Structured environment',
        'Consequences for antisocial behavior',
        'Family therapy (if appropriate)',
        'Mentoring programs',
        'Community service',
        'Moral reasoning development',
        'Impulse control strategies',
        'Problem-solving skills',
        'Victim awareness programs',
        'Relationship skills training',
        'Financial planning education',
        'Avoiding high-risk situations',
        'Building prosocial relationships',
        'Long-term monitoring and support'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, healthy diet',
        'Omega-3 fatty acids (may reduce aggression)',
        'Limit alcohol and substances',
        'B-complex vitamins',
        'Magnesium',
        'Vitamin D',
        'Adequate protein',
        'Complex carbohydrates',
        'Stay hydrated',
        'Avoid excessive caffeine or stimulants',
        'Regular meal schedule',
        'Antioxidant-rich foods',
        'Limit processed foods',
        'Mediterranean diet pattern',
        'Probiotics'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - most evidence',
        'Reasoning and Rehabilitation program',
        'Moral Reconation Therapy',
        'Mentalization-Based Therapy',
        'Schema Therapy',
        'Contingency management',
        'Therapeutic communities',
        'Court-mandated treatment (often)',
        'Substance abuse treatment (critical if present)',
        'No FDA-approved medications for ASPD',
        'Medications for comorbid conditions (depression, ADHD, aggression)',
        'Long-term treatment often needed',
        'Note: Treatment challenging due to lack of insight and motivation'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Court-mandated evaluation or treatment',
        'Repeated legal problems',
        'Relationship breakdown',
        'Risk of harm to others',
        'Substance use problems',
        'Employment difficulties',
        'Family concerns',
        'Co-occurring mental health issues',
        'Desire for change (rare but possible)',
        'Aggression toward others',
        'Financial or legal consequences',
        'Recognition of pattern causing problems'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Local criminal justice diversion programs',
        'Community mental health centers',
        'Substance abuse treatment centers',
        'Emergency: 911 (if risk of harm)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/28683213/ - Treatment of ASPD',
        'https://www.mayoclinic.org/diseases-conditions/antisocial-personality-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of disregard for and violation of rights of others since age 15',
        'Individual is at least 18 years old',
        'Three (or more) of the following:',
        '1. Failure to conform to social norms regarding lawful behaviors',
        '2. Deceitfulness (repeated lying, use of aliases, conning)',
        '3. Impulsivity or failure to plan ahead',
        '4. Irritability and aggressiveness (repeated fights/assaults)',
        '5. Reckless disregard for safety of self or others',
        '6. Consistent irresponsibility (work, financial)',
        '7. Lack of remorse',
        'Evidence of Conduct Disorder with onset before age 15',
        'Not occurring exclusively during schizophrenia or bipolar disorder',
        'Also known as sociopathy or psychopathy (informal terms)'
      ])
    },
    {
      slug: 'dissociative-identity-disorder',
      name: 'Dissociative Identity Disorder (DID)',
      category: 'Dissociative Disorders',
      description: 'A complex psychological condition characterized by the presence of two or more distinct personality states or identities, along with recurrent gaps in recall of everyday events, personal information, and/or traumatic events, typically resulting from severe childhood trauma.',
      symptoms: JSON.stringify([
        'Two or more distinct personality states (alters)',
        'Gaps in memory for everyday events',
        'Gaps in memory for personal information',
        'Gaps in recall of traumatic events',
        'Switching between personality states',
        'Hearing voices (internal dialogue between alters)',
        'Depersonalization (feeling detached from self)',
        'Derealization (feeling world is unreal)',
        'Identity confusion',
        'Finding evidence of things you don\'t remember doing',
        'Being told of behaviors you don\'t recall',
        'Different handwriting or skills across states',
        'Severe headaches or body pain',
        'Time loss or "lost time"',
        'Feeling like multiple people',
        'Child-like behavior at times (if child alter present)',
        'Dissociative amnesia',
        'Flashbacks of trauma'
      ]),
      biologicalCauses: JSON.stringify([
        'Severe repeated trauma affects brain development',
        'Changes in hippocampus and amygdala',
        'Altered stress response system',
        'Disrupted memory consolidation',
        'Brain adaptations to overwhelming stress',
        'Genetic vulnerability to dissociation',
        'Neurobiological response to trauma'
      ]),
      psychologicalCauses: JSON.stringify([
        'Severe childhood trauma (abuse, neglect)',
        'Repeated traumatic experiences',
        'Lack of support during trauma',
        'Need to compartmentalize traumatic memories',
        'Dissociation as survival mechanism',
        'Inability to integrate traumatic experiences',
        'Formation of alternate identities to cope',
        'Usually originates before age 9'
      ]),
      socialCauses: JSON.stringify([
        'Childhood abuse (physical, sexual, emotional)',
        'Severe neglect',
        'Witnessing violence',
        'Medical trauma in childhood',
        'Lack of safe attachment figures',
        'Ongoing abuse with no escape',
        'Family dysfunction',
        'Invalidation of trauma experiences'
      ]),
      prevalence: '0.01-1% of general population. 1-5% of clinical populations. More commonly diagnosed in females.',
      ageOfOnset: 'Trauma typically occurs in early childhood (before age 9), but diagnosis often not until adolescence or adulthood.',
      courseOfIllness: 'Chronic condition but can improve with specialized treatment. Recovery involves integration of identities and processing trauma. Treatment is long-term (years).',
      riskFactors: JSON.stringify([
        'Severe childhood trauma (especially before age 9)',
        'Prolonged abuse or neglect',
        'Lack of support during trauma',
        'Multiple traumatic events',
        'Capacity for dissociation',
        'Family history of dissociative symptoms',
        'Female gender',
        'Early age of trauma onset',
        'Severity and duration of abuse'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Trauma-focused therapy',
        'Safe, stable environment',
        'Supportive relationships',
        'Validation of experiences',
        'Treatment by DID specialist',
        'Grounding techniques',
        'Psychoeducation about DID'
      ]),
      comorbidities: JSON.stringify([
        'PTSD (almost always)',
        'Depression (very common)',
        'Anxiety disorders',
        'Substance use disorders',
        'Eating disorders',
        'Self-harm and suicidal behavior (high risk)',
        'Borderline personality disorder (overlapping symptoms)',
        'Conversion symptoms'
      ]),
      naturalSolutions: JSON.stringify([
        'Specialized trauma therapy (essential)',
        'Grounding techniques for dissociation',
        'Internal communication between alters',
        'Safety planning',
        'Co-consciousness work',
        'Integration therapy (when ready)',
        'EMDR adapted for DID',
        'Art or journaling for different alters',
        'Establish daily routine and structure',
        'Sleep hygiene',
        'Avoid triggers when possible',
        'Build support system',
        'Psychoeducation about DID',
        'Mindfulness (adapted for DID)',
        'Body-based therapies (carefully)',
        'Support groups for DID',
        'Internal system mapping',
        'Communication notebook',
        'Safety contracts',
        'Avoid retraumatization'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, regular meals',
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Magnesium for stress',
        'Vitamin D',
        'Adequate protein',
        'Complex carbohydrates',
        'Limit caffeine',
        'Avoid alcohol (worsens dissociation)',
        'Stay hydrated',
        'Anti-inflammatory foods',
        'Probiotic foods',
        'Regular meal schedule (helps with grounding)',
        'Avoid blood sugar crashes',
        'Mediterranean diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Phase-oriented trauma treatment (stabilization, trauma processing, integration)',
        'Specialized psychotherapy by DID expert',
        'Internal Family Systems (IFS) adapted for DID',
        'Dialectical Behavior Therapy (DBT) for emotion regulation',
        'EMDR (adapted for complex dissociation)',
        'Hypnotherapy (by specialist)',
        'Cognitive Processing Therapy',
        'Medications for comorbid conditions (depression, anxiety, PTSD symptoms)',
        'No medication specifically for DID',
        'Long-term therapy (years typically)',
        'Hospitalization if safety concerns',
        'Group therapy with caution',
        'Family therapy (if safe and appropriate)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Experiencing "lost time" or memory gaps',
        'Finding evidence of actions you don\'t remember',
        'Hearing voices inside your head',
        'Feeling like multiple people',
        'Others report you behave differently at times',
        'Severe dissociation',
        'Self-harm or suicidal thoughts',
        'Flashbacks of trauma',
        'Unable to function in daily life',
        'Need for specialized DID treatment',
        'Difficulty with identity or sense of self',
        'Symptoms interfering with relationships or work'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'RAINN National Sexual Assault Hotline: 1-800-656-4673',
        'SAMHSA National Helpline: 1-800-662-4357',
        'International Society for the Study of Trauma and Dissociation (ISSTD): isst-d.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/dissociative-disorders',
        'https://www.isst-d.org/',
        'https://pubmed.ncbi.nlm.nih.gov/21308398/ - Treatment of dissociative disorders',
        'https://www.psychiatry.org/patients-families/dissociative-disorders'
      ]),
      dsmCriteria: JSON.stringify([
        'Disruption of identity characterized by two or more distinct personality states',
        'Discontinuity in sense of self and agency',
        'Alterations in affect, behavior, consciousness, memory, perception, cognition, and/or sensory-motor functioning',
        'Recurrent gaps in recall of everyday events, important personal information, and/or traumatic events',
        'Symptoms cause clinically significant distress or impairment',
        'Not a normal part of broadly accepted cultural or religious practice',
        'Not attributable to substances or medical condition',
        'In children, symptoms not better explained by imaginary playmates or fantasy play',
        'Possession-form presentation (in some cultures)',
        'Different from "multiple personality disorder" (outdated term)',
        'High rate of misdiagnosis (often confused with schizophrenia, bipolar, BPD)'
      ])
    },
    // PHASE 3A: PERSONALITY DISORDERS (7)
    {
      slug: 'avoidant-personality-disorder',
      name: 'Avoidant Personality Disorder (AvPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Avoids occupational activities involving interpersonal contact',
        'Unwilling to get involved with people unless certain of being liked',
        'Shows restraint in intimate relationships due to fear of shame or ridicule',
        'Preoccupied with being criticized or rejected in social situations',
        'Inhibited in new interpersonal situations due to feelings of inadequacy',
        'Views self as socially inept, unappealing, or inferior',
        'Unusually reluctant to take risks or engage in new activities',
        'Extreme shyness and social anxiety',
        'Low self-esteem',
        'Self-isolation and loneliness',
        'Hypersensitivity to criticism',
        'Avoidance of social or occupational activities',
        'Difficulty making friends',
        'Fear of embarrassment',
        'Misinterprets neutral interactions as negative',
        'Monitors own internal reactions in social situations'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (estimated 30-40% heritability)',
        'Temperamental factors (behavioral inhibition in childhood)',
        'Amygdala hyperactivity (heightened threat detection)',
        'Altered serotonin and dopamine function',
        'Prefrontal cortex differences in social processing',
        'HPA axis dysregulation (stress response)',
        'Neurobiological sensitivity to rejection'
      ]),
      psychologicalCauses: JSON.stringify([
        'Childhood experiences of rejection or ridicule',
        'Critical or emotionally unavailable parents',
        'Bullying or peer rejection',
        'Insecure attachment patterns',
        'Low self-esteem development',
        'Cognitive biases (negative interpretation of social cues)',
        'Learned avoidance as coping mechanism',
        'Perfectionism and fear of failure'
      ]),
      socialCauses: JSON.stringify([
        'Early childhood rejection experiences',
        'Parental overprotectiveness or emotional neglect',
        'Social ridicule or humiliation',
        'Peer bullying or ostracism',
        'Cultural emphasis on social performance',
        'Lack of positive social experiences',
        'Family history of anxiety or avoidance',
        'Limited social skills development opportunities'
      ]),
      prevalence: '2.4% of U.S. adults. Equally common in males and females. Often co-occurs with social anxiety disorder.',
      ageOfOnset: 'Typically emerges in adolescence or early adulthood. Shy temperament often evident in childhood.',
      courseOfIllness: 'Chronic and stable over time without treatment. Can improve significantly with therapy, particularly CBT and exposure-based interventions. May improve naturally with age and positive life experiences.',
      riskFactors: JSON.stringify([
        'Childhood rejection or criticism',
        'Temperamental shyness or behavioral inhibition',
        'Family history of anxiety disorders',
        'Childhood trauma or abuse',
        'Bullying experiences',
        'Socially anxious parents (modeling)',
        'Lack of early social experiences',
        'Perfectionist tendencies',
        'Low self-esteem'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention for social anxiety',
        'Supportive, accepting relationships',
        'Gradual exposure to social situations',
        'Development of social skills',
        'Positive social experiences',
        'Cognitive behavioral therapy',
        'Self-compassion practices',
        'Secure attachment figures'
      ]),
      comorbidities: JSON.stringify([
        'Social Anxiety Disorder (very common overlap)',
        'Major Depressive Disorder',
        'Other personality disorders (dependent, borderline)',
        'Generalized Anxiety Disorder',
        'Substance use disorders',
        'Eating disorders',
        'Body Dysmorphic Disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - highly effective',
        'Gradual exposure to feared social situations',
        'Social skills training',
        'Challenge negative self-beliefs',
        'Practice self-compassion',
        'Mindfulness meditation',
        'Join support groups or group therapy',
        'Set small, achievable social goals',
        'Journaling thoughts and feelings',
        'Regular exercise for anxiety reduction',
        'Deep breathing and relaxation techniques',
        'Build one safe relationship at a time',
        'Volunteer work (structured social interaction)',
        'Take classes or join clubs with shared interests',
        'Limit social media comparison',
        'Practice assertiveness skills',
        'Develop hobbies and interests',
        'Accept imperfection in social interactions',
        'Reframe rejection as learning opportunity',
        'Seek therapy from avoidance-focused specialist'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (reduces anxiety)',
        'Magnesium for stress and anxiety',
        'B-complex vitamins for mood',
        'L-theanine (promotes relaxation)',
        'Vitamin D (often deficient in those who avoid outdoor activities)',
        'Probiotics for gut-brain axis',
        'Limit caffeine (can increase anxiety)',
        'Avoid excessive alcohol',
        'Regular, balanced meals',
        'Complex carbohydrates',
        'Protein for neurotransmitter production',
        'Stay hydrated',
        'Antioxidant-rich foods',
        'Limit sugar (blood sugar stability)',
        'Mediterranean diet pattern'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - First-line treatment',
        'Exposure therapy (gradual social exposure)',
        'Schema-Focused Therapy',
        'Mentalization-Based Therapy',
        'Group therapy (particularly effective)',
        'Interpersonal therapy',
        'Acceptance and Commitment Therapy (ACT)',
        'Social skills training',
        'Medications (for severe symptoms):',
        '  - SSRIs (sertraline, paroxetine)',
        '  - SNRIs (venlafaxine)',
        '  - Beta-blockers for performance anxiety',
        'Long-term psychotherapy (1-2+ years often beneficial)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Social avoidance interfering with work or education',
        'Extreme loneliness or isolation',
        'Depression due to social withdrawal',
        'Unable to form or maintain relationships',
        'Missing important opportunities due to fear',
        'Significant distress about social limitations',
        'Substance use to cope with anxiety',
        'Suicidal thoughts',
        'Ready to make changes',
        'Quality of life severely impacted',
        'Fear of rejection controlling life decisions',
        'Want to develop social connections'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'Anxiety and Depression Association of America: adaa.org',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/22122504/ - CBT for AvPD',
        'https://www.apa.org/topics/personality-disorders'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation',
        'Beginning by early adulthood and present in various contexts',
        'Four (or more) of the following:',
        '1. Avoids occupational activities with significant interpersonal contact',
        '2. Unwilling to get involved unless certain of being liked',
        '3. Shows restraint within intimate relationships due to fear of shame or ridicule',
        '4. Preoccupied with being criticized or rejected',
        '5. Inhibited in new interpersonal situations due to feelings of inadequacy',
        '6. Views self as socially inept, personally unappealing, or inferior',
        '7. Unusually reluctant to take personal risks or engage in new activities',
        'Does not occur exclusively during course of schizophrenia or other psychotic disorder',
        'Symptoms cause clinically significant distress or impairment'
      ])
    },
    {
      slug: 'paranoid-personality-disorder',
      name: 'Paranoid Personality Disorder (PPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of distrust and suspiciousness of others such that their motives are interpreted as malevolent, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Suspects others are exploiting, harming, or deceiving them',
        'Preoccupied with unjustified doubts about loyalty of friends or associates',
        'Reluctant to confide in others due to fear information will be used against them',
        'Reads hidden threatening meanings into benign remarks or events',
        'Persistently bears grudges',
        'Perceives attacks on character or reputation not apparent to others, quick to react angrily',
        'Recurrent suspicions about fidelity of spouse or partner',
        'Hypervigilance and scanning environment for threats',
        'Argumentative and defensive',
        'Cold and distant affect',
        'Difficulty relaxing',
        'Questions loyalty and trustworthiness of others',
        'Holds grudges for perceived slights',
        'Misinterprets innocent remarks as threatening',
        'Socially isolated due to distrust',
        'Blames others for own problems'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family history of schizophrenia or delusional disorder)',
        'Neurobiological factors in threat detection',
        'Dopamine dysregulation',
        'Amygdala hyperreactivity',
        'Differences in social cognition brain regions',
        'Possible link to temporal lobe abnormalities',
        'Heightened stress response system'
      ]),
      psychologicalCauses: JSON.stringify([
        'Early experiences of betrayal or exploitation',
        'Childhood trauma',
        'Learned distrust from caregivers',
        'Cognitive biases (hostile attribution bias)',
        'Hypervigilance as defense mechanism',
        'Difficulty with perspective-taking',
        'Projection of own impulses onto others',
        'Low self-esteem masked by defensiveness'
      ]),
      socialCauses: JSON.stringify([
        'Childhood experiences of betrayal',
        'Growing up in threatening or hostile environment',
        'Parental modeling of suspicious behavior',
        'Victimization experiences',
        'Discrimination or persecution',
        'Immigration or minority status stress',
        'Cultural or family patterns of distrust',
        'Social isolation reinforcing beliefs'
      ]),
      prevalence: '2.3-4.4% of general population. More common in males. Often seen in relatives of individuals with schizophrenia.',
      ageOfOnset: 'Typically first evident in early adulthood, though suspicious traits may be present in childhood or adolescence.',
      courseOfIllness: 'Generally chronic and stable. Some may develop brief psychotic episodes under stress. Can worsen in late life. Treatment is challenging due to mistrust, but therapy can help if relationship is established.',
      riskFactors: JSON.stringify([
        'Family history of schizophrenia or delusional disorder',
        'Childhood trauma or abuse',
        'Early betrayal experiences',
        'Growing up in dangerous environment',
        'Immigration or refugee experiences',
        'Discrimination or persecution',
        'Social isolation',
        'Substance abuse',
        'Male gender'
      ]),
      protectiveFactors: JSON.stringify([
        'Positive early relationships',
        'Development of trust in therapeutic relationship',
        'Cognitive therapy to challenge beliefs',
        'Social skills training',
        'Stable, predictable environment',
        'Education about cognitive biases',
        'Mindfulness practices',
        'Support network (if trust can be established)'
      ]),
      comorbidities: JSON.stringify([
        'Major Depressive Disorder',
        'Agoraphobia',
        'Obsessive-Compulsive Disorder',
        'Substance use disorders',
        'Other personality disorders (schizoid, schizotypal, narcissistic, avoidant, borderline)',
        'Delusional disorder (differential diagnosis)',
        'Brief psychotic episodes under stress'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (if trust can be established)',
        'Challenge paranoid thoughts with evidence',
        'Practice perspective-taking',
        'Mindfulness to observe thoughts without judgment',
        'Stress reduction techniques',
        'Avoid substances (can worsen paranoia)',
        'Regular sleep schedule',
        'Limit isolation',
        'Journaling to track patterns',
        'Reality testing techniques',
        'Develop at least one trusting relationship',
        'Exercise for stress management',
        'Limit news/media that triggers paranoia',
        'Learn about cognitive biases',
        'Practice relaxation techniques',
        'Set boundaries appropriately',
        'Focus on facts rather than assumptions',
        'Consider alternative explanations',
        'Delay reactions when suspicious',
        'Seek therapy from specialist'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Magnesium for stress',
        'Vitamin D',
        'Avoid excessive caffeine (can increase hypervigilance)',
        'Avoid stimulants',
        'Absolutely avoid marijuana and other drugs (can worsen paranoia)',
        'Limit alcohol',
        'Regular, balanced meals',
        'Complex carbohydrates',
        'Adequate protein',
        'Antioxidant-rich foods',
        'Stay hydrated',
        'Mediterranean diet',
        'Probiotic foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Individual psychotherapy (establishing trust is key)',
        'Cognitive Behavioral Therapy (CBT)',
        'Supportive therapy',
        'Focus on specific problems rather than personality change',
        'Reality testing',
        'Social skills training',
        'Medications (if severe symptoms):',
        '  - Antipsychotics (low dose) for severe paranoia',
        '  - Antidepressants for comorbid depression',
        '  - Anti-anxiety medications (short-term)',
        'Group therapy (with caution, may be threatening)',
        'Long-term therapy (years often needed)',
        'Family therapy (if appropriate)'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Paranoid thoughts interfering with daily functioning',
        'Unable to maintain relationships or employment',
        'Extreme social isolation',
        'Depression or suicidal thoughts',
        'Brief psychotic episodes',
        'Violent thoughts or impulses',
        'Substance use to cope',
        'Legal problems related to suspicious behavior',
        'Family relationships severely strained',
        'Ready to work on trust issues',
        'Quality of life significantly impacted',
        'Experiencing significant distress'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Mental Health America: mhanational.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/15740822/ - PPD treatment',
        'https://www.mayoclinic.org/diseases-conditions/paranoid-personality-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive distrust and suspiciousness of others',
        'Motives interpreted as malevolent',
        'Beginning by early adulthood and present in various contexts',
        'Four (or more) of the following:',
        '1. Suspects others are exploiting, harming, or deceiving them',
        '2. Preoccupied with unjustified doubts about loyalty or trustworthiness',
        '3. Reluctant to confide due to fear information will be used maliciously',
        '4. Reads hidden threatening meanings into benign remarks or events',
        '5. Persistently bears grudges',
        '6. Perceives attacks on character not apparent to others, quick to react angrily',
        '7. Recurrent suspicions about fidelity of spouse or partner',
        'Does not occur exclusively during schizophrenia, bipolar, or depressive disorder with psychotic features',
        'Not attributable to effects of substance or medical condition'
      ])
    },
    {
      slug: 'schizoid-personality-disorder',
      name: 'Schizoid Personality Disorder',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of detachment from social relationships and restricted range of emotional expression in interpersonal settings, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Neither desires nor enjoys close relationships, including family',
        'Almost always chooses solitary activities',
        'Little interest in sexual experiences with another person',
        'Takes pleasure in few, if any, activities',
        'Lacks close friends or confidants other than first-degree relatives',
        'Appears indifferent to praise or criticism from others',
        'Shows emotional coldness, detachment, or flattened affectivity',
        'Prefers solitude over socializing',
        'Limited emotional expression',
        'Appears aloof and distant',
        'Little interest in relationships',
        'Indifferent to social norms',
        'Lacks desire for intimacy',
        'Rarely experiences strong emotions',
        'May appear to lack a sense of humor',
        'Absorbed in own thoughts and fantasy'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family history of schizophrenia spectrum)',
        'Neurodevelopmental factors',
        'Dopamine and serotonin dysregulation',
        'Differences in reward system processing (reduced social reward)',
        'Altered brain regions for social cognition',
        'Possible oxytocin system differences',
        'Temperamental factors (low sociability from birth)'
      ]),
      psychologicalCauses: JSON.stringify([
        'Early childhood experiences of emotional coldness',
        'Lack of warmth in early relationships',
        'Learned to find satisfaction in solitude',
        'Cognitive style preferring abstract thinking',
        'Defense against feared closeness',
        'Low need for social stimulation',
        'Difficulty understanding social cues',
        'Rich inner fantasy life compensating for lack of social connection'
      ]),
      socialCauses: JSON.stringify([
        'Childhood emotional neglect',
        'Cold or distant parenting',
        'Lack of early attachment bonds',
        'Social reinforcement for solitary behavior',
        'Family modeling of emotional detachment',
        'Limited social opportunities in childhood',
        'Cultural factors valuing independence',
        'Lack of positive social reinforcement'
      ]),
      prevalence: 'Approximately 3-5% of general population. More commonly diagnosed in males. May be underdiagnosed as individuals rarely seek treatment.',
      ageOfOnset: 'Pattern typically evident by early adulthood, though detachment may be present in childhood and adolescence.',
      courseOfIllness: 'Chronic and stable. Usually begins in early adulthood and continues throughout life. Some individuals function adequately in solitary occupations. Generally resistant to treatment as individuals see no problem with their style.',
      riskFactors: JSON.stringify([
        'Family history of schizophrenia or schizotypal personality disorder',
        'Childhood emotional neglect',
        'Cold or rejecting parents',
        'Lack of early attachment',
        'Temperamental factors (low sociability)',
        'Male gender',
        'Autism spectrum traits (differential diagnosis)',
        'Early preference for solitude',
        'Limited social skills development'
      ]),
      protectiveFactors: JSON.stringify([
        'Finding occupations suited to solitary work',
        'Acceptance of own personality style',
        'Structured social situations (if needed)',
        'Understanding that style is not pathological',
        'Access to therapy if distressed',
        'Development of interests and hobbies',
        'Stable living situation',
        'Limited pressure for socialization'
      ]),
      comorbidities: JSON.stringify([
        'Schizotypal Personality Disorder (differential diagnosis)',
        'Avoidant Personality Disorder (differential diagnosis)',
        'Autism Spectrum Disorder (differential diagnosis)',
        'Major Depressive Disorder',
        'Other personality disorders',
        'Substance use disorders (less common)',
        'Anxiety disorders (less common than in other personality disorders)'
      ]),
      naturalSolutions: JSON.stringify([
        'Accept personality style if not causing distress',
        'Find career matching preferences (solitary work)',
        'Develop structured social contact if desired',
        'Therapy only if person seeks change',
        'Cognitive therapy to explore emotions',
        'Social skills training (if desired)',
        'Expressive arts therapy',
        'Written communication may be easier',
        'Small group activities in areas of interest',
        'Online communities (less demanding)',
        'Pursue intellectual interests',
        'Mindfulness for emotional awareness',
        'Journaling to explore inner life',
        'Gradual exposure to social situations (if desired)',
        'Understanding own needs and boundaries',
        'Develop one or two connections (if desired)',
        'Accept limitations without judgment',
        'Find meaning in solitary pursuits',
        'Exercise for overall well-being',
        'Maintain basic self-care'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, healthy diet',
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Vitamin D (especially if limited outdoor activity)',
        'Adequate protein',
        'Complex carbohydrates',
        'Regular meals',
        'Limit caffeine if anxious',
        'Avoid excessive alcohol',
        'Stay hydrated',
        'Antioxidant-rich foods',
        'Mediterranean diet pattern',
        'Probiotic foods',
        'Magnesium for mood',
        'Whole foods diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Individual psychotherapy (if person seeks treatment)',
        'Cognitive Behavioral Therapy (CBT)',
        'Psychodynamic therapy',
        'Focus on specific problems rather than personality change',
        'Social skills training (if desired)',
        'Group therapy (generally not recommended)',
        'Supportive therapy',
        'No specific medications for schizoid PD',
        'Medications for comorbid conditions:',
        '  - Antidepressants for depression',
        '  - Anti-anxiety medications if needed',
        'Therapy respects individual\'s need for distance',
        'May use creative or expressive therapies',
        'Treatment focuses on quality of life, not changing personality'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Experiencing distress about isolation (many don\'t)',
        'Depression or suicidal thoughts',
        'Pressure from others causing problems',
        'Difficulties in required social situations (work, etc.)',
        'Wanting to develop some connections',
        'Comorbid mental health issues',
        'Substance use problems',
        'Unable to meet basic life responsibilities',
        'Family members concerned',
        'Desire to understand self better',
        'Career problems due to social limitations',
        'Experiencing loneliness (not typical but possible)'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Mental Health America: mhanational.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/20437614/ - Schizoid PD overview',
        'https://www.mayoclinic.org/diseases-conditions/schizoid-personality-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of detachment from social relationships',
        'Restricted range of emotional expression in interpersonal settings',
        'Beginning by early adulthood and present in various contexts',
        'Four (or more) of the following:',
        '1. Neither desires nor enjoys close relationships, including family',
        '2. Almost always chooses solitary activities',
        '3. Little, if any, interest in sexual experiences with another person',
        '4. Takes pleasure in few, if any, activities',
        '5. Lacks close friends or confidants other than first-degree relatives',
        '6. Appears indifferent to praise or criticism',
        '7. Shows emotional coldness, detachment, or flattened affectivity',
        'Does not occur exclusively during schizophrenia, bipolar disorder, depressive disorder with psychotic features, or autism spectrum disorder',
        'Not attributable to effects of another medical condition'
      ])
    },
    {
      slug: 'schizotypal-personality-disorder',
      name: 'Schizotypal Personality Disorder',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of social and interpersonal deficits marked by acute discomfort with close relationships, cognitive or perceptual distortions, and eccentricities of behavior, beginning in early adulthood.',
      symptoms: JSON.stringify([
        'Ideas of reference (events have special meaning for them)',
        'Odd beliefs or magical thinking (superstitions, belief in telepathy, clairvoyance)',
        'Unusual perceptual experiences (sensing a presence, hearing murmurs)',
        'Odd thinking and speech (vague, circumstantial, metaphorical)',
        'Suspiciousness or paranoid ideation',
        'Inappropriate or constricted affect',
        'Behavior or appearance that is odd, eccentric, or peculiar',
        'Lack of close friends other than first-degree relatives',
        'Excessive social anxiety that doesn\'t diminish with familiarity',
        'Odd mannerisms or speech patterns',
        'Unusual dress or appearance',
        'Magical or paranormal beliefs',
        'Social isolation',
        'Difficulty with social cues',
        'Feels different or alienated from others',
        'Brief psychotic-like episodes under stress'
      ]),
      biologicalCauses: JSON.stringify([
        'Strong genetic link to schizophrenia (often seen in relatives)',
        'Neurodevelopmental abnormalities',
        'Dopamine dysregulation',
        'Brain structure differences (frontal lobe, temporal lobe)',
        'Reduced gray matter in temporal regions',
        'Abnormal eye tracking (similar to schizophrenia)',
        'Cognitive processing deficits',
        'Working memory impairments'
      ]),
      psychologicalCauses: JSON.stringify([
        'Childhood trauma or abuse',
        'Early attachment disruptions',
        'Cognitive distortions and odd beliefs',
        'Difficulty with reality testing',
        'Social anxiety and avoidance',
        'Defense mechanisms (magical thinking)',
        'Difficulty interpreting social information',
        'Perceptual sensitivities'
      ]),
      socialCauses: JSON.stringify([
        'Family history of schizophrenia or psychotic disorders',
        'Childhood adversity',
        'Social isolation in childhood',
        'Bullying or peer rejection',
        'Unstable family environment',
        'Exposure to unusual beliefs or behavior',
        'Cultural factors in magical beliefs',
        'Lack of social integration'
      ]),
      prevalence: 'Approximately 3-5% of general population. Slightly more common in males. Higher rates in relatives of individuals with schizophrenia.',
      ageOfOnset: 'Symptoms typically emerge in late adolescence or early adulthood, though odd behavior may be present in childhood.',
      courseOfIllness: 'Chronic and stable. Small percentage (10-20%) may develop schizophrenia. Most maintain some level of functioning. Symptoms may improve with age. Social isolation often persists.',
      riskFactors: JSON.stringify([
        'Family history of schizophrenia or schizotypal PD',
        'Childhood trauma or abuse',
        'Prenatal complications',
        'Childhood social difficulties',
        'Neurodevelopmental problems',
        'Genetic vulnerability',
        'Early cannabis use',
        'Urban upbringing',
        'Immigration stress'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Cognitive behavioral therapy',
        'Social skills training',
        'Medication if needed',
        'Stable living environment',
        'Supportive relationships',
        'Structured activities',
        'Avoidance of substance use'
      ]),
      comorbidities: JSON.stringify([
        'Major Depressive Disorder',
        'Anxiety disorders',
        'Other personality disorders (paranoid, avoidant, borderline)',
        'Substance use disorders',
        'Schizophrenia (10-20% conversion rate)',
        'Brief psychotic disorder',
        'Autism spectrum disorder (differential diagnosis)'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT)',
        'Social skills training',
        'Reality testing techniques',
        'Challenge magical thinking gently',
        'Mindfulness and grounding techniques',
        'Structured daily routine',
        'Gradual social exposure',
        'Manage stress (can worsen symptoms)',
        'Avoid drugs and alcohol (especially cannabis)',
        'Build one or two safe relationships',
        'Join support groups',
        'Occupational therapy',
        'Find accepting social environment',
        'Develop coping strategies for anxiety',
        'Regular sleep schedule',
        'Exercise for stress reduction',
        'Creative outlets (art, writing)',
        'Limit social media (reduces comparison)',
        'Practice self-acceptance',
        'Seek specialized treatment'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (may help reduce risk of psychosis)',
        'B-complex vitamins, especially B12 and folate',
        'Vitamin D',
        'Antioxidants',
        'Avoid stimulants',
        'Absolutely avoid cannabis and other drugs',
        'Limit caffeine',
        'Limit alcohol',
        'Regular, balanced meals',
        'Mediterranean diet',
        'Adequate protein',
        'Complex carbohydrates',
        'Probiotic foods',
        'Stay hydrated',
        'Avoid excessive sugar'
      ]),
      therapyApproaches: JSON.stringify([
        'Individual Cognitive Behavioral Therapy (CBT)',
        'Social skills training',
        'Cognitive remediation therapy',
        'Supportive psychotherapy',
        'Family therapy',
        'Group therapy (carefully structured)',
        'Psychoeducation',
        'Medications:',
        '  - Low-dose antipsychotics for severe symptoms',
        '  - Antidepressants for comorbid depression',
        '  - Anti-anxiety medications',
        'Early intervention for psychosis prevention',
        'Long-term therapy often beneficial'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Odd beliefs or perceptions causing distress',
        'Increasing social isolation',
        'Depression or anxiety',
        'Brief psychotic episodes',
        'Paranoid thoughts intensifying',
        'Difficulty functioning in daily life',
        'Self-harm or suicidal thoughts',
        'Substance use',
        'Family concern about symptoms',
        'Wanting to improve social connections',
        'Symptoms interfering with work or education',
        'Risk of developing psychosis'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Early Psychosis Intervention Network: psychiatry.org/epi',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/21191453/ - Schizotypal PD treatment',
        'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/index.shtml'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of social and interpersonal deficits',
        'Acute discomfort with close relationships',
        'Cognitive or perceptual distortions',
        'Eccentricities of behavior',
        'Beginning by early adulthood and present in various contexts',
        'Five (or more) of the following:',
        '1. Ideas of reference',
        '2. Odd beliefs or magical thinking',
        '3. Unusual perceptual experiences',
        '4. Odd thinking and speech',
        '5. Suspiciousness or paranoid ideation',
        '6. Inappropriate or constricted affect',
        '7. Odd, eccentric, or peculiar behavior or appearance',
        '8. Lack of close friends other than first-degree relatives',
        '9. Excessive social anxiety that doesn\'t diminish with familiarity',
        'Does not occur exclusively during schizophrenia, bipolar disorder, depressive disorder with psychotic features, autism spectrum disorder',
        'Not attributable to effects of substance or medical condition'
      ])
    },
    {
      slug: 'histrionic-personality-disorder',
      name: 'Histrionic Personality Disorder (HPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of excessive emotionality and attention-seeking behavior, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Uncomfortable when not the center of attention',
        'Interactions characterized by sexually seductive or provocative behavior',
        'Rapidly shifting and shallow expression of emotions',
        'Uses physical appearance to draw attention',
        'Speech that is excessively impressionistic and lacking in detail',
        'Shows self-dramatization, theatricality, and exaggerated emotion',
        'Suggestible (easily influenced by others or circumstances)',
        'Considers relationships more intimate than they actually are',
        'Excessive emotional expression',
        'Dramatic and attention-seeking behavior',
        'Easily influenced by others',
        'Constantly seeks approval and reassurance',
        'Difficulty maintaining deep relationships',
        'May appear charming initially',
        'Becomes bored easily',
        'Impulsive decision-making',
        'Overreacts to minor events'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (family history of personality disorders)',
        'Temperamental factors (high emotional reactivity)',
        'Neurotransmitter imbalances (serotonin, dopamine)',
        'Differences in emotional regulation brain circuits',
        'Heightened reward sensitivity',
        'Limbic system hyperactivity',
        'Possible hormonal factors'
      ]),
      psychologicalCauses: JSON.stringify([
        'Learned attention-seeking behavior in childhood',
        'Reinforcement for dramatic behavior',
        'Difficulty developing stable self-identity',
        'Need for external validation',
        'Fear of being ignored or invisible',
        'Cognitive style (impressionistic, global thinking)',
        'Low frustration tolerance',
        'Difficulty with emotional regulation'
      ]),
      socialCauses: JSON.stringify([
        'Parenting that rewarded appearance or performance over substance',
        'Inconsistent attention in childhood',
        'Parental modeling of dramatic behavior',
        'Cultural emphasis on external appearance',
        'Social reinforcement for attention-seeking',
        'Childhood experiences of being valued for looks/charm',
        'Family patterns of emotional expression',
        'Lack of attention to inner emotional needs'
      ]),
      prevalence: 'Approximately 2% of general population. More frequently diagnosed in females (though may be due to diagnostic bias). Common in clinical settings.',
      ageOfOnset: 'Symptoms typically emerge in late adolescence or early adulthood.',
      courseOfIllness: 'Generally chronic but can improve with age. Dramatic symptoms may decrease over time. Therapy can help develop deeper relationships and emotional regulation. Some individuals function well in careers that value expressiveness.',
      riskFactors: JSON.stringify([
        'Family history of personality disorders',
        'Parental attention-seeking behavior',
        'Childhood reinforcement for appearance/performance',
        'Inconsistent parenting',
        'Emphasis on physical attractiveness in family',
        'Female gender (for diagnosis)',
        'Early sexualization',
        'Temperamental emotional reactivity',
        'Lack of depth in early relationships'
      ]),
      protectiveFactors: JSON.stringify([
        'Development of genuine self-esteem',
        'Therapy focused on identity and relationships',
        'Learning emotional regulation skills',
        'Building authentic relationships',
        'Developing internal validation',
        'Cognitive behavioral interventions',
        'Social skills training',
        'Mindfulness practices'
      ]),
      comorbidities: JSON.stringify([
        'Borderline Personality Disorder',
        'Narcissistic Personality Disorder',
        'Dependent Personality Disorder',
        'Major Depressive Disorder',
        'Anxiety disorders',
        'Substance use disorders',
        'Somatic symptom disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Psychodynamic therapy',
        'Cognitive Behavioral Therapy (CBT)',
        'Develop awareness of attention-seeking patterns',
        'Practice emotional regulation skills',
        'Build authentic self-esteem',
        'Learn to tolerate not being center of attention',
        'Develop deeper, more genuine relationships',
        'Practice mindfulness and self-reflection',
        'Journaling to develop emotional depth',
        'Focus on internal values vs external validation',
        'Delay impulsive reactions',
        'Practice listening to others',
        'Develop specific, detailed communication',
        'Set personal goals beyond appearance',
        'Exercise for mood regulation',
        'Limit social media (reduces approval-seeking)',
        'Participate in group therapy',
        'Practice self-soothing without external attention',
        'Develop hobbies for intrinsic enjoyment',
        'Work on identity development'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, regular meals',
        'Omega-3 fatty acids for mood',
        'B-complex vitamins',
        'Magnesium for emotional regulation',
        'Vitamin D',
        'Complex carbohydrates for stable mood',
        'Adequate protein',
        'Limit caffeine (can increase reactivity)',
        'Limit alcohol (worsens impulsivity)',
        'Stay hydrated',
        'Mediterranean diet',
        'Probiotic foods',
        'Antioxidant-rich foods',
        'Regular meal schedule',
        'Avoid excessive sugar'
      ]),
      therapyApproaches: JSON.stringify([
        'Psychodynamic psychotherapy',
        'Cognitive Behavioral Therapy (CBT)',
        'Group therapy',
        'Interpersonal therapy',
        'Schema-focused therapy',
        'Emotion regulation training',
        'Assertiveness training',
        'Identity development work',
        'Medications (no specific medication for HPD):',
        '  - Antidepressants for comorbid depression',
        '  - Anti-anxiety medications if needed',
        '  - Mood stabilizers for emotional reactivity',
        'Long-term therapy often beneficial'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Relationships repeatedly fail or are superficial',
        'Depression when not receiving attention',
        'Impulsive behaviors causing problems',
        'Substance use',
        'Self-harm or suicidal thoughts',
        'Unable to maintain employment',
        'Constant need for validation causing distress',
        'Difficulty forming genuine connections',
        'Family relationships strained',
        'Ready to develop deeper sense of self',
        'Wanting more authentic relationships',
        'Quality of life impacted'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Mental Health America: mhanational.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/18557663/ - HPD treatment',
        'https://www.mayoclinic.org/diseases-conditions/histrionic-personality-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of excessive emotionality and attention-seeking',
        'Beginning by early adulthood and present in various contexts',
        'Five (or more) of the following:',
        '1. Uncomfortable when not the center of attention',
        '2. Interactions characterized by inappropriate sexually seductive or provocative behavior',
        '3. Displays rapidly shifting and shallow expression of emotions',
        '4. Consistently uses physical appearance to draw attention',
        '5. Style of speech that is excessively impressionistic and lacking in detail',
        '6. Shows self-dramatization, theatricality, exaggerated emotional expression',
        '7. Suggestible (easily influenced by others or circumstances)',
        '8. Considers relationships more intimate than they actually are',
        'Not better explained by another mental disorder',
        'Symptoms cause significant distress or impairment'
      ])
    },
    {
      slug: 'dependent-personality-disorder',
      name: 'Dependent Personality Disorder (DPD)',
      category: 'Personality Disorders',
      description: 'A pervasive and excessive need to be taken care of that leads to submissive and clinging behavior and fears of separation, beginning in early adulthood and present in various contexts.',
      symptoms: JSON.stringify([
        'Difficulty making everyday decisions without excessive advice and reassurance',
        'Needs others to assume responsibility for most major areas of life',
        'Difficulty expressing disagreement due to fear of loss of support or approval',
        'Difficulty initiating projects or doing things independently',
        'Goes to excessive lengths to obtain nurturance and support',
        'Feels uncomfortable or helpless when alone',
        'Urgently seeks another relationship as source of care when one ends',
        'Preoccupied with fears of being left to take care of self',
        'Extreme need for reassurance',
        'Submissive and passive behavior',
        'Fears abandonment intensely',
        'Lacks self-confidence',
        'Difficulty being alone',
        'Tolerates mistreatment to maintain relationships',
        'Avoids responsibility',
        'Pessimistic about own abilities',
        'May stay in harmful relationships'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family history of anxiety or personality disorders)',
        'Temperamental factors (behavioral inhibition, anxiety-prone)',
        'Neurotransmitter imbalances (serotonin)',
        'Attachment system dysregulation',
        'Heightened separation anxiety neurobiology',
        'Stress response system sensitivity',
        'Brain regions involved in fear and attachment'
      ]),
      psychologicalCauses: JSON.stringify([
        'Early childhood experiences of overprotective parenting',
        'Authoritarian or controlling parents',
        'Punishment for independent behavior',
        'Reinforcement for dependent behavior',
        'Insecure attachment',
        'Chronic illness in childhood',
        'Learned helplessness',
        'Fear of abandonment from early losses'
      ]),
      socialCauses: JSON.stringify([
        'Overprotective or enmeshed family',
        'Cultural factors emphasizing dependence',
        'Childhood experiences of being controlled',
        'Limited opportunities for autonomy',
        'Parental anxiety about child\'s independence',
        'Chronic illness limiting independence',
        'Family patterns of dependence',
        'Social reinforcement for submissive behavior'
      ]),
      prevalence: 'Approximately 0.5-0.6% of general population. May be more common in clinical settings. Slightly more diagnosed in females (may reflect cultural factors).',
      ageOfOnset: 'Typically begins in early adulthood, though dependent traits often evident in childhood and adolescence.',
      courseOfIllness: 'Generally chronic without treatment. Can improve significantly with therapy focused on building autonomy and self-efficacy. Risk increases during times of loss or separation.',
      riskFactors: JSON.stringify([
        'Overprotective or authoritarian parenting',
        'Childhood chronic illness or disability',
        'Family history of anxiety disorders',
        'Early separation anxiety',
        'Insecure attachment',
        'Cultural factors emphasizing dependence',
        'Female gender (for diagnosis)',
        'Lack of encouragement for independence',
        'Parental modeling of dependent behavior'
      ]),
      protectiveFactors: JSON.stringify([
        'Gradual development of autonomy',
        'Cognitive behavioral therapy',
        'Assertiveness training',
        'Building self-efficacy through success',
        'Supportive therapy',
        'Social skills development',
        'Independence training',
        'Healthy relationships that encourage growth'
      ]),
      comorbidities: JSON.stringify([
        'Major Depressive Disorder (common)',
        'Anxiety disorders (especially separation anxiety)',
        'Other personality disorders (borderline, avoidant)',
        'Adjustment disorder when relationships end',
        'Substance use disorders',
        'Agoraphobia',
        'Somatic symptom disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - highly effective',
        'Build self-confidence through small successes',
        'Practice making decisions independently',
        'Assertiveness training',
        'Gradually increase time alone',
        'Challenge beliefs about helplessness',
        'Develop problem-solving skills',
        'Set personal goals and achieve them',
        'Learn to tolerate anxiety of independence',
        'Practice self-soothing',
        'Build sense of competence',
        'Identify own preferences and values',
        'Join support groups',
        'Develop hobbies and interests',
        'Exercise for confidence and stress relief',
        'Mindfulness for anxiety',
        'Journaling about experiences of independence',
        'Take classes to build skills',
        'Practice saying no appropriately',
        'Therapy focused on autonomy'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids for anxiety',
        'Magnesium for stress',
        'B-complex vitamins for mood',
        'Vitamin D',
        'L-theanine for anxiety',
        'Complex carbohydrates for stable mood',
        'Adequate protein',
        'Limit caffeine (can worsen anxiety)',
        'Avoid excessive alcohol',
        'Regular, balanced meals',
        'Stay hydrated',
        'Mediterranean diet',
        'Probiotic foods',
        'Antioxidant-rich foods',
        'Stable blood sugar levels'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - First-line',
        'Psychodynamic therapy',
        'Interpersonal therapy',
        'Assertiveness training',
        'Group therapy',
        'Family therapy (addressing patterns)',
        'Schema-focused therapy',
        'Medications (no specific medication for DPD):',
        '  - Antidepressants for comorbid depression',
        '  - Anti-anxiety medications (with caution - avoid dependence)',
        '  - SSRIs for anxiety',
        'Focus on building independence gradually',
        'Long-term therapy often beneficial'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to make decisions without others',
        'Staying in harmful or abusive relationships',
        'Extreme fear of being alone',
        'Depression due to relationship problems',
        'Anxiety about independence',
        'Difficulty functioning when alone',
        'Suicidal thoughts (especially after relationship loss)',
        'Want to develop more autonomy',
        'Relationship patterns causing distress',
        'Unable to leave unhealthy situation',
        'Excessive dependence interfering with life',
        'Ready to build self-confidence'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'National Domestic Violence Hotline: 1-800-799-7233',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/17964803/ - DPD treatment',
        'https://www.mayoclinic.org/diseases-conditions/dependent-personality-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive and excessive need to be taken care of',
        'Submissive and clinging behavior',
        'Fears of separation',
        'Beginning by early adulthood and present in various contexts',
        'Five (or more) of the following:',
        '1. Difficulty making everyday decisions without excessive advice and reassurance',
        '2. Needs others to assume responsibility for most major areas of life',
        '3. Difficulty expressing disagreement due to fear of loss of support',
        '4. Difficulty initiating projects or doing things independently',
        '5. Goes to excessive lengths to obtain nurturance and support',
        '6. Feels uncomfortable or helpless when alone',
        '7. Urgently seeks another relationship when one ends',
        '8. Preoccupied with fears of being left to care for self',
        'Not better explained by another mental disorder',
        'Symptoms cause significant distress or impairment'
      ])
    },
    {
      slug: 'obsessive-compulsive-personality-disorder',
      name: 'Obsessive-Compulsive Personality Disorder (OCPD)',
      category: 'Personality Disorders',
      description: 'A pervasive pattern of preoccupation with orderliness, perfectionism, and mental and interpersonal control at the expense of flexibility, openness, and efficiency, beginning in early adulthood.',
      symptoms: JSON.stringify([
        'Preoccupied with details, rules, lists, order, organization, or schedules',
        'Perfectionism interferes with task completion',
        'Excessively devoted to work and productivity to exclusion of leisure',
        'Overly conscientious, scrupulous, and inflexible about morality, ethics, or values',
        'Unable to discard worn-out or worthless objects',
        'Reluctant to delegate tasks unless others submit to exact way of doing things',
        'Adopts miserly spending style toward self and others',
        'Shows rigidity and stubbornness',
        'Difficulty making decisions (fear of mistakes)',
        'Need for control',
        'Rigid about rules and procedures',
        'Difficulty expressing warmth or emotion',
        'Workaholism at expense of relationships',
        'Hoarding behaviors',
        'Insistence that others follow their methods',
        'Difficulty seeing "big picture"',
        'Procrastination due to perfectionism'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (family history of OCPD or OCD)',
        'Temperamental factors (high conscientiousness)',
        'Serotonin dysregulation',
        'Brain differences in frontal-striatal circuits',
        'Executive function differences',
        'Genetic variants related to perfectionism',
        'Neurobiological basis of rigidity'
      ]),
      psychologicalCauses: JSON.stringify([
        'Learned perfectionism from parents',
        'Fear of making mistakes',
        'Need for control to manage anxiety',
        'Rigid cognitive style',
        'Black-and-white thinking',
        'High standards internalized in childhood',
        'Fear of chaos or disorder',
        'Defense mechanism against uncertainty'
      ]),
      socialCauses: JSON.stringify([
        'Parental emphasis on achievement and perfection',
        'Critical or demanding parents',
        'Family emphasis on rules and order',
        'Cultural values emphasizing productivity',
        'Childhood experiences requiring excessive responsibility',
        'Modeling of perfectionist behavior',
        'Reinforcement for achievement over relationships',
        'Social anxiety managed through control'
      ]),
      prevalence: 'Approximately 2.1-7.9% of general population. More common in males. Often high-functioning professionally but struggle in relationships.',
      ageOfOnset: 'Pattern typically evident by early adulthood, though perfectionist traits often present in childhood.',
      courseOfIllness: 'Chronic and stable. May worsen under stress. Some individuals function very well professionally. Can improve with therapy, though individuals often resistant to change. Quality of life often limited by rigidity.',
      riskFactors: JSON.stringify([
        'Family history of OCPD or OCD',
        'Perfectionist parents',
        'High parental expectations in childhood',
        'Emphasis on achievement over enjoyment',
        'Temperamental conscientiousness',
        'Male gender',
        'Early responsibility or parentification',
        'Anxiety-prone temperament',
        'Cultural emphasis on productivity'
      ]),
      protectiveFactors: JSON.stringify([
        'Cognitive behavioral therapy',
        'Learning flexibility',
        'Relaxation and stress management',
        'Exposure to imperfection without catastrophe',
        'Balanced approach to achievement',
        'Warm, supportive relationships',
        'Mindfulness practices',
        'Self-compassion development'
      ]),
      comorbidities: JSON.stringify([
        'Obsessive-Compulsive Disorder (OCD) - different but can co-occur',
        'Major Depressive Disorder',
        'Anxiety disorders',
        'Eating disorders (anorexia nervosa)',
        'Hoarding disorder',
        'Body Dysmorphic Disorder',
        'Social Anxiety Disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT)',
        'Challenge perfectionist beliefs',
        'Practice flexibility in small ways',
        'Set time limits on tasks',
        'Learn to delegate',
        'Exposure to "good enough" outcomes',
        'Mindfulness for acceptance',
        'Work-life balance development',
        'Practice spontaneity',
        'Engage in leisure activities',
        'Let go of minor control',
        'Accept mistakes as learning',
        'Practice self-compassion',
        'Relaxation techniques',
        'Limit work hours',
        'Prioritize relationships',
        'Join support groups',
        'Challenge all-or-nothing thinking',
        'Practice gratitude',
        'Therapy focused on flexibility'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids',
        'Magnesium for stress and muscle tension',
        'B-complex vitamins for stress',
        'L-theanine for relaxation',
        'Vitamin D',
        'Limit caffeine (can increase anxiety)',
        'Avoid excessive alcohol',
        'Regular, balanced meals (not rigid diet)',
        'Complex carbohydrates',
        'Adequate protein',
        'Stay hydrated',
        'Mediterranean diet',
        'Probiotic foods',
        'Antioxidant-rich foods',
        'Allow flexibility in eating (avoid rigidity)'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - First-line',
        'Exposure and Response Prevention (for rigid rituals)',
        'Acceptance and Commitment Therapy (ACT)',
        'Psychodynamic therapy',
        'Mindfulness-based therapies',
        'Relaxation training',
        'Group therapy',
        'Couples or family therapy (address relationship impact)',
        'Medications (no specific medication for OCPD):',
        '  - SSRIs for rigidity and comorbid depression/anxiety',
        '  - May help reduce perfectionism',
        'Focus on flexibility and acceptance',
        'Long-term therapy often beneficial'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Perfectionism interfering with completing tasks',
        'Relationships suffering due to rigidity',
        'Workaholism impacting health or relationships',
        'Unable to relax or enjoy leisure',
        'Depression or burnout',
        'Control issues causing conflicts',
        'Hoarding causing problems',
        'Missing life experiences due to rigidity',
        'Family expressing concern',
        'Want more flexibility and enjoyment',
        'Quality of life impacted',
        'Physical health problems from stress'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'International OCD Foundation: iocdf.org',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/personality-disorders',
        'https://www.psychiatry.org/patients-families/personality-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/20445839/ - OCPD vs OCD',
        'https://iocdf.org/expert-opinions/ocpd/'
      ]),
      dsmCriteria: JSON.stringify([
        'Pervasive pattern of preoccupation with orderliness, perfectionism, and mental/interpersonal control',
        'At expense of flexibility, openness, and efficiency',
        'Beginning by early adulthood and present in various contexts',
        'Four (or more) of the following:',
        '1. Preoccupied with details, rules, lists, order, organization, or schedules',
        '2. Perfectionism interferes with task completion',
        '3. Excessively devoted to work and productivity',
        '4. Overly conscientious and inflexible about morality, ethics, or values',
        '5. Unable to discard worn-out or worthless objects',
        '6. Reluctant to delegate tasks unless others submit exactly to their methods',
        '7. Miserly spending style toward both self and others',
        '8. Shows rigidity and stubbornness',
        'Not better explained by OCD or another mental disorder',
        'Distinct from OCD: OCPD = personality traits; OCD = intrusive thoughts and rituals'
      ])
    },
    // PHASE 3A: PSYCHOTIC DISORDERS (3)
    {
      slug: 'schizoaffective-disorder',
      name: 'Schizoaffective Disorder',
      category: 'Psychotic Disorders',
      description: 'A mental health disorder featuring a combination of schizophrenia symptoms (such as hallucinations or delusions) and mood disorder symptoms (depression or mania).',
      symptoms: JSON.stringify([
        'Hallucinations (seeing or hearing things that aren\'t there)',
        'Delusions (fixed false beliefs)',
        'Disorganized thinking and speech',
        'Unusual or bizarre behavior',
        'Depressed mood (in depressive type)',
        'Manic episodes (in bipolar type)',
        'Periods of major depression',
        'Loss of interest or pleasure',
        'Changes in appetite and sleep',
        'Difficulty concentrating',
        'Social withdrawal',
        'Lack of motivation',
        'Poor self-care',
        'Inappropriate emotional responses',
        'Paranoia',
        'Negative symptoms (flat affect, avolition)',
        'Cognitive impairments',
        'Mood symptoms overlapping with psychotic symptoms'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (family history of schizophrenia or mood disorders)',
        'Brain structure abnormalities (ventricles, hippocampus, prefrontal cortex)',
        'Neurotransmitter imbalances (dopamine, serotonin, glutamate)',
        'Disrupted neural circuits',
        'Prenatal complications or infections',
        'Abnormal brain development',
        'HPA axis dysregulation',
        'Neuroinflammation'
      ]),
      psychologicalCauses: JSON.stringify([
        'Severe stress or trauma',
        'Childhood adversity',
        'Cognitive vulnerabilities',
        'Difficulty processing emotional experiences',
        'Maladaptive coping mechanisms',
        'Learned helplessness',
        'Identity confusion',
        'Attachment disruptions'
      ]),
      socialCauses: JSON.stringify([
        'Early life stress or trauma',
        'Family dysfunction',
        'Social isolation',
        'Substance abuse (especially cannabis, stimulants)',
        'Urban environment',
        'Immigration stress',
        'Discrimination or marginalization',
        'Lack of social support'
      ]),
      prevalence: 'Approximately 0.3% of population. Slightly more common in females. Often develops in late teens to early 30s.',
      ageOfOnset: 'Typically emerges in late adolescence to early adulthood (late teens to early 30s). Earlier onset often predicts poorer outcomes.',
      courseOfIllness: 'Chronic condition with fluctuating symptoms. Mood episodes may come and go, with persistent psychotic symptoms. Better prognosis than schizophrenia alone. With treatment, many achieve significant improvement. Lifelong management usually needed.',
      riskFactors: JSON.stringify([
        'Family history of schizophrenia, bipolar disorder, or schizoaffective disorder',
        'Prenatal stress or complications',
        'Childhood trauma',
        'Substance abuse (cannabis, stimulants)',
        'Stressful life events',
        'Social isolation',
        'Urban upbringing',
        'Immigration',
        'Female gender (slightly higher risk)',
        'Neurodevelopmental problems'
      ]),
      protectiveFactors: JSON.stringify([
        'Early diagnosis and treatment',
        'Medication adherence',
        'Strong support system',
        'Structured environment',
        'Psychosocial interventions',
        'Avoiding substances',
        'Stress management',
        'Regular sleep schedule'
      ]),
      comorbidities: JSON.stringify([
        'Substance use disorders (very common)',
        'Anxiety disorders (PTSD, OCD, panic disorder)',
        'Medical conditions (diabetes, cardiovascular disease)',
        'Sleep disorders',
        'Personality disorders',
        'Increased suicide risk (especially early in illness)',
        'Metabolic syndrome (often medication-related)'
      ]),
      naturalSolutions: JSON.stringify([
        'Medication adherence (essential)',
        'Cognitive Behavioral Therapy (CBT) for psychosis',
        'Family therapy and education',
        'Social skills training',
        'Cognitive remediation therapy',
        'Supported employment programs',
        'Structured daily routine',
        'Regular sleep schedule',
        'Avoid all substances (especially cannabis, alcohol, stimulants)',
        'Stress management techniques',
        'Support groups (NAMI, others)',
        'Case management services',
        'Occupational therapy',
        'Exercise (reduces symptoms, improves mood)',
        'Mindfulness (with guidance)',
        'Early warning signs monitoring',
        'Relapse prevention planning',
        'Psychoeducation about illness',
        'Social connection and support',
        'Consistent treatment engagement'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (may reduce symptoms)',
        'B-complex vitamins (especially B12, folate)',
        'Vitamin D (often deficient)',
        'Antioxidants',
        'Mediterranean diet',
        'Regular, balanced meals',
        'Limit sugar (medication side effects)',
        'Adequate protein',
        'Whole grains',
        'Fruits and vegetables',
        'Stay hydrated',
        'Avoid caffeine excess',
        'Absolutely no drugs or alcohol',
        'Monitor for metabolic side effects',
        'Limit processed foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Antipsychotic medications (essential first-line):',
        '  - Atypical antipsychotics (risperidone, olanzapine, quetiapine, aripiprazole)',
        '  - Long-acting injectable options for adherence',
        'Mood stabilizers (lithium, valproate)',
        'Antidepressants (with antipsychotic, never alone)',
        'Cognitive Behavioral Therapy for psychosis (CBTp)',
        'Family-focused therapy',
        'Assertive Community Treatment (ACT)',
        'Coordinated Specialty Care programs',
        'Social skills training',
        'Cognitive remediation',
        'Supported employment/education',
        'Case management',
        'Long-term medication and therapy essential'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Hallucinations or delusions',
        'Severe mood episodes (depression or mania)',
        'Suicidal thoughts or behaviors',
        'Disorganized thinking or behavior',
        'Unable to care for self',
        'Substance use',
        'Stopping medications',
        'Social withdrawal or isolation',
        'Paranoid thoughts',
        'Hearing voices',
        'Changes in behavior concerning to others',
        'Risk of harm to self or others'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'NAMI (National Alliance on Mental Illness): 1-800-950-6264',
        'Substance Abuse and Mental Health Services: samhsa.gov',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/schizoaffective-disorder',
        'https://www.psychiatry.org/patients-families/schizophrenia',
        'https://pubmed.ncbi.nlm.nih.gov/31348039/ - Schizoaffective treatment',
        'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Schizoaffective-Disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Uninterrupted period of illness with major mood episode (major depressive or manic)',
        'Criterion A of schizophrenia met: Delusions, hallucinations, disorganized speech, grossly disorganized/catatonic behavior, negative symptoms',
        'Delusions or hallucinations for 2+ weeks without major mood episode during lifetime of illness',
        'Symptoms of major mood episode present for majority of total illness duration',
        'Not attributable to substance use or medical condition',
        'Specify type:',
        '  - Bipolar type: Manic episode; may also have major depressive episodes',
        '  - Depressive type: Only major depressive episodes',
        'Distinguish from schizophrenia with depressive/bipolar features',
        'Mood symptoms must be prominent and prolonged',
        'Psychotic symptoms must occur outside mood episodes'
      ])
    },
    {
      slug: 'delusional-disorder',
      name: 'Delusional Disorder',
      category: 'Psychotic Disorders',
      description: 'A mental health disorder characterized by the presence of one or more delusions that persist for at least one month, without other symptoms of schizophrenia and with relatively normal functioning.',
      symptoms: JSON.stringify([
        'Non-bizarre delusions (situations that could occur in real life)',
        'Delusions persist for at least one month',
        'No hallucinations (or only brief, related to delusion)',
        'Functioning not markedly impaired (apart from delusion impact)',
        'Behavior not obviously bizarre or odd (except related to delusion)',
        'Persecutory delusions (most common - belief of being targeted)',
        'Jealous delusions (belief partner is unfaithful)',
        'Erotomanic delusions (belief someone is in love with them)',
        'Grandiose delusions (belief of having special abilities or identity)',
        'Somatic delusions (belief of physical defect or medical condition)',
        'Mixed type (more than one type)',
        'Preoccupation with delusional belief',
        'Difficulty accepting contradictory evidence',
        'Social or occupational problems related to delusion',
        'Mood symptoms may be brief if present',
        'Otherwise intact reality testing'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family history of schizophrenia or delusional disorder)',
        'Brain structure abnormalities (temporal lobe, basal ganglia)',
        'Dopamine dysregulation',
        'Neurological conditions',
        'Sensory impairments (hearing or vision loss)',
        'Age-related brain changes',
        'Possible neurotransmitter imbalances',
        'Limbic system dysfunction'
      ]),
      psychologicalCauses: JSON.stringify([
        'Severe stress or trauma',
        'Defense mechanism against low self-esteem',
        'Cognitive biases (jumping to conclusions)',
        'Attribution biases',
        'Reasoning deficits',
        'Need to explain unusual experiences',
        'Social isolation reinforcing beliefs',
        'Confirmation bias (seeking supporting evidence)'
      ]),
      socialCauses: JSON.stringify([
        'Immigration or language barriers',
        'Social isolation',
        'Cultural factors',
        'Jealousy or relationship conflicts',
        'Stigmatization or discrimination',
        'Recent significant life changes',
        'Lack of social support',
        'Sensory impairment leading to misinterpretation'
      ]),
      prevalence: 'Approximately 0.2% of population. Can occur at any age but average onset is 40 years. Slightly more common in females. Often underdiagnosed.',
      ageOfOnset: 'Can occur at any age; average age of onset is 40 years. Persecutory type often starts mid-to-late adulthood. Erotomanic and jealous types may emerge earlier.',
      courseOfIllness: 'Variable course. May be chronic or episodic. Some have single episode that resolves. Others have persistent delusions. Treatment challenging as individuals often lack insight. Functioning can be relatively good outside delusion.',
      riskFactors: JSON.stringify([
        'Family history of schizophrenia or delusional disorder',
        'Older age',
        'Sensory impairments (hearing loss, vision problems)',
        'Social isolation',
        'Immigration or refugee status',
        'Recent significant stressors',
        'Female gender (slightly)',
        'Alcohol or substance abuse',
        'Neurological conditions',
        'Personality traits (suspicious, sensitive)'
      ]),
      protectiveFactors: JSON.stringify([
        'Early recognition and treatment',
        'Therapeutic relationship with trust',
        'Medication adherence',
        'Social support',
        'Cognitive behavioral therapy',
        'Addressing sensory impairments',
        'Stable living situation',
        'Avoiding substances'
      ]),
      comorbidities: JSON.stringify([
        'Depression (common)',
        'Anxiety disorders',
        'Obsessive-Compulsive Disorder',
        'Substance use disorders',
        'Paranoid, narcissistic, or schizoid personality disorders',
        'Medical conditions causing delusions',
        'Increased violence risk (especially persecutory/jealous types)'
      ]),
      naturalSolutions: JSON.stringify([
        'Antipsychotic medication (essential)',
        'Cognitive Behavioral Therapy (CBT) adapted for delusions',
        'Build therapeutic alliance first',
        'Challenge delusions gently, not confrontationally',
        'Reality testing techniques',
        'Address sensory impairments',
        'Reduce social isolation',
        'Family therapy and education',
        'Avoid arguing about delusional beliefs',
        'Focus on reducing distress from beliefs',
        'Stress management',
        'Structured daily routine',
        'Avoid substances',
        'Monitor for depression',
        'Safety planning (if persecutory or jealous type)',
        'Support groups (with caution)',
        'Occupational therapy',
        'Address underlying anxiety or mood issues',
        'Long-term medication often needed',
        'Regular psychiatric follow-up'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Vitamin D',
        'Antioxidant-rich foods',
        'Mediterranean diet',
        'Regular, balanced meals',
        'Adequate protein',
        'Complex carbohydrates',
        'Limit caffeine',
        'Absolutely avoid drugs and alcohol (can worsen delusions)',
        'Stay hydrated',
        'Probiotic foods',
        'Whole foods diet',
        'Monitor for medication side effects',
        'Maintain stable blood sugar'
      ]),
      therapyApproaches: JSON.stringify([
        'Antipsychotic medications (first-line):',
        '  - Atypical antipsychotics (risperidone, olanzapine, aripiprazole)',
        '  - Lower doses than for schizophrenia',
        '  - Long-term treatment usually needed',
        'Cognitive Behavioral Therapy (CBT) for delusions',
        'Supportive psychotherapy',
        'Family therapy',
        'Address comorbid depression or anxiety',
        'Antidepressants if needed (with antipsychotic)',
        'Hospitalization if dangerous',
        'Building trust in therapeutic relationship crucial',
        'Focus on functioning and distress, not just belief change',
        'Long-term management and monitoring'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Fixed false beliefs causing distress',
        'Beliefs interfering with relationships or work',
        'Acting on delusional beliefs',
        'Violence risk (persecutory, jealous types)',
        'Depression or suicidal thoughts',
        'Social isolation due to beliefs',
        'Family concerned about behavior',
        'Legal problems related to beliefs',
        'Substance use',
        'Beliefs becoming more elaborate or distressing',
        'Unable to function due to preoccupation',
        'Any risk of harm to self or others'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'National Domestic Violence Hotline: 1-800-799-7233 (for jealous type concerns)',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/schizophrenia',
        'https://www.psychiatry.org/patients-families/schizophrenia',
        'https://pubmed.ncbi.nlm.nih.gov/30840397/ - Delusional disorder treatment',
        'https://www.mayoclinic.org/diseases-conditions/delusional-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Presence of one or more delusions for 1 month or longer',
        'Criterion A for schizophrenia has never been met',
        'Apart from impact of delusions, functioning not markedly impaired, behavior not obviously bizarre',
        'If mood episodes have occurred, they have been brief relative to delusional periods',
        'Not attributable to substance or medical condition',
        'Specify type:',
        '  - Erotomanic: Delusion that another person is in love with them',
        '  - Grandiose: Delusion of great talent, insight, or special relationship/identity',
        '  - Jealous: Delusion that spouse/partner is unfaithful',
        '  - Persecutory: Delusion of being conspired against, harassed, or obstructed',
        '  - Somatic: Delusion of bodily function or sensation',
        '  - Mixed: More than one type, no predominance',
        '  - Unspecified',
        'Delusions are non-bizarre (involve situations that could occur)'
      ])
    },
    {
      slug: 'schizophreniform-disorder',
      name: 'Schizophreniform Disorder',
      category: 'Psychotic Disorders',
      description: 'A mental health disorder characterized by schizophrenia-like symptoms (hallucinations, delusions, disorganized speech/behavior) lasting between 1-6 months. Similar to schizophrenia but shorter duration.',
      symptoms: JSON.stringify([
        'Delusions (fixed false beliefs)',
        'Hallucinations (typically auditory - hearing voices)',
        'Disorganized speech (incoherent, tangential)',
        'Grossly disorganized or catatonic behavior',
        'Negative symptoms (reduced emotional expression, avolition)',
        'Social withdrawal',
        'Difficulty with daily functioning',
        'Impaired occupational or academic performance',
        'Confused or disoriented thinking',
        'Paranoia or suspiciousness',
        'Inappropriate affect',
        'Lack of insight into illness',
        'Poor concentration',
        'Sleep disturbances',
        'Changes in behavior',
        'Symptoms last 1-6 months (shorter than schizophrenia)',
        'May or may not have good prognostic features'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (family history of psychotic disorders)',
        'Brain structure abnormalities (enlarged ventricles, reduced gray matter)',
        'Neurotransmitter dysregulation (dopamine, glutamate, GABA)',
        'Prenatal complications or infections',
        'Neurodevelopmental abnormalities',
        'Disrupted neural connectivity',
        'HPA axis dysfunction',
        'Neuroinflammation'
      ]),
      psychologicalCauses: JSON.stringify([
        'Severe acute stress',
        'Trauma or adverse experiences',
        'Cognitive vulnerabilities',
        'Difficulty processing emotions',
        'Maladaptive coping strategies',
        'Overwhelming life circumstances',
        'Loss of reality testing',
        'Disrupted sense of self'
      ]),
      socialCauses: JSON.stringify([
        'Acute psychosocial stressors',
        'Social isolation or loneliness',
        'Substance abuse (especially cannabis, stimulants, hallucinogens)',
        'Urban environment',
        'Immigration stress',
        'Childhood trauma or adversity',
        'Discrimination or marginalization',
        'Lack of social support during crisis'
      ]),
      prevalence: 'Less common than schizophrenia. Approximately 0.1-0.2% lifetime prevalence. Equal rates in males and females. Often precedes schizophrenia diagnosis.',
      ageOfOnset: 'Typically emerges in late teens to mid-30s. Peak onset in early 20s. Earlier age of onset may predict conversion to schizophrenia.',
      courseOfIllness: 'By definition, symptoms last 1-6 months. About 1/3 recover fully. About 2/3 progress to schizophrenia or schizoaffective disorder. Good prognostic features improve chances of recovery. Early treatment crucial for better outcomes.',
      riskFactors: JSON.stringify([
        'Family history of schizophrenia or psychotic disorders',
        'Genetic vulnerability',
        'Prenatal complications',
        'Childhood trauma',
        'Substance abuse (cannabis, stimulants)',
        'Acute severe stress',
        'Social isolation',
        'Urban upbringing',
        'Immigration',
        'Male gender (slightly higher risk for poor prognosis)'
      ]),
      protectiveFactors: JSON.stringify([
        'Good prognostic features (acute onset, confusion, good premorbid functioning)',
        'Early treatment initiation',
        'Strong support system',
        'No substance abuse',
        'Medication adherence',
        'Psychosocial interventions',
        'Brief duration of untreated psychosis',
        'Absence of negative symptoms'
      ]),
      comorbidities: JSON.stringify([
        'Often converts to schizophrenia (about 2/3 of cases)',
        'Depression',
        'Anxiety disorders',
        'Substance use disorders (common)',
        'Post-traumatic stress disorder',
        'May progress to schizoaffective disorder',
        'Increased suicide risk during acute phase'
      ]),
      naturalSolutions: JSON.stringify([
        'Immediate antipsychotic medication (essential)',
        'Coordinated Specialty Care for first episode psychosis',
        'Cognitive Behavioral Therapy for psychosis (CBTp)',
        'Family education and support',
        'Social skills training',
        'Supported employment/education',
        'Case management',
        'Avoid all substances (especially cannabis, stimulants)',
        'Stress reduction techniques',
        'Regular sleep schedule',
        'Structured daily routine',
        'Social support and connection',
        'Occupational therapy',
        'Early intervention critical',
        'Monitor for progression to schizophrenia',
        'Psychoeducation about illness',
        'Relapse prevention planning',
        'Regular psychiatric follow-up',
        'Exercise and healthy lifestyle',
        'Ongoing medication even after symptom resolution'
      ]),
      nutritionalRecs: JSON.stringify([
        'Omega-3 fatty acids (may improve outcomes)',
        'B-complex vitamins (B12, folate)',
        'Vitamin D',
        'Antioxidants (vitamins C, E)',
        'Mediterranean diet pattern',
        'Regular, balanced meals',
        'Adequate protein for neurotransmitters',
        'Complex carbohydrates',
        'Limit sugar',
        'Stay well hydrated',
        'Avoid caffeine excess',
        'Absolutely no drugs or alcohol',
        'Probiotic foods',
        'Whole foods diet',
        'Monitor for metabolic effects of medications'
      ]),
      therapyApproaches: JSON.stringify([
        'Antipsychotic medications (first-line, essential):',
        '  - Atypical antipsychotics (risperidone, olanzapine, quetiapine, aripiprazole)',
        '  - Start as soon as possible',
        '  - Continue even after recovery to prevent relapse',
        'Coordinated Specialty Care (CSC) programs',
        'Cognitive Behavioral Therapy for psychosis (CBTp)',
        'Family therapy and education',
        'Supported employment/education',
        'Social skills training',
        'Individual supportive therapy',
        'Hospitalization if needed for safety',
        'Close monitoring for progression to schizophrenia',
        'Duration of treatment: Continue at least 12+ months',
        'Tapering medication only under close supervision'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Hallucinations or delusions',
        'Disorganized thinking or speech',
        'Bizarre or unusual behavior',
        'Paranoid thoughts',
        'Social withdrawal',
        'Inability to function in daily activities',
        'Suicidal or violent thoughts',
        'Not taking care of self',
        'Substance use',
        'Family concerned about behavior',
        'Rapid onset of symptoms',
        'Any psychotic symptoms - immediate evaluation needed'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'SAMHSA Early Serious Mental Illness Treatment Locator: samhsa.gov/esmi-treatment-locator',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Emergency: 911 (for immediate danger)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/schizophrenia',
        'https://www.psychiatry.org/patients-families/schizophrenia',
        'https://pubmed.ncbi.nlm.nih.gov/30840506/ - First episode psychosis treatment',
        'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/index.shtml - RAISE program'
      ]),
      dsmCriteria: JSON.stringify([
        'Two (or more) of the following for significant time during 1-month period:',
        '  1. Delusions',
        '  2. Hallucinations',
        '  3. Disorganized speech',
        '  4. Grossly disorganized or catatonic behavior',
        '  5. Negative symptoms',
        'At least one symptom must be delusions, hallucinations, or disorganized speech',
        'Episode lasts at least 1 month but less than 6 months',
        'Schizoaffective disorder and depressive/bipolar disorder with psychotic features ruled out',
        'Not attributable to substance use or medical condition',
        'If diagnosis made without waiting for recovery, specify "provisional"',
        'Specify if with good prognostic features:',
        '  - Onset of psychotic symptoms within 4 weeks of first noticeable behavior change',
        '  - Confusion or perplexity',
        '  - Good premorbid social and occupational functioning',
        '  - Absence of blunted or flat affect',
        'After 6 months, diagnosis changes to schizophrenia if symptoms persist'
      ])
    },
    // SLEEP-WAKE DISORDERS (Phase 3B)
    {
      slug: 'narcolepsy',
      name: 'Narcolepsy',
      category: 'Sleep-Wake Disorders',
      description: 'A chronic neurological disorder that affects the brain\'s ability to control sleep-wake cycles, characterized by excessive daytime sleepiness and sudden sleep attacks, often accompanied by cataplexy (sudden loss of muscle tone).',
      symptoms: JSON.stringify([
        'Excessive daytime sleepiness (EDS) - overwhelming need to sleep',
        'Sudden, uncontrollable sleep attacks during the day',
        'Cataplexy (sudden muscle weakness triggered by emotions) - Type 1 only',
        'Sleep paralysis (inability to move when falling asleep or waking)',
        'Hypnagogic hallucinations (vivid dreams when falling asleep)',
        'Hypnopompic hallucinations (vivid dreams when waking up)',
        'Disrupted nighttime sleep with frequent awakenings',
        'Automatic behaviors (performing tasks without awareness)',
        'Difficulty concentrating',
        'Memory problems',
        'Depression or mood changes',
        'Sudden head drops or jaw dropping',
        'Microsleeps (brief lapses into sleep)',
        'Difficulty maintaining wakefulness',
        'Refreshing brief naps (10-20 minutes)',
        'Symptoms worsen with monotonous activities',
        'May have REM sleep behavior disorder',
        'Weight gain (due to metabolic changes)',
        'Social and occupational impairment'
      ]),
      biologicalCauses: JSON.stringify([
        'Loss of hypocretin (orexin) neurons in hypothalamus (Type 1)',
        'Low or absent hypocretin levels in cerebrospinal fluid',
        'Autoimmune destruction of hypocretin-producing cells',
        'Genetic predisposition (HLA-DQB1*06:02 gene)',
        'Brain abnormalities in sleep-wake regulation centers',
        'Neurotransmitter imbalances (hypocretin, dopamine, histamine)',
        'Family history increases risk (1-2% if parent affected)',
        'May be triggered by infection (H1N1, strep throat)'
      ]),
      psychologicalCauses: JSON.stringify([
        'Not primarily psychological, but symptoms worsened by:',
        'Stress and anxiety',
        'Strong emotions (laughter, anger, excitement trigger cataplexy)',
        'Sleep deprivation',
        'Irregular sleep schedules',
        'Depression (common secondary effect)',
        'Frustration with limitations',
        'Social embarrassment about symptoms'
      ]),
      socialCauses: JSON.stringify([
        'Irregular work schedules or shift work',
        'Academic or work stress',
        'Social situations triggering cataplexy',
        'Lack of understanding from others',
        'Stigma around falling asleep inappropriately',
        'Difficulty maintaining employment',
        'Social isolation due to symptoms',
        'Reduced quality of life'
      ]),
      prevalence: 'Approximately 1 in 2,000 people (0.05%) in the US. Type 1 (with cataplexy) and Type 2 (without cataplexy) combined. Often undiagnosed or misdiagnosed for years.',
      ageOfOnset: 'Typically emerges in two peaks: ages 15-25 and ages 30-40. Can occur at any age but most common in adolescence and young adulthood. Average 10-15 year delay to diagnosis.',
      courseOfIllness: 'Chronic, lifelong condition. Symptoms typically stable after onset. Does not worsen over time but doesn\'t resolve. Treatment manages symptoms but doesn\'t cure. Cataplexy may improve slightly with age. Quality of life significantly improved with proper treatment.',
      riskFactors: JSON.stringify([
        'HLA-DQB1*06:02 genetic marker (90-95% of Type 1 cases)',
        'Family history of narcolepsy',
        'Autoimmune conditions',
        'Recent infection (H1N1, strep)',
        'Brain injury or tumor affecting hypothalamus',
        'Age 10-30 (peak onset)',
        'Positive family history (20-40 times higher risk)',
        'Stress or major life changes',
        'Sleep deprivation',
        'Caucasian or Asian ethnicity (slightly higher rates)'
      ]),
      protectiveFactors: JSON.stringify([
        'Early diagnosis and treatment',
        'Strict sleep schedule maintenance',
        'Scheduled naps throughout day',
        'Medication adherence',
        'Supportive family and employers',
        'Good sleep hygiene',
        'Stress management',
        'Education about condition'
      ]),
      comorbidities: JSON.stringify([
        'Depression (30-50%)',
        'Anxiety disorders',
        'Obesity (common due to metabolic changes)',
        'Obstructive sleep apnea',
        'REM sleep behavior disorder',
        'Type 2 diabetes',
        'Cardiovascular disease'
      ]),
      naturalSolutions: JSON.stringify([
        'Scheduled 15-20 minute naps (2-3 times daily)',
        'Strict sleep schedule (same bedtime/wake time)',
        'Avoid sleep deprivation',
        'Limit caffeine to morning hours',
        'Avoid alcohol and sedatives',
        'Regular exercise (but not close to bedtime)',
        'Light exposure in morning',
        'Dark, cool bedroom at night',
        'Avoid heavy meals before naps',
        'Alert employer/school about condition',
        'Safety precautions (avoid driving when sleepy)',
        'Join support groups',
        'Stress reduction techniques',
        'Set alarms for important activities',
        'Automatic behaviors: note-taking, recordings',
        'Education for family/friends about cataplexy triggers',
        'Avoid monotonous activities',
        'Break up tasks into shorter periods',
        'Strategic napping before important events',
        'Maintain healthy weight'
      ]),
      nutritionalRecs: JSON.stringify([
        'Small, frequent meals (avoid large meals causing sleepiness)',
        'Complex carbohydrates for sustained energy',
        'High-protein foods (support wakefulness)',
        'Omega-3 fatty acids',
        'Avoid high-sugar foods (crash effect)',
        'Light evening meal (aid nighttime sleep)',
        'Stay hydrated',
        'Vitamin B12',
        'Iron (if deficient)',
        'Avoid alcohol (worsens symptoms)',
        'Limit caffeine after noon',
        'Magnesium for sleep quality',
        'Balanced diet to prevent obesity',
        'Low glycemic index foods',
        'Regular meal times'
      ]),
      therapyApproaches: JSON.stringify([
        'Stimulant medications for daytime sleepiness:',
        '  - Modafinil (Provigil) - first-line',
        '  - Armodafinil (Nuvigil)',
        '  - Methylphenidate (Ritalin)',
        '  - Amphetamine salts (Adderall)',
        '  - Solriamfetol (Sunosi)',
        '  - Pitolisant (Wakix)',
        'Sodium oxybate (Xyrem) for cataplexy and EDS',
        'Antidepressants for cataplexy:',
        '  - Venlafaxine, fluoxetine (SSRIs/SNRIs)',
        'Scheduled napping strategy',
        'Cognitive behavioral therapy for depression',
        'Sleep hygiene counseling',
        'Vocational counseling',
        'Disability accommodations',
        'Patient education',
        'Support groups'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Excessive daytime sleepiness interfering with daily life',
        'Falling asleep at inappropriate times',
        'Sudden muscle weakness with emotions',
        'Sleep paralysis or vivid hallucinations',
        'Automatic behaviors without memory',
        'Difficulty staying awake while driving',
        'Disrupted nighttime sleep',
        'Brief, refreshing naps (suggests narcolepsy)',
        'Symptoms affecting work or school performance',
        'Depression or mood changes',
        'Family history of narcolepsy',
        'Symptoms emerged in teens/young adulthood'
      ]),
      crisisResources: JSON.stringify([
        'Narcolepsy Network: narcolepsynetwork.org or 1-888-292-6522',
        'Wake Up Narcolepsy: wakeupnarcolepsy.org',
        'Project Sleep: project-sleep.com',
        'Hypersomnia Foundation: hypersomniafoundation.org',
        '988 Suicide & Crisis Lifeline (for depression): 988',
        'National Sleep Foundation: sleepfoundation.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.ninds.nih.gov/health-information/disorders/narcolepsy',
        'https://www.nimh.nih.gov/health/topics/narcolepsy',
        'https://pubmed.ncbi.nlm.nih.gov/31300334/ - Narcolepsy treatment review',
        'https://www.sleepfoundation.org/narcolepsy'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent periods of irrepressible need to sleep, lapsing into sleep, or napping occurring within the same day',
        'Occurring at least 3 times per week over past 3 months',
        'Presence of at least one of the following:',
        '  1. Episodes of cataplexy (brief loss of muscle tone with laughter/emotions) - defines Type 1',
        '  2. Hypocretin deficiency (CSF levels ≤110 pg/mL or ≤1/3 of normal)',
        '  3. Polysomnography showing REM sleep latency ≤15 minutes or MSLT showing mean sleep latency ≤8 minutes and ≥2 SOREMPs',
        'Specify Type 1 (with cataplexy and/or low hypocretin) or Type 2 (without cataplexy, normal hypocretin)',
        'Specify severity: Mild, Moderate, or Severe based on frequency of cataplexy and degree of sleepiness',
        'Hypersomnolence not better explained by another sleep disorder, substance use, or medical condition',
        'Significant distress or impairment in functioning'
      ])
    },
    {
      slug: 'sleep-apnea',
      name: 'Sleep Apnea (Obstructive/Central)',
      category: 'Sleep-Wake Disorders',
      description: 'A serious sleep disorder characterized by repeated interruptions in breathing during sleep. Obstructive Sleep Apnea (OSA) occurs when throat muscles relax and block the airway; Central Sleep Apnea (CSA) occurs when the brain fails to send proper signals to breathing muscles.',
      symptoms: JSON.stringify([
        'Loud, chronic snoring (OSA)',
        'Observed breathing pauses during sleep',
        'Gasping or choking during sleep',
        'Excessive daytime sleepiness',
        'Morning headaches',
        'Difficulty concentrating',
        'Memory problems',
        'Irritability and mood changes',
        'Depression symptoms',
        'Night sweats',
        'Frequent nighttime urination',
        'Dry mouth or sore throat upon waking',
        'Insomnia or restless sleep',
        'Decreased libido',
        'High blood pressure',
        'Falling asleep during the day',
        'Difficulty staying asleep',
        'Awakening with shortness of breath (CSA)',
        'Daytime fatigue despite adequate sleep time'
      ]),
      biologicalCauses: JSON.stringify([
        'Obesity (major risk factor for OSA - excess tissue narrows airway)',
        'Anatomical factors (large tongue, tonsils, small jaw, narrow airway)',
        'Genetics (inherited anatomical features)',
        'Aging (loss of muscle tone in throat)',
        'Male sex (2-3x higher risk)',
        'Heart or neuromuscular disorders (CSA)',
        'Brain stem dysfunction (CSA)',
        'Hormonal factors (low thyroid, high growth hormone)'
      ]),
      psychologicalCauses: JSON.stringify([
        'Not primarily psychological, but affected by:',
        'Stress (can worsen symptoms)',
        'Anxiety about sleep',
        'Depression (bidirectional relationship)',
        'Cognitive impairment from poor sleep',
        'Fear of CPAP therapy (treatment non-adherence)',
        'Quality of life concerns',
        'Relationship stress due to snoring'
      ]),
      socialCauses: JSON.stringify([
        'Lifestyle factors (alcohol use relaxes throat muscles)',
        'Smoking (increases inflammation and fluid retention)',
        'Sedative medication use',
        'Sleep position (back sleeping worsens OSA)',
        'Irregular sleep schedule',
        'Lack of awareness or diagnosis',
        'Cultural factors (normalization of snoring)',
        'Economic barriers to treatment'
      ]),
      prevalence: 'OSA: Approximately 10-30% of adults, higher in men and older adults. Severe OSA: 3-7% of adults. CSA: Much less common, about 5-10% of sleep apnea cases. Often undiagnosed (80-90% of cases).',
      ageOfOnset: 'Can occur at any age including children, but risk increases with age. Peak prevalence: ages 40-70. OSA more common in middle-aged and older adults. CSA more common in older adults and those with heart conditions.',
      courseOfIllness: 'Progressive if untreated, especially with weight gain. Symptoms typically worsen over time. Significantly increases risk of cardiovascular disease, stroke, and early death. Treatment (CPAP, oral appliances) highly effective in managing symptoms. Weight loss can improve or resolve OSA.',
      riskFactors: JSON.stringify([
        'Obesity (strongest risk factor for OSA)',
        'Large neck circumference (>17" men, >16" women)',
        'Male sex (2-3x higher)',
        'Age over 40',
        'Family history',
        'Anatomical features (large tonsils, small jaw, thick neck)',
        'Alcohol or sedative use',
        'Smoking',
        'Nasal congestion or obstruction',
        'Medical conditions (heart failure, stroke, hypertension for CSA)'
      ]),
      protectiveFactors: JSON.stringify([
        'Healthy body weight (BMI <25)',
        'Regular exercise',
        'Sleeping on side (not back)',
        'Avoiding alcohol and sedatives',
        'Not smoking',
        'Treatment of nasal congestion',
        'Early diagnosis and treatment',
        'CPAP adherence'
      ]),
      comorbidities: JSON.stringify([
        'Hypertension (very common - 50-60%)',
        'Cardiovascular disease (heart attack, heart failure)',
        'Stroke (2-4x increased risk)',
        'Type 2 diabetes',
        'Metabolic syndrome',
        'Atrial fibrillation',
        'Depression (common)',
        'Anxiety disorders',
        'Gastroesophageal reflux disease (GERD)',
        'Chronic kidney disease'
      ]),
      naturalSolutions: JSON.stringify([
        'Weight loss (10% weight loss = 30% improvement in OSA)',
        'Sleep on side (not back) - positional therapy',
        'Elevate head of bed 4-6 inches',
        'Avoid alcohol 3-4 hours before bed',
        'Quit smoking',
        'Regular exercise (improves even without weight loss)',
        'Treat nasal congestion (nasal strips, saline rinse)',
        'Avoid sedatives and muscle relaxants',
        'Maintain regular sleep schedule',
        'Good sleep hygiene',
        'Throat and tongue exercises (myofunctional therapy)',
        'Play didgeridoo or sing (strengthens throat muscles)',
        'Avoid heavy meals before bed',
        'Oral appliances (dentist-fitted mouthguards)',
        'Nasal dilators',
        'Humidify bedroom air',
        'Tennis ball sewn in back of pajamas (prevent back sleeping)',
        'Treat underlying allergies',
        'Monitor blood pressure',
        'Stay hydrated'
      ]),
      nutritionalRecs: JSON.stringify([
        'Calorie reduction for weight loss if overweight',
        'Mediterranean diet pattern',
        'Avoid heavy meals 2-3 hours before bed',
        'Limit alcohol especially evening',
        'Reduce inflammatory foods (processed, fried)',
        'Anti-inflammatory diet (fruits, vegetables, whole grains)',
        'Omega-3 fatty acids',
        'Magnesium-rich foods',
        'Avoid caffeine after noon',
        'Stay hydrated',
        'Avoid excess salt (reduces fluid retention)',
        'Smaller, more frequent meals',
        'Foods supporting weight loss',
        'High fiber diet',
        'Adequate protein'
      ]),
      therapyApproaches: JSON.stringify([
        'CPAP (Continuous Positive Airway Pressure) - gold standard for moderate-severe OSA',
        'BiPAP (Bilevel Positive Airway Pressure) for some patients',
        'Auto-CPAP (adjusts pressure automatically)',
        'Oral appliances (mandibular advancement devices) - mild-moderate OSA',
        'Weight loss programs (comprehensive approach)',
        'Positional therapy devices',
        'Surgery (severe cases):',
        '  - UPPP (uvulopalatopharyngoplasty)',
        '  - Tonsillectomy/adenoidectomy',
        '  - Maxillomandibular advancement',
        '  - Hypoglossal nerve stimulation',
        'Treatment of underlying conditions (heart failure for CSA)',
        'Adaptive servo-ventilation (ASV) for CSA',
        'Oxygen therapy (supplemental for CSA)',
        'Lifestyle modification counseling',
        'Sleep hygiene education',
        'CPAP adherence support and troubleshooting'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Loud snoring with gasping or choking',
        'Partner observes breathing pauses',
        'Excessive daytime sleepiness',
        'Falling asleep during the day',
        'Morning headaches',
        'High blood pressure (especially resistant)',
        'Difficulty concentrating',
        'Irritability or mood changes',
        'Waking with shortness of breath',
        'Frequent nighttime urination',
        'Witnessed apneas (breathing stops)',
        'Symptoms affecting work or driving safety'
      ]),
      crisisResources: JSON.stringify([
        'American Sleep Apnea Association: sleepapnea.org or 1-888-293-3650',
        'National Sleep Foundation: sleepfoundation.org',
        'AWHONN (Obstructive Sleep Apnea): awhonn.org',
        'Sleep apnea support groups: CPAP.com/community',
        'American Academy of Sleep Medicine: sleepeducation.org',
        'Emergency: 911 (for severe breathing problems)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nhlbi.nih.gov/health/sleep-apnea',
        'https://www.sleepfoundation.org/sleep-apnea',
        'https://pubmed.ncbi.nlm.nih.gov/31300334/ - Sleep apnea treatment',
        'https://www.thoracic.org/patients/patient-resources/resources/sleep-apnea.pdf'
      ]),
      dsmCriteria: JSON.stringify([
        'Evidence by polysomnography of at least 5 obstructive apneas or hypopneas per hour of sleep AND either:',
        '  - Nocturnal breathing disturbances (snoring, gasping, breathing pauses), OR',
        '  - Daytime sleepiness, fatigue, or unrefreshing sleep despite sufficient sleep opportunity',
        'OR: Evidence by polysomnography of ≥15 obstructive apneas and/or hypopneas per hour regardless of symptoms',
        'For Central Sleep Apnea:',
        '  - Evidence by polysomnography of ≥5 central apneas per hour',
        '  - Central apneas and hypopneas account for >50% of total apneas/hypopneas',
        'Specify severity:',
        '  - Mild: 5-15 events/hour',
        '  - Moderate: 15-30 events/hour',
        '  - Severe: >30 events/hour',
        'Disturbance not better explained by another sleep disorder, substance use, or medical condition (unless comorbid)'
      ])
    },
    {
      slug: 'restless-legs-syndrome',
      name: 'Restless Legs Syndrome (RLS)',
      category: 'Sleep-Wake Disorders',
      description: 'A neurological disorder characterized by an irresistible urge to move the legs, usually accompanied by uncomfortable sensations. Symptoms typically worsen during rest and in the evening/night, interfering with sleep.',
      symptoms: JSON.stringify([
        'Irresistible urge to move legs',
        'Uncomfortable leg sensations (crawling, creeping, tingling, pulling, throbbing)',
        'Symptoms begin or worsen during rest or inactivity',
        'Symptoms worse in evening or at night',
        'Temporary relief with movement (walking, stretching, rubbing)',
        'Difficulty falling asleep',
        'Frequent nighttime awakenings',
        'Daytime fatigue and sleepiness',
        'Involuntary leg movements during sleep (periodic limb movements)',
        'Difficulty sitting for long periods (movies, flights, meetings)',
        'Symptoms may occur in arms (less common)',
        'Anxiety about sleep',
        'Impaired concentration',
        'Mood disturbances',
        'Symptoms may fluctuate in severity',
        'Worse during pregnancy',
        'Exhaustion from sleep deprivation',
        'Restless behavior',
        'Partner\'s sleep may be disturbed'
      ]),
      biologicalCauses: JSON.stringify([
        'Iron deficiency (low brain iron affects dopamine)',
        'Dopamine dysregulation in brain',
        'Genetic factors (40-60% have family history)',
        'Peripheral neuropathy',
        'Spinal cord conditions',
        'Pregnancy (especially 3rd trimester, usually resolves postpartum)',
        'Kidney disease/kidney failure',
        'Multiple sclerosis or Parkinson\'s disease'
      ]),
      psychologicalCauses: JSON.stringify([
        'Not primarily psychological, but symptoms affected by:',
        'Stress and anxiety (worsen symptoms)',
        'Depression (bidirectional relationship)',
        'Sleep anxiety and anticipatory worry',
        'Frustration with symptoms',
        'Hyperarousal at bedtime',
        'Anxiety about not sleeping',
        'Fatigue from sleep deprivation'
      ]),
      socialCauses: JSON.stringify([
        'Caffeine consumption (worsens symptoms)',
        'Alcohol use (can worsen symptoms)',
        'Smoking/nicotine (exacerbates RLS)',
        'Sedentary lifestyle',
        'Medications (antidepressants, antihistamines, antipsychotics worsen RLS)',
        'Irregular sleep schedule',
        'Social embarrassment about fidgeting',
        'Difficulty in social situations requiring stillness'
      ]),
      prevalence: 'Affects 5-10% of adults in US/Europe. About 2-3% have moderate to severe symptoms requiring treatment. More common in women (2:1 ratio). Increases with age. Primary RLS most common; secondary RLS from other conditions.',
      ageOfOnset: 'Can occur at any age, including childhood. Primary RLS often begins before age 40. Severity typically increases with age. Secondary RLS can begin at any age depending on underlying cause. Symptoms may appear during pregnancy.',
      courseOfIllness: 'Primary RLS: Chronic, progressive condition. Symptoms may wax and wane but generally worsen over time. May have remission periods, especially in milder cases. Secondary RLS: May improve with treatment of underlying condition. Pregnancy-related RLS usually resolves after delivery. Earlier onset typically predicts more severe, progressive course.',
      riskFactors: JSON.stringify([
        'Family history (40-60% genetic)',
        'Female sex (2x risk)',
        'Pregnancy (especially 3rd trimester)',
        'Iron deficiency or anemia',
        'Chronic kidney disease',
        'Diabetes',
        'Peripheral neuropathy',
        'Older age',
        'Certain medications (SSRIs, antipsychotics, antihistamines)',
        'Smoking or alcohol use'
      ]),
      protectiveFactors: JSON.stringify([
        'Adequate iron levels (ferritin >75 ng/mL)',
        'Regular moderate exercise',
        'Good sleep hygiene',
        'Avoiding triggers (caffeine, alcohol, nicotine)',
        'Stress management',
        'Early diagnosis and treatment',
        'Healthy lifestyle',
        'Magnesium sufficiency'
      ]),
      comorbidities: JSON.stringify([
        'Periodic limb movement disorder (PLMD) - 80-90%',
        'Insomnia (very common)',
        'Depression (common due to sleep deprivation)',
        'Anxiety disorders',
        'Hypertension',
        'Cardiovascular disease',
        'Peripheral neuropathy'
      ]),
      naturalSolutions: JSON.stringify([
        'Iron supplementation (if ferritin <75 ng/mL)',
        'Moderate regular exercise (avoid vigorous exercise close to bedtime)',
        'Leg massage or self-massage',
        'Hot or cold compresses on legs',
        'Hot bath or shower before bed',
        'Pneumatic compression devices',
        'Stretching exercises (yoga, calf stretches)',
        'Walking or pacing when symptoms occur',
        'Avoid caffeine (especially afternoon/evening)',
        'Eliminate or reduce alcohol',
        'Quit smoking',
        'Good sleep hygiene (regular schedule, cool dark room)',
        'Engage mind during rest (crosswords, video games)',
        'Vibrating pad on legs',
        'Weighted blanket',
        'Stress reduction (meditation, relaxation)',
        'Keep sleep diary to identify triggers',
        'Avoid antihistamines and antidepressants if possible',
        'Regular sleep-wake schedule',
        'Mental alertness activities in evening'
      ]),
      nutritionalRecs: JSON.stringify([
        'Iron-rich foods (red meat, spinach, lentils) if deficient',
        'Vitamin C to enhance iron absorption',
        'Folate (leafy greens, fortified grains)',
        'Magnesium-rich foods (nuts, seeds, whole grains)',
        'Vitamin D',
        'B vitamins (especially B12)',
        'Avoid caffeine (coffee, tea, chocolate, soda)',
        'Limit alcohol',
        'Balanced diet',
        'Stay hydrated',
        'Consider iron supplement (consult doctor for dosing)',
        'Magnesium supplement (200-400mg)',
        'Avoid large meals close to bedtime',
        'Anti-inflammatory diet',
        'Omega-3 fatty acids'
      ]),
      therapyApproaches: JSON.stringify([
        'Iron supplementation (if ferritin <75 ng/mL) - can be very effective',
        'Dopamine agonists (first-line for moderate-severe):',
        '  - Pramipexole (Mirapex)',
        '  - Ropinirole (Requip)',
        '  - Rotigotine patch (Neupro)',
        'Alpha-2-delta calcium channel ligands:',
        '  - Gabapentin (effective, fewer side effects than dopamine agonists)',
        '  - Pregabalin (Lyrica)',
        '  - Gabapentin enacarbil (Horizant)',
        'Opioids (for severe refractory cases):',
        '  - Low-dose oxycodone or methadone',
        'Benzodiazepines (for sleep):',
        '  - Clonazepam (Klonopin)',
        'Treatment of underlying conditions (kidney disease, iron deficiency)',
        'Pneumatic compression therapy',
        'Cognitive behavioral therapy for insomnia (CBT-I)',
        'Avoid medications that worsen RLS',
        'Regular monitoring of iron levels'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Symptoms interfere with sleep regularly',
        'Daytime fatigue affecting functioning',
        'Unable to sit comfortably for extended periods',
        'Symptoms worsening or increasing in frequency',
        'Depression or anxiety developing',
        'Difficulty concentrating at work',
        'Symptoms not responding to lifestyle changes',
        'Considering pregnancy (medication management needed)',
        'Symptoms occur daily or most nights',
        'Quality of life significantly impacted',
        'Partner\'s sleep disturbed by your movements',
        'Suspected iron deficiency'
      ]),
      crisisResources: JSON.stringify([
        'Restless Legs Syndrome Foundation: rls.org or (512) 366-9109',
        'Willis-Ekbom Disease Foundation: rls.org',
        'RLS support groups: rls.org/support-groups',
        'National Sleep Foundation: sleepfoundation.org',
        'Sleep specialist locator: sleepeducation.org',
        'Iron Disorders Institute: irondisorders.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.ninds.nih.gov/health-information/disorders/restless-legs-syndrome',
        'https://www.sleepfoundation.org/restless-legs-syndrome',
        'https://pubmed.ncbi.nlm.nih.gov/33507879/ - RLS treatment guidelines',
        'https://www.rls.org/'
      ]),
      dsmCriteria: JSON.stringify([
        'Urge to move legs, usually accompanied by or in response to uncomfortable sensations',
        'Urge to move or sensations begin or worsen during periods of rest or inactivity',
        'Urge to move or sensations are partially or totally relieved by movement',
        'Urge to move or sensations are worse in the evening or at night than during the day, or occur only in evening/night',
        'Symptoms not solely accounted for by another condition (leg cramps, positional discomfort, leg edema, arthritis)',
        'Symptoms cause significant distress or impairment in functioning',
        'Symptoms occur at least 3 times per week and have persisted for at least 3 months',
        'Symptoms not attributable to another mental disorder, substance, or medical condition',
        'Specify if with periodic limb movements during sleep (common comorbidity)'
      ])
    },
    // PSYCHOTIC DISORDERS (Phase 3B - continued)
    {
      slug: 'brief-psychotic-disorder',
      name: 'Brief Psychotic Disorder',
      category: 'Psychotic Disorders',
      description: 'A mental health condition characterized by a sudden, short-term episode of psychotic symptoms (delusions, hallucinations, disorganized speech/behavior) lasting 1 day to 1 month, with eventual full return to premorbid functioning.',
      symptoms: JSON.stringify([
        'Delusions (fixed false beliefs)',
        'Hallucinations (usually auditory - hearing voices)',
        'Disorganized speech (incoherent, jumping between topics)',
        'Grossly disorganized or catatonic behavior',
        'Sudden onset (develops within 2 weeks)',
        'Emotional turmoil or confusion',
        'Rapid shifts in mood',
        'Paranoia or suspiciousness',
        'Agitation or restlessness',
        'Bizarre behavior',
        'Inappropriate affect',
        'Difficulty with reality testing',
        'Social withdrawal',
        'Poor self-care',
        'Sleep disturbances',
        'Symptoms last at least 1 day but less than 1 month',
        'Complete return to normal functioning',
        'May occur following severe stress or trauma'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic vulnerability to psychosis',
        'Neurotransmitter imbalances (dopamine, glutamate)',
        'Brain structure variations',
        'Hormonal changes (postpartum period)',
        'Sleep deprivation',
        'Medical conditions affecting brain',
        'Substance use (can trigger in vulnerable individuals)',
        'Neuroinflammation or immune response'
      ]),
      psychologicalCauses: JSON.stringify([
        'Severe acute psychological stress',
        'Overwhelming trauma or loss',
        'Major life transitions',
        'Inability to cope with stressor',
        'Pre-existing anxiety or mood issues',
        'Dissociation as coping mechanism',
        'Loss of reality testing under extreme stress',
        'Vulnerability to psychotic thinking patterns'
      ]),
      socialCauses: JSON.stringify([
        'Acute severe life stressors (death, disaster, assault)',
        'Major psychosocial stressor or trauma',
        'Social isolation or loneliness',
        'Cultural displacement or immigration stress',
        'Lack of social support during crisis',
        'War, violence, or disaster exposure',
        'Relationship rupture or betrayal',
        'Postpartum period (especially if with marked stressor)'
      ]),
      prevalence: 'Relatively rare. Estimated 0.05% annual incidence (5 in 10,000 people per year). More common in women (2:1 ratio). Often occurs following trauma or major stress. Accounts for 2-7% of first-episode psychosis cases.',
      ageOfOnset: 'Can occur at any age but typically late teens to mid-30s. Average age 30-35. Postpartum-onset within 4 weeks of childbirth. Earlier onset may predict higher risk of recurrence or progression to other disorders.',
      courseOfIllness: 'By definition, episode lasts 1 day to 1 month. Full return to premorbid (normal) functioning expected. Most recover within days to weeks. About 50-80% have only one episode. Recurrence risk: 20-50% may have another brief episode or develop chronic disorder (schizophrenia, mood disorder with psychosis). With marked stressor, prognosis better. Early treatment improves outcomes.',
      riskFactors: JSON.stringify([
        'Major acute stressor or trauma',
        'Female sex (especially postpartum)',
        'Family history of psychotic disorders',
        'Previous brief psychotic episode',
        'Personality disorders (especially Cluster A)',
        'Recent immigration or cultural displacement',
        'Sleep deprivation',
        'Substance use',
        'Prior trauma history',
        'Young to mid-adulthood age'
      ]),
      protectiveFactors: JSON.stringify([
        'Presence of clear precipitating stressor (better prognosis)',
        'Good premorbid functioning',
        'Rapid treatment initiation',
        'Strong social support',
        'No substance abuse',
        'Older age of onset',
        'Brief duration of symptoms',
        'Absence of family history of schizophrenia'
      ]),
      comorbidities: JSON.stringify([
        'May progress to schizophreniform disorder or schizophrenia (20-30%)',
        'Mood disorders (depression, bipolar) with psychotic features',
        'PTSD (if stressor was traumatic)',
        'Personality disorders',
        'Substance use disorders',
        'Anxiety disorders',
        'Increased suicide risk during acute phase'
      ]),
      naturalSolutions: JSON.stringify([
        'Immediate antipsychotic medication (essential for acute phase)',
        'Benzodiazepines for severe agitation',
        'Hospitalization if needed for safety',
        'Remove or reduce stressor if possible',
        'Ensure safety (remove dangerous items)',
        'Supportive psychotherapy',
        'Family education and support',
        'Stress reduction after recovery',
        'Gradual return to activities',
        'Monitor for symptom recurrence',
        'Adequate sleep restoration',
        'Avoid substances (drugs, alcohol)',
        'Crisis intervention services',
        'Case management',
        'Structured daily routine after recovery',
        'Psychoeducation about warning signs',
        'Develop coping strategies for stress',
        'Regular psychiatric follow-up',
        'Trauma therapy if stressor was traumatic',
        'Medication may be tapered after recovery under supervision'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, regular meals',
        'Omega-3 fatty acids (brain health)',
        'B vitamins (B12, folate)',
        'Vitamin D',
        'Antioxidants (fruits, vegetables)',
        'Adequate protein',
        'Complex carbohydrates',
        'Stay well hydrated',
        'Avoid caffeine (can increase agitation)',
        'Absolutely no drugs or alcohol',
        'Magnesium (calming effect)',
        'Probiotic foods (gut-brain axis)',
        'Regular meal times',
        'Limit sugar',
        'Whole foods diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Antipsychotic medications (short-term, essential):',
        '  - Atypical antipsychotics (risperidone, olanzapine, quetiapine, aripiprazole)',
        '  - Low doses often effective',
        '  - Duration: 1-6 months typically',
        'Benzodiazepines for acute agitation (lorazepam, clonazepam)',
        'Hospitalization if danger to self/others or unable to care for self',
        'Supportive psychotherapy after acute phase',
        'Cognitive Behavioral Therapy (CBT)',
        'Family therapy and psychoeducation',
        'Stress management techniques',
        'Trauma-focused therapy if appropriate',
        'Monitor for recurrence or progression',
        'Medication tapering only under close supervision',
        'Crisis intervention',
        'Coordinated care approach'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Hallucinations or delusions',
        'Disorganized thinking or speech',
        'Bizarre or dangerous behavior',
        'Paranoid thoughts',
        'Confusion about reality',
        'Suicidal or violent thoughts',
        'Inability to care for self',
        'Following major trauma or stressor',
        'Severe agitation',
        'Not eating or sleeping',
        'Family concerned about safety',
        'ANY psychotic symptoms require immediate evaluation'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'Emergency: 911 (for immediate danger)',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Local psychiatric emergency services or crisis center'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/schizophrenia',
        'https://www.psychiatry.org/patients-families/psychotic-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/30840506/ - Brief psychotic disorder treatment',
        'https://www.ncbi.nlm.nih.gov/books/NBK519704/ - Brief Psychotic Disorder Overview'
      ]),
      dsmCriteria: JSON.stringify([
        'Presence of one (or more) of the following symptoms (at least one must be 1, 2, or 3):',
        '  1. Delusions',
        '  2. Hallucinations',
        '  3. Disorganized speech',
        '  4. Grossly disorganized or catatonic behavior',
        'Duration of episode at least 1 day but less than 1 month',
        'Eventual full return to premorbid level of functioning',
        'Not better explained by major depressive or bipolar disorder with psychotic features, or another psychotic disorder (e.g., schizophrenia, catatonia)',
        'Not attributable to physiological effects of substance or medical condition',
        'Specify if:',
        '  - With marked stressor(s) (brief reactive psychosis) - better prognosis',
        '  - Without marked stressor(s)',
        '  - With postpartum onset (within 4 weeks postpartum)',
        'Specify current severity'
      ])
    },
    // DISSOCIATIVE DISORDERS (Phase 3B)
    {
      slug: 'depersonalization-derealization-disorder',
      name: 'Depersonalization/Derealization Disorder',
      category: 'Dissociative Disorders',
      description: 'A dissociative disorder characterized by persistent or recurrent experiences of feeling detached from one\'s mental processes or body (depersonalization) and/or feeling that the external world is unreal or dreamlike (derealization).',
      symptoms: JSON.stringify([
        'Feeling detached from yourself (like observing from outside your body)',
        'Feeling like a robot or in a dream',
        'Emotional numbness or blunted emotions',
        'Feeling like your thoughts or actions aren\'t your own',
        'Sensations of being unreal or altered',
        'Surroundings seem unreal, dreamlike, or distorted (derealization)',
        'Visual distortions (objects appear wrong size, color, or distance)',
        'Time distortion (too fast or too slow)',
        'Feeling disconnected from memories',
        'Auditory distortions (sounds muffled or enhanced)',
        'Environment seems flat, lifeless, or like looking through fog',
        'Recognition of people feels strange or unfamiliar',
        'Symptoms are persistent or recurrent',
        'Reality testing remains intact (know it\'s not real)',
        'Significant distress or impairment',
        'Anxiety about symptoms',
        'Depression common',
        'Difficulty concentrating',
        'May have body image distortions'
      ]),
      biologicalCauses: JSON.stringify([
        'Neurological abnormalities in sensory cortex and limbic system',
        'Dysregulation of hypothalamic-pituitary-adrenal (HPA) axis',
        'Altered brain activation patterns (temporal cortex, prefrontal cortex)',
        'Neurotransmitter imbalances (serotonin, glutamate, opioid systems)',
        'Reduced emotional responsiveness in amygdala',
        'Abnormal sensory processing',
        'Genetic predisposition (may run in families)',
        'Disrupted integration of sensory and emotional information'
      ]),
      psychologicalCauses: JSON.stringify([
        'Defense mechanism against trauma or severe stress',
        'Emotional detachment as coping strategy',
        'Childhood emotional abuse or neglect (common)',
        'Severe stress or anxiety',
        'Difficulty processing overwhelming emotions',
        'Intrusive thoughts or catastrophic thinking',
        'Hypervigilance to bodily or environmental changes',
        'Anxiety sensitivity (fear of anxiety symptoms)'
      ]),
      socialCauses: JSON.stringify([
        'Childhood trauma (emotional abuse especially)',
        'Witnessing violence or traumatic events',
        'Severe stress or life transitions',
        'Social isolation or lack of attachment',
        'Invalidating family environment',
        'Substance use (can trigger or worsen)',
        'Major life stressors',
        'Lack of emotional support in childhood'
      ]),
      prevalence: 'Approximately 1-2% of general population. Transient episodes (depersonalization/derealization) much more common (up to 75% experience once). Chronic form relatively rare. Equal rates in men and women. Often begins in adolescence (average age 16).',
      ageOfOnset: 'Typically begins in adolescence or early adulthood. Mean age of onset around 16 years (can range from early teens to 30s). Rarely begins after age 40. Early-onset common with childhood trauma. May have gradual or sudden onset.',
      courseOfIllness: 'Chronic condition with waxing and waning symptoms. Episodes may be continuous or episodic. May last minutes to years. About 1/3 experience episodic symptoms, 1/3 continuous, 1/3 continuous with exacerbations. Symptoms often triggered or worsened by stress, fatigue, or sensory stimulation. Can be disabling if severe. Treatment can significantly reduce symptoms.',
      riskFactors: JSON.stringify([
        'Childhood emotional abuse or neglect',
        'Trauma exposure (especially interpersonal trauma)',
        'Severe stress or anxiety',
        'Other mental health conditions (depression, anxiety, PTSD)',
        'Substance use',
        'Family history of dissociative disorders',
        'Adolescence or young adulthood',
        'Panic disorder or panic attacks',
        'Avoidant or anxious personality traits',
        'Recent significant life stressor'
      ]),
      protectiveFactors: JSON.stringify([
        'Secure early attachments',
        'Absence of trauma history',
        'Strong social support',
        'Good emotion regulation skills',
        'Early treatment',
        'Stress management skills',
        'Healthy coping strategies',
        'Supportive relationships'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (very common, 60-80%)',
        'Depression (50-70%)',
        'Panic disorder',
        'PTSD',
        'Personality disorders (especially avoidant, borderline)',
        'Substance use disorders',
        'OCD'
      ]),
      naturalSolutions: JSON.stringify([
        'Grounding techniques (5-4-3-2-1 sensory awareness)',
        'Mindfulness meditation (non-judgmental awareness)',
        'Reality orientation strategies',
        'Physical exercise (reconnect with body)',
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Engage senses intentionally (ice, strong smells, music)',
        'Keep routine and structure',
        'Adequate sleep',
        'Reduce caffeine and stimulants',
        'Avoid recreational drugs and alcohol',
        'Stress management',
        'Yoga or tai chi',
        'Journaling',
        'Social connection',
        'Limit rumination about symptoms',
        'Accept feelings without fear',
        'Cognitive restructuring (challenge catastrophic thoughts)',
        'Distraction techniques',
        'Safe, supportive relationships'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, regular meals',
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Magnesium (calming)',
        'Vitamin D',
        'Limit caffeine (can worsen symptoms)',
        'Avoid alcohol and drugs',
        'Complex carbohydrates',
        'Adequate protein',
        'Stay hydrated',
        'Limit sugar (blood sugar stability)',
        'Anti-inflammatory diet',
        'Probiotic foods',
        'Regular meal times',
        'Whole foods diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - first-line treatment',
        'Psychodynamic therapy',
        'EMDR (Eye Movement Desensitization and Reprocessing)',
        'Grounding and reorientation techniques',
        'Mindfulness-based therapies',
        'Trauma-focused therapy (if trauma history)',
        'Acceptance and Commitment Therapy (ACT)',
        'Medications (no FDA-approved, but may help comorbid conditions):',
        '  - SSRIs/SNRIs for depression/anxiety',
        '  - Lamotrigine (mood stabilizer, some evidence)',
        '  - Naltrexone (opioid antagonist, some evidence)',
        '  - Clonazepam (for anxiety, short-term)',
        'Psychoeducation about dissociation',
        'Stress management training',
        'Emotion regulation skills'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Persistent or recurrent feelings of unreality',
        'Feeling detached from yourself',
        'Symptoms cause significant distress',
        'Impairment in work, school, or relationships',
        'Depression or suicidal thoughts',
        'Difficulty functioning in daily life',
        'Symptoms triggered by or following trauma',
        'Severe anxiety about symptoms',
        'Substance use to cope',
        'Symptoms worsening or not improving',
        'Interference with normal activities',
        'Comorbid mental health conditions'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'International Society for the Study of Trauma and Dissociation (ISSTD): isst-d.org',
        'National Alliance on Mental Illness (NAMI): 1-800-950-6264',
        'Sidran Institute (trauma and dissociation): sidran.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/dissociative-disorders',
        'https://www.psychiatry.org/patients-families/dissociative-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/24071028/ - Depersonalization disorder review',
        'https://www.isst-d.org/ - International Society for Study of Trauma and Dissociation'
      ]),
      dsmCriteria: JSON.stringify([
        'Persistent or recurrent experiences of depersonalization, derealization, or both:',
        '  - Depersonalization: Experiences of unreality, detachment, or being an outside observer of one\'s thoughts, feelings, sensations, body, or actions',
        '  - Derealization: Experiences of unreality or detachment with respect to surroundings (individuals or objects experienced as unreal, dreamlike, foggy, lifeless, or visually distorted)',
        'During depersonalization/derealization experiences, reality testing remains intact',
        'Symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning',
        'Disturbance not attributable to physiological effects of substance (drug of abuse, medication) or another medical condition (e.g., seizures)',
        'Disturbance not better explained by another mental disorder (e.g., schizophrenia, panic disorder, PTSD, acute stress disorder, major depressive disorder, another dissociative disorder)',
        'Specify if depersonalization-predominant or derealization-predominant',
        'Most commonly begins in adolescence; rarely begins after age 40'
      ])
    },
    {
      slug: 'dissociative-amnesia',
      name: 'Dissociative Amnesia',
      category: 'Dissociative Disorders',
      description: 'A dissociative disorder characterized by an inability to recall important personal information, usually of a traumatic or stressful nature, that is too extensive to be explained by ordinary forgetfulness. May include localized, selective, or generalized amnesia.',
      symptoms: JSON.stringify([
        'Inability to recall important personal information (usually traumatic events)',
        'Memory gaps about specific time periods',
        'Gaps inconsistent with ordinary forgetting',
        'Localized amnesia (unable to recall specific event or time period)',
        'Selective amnesia (can recall some but not all of an event)',
        'Generalized amnesia (rare - complete loss of life history and identity)',
        'Systematized amnesia (memory loss for specific category - a person, place)',
        'Confusion about identity (in severe cases)',
        'May have dissociative fugue (rare - sudden travel with amnesia of past)',
        'Awareness that time is "missing"',
        'Finding evidence of actions you don\'t remember',
        'Being told about behaviors you don\'t recall',
        'Distress about memory gaps',
        'Difficulty with daily functioning',
        'Depression or anxiety',
        'Suicidal thoughts (common)',
        'Sense of detachment',
        'Emotional numbness',
        'May alternate between amnesia and sudden memory recovery'
      ]),
      biologicalCauses: JSON.stringify([
        'Neurobiological response to trauma (altered memory encoding)',
        'Changes in hippocampus and amygdala during trauma',
        'Stress hormone effects on memory (cortisol, norepinephrine)',
        'Altered brain activation patterns during dissociation',
        'Disrupted memory consolidation processes',
        'Genetic vulnerability to dissociation',
        'Neurochemical changes during overwhelming stress',
        'Brain\'s protective mechanism against unbearable information'
      ]),
      psychologicalCauses: JSON.stringify([
        'Defense mechanism against traumatic memories',
        'Psychological escape from unbearable reality',
        'Childhood trauma (especially sexual or physical abuse)',
        'Overwhelming stress or emotional pain',
        'Conflict between experienced event and self-concept',
        'Inability to integrate traumatic experience',
        'Severe psychological shock',
        'Guilt or shame about traumatic event'
      ]),
      socialCauses: JSON.stringify([
        'Severe trauma (combat, assault, abuse, disaster)',
        'Childhood abuse (physical, sexual, emotional)',
        'Witnessing violence or death',
        'Natural disasters or accidents',
        'War or combat exposure',
        'Kidnapping or captivity',
        'Relationship trauma or betrayal',
        'Lack of social support after trauma'
      ]),
      prevalence: 'Approximately 1.8-7% of general population. Much higher in trauma-exposed populations. More common than previously thought. Dissociative fugue subtype is rare. More frequently diagnosed in women. Often co-occurs with other trauma-related conditions.',
      ageOfOnset: 'Can occur at any age. Often follows traumatic event at any life stage. Childhood abuse may lead to amnesia that persists or emerges in adulthood. Combat veterans may develop amnesia during or after service. Sudden onset typically follows acute trauma. May not be recognized until years after traumatic event.',
      courseOfIllness: 'Variable course. May be single episode or recurrent. Localized/selective amnesia: Some recover memories spontaneously over time, others with therapy. Generalized amnesia: Usually resolves but may have residual gaps. Dissociative fugue: Typically brief (hours to days), full recovery common. Chronic amnesia possible with repeated trauma. Treatment can facilitate memory recovery (though not always the goal). Some memories may never return.',
      riskFactors: JSON.stringify([
        'Severe trauma exposure (especially childhood)',
        'Physical or sexual abuse',
        'Combat or war exposure',
        'Natural disaster or serious accident',
        'History of other dissociative symptoms',
        'Other mental health conditions (PTSD, depression)',
        'Family history of dissociative disorders',
        'High dissociative capacity',
        'Inadequate coping strategies',
        'Lack of social support'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong social support after trauma',
        'Early trauma intervention',
        'Effective coping strategies',
        'Resilience factors',
        'Safe, stable environment',
        'Access to mental health treatment',
        'Absence of repeated trauma',
        'Supportive relationships'
      ]),
      comorbidities: JSON.stringify([
        'Post-Traumatic Stress Disorder (PTSD) - very common',
        'Major Depressive Disorder (common)',
        'Anxiety disorders',
        'Substance use disorders',
        'Other dissociative disorders',
        'Personality disorders (especially borderline)',
        'Suicidal ideation (common)',
        'Self-harm behaviors'
      ]),
      naturalSolutions: JSON.stringify([
        'Trauma-focused psychotherapy (essential)',
        'Create safe, stable environment',
        'Establish therapeutic relationship with specialist',
        'Grounding techniques',
        'Stress reduction',
        'Journaling (document present experiences)',
        'Photography or recording (to aid memory continuity)',
        'Safety planning',
        'Gradual, controlled memory work (with therapist)',
        'Support groups for trauma survivors',
        'Adequate sleep',
        'Regular routine',
        'Avoid re-traumatization',
        'Self-compassion practices',
        'Mindfulness (present-focused)',
        'Avoid substances (drugs, alcohol)',
        'Build trusting relationships',
        'Physical exercise',
        'Creative expression',
        'Patience with memory recovery process'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet',
        'Omega-3 fatty acids (brain health)',
        'B-complex vitamins (especially B12)',
        'Antioxidants (fruits, vegetables)',
        'Adequate protein',
        'Complex carbohydrates',
        'Magnesium (stress reduction)',
        'Vitamin D',
        'Stay well hydrated',
        'Avoid alcohol (can worsen dissociation and memory)',
        'Limit caffeine',
        'Regular meals (blood sugar stability)',
        'Anti-inflammatory foods',
        'Probiotic foods',
        'Whole foods diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Trauma-focused psychotherapy:',
        '  - Trauma-focused CBT',
        '  - EMDR (Eye Movement Desensitization and Reprocessing)',
        '  - Narrative exposure therapy',
        'Psychodynamic therapy',
        'Hypnotherapy (controversial, must be done carefully)',
        'Phase-oriented treatment:',
        '  - Phase 1: Safety and stabilization',
        '  - Phase 2: Memory processing (if appropriate)',
        '  - Phase 3: Integration and rehabilitation',
        'Medications (for comorbid conditions):',
        '  - Antidepressants (SSRIs for depression/anxiety)',
        '  - Anxiety medications (short-term if needed)',
        'Family therapy',
        'Group therapy with other trauma survivors',
        'Art or expressive therapies',
        'Avoid aggressive memory recovery techniques',
        'Note: Goal is not always memory recovery, but adaptive functioning'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to recall important personal information',
        'Memory gaps too extensive for ordinary forgetting',
        'Finding yourself in places without remembering how you got there',
        'Discovery of evidence of activities you don\'t remember',
        'Others tell you about behaviors you can\'t recall',
        'Memory loss following traumatic event',
        'Confusion about identity',
        'Significant distress about memory gaps',
        'Impairment in functioning',
        'Depression or suicidal thoughts',
        'History of trauma or abuse',
        'Dissociative episodes'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'International Society for the Study of Trauma and Dissociation (ISSTD): isst-d.org',
        'RAINN (Rape, Abuse & Incest National Network): 1-800-656-4673',
        'Sidran Institute (trauma and dissociation): sidran.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/topics/dissociative-disorders',
        'https://www.psychiatry.org/patients-families/dissociative-disorders',
        'https://pubmed.ncbi.nlm.nih.gov/27070315/ - Dissociative amnesia review',
        'https://www.isst-d.org/ - International Society for Study of Trauma and Dissociation'
      ]),
      dsmCriteria: JSON.stringify([
        'Inability to recall important autobiographical information, usually of traumatic or stressful nature, inconsistent with ordinary forgetting',
        'Note: Dissociative amnesia most often consists of localized or selective amnesia for specific event(s); or generalized amnesia for identity and life history (rare)',
        'Symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning',
        'Disturbance not attributable to physiological effects of substance (e.g., alcohol, drug) or neurological/medical condition (e.g., complex partial seizures, transient global amnesia, traumatic brain injury)',
        'Disturbance not better explained by dissociative identity disorder, PTSD, acute stress disorder, somatic symptom disorder, or major or mild neurocognitive disorder',
        'Specify if:',
        '  - With dissociative fugue: Apparently purposeful travel or bewildered wandering associated with amnesia for identity or other important autobiographical information (rare)',
        'Localized amnesia: Failure to recall events during circumscribed period of time (most common)',
        'Selective amnesia: Can recall some, but not all, events during circumscribed period',
        'Generalized amnesia: Complete loss of memory for one\'s life history (rare)',
        'Systematized amnesia: Loss of memory for specific category of information'
      ])
    },
    // SUBSTANCE USE DISORDERS (Phase 3B - continued)
    {
      slug: 'sedative-hypnotic-use-disorder',
      name: 'Sedative/Hypnotic Use Disorder',
      category: 'Substance Use Disorders',
      description: 'A substance use disorder involving problematic pattern of sedative, hypnotic, or anxiolytic (benzodiazepines, barbiturates, sleep medications) use leading to significant impairment or distress. Includes both prescription and illicit use.',
      symptoms: JSON.stringify([
        'Taking sedatives in larger amounts or longer than intended',
        'Unsuccessful efforts to cut down or control use',
        'Spending excessive time obtaining, using, or recovering from sedatives',
        'Cravings or strong desire to use',
        'Failure to fulfill major obligations (work, school, home)',
        'Continued use despite social or interpersonal problems',
        'Giving up important activities due to use',
        'Recurrent use in hazardous situations (driving, operating machinery)',
        'Continued use despite physical or psychological problems caused by substance',
        'Tolerance (need more to achieve effect)',
        'Withdrawal symptoms when stopping or reducing',
        'Memory impairment or blackouts',
        'Slurred speech',
        'Poor coordination or unsteady gait',
        'Drowsiness or sedation',
        'Impaired judgment',
        'Confusion or disorientation',
        'Respiratory depression (dangerous)',
        '"Doctor shopping" to obtain prescriptions'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (40-60% heritability)',
        'GABA receptor changes (downregulation with chronic use)',
        'Neuroadaptation in brain reward pathways',
        'Altered brain chemistry (dependence development)',
        'Physical dependence with regular use',
        'Tolerance development',
        'Family history of substance use disorders',
        'Co-occurring mental health conditions (anxiety, insomnia)'
      ]),
      psychologicalCauses: JSON.stringify([
        'Self-medication for anxiety or insomnia',
        'Stress or trauma',
        'Poor coping skills',
        'History of other substance use',
        'Comorbid mental health disorders',
        'Chronic pain (psychological component)',
        'Avoidance of withdrawal symptoms',
        'Dependence on substance for sleep or relaxation'
      ]),
      socialCauses: JSON.stringify([
        'Easy access to prescription medications',
        'Medical overprescribing',
        'Social acceptance of prescription drug use',
        'Peer influence',
        'Stressful life circumstances',
        'Lack of healthy coping strategies',
        'Social isolation',
        'History of trauma or abuse'
      ]),
      prevalence: 'Approximately 0.3-1% of adults meet criteria for sedative/hypnotic use disorder. Lifetime prevalence 2-3%. Prescription sedative misuse affects 2-6% of adults. Benzodiazepine prescriptions very common (30+ million in US). More common in women, older adults. Often unrecognized.',
      ageOfOnset: 'Can begin at any age. Often starts in adulthood when prescribed for legitimate medical reason (anxiety, insomnia). Peak initiation ages 20-50. Older adults at risk due to multiple prescriptions. May develop gradually after medical use or rapidly with illicit use.',
      courseOfIllness: 'Variable course. May develop insidiously with prescription use over months/years. Escalating doses to achieve effect. Difficulty discontinuing due to withdrawal. Chronic, relapsing condition. Withdrawal can be medically dangerous (seizures). Recovery possible with treatment. Often requires medical detoxification.',
      riskFactors: JSON.stringify([
        'Prescription for legitimate condition (anxiety, insomnia, pain)',
        'History of substance use disorder',
        'Family history of addiction',
        'Mental health disorders (especially anxiety, PTSD)',
        'Chronic pain or insomnia',
        'Easy access to medications',
        'History of trauma',
        'Older age (multiple prescriptions)',
        'Female sex (more likely prescribed)',
        'High-stress occupation or lifestyle'
      ]),
      protectiveFactors: JSON.stringify([
        'Limited access to sedatives',
        'Strong support system',
        'Healthy coping strategies',
        'Treatment for underlying conditions without sedatives',
        'Education about addiction risks',
        'Close medical monitoring if prescribed',
        'Use of non-addictive alternatives',
        'Regular mental health care'
      ]),
      comorbidities: JSON.stringify([
        'Anxiety disorders (very common)',
        'Insomnia disorder',
        'Other substance use disorders (alcohol especially)',
        'Major depressive disorder',
        'PTSD',
        'Chronic pain conditions',
        'Increased suicide risk',
        'Accidental overdose risk (especially with opioids or alcohol)'
      ]),
      naturalSolutions: JSON.stringify([
        'Medical detoxification (essential for safety - withdrawal can be life-threatening)',
        'Gradual taper under medical supervision (NOT cold turkey)',
        'Cognitive Behavioral Therapy for Insomnia (CBT-I) - effective alternative',
        'Anxiety treatment with non-addictive approaches',
        'Mindfulness and meditation',
        'Sleep hygiene practices',
        'Regular exercise',
        'Support groups (SMART Recovery, 12-step programs)',
        'Stress management techniques',
        'Relaxation training (progressive muscle relaxation)',
        'Avoid alcohol (dangerous combination)',
        'Healthy sleep schedule',
        'Address underlying anxiety or trauma',
        'Alternative treatments for insomnia (light therapy, sleep restriction)',
        'Peer support',
        'Family therapy',
        'Identify and avoid triggers',
        'Develop coping skills',
        'Contingency management',
        'Long-term aftercare'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet',
        'Complex carbohydrates (mood stability)',
        'Omega-3 fatty acids',
        'Magnesium (natural relaxation, supports GABA)',
        'B-complex vitamins',
        'Vitamin D',
        'Protein at meals',
        'Foods supporting GABA production (whole grains, nuts)',
        'L-theanine (green tea) - calming',
        'Avoid caffeine',
        'Absolutely no alcohol (dangerous interaction)',
        'Stay hydrated',
        'Regular meal times',
        'Limit sugar',
        'Probiotic foods (gut-brain axis)'
      ]),
      therapyApproaches: JSON.stringify([
        'Medical detoxification (inpatient often necessary):',
        '  - Gradual taper protocol',
        '  - Monitor for seizures',
        '  - Prevent dangerous withdrawal',
        'Cognitive Behavioral Therapy (CBT)',
        'Cognitive Behavioral Therapy for Insomnia (CBT-I) - highly effective',
        'Motivational Interviewing',
        'Contingency management',
        'Exposure therapy for anxiety (CBT-based)',
        '12-step programs (Narcotics Anonymous)',
        'SMART Recovery',
        'Residential treatment (for severe cases)',
        'Medications:',
        '  - Long-acting benzodiazepines for short-term taper',
        '  - Non-addictive sleep aids (trazodone, doxepin)',
        '  - Antidepressants for anxiety/depression',
        '  - Gabapentin (for anxiety, less addictive)',
        'Treatment of co-occurring disorders',
        'Family therapy',
        'Relapse prevention training',
        'Long-term follow-up care'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Using more than prescribed or directed',
        'Taking sedatives for reasons other than prescribed',
        'Unable to stop or cut down on own',
        'Withdrawal symptoms when trying to stop',
        'Needing more to achieve same effect',
        '"Doctor shopping" for prescriptions',
        'Continuing use despite problems',
        'Daily use for extended period',
        'Using with alcohol or other drugs',
        'Memory blackouts',
        'Dangerous behaviors while intoxicated',
        'Family or friends express concern'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'SAMHSA National Helpline: 1-800-662-4357 (24/7, free, confidential)',
        'Narcotics Anonymous: na.org',
        'SMART Recovery: smartrecovery.org',
        'Crisis Text Line: Text HELLO to 741741',
        'Emergency: 911 (for overdose or severe withdrawal - medical emergency)'
      ]),
      researchLinks: JSON.stringify([
        'https://www.samhsa.gov/find-help/national-helpline',
        'https://www.drugabuse.gov/publications/research-reports/misuse-prescription-drugs',
        'https://pubmed.ncbi.nlm.nih.gov/29121791/ - Benzodiazepine use disorder',
        'https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/harmful-interactions'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of sedative, hypnotic, or anxiolytic use leading to significant impairment or distress, with ≥2 of the following within 12 months:',
        'Substance taken in larger amounts or over longer period than intended',
        'Persistent desire or unsuccessful efforts to cut down or control use',
        'Great deal of time spent obtaining, using, or recovering from substance',
        'Craving or strong desire to use',
        'Recurrent use resulting in failure to fulfill major role obligations',
        'Continued use despite persistent/recurrent social or interpersonal problems',
        'Important social, occupational, or recreational activities given up or reduced',
        'Recurrent use in physically hazardous situations',
        'Continued use despite knowledge of persistent/recurrent physical or psychological problem caused/exacerbated by substance',
        'Tolerance: Need for markedly increased amounts or markedly diminished effect',
        'Withdrawal: Characteristic withdrawal syndrome or substance taken to relieve/avoid withdrawal',
        'Specify severity: Mild (2-3 criteria), Moderate (4-5 criteria), Severe (6+ criteria)',
        'Note: Withdrawal from sedatives/hypnotics can be life-threatening (seizures)'
      ])
    },
    {
      slug: 'hallucinogen-use-disorder',
      name: 'Hallucinogen Use Disorder',
      category: 'Substance Use Disorders',
      description: 'A substance use disorder involving problematic pattern of hallucinogen use (LSD, psilocybin, mescaline, MDMA, etc.) leading to significant impairment or distress. Includes recurring use despite negative consequences.',
      symptoms: JSON.stringify([
        'Using hallucinogens more often or in larger amounts than intended',
        'Unsuccessful efforts to cut down or control use',
        'Spending considerable time obtaining, using, or recovering from hallucinogens',
        'Cravings or strong urges to use',
        'Failure to fulfill major obligations due to use',
        'Continued use despite social or interpersonal problems',
        'Giving up important activities because of use',
        'Recurrent use in hazardous situations',
        'Continued use despite physical or psychological problems',
        'Tolerance (need more to achieve desired effect)',
        'Visual or auditory hallucinations during intoxication',
        'Perceptual distortions',
        'Pupil dilation',
        'Increased heart rate and blood pressure',
        'Anxiety or panic during "bad trips"',
        'Flashbacks or Hallucinogen Persisting Perception Disorder (HPPD)',
        'Impaired judgment',
        'Risky behaviors while intoxicated',
        'Preoccupation with obtaining and using hallucinogens'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic vulnerability to addiction (family history)',
        'Serotonin system alterations (5-HT2A receptor activation)',
        'Dopamine pathway involvement (reward system)',
        'Brain plasticity changes with repeated use',
        'Pre-existing mental health conditions',
        'Neurochemical imbalances',
        'Individual neurobiological sensitivity',
        'Possible structural brain changes with chronic use'
      ]),
      psychologicalCauses: JSON.stringify([
        'Seeking altered states of consciousness',
        'Self-medication for depression or anxiety',
        'Curiosity or spiritual seeking',
        'Avoidance of negative emotions',
        'Thrill-seeking personality',
        'Underlying mental health issues',
        'Poor coping mechanisms',
        'Desire for escape from reality'
      ]),
      socialCauses: JSON.stringify([
        'Peer influence and social acceptance',
        'Availability in certain social circles',
        'Cultural or subcultural norms (music festivals, certain communities)',
        'Perceived low risk compared to other drugs',
        'Social isolation or seeking belonging',
        'Stressful life circumstances',
        'Lack of healthy recreational activities',
        'Exposure at young age'
      ]),
      prevalence: 'Hallucinogen use disorder relatively rare compared to other substance use disorders. About 0.5% of adults meet criteria. Lifetime hallucinogen use: 15-20% of adults. Use more common in young adults (ages 18-25). Males more likely than females. Classic hallucinogens (LSD, psilocybin) less likely to cause disorder than MDMA.',
      ageOfOnset: 'Typically begins in adolescence or young adulthood. Peak initiation ages 16-25. Rarely begins after age 30. Earlier initiation associated with higher risk of disorder. May develop quickly in vulnerable individuals or gradually over time.',
      courseOfIllness: 'Variable course. May be time-limited (experimentation in youth) or chronic. Less likely to cause severe physical dependence than many substances. Psychological dependence possible. Tolerance develops rapidly but also dissipates quickly. Some experience Hallucinogen Persisting Perception Disorder (HPPD - flashbacks). May trigger underlying mental health conditions. Recovery common, especially with treatment.',
      riskFactors: JSON.stringify([
        'Family history of substance use disorders',
        'Mental health conditions (especially mood and anxiety disorders)',
        'Early initiation of use',
        'Peer use and social networks',
        'History of other substance use',
        'Sensation-seeking personality',
        'Impulsivity',
        'Trauma history',
        'Male sex',
        'Young age (adolescence, early adulthood)'
      ]),
      protectiveFactors: JSON.stringify([
        'Strong family bonds',
        'Parental monitoring',
        'Positive peer relationships',
        'Academic or career engagement',
        'Mental health treatment',
        'Healthy coping strategies',
        'Religious or spiritual involvement (non-drug related)',
        'Understanding of risks'
      ]),
      comorbidities: JSON.stringify([
        'Other substance use disorders (polysubstance use common)',
        'Cannabis use disorder',
        'Alcohol use disorder',
        'Mood disorders (depression, bipolar)',
        'Anxiety disorders',
        'Schizophrenia or psychotic disorders (may be triggered)',
        'Hallucinogen Persisting Perception Disorder (HPPD)',
        'Personality disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT)',
        'Motivational Interviewing',
        'Contingency management',
        'Support groups (SMART Recovery, Narcotics Anonymous)',
        'Individual therapy',
        'Group therapy',
        'Family therapy',
        'Identify and avoid triggers',
        'Develop healthy coping strategies',
        'Stress management techniques',
        'Mindfulness and meditation (healthy alternative to seeking altered states)',
        'Regular exercise',
        'Engage in meaningful activities',
        'Build supportive social network',
        'Address underlying mental health issues',
        'Peer support',
        'Relapse prevention training',
        'Lifestyle changes',
        'Creative outlets',
        'Education about risks'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced, nutritious diet',
        'Omega-3 fatty acids (brain health)',
        'B-complex vitamins (nervous system)',
        'Vitamin D',
        'Antioxidants (fruits, vegetables)',
        'Adequate protein',
        'Complex carbohydrates',
        'Magnesium (calming)',
        'Stay hydrated',
        'Avoid other substances (alcohol, cannabis)',
        'Limit caffeine',
        'Regular meal times',
        'Foods supporting serotonin (turkey, nuts, seeds)',
        'Anti-inflammatory diet',
        'Probiotic foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - first-line',
        'Motivational Enhancement Therapy',
        'Contingency management (rewards for abstinence)',
        'Matrix Model',
        'Community Reinforcement Approach',
        'Family Behavior Therapy',
        '12-step facilitation (Narcotics Anonymous)',
        'SMART Recovery',
        'Individual psychotherapy',
        'Group therapy',
        'Medications (no specific FDA-approved medications):',
        '  - Treat co-occurring disorders (antidepressants, mood stabilizers)',
        '  - For HPPD: Clonidine, antipsychotics (limited evidence)',
        'Residential treatment (if severe)',
        'Outpatient programs',
        'Treatment of HPPD if present',
        'Relapse prevention',
        'Trauma therapy if indicated'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Unable to stop or cut down on own',
        'Using more frequently or in larger amounts',
        'Neglecting responsibilities due to use',
        'Continued use despite problems',
        'Cravings to use',
        'Risky behaviors while intoxicated',
        'Flashbacks or persistent perceptual disturbances (HPPD)',
        'Anxiety, depression, or other mental health issues',
        'Triggering of psychotic symptoms',
        'Family or friends express concern',
        'Legal problems related to use',
        '"Bad trips" or frightening experiences'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline: Call or text 988',
        'SAMHSA National Helpline: 1-800-662-4357 (24/7, free, confidential)',
        'Narcotics Anonymous: na.org',
        'SMART Recovery: smartrecovery.org',
        'Crisis Text Line: Text HELLO to 741741',
        'Emergency: 911 (for severe reactions or "bad trip")'
      ]),
      researchLinks: JSON.stringify([
        'https://www.drugabuse.gov/publications/research-reports/hallucinogens-dissociative-drugs',
        'https://www.samhsa.gov/find-help/national-helpline',
        'https://pubmed.ncbi.nlm.nih.gov/26748346/ - Hallucinogen use and mental health',
        'https://www.ncbi.nlm.nih.gov/books/NBK459286/ - Hallucinogen Use Disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Problematic pattern of hallucinogen (other than phencyclidine) use leading to significant impairment or distress, with ≥2 of the following within 12 months:',
        'Hallucinogen taken in larger amounts or over longer period than intended',
        'Persistent desire or unsuccessful efforts to cut down or control hallucinogen use',
        'Great deal of time spent obtaining, using, or recovering from hallucinogen',
        'Craving or strong desire to use hallucinogen',
        'Recurrent hallucinogen use resulting in failure to fulfill major role obligations',
        'Continued use despite persistent/recurrent social or interpersonal problems',
        'Important social, occupational, or recreational activities given up or reduced',
        'Recurrent use in physically hazardous situations',
        'Continued use despite knowledge of persistent/recurrent physical or psychological problem caused/exacerbated by hallucinogen',
        'Tolerance: Need for markedly increased amounts to achieve intoxication or desired effect, or markedly diminished effect with continued use',
        'Note: Withdrawal symptoms not included as not established for hallucinogens',
        'Specify severity: Mild (2-3 criteria), Moderate (4-5 criteria), Severe (6+ criteria)',
        'Specify if in early remission, sustained remission, or in controlled environment'
      ])
    },
    // DISRUPTIVE, IMPULSE-CONTROL, AND CONDUCT DISORDERS (Phase 3B - continued)
    {
      slug: 'conduct-disorder',
      name: 'Conduct Disorder',
      category: 'Disruptive, Impulse-Control, and Conduct Disorders',
      description: 'A behavioral and emotional disorder characterized by a repetitive and persistent pattern of behavior that violates the basic rights of others or major age-appropriate societal norms or rules.',
      symptoms: JSON.stringify([
        'Aggression toward people or animals',
        'Bullying, threatening, or intimidating others',
        'Initiating physical fights',
        'Using weapons that can cause harm',
        'Physical cruelty to people or animals',
        'Theft while confronting victim',
        'Forcing sexual activity',
        'Destruction of property',
        'Deliberate fire-setting',
        'Deliberate destruction of others\' property',
        'Deceitfulness or theft',
        'Breaking into buildings or cars',
        'Lying to obtain goods or avoid obligations',
        'Shoplifting or forgery',
        'Serious violations of rules',
        'Staying out late despite parental prohibitions',
        'Running away from home',
        'School truancy',
        'Lack of empathy or remorse'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition (50-60% heritability)',
        'Brain structure differences (reduced amygdala, prefrontal cortex)',
        'Neurotransmitter imbalances (serotonin, dopamine)',
        'Autonomic nervous system underarousal',
        'Low cortisol (reduced fear response)',
        'Prenatal substance exposure',
        'Brain injury',
        'Hormonal factors'
      ]),
      psychologicalCauses: JSON.stringify([
        'Deficits in emotional regulation',
        'Poor impulse control',
        'Difficulty processing social cues',
        'Hostile attribution bias',
        'Lack of empathy development',
        'Early childhood trauma',
        'Cognitive distortions',
        'Learned aggression'
      ]),
      socialCauses: JSON.stringify([
        'Harsh, inconsistent, or neglectful parenting',
        'Physical or sexual abuse',
        'Family conflict or violence',
        'Parental substance abuse or criminality',
        'Peer rejection and deviant peer groups',
        'Low socioeconomic status',
        'Neighborhood violence',
        'Lack of positive role models'
      ]),
      prevalence: '2-10% of children and adolescents. More common in males (5-10%) than females (2-5%). Often emerges in childhood or adolescence.',
      ageOfOnset: 'Childhood-onset before age 10 or adolescent-onset after age 10. Earlier onset associated with worse prognosis.',
      courseOfIllness: 'Variable. Childhood-onset often progresses to antisocial personality disorder (30-50%). Adolescent-onset has better prognosis. Early intervention crucial.',
      riskFactors: JSON.stringify([
        'Family history of antisocial behavior',
        'Parental substance abuse',
        'Harsh discipline',
        'Child abuse or neglect',
        'Male sex',
        'ADHD',
        'Early aggressive behavior',
        'Peer rejection',
        'Deviant peers',
        'Low socioeconomic status'
      ]),
      protectiveFactors: JSON.stringify([
        'Consistent nurturing parenting',
        'Strong family bonds',
        'Positive peer relationships',
        'Academic success',
        'Prosocial activities',
        'Community support',
        'Early intervention',
        'Treatment of comorbid conditions'
      ]),
      comorbidities: JSON.stringify([
        'ADHD (50-70%)',
        'Oppositional Defiant Disorder',
        'Learning disabilities',
        'Substance use disorders',
        'Depression or anxiety',
        'May progress to Antisocial Personality Disorder'
      ]),
      naturalSolutions: JSON.stringify([
        'Parent Management Training (evidence-based)',
        'Multisystemic Therapy (MST)',
        'Cognitive Behavioral Therapy',
        'Family therapy',
        'Social skills training',
        'Anger management',
        'Structured environment',
        'Positive reinforcement',
        'Mentoring programs',
        'Academic support',
        'Prosocial activities',
        'Substance abuse treatment',
        'ADHD treatment',
        'Community interventions',
        'Empathy training',
        'Problem-solving skills',
        'Emotional regulation',
        'Supervision',
        'Avoid harsh punishment',
        'Build positive relationships'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet',
        'Omega-3 fatty acids',
        'Adequate protein',
        'Complex carbohydrates',
        'B-vitamins',
        'Magnesium',
        'Zinc',
        'Iron if deficient',
        'Limit sugar',
        'Avoid excess caffeine',
        'No alcohol or drugs',
        'Regular meals',
        'Stay hydrated',
        'Avoid additives',
        'Whole foods'
      ]),
      therapyApproaches: JSON.stringify([
        'Parent Management Training (first-line)',
        'Multisystemic Therapy (MST)',
        'Cognitive Behavioral Therapy (CBT)',
        'Individual psychotherapy',
        'Family therapy',
        'Social skills groups',
        'Medications for comorbid conditions (stimulants for ADHD, mood stabilizers for aggression)',
        'Residential treatment (severe cases)',
        'School interventions',
        'Community services',
        'Substance treatment',
        'Treatment foster care'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Persistent aggressive behavior',
        'Cruelty to animals',
        'Fire-setting',
        'Theft or vandalism',
        'Running away',
        'Truancy',
        'Threatening others',
        'Use of weapons',
        'Substance use',
        'Sexual aggression',
        'Legal problems',
        'Family unable to manage'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'National Parent Helpline: 1-855-427-2736',
        'Childhelp: 1-800-422-4453',
        'SAMHSA: 1-800-662-4357',
        'Emergency: 911'
      ]),
      researchLinks: JSON.stringify([
        'https://www.aacap.org/AACAP/Families_and_Youth/Facts_for_Families/FFF-Guide/Conduct-Disorder-033.aspx',
        'https://pubmed.ncbi.nlm.nih.gov/25936673/',
        'https://www.nimh.nih.gov/health/topics/disruptive-mood-dysregulation-disorder',
        'https://www.effectivechildtherapy.org/concerns-symptoms-disorders/disorders/conduct-disorder/'
      ]),
      dsmCriteria: JSON.stringify([
        'Repetitive pattern violating rights of others or societal norms, ≥3 criteria in past 12 months (≥1 in past 6 months)',
        'Aggression to people/animals: bullying, fighting, weapons, cruelty, theft with confrontation, forced sexual activity',
        'Destruction of property: fire-setting, deliberate destruction',
        'Deceitfulness/theft: breaking in, lying, stealing',
        'Serious rule violations: staying out late, running away, truancy',
        'Significant impairment in functioning',
        'If age 18+, does not meet ASPD criteria',
        'Specify: Childhood-onset (before 10) or Adolescent-onset',
        'Specify severity and with/without limited prosocial emotions'
      ])
    },
    {
      slug: 'oppositional-defiant-disorder',
      name: 'Oppositional Defiant Disorder (ODD)',
      category: 'Disruptive, Impulse-Control, and Conduct Disorders',
      description: 'A pattern of angry/irritable mood, argumentative/defiant behavior, or vindictiveness lasting at least 6 months, primarily toward authority figures.',
      symptoms: JSON.stringify([
        'Often loses temper',
        'Often touchy or easily annoyed',
        'Often angry and resentful',
        'Often argues with authority',
        'Often defies or refuses compliance',
        'Often deliberately annoys others',
        'Often blames others',
        'Often spiteful or vindictive',
        'Stubborn',
        'Tests limits',
        'Hostility',
        'Low frustration tolerance',
        'Relationship difficulties',
        'Academic problems',
        'Low self-esteem',
        'Mood swings'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors',
        'Difficult temperament',
        'Neurotransmitter imbalances',
        'Autonomic nervous system differences',
        'Brain structure differences',
        'Family history',
        'Prenatal factors'
      ]),
      psychologicalCauses: JSON.stringify([
        'Emotion regulation difficulties',
        'Poor impulse control',
        'Negative cognitive patterns',
        'Low frustration tolerance',
        'Difficulty with transitions',
        'Underlying anxiety',
        'Learned behavior',
        'Attachment issues'
      ]),
      socialCauses: JSON.stringify([
        'Harsh or inconsistent discipline',
        'Lack of positive involvement',
        'Family conflict',
        'Parental mental illness or substance abuse',
        'Modeling of oppositional behavior',
        'Reinforcement of negative behaviors',
        'Peer rejection',
        'Stressful events'
      ]),
      prevalence: '1-11% of children. Average 3-5%. More common in males before puberty. Typical age 3-8 years.',
      ageOfOnset: 'Preschool or early school years. Average diagnosis around age 8.',
      courseOfIllness: 'Variable. Some improve, 30% progress to Conduct Disorder. Early intervention important.',
      riskFactors: JSON.stringify([
        'Difficult temperament',
        'Family history',
        'Harsh parenting',
        'Parent-child conflict',
        'ADHD',
        'Parental mental illness',
        'Family stress',
        'Male sex',
        'Low SES',
        'Violence exposure'
      ]),
      protectiveFactors: JSON.stringify([
        'Positive parenting',
        'Strong parent-child bond',
        'Early intervention',
        'Academic success',
        'Positive peers',
        'Treatment of comorbidities',
        'Stable family',
        'Community support'
      ]),
      comorbidities: JSON.stringify([
        'ADHD (40-60%)',
        'Anxiety disorders',
        'Depression',
        'Learning disabilities',
        'May progress to Conduct Disorder',
        'Substance use in adolescence'
      ]),
      naturalSolutions: JSON.stringify([
        'Parent Management Training',
        'Parent-Child Interaction Therapy',
        'Collaborative Problem Solving',
        'Positive parenting',
        'Clear consistent rules',
        'Positive reinforcement',
        'Ignore minor misbehaviors',
        'Brief time-outs',
        'Family therapy',
        'CBT for child',
        'Social skills training',
        'Emotion regulation skills',
        'Problem-solving training',
        'School interventions',
        'ADHD treatment',
        'Consistent routines',
        'Avoid power struggles',
        'Offer choices',
        'One-on-one time',
        'Coping skills'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet',
        'Omega-3s',
        'Adequate protein',
        'Complex carbs',
        'B-vitamins',
        'Magnesium',
        'Iron',
        'Limit sugar',
        'Avoid caffeine',
        'Regular meals',
        'Hydration',
        'Whole foods',
        'Avoid additives',
        'Family meals'
      ]),
      therapyApproaches: JSON.stringify([
        'Parent Management Training (first-line)',
        'Parent-Child Interaction Therapy',
        'Collaborative Solutions',
        'CBT for child',
        'Family therapy',
        'Individual therapy',
        'Social skills groups',
        'School interventions',
        'Medications for comorbidities (stimulants for ADHD, SSRIs for anxiety)',
        'Teacher consultation',
        'Behavioral school interventions'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Behaviors persist 6+ months',
        'Interfering with school/relationships',
        'Family unable to manage',
        'Child distressed',
        'Behaviors worsening',
        'Aggression emerging',
        'Academic failure',
        'Peer rejection',
        'Comorbid symptoms',
        'Multiple settings',
        'Strained relationships',
        'Risk of Conduct Disorder'
      ]),
      crisisResources: JSON.stringify([
        'National Parent Helpline: 1-855-427-2736',
        'Crisis Text Line: Text HELLO to 741741',
        '988 Suicide & Crisis Lifeline',
        'Childhelp: 1-800-422-4453',
        'SAMHSA: 1-800-662-4357',
        'AACAP: aacap.org'
      ]),
      researchLinks: JSON.stringify([
        'https://www.aacap.org/AACAP/Families_and_Youth/Facts_for_Families/FFF-Guide/Children-With-Oppositional-Defiant-Disorder-072.aspx',
        'https://pubmed.ncbi.nlm.nih.gov/27645557/',
        'https://www.nimh.nih.gov/health/topics/child-and-adolescent-mental-health',
        'https://www.effectivechildtherapy.org/concerns-symptoms-disorders/disorders/oppositional-defiant-disorder/'
      ]),
      dsmCriteria: JSON.stringify([
        'Pattern of angry/irritable mood, argumentative/defiant behavior, or vindictiveness ≥6 months, ≥4 symptoms',
        'Angry/Irritable: loses temper, touchy, angry/resentful',
        'Argumentative/Defiant: argues, defies, annoys others, blames others',
        'Vindictiveness: spiteful/vindictive ≥2 times in 6 months',
        'Causes distress or impairment',
        'Not during psychotic, substance use, depressive, or bipolar disorder',
        'Not Disruptive Mood Dysregulation Disorder',
        'Specify severity: Mild (one setting), Moderate (≥2 settings), Severe (3+ settings)'
      ])
    },
    // OBSESSIVE-COMPULSIVE AND RELATED DISORDERS (Phase 3C)
    {
      slug: 'hoarding-disorder',
      name: 'Hoarding Disorder',
      category: 'Obsessive-Compulsive and Related Disorders',
      description: 'A persistent difficulty discarding or parting with possessions, regardless of their actual value, leading to accumulation that congests living areas and compromises their intended use.',
      symptoms: JSON.stringify([
        'Persistent difficulty discarding possessions',
        'Perceived need to save items',
        'Distress associated with discarding',
        'Accumulation of possessions that congest living areas',
        'Cluttered home (active living areas unusable)',
        'Significant distress or impairment in functioning',
        'Difficulty organizing possessions',
        'Indecisiveness',
        'Procrastination',
        'Perfectionism',
        'Avoidance',
        'Difficulty categorizing items',
        'May acquire excessive items (compulsive buying, free things)',
        'Embarrassment about clutter',
        'Social isolation',
        'Family/relationship conflict',
        'Health and safety hazards',
        'Eviction or legal problems'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (50% heritability)',
        'Brain abnormalities (anterior cingulate cortex, insula)',
        'Executive function deficits',
        'Decision-making impairments',
        'Attention problems',
        'Family history of hoarding',
        'Neurobiological differences from OCD'
      ]),
      psychologicalCauses: JSON.stringify([
        'Emotional attachment to possessions',
        'Beliefs about possessions (safety, identity, responsibility)',
        'Difficulty making decisions',
        'Perfectionism',
        'Avoidance of distress',
        'Need to maintain control',
        'Fear of losing important information',
        'Sentimental attachment'
      ]),
      socialCauses: JSON.stringify([
        'Traumatic life events',
        'Loss or deprivation',
        'Childhood trauma',
        'Social isolation',
        'Family patterns of saving',
        'Material deprivation in childhood',
        'Stressful life circumstances',
        'Living alone'
      ]),
      prevalence: 'Approximately 2-6% of population. Equal in men and women. Often begins in adolescence but worsens with age. Chronic condition. May be under-recognized.',
      ageOfOnset: 'Symptoms often begin in adolescence but typically not clinically significant until 30s-50s. Severity increases with age. Earlier onset predicts more severe hoarding.',
      courseOfIllness: 'Chronic and progressive. Symptoms worsen over time without treatment. Rarely remits spontaneously. Treatment can help but challenging. Insight varies. Significant functional impairment common.',
      riskFactors: JSON.stringify([
        'Family history of hoarding',
        'Brain injury or trauma',
        'Stressful life events',
        'Social isolation',
        'Older age',
        'Indecisiveness',
        'Perfectionism',
        'ADHD',
        'Depression or anxiety',
        'Obsessive-compulsive traits'
      ]),
      protectiveFactors: JSON.stringify([
        'Early intervention',
        'Social support',
        'Insight into problem',
        'Motivation to change',
        'Support from family',
        'Professional treatment',
        'Good organizational skills',
        'Emotional regulation skills'
      ]),
      comorbidities: JSON.stringify([
        'Major depression (50%)',
        'Social anxiety disorder (25%)',
        'Generalized anxiety disorder',
        'ADHD (20-30%)',
        'OCD (distinct but may co-occur)',
        'Personality disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy for hoarding (CBT-H) - most effective',
        'Motivational interviewing',
        'Harm reduction approach',
        'Gradual decluttering with support',
        'Decision-making skills training',
        'Organizational skills training',
        'Peer support groups',
        'Community support',
        'Family involvement',
        'Professional organizers (with mental health support)',
        'Address underlying trauma',
        'Treat comorbid conditions',
        'Build social connections',
        'Develop coping strategies',
        'Challenge beliefs about possessions',
        'Exposure to discarding',
        'Non-acquiring practice',
        'Regular sessions (not one-time cleanout)',
        'Celebrate small progress',
        'Compassionate approach'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet',
        'Omega-3 fatty acids',
        'B-complex vitamins',
        'Magnesium',
        'Adequate protein',
        'Complex carbohydrates',
        'Limit caffeine',
        'Avoid alcohol',
        'Stay hydrated',
        'Regular meals',
        'Probiotic foods',
        'Antioxidants',
        'Whole foods diet',
        'Limit processed foods',
        'Adequate nutrition for mental health'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy for Hoarding (CBT-H) - first-line',
        'Exposure therapy (to discarding)',
        'Cognitive restructuring',
        'Skills training (decision-making, organization)',
        'Motivational interviewing',
        'Group therapy',
        'Family therapy',
        'Home visits by therapist',
        'Medications (no FDA-approved, but may help comorbidities):',
        '  - SSRIs for depression/anxiety',
        '  - Stimulants for ADHD',
        'Harm reduction services',
        'Case management',
        'Community resources'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Living spaces unusable for intended purpose',
        'Health or safety hazards',
        'Conflict with family or housemates',
        'Distress about clutter',
        'Difficulty discarding items',
        'Eviction threats',
        'Legal problems',
        'Social isolation',
        'Excessive acquisition',
        'Functional impairment',
        'Embarrassment preventing visitors',
        'Worsening symptoms'
      ]),
      crisisResources: JSON.stringify([
        'International OCD Foundation: iocdf.org/hoardingcenter',
        'Hoarding Cleanup: hoarding.iocdf.org',
        'Mental Health America: mhanational.org',
        'SAMHSA National Helpline: 1-800-662-4357',
        '988 Suicide & Crisis Lifeline',
        'Local community services and adult protective services'
      ]),
      researchLinks: JSON.stringify([
        'https://iocdf.org/about-hoarding/',
        'https://pubmed.ncbi.nlm.nih.gov/23070837/ - Hoarding disorder treatment',
        'https://www.psychiatry.org/patients-families/hoarding-disorder',
        'https://hoarding.iocdf.org/'
      ]),
      dsmCriteria: JSON.stringify([
        'Persistent difficulty discarding or parting with possessions, regardless of actual value',
        'Difficulty due to perceived need to save items and distress associated with discarding',
        'Difficulty results in accumulation of possessions that congest and clutter active living areas, compromising their intended use',
        'Hoarding causes clinically significant distress or impairment in functioning',
        'Not attributable to another medical condition',
        'Not better explained by another mental disorder',
        'Specify if: With excessive acquisition, With good or fair insight, With poor insight, With absent insight/delusional beliefs',
        'Clutter may be removed only due to third-party interventions (family, authorities)'
      ])
    },
    {
      slug: 'intermittent-explosive-disorder',
      name: 'Intermittent Explosive Disorder (IED)',
      category: 'Disruptive, Impulse-Control, and Conduct Disorders',
      description: 'Recurrent behavioral outbursts representing a failure to control aggressive impulses, manifested by verbal or physical aggression that is grossly out of proportion to any provocation or stressor.',
      symptoms: JSON.stringify([
        'Recurrent behavioral outbursts',
        'Verbal aggression (temper tantrums, tirades, arguments)',
        'Physical aggression toward property, animals, or people',
        'Outbursts out of proportion to provocation',
        'Impulsive, not premeditated',
        'Sudden intense anger',
        'Inability to resist aggressive impulses',
        'Tension or arousal before outburst',
        'Relief or pleasure during outburst',
        'Remorse or embarrassment afterward',
        'Outbursts cause distress or impairment',
        'Damage to relationships',
        'Occupational or legal problems',
        'Financial consequences',
        'Physical injuries',
        'Low frustration tolerance',
        'Irritability between episodes',
        'Racing thoughts or tingling sensations before episode'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic factors (family history)',
        'Serotonin dysfunction (low serotonin)',
        'Abnormalities in brain regions (amygdala, prefrontal cortex)',
        'Increased amygdala reactivity',
        'Decreased prefrontal inhibition',
        'Testosterone and other hormonal factors',
        'Head injury or trauma',
        'Neurochemical imbalances'
      ]),
      psychologicalCauses: JSON.stringify([
        'Poor impulse control',
        'Difficulty regulating emotions',
        'Low frustration tolerance',
        'Cognitive distortions',
        'Hostile attribution bias',
        'History of trauma or abuse',
        'Learned aggression',
        'Reinforcement of aggressive behavior'
      ]),
      socialCauses: JSON.stringify([
        'Exposure to violence in childhood',
        'Harsh, punitive parenting',
        'Physical or emotional abuse',
        'Family conflict',
        'Peer aggression',
        'Cultural factors',
        'Stressful life circumstances',
        'Substance use (can worsen)'
      ]),
      prevalence: 'Approximately 2.7% of adults in US (lifetime). Slightly more common in males. Often begins in late childhood or adolescence. May be under-diagnosed.',
      ageOfOnset: 'Typically emerges in late childhood, adolescence, or early adulthood. Average age of onset around 13-14 years. Rare to begin after age 40.',
      courseOfIllness: 'Chronic course. Frequency and severity may fluctuate. May improve in middle age. Without treatment, can lead to significant life consequences. Treatment can be effective.',
      riskFactors: JSON.stringify([
        'Family history of IED or aggression',
        'Childhood exposure to aggression or abuse',
        'Male sex',
        'Younger age',
        'Lower education',
        'History of trauma',
        'Other mental health disorders',
        'Substance use',
        'Head injury',
        'Neurological conditions'
      ]),
      protectiveFactors: JSON.stringify([
        'Anger management skills',
        'Emotional regulation skills',
        'Strong support system',
        'Treatment',
        'Avoiding substances',
        'Stress management',
        'Positive relationships',
        'Conflict resolution skills'
      ]),
      comorbidities: JSON.stringify([
        'Depression (common)',
        'Anxiety disorders',
        'Substance use disorders (50%)',
        'ADHD',
        'Borderline personality disorder',
        'Antisocial personality disorder',
        'Other impulse control disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT)',
        'Anger management training',
        'Relaxation techniques',
        'Deep breathing',
        'Progressive muscle relaxation',
        'Mindfulness meditation',
        'Identify triggers',
        'Develop coping strategies',
        'Time-out strategies',
        'Exercise regularly',
        'Avoid substances (alcohol, drugs)',
        'Adequate sleep',
        'Stress management',
        'Communication skills training',
        'Problem-solving skills',
        'Support groups',
        'Family therapy',
        'Avoid triggers when possible',
        'Create safety plan',
        'Build healthy relationships'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet',
        'Omega-3 fatty acids (may reduce aggression)',
        'Adequate protein',
        'Complex carbohydrates',
        'B-vitamins',
        'Magnesium',
        'Avoid excess caffeine',
        'Limit alcohol (can trigger outbursts)',
        'No illicit drugs',
        'Regular meals',
        'Stay hydrated',
        'Limit sugar',
        'Tryptophan-rich foods (supports serotonin)',
        'Whole foods diet',
        'Avoid stimulants'
      ]),
      therapyApproaches: JSON.stringify([
        'Cognitive Behavioral Therapy (CBT) - first-line',
        'Anger management',
        'Relaxation training',
        'Communication skills training',
        'Medications:',
        '  - SSRIs (fluoxetine) - may reduce aggression',
        '  - Mood stabilizers (lithium, valproate)',
        '  - Atypical antipsychotics (for severe cases)',
        '  - Beta-blockers (propranolol)',
        'Individual psychotherapy',
        'Group therapy',
        'Family therapy',
        'Substance abuse treatment if needed',
        'Treatment of comorbid conditions'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Frequent aggressive outbursts',
        'Outbursts causing harm to others',
        'Property damage',
        'Legal problems',
        'Relationship problems',
        'Occupational difficulties',
        'Physical injuries (to self or others)',
        'Financial consequences',
        'Distress about behavior',
        'Unable to control aggression',
        'Escalating violence',
        'Fear of losing control'
      ]),
      crisisResources: JSON.stringify([
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741',
        'SAMHSA National Helpline: 1-800-662-4357',
        'National Domestic Violence Hotline: 1-800-799-7233',
        'Emergency: 911 (if danger to self or others)',
        'Local anger management programs'
      ]),
      researchLinks: JSON.stringify([
        'https://www.nimh.nih.gov/health/statistics/intermittent-explosive-disorder',
        'https://pubmed.ncbi.nlm.nih.gov/16554528/ - IED epidemiology',
        'https://www.psychiatry.org/patients-families/intermittent-explosive-disorder',
        'https://iocdf.org/'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent behavioral outbursts representing failure to control aggressive impulses manifested by either:',
        'A. Verbal aggression or physical aggression toward property, animals, or individuals, occurring twice weekly on average for 3 months (does not result in damage/injury)',
        'B. Three behavioral outbursts involving damage to property and/or physical assault within 12-month period',
        'Magnitude of aggressiveness grossly out of proportion to provocation or precipitating stressor',
        'Recurrent outbursts not premeditated (impulsive/anger-based)',
        'Outbursts cause distress, impairment in functioning, or financial/legal consequences',
        'Individual at least 6 years of age',
        'Outbursts not better explained by another mental disorder, substance, or medical condition',
        'For children 6-18 years, aggressive behavior not part of adjustment disorder'
      ])
    },
    {
      slug: 'excoriation-disorder',
      name: 'Excoriation (Skin-Picking) Disorder',
      category: 'Obsessive-Compulsive and Related Disorders',
      description: 'Recurrent skin-picking resulting in skin lesions despite repeated attempts to stop, causing significant distress or impairment in functioning. Also known as dermatillomania.',
      symptoms: JSON.stringify([
        'Recurrent skin picking',
        'Skin lesions due to picking',
        'Repeated attempts to decrease or stop picking',
        'Significant distress or impairment',
        'Picking at healthy skin or minor irregularities',
        'Picking at scabs or previous lesions',
        'Use of tools (tweezers, needles, pins)',
        'Scarring',
        'Infections',
        'Tissue damage',
        'Urges to pick',
        'Tension before picking',
        'Relief or gratification during/after picking',
        'Automatic (unconscious) or focused picking',
        'Shame or embarrassment',
        'Avoiding social situations',
        'Camouflaging skin lesions',
        'Time-consuming (may spend hours)'
      ]),
      biologicalCauses: JSON.stringify([
        'Genetic predisposition',
        'Family history of skin-picking or OCD spectrum disorders',
        'Neurobiological factors (cortico-striatal dysfunction)',
        'Dopamine and serotonin dysregulation',
        'Brain differences in impulse control regions',
        'May have sensory processing differences',
        'Often co-occurs with other body-focused repetitive behaviors'
      ]),
      psychologicalCauses: JSON.stringify([
        'Anxiety reduction through picking',
        'Perfectionism (trying to smooth skin)',
        'Emotional regulation difficulty',
        'Stress or boredom',
        'Dissociation',
        'Body image concerns',
        'Habitual response to negative emotions',
        'Automatic behavior (poor awareness)'
      ]),
      socialCauses: JSON.stringify([
        'Stressful life events',
        'Trauma history',
        'Family stress',
        'Social isolation due to shame',
        'Cultural attitudes about appearance',
        'Triggering situations (mirrors, boredom, stress)',
        'Lack of awareness about condition',
        'Limited access to treatment'
      ]),
      prevalence: '1.4-5.4% of adults. More common in females (3:1 ratio). Typically begins in adolescence. Often chronic if untreated. May be under-reported due to shame.',
      ageOfOnset: 'Typically begins in adolescence (average age 12-15 years). Can begin in childhood or adulthood. Earlier onset may predict more severe course.',
      courseOfIllness: 'Chronic waxing and waning course. Symptoms often fluctuate with stress. Without treatment, typically persists for years. Treatment can be effective but requires commitment. Relapse common, especially under stress.',
      riskFactors: JSON.stringify([
        'Family history of skin-picking or OCD',
        'Female sex',
        'Adolescent or young adult age',
        'Anxiety or depression',
        'Perfectionism',
        'Trauma history',
        'Other body-focused repetitive behaviors',
        'OCD or trichotillomania',
        'Stress',
        'Skin conditions (acne) may trigger initial behavior'
      ]),
      protectiveFactors: JSON.stringify([
        'Early treatment',
        'Social support',
        'Awareness and self-monitoring',
        'Healthy coping strategies',
        'Stress management skills',
        'Treatment of comorbid conditions',
        'Strong motivation to change',
        'Access to specialized treatment'
      ]),
      comorbidities: JSON.stringify([
        'OCD (common)',
        'Trichotillomania (hair-pulling)',
        'Major depression (30-58%)',
        'Anxiety disorders (common)',
        'Body dysmorphic disorder',
        'Substance use disorders',
        'Eating disorders'
      ]),
      naturalSolutions: JSON.stringify([
        'Habit Reversal Training (HRT) - very effective',
        'Cognitive Behavioral Therapy (CBT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Awareness training (track triggers and patterns)',
        'Competing response (alternative behavior)',
        'Stimulus control (cover mirrors, wear gloves)',
        'Keep hands busy (stress ball, fidget toys)',
        'Barriers (bandages, tape on fingertips)',
        'Mindfulness meditation',
        'Relaxation techniques',
        'Treat underlying anxiety/depression',
        'Support groups',
        'Self-monitoring (log picking episodes)',
        'Identify and avoid triggers',
        'Develop healthy coping strategies',
        'Address perfectionism',
        'Improve emotion regulation',
        'Skin care routine (gentle)',
        'Manicures (short nails, acrylics)',
        'Celebrate progress'
      ]),
      nutritionalRecs: JSON.stringify([
        'Balanced diet',
        'Omega-3 fatty acids (skin health)',
        'Vitamin C (skin healing)',
        'Vitamin E (skin health)',
        'Zinc (wound healing)',
        'Protein (tissue repair)',
        'B-vitamins',
        'Adequate hydration',
        'Antioxidants',
        'Limit caffeine (reduces anxiety)',
        'Avoid alcohol',
        'Foods supporting skin health',
        'Anti-inflammatory diet',
        'Probiotic foods',
        'Whole foods diet'
      ]),
      therapyApproaches: JSON.stringify([
        'Habit Reversal Training (HRT) - first-line, evidence-based',
        'Cognitive Behavioral Therapy (CBT)',
        'Acceptance and Commitment Therapy (ACT)',
        'Dialectical Behavior Therapy skills',
        'Individual therapy',
        'Group therapy or support groups',
        'Medications (no FDA-approved, but may help):',
        '  - SSRIs (for comorbid OCD, depression, anxiety)',
        '  - N-acetylcysteine (NAC) - some evidence',
        'Treatment of comorbid conditions',
        'Dermatological care for skin damage',
        'Online interventions (apps, self-help)',
        'TLC Foundation for Body-Focused Repetitive Behaviors'
      ]),
      whenToSeekHelp: JSON.stringify([
        'Causing significant skin damage',
        'Unable to stop despite trying',
        'Infections or medical complications',
        'Significant distress',
        'Avoiding social situations',
        'Impairment in functioning',
        'Spending excessive time picking',
        'Scarring or disfigurement',
        'Shame or embarrassment',
        'Depression or anxiety',
        'Affecting work or relationships',
        'Worsening symptoms'
      ]),
      crisisResources: JSON.stringify([
        'TLC Foundation for BFRBs: bfrb.org or (831) 457-1004',
        'Canadian BFRB Support Network: canadianbfrb.org',
        'International OCD Foundation: iocdf.org',
        'SAMHSA National Helpline: 1-800-662-4357',
        '988 Suicide & Crisis Lifeline',
        'Crisis Text Line: Text HELLO to 741741'
      ]),
      researchLinks: JSON.stringify([
        'https://www.bfrb.org/your-journey/skin-picking-disorder',
        'https://pubmed.ncbi.nlm.nih.gov/23768604/ - Excoriation disorder treatment',
        'https://iocdf.org/expert-opinions/excoriation-disorder/',
        'https://www.psychiatry.org/patients-families/excoriation-disorder'
      ]),
      dsmCriteria: JSON.stringify([
        'Recurrent skin picking resulting in skin lesions',
        'Repeated attempts to decrease or stop skin picking',
        'Skin picking causes clinically significant distress or impairment in functioning',
        'Not attributable to physiological effects of substance or medical condition (e.g., scabies)',
        'Not better explained by symptoms of another mental disorder (e.g., delusions in psychotic disorder, attempts to improve perceived defect in body dysmorphic disorder, stereotypies in stereotypic movement disorder, intent to harm oneself in nonsuicidal self-injury)',
        'May occur in focused (aware) or automatic (unconscious) manner',
        'Common sites: face, arms, hands, but may pick any accessible area',
        'Specify if with good or fair insight, with poor insight, or with absent insight/delusional beliefs about skin picking'
      ])
    },

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
    },
    {
      slug: 'y-bocs',
      name: 'Y-BOCS (Yale-Brown Obsessive Compulsive Scale)',
      description: 'Gold standard assessment for measuring severity of obsessive-compulsive disorder (OCD) symptoms.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Time spent on obsessions: How much of your time is occupied by obsessive thoughts?',
          options: [
            { value: 0, label: '0 = None' },
            { value: 1, label: '1 = Less than 1 hour/day or occasional' },
            { value: 2, label: '2 = 1-3 hours/day or frequent' },
            { value: 3, label: '3 = 3-8 hours/day or very frequent' },
            { value: 4, label: '4 = More than 8 hours/day or nearly constant' }
          ]
        },
        {
          id: 2,
          text: 'Interference from obsessions: How much do your obsessive thoughts interfere with your social or work functioning?',
          options: [
            { value: 0, label: '0 = None' },
            { value: 1, label: '1 = Mild, slight interference' },
            { value: 2, label: '2 = Moderate, definite interference' },
            { value: 3, label: '3 = Severe, substantial impairment' },
            { value: 4, label: '4 = Extreme, incapacitating' }
          ]
        },
        {
          id: 3,
          text: 'Distress from obsessions: How much distress do your obsessive thoughts cause you?',
          options: [
            { value: 0, label: '0 = None' },
            { value: 1, label: '1 = Mild, infrequent distress' },
            { value: 2, label: '2 = Moderate, disturbing but manageable' },
            { value: 3, label: '3 = Severe, very disturbing' },
            { value: 4, label: '4 = Extreme, near constant and disabling distress' }
          ]
        },
        {
          id: 4,
          text: 'Resistance to obsessions: How much effort do you make to resist the obsessive thoughts?',
          options: [
            { value: 0, label: '0 = Always resist or symptoms minimal' },
            { value: 1, label: '1 = Try to resist most of the time' },
            { value: 2, label: '2 = Make some effort to resist' },
            { value: 3, label: '3 = Yield to obsessions reluctantly' },
            { value: 4, label: '4 = Completely yield to obsessions' }
          ]
        },
        {
          id: 5,
          text: 'Control over obsessions: How much control do you have over your obsessive thoughts?',
          options: [
            { value: 0, label: '0 = Complete control' },
            { value: 1, label: '1 = Much control' },
            { value: 2, label: '2 = Moderate control' },
            { value: 3, label: '3 = Little control' },
            { value: 4, label: '4 = No control' }
          ]
        },
        {
          id: 6,
          text: 'Time spent on compulsions: How much time do you spend performing compulsive behaviors?',
          options: [
            { value: 0, label: '0 = None' },
            { value: 1, label: '1 = Less than 1 hour/day or occasional' },
            { value: 2, label: '2 = 1-3 hours/day or frequent' },
            { value: 3, label: '3 = 3-8 hours/day or very frequent' },
            { value: 4, label: '4 = More than 8 hours/day or nearly constant' }
          ]
        },
        {
          id: 7,
          text: 'Interference from compulsions: How much do your compulsive behaviors interfere with your social or work functioning?',
          options: [
            { value: 0, label: '0 = None' },
            { value: 1, label: '1 = Mild, slight interference' },
            { value: 2, label: '2 = Moderate, definite interference' },
            { value: 3, label: '3 = Severe, substantial impairment' },
            { value: 4, label: '4 = Extreme, incapacitating' }
          ]
        },
        {
          id: 8,
          text: 'Distress from compulsions: How anxious would you feel if prevented from performing your compulsions?',
          options: [
            { value: 0, label: '0 = None' },
            { value: 1, label: '1 = Mild, only slightly anxious' },
            { value: 2, label: '2 = Moderate, manageable anxiety' },
            { value: 3, label: '3 = Severe, prominent and disturbing' },
            { value: 4, label: '4 = Extreme, incapacitating anxiety' }
          ]
        },
        {
          id: 9,
          text: 'Resistance to compulsions: How much effort do you make to resist the compulsions?',
          options: [
            { value: 0, label: '0 = Always resist or symptoms minimal' },
            { value: 1, label: '1 = Try to resist most of the time' },
            { value: 2, label: '2 = Make some effort to resist' },
            { value: 3, label: '3 = Yield to compulsions reluctantly' },
            { value: 4, label: '4 = Completely yield to compulsions' }
          ]
        },
        {
          id: 10,
          text: 'Control over compulsions: How strong is the drive to perform the compulsive behavior?',
          options: [
            { value: 0, label: '0 = Complete control' },
            { value: 1, label: '1 = Much control' },
            { value: 2, label: '2 = Moderate control' },
            { value: 3, label: '3 = Little control' },
            { value: 4, label: '4 = No control, driven to perform' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 40,
        method: 'Sum all 10 items (0-4 each). First 5 items measure obsessions, last 5 measure compulsions.'
      }),
      interpretations: JSON.stringify([
        { range: '0-7', severity: 'Subclinical', description: 'Below clinical threshold', recommendation: 'Monitor symptoms. Use self-help strategies if concerned.' },
        { range: '8-15', severity: 'Mild', description: 'Mild OCD symptoms', recommendation: 'Consider cognitive-behavioral therapy (CBT) with exposure and response prevention (ERP).' },
        { range: '16-23', severity: 'Moderate', description: 'Moderate OCD symptoms', recommendation: 'CBT with ERP strongly recommended. Consider evaluation for medication.' },
        { range: '24-31', severity: 'Severe', description: 'Severe OCD symptoms', recommendation: 'Urgent treatment needed. Combination of CBT/ERP and medication recommended. Contact OCD specialist.' },
        { range: '32-40', severity: 'Extreme', description: 'Extreme OCD symptoms', recommendation: 'Intensive treatment required immediately. May need intensive outpatient or residential treatment. Call mental health provider today.' }
      ])
    },
    {
      slug: 'audit',
      name: 'AUDIT (Alcohol Use Disorders Identification Test)',
      description: 'WHO-developed screening tool for hazardous and harmful alcohol consumption.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'How often do you have a drink containing alcohol?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Monthly or less' },
            { value: 2, label: '2-4 times a month' },
            { value: 3, label: '2-3 times a week' },
            { value: 4, label: '4 or more times a week' }
          ]
        },
        {
          id: 2,
          text: 'How many standard drinks containing alcohol do you have on a typical day when drinking?',
          options: [
            { value: 0, label: '1 or 2' },
            { value: 1, label: '3 or 4' },
            { value: 2, label: '5 or 6' },
            { value: 3, label: '7 to 9' },
            { value: 4, label: '10 or more' }
          ]
        },
        {
          id: 3,
          text: 'How often do you have 6 or more drinks on one occasion?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Less than monthly' },
            { value: 2, label: 'Monthly' },
            { value: 3, label: 'Weekly' },
            { value: 4, label: 'Daily or almost daily' }
          ]
        },
        {
          id: 4,
          text: 'During the past year, how often have you found that you were not able to stop drinking once you had started?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Less than monthly' },
            { value: 2, label: 'Monthly' },
            { value: 3, label: 'Weekly' },
            { value: 4, label: 'Daily or almost daily' }
          ]
        },
        {
          id: 5,
          text: 'During the past year, how often have you failed to do what was normally expected of you because of drinking?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Less than monthly' },
            { value: 2, label: 'Monthly' },
            { value: 3, label: 'Weekly' },
            { value: 4, label: 'Daily or almost daily' }
          ]
        },
        {
          id: 6,
          text: 'During the past year, how often have you needed a drink in the morning to get yourself going after a heavy drinking session?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Less than monthly' },
            { value: 2, label: 'Monthly' },
            { value: 3, label: 'Weekly' },
            { value: 4, label: 'Daily or almost daily' }
          ]
        },
        {
          id: 7,
          text: 'During the past year, how often have you had a feeling of guilt or remorse after drinking?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Less than monthly' },
            { value: 2, label: 'Monthly' },
            { value: 3, label: 'Weekly' },
            { value: 4, label: 'Daily or almost daily' }
          ]
        },
        {
          id: 8,
          text: 'During the past year, how often have you been unable to remember what happened the night before because of drinking?',
          options: [
            { value: 0, label: 'Never' },
            { value: 1, label: 'Less than monthly' },
            { value: 2, label: 'Monthly' },
            { value: 3, label: 'Weekly' },
            { value: 4, label: 'Daily or almost daily' }
          ]
        },
        {
          id: 9,
          text: 'Have you or someone else been injured because of your drinking?',
          options: [
            { value: 0, label: 'No' },
            { value: 2, label: 'Yes, but not in the past year' },
            { value: 4, label: 'Yes, during the past year' }
          ]
        },
        {
          id: 10,
          text: 'Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?',
          options: [
            { value: 0, label: 'No' },
            { value: 2, label: 'Yes, but not in the past year' },
            { value: 4, label: 'Yes, during the past year' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 40,
        method: 'Sum all responses. Note: questions 9-10 have different scoring (0, 2, or 4).'
      }),
      interpretations: JSON.stringify([
        { range: '0-7', severity: 'Low Risk', description: 'Low risk drinking or abstinence', recommendation: 'Continue healthy habits. Stay within low-risk limits (14 drinks/week max for men, 7 for women).' },
        { range: '8-15', severity: 'Risky', description: 'Hazardous or harmful alcohol use', recommendation: 'Reduce drinking. Consider brief counseling. Risk for health and social problems.' },
        { range: '16-19', severity: 'Harmful', description: 'Harmful alcohol use', recommendation: 'Strongly advised to reduce drinking. Brief counseling or therapy recommended. SAMHSA Helpline: 1-800-662-4357.' },
        { range: '20-40', severity: 'Possible Dependence', description: 'Possible alcohol dependence', recommendation: 'Professional evaluation urgently needed. May need medical detox. Contact addiction specialist. SAMHSA: 1-800-662-4357.' }
      ])
    },
    {
      slug: 'dast-10',
      name: 'DAST-10 (Drug Abuse Screening Test)',
      description: 'Brief screening tool to assess drug use and potential substance use disorders.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Have you used drugs other than those required for medical reasons?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 2,
          text: 'Do you abuse more than one drug at a time?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 3,
          text: 'Are you always able to stop using drugs when you want to?',
          options: [
            { value: 0, label: 'Yes' },
            { value: 1, label: 'No' }
          ]
        },
        {
          id: 4,
          text: 'Have you had blackouts or flashbacks as a result of drug use?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 5,
          text: 'Do you ever feel bad or guilty about your drug use?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 6,
          text: 'Does your spouse (or parents) ever complain about your involvement with drugs?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 7,
          text: 'Have you neglected your family because of your use of drugs?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 8,
          text: 'Have you engaged in illegal activities in order to obtain drugs?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 9,
          text: 'Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 10,
          text: 'Have you had medical problems as a result of your drug use (e.g., memory loss, hepatitis, convulsions, bleeding)?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 10,
        method: 'Sum all "Yes" responses (each worth 1 point).'
      }),
      interpretations: JSON.stringify([
        { range: '0', severity: 'No Problem', description: 'No drug abuse problem reported', recommendation: 'Continue healthy choices. Avoid recreational drug use.' },
        { range: '1-2', severity: 'Low Level', description: 'Low level of drug-related problems', recommendation: 'Monitor use. Consider reducing or stopping. Brief intervention may be helpful.' },
        { range: '3-5', severity: 'Moderate Level', description: 'Moderate level of drug-related problems', recommendation: 'Assessment recommended. Consider counseling or outpatient treatment. SAMHSA: 1-800-662-4357.' },
        { range: '6-8', severity: 'Substantial Level', description: 'Substantial drug-related problems', recommendation: 'Professional evaluation and treatment strongly recommended. May need intensive outpatient program.' },
        { range: '9-10', severity: 'Severe Level', description: 'Severe drug-related problems', recommendation: 'Urgent professional help needed. May require medical detox and residential treatment. SAMHSA: 1-800-662-4357.' }
      ])
    },
    {
      slug: 'eat-26',
      name: 'EAT-26 (Eating Attitudes Test)',
      description: 'Widely used screening tool for eating disorder risk and disordered eating patterns.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Am terrified about being overweight',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 2,
          text: 'Avoid eating when I am hungry',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 3,
          text: 'Find myself preoccupied with food',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 4,
          text: 'Have gone on eating binges where I feel that I may not be able to stop',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 5,
          text: 'Cut my food into small pieces',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 6,
          text: 'Aware of the calorie content of foods that I eat',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 7,
          text: 'Particularly avoid food with a high carbohydrate content (bread, rice, potatoes, etc.)',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 8,
          text: 'Feel that others would prefer if I ate more',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 9,
          text: 'Vomit after I have eaten',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 10,
          text: 'Feel extremely guilty after eating',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 11,
          text: 'Am preoccupied with a desire to be thinner',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 12,
          text: 'Think about burning up calories when I exercise',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 13,
          text: 'Other people think that I am too thin',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 14,
          text: 'Am preoccupied with the thought of having fat on my body',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 15,
          text: 'Take longer than others to eat my meals',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 16,
          text: 'Avoid foods with sugar in them',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 17,
          text: 'Eat diet foods',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 18,
          text: 'Feel that food controls my life',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 19,
          text: 'Display self-control around food',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 20,
          text: 'Feel that others pressure me to eat',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 21,
          text: 'Give too much time and thought to food',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 22,
          text: 'Feel uncomfortable after eating sweets',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 23,
          text: 'Engage in dieting behavior',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 24,
          text: 'Like my stomach to be empty',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 25,
          text: 'Have the impulse to vomit after meals',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 2, label: 'Usually' },
            { value: 3, label: 'Always' }
          ]
        },
        {
          id: 26,
          text: 'Enjoy trying new rich foods',
          options: [
            { value: 3, label: 'Never' },
            { value: 2, label: 'Rarely' },
            { value: 1, label: 'Sometimes' },
            { value: 0, label: 'Often' },
            { value: 0, label: 'Usually' },
            { value: 0, label: 'Always' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 78,
        method: 'Sum all responses. Items 1-25 scored 0-3 (Never/Rarely/Sometimes=0, Often=1, Usually=2, Always=3). Item 26 is reverse scored.'
      }),
      interpretations: JSON.stringify([
        { range: '0-19', severity: 'Low Risk', description: 'Below clinical cutoff', recommendation: 'No significant eating disorder symptoms detected. Maintain healthy relationship with food.' },
        { range: '20-78', severity: 'At Risk', description: 'Score suggests possible eating disorder', recommendation: 'Professional evaluation strongly recommended. Contact eating disorder specialist or primary care provider. NEDA Helpline: 1-800-931-2237.' }
      ])
    },
    {
      slug: 'psqi',
      name: 'PSQI (Pittsburgh Sleep Quality Index)',
      description: 'Widely used assessment of sleep quality and sleep disturbances over the past month.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'During the past month, when have you usually gone to bed?',
          type: 'time',
          options: []
        },
        {
          id: 2,
          text: 'During the past month, how long (in minutes) has it taken you to fall asleep each night?',
          type: 'number',
          options: []
        },
        {
          id: 3,
          text: 'During the past month, when have you usually gotten up in the morning?',
          type: 'time',
          options: []
        },
        {
          id: 4,
          text: 'During the past month, how many hours of actual sleep do you get at night? (may be different than hours spent in bed)',
          type: 'number',
          options: []
        },
        {
          id: 5,
          text: 'Cannot get to sleep within 30 minutes',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 6,
          text: 'Wake up in the middle of the night or early morning',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 7,
          text: 'Have to get up to use the bathroom',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 8,
          text: 'Cannot breathe comfortably',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 9,
          text: 'Cough or snore loudly',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 10,
          text: 'Feel too cold',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 11,
          text: 'Feel too hot',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 12,
          text: 'Have bad dreams or nightmares',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 13,
          text: 'Have pain',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 14,
          text: 'During the past month, how would you rate your sleep quality overall?',
          options: [
            { value: 0, label: 'Very good' },
            { value: 1, label: 'Fairly good' },
            { value: 2, label: 'Fairly bad' },
            { value: 3, label: 'Very bad' }
          ]
        },
        {
          id: 15,
          text: 'During the past month, how often have you taken medicine to help you sleep?',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 16,
          text: 'During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?',
          options: [
            { value: 0, label: 'Not during past month' },
            { value: 1, label: 'Less than once a week' },
            { value: 2, label: 'Once or twice a week' },
            { value: 3, label: 'Three or more times a week' }
          ]
        },
        {
          id: 17,
          text: 'During the past month, how much of a problem has it been for you to keep up enthusiasm to get things done?',
          options: [
            { value: 0, label: 'No problem at all' },
            { value: 1, label: 'Only a very slight problem' },
            { value: 2, label: 'Somewhat of a problem' },
            { value: 3, label: 'A very big problem' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 21,
        method: 'Complex scoring with 7 component scores (sleep quality, sleep latency, sleep duration, sleep efficiency, sleep disturbances, sleep medication, daytime dysfunction). Each component 0-3, summed for global score.'
      }),
      interpretations: JSON.stringify([
        { range: '0-5', severity: 'Good', description: 'Good sleep quality', recommendation: 'Maintain healthy sleep habits. Continue current sleep routine.' },
        { range: '6-21', severity: 'Poor', description: 'Poor sleep quality', recommendation: 'Sleep problems detected. Consider sleep hygiene improvements. If persistent, consult healthcare provider or sleep specialist.' }
      ])
    },
    {
      slug: 'swls',
      name: 'SWLS (Satisfaction With Life Scale)',
      description: 'Brief 5-item measure of global life satisfaction and subjective well-being.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'In most ways my life is close to my ideal',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Slightly Disagree' },
            { value: 4, label: 'Neither Agree nor Disagree' },
            { value: 5, label: 'Slightly Agree' },
            { value: 6, label: 'Agree' },
            { value: 7, label: 'Strongly Agree' }
          ]
        },
        {
          id: 2,
          text: 'The conditions of my life are excellent',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Slightly Disagree' },
            { value: 4, label: 'Neither Agree nor Disagree' },
            { value: 5, label: 'Slightly Agree' },
            { value: 6, label: 'Agree' },
            { value: 7, label: 'Strongly Agree' }
          ]
        },
        {
          id: 3,
          text: 'I am satisfied with my life',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Slightly Disagree' },
            { value: 4, label: 'Neither Agree nor Disagree' },
            { value: 5, label: 'Slightly Agree' },
            { value: 6, label: 'Agree' },
            { value: 7, label: 'Strongly Agree' }
          ]
        },
        {
          id: 4,
          text: 'So far I have gotten the important things I want in life',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Slightly Disagree' },
            { value: 4, label: 'Neither Agree nor Disagree' },
            { value: 5, label: 'Slightly Agree' },
            { value: 6, label: 'Agree' },
            { value: 7, label: 'Strongly Agree' }
          ]
        },
        {
          id: 5,
          text: 'If I could live my life over, I would change almost nothing',
          options: [
            { value: 1, label: 'Strongly Disagree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Slightly Disagree' },
            { value: 4, label: 'Neither Agree nor Disagree' },
            { value: 5, label: 'Slightly Agree' },
            { value: 6, label: 'Agree' },
            { value: 7, label: 'Strongly Agree' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 35,
        method: 'Sum all 5 items (range 5-35).'
      }),
      interpretations: JSON.stringify([
        { range: '5-9', severity: 'Extremely Dissatisfied', description: 'Extremely dissatisfied with life', recommendation: 'Professional support strongly recommended. Consider therapy to address life satisfaction.' },
        { range: '10-14', severity: 'Dissatisfied', description: 'Dissatisfied with life', recommendation: 'May benefit from counseling or life coaching. Identify areas for change.' },
        { range: '15-19', severity: 'Slightly Dissatisfied', description: 'Slightly below average life satisfaction', recommendation: 'Consider what changes might improve satisfaction. Self-reflection or brief counseling may help.' },
        { range: '20-24', severity: 'Neutral', description: 'Average life satisfaction', recommendation: 'Typical satisfaction level. Continue healthy habits and relationships.' },
        { range: '25-29', severity: 'Satisfied', description: 'Above average life satisfaction', recommendation: 'Good life satisfaction. Maintain current positive practices.' },
        { range: '30-35', severity: 'Highly Satisfied', description: 'Very high life satisfaction', recommendation: 'Excellent life satisfaction. Share your strategies with others!' }
      ])
    },
    {
      slug: 'rses',
      name: 'RSES (Rosenberg Self-Esteem Scale)',
      description: 'Widely used measure of global self-esteem with 10 items.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'I feel that I am a person of worth, at least on an equal plane with others',
          options: [
            { value: 3, label: 'Strongly Agree' },
            { value: 2, label: 'Agree' },
            { value: 1, label: 'Disagree' },
            { value: 0, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 2,
          text: 'I feel that I have a number of good qualities',
          options: [
            { value: 3, label: 'Strongly Agree' },
            { value: 2, label: 'Agree' },
            { value: 1, label: 'Disagree' },
            { value: 0, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 3,
          text: 'All in all, I am inclined to feel that I am a failure',
          options: [
            { value: 0, label: 'Strongly Agree' },
            { value: 1, label: 'Agree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 4,
          text: 'I am able to do things as well as most other people',
          options: [
            { value: 3, label: 'Strongly Agree' },
            { value: 2, label: 'Agree' },
            { value: 1, label: 'Disagree' },
            { value: 0, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 5,
          text: 'I feel I do not have much to be proud of',
          options: [
            { value: 0, label: 'Strongly Agree' },
            { value: 1, label: 'Agree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 6,
          text: 'I take a positive attitude toward myself',
          options: [
            { value: 3, label: 'Strongly Agree' },
            { value: 2, label: 'Agree' },
            { value: 1, label: 'Disagree' },
            { value: 0, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 7,
          text: 'On the whole, I am satisfied with myself',
          options: [
            { value: 3, label: 'Strongly Agree' },
            { value: 2, label: 'Agree' },
            { value: 1, label: 'Disagree' },
            { value: 0, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 8,
          text: 'I wish I could have more respect for myself',
          options: [
            { value: 0, label: 'Strongly Agree' },
            { value: 1, label: 'Agree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 9,
          text: 'I certainly feel useless at times',
          options: [
            { value: 0, label: 'Strongly Agree' },
            { value: 1, label: 'Agree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Strongly Disagree' }
          ]
        },
        {
          id: 10,
          text: 'At times I think I am no good at all',
          options: [
            { value: 0, label: 'Strongly Agree' },
            { value: 1, label: 'Agree' },
            { value: 2, label: 'Disagree' },
            { value: 3, label: 'Strongly Disagree' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 30,
        method: 'Sum all items. Items 3, 5, 8, 9, 10 are reverse scored (already reflected in options).'
      }),
      interpretations: JSON.stringify([
        { range: '0-14', severity: 'Low', description: 'Low self-esteem', recommendation: 'Professional support recommended. Consider therapy focusing on self-esteem and self-compassion.' },
        { range: '15-25', severity: 'Normal', description: 'Normal range self-esteem', recommendation: 'Typical self-esteem. Continue healthy self-care practices.' },
        { range: '26-30', severity: 'High', description: 'High self-esteem', recommendation: 'Healthy self-esteem. Continue positive self-regard practices.' }
      ])
    },
    {
      slug: 'ace',
      name: 'ACE (Adverse Childhood Experiences)',
      description: 'Screening tool for childhood trauma and adversity. Higher scores associated with health risks in adulthood.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'Did a parent or other adult in the household often swear at you, insult you, put you down, or humiliate you? Or act in a way that made you afraid that you might be physically hurt?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 2,
          text: 'Did a parent or other adult in the household often push, grab, slap, or throw something at you? Or ever hit you so hard that you had marks or were injured?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 3,
          text: 'Did an adult or person at least 5 years older than you ever touch or fondle you or have you touch their body in a sexual way? Or try to or actually have oral, anal, or vaginal sex with you?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 4,
          text: 'Did you often feel that no one in your family loved you or thought you were important or special? Or your family didn\'t look out for each other, feel close to each other, or support each other?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 5,
          text: 'Did you often feel that you didn\'t have enough to eat, had to wear dirty clothes, and had no one to protect you? Or your parents were too drunk or high to take care of you or take you to the doctor if you needed it?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 6,
          text: 'Were your parents ever separated or divorced?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 7,
          text: 'Was your mother or stepmother often pushed, grabbed, slapped, or had something thrown at her? Or sometimes or often kicked, bitten, hit with a fist, or hit with something hard? Or ever repeatedly hit over at least a few minutes or threatened with a gun or knife?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 8,
          text: 'Did you live with anyone who was a problem drinker or alcoholic or who used street drugs?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 9,
          text: 'Was a household member depressed or mentally ill or did a household member attempt suicide?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        },
        {
          id: 10,
          text: 'Did a household member go to prison?',
          options: [
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 10,
        method: 'Sum all "Yes" responses (each worth 1 point). Higher scores indicate more adverse experiences.'
      }),
      interpretations: JSON.stringify([
        { range: '0', severity: 'No ACEs', description: 'No adverse childhood experiences reported', recommendation: 'Continue healthy coping and relationships. Build resilience through self-care.' },
        { range: '1', severity: 'One ACE', description: 'One adverse childhood experience', recommendation: 'Common experience. Practice self-care and seek support if needed.' },
        { range: '2-3', severity: 'Multiple ACEs', description: 'Multiple adverse childhood experiences', recommendation: 'Consider trauma-informed therapy. Build resilience and support network.' },
        { range: '4+', severity: 'High ACE Score', description: 'High number of adverse experiences', recommendation: 'Professional support strongly recommended. Trauma-focused therapy (EMDR, CPT) can help. Higher health risks - prioritize wellness.' }
      ])
    },
    {
      slug: 'asrs',
      name: 'ASRS (Adult ADHD Self-Report Scale)',
      description: 'WHO screening tool for adult ADHD. Part A is the 6-item screener.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 1, label: 'Very Often' }
          ]
        },
        {
          id: 2,
          text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 1, label: 'Very Often' }
          ]
        },
        {
          id: 3,
          text: 'How often do you have problems remembering appointments or obligations?',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 1, label: 'Very Often' }
          ]
        },
        {
          id: 4,
          text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 1, label: 'Very Often' }
          ]
        },
        {
          id: 5,
          text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 1, label: 'Very Often' }
          ]
        },
        {
          id: 6,
          text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?',
          options: [
            { value: 0, label: 'Never' },
            { value: 0, label: 'Rarely' },
            { value: 0, label: 'Sometimes' },
            { value: 1, label: 'Often' },
            { value: 1, label: 'Very Often' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 6,
        method: 'Count responses of "Often" or "Very Often" (shaded boxes). 4+ suggests ADHD.'
      }),
      interpretations: JSON.stringify([
        { range: '0-3', severity: 'Negative Screen', description: 'ADHD unlikely', recommendation: 'Symptoms below screening threshold. If concerns persist, consult healthcare provider.' },
        { range: '4-6', severity: 'Positive Screen', description: 'ADHD symptoms present', recommendation: 'Professional evaluation recommended. Contact psychiatrist or psychologist for comprehensive ADHD assessment.' }
      ])
    },
    {
      slug: 'aq-10',
      name: 'AQ-10 (Autism Spectrum Quotient - 10 items)',
      description: 'Brief autism screening tool for adults. Not diagnostic, but indicates need for evaluation.',
      questions: JSON.stringify([
        {
          id: 1,
          text: 'I often notice small sounds when others do not',
          options: [
            { value: 1, label: 'Definitely Agree' },
            { value: 1, label: 'Slightly Agree' },
            { value: 0, label: 'Slightly Disagree' },
            { value: 0, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 2,
          text: 'I usually concentrate more on the whole picture, rather than the small details',
          options: [
            { value: 0, label: 'Definitely Agree' },
            { value: 0, label: 'Slightly Agree' },
            { value: 1, label: 'Slightly Disagree' },
            { value: 1, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 3,
          text: 'I find it easy to do more than one thing at once',
          options: [
            { value: 0, label: 'Definitely Agree' },
            { value: 0, label: 'Slightly Agree' },
            { value: 1, label: 'Slightly Disagree' },
            { value: 1, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 4,
          text: 'If there is an interruption, I can switch back to what I was doing very quickly',
          options: [
            { value: 0, label: 'Definitely Agree' },
            { value: 0, label: 'Slightly Agree' },
            { value: 1, label: 'Slightly Disagree' },
            { value: 1, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 5,
          text: 'I find it easy to "read between the lines" when someone is talking to me',
          options: [
            { value: 0, label: 'Definitely Agree' },
            { value: 0, label: 'Slightly Agree' },
            { value: 1, label: 'Slightly Disagree' },
            { value: 1, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 6,
          text: 'I know how to tell if someone listening to me is getting bored',
          options: [
            { value: 0, label: 'Definitely Agree' },
            { value: 0, label: 'Slightly Agree' },
            { value: 1, label: 'Slightly Disagree' },
            { value: 1, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 7,
          text: 'When I\'m reading a story I find it difficult to work out the characters\' intentions',
          options: [
            { value: 1, label: 'Definitely Agree' },
            { value: 1, label: 'Slightly Agree' },
            { value: 0, label: 'Slightly Disagree' },
            { value: 0, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 8,
          text: 'I like to collect information about categories of things (e.g., types of car, types of bird, types of train, types of plant, etc.)',
          options: [
            { value: 1, label: 'Definitely Agree' },
            { value: 1, label: 'Slightly Agree' },
            { value: 0, label: 'Slightly Disagree' },
            { value: 0, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 9,
          text: 'I find it easy to work out what someone is thinking or feeling just by looking at their face',
          options: [
            { value: 0, label: 'Definitely Agree' },
            { value: 0, label: 'Slightly Agree' },
            { value: 1, label: 'Slightly Disagree' },
            { value: 1, label: 'Definitely Disagree' }
          ]
        },
        {
          id: 10,
          text: 'I find it difficult to work out people\'s intentions',
          options: [
            { value: 1, label: 'Definitely Agree' },
            { value: 1, label: 'Slightly Agree' },
            { value: 0, label: 'Slightly Disagree' },
            { value: 0, label: 'Definitely Disagree' }
          ]
        }
      ]),
      scoringGuide: JSON.stringify({
        maxScore: 10,
        method: 'Sum all responses (scoring already built into options). Higher scores suggest autism traits.'
      }),
      interpretations: JSON.stringify([
        { range: '0-5', severity: 'Below Cutoff', description: 'Below autism screening threshold', recommendation: 'Autism traits not indicated. If concerns persist, consult specialist.' },
        { range: '6-10', severity: 'Above Cutoff', description: 'Possible autism spectrum traits', recommendation: 'Professional autism evaluation recommended. Contact psychologist specializing in autism assessment.' }
      ])
    },
    {
      slug: 'spin',
      name: 'SPIN (Social Phobia Inventory)',
      description: 'Brief 17-item assessment for social anxiety disorder severity.',
      questions: JSON.stringify([
        { id: 1, text: 'I am afraid of people in authority', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 2, text: 'I am bothered by blushing in front of people', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 3, text: 'Parties and social events scare me', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 4, text: 'I avoid talking to people I don\'t know', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 5, text: 'Being criticized scares me a lot', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 6, text: 'I avoid doing things or speaking to people for fear of embarrassment', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 7, text: 'Sweating in front of people causes me distress', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 8, text: 'I avoid going to parties', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 9, text: 'I avoid activities in which I am the center of attention', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 10, text: 'Talking to strangers scares me', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 11, text: 'I avoid having to give speeches', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 12, text: 'I would do anything to avoid being criticized', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 13, text: 'Heart palpitations bother me when I am around people', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 14, text: 'I am afraid of doing things when people might be watching', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 15, text: 'Being embarrassed or looking stupid are my worst fears', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 16, text: 'I avoid speaking to anyone in authority', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] },
        { id: 17, text: 'Trembling or shaking in front of others is distressing to me', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'A little bit' }, { value: 2, label: 'Somewhat' }, { value: 3, label: 'Very much' }, { value: 4, label: 'Extremely' }] }
      ]),
      scoringGuide: JSON.stringify({ maxScore: 68, method: 'Sum all 17 items (0-4 each).' }),
      interpretations: JSON.stringify([
        { range: '0-20', severity: 'None to Mild', description: 'Minimal social anxiety', recommendation: 'No treatment needed. Continue healthy social engagement.' },
        { range: '21-30', severity: 'Mild', description: 'Mild social anxiety', recommendation: 'Self-help strategies and gradual exposure may help.' },
        { range: '31-40', severity: 'Moderate', description: 'Moderate social anxiety', recommendation: 'CBT recommended. Consider seeking professional help.' },
        { range: '41-50', severity: 'Severe', description: 'Severe social anxiety', recommendation: 'Professional treatment strongly recommended. CBT with exposure therapy is gold standard.' },
        { range: '51-68', severity: 'Very Severe', description: 'Very severe social anxiety', recommendation: 'Urgent treatment needed. Combination of therapy and medication often most effective.' }
      ])
    },
    {
      slug: 'bdi-ii',
      name: 'BDI-II (Beck Depression Inventory-II)',
      description: 'Comprehensive 21-item depression assessment measuring severity of depressive symptoms.',
      questions: JSON.stringify([
        { id: 1, text: 'Sadness', options: [{ value: 0, label: 'I do not feel sad' }, { value: 1, label: 'I feel sad much of the time' }, { value: 2, label: 'I am sad all the time' }, { value: 3, label: 'I am so sad or unhappy that I can\'t stand it' }] },
        { id: 2, text: 'Pessimism', options: [{ value: 0, label: 'I am not discouraged about my future' }, { value: 1, label: 'I feel more discouraged about my future than I used to' }, { value: 2, label: 'I do not expect things to work out for me' }, { value: 3, label: 'I feel my future is hopeless and will only get worse' }] },
        { id: 3, text: 'Past Failure', options: [{ value: 0, label: 'I do not feel like a failure' }, { value: 1, label: 'I have failed more than I should have' }, { value: 2, label: 'As I look back, I see a lot of failures' }, { value: 3, label: 'I feel I am a total failure as a person' }] },
        { id: 4, text: 'Loss of Pleasure', options: [{ value: 0, label: 'I get as much pleasure as I ever did' }, { value: 1, label: 'I don\'t enjoy things as much as I used to' }, { value: 2, label: 'I get very little pleasure from things I used to enjoy' }, { value: 3, label: 'I can\'t get any pleasure from things I used to enjoy' }] },
        { id: 5, text: 'Guilty Feelings', options: [{ value: 0, label: 'I don\'t feel particularly guilty' }, { value: 1, label: 'I feel guilty over many things I have done or should have done' }, { value: 2, label: 'I feel quite guilty most of the time' }, { value: 3, label: 'I feel guilty all of the time' }] },
        { id: 6, text: 'Punishment Feelings', options: [{ value: 0, label: 'I don\'t feel I am being punished' }, { value: 1, label: 'I feel I may be punished' }, { value: 2, label: 'I expect to be punished' }, { value: 3, label: 'I feel I am being punished' }] },
        { id: 7, text: 'Self-Dislike', options: [{ value: 0, label: 'I feel the same about myself as ever' }, { value: 1, label: 'I have lost confidence in myself' }, { value: 2, label: 'I am disappointed in myself' }, { value: 3, label: 'I dislike myself' }] },
        { id: 8, text: 'Self-Criticalness', options: [{ value: 0, label: 'I don\'t criticize or blame myself more than usual' }, { value: 1, label: 'I am more critical of myself than I used to be' }, { value: 2, label: 'I criticize myself for all of my faults' }, { value: 3, label: 'I blame myself for everything bad that happens' }] },
        { id: 9, text: 'Suicidal Thoughts', options: [{ value: 0, label: 'I don\'t have any thoughts of killing myself' }, { value: 1, label: 'I have thoughts of killing myself, but I would not carry them out' }, { value: 2, label: 'I would like to kill myself' }, { value: 3, label: 'I would kill myself if I had the chance' }] },
        { id: 10, text: 'Crying', options: [{ value: 0, label: 'I don\'t cry anymore than I used to' }, { value: 1, label: 'I cry more than I used to' }, { value: 2, label: 'I cry over every little thing' }, { value: 3, label: 'I feel like crying, but I can\'t' }] },
        { id: 11, text: 'Agitation', options: [{ value: 0, label: 'I am no more restless or wound up than usual' }, { value: 1, label: 'I feel more restless or wound up than usual' }, { value: 2, label: 'I am so restless or agitated that it\'s hard to stay still' }, { value: 3, label: 'I am so restless or agitated that I have to keep moving or doing something' }] },
        { id: 12, text: 'Loss of Interest', options: [{ value: 0, label: 'I have not lost interest in other people or activities' }, { value: 1, label: 'I am less interested in other people or things than before' }, { value: 2, label: 'I have lost most of my interest in other people or things' }, { value: 3, label: 'It\'s hard to get interested in anything' }] },
        { id: 13, text: 'Indecisiveness', options: [{ value: 0, label: 'I make decisions about as well as ever' }, { value: 1, label: 'I find it more difficult to make decisions than usual' }, { value: 2, label: 'I have much greater difficulty in making decisions than I used to' }, { value: 3, label: 'I have trouble making any decisions' }] },
        { id: 14, text: 'Worthlessness', options: [{ value: 0, label: 'I do not feel I am worthless' }, { value: 1, label: 'I don\'t consider myself as worthwhile and useful as I used to' }, { value: 2, label: 'I feel more worthless as compared to other people' }, { value: 3, label: 'I feel utterly worthless' }] },
        { id: 15, text: 'Loss of Energy', options: [{ value: 0, label: 'I have as much energy as ever' }, { value: 1, label: 'I have less energy than I used to have' }, { value: 2, label: 'I don\'t have enough energy to do very much' }, { value: 3, label: 'I don\'t have enough energy to do anything' }] },
        { id: 16, text: 'Changes in Sleeping Pattern', options: [{ value: 0, label: 'I have not experienced any change in my sleeping pattern' }, { value: 1, label: 'I sleep somewhat more/less than usual' }, { value: 2, label: 'I sleep a lot more/less than usual' }, { value: 3, label: 'I sleep most of the day / I wake up 1-2 hours early and can\'t get back to sleep' }] },
        { id: 17, text: 'Irritability', options: [{ value: 0, label: 'I am no more irritable than usual' }, { value: 1, label: 'I am more irritable than usual' }, { value: 2, label: 'I am much more irritable than usual' }, { value: 3, label: 'I am irritable all the time' }] },
        { id: 18, text: 'Changes in Appetite', options: [{ value: 0, label: 'I have not experienced any change in my appetite' }, { value: 1, label: 'My appetite is somewhat less/greater than usual' }, { value: 2, label: 'My appetite is much less/greater than usual' }, { value: 3, label: 'I have no appetite at all / I crave food all the time' }] },
        { id: 19, text: 'Concentration Difficulty', options: [{ value: 0, label: 'I can concentrate as well as ever' }, { value: 1, label: 'I can\'t concentrate as well as usual' }, { value: 2, label: 'It\'s hard to keep my mind on anything for very long' }, { value: 3, label: 'I find I can\'t concentrate on anything' }] },
        { id: 20, text: 'Tiredness or Fatigue', options: [{ value: 0, label: 'I am no more tired or fatigued than usual' }, { value: 1, label: 'I get more tired or fatigued more easily than usual' }, { value: 2, label: 'I am too tired or fatigued to do a lot of the things I used to do' }, { value: 3, label: 'I am too tired or fatigued to do most of the things I used to do' }] },
        { id: 21, text: 'Loss of Interest in Sex', options: [{ value: 0, label: 'I have not noticed any recent change in my interest in sex' }, { value: 1, label: 'I am less interested in sex than I used to be' }, { value: 2, label: 'I am much less interested in sex now' }, { value: 3, label: 'I have lost interest in sex completely' }] }
      ]),
      scoringGuide: JSON.stringify({ maxScore: 63, method: 'Sum all 21 items (0-3 each).' }),
      interpretations: JSON.stringify([
        { range: '0-13', severity: 'Minimal', description: 'Minimal depression', recommendation: 'No treatment necessary. Continue self-care.' },
        { range: '14-19', severity: 'Mild', description: 'Mild depression', recommendation: 'Self-help and monitoring. Consider therapy if symptoms persist.' },
        { range: '20-28', severity: 'Moderate', description: 'Moderate depression', recommendation: 'Professional treatment recommended. Therapy and/or medication.' },
        { range: '29-63', severity: 'Severe', description: 'Severe depression', recommendation: 'Urgent professional help needed. If suicidal thoughts, call 988 immediately.' }
      ])
    },
    {
      slug: 'bai',
      name: 'BAI (Beck Anxiety Inventory)',
      description: 'Comprehensive 21-item anxiety assessment measuring severity of anxiety symptoms.',
      questions: JSON.stringify([
        { id: 1, text: 'Numbness or tingling', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 2, text: 'Feeling hot', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 3, text: 'Wobbliness in legs', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 4, text: 'Unable to relax', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 5, text: 'Fear of worst happening', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 6, text: 'Dizzy or lightheaded', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 7, text: 'Heart pounding/racing', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 8, text: 'Unsteady', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 9, text: 'Terrified or afraid', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 10, text: 'Nervous', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 11, text: 'Feeling of choking', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 12, text: 'Hands trembling', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 13, text: 'Shaky/unsteady', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 14, text: 'Fear of losing control', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 15, text: 'Difficulty in breathing', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 16, text: 'Fear of dying', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 17, text: 'Scared', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 18, text: 'Indigestion', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 19, text: 'Faint/lightheaded', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 20, text: 'Face flushed', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] },
        { id: 21, text: 'Hot/cold sweats', options: [{ value: 0, label: 'Not at all' }, { value: 1, label: 'Mildly' }, { value: 2, label: 'Moderately' }, { value: 3, label: 'Severely' }] }
      ]),
      scoringGuide: JSON.stringify({ maxScore: 63, method: 'Sum all 21 items (0-3 each).' }),
      interpretations: JSON.stringify([
        { range: '0-7', severity: 'Minimal', description: 'Minimal anxiety', recommendation: 'Normal anxiety level. Continue healthy habits.' },
        { range: '8-15', severity: 'Mild', description: 'Mild anxiety', recommendation: 'Self-help strategies. Monitor symptoms.' },
        { range: '16-25', severity: 'Moderate', description: 'Moderate anxiety', recommendation: 'Consider therapy. CBT is effective for anxiety.' },
        { range: '26-63', severity: 'Severe', description: 'Severe anxiety', recommendation: 'Professional treatment needed. Therapy and/or medication recommended.' }
      ])
    },
    {
      slug: 'epds',
      name: 'EPDS (Edinburgh Postnatal Depression Scale)',
      description: 'Screening tool for postpartum depression. Can be used during pregnancy and after birth.',
      questions: JSON.stringify([
        { id: 1, text: 'I have been able to laugh and see the funny side of things', options: [{ value: 0, label: 'As much as I always could' }, { value: 1, label: 'Not quite so much now' }, { value: 2, label: 'Definitely not so much now' }, { value: 3, label: 'Not at all' }] },
        { id: 2, text: 'I have looked forward with enjoyment to things', options: [{ value: 0, label: 'As much as I ever did' }, { value: 1, label: 'Rather less than I used to' }, { value: 2, label: 'Definitely less than I used to' }, { value: 3, label: 'Hardly at all' }] },
        { id: 3, text: 'I have blamed myself unnecessarily when things went wrong', options: [{ value: 3, label: 'Yes, most of the time' }, { value: 2, label: 'Yes, some of the time' }, { value: 1, label: 'Not very often' }, { value: 0, label: 'No, never' }] },
        { id: 4, text: 'I have been anxious or worried for no good reason', options: [{ value: 0, label: 'No, not at all' }, { value: 1, label: 'Hardly ever' }, { value: 2, label: 'Yes, sometimes' }, { value: 3, label: 'Yes, very often' }] },
        { id: 5, text: 'I have felt scared or panicky for no very good reason', options: [{ value: 3, label: 'Yes, quite a lot' }, { value: 2, label: 'Yes, sometimes' }, { value: 1, label: 'No, not much' }, { value: 0, label: 'No, not at all' }] },
        { id: 6, text: 'Things have been getting on top of me', options: [{ value: 3, label: 'Yes, most of the time I haven\'t been able to cope' }, { value: 2, label: 'Yes, sometimes I haven\'t been coping as well as usual' }, { value: 1, label: 'No, most of the time I have coped quite well' }, { value: 0, label: 'No, I have been coping as well as ever' }] },
        { id: 7, text: 'I have been so unhappy that I have had difficulty sleeping', options: [{ value: 3, label: 'Yes, most of the time' }, { value: 2, label: 'Yes, sometimes' }, { value: 1, label: 'Not very often' }, { value: 0, label: 'No, not at all' }] },
        { id: 8, text: 'I have felt sad or miserable', options: [{ value: 3, label: 'Yes, most of the time' }, { value: 2, label: 'Yes, quite often' }, { value: 1, label: 'Not very often' }, { value: 0, label: 'No, not at all' }] },
        { id: 9, text: 'I have been so unhappy that I have been crying', options: [{ value: 3, label: 'Yes, most of the time' }, { value: 2, label: 'Yes, quite often' }, { value: 1, label: 'Only occasionally' }, { value: 0, label: 'No, never' }] },
        { id: 10, text: 'The thought of harming myself has occurred to me', options: [{ value: 3, label: 'Yes, quite often' }, { value: 2, label: 'Sometimes' }, { value: 1, label: 'Hardly ever' }, { value: 0, label: 'Never' }] }
      ]),
      scoringGuide: JSON.stringify({ maxScore: 30, method: 'Sum all 10 items (0-3 each). Item 10 scores separately for self-harm risk.' }),
      interpretations: JSON.stringify([
        { range: '0-9', severity: 'Low Risk', description: 'Depression unlikely', recommendation: 'Continue monitoring mood. Practice self-care and reach out for support.' },
        { range: '10-30', severity: 'Possible Depression', description: 'Possible postpartum depression', recommendation: 'Professional evaluation recommended. Contact OB/GYN or mental health provider. Postpartum Support International: 1-800-944-4773.' }
      ])
    },
    {
      slug: 'lsas',
      name: 'LSAS (Liebowitz Social Anxiety Scale)',
      description: 'Comprehensive assessment of fear and avoidance in social and performance situations.',
      questions: JSON.stringify([
        { id: 1, text: 'Telephoning in public (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 2, text: 'Telephoning in public (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 3, text: 'Participating in small groups (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 4, text: 'Participating in small groups (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 5, text: 'Eating in public places (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 6, text: 'Eating in public places (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 7, text: 'Drinking with others in public places (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 8, text: 'Drinking with others in public places (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 9, text: 'Talking to people in authority (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 10, text: 'Talking to people in authority (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 11, text: 'Acting, performing, or giving a talk in front of an audience (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 12, text: 'Acting, performing, or giving a talk in front of an audience (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 13, text: 'Going to a party (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 14, text: 'Going to a party (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 15, text: 'Working while being observed (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 16, text: 'Working while being observed (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 17, text: 'Writing while being observed (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 18, text: 'Writing while being observed (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 19, text: 'Calling someone you don\'t know very well (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 20, text: 'Calling someone you don\'t know very well (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 21, text: 'Talking with people you don\'t know very well (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 22, text: 'Talking with people you don\'t know very well (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] },
        { id: 23, text: 'Meeting strangers (Fear)', options: [{ value: 0, label: 'None' }, { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Severe' }] },
        { id: 24, text: 'Meeting strangers (Avoidance)', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Occasionally' }, { value: 2, label: 'Often' }, { value: 3, label: 'Usually' }] }
      ]),
      scoringGuide: JSON.stringify({ maxScore: 144, method: 'Sum all 24 items (12 situations, each rated for fear 0-3 and avoidance 0-3).' }),
      interpretations: JSON.stringify([
        { range: '0-54', severity: 'None to Moderate', description: 'Below threshold or moderate social anxiety', recommendation: 'If impairment present, consider CBT with gradual exposure.' },
        { range: '55-64', severity: 'Moderate', description: 'Moderate social anxiety', recommendation: 'CBT recommended. Consider professional evaluation.' },
        { range: '65-79', severity: 'Marked', description: 'Marked social anxiety', recommendation: 'Professional treatment recommended. CBT is gold standard.' },
        { range: '80-94', severity: 'Severe', description: 'Severe social anxiety', recommendation: 'Urgent treatment needed. Combination therapy and medication often most effective.' },
        { range: '95-144', severity: 'Very Severe', description: 'Very severe social anxiety', recommendation: 'Immediate professional help needed. Intensive treatment recommended.' }
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
    },
    {
      slug: 'mountain-meditation',
      title: 'Mountain Meditation',
      description: 'Visualize yourself as a mountain - stable, grounded, and unshaken by passing storms. A powerful practice for cultivating inner strength and equanimity.',
      duration: 15,
      category: 'Visualization',
      benefits: JSON.stringify([
        'Builds inner stability',
        'Enhances emotional resilience',
        'Develops equanimity',
        'Grounds scattered energy',
        'Provides strength during difficult times',
        'Improves sense of self'
      ]),
      script: `Welcome to Mountain Meditation. This practice helps you connect with your inner stability and strength.

Find a comfortable seated position. Sit with dignity, spine straight but not rigid. Close your eyes or lower your gaze.

Take a few deep breaths, arriving fully in this moment.

Now, bring to mind the image of a mountain. Perhaps one you've seen, or an imaginary one. See its peak rising majestically into the sky.

Notice the mountain's solid base, rooted deeply in the earth. Its strong flanks rising up on all sides. Its peak, open to the sky.

The mountain just sits. Grounded. Stable. Majestic in its stillness.

Now, imagine that you become this mountain. Your body is the body of the mountain. Your head is the lofty peak. Your shoulders and arms are the sides of the mountain. Your seat is the broad, stable base, rooted to the earth.

Become the mountain. Sitting in perfect stillness.

Now, imagine the sun crossing the sky. Morning comes - light touches the peak. The sun rises higher. Midday. The mountain sits unchanging as the sun arcs across the sky. Evening comes. Sunset. Darkness. Stars wheel overhead. Still the mountain sits.

Imagine the seasons passing. Spring arrives with life and blossoms covering the mountain's flanks. The mountain remains unchanged. Summer brings warmth and tourists to the peak. The mountain remains as it is. Fall brings brilliant colors and cooling temperatures. Winter brings snow and ice, fierce storms. Through it all, the mountain just sits. Unmoved. Solid. Present.

As you sit, being the mountain, you may notice thoughts and feelings arising. Like weather patterns moving across the mountain's surface. Clouds come and go. Storms blow through. The sun shines. All of this passes across the mountain, but the mountain remains.

Your thoughts and emotions are like the weather - they come and go. But deep within, your core is like the mountain - stable, grounded, unchanged by passing storms.

Surface appearances change constantly. But the deep nature of the mountain remains steadfast.

This is true for you as well. External conditions change. Moods change. Thoughts change. But your essential nature - your awareness, your deep being - remains constant, like the mountain.

Sit for a few moments, being the mountain. Solid. Grounded. Dignified. Present.

When you're ready, thank the mountain for its teaching. Slowly wiggle your fingers and toes. Take a deep breath. Open your eyes.

Carry the mountain's stability with you. When life brings storms, remember: you are the mountain.

Thank you for practicing.`
    },
    {
      slug: 'walking-meditation',
      title: 'Walking Meditation',
      description: 'A mindfulness practice that turns the simple act of walking into a meditation. Perfect for those who find sitting meditation challenging.',
      duration: 10,
      category: 'Mindfulness',
      benefits: JSON.stringify([
        'Combines movement with mindfulness',
        'Grounds you in the present moment',
        'Improves body awareness',
        'Good for restless energy',
        'Can be practiced anywhere',
        'Reduces mental rumination'
      ]),
      script: `Welcome to Walking Meditation. This practice brings mindful awareness to the simple act of walking.

Find a place where you can walk slowly for about 10 to 20 paces - perhaps a hallway, a quiet room, or outdoors.

Stand still for a moment. Feel your feet on the ground. Notice your posture. Allow your arms to hang naturally or clasp your hands in front or behind you.

Begin to walk very slowly. Much slower than your usual pace. Notice the movement.

As you lift your right foot, notice the sensations. Lifting... Moving... Placing... Shifting weight.

Then the left foot. Lifting... Moving... Placing... Shifting.

Keep your gaze softly focused on the ground a few feet ahead. Not looking around, just walking.

Notice the complex choreography of walking. The weight shifting. Muscles engaging. The foot rolling through its motion.

Heel touches down. Weight shifts forward. Toes press and push off. The other foot swings forward.

Walking is a miracle we often take for granted.

If your mind wanders - and it will - gently bring your attention back to the sensations of walking. The feet. The legs. The movement through space.

You can use silent mental noting if it helps: "Lifting... Moving... Placing... Shifting..."

Or simply feel the sensations directly.

Notice how your body balances. The intricate adjustments happening automatically.

Continue walking at this slow, mindful pace. When you reach the end of your path, pause. Stand still. Notice the stopping.

Then slowly turn around and walk back.

Lifting... Moving... Placing... Shifting...

Each step is a new moment. Each moment an opportunity to be fully present.

Walking meditation shows us that we don't need to be still to be mindful. We can bring presence to any activity.

Continue for a few more minutes at your own pace. 

When you're finished, stand still for a moment. Notice how your body feels. Notice your state of mind.

You can practice walking meditation anywhere - even in short bursts during your day. Walking to your car. Walking down a hallway. Mindful steps, present moment awareness.

Thank you for practicing.`
    },
    {
      slug: 'compassion-meditation',
      title: 'Self-Compassion Meditation',
      description: 'A gentle practice based on Dr. Kristin Neff\'s research on self-compassion. Learn to treat yourself with the same kindness you\'d offer a good friend.',
      duration: 12,
      category: 'Compassion',
      benefits: JSON.stringify([
        'Reduces self-criticism',
        'Increases self-acceptance',
        'Builds emotional resilience',
        'Reduces anxiety and depression',
        'Scientifically validated benefits',
        'Helps with perfectionism'
      ]),
      script: `Welcome to Self-Compassion Meditation. This practice will help you develop a kinder, more accepting relationship with yourself.

Find a comfortable position. Place one or both hands over your heart, feeling the warmth and gentle movement of your breath.

Take a few deep breaths, arriving in the present moment.

Think of a situation in your life that's causing you stress or difficulty. Nothing overwhelming - choose something moderately difficult.

Notice how it feels in your body. Perhaps tension, heaviness, tightness. Just notice without trying to change it.

This is a moment of suffering. Stress is part of being human. All people struggle sometimes.

Now, bring to mind someone who naturally makes you feel loved and cared for. Perhaps a friend, family member, mentor, or even a pet. Imagine their presence with you now.

What would they say to you about this difficult situation? How would they look at you? Feel their compassion for you.

Now, speak to yourself the way they would speak to you. Use your own words, or try these phrases:

"This is really hard right now."
"I'm doing the best I can."
"May I be kind to myself in this moment."
"May I give myself the compassion I need."

Let these words be genuine and heartfelt. You deserve your own compassion.

Place your hands on your heart. Feel the warmth. Your body is responding to the kindness you're offering yourself.

Everyone struggles. Everyone feels pain. You're not alone in this. Your struggle connects you to all of humanity.

Offer yourself the kindness you would offer a good friend who was struggling.

"May I be patient with myself."
"May I remember that I'm only human."
"May I be strong when I need to be, and gentle when I need to be."

If you notice your inner critic arising, that's okay. Just notice it, and return to self-kindness.

The practice is not about getting rid of difficult feelings. It's about holding them with kindness.

You can be imperfect and still be worthy of love and belonging.

Take a few more breaths, hands on your heart. Feel the warmth of self-compassion.

This is always available to you. Whenever you're struggling, you can place your hands on your heart and speak to yourself with kindness.

You are worthy of compassion - especially your own.

When you're ready, take a deep breath and open your eyes.

Remember: you don't have to be perfect to deserve kindness. You deserve it simply because you're human.

Thank you for practicing.`
    },
    {
      slug: 'gratitude-meditation',
      title: 'Gratitude Meditation',
      description: 'Research shows that regular gratitude practice increases happiness, reduces depression, and improves relationships. A simple but powerful practice.',
      duration: 8,
      category: 'Positive Psychology',
      benefits: JSON.stringify([
        'Increases positive emotions',
        'Reduces depression symptoms',
        'Improves sleep quality',
        'Enhances relationships',
        'Backed by scientific research',
        'Shifts focus from lack to abundance'
      ]),
      script: `Welcome to Gratitude Meditation. This practice helps us notice and appreciate the good in our lives.

Find a comfortable position. Close your eyes. Take a few deep breaths, letting go of any tension.

Gratitude is not about denying difficulties. It's about also acknowledging what's good. Both can be true.

Bring to mind something simple you're grateful for. Perhaps the bed you slept in last night. The roof over your head. The food you ate today. Clean water to drink.

These things we often take for granted are luxuries many people lack. Take a moment to really feel appreciation for this basic good thing.

Now, bring to mind a person you're grateful for. Someone who has helped you, supported you, or brought joy to your life. Picture their face. Recall a specific moment with them.

Allow yourself to feel the warmth of gratitude for this person. Let it fill your heart.

Silently or aloud, say "Thank you."

Next, bring to mind something about your body you're grateful for. Perhaps your eyes that let you see beauty. Your ears that let you hear music. Your legs that carry you. Your breath that sustains you.

Our bodies work tirelessly for us. Feel appreciation for this amazing vessel.

Now think of a challenge you've faced that ultimately helped you grow. Something difficult that taught you something important, or made you stronger.

Even our struggles can be teachers. Can you find gratitude for the lesson, even if the experience was hard?

Think of a simple pleasure you experienced today or recently. Perhaps sunshine on your face. A good cup of coffee. A smile from a stranger. A moment of laughter. A song you love.

Life offers small gifts constantly. We just need to notice them.

Finally, take a moment to feel grateful for this moment right now. For your ability to pause. To breathe. To be present. For your willingness to practice and grow.

Feel gratitude filling your heart like warm light. Let it expand through your chest, through your body.

Gratitude is always available. Even on difficult days, there are things to appreciate. This practice strengthens our ability to notice them.

Before you open your eyes, set an intention to notice three good things today. They don't need to be big. Small moments of goodness count.

Take a deep breath. When you're ready, open your eyes.

Carry gratitude with you. Let it brighten your day.

Thank you for practicing.`
    },
    {
      slug: 'yoga-nidra-sleep',
      title: 'Yoga Nidra for Sleep',
      description: 'Ancient yogic sleep technique that guides you into deep relaxation at the edge of sleep. Helps insomnia and promotes restorative rest.',
      duration: 20,
      category: 'Sleep',
      benefits: JSON.stringify([
        'Treats insomnia',
        'Promotes deep rest',
        'Reduces sleep anxiety',
        'Resets nervous system',
        'Ancient proven technique',
        'Safe and natural',
        'Works even if you don\'t fully sleep',
        'Restorative for mind and body'
      ]),
      script: `Welcome to Yoga Nidra for sleep. Make yourself comfortable in bed. You're going to stay in this position for the entire practice, so adjust now.

Lie on your back if comfortable. Let your feet fall open naturally. Arms by your sides, palms up. If you need support, place a pillow under your knees or head.

Close your eyes. You will remain still and aware, riding the edge between waking and sleep.

Take a deep breath in... and release with a sigh.

Again, breathe in... and let go completely.

Set your intention: "I am going to follow this practice and fall into deep, restorative sleep."

Become aware of your body lying here. Feel the contact with the bed beneath you. Your body is safe, supported, held by the earth.

Bring your awareness to your right hand. Right thumb. Index finger. Middle finger. Ring finger. Little finger. Palm of your right hand. Back of your right hand.

Right wrist. Forearm. Elbow. Upper arm. Right shoulder.

Right side of your chest. Right side of your waist. Right hip.

Right thigh. Right knee. Right calf. Right ankle. Right heel. Sole of right foot. Top of right foot. Right toes. All the toes of the right foot together.

Now bring awareness to the left hand. Left thumb. Index finger. Middle finger. Ring finger. Little finger. Palm of your left hand. Back of your left hand.

Left wrist. Forearm. Elbow. Upper arm. Left shoulder.

Left side of chest. Left side of waist. Left hip.

Left thigh. Left knee. Left calf. Left ankle. Left heel. Sole of left foot. Top of left foot. Left toes. All the toes of the left foot together.

Your whole back body. Shoulder blades. Entire length of your spine. Lower back. Buttocks. Back of both legs.

Your whole front body. Throat. Chest. Abdomen. Front of legs.

Your head. Back of head. Crown. Forehead. Both eyebrows. Space between the eyebrows. Right eyelid. Left eyelid. Right eye. Left eye. Right ear. Left ear. Right cheek. Left cheek. Nose. Tip of nose. Upper lip. Lower lip. Chin. Jaw. Entire face soft and relaxed.

Whole body together. Completely relaxed.

Now imagine you are lying on warm sand at the beach. The sun is setting. You are completely safe and relaxed. The sand is warm beneath you, gently holding your body.

You hear waves in the distance. Soft, rhythmic, peaceful. The sound lulls you deeper into relaxation.

A warm breeze touches your skin. So pleasant. So peaceful.

You are safe. You are held. You can let go completely.

With each breath, you're drifting deeper. Deeper into rest. Deeper toward sleep.

Your body is so heavy. So relaxed. Sinking into the warm sand. Sinking into the bed.

Your mind is becoming quiet. Peaceful. Still.

The waves keep rolling. Breath by breath. Wave by wave. You're drifting. Drifting into sleep.

Let go now. Allow sleep to come. Your body knows how to sleep. Trust it.

Drifting... drifting... into deep, restorative sleep.

[Long silence - allow natural sleep]

Sleep well. Rest deeply. Good night.`
    },
    {
      slug: 'pain-management-meditation',
      title: 'Pain Management Meditation',
      description: 'Evidence-based meditation for chronic pain. Helps change your relationship with pain, reducing suffering even when pain is present.',
      duration: 15,
      category: 'Specialized',
      benefits: JSON.stringify([
        'Reduces pain intensity',
        'Decreases emotional suffering',
        'Improves pain coping',
        'Backed by research',
        'Safe complement to medical treatment',
        'Empowers self-management',
        'Reduces pain catastrophizing'
      ]),
      script: `Welcome to Pain Management Meditation. This practice can help you change your relationship with physical pain.

Note: This is a complement to medical treatment, not a replacement. Always work with healthcare providers for pain management.

Find the most comfortable position possible. Use pillows, cushions, whatever helps.

Take a few breaths. Acknowledge that you're here, with courage, to work with difficult sensations.

Pain is a signal, not the enemy. It's your body communicating. Today we practice being with pain in a new way.

Bring your awareness to your breath. Notice breathing in... breathing out. The breath can be your anchor.

Now gently bring awareness to the area of pain or discomfort. Not to attack it or push it away, but simply to observe it with curiosity.

What exactly do you feel? Is it sharp? Dull? Burning? Aching? Throbbing? Tingling?

Notice that "pain" is actually made up of different sensations. Can you identify them?

Is the sensation constant or does it change? Does it pulse? Does it move?

Notice any thoughts about the pain. "This is terrible." "It will never end." These thoughts are separate from the sensation itself.

The sensation is just sensation. The thoughts about it add an extra layer of suffering.

See if you can separate physical sensation from mental story. Just for this moment.

Notice any emotions arising with the pain. Fear? Anger? Frustration? Sadness? Just notice without judgment.

Return to the breath. Breathing in... breathing out.

Now imagine your breath flowing to the area of pain. Gentle, soft breath. Breathing into the pain with kindness. Breathing out, letting muscles soften around the pain.

You're not trying to make pain disappear. You're changing your relationship with it. Meeting it with gentleness rather than resistance.

Resistance creates tension. Tension increases pain. Softening, even slightly, can ease suffering.

Breathe into pain... breathe out, softening.

Expand awareness to include your whole body. Yes, there is pain in this area. And there is also the rest of your body. Your left hand. Your right foot. Your belly. Parts that don't hurt.

Pain can fill our entire awareness. Practice making pain just one part of a larger field of sensation.

Notice the spaces between pain pulses, if there are any. The brief moments of less pain. Can you notice those too?

Bring compassion to yourself. Living with pain is hard. You're doing the best you can.

Place your hand on your heart if comfortable. "This is hard. This is a moment of suffering. May I be kind to myself."

You are more than your pain. Pain is an experience you're having. It's not who you are.

Take a few more breaths. Thank yourself for practicing.

When you're ready, slowly return your awareness to the room. Wiggle fingers and toes gently. Open your eyes.

Practice this regularly. Over time, many people find that while pain may not disappear, their suffering decreases.

You have more control than you might think - not over pain, but over your response to it.

Be patient with yourself. Be kind to yourself.

Thank you for practicing.`
    },
    {
      slug: 'anger-release-meditation',
      title: 'Anger Release Meditation',
      description: 'A safe, healthy way to acknowledge and release anger without suppressing it or acting destructively. Based on emotion regulation research.',
      duration: 10,
      category: 'Emotion Regulation',
      benefits: JSON.stringify([
        'Safely processes anger',
        'Prevents anger suppression',
        'Reduces reactivity',
        'Improves emotional regulation',
        'Decreases rumination',
        'Protects relationships'
      ]),
      script: `Welcome to Anger Release Meditation. This practice helps you acknowledge and release anger in a healthy way.

Anger is a normal emotion. It's data. It tells us something matters to us, that a boundary was crossed. The problem isn't feeling anger - it's what we do with it.

Find a comfortable seated position. Take a few deep breaths.

Bring to mind a situation that's making you angry. Not the most intense anger - start with something moderate.

Notice where you feel anger in your body. Jaw clenched? Chest tight? Stomach churning? Hands in fists? Heat rising?

Just notice. Don't judge the anger or yourself for feeling it.

Say to yourself: "I am angry. This is anger. Anger is present."

Naming it gives you space from it. You're not saying "I AM anger" - you're saying "I'm experiencing anger."

Anger is often a secondary emotion. What's underneath? Fear? Hurt? Feeling disrespected? Powerless? Scared?

Take a breath and ask yourself: "What does this anger want me to know?"

Maybe it's saying: "This isn't fair." "This hurts." "I deserve better." "This matters to me."

Listen to your anger like it's a messenger. What's the message?

Now, imagine the anger as energy in your body. What color is it? What shape? Where is it located?

With each exhale, imagine releasing some of this energy. Not all of it - just a little bit at a time.

Breathe in... and as you breathe out, let some anger energy release from your body.

You might imagine it as red smoke leaving your body. Or dark clouds dispersing. Or hot steam releasing.

Keep breathing. Releasing a little bit with each exhale.

You're not suppressing anger - you're letting your body discharge the activation.

Now, if you're ready, try this: Say out loud or silently, "I release you."

"I release you. I don't need to carry this in my body anymore."

You can be angry and not hold tension in your body. You can acknowledge the wrong and still let go of the grip.

Clench your fists tight. Really tight. Hold that tension... hold it... now release. Let your hands open. Shake them out.

This is what we're doing energetically. Holding... acknowledging... releasing.

Roll your shoulders. Shake your head gently. Let your jaw release.

Take five deep breaths. With each exhale, release more tension.

If you need to take action about the situation that angered you, you can still do that from a calmer place. Releasing the physical activation helps you respond wisely instead of reacting impulsively.

Feel your feet on the ground. You're here. You're safe. You have choices about how to respond.

Place a hand on your heart. "This made me angry because I care. And I can take care of myself."

Take one more deep breath. Shake out your whole body if that feels good.

When you're ready, open your eyes.

You can return to this practice whenever anger arises. Feel it. Name it. Understand its message. Release the physical activation. Then respond wisely.

Thank you for practicing.`
    },
    {
      slug: 'morning-energizing-meditation',
      title: 'Morning Energizing Meditation',
      description: 'Start your day with positive energy, intention, and vitality. A quick practice to wake up your body and mind.',
      duration: 5,
      category: 'Energy',
      benefits: JSON.stringify([
        'Increases morning energy',
        'Sets positive intention for the day',
        'Wakes up body and mind',
        'Improves mood',
        'Reduces morning anxiety',
        'Quick and efficient'
      ]),
      script: `Good morning! Welcome to your Energizing Morning Meditation.

Sit up tall or stand for this practice. We're waking up your body and mind.

Take a deep breath in through your nose... hold it at the top... and exhale powerfully through your mouth with a "HA!" sound.

Again! Big breath in... hold... "HA!" Push it all out.

One more! Breathe in deeply... and "HA!" Feel the wake-up energy.

Now, rub your palms together rapidly until they're warm. Place your warm palms over your closed eyes. Feel the warmth and energy.

Gently release your hands. Blink your eyes open.

Roll your shoulders back five times. Wake up your upper body.

Roll your shoulders forward five times.

Turn your head gently side to side. Left... right... left... right.

Reach your arms up overhead. Stretch tall! Reach for the sky. Feel yourself lengthening.

Now interlace your fingers and flip your palms toward the ceiling. Stretch! Hold... and release.

Give yourself a big hug. Wrap your arms around yourself. Take a breath. You're here. New day. New possibilities.

Release your arms and shake them out. Shake your whole body. Like a dog shaking off water. Shake! Wake up!

Stop. Stand or sit still. Notice your energy now compared to when you started.

Place your hand on your heart. Set an intention for your day. How do you want to feel today? How do you want to show up?

Maybe: "I am energized and ready for this day."
"I move through this day with ease and positivity."
"I am capable and resilient."

Choose your own words that resonate with you.

Take a deep breath in. Hold it. Feel the energy, the potential of this new day.

Exhale slowly.

You're awake. You're alive. You're ready.

Take this energy with you. If you slump during the day, take 30 seconds to stretch, breathe deeply, and shake it out. You can reset anytime.

Thank you for starting your day with intention.

Have a wonderful day!`
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
    },
    {
      slug: 'self-compassion-break',
      name: 'Self-Compassion Break',
      category: 'Self-Compassion',
      description: 'Dr. Kristin Neff\'s quick practice for moments of difficulty. Combines mindfulness, common humanity, and self-kindness.',
      steps: JSON.stringify([
        'Notice you\'re suffering: "This is a moment of suffering"',
        'Recognize common humanity: "Suffering is part of life" or "I\'m not alone"',
        'Offer yourself kindness: "May I be kind to myself" or "May I give myself compassion"',
        'Optional: Place hand(s) over your heart',
        'Breathe and feel the warmth',
        'Use your own words that feel genuine',
        'Return to situation with more kindness'
      ]),
      examples: JSON.stringify([
        'After mistake: "This is hard. Everyone makes mistakes. May I learn and grow from this."',
        'During anxiety: "This is suffering. I\'m not alone in feeling anxious. May I be patient with myself."',
        'After rejection: "This hurts. Rejection is part of being human. May I hold myself with kindness."'
      ]),
      when: 'During any difficult moment, failure, pain, or when being self-critical',
      benefits: JSON.stringify([
        'Reduces self-criticism',
        'Increases resilience',
        'Scientifically validated',
        'Can be done in under a minute',
        'Reduces anxiety and depression',
        'Improves well-being'
      ])
    },
    {
      slug: 'worry-time',
      name: 'Worry Time (Scheduled Worry)',
      category: 'CBT',
      description: 'Contain worry by scheduling a specific time to worry, freeing rest of day from rumination.',
      steps: JSON.stringify([
        'Choose a 15-30 minute worry time daily',
        'Not close to bedtime',
        'Same time and place each day',
        'When worry arises outside this time: "Not now"',
        'Write it down to address during worry time',
        'During worry time: Review worries systematically',
        'Problem-solve what you can',
        'Accept uncertainty for what you can\'t control',
        'End on time, regardless'
      ]),
      examples: JSON.stringify([
        'Set 5:00-5:30pm as worry time',
        'Morning worry arises: "I\'ll think about that at 5pm"',
        'Write it down and return to present',
        'At 5pm, review all worries',
        'Action plan or practice acceptance'
      ]),
      when: 'For chronic worry, rumination, or when worry interferes with daily functioning',
      benefits: JSON.stringify([
        'Reduces overall worry time',
        'Interrupts rumination',
        'Frees up mental space',
        'Improves concentration',
        'Evidence-based for GAD',
        'Gives sense of control'
      ])
    },
    {
      slug: 'thought-defusion',
      name: 'Thought Defusion (ACT)',
      category: 'ACT',
      description: 'Change relationship with thoughts by seeing them as mental events, not facts. Creates distance from unhelpful thoughts.',
      steps: JSON.stringify([
        'Notice the thought: "I\'m having the thought that..."',
        'Sing it to "Happy Birthday" tune',
        'Say it in a cartoon voice',
        'Visualize thought as words on screen',
        'Watch thought like leaf floating down stream',
        'Thank your mind: "Thanks mind, interesting thought"',
        'Practice with many thoughts',
        'Notice: You are not your thoughts'
      ]),
      examples: JSON.stringify([
        'Thought: "I\'m a failure" → "I\'m having the thought that I\'m a failure"',
        'Thought: "They hate me" → Sing it to Happy Birthday',
        'Thought: "I can\'t do this" → Say in Mickey Mouse voice',
        'Visualize anxious thoughts as passing clouds'
      ]),
      when: 'When stuck in negative thoughts, rumination, or when thoughts feel like absolute truth',
      benefits: JSON.stringify([
        'Reduces thought believability',
        'Decreases rumination',
        'Increases psychological flexibility',
        'Reduces distress',
        'Evidence-based for anxiety/depression',
        'Quick and portable'
      ])
    },
    {
      slug: 'values-clarification',
      name: 'Values Clarification',
      category: 'ACT',
      description: 'Identify your core values to guide meaningful action and life direction.',
      steps: JSON.stringify([
        'Reflect on life domains: relationships, work, health, leisure, spirituality',
        'For each: "What matters most to me here?"',
        'Distinguish values from goals (values never finished)',
        'Ask: "At my funeral, what would I want said about how I lived?"',
        'Identify 3-5 core values',
        'Rate current alignment with each (1-10)',
        'Choose one value-aligned action in each domain',
        'Commit to values-based living'
      ]),
      examples: JSON.stringify([
        'Value: Connection vs Goal: Have 5 friends',
        'Value: Growth vs Goal: Read 50 books',
        'Value: Compassion vs Goal: Volunteer monthly',
        'Action: If I value adventure, I could try one new thing weekly'
      ]),
      when: 'When feeling lost, making big decisions, or when actions don\'t match what matters',
      benefits: JSON.stringify([
        'Increases life meaning',
        'Guides decision-making',
        'Increases motivation',
        'Reduces depression',
        'Improves life satisfaction',
        'Creates direction'
      ])
    },
    {
      slug: 'behavioral-experiments',
      name: 'Behavioral Experiments (CBT)',
      category: 'CBT',
      description: 'Test your negative predictions to discover if they\'re accurate. Gather real-world evidence.',
      steps: JSON.stringify([
        'Identify negative prediction: "If I do X, then Y will happen"',
        'Rate belief strength (0-100%)',
        'Design experiment to test it',
        'Make specific, measurable prediction',
        'Carry out experiment',
        'Observe what actually happens',
        'Record results objectively',
        'Re-rate belief strength',
        'Update belief based on evidence'
      ]),
      examples: JSON.stringify([
        'Prediction: "If I speak up, everyone will think I\'m stupid" → Test: Speak up once → Result: Two people agreed with me',
        'Prediction: "If I leave the house, I\'ll have a panic attack" → Test: Walk to mailbox → Result: Felt anxious but no panic attack',
        'Prediction: "If I try, I\'ll fail" → Test: Try small task → Result: Succeeded'
      ]),
      when: 'When holding untested negative beliefs, avoiding situations, or stuck in anxiety',
      benefits: JSON.stringify([
        'Reality-tests negative thoughts',
        'Reduces avoidance',
        'Builds confidence',
        'Evidence-based',
        'Empowering',
        'Reduces anxiety'
      ])
    },
    {
      slug: 'exposure-hierarchy',
      name: 'Exposure Hierarchy Creation',
      category: 'CBT/Exposure Therapy',
      description: 'Create a ladder of feared situations to gradually face fears, starting with easier steps.',
      steps: JSON.stringify([
        'Identify the feared situation/object',
        'List 10-15 related situations from least to most scary',
        'Rate each situation\'s anxiety level (0-100 SUDS)',
        'Ensure even spacing between steps',
        'Add more steps if gaps are too large',
        'Start with step rated 30-40 SUDS',
        'Stay in situation until anxiety decreases 50%',
        'Repeat until anxiety is low, then advance',
        'Work up the hierarchy systematically'
      ]),
      examples: JSON.stringify([
        'Social anxiety: (20) Email colleague → (40) Phone call → (60) Team meeting → (80) Presentation to 5 people → (100) Conference talk',
        'Spider phobia: (15) Look at pictures → (30) Video of spider → (50) Spider in container across room → (70) Near container → (100) Touch container',
        'Public transport: (25) Sit in parked bus → (45) One stop bus ride → (65) Three stops → (85) Train ride → (100) Rush hour train'
      ]),
      when: 'For phobias, OCD, PTSD, social anxiety, or any fear-based avoidance',
      benefits: JSON.stringify([
        'Systematic anxiety reduction',
        'Evidence-based for phobias',
        'Builds mastery gradually',
        'Reduces avoidance',
        'Long-lasting results',
        'Gold standard for anxiety'
      ])
    },
    {
      slug: 'tipp-skills',
      name: 'TIPP Skills (DBT Crisis)',
      category: 'DBT',
      description: 'Fast-acting DBT skills for crisis: Temperature, Intense exercise, Paced breathing, Paired muscle relaxation.',
      steps: JSON.stringify([
        'T - Temperature: Splash cold water on face or hold ice',
        'Cold activates dive reflex, calms quickly',
        'I - Intense Exercise: Run, jump, do burpees for several minutes',
        'Burns off adrenaline',
        'P - Paced Breathing: Breathe out longer than in (5 in, 7 out)',
        'Activates calm response',
        'P - Paired Muscle Relaxation: Tense and release muscle groups',
        'Use what works for your crisis'
      ]),
      examples: JSON.stringify([
        'Panic attack: Hold ice cubes while doing paced breathing',
        'Rage: Do intense exercise until exhausted',
        'Overwhelming emotion: Splash cold water on face',
        'Can combine multiple: Cold water + paced breathing'
      ]),
      when: 'During emotional crisis, panic, rage, overwhelming urges, or high distress',
      benefits: JSON.stringify([
        'Works in minutes',
        'Physiologically calming',
        'Prevents destructive actions',
        'Evidence-based',
        'Can be done anywhere',
        'No equipment needed (mostly)',
        'Highly effective'
      ])
    },
    {
      slug: 'accepts-distraction',
      name: 'ACCEPTS (DBT Distraction)',
      category: 'DBT',
      description: 'Seven DBT distraction strategies for tolerating crisis without making it worse.',
      steps: JSON.stringify([
        'A - Activities: Engage in absorbing activity',
        'C - Contributing: Help someone else',
        'C - Comparisons: Compare to worse times or others\' situations',
        'E - Emotions: Generate opposite emotion (comedy if sad)',
        'P - Pushing away: Mentally push situation away temporarily',
        'T - Thoughts: Occupy mind with other thoughts (puzzles, counting)',
        'S - Sensations: Use strong sensation (ice, hot shower, loud music)',
        'Use when you can\'t solve problem right now'
      ]),
      examples: JSON.stringify([
        'A: Clean, puzzle, video game, craft',
        'C: Text supportive message, volunteer, help friend',
        'C: "At least..." or "Others have it worse" (carefully)',
        'E: Watch comedy, listen to upbeat music',
        'P: Visualize boxing up problem until later',
        'T: Count backwards by 7s, name countries alphabetically',
        'S: Bite into lemon, take cold shower, hold ice'
      ]),
      when: 'During crisis you can\'t immediately solve, or when emotions are too high for problem-solving',
      benefits: JSON.stringify([
        'Prevents impulsive actions',
        'Buys time for emotions to decrease',
        'Gets through crisis safely',
        'Multiple options',
        'Evidence-based',
        'Works for various situations'
      ])
    },
    {
      slug: 'self-soothe-five-senses',
      name: 'Self-Soothing with 5 Senses (DBT)',
      category: 'DBT',
      description: 'Comfort yourself through each of the five senses during distress.',
      steps: JSON.stringify([
        'Vision: Look at beautiful images, art, nature, sunset',
        'Hearing: Listen to favorite music, nature sounds, rain',
        'Smell: Light candle, essential oils, bake cookies, flowers',
        'Taste: Savor tea, chocolate, favorite food mindfully',
        'Touch: Soft blanket, hot bath, pet your cat/dog, massage hands',
        'Engage fully with each sense',
        'Notice the pleasant sensation',
        'Use multiple senses if helpful'
      ]),
      examples: JSON.stringify([
        'Vision: Watch sunset, look at photos of loved ones',
        'Hearing: Playlist of calming songs, ocean waves',
        'Smell: Lavender oil, fresh coffee, baking bread',
        'Taste: Slowly eat piece of dark chocolate',
        'Touch: Warm bath with soft music and candle'
      ]),
      when: 'During distress, after crisis, when needing comfort, or for self-care',
      benefits: JSON.stringify([
        'Immediate comfort',
        'Activates parasympathetic system',
        'Grounds in present',
        'Improves distress tolerance',
        'Self-nurturing',
        'Can be luxurious or simple'
      ])
    },
    {
      slug: 'pros-and-cons',
      name: 'Pros and Cons (DBT)',
      category: 'DBT',
      description: 'Systematic comparison of pros and cons of tolerating vs not tolerating distress, or of acting vs not acting on urges.',
      steps: JSON.stringify([
        'Draw 2x2 grid',
        'Label: Tolerate Distress | Don\'t Tolerate Distress',
        'Top row: Pros of each',
        'Bottom row: Cons of each',
        'Or: Act on Urge | Resist Urge',
        'Fill in all four boxes honestly',
        'Think short-term AND long-term consequences',
        'Review when struggling with decision',
        'Make values-based choice'
      ]),
      examples: JSON.stringify([
        'Urge to use substances: Pros of using (feel better now) vs Cons (hangover, shame, relapse)',
        'Urge to self-harm: Pros of doing it (temporary relief) vs Pros of resisting (healing, pride, safety)',
        'Tolerate breakup pain vs call ex repeatedly',
        'Do exposure therapy vs avoid feared situation'
      ]),
      when: 'When torn between choices, before acting on destructive urge, or when needing motivation to tolerate distress',
      benefits: JSON.stringify([
        'Clarifies consequences',
        'Increases motivation',
        'Interrupts impulsivity',
        'Reveals long-term vs short-term tradeoffs',
        'Evidence-based',
        'Empowering'
      ])
    },
    {
      slug: 'dear-man',
      name: 'DEAR MAN (DBT Interpersonal Effectiveness)',
      category: 'DBT',
      description: 'DBT skill for asking for what you want or saying no effectively while maintaining relationships.',
      steps: JSON.stringify([
        'D - Describe situation objectively (just facts)',
        'E - Express feelings and opinions clearly',
        'A - Assert by asking clearly or saying no',
        'R - Reinforce: Explain positive effects of getting what you want',
        'M - Mindful: Stay focused, broken record if needed',
        'A - Appear confident: Eye contact, posture, calm voice',
        'N - Negotiate: Be willing to compromise',
        'Practice before difficult conversation'
      ]),
      examples: JSON.stringify([
        'D: "You borrowed my car and returned it with an empty gas tank" E: "I felt frustrated" A: "Please fill up the tank" R: "That way I can lend it again"',
        'D: "You asked me to work this weekend" E: "I\'m exhausted" A: "I need to say no" R: "I\'ll be more productive after rest"',
        'Stay Mindful: If they change subject, return to your point',
        'Negotiate: "I can\'t work all weekend, but I could do Saturday morning"'
      ]),
      when: 'Before asking for something, saying no, resolving conflict, or setting boundaries',
      benefits: JSON.stringify([
        'Increases effectiveness',
        'Maintains self-respect',
        'Preserves relationships',
        'Reduces anxiety about asking',
        'Evidence-based',
        'Improves communication'
      ])
    },
    {
      slug: 'give',
      name: 'GIVE (DBT Relationship Skills)',
      category: 'DBT',
      description: 'DBT skill for maintaining and improving relationships while being interpersonally effective.',
      steps: JSON.stringify([
        'G - Gentle: Be courteous and nice, no attacks or threats',
        'Avoid judgmental statements',
        'I - Interested: Listen to other person, don\'t interrupt',
        'Show genuine interest in their perspective',
        'V - Validate: Acknowledge their feelings as understandable',
        'You don\'t have to agree, just show you hear them',
        'E - Easy manner: Use humor, smile, be light when possible',
        'Don\'t take everything too seriously',
        'Builds goodwill and connection'
      ]),
      examples: JSON.stringify([
        'Gentle: "I\'d like to talk about..." vs "You always..."',
        'Interested: "Tell me more about how you felt"',
        'Validate: "It makes sense you\'d feel that way given..."',
        'Easy: Smile, keep it light where appropriate',
        'Example: "Hey, I know we see this differently. I really want to understand your side. Can we talk about it over coffee?"'
      ]),
      when: 'When relationship is priority, during conflict, or when you want to strengthen connection',
      benefits: JSON.stringify([
        'Strengthens relationships',
        'Reduces conflict',
        'Increases trust',
        'Makes difficult conversations easier',
        'Shows respect',
        'Evidence-based'
      ])
    },
    {
      slug: 'fast',
      name: 'FAST (DBT Self-Respect)',
      category: 'DBT',
      description: 'DBT skill for maintaining self-respect during interactions, especially conflicts.',
      steps: JSON.stringify([
        'F - Fair: Be fair to yourself AND others',
        'Don\'t sacrifice yourself, but don\'t be selfish',
        'A - Apologies (no excessive): Don\'t over-apologize',
        'Apologize once if warranted, then stop',
        'S - Stick to values: Act according to your values',
        'Don\'t compromise your integrity',
        'T - Truthful: Don\'t lie, don\'t exaggerate',
        'Be honest while being kind',
        'Walk away with self-respect intact'
      ]),
      examples: JSON.stringify([
        'Fair: "I can help for an hour, but then I need to go" (not "I guess I\'ll cancel my plans...")',
        'No excessive apologies: "I\'m sorry I was late" not "I\'m so sorry, I\'m terrible, I always..."',
        'Stick to values: If honesty is your value, don\'t lie to avoid conflict',
        'Truthful: "I\'m not available" not making up elaborate excuses'
      ]),
      when: 'When people-pleasing, over-apologizing, or when you might compromise values to avoid conflict',
      benefits: JSON.stringify([
        'Maintains self-respect',
        'Prevents resentment',
        'Builds integrity',
        'Reduces people-pleasing',
        'Strengthens boundaries',
        'Evidence-based'
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
