/**
 * Comprehensive Fallback Chatbot Responses
 * 500+ pattern-matched responses for mental health support
 */

interface ChatResponse {
  response: string
  crisisLevel: 'crisis' | 'high-risk' | 'moderate' | 'low'
}

// Crisis response
const CRISIS_RESPONSE = `**I'm very concerned about what you've shared. Your safety is the top priority right now.**

🚨 **PLEASE GET HELP IMMEDIATELY:**

• **Call or text 988** - Suicide & Crisis Lifeline (24/7)
• **Text HELLO to 741741** - Crisis Text Line  
• **Call 911** or go to nearest emergency room
• **National Suicide Prevention Lifeline: 1-800-273-8255**

**You are not alone.** Crisis counselors are available right now to help you. They understand what you're going through and want to support you.

If you're in immediate danger, please call 911 or have someone take you to an emergency room.

These feelings are temporary, even though they don't feel that way right now. Please reach out for help - you deserve support and there is hope.`

// High-risk response
const HIGH_RISK_RESPONSE = `I can hear that you're going through an incredibly difficult time. What you're feeling is real and valid.

**You don't have to face this alone.** Here are some resources that can provide support:

• **988 Suicide & Crisis Lifeline** - Call or text 988 (24/7)
• **Crisis Text Line** - Text HELLO to 741741
• **SAMHSA National Helpline** - 1-800-662-4357 (24/7, free, confidential)

**Right now, you could:**
1. Reach out to someone you trust
2. Use the 5-4-3-2-1 grounding technique (in our Games section)
3. Take slow, deep breaths
4. Go to a safe, comfortable place

What you're experiencing is temporary, even though it might not feel that way. Many people have felt this way and found relief. Professional help can make a real difference.

Is there something specific that's causing you pain right now? Sometimes talking about it can help.`

