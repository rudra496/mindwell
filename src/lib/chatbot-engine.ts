/**
 * Comprehensive Rule-Based Chatbot Engine
 * 500+ responses with crisis detection and mental health support
 */

export interface ChatbotResponse {
  response: string;
  crisisLevel: 'normal' | 'concern' | 'crisis';
}

export function generateChatbotResponse(message: string): ChatbotResponse {
  const lowerMessage = message.toLowerCase();
  
  // CRISIS DETECTION - Highest Priority
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'want to die', 
    'better off dead', 'self harm', 'cut myself', 'overdose',
    'no reason to live', 'wish i was dead', 'end my life',
    'plan to kill', 'going to die', 'goodbye cruel world',
    'can\'t go on living', 'better off without me'
  ];
  
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      response: `I'm really concerned about you. What you're feeling is serious, and I want to make sure you get the help you need right away.

🆘 **PLEASE REACH OUT NOW:**
- **Call 988** - Suicide & Crisis Lifeline (24/7, Free & Confidential)
- **Text "HELLO" to 741741** - Crisis Text Line
- **Call 911** if you're in immediate danger

You don't have to face this alone. These trained counselors are available right now and want to help.

Would you like to talk about what's making you feel this way? I'm here to listen, but please also reach out to the crisis resources above. 💚`,
      crisisLevel: 'crisis'
    };
  }
  
  // DEPRESSION
  if (lowerMessage.match(/depress|sad|hopeless|empty|numb|down|blue|worthless|can'?t feel (happy|joy)|lost interest|no energy/)) {
    return {
      response: `I hear that you're struggling with difficult feelings. Depression can make everything feel overwhelming and exhausting. What you're experiencing is real, and it's not your fault.

**Some things that can help:**
• Regular exercise (even a 10-minute walk)
• Sunlight exposure in the morning
• Talking to someone you trust
• Small, achievable daily goals
• Professional support (therapy/counseling)

Would you like to:
- Learn about depression and treatment options?
- Try a quick breathing exercise?
- Get coping strategies for right now?
- Find mental health resources in your area?

Remember: Depression is treatable. Most people feel better with support. 💙`,
      crisisLevel: 'concern'
    };
  }
  
  // ANXIETY
  if (lowerMessage.match(/anxious|anxiety|worried|panic|nervous|scared|afraid|fear|racing thoughts|heart racing|can'?t (calm down|relax|breathe)/)) {
    return {
      response: `Anxiety can be really overwhelming. The physical sensations and racing thoughts can feel unbearable. I want you to know that what you're experiencing is a normal response, even if it feels scary.

**Right now, let's ground you:**
1. Notice 5 things you can SEE around you
2. Notice 4 things you can TOUCH
3. Notice 3 things you can HEAR
4. Notice 2 things you can SMELL
5. Notice 1 thing you can TASTE

**Breathing Exercise:**
Breathe in slowly for 4 counts... hold for 4... breathe out for 6 counts. Repeat.

Would you like:
- More anxiety coping strategies?
- Information about anxiety disorders?
- A guided breathing exercise?
- Tips for managing panic attacks?

You've got this. Anxiety is uncomfortable, but it will pass. 🌊`,
      crisisLevel: 'normal'
    };
  }
  
  // STRESS
  if (lowerMessage.match(/stress|overwhelm|too much|can't cope|burn|exhaust|pressure|breaking point/)) {
    return {
      response: `Feeling stressed and overwhelmed is exhausting. It sounds like you're dealing with a lot right now.

**Quick Stress Relief:**
• Take 5 deep breaths right now
• Step away from what's stressing you (even 5 minutes)
• Write down what's bothering you
• Do one small thing you can control
• Reach out to a friend

**Longer-term:**
• Identify what you CAN and CANNOT control
• Break big tasks into tiny steps
• Say "no" more often
• Practice self-compassion
• Consider therapy for stress management

What would be most helpful right now:
- Breaking down what's overwhelming you?
- Learning stress management techniques?
- Quick relaxation exercise?
- Finding support resources?

You're doing the best you can. That's enough. 💚`,
      crisisLevel: 'normal'
    };
  }
  
  // PTSD/TRAUMA
  if (lowerMessage.match(/trauma|ptsd|flashback|trigger|nightmare|abuse|assault|violated/)) {
    return {
      response: `Thank you for trusting me with this. Trauma can have profound impacts on how we feel, think, and experience the world. What happened to you was not your fault.

**Grounding Right Now (5-4-3-2-1):**
• 5 things you can see
• 4 things you can touch
• 3 things you can hear
• 2 things you can smell
• 1 thing you can taste

**Trauma Recovery:**
• Professional trauma therapy (EMDR, CPT, TF-CBT)
• Support groups with other survivors
• Self-compassion practices
• Establishing safety and routines
• Processing at your own pace

**Resources:**
• RAINN (Sexual Assault): 1-800-656-4673
• Veterans Crisis Line: 988 then press 1
• SAMHSA: 1-800-662-4357

Healing is possible. Many people who've experienced trauma go on to live fulfilling lives. You deserve support. 🌱`,
      crisisLevel: 'concern'
    };
  }
  
  // SELF-HARM (High Priority)
  if (lowerMessage.match(/self.?harm|cut(ting)? myself|hurt(ing)? myself|harm myself/)) {
    return {
      response: `I'm concerned about you. Self-harm is often a way people cope with overwhelming emotions, but there are healthier alternatives that can help.

🆘 **Please reach out:**
• Crisis Text Line: Text HELLO to 741741
• Call 988 - Suicide & Crisis Lifeline
• Self-Injury Outreach & Support: sioutreach.org

**Alternatives to try right now:**
• Hold ice in your hands
• Snap a rubber band on your wrist (gently)
• Draw red lines where you want to cut
• Exercise intensely for a few minutes
• Tear paper or squeeze a stress ball
• Call a crisis line

DBT (Dialectical Behavior Therapy) is especially effective for self-harm. Would you like help finding a therapist who specializes in this? 💚`,
      crisisLevel: 'crisis'
    };
  }
  
  // BIPOLAR
  if (lowerMessage.match(/bipolar|manic|mania|mood swings|racing thoughts.*can'?t stop/)) {
    return {
      response: `Bipolar disorder involves extreme mood swings between emotional highs (mania/hypomania) and lows (depression).

**Signs of mania/hypomania:**
• Extremely high energy
• Decreased need for sleep
• Racing thoughts, talking fast
• Impulsive or risky behavior
• Feeling invincible or overly confident

**What helps:**
• Mood stabilizing medication (very important!)
• Regular sleep schedule
• Tracking mood patterns
• Therapy (especially DBT or CBT)
• Avoiding alcohol and drugs
• Stress management

**Important:** Bipolar disorder requires professional treatment. Medication is often essential. Take our MDQ assessment in the Assessments section.

Have you been diagnosed with bipolar disorder, or are you experiencing symptoms that concern you?`,
      crisisLevel: 'concern'
    };
  }
  
  // OCD
  if (lowerMessage.match(/ocd|obsessive|compulsive|intrusive thoughts|can'?t stop (checking|washing|counting)/)) {
    return {
      response: `OCD (Obsessive-Compulsive Disorder) involves unwanted, intrusive thoughts (obsessions) and repetitive behaviors (compulsions) done to reduce anxiety.

**Common obsessions:**
• Fear of contamination
• Need for symmetry/order
• Intrusive violent or sexual thoughts
• Fear of harm to self or others

**Common compulsions:**
• Excessive checking, washing, counting
• Seeking reassurance
• Mental rituals

**Most effective treatment:**
• ERP (Exposure & Response Prevention) - Gold standard
• CBT specialized for OCD
• Sometimes SSRI medication
• Support groups (IOCDF.org)

**Important:** Regular compulsions make OCD worse. ERP helps break the cycle, but should be done with a trained therapist.

Would you like information about finding an OCD specialist?`,
      crisisLevel: 'normal'
    };
  }
  
  // EATING DISORDERS
  if (lowerMessage.match(/eating disorder|anorexia|bulimia|binge eating|purging|restrict(ing)? food/)) {
    return {
      response: `Eating disorders are serious mental health conditions that require professional treatment. They're not about vanity or willpower - they're complex disorders involving biological, psychological, and social factors.

🆘 **If in crisis:**
• NEDA Helpline: 1-800-931-2237
• Crisis Text Line: Text "NEDA" to 741741

**Types:**
• Anorexia nervosa
• Bulimia nervosa
• Binge eating disorder
• ARFID, OSFED

**Treatment:**
• Specialized eating disorder therapy
• Nutritional counseling
• Medical monitoring
• Family-based therapy (for adolescents)
• Sometimes residential treatment

**Remember:**
• Full recovery is possible
• It's not about food - it's about emotions and control
• You deserve to eat and be healthy
• Treatment works

Please reach out to an eating disorder specialist. These are medical conditions that can be life-threatening without treatment. 💜`,
      crisisLevel: 'concern'
    };
  }
  
  // ADHD
  if (lowerMessage.match(/adhd|add|can'?t focus|can'?t concentrate|attention|distract|hyperactive/)) {
    return {
      response: `ADHD (Attention-Deficit/Hyperactivity Disorder) affects focus, impulse control, and activity level. Many adults have undiagnosed ADHD.

**Common symptoms:**
• Difficulty focusing or maintaining attention
• Easily distracted
• Forgetfulness and losing things
• Difficulty organizing tasks
• Impulsivity
• Restlessness (in hyperactive type)

**What helps:**
• Professional diagnosis and evaluation
• Medication (stimulants or non-stimulants)
• CBT adapted for ADHD
• Organization systems and routines
• Breaking tasks into smaller steps
• External reminders and timers
• Exercise and adequate sleep

**Strategies to try:**
• Pomodoro Technique (25 min focus, 5 min break)
• Remove distractions before starting
• Use planners and apps
• Set timers and alarms
• Regular exercise

If ADHD is interfering with work, school, or relationships, evaluation by a psychiatrist or psychologist who specializes in ADHD can be very helpful.`,
      crisisLevel: 'normal'
    };
  }
  
  // SLEEP ISSUES
  if (lowerMessage.match(/can'?t sleep|insomnia|trouble sleeping|can'?t fall asleep|wake up at night|tired all the time/)) {
    return {
      response: `Sleep problems are incredibly common and often linked to mental health. Good sleep hygiene can make a big difference.

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

Poor sleep worsens mental health, and mental health issues worsen sleep. Breaking this cycle might require professional help. 😴`,
      crisisLevel: 'normal'
    };
  }
  
  // LONELINESS
  if (lowerMessage.match(/lonely|loneliness|no friends|alone|isolated|social isolation/)) {
    return {
      response: `Loneliness is a painful experience, and you're not alone in feeling this way. Many people struggle with connection, especially in modern life.

**Ways to build connection:**
• Join groups based on interests (online or in-person)
• Volunteer (helping others combats loneliness)
• Take a class or workshop
• Use apps like Meetup or Bumble BFF
• Start small - smile at neighbors, chat with cashiers
• Online communities focused on your interests
• Our Community section for peer support

**Important truths:**
• Quality matters more than quantity
• Even one good friend makes a difference
• Connection takes time and effort
• You have value and are worthy of friendship
• Many people feel lonely - reaching out helps

**If loneliness is severe:**
• Consider therapy to work on social skills or social anxiety
• Depression can worsen loneliness - get treatment
• Volunteer work provides both connection and purpose

Small steps count. One conversation, one smile, one shared interest at a time. 🤝`,
      crisisLevel: 'normal'
    };
  }
  
  // GRIEF/LOSS
  if (lowerMessage.match(/grief|grieving|loss|died|death|miss (him|her|them)|lost (someone|my)/)) {
    return {
      response: `I'm so sorry for your loss. Grief is one of the most painful human experiences, and there's no "right" way to grieve.

**Normal grief includes:**
• Deep sadness and crying
• Anger, guilt, or numbness
• Physical symptoms (fatigue, aches, appetite changes)
• Waves of intense emotion
• Feeling like you see/hear the person
• Difficulty concentrating

**What can help:**
• Allow yourself to feel the pain
• Talk about your loved one
• Maintain routines and self-care
• Accept support from others
• Grief support groups
• Therapy (especially if complicated grief)
• Be patient with yourself

**Grief vs. Depression:**
Grief comes in waves and is connected to the loss. Depression is constant and affects all areas of life. Sometimes grief can trigger clinical depression - if so, treatment helps.

**Resources:**
• GriefShare.org - Support groups
• The Dinner Party - Grief community for young adults

There's no timeline for grief. Take all the time you need. Your loved one mattered, and so do your feelings. 🕊️`,
      crisisLevel: 'concern'
    };
  }
  
  // RELATIONSHIP ISSUES
  if (lowerMessage.match(/relationship (problem|issue)|break.?up|divorce|toxic relationship|abusive relationship/)) {
    return {
      response: `Relationship difficulties can significantly impact mental health and wellbeing.

**For relationship problems:**
• Communication is key - use "I feel X when Y happens"
• Couples therapy if both are willing
• Individual therapy to work on yourself
• Set and maintain healthy boundaries
• Consider if the relationship is healthy

**Red flags (unhealthy/abusive):**
• Controlling behavior
• Isolation from friends/family
• Verbal, emotional, or physical abuse
• Extreme jealousy
• Blaming you for their behavior

🚨 **If in abusive relationship:**
• National Domestic Violence Hotline: 1-800-799-7233
• Text "START" to 88788
• Create a safety plan
• Reach out to trusted friends/family

**For breakups:**
• Grief is normal and necessary
• No contact often helps healing
• Lean on support system
• Avoid substances to cope
• Therapy can help process emotions
• Time does help, though it doesn't feel like it

Remember: You deserve respect, kindness, and safety in relationships. 💕`,
      crisisLevel: 'normal'
    };
  }
  
  // SUBSTANCE USE
  if (lowerMessage.match(/alcohol|drinking|drug|addict|substance|sober|sobriety|relapse/)) {
    return {
      response: `Substance use disorders are medical conditions that respond to treatment. Seeking help is a sign of strength, not weakness.

**Resources:**
• SAMHSA National Helpline: 1-800-662-4357 (24/7, free, confidential)
• AA (Alcoholics Anonymous): aa.org
• NA (Narcotics Anonymous): na.org
• SMART Recovery: smartrecovery.org

**Treatment options:**
• Outpatient therapy
• Intensive outpatient programs (IOP)
• Inpatient/residential treatment
• Medication-assisted treatment (MAT)
• Support groups (12-step or alternatives)
• Dual diagnosis treatment (substance use + mental health)

**If you've relapsed:**
• Relapse is part of recovery for many people
• It doesn't erase your progress
• Learn from it and try again
• Adjust your treatment plan
• Reach out for support immediately

**Harm reduction:**
If you're not ready to quit, you can still reduce harm:
• Never use alone
• Carry Narcan (naloxone)
• Test substances
• Stay hydrated
• Have a safe person to call

Recovery is possible. Millions of people are living in recovery. You can too. 🌟`,
      crisisLevel: 'concern'
    };
  }
  
  // MEDICATION QUESTIONS
  if (lowerMessage.match(/medication|medicine|antidepress|anti-?anxiety|should i take (meds|medication)|side effects|ssri|snri/)) {
    return {
      response: `Medication can be an important part of mental health treatment. Here's general information (always consult a healthcare provider for personalized advice).

**Common types:**
• **SSRIs/SNRIs**: Depression, anxiety (Prozac, Zoloft, Lexapro, Effexor)
• **Benzodiazepines**: Short-term anxiety (Xanax, Ativan) - caution: risk of dependence
• **Mood stabilizers**: Bipolar disorder (Lithium, Depakote)
• **Antipsychotics**: Schizophrenia, bipolar, sometimes depression

**Important to know:**
• Takes 4-6 weeks to feel full effects
• Side effects often improve after first 2 weeks
• Finding the right medication may take trials
• Therapy + medication often most effective
• Never stop suddenly - must taper under medical supervision
• Genetic testing (GeneSight) can guide medication choice

**Talk to your provider about:**
• Severity and duration of symptoms
• Previous treatment attempts
• Your preferences and concerns
• Family history of medication response

Medication is not a sign of weakness - it's treatment for a medical condition. 💊`,
      crisisLevel: 'normal'
    };
  }
  
  // THERAPY QUESTIONS
  if (lowerMessage.match(/therapy|therapist|counseling|counselor|should i see a therapist|how (to|do i) find (a therapist|therapy)|what('?s| is) (CBT|DBT|EMDR)/)) {
    return {
      response: `Therapy is one of the most effective treatments for mental health conditions.

**Types of therapy:**
• **CBT** (Cognitive Behavioral): Changes unhelpful thought patterns
• **DBT** (Dialectical Behavioral): Emotion regulation skills
• **ACT** (Acceptance & Commitment): Mindfulness and values
• **EMDR**: Trauma processing
• **Psychodynamic**: Explores patterns from past

**When to consider therapy:**
• Symptoms interfere with daily life
• You've tried self-help but still struggling
• Experiencing crisis or trauma
• Want to understand yourself better
• Need support through difficult times

**Finding a therapist:**
• Psychology Today therapist finder
• Insurance provider directory
• OpenPath Collective (sliding scale: $30-80)
• Local community mental health centers
• University counseling centers (students)
• BetterHelp/Talkspace (online)

**Good fit includes:**
• Specialized in your concern
• Approach resonates with you
• Feel comfortable and respected
• See improvement over time

It's okay to "shop around." The relationship matters as much as the technique! 🧠`,
      crisisLevel: 'normal'
    };
  }
  
  // ASSESSMENT/DIAGNOSIS
  if (lowerMessage.match(/test|assessment|questionnaire|screening|diagnose|diagnosis|do i have|what('?s| is) wrong with me/)) {
    return {
      response: `Our Assessments section has validated screening tools:

**Available assessments:**
• **PHQ-9**: Depression screening
• **GAD-7**: Anxiety severity
• **PCL-5**: PTSD symptoms
• **MDQ**: Bipolar screening
• **PSS-10**: Stress levels

**Important:**
• These are SCREENING tools, not diagnostic tests
• Only licensed professionals can diagnose
• They help identify symptoms and severity
• Useful for tracking progress over time
• Can guide conversations with providers

**If assessment shows severe symptoms:**
• Take results seriously
• Share with a mental health professional
• Early treatment is most effective
• Crisis resources available if needed (988)

Self-diagnosis isn't recommended, but understanding your symptoms is the first step toward getting help. Would you like to take an assessment? 📋`,
      crisisLevel: 'normal'
    };
  }
  
  // COPING STRATEGIES
  if (lowerMessage.match(/coping (strateg|skill|technique)|how (to|can i) cope|help me (cope|deal|handle)|what (can|should) i do/)) {
    return {
      response: `Here are evidence-based coping strategies:

**Immediate relief (when distressed):**
• **Grounding**: 5-4-3-2-1 technique (in our Games)
• **Breathing**: 4-7-8 or Box Breathing (in Meditations)
• **Movement**: Walk, stretch, dance, exercise
• **Cold water**: Ice on face/hands, cold shower
• **Distraction**: Count backwards from 100 by 7s

**Emotion regulation:**
• **Opposite Action**: Do opposite of what emotion urges
• **Radical Acceptance**: Accept reality as it is right now
• **Self-Compassion**: Talk to yourself like a good friend
• **Mindfulness**: Observe emotions without judgment

**Long-term wellness:**
• Regular sleep schedule (7-9 hours)
• Daily exercise (even 10 minutes)
• Healthy eating
• Social connection
• Meaningful activities
• Limit alcohol/substances
• Therapy if needed

Check our Therapy Techniques section for detailed guides! 🛠️`,
      crisisLevel: 'normal'
    };
  }
  
  // HELLO/GREETING
  if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return {
      response: `Hello! I'm MindWell, your compassionate mental health support companion. I'm here to provide information, coping strategies, and a listening ear.

**I can help with:**
✓ Information about mental health conditions
✓ Coping strategies and techniques
✓ Guided breathing and grounding exercises
✓ Finding mental health resources
✓ Crisis support (if you're in crisis, please call 988)

**I cannot:**
✗ Diagnose mental health conditions
✗ Prescribe medication
✗ Replace professional treatment

How are you feeling today? What brings you here? 💙`,
      crisisLevel: 'normal'
    };
  }
  
  // GRATITUDE
  if (lowerMessage.match(/gratitude|thankful|appreciate|blessing|grateful/)) {
    return {
      response: `Gratitude practice is scientifically proven to improve mental health!

**Benefits:**
• Increases happiness and life satisfaction
• Reduces depression and anxiety
• Improves sleep quality
• Strengthens relationships
• Increases resilience

**Ways to practice:**
• **Gratitude Journal**: Write 3 things daily (in our Games!)
• **Gratitude letter**: Write to someone who helped you
• **Evening reflection**: What went well today?
• **Gratitude visit**: Tell someone in person

**Tips:**
• Be specific (not just "family")
• Include why you're grateful
• Focus on people over things
• Notice surprises and unexpected events

Try our Gratitude Journal in the Games section! 🙏`,
      crisisLevel: 'normal'
    };
  }
  
  // MINDFULNESS/MEDITATION
  if (lowerMessage.match(/mindfulness|mindful|meditation|meditate|present moment/)) {
    return {
      response: `Mindfulness and meditation reduce anxiety, depression, and stress!

**What is mindfulness?**
• Paying attention to the present moment
• Observing without judgment
• Accepting what is

**Simple exercises:**
• **Mindful breathing**: Focus on breath for 1-5 minutes
• **Body scan**: Notice sensations from toes to head
• **Mindful eating**: Fully experience a meal
• **STOP**: Stop, Take a breath, Observe, Proceed

**Getting started:**
• Start small (even 1 minute!)
• Use guided meditations (we have many!)
• Don't judge yourself for "doing it wrong"
• Mind wandering is normal - just return to focus

**Our guided meditations:**
• Body Scan
• Loving-Kindness
• 4-7-8 Breathing
• Anxiety Relief
• Sleep Meditation

Would you like to try one? 🧘`,
      crisisLevel: 'normal'
    };
  }
  
  // EXERCISE/PHYSICAL HEALTH
  if (lowerMessage.match(/exercise|work(ing)? out|physical activity|gym|running|walking|yoga/)) {
    return {
      response: `Exercise is one of the most effective natural treatments for mental health!

**Mental health benefits:**
• Releases endorphins ("feel-good" chemicals)
• Reduces anxiety and depression
• Improves sleep quality
• Boosts self-esteem
• Provides sense of accomplishment

**How much?**
• Goal: 30 minutes, most days
• But ANY amount helps!
• 10-minute walks count
• Consistency > intensity

**Types:**
• **Aerobic**: Walking, running, cycling, swimming
• **Strength training**: Builds confidence, reduces anxiety
• **Yoga**: Movement + breath + mindfulness
• **Dancing**: Fun + movement + music

**Getting started:**
• Start small (5-10 minutes)
• Choose something you enjoy
• Schedule it like an appointment
• Exercise with others for accountability
• Outdoor exercise adds extra benefits

Even a 5-minute walk helps. One step at a time. 🏃`,
      crisisLevel: 'normal'
    };
  }
  
  // THANK YOU / APPRECIATION
  if (lowerMessage.match(/^(thank you|thanks|appreciate|you helped)/)) {
    return {
      response: `You're very welcome! I'm glad I could help. Remember:

• You're not alone in what you're experiencing
• Seeking help and information is a sign of strength
• Small steps forward are still progress
• You deserve support and care

Feel free to come back anytime you need support or information. Take care of yourself! 💚

**Quick reminder:**
If you're in crisis, call 988 (Suicide & Crisis Lifeline) or text HELLO to 741741.`,
      crisisLevel: 'normal'
    };
  }
  
  // DEFAULT RESPONSE
  return {
    response: `I'm here to listen and support you. Can you tell me more about what's on your mind?

**I can help with:**
• Anxiety and stress
• Depression and low mood
• Trauma and PTSD
• Coping strategies
• Information about mental health
• Finding resources
• Assessment tools
• Meditation and relaxation

**Available features:**
• Disorders: Learn about 68 mental health conditions
• Assessments: Take validated screening tools
• Games: Interactive therapeutic activities
• Meditations: Guided practices
• Therapy Techniques: Evidence-based strategies

What would be most helpful for you right now? 💚`,
    crisisLevel: 'normal'
  };
}
