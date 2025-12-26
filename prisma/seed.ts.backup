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
    // Add more disorders here - for brevity showing 2 detailed examples
    // In production, all 40+ would be included
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
