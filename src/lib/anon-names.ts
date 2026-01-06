const adjectives = [
  "Calm",
  "Brave",
  "Gentle",
  "Quiet",
  "Kind",
  "Hopeful",
  "Caring",
  "Strong",
  "Bright",
  "Resilient",
  "Peaceful",
  "Thoughtful",
  "Patient",
  "Mindful",
  "Positive"
];

const nouns = [
  "Star",
  "River",
  "Ocean",
  "Sky",
  "Sunrise",
  "Mountain",
  "Lotus",
  "Willow",
  "Phoenix",
  "Horizon",
  "Comet",
  "Forest",
  "Breeze",
  "Rainbow",
  "Meadow"
];

export function generateAnonymousName(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${adj}${noun}${num}`;
}
