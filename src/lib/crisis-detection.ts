export const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'self harm', 'cut myself', 'hurt myself', 'harm myself',
  'overdose', 'end it all', 'better off dead', 'no reason to live',
  'going to die', 'plan to kill', 'goodbye cruel world'
];

export const HIGH_RISK_KEYWORDS = [
  'depressed', 'hopeless', 'worthless', "can't go on", 'give up',
  'no point', 'unbearable', "can't take it", 'too much pain'
];

export function detectCrisisLanguage(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lower.includes(keyword));
}
