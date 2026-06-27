import disordersData from "@/data/disorders.json";

/**
 * The disorder library has 393 conditions spread across ~45 raw `category`
 * values, several of which overlap (e.g. three different "trauma & stress"
 * labels). For browsing, we collapse them into 9 digestible super-clusters so
 * the landing page presents a scannable grid instead of a wall of 393 names.
 *
 * Every raw category maps to exactly one cluster (see DISORDER_CLUSTERS).
 */

export interface DisorderCluster {
  id: string;
  name: string;
  shortName: string;
  description: string;
  categories: string[];
}

export const DISORDER_CLUSTERS: DisorderCluster[] = [
  {
    id: "anxiety",
    name: "Anxiety, Phobias & OCD",
    shortName: "Anxiety & OCD",
    description: "Excessive worry, fears, phobias, panic, and intrusive thoughts.",
    categories: [
      "Anxiety Disorders",
      "Specific Phobias",
      "Obsessive-Compulsive and Related Disorders",
      "Obsessive-Compulsive Disorders",
      "Anxiety and Somatic Disorders",
      "Anxiety and Depressive Disorders",
    ],
  },
  {
    id: "mood",
    name: "Mood & Depression",
    shortName: "Mood",
    description: "Persistent low mood, depression, and bipolar spectrum conditions.",
    categories: [
      "Depressive Disorders",
      "Mood Disorders",
      "Bipolar and Related Disorders",
      "Mood and Emotional Regulation Conditions",
      "Affective and Emotional Processing Conditions",
    ],
  },
  {
    id: "trauma",
    name: "Trauma & Stress",
    shortName: "Trauma",
    description: "Trauma, PTSD, adjustment and chronic stress responses.",
    categories: [
      "Trauma- and Stressor-Related Disorders",
      "Adjustment and Stress-Related Disorders",
      "Trauma & Stress Disorders",
      "Stress and Burnout Disorders",
    ],
  },
  {
    id: "substance",
    name: "Substance Use & Addiction",
    shortName: "Addiction",
    description: "Substance use, dependency, and behavioral addictions.",
    categories: [
      "Substance-Related and Addictive Disorders",
      "Behavioral Addictions",
      "Addictive Disorders",
      "Substance/Medication-Induced Disorders",
    ],
  },
  {
    id: "eating",
    name: "Eating, Feeding & Body Image",
    shortName: "Eating & Body",
    description: "Eating and feeding conditions and body-image concerns.",
    categories: [
      "Feeding and Eating Disorders",
      "Eating Disorders",
      "Feeding Disorders",
      "Body Image and Self-Concept Disorders",
    ],
  },
  {
    id: "personality",
    name: "Personality & Dissociative",
    shortName: "Personality",
    description: "Personality patterns and dissociative experiences.",
    categories: ["Personality Disorders", "Dissociative Disorders"],
  },
  {
    id: "psychotic",
    name: "Psychotic & Thought Disorders",
    shortName: "Psychotic",
    description: "Schizophrenia spectrum, psychosis, and perceptual conditions.",
    categories: [
      "Psychotic Disorders",
      "Schizophrenia Spectrum and Other Psychotic Disorders",
      "Neuropsychiatric Disorders",
      "Sensory and Perceptual Disorders",
      "Perceptual Disorders",
    ],
  },
  {
    id: "neuro",
    name: "Neurodevelopmental & Cognitive",
    shortName: "Neuro & Cognitive",
    description: "Neurodevelopmental, learning, communication, and cognitive conditions.",
    categories: [
      "Neurodevelopmental Disorders",
      "Neurodevelopmental Conditions",
      "Communication Disorders",
      "Specific Learning Disorders",
      "Neurocognitive Disorders",
      "Disruptive, Impulse-Control, and Conduct Disorders",
      "Disruptive Disorders",
      "Elimination Disorders",
    ],
  },
  {
    id: "sleep-other",
    name: "Sleep, Somatic & Other",
    shortName: "Sleep & Other",
    description: "Sleep, somatic symptom, sexual/gender, and other conditions.",
    categories: [
      "Sleep-Wake Disorders",
      "Somatic Symptom and Related Disorders",
      "Somatic Disorders",
      "Sexual Dysfunctions",
      "Paraphilic Disorders",
      "Gender-Related Conditions",
      "Other Mental Health Conditions",
    ],
  },
];

const all = (disordersData as Array<{ slug: string; name: string; category: string; description?: string }>).filter(
  (d) => d && d.slug && d.category,
);

export function getCluster(clusterId: string): DisorderCluster | undefined {
  return DISORDER_CLUSTERS.find((c) => c.id === clusterId);
}

export function getDisordersForCluster(clusterId: string) {
  const cluster = getCluster(clusterId);
  if (!cluster) return [];
  return all
    .filter((d) => cluster.categories.includes(d.category))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export interface ClusterWithCount extends DisorderCluster {
  count: number;
}

export function getClustersWithCounts(): ClusterWithCount[] {
  return DISORDER_CLUSTERS.map((c) => ({
    ...c,
    count: all.filter((d) => c.categories.includes(d.category)).length,
  })).sort((a, b) => b.count - a.count);
}

/** Sanity: confirm every disorder lands in exactly one cluster (no orphans). */
export function getUncategorizedDisorders(): { name: string; category: string }[] {
  const known = new Set(DISORDER_CLUSTERS.flatMap((c) => c.categories));
  return all.filter((d) => !known.has(d.category)).map((d) => ({ name: d.name, category: d.category }));
}
