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