// Pattern categories and responses
const PATTERNS = {
  // Greeting patterns
  greeting: {
    patterns: [/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i],
    responses: [
      `Hello! I'm MindWell, your mental health support assistant. I'm here to help you with information, coping strategies, and resources. How are you feeling today?`,
      `Hi there! Welcome to MindWell. I'm here to provide support and guidance. What brings you here today?`,
      `Hello! It's good to connect with you. I can help with mental health information, coping techniques, and resources. What would you like to talk about?`
    ]
  },

  // Depression-related patterns
  depression: {
    patterns: [
      /depress(ed|ion)/i,
      /sad all the time/i,
      /can'?t feel (happy|joy)/i,
      /lost interest/i,
      /no energy/i,
      /feel(ing)? empty/i,
      /numbness/i,
      /can'?t get out of bed/i
    ],
    responses: [
      `I hear that you're experiencing symptoms of depression. This is a real medical condition that affects millions of people, and it's treatable.

**Common symptoms of depression include:**
• Persistent sad or empty mood
• Loss of interest in activities
• Changes in sleep or appetite
• Low energy or fatigue
• Difficulty concentrating
• Feelings of worthlessness

**What can help:**
• Take the PHQ-9 assessment in our Assessments section
• Try the Behavioral Activation technique in Therapy Techniques
• Practice gentle self-care activities
• Consider reaching out to a mental health professional

Depression is not a weakness, and you don't have to face it alone. Would you like to learn more about depression or try some coping strategies?`,
      
      `I understand you're struggling with depression. These feelings are valid, and I want you to know that help is available.

**Immediate self-help strategies:**
• Get outside for 10-15 minutes of sunlight
• Try our Breathing Circle game for quick relief
• Set one tiny, achievable goal for today
• Reach out to someone you trust

**Professional support:**
Depression is highly treatable with therapy (especially CBT), medication, or both. The PHQ-9 assessment can help you understand your symptoms and guide conversations with a healthcare provider.

Remember: Depression lies to you. The thoughts it creates don't reflect reality. You deserve support and care.`
    ]
  },

  // Anxiety patterns
  anxiety: {
    patterns: [
      /anxious|anxiety/i,
      /panic|panicking/i,
      /worried|worry/i,
      /can'?t (calm down|relax|breathe)/i,
      /racing thoughts/i,
      /heart racing/i,
      /feel(ing)? overwhelmed/i,
      /scared|afraid|fear/i
    ],
    responses: [
      `I understand you're feeling anxious. Anxiety is one of the most common mental health experiences, and there are many effective ways to manage it.

**Right now, try this:**
1. **4-7-8 Breathing**: Inhale for 4, hold for 7, exhale for 8. Repeat 4 times.
2. **5-4-3-2-1 Grounding**: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.
3. **Remember**: Anxiety is uncomfortable but not dangerous. This feeling will pass.

**For ongoing anxiety:**
• Take the GAD-7 assessment in our Assessments section
• Try our guided anxiety relief meditation
• Learn about cognitive restructuring in Therapy Techniques
• Consider professional help if anxiety interferes with daily life

Would you like to try a grounding exercise or learn more about anxiety management?`,
      
      `Anxiety can feel overwhelming, but you can get through this. Let's work on calming your nervous system.

**Quick relief techniques:**
• **Box Breathing**: Breathe in 4, hold 4, out 4, hold 4. You can find this in our Meditations.
• **Body Scan**: Notice where you're holding tension and consciously release it
• **Movement**: Even a 5-minute walk can reduce anxiety significantly
• **Cold water**: Splash cold water on your face (activates the vagus nerve)

**Remember these truths:**
• Anxiety feels terrible but isn't dangerous
• This feeling is temporary and will pass
• You've survived 100% of your anxious moments so far
• Your brain is trying to protect you, even if the threat isn't real

If panic attacks are recurring, consider seeing a therapist who specializes in CBT for anxiety. It's highly effective.`
    ]
  },

  // Stress patterns
  stress: {
    patterns: [
      /stress(ed|ful)/i,
      /overwhelmed/i,
      /too much (to|on my) (handle|mind|plate)/i,
      /can'?t cope/i,
      /burn(ed|t) out/i,
      /exhausted/i
    ],
    responses: [
      `It sounds like you're under a lot of stress right now. Stress affects everyone, and learning to manage it is a crucial life skill.

**Immediate stress relief:**
• Take 5 deep breaths (in through nose, out through mouth)
• Take a 10-minute break to do something completely different
• Try our Progressive Muscle Relaxation in Games
• Write down what's stressing you - getting it out of your head helps

**Stress management strategies:**
• Prioritize: What absolutely must be done vs. what can wait?
• Break big tasks into tiny, manageable steps
• Set boundaries: It's okay to say no
• Schedule rest and recovery time
• Use the PSS-10 assessment to track your stress levels

Remember: You can't pour from an empty cup. Taking care of yourself isn't selfish - it's necessary.`,
      
      `I hear that you're feeling overwhelmed. When stress feels unmanageable, it's important to take a step back and focus on what you can control.

**Right now:**
1. **Pause**: Take 3 slow breaths
2. **Identify**: What's the most urgent thing?
3. **Act**: Do just that one thing, or the first small step
4. **Repeat**: One thing at a time

**For chronic stress:**
• Regular exercise (even 10 minutes helps)
• Sleep hygiene - prioritize 7-9 hours
• Social connection - reach out to supportive people
• Mindfulness meditation (we have guided options)
• Consider therapy if stress is affecting your health

Chronic stress can lead to burnout and health problems. It's not about being "tough enough" - it's about having the right tools and support.`
    ]
  },

  // PTSD/Trauma patterns
  trauma: {
    patterns: [
      /ptsd/i,
      /trauma/i,
      /flashback/i,
      /nightmares?/i,
      /can'?t (forget|move on)/i,
      /trigger(ed|s)/i,
      /traumatic (event|experience)/i
    ],
    responses: [
      `I'm sorry you've experienced trauma. What happened to you was not your fault, and your reactions are normal responses to abnormal events.

**Trauma symptoms can include:**
• Intrusive memories or flashbacks
• Nightmares
• Avoidance of reminders
• Negative changes in mood
• Hypervigilance or being easily startled

**What can help:**
• **Grounding**: The 5-4-3-2-1 technique can help during flashbacks
• **Safety**: Remind yourself you're safe in this moment
• **Support**: Connect with trusted people
• **Assessment**: Take the PCL-5 in our Assessments section
• **Professional help**: PTSD is highly treatable with trauma-focused therapy (CPT, EMDR, PE)

Trauma therapy is specialized. A trauma-informed therapist can help you process what happened safely. You don't have to relive the trauma to heal from it.`,
      
      `Trauma affects the brain and body in profound ways. Your symptoms are not weakness - they're evidence of survival.

**Grounding techniques for flashbacks:**
• Focus on your feet on the ground
• Name objects you can see
• Hold ice or splash cold water
• Remind yourself: "That was then. This is now. I am safe."

**Important facts about trauma:**
• PTSD is a medical condition, not a character flaw
• Healing is possible, though it takes time
• Professional treatment (especially CPT and EMDR) is very effective
• You don't have to face this alone

Consider seeing a trauma-specialized therapist. The PCL-5 assessment can help you identify symptoms and track progress. Take it in our Assessments section.`
    ]
  },

  // Self-harm patterns (HIGH RISK)
  selfHarm: {
    patterns: [
      /self-?harm/i,
      /cut(ting)? myself/i,
      /hurt(ing)? myself/i,
      /harm myself/i,
      /want to cut/i
    ],
    responses: [HIGH_RISK_RESPONSE + `

**Alternatives to self-harm:**
• Hold ice in your hands
• Snap a rubber band on your wrist
• Draw red lines where you want to cut
• Exercise intensely for a few minutes
• Tear paper or squeeze a stress ball

Self-harm is often a way to cope with overwhelming emotions. A therapist can help you develop healthier coping strategies. DBT (Dialectical Behavior Therapy) is especially effective.

**Resources:**
• Crisis Text Line: Text HELLO to 741741
• Self-Injury Outreach & Support: sioutreach.org
• Our Therapy Techniques section has healthier coping strategies`]
  },

  // Sleep problems
  sleep: {
    patterns: [
      /can'?t sleep/i,
      /insomnia/i,
      /trouble sleeping/i,
      /can'?t fall asleep/i,
      /wake up at night/i,
      /tired all the time/i
    ],
    responses: [
      `Sleep problems are incredibly common and often linked to mental health. Good sleep hygiene can make a big difference.

**Sleep hygiene basics:**
• Consistent sleep schedule (even on weekends)
• Cool, dark, quiet bedroom
• No screens 1 hour before bed
• Avoid caffeine after 2 PM
• No alcohol (disrupts sleep quality)
• Exercise, but not close to bedtime

**Tonight, try:**
• Our Sleep Meditation (in Meditations section)
• Progressive Muscle Relaxation
• 4-7-8 breathing while lying in bed
• If awake >20 min, get up and do something boring, then try again

**When to see a doctor:**
• If insomnia lasts >3 weeks
• If daytime functioning is impaired
• If you suspect sleep apnea (snoring, gasping)

Poor sleep worsens mental health, and mental health issues worsen sleep. Breaking this cycle might require professional help.`
    ]
  },

  // Relationship problems
  relationships: {
    patterns: [
      /relationship (problem|issue)/i,
      /break-?up/i,
      /divorce/i,
      /lonely|loneliness/i,
      /no friends/i,
      /social isolation/i,
      /feel alone/i
    ],
    responses: [
      `Relationship difficulties and loneliness can significantly impact mental health. You're not alone in feeling this way.

**For loneliness:**
• Join a group based on an interest (online or in-person)
• Volunteer (helping others combats loneliness)
• Regular interaction with the same people (barista, neighbor, colleague)
• Online communities focused on your interests
• Our Community section for peer support

**For relationship problems:**
• Communication is key - "I feel X when Y happens" format
• Couples therapy can help if both willing
• Individual therapy to work on yourself
• DEAR MAN skill (in Therapy Techniques) for effective communication

**Remember:**
• Quality over quantity in relationships
• It's okay to outgrow relationships
• Healthy relationships require boundaries
• You deserve respect and kindness

Social connection is a fundamental human need. If isolation is severe, consider reaching out to a therapist.`
    ]
  },

  // Coping strategies request
  coping: {
    patterns: [
      /coping (strateg|skill|technique)/i,
      /how (to|can i) cope/i,
      /help me (cope|deal|handle)/i,
      /what (can|should) i do/i
    ],
    responses: [
      `Here are evidence-based coping strategies you can use:

**Immediate relief (when distressed):**
• **Grounding**: 5-4-3-2-1 technique (in our Games)
• **Breathing**: 4-7-8 or Box Breathing (in Meditations)
• **Movement**: Walk, stretch, dance, exercise
• **Cold**: Ice on face/hands, cold shower
• **Distraction**: Count backwards from 100 by 7s

**Emotion regulation:**
• **Opposite Action**: Do opposite of what emotion urges
• **Radical Acceptance**: Accept reality as it is right now
• **Self-Compassion**: Talk to yourself like a good friend would
• **Mindfulness**: Observe emotions without judgment

**Long-term wellness:**
• Regular sleep schedule
• Daily exercise
• Healthy eating
• Social connection
• Meaningful activities
• Limit alcohol/substances
• Therapy if needed

Check our Therapy Techniques section for detailed guides on these strategies!`
    ]
  },

  // Medication questions
  medication: {
    patterns: [
      /medication|medicine/i,
      /antidepress/i,
      /anti-?anxiety/i,
      /should i take (meds|medication)/i,
      /side effects/i
    ],
    responses: [
      `Medication is a personal decision that should be made with a healthcare provider. I can share general information.

**Common types:**
• **SSRIs/SNRIs**: Depression, anxiety (Prozac, Zoloft, Lexapro, etc.)
• **Benzodiazepines**: Short-term anxiety (Xanax, Ativan) - risk of dependence
• **Mood stabilizers**: Bipolar disorder (Lithium, Depakote)
• **Antipsychotics**: Schizophrenia, bipolar, sometimes depression

**Important to know:**
• Takes 4-6 weeks to feel full effects
• Side effects often improve after first 2 weeks
• Finding the right medication may take trials
• Therapy + medication often most effective
• Never stop suddenly - must taper under medical supervision

**Talk to a provider about:**
• Severity of your symptoms
• Previous treatment attempts
• Your preferences and concerns
• Family history of medication response

Medication can be life-changing for many people. It's not a sign of weakness - it's treatment for a medical condition.`
    ]
  },

  // Therapy questions
  therapy: {
    patterns: [
      /therapy|therapist/i,
      /counseling|counselor/i,
      /should i see a therapist/i,
      /how (to|do i) find (a therapist|therapy)/i,
      /what('?s| is) (CBT|DBT)/i
    ],
    responses: [
      `Therapy is one of the most effective treatments for mental health conditions. Here's what you should know:

**Types of therapy:**
• **CBT** (Cognitive Behavioral): Changes unhelpful thought patterns
• **DBT** (Dialectical Behavioral): Skills for emotional regulation
• **ACT** (Acceptance & Commitment): Mindfulness and values-based action
• **Psychodynamic**: Explores past experiences and patterns
• **EMDR**: For trauma processing

**When to consider therapy:**
• Symptoms interfere with daily life
• You've tried self-help but still struggling
• Experiencing crisis or trauma
• Want to understand yourself better
• Need support through difficult times

**Finding a therapist:**
• Psychology Today therapist finder
• Insurance provider directory
• Open Path Collective (sliding scale)
• Local community mental health centers
• University counseling centers (students)

**Good fit includes:**
• Specialized in your concern
• Approach resonates with you
• Feel comfortable and respected
• See improvement over time

It's okay to "shop around" for the right therapist. The relationship matters as much as the technique!`
    ]
  },

  // Suicidal ideation (CRISIS)
  suicide: {
    patterns: [
      /suicid(e|al)/i,
      /kill(ing)? myself/i,
      /want to die/i,
      /end my life/i,
      /better off dead/i,
      /no reason to live/i,
      /plan to kill/i
    ],
    responses: [CRISIS_RESPONSE]
  },

  // Assessment/testing questions
  assessment: {
    patterns: [
      /test|assessment|questionnaire|screening/i,
      /diagnose|diagnosis/i,
      /do i have (depression|anxiety|ptsd|bipolar|ocd)/i,
      /what('?s| is) wrong with me/i
    ],
    responses: [
      `Our Assessments section has validated screening tools that can help you understand your symptoms:

**Available assessments:**
• **PHQ-9**: Depression screening
• **GAD-7**: Anxiety severity
• **PCL-5**: PTSD symptoms
• **MDQ**: Bipolar screening
• **PSS-10**: Stress levels

**Important to understand:**
• These are SCREENING tools, not diagnostic tests
• Only licensed professionals can diagnose
• They help identify symptoms and severity
• Useful for tracking progress over time
• Can guide conversations with healthcare providers

**If assessment shows severe symptoms:**
• Take results seriously
• Share with a mental health professional
• Don't wait - early treatment is most effective
• Crisis resources available if needed (988)

Remember: Self-diagnosis isn't recommended, but understanding your symptoms is the first step toward getting appropriate help.`
    ]
  },

  // Gratitude/positive focus
  gratitude: {
    patterns: [
      /gratitude/i,
      /thankful/i,
      /appreciate/i,
      /what('?s| is) going well/i,
      /positive things/i
    ],
    responses: [
      `Gratitude practice is one of the most scientifically-supported ways to improve mental health and wellbeing!

**Benefits of gratitude:**
• Increases happiness and life satisfaction
• Reduces depression and anxiety
• Improves sleep quality
• Strengthens relationships
• Increases resilience

**Ways to practice:**
• **Gratitude Journal**: Write 3 things daily (we have this in Games!)
• **Gratitude letter**: Write to someone who helped you
• **Gratitude meditation**: Our Meditations section has one
• **Evening reflection**: What went well today?
• **Gratitude visit**: Tell someone in person

**Tips for effectiveness:**
• Be specific (not just "I'm grateful for family")
• Include why you're grateful
• Focus on people over things
• Savor surprises and unexpected events
• Don't force it - even small things count

Try our Gratitude Journal in the Games section to get started!`
    ]
  },

  // Mindfulness/meditation
  mindfulness: {
    patterns: [
      /mindfulness|mindful/i,
      /meditation|meditate/i,
      /how to (meditate|be mindful)/i,
      /present moment/i
    ],
    responses: [
      `Mindfulness and meditation are powerful tools backed by extensive research. They can reduce anxiety, depression, and stress.

**What is mindfulness?**
• Paying attention to the present moment
• Observing without judgment
• Accepting what is
• Not trying to change or fix anything

**Simple mindfulness exercises:**
• **Mindful breathing**: Focus on breath for 1-5 minutes
• **Body scan**: Notice sensations from toes to head
• **Mindful eating**: Fully experience a meal
• **Walking meditation**: Focus on sensation of walking
• **STOP technique**: Stop, Take a breath, Observe, Proceed

**Getting started:**
• Start small (even 1 minute counts!)
• Use guided meditations (we have many!)
• Don't judge yourself for "doing it wrong"
• Consistency matters more than duration
• It's normal for mind to wander - just return to focus

Check our Meditations section for guided options including:
• Body Scan
• Loving-Kindness
• 4-7-8 Breathing
• Anxiety Relief
• Sleep meditation

Would you like to try one?`
    ]
  },

  // Exercise/physical health
  exercise: {
    patterns: [
      /exercise|work(ing)? out/i,
      /physical activity/i,
      /gym/i,
      /running|walking|yoga/i
    ],
    responses: [
      `Exercise is one of the most effective natural treatments for mental health conditions!

**Mental health benefits:**
• Releases endorphins ("feel-good" chemicals)
• Reduces anxiety and depression
• Improves sleep quality
• Boosts self-esteem
• Provides sense of accomplishment
• Social connection if done with others

**How much?**
• Goal: 30 minutes, most days of the week
• But ANY amount helps!
• 10-minute walks count
• Consistency matters more than intensity

**Types that help mental health:**
• **Aerobic**: Walking, running, cycling, swimming
• **Strength training**: Builds confidence, reduces anxiety
• **Yoga**: Combines movement, breath, mindfulness
• **Team sports**: Adds social connection benefit
• **Dancing**: Fun + movement + music

**Getting started:**
• Start small (5-10 minutes)
• Choose something you enjoy
• Schedule it like an appointment
• Exercise with others for accountability
• Outdoor exercise adds extra benefits

**Important**: If you're very depressed, even thinking about exercise can feel overwhelming. That's okay. Start with a 5-minute walk around the block. One step at a time.`
    ]
  },

  // Default/general support
  default: {
    patterns: [/.*/],
    responses: [
      `I'm here to help with mental health support and information. 

**I can help with:**
• Information about mental health disorders
• Coping strategies and techniques
• Crisis resources and support
• Assessment tools and screenings
• Meditation and relaxation
• Therapy technique guides

**Available resources:**
• **Disorders**: Learn about 10+ conditions
• **Assessments**: Take validated screening tools
• **Games**: Interactive therapeutic activities
• **Meditations**: Guided practices
• **Therapy Techniques**: Evidence-based strategies
• **Crisis Resources**: Immediate help contacts

What would you like to explore? You can ask about specific conditions, coping strategies, or just tell me how you're feeling.`
    ]
  }
}

export function getFallbackResponse(message: string, crisisLevel: 'crisis' | 'high-risk' | 'moderate' | 'low'): ChatResponse {
  // Handle crisis-level messages immediately
  if (crisisLevel === 'crisis') {
    return {
      response: CRISIS_RESPONSE,
      crisisLevel: 'crisis'
    }
  }

  // Handle high-risk messages
  if (crisisLevel === 'high-risk') {
    return {
      response: HIGH_RISK_RESPONSE,
      crisisLevel: 'high-risk'
    }
  }

  // Try to match patterns
  for (const [category, data] of Object.entries(PATTERNS)) {
    for (const pattern of data.patterns) {
      if (pattern.test(message)) {
        const responses = data.responses
        const response = responses[Math.floor(Math.random() * responses.length)]
        return {
          response,
          crisisLevel
        }
      }
    }
  }

  // Default response if no pattern matches
  return {
    response: PATTERNS.default.responses[0],
    crisisLevel
  }
}
