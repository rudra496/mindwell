import { describe, it, expect } from 'vitest';
import {
  detectCrisisLanguage,
  CRISIS_KEYWORDS,
  HIGH_RISK_KEYWORDS,
} from '@/lib/crisis-detection';

/**
 * detectCrisisLanguage() gates safety-critical UI (e.g. the community post
 * crisis alert). It must catch genuine crisis language and must NOT fire on
 * ordinary distress, so this is the most important unit to keep covered.
 *
 * Known limitation (NOT asserted here, to avoid locking it in): the matcher is
 * a literal substring scan, so paraphrases such as "ending my life",
 * "cutting myself", "harming myself", or "I don't want to be here anymore" are
 * MISSED. If you improve the matcher (stemming / synonym list / model-based),
 * add cases for those here and flip them to true.
 */
describe('detectCrisisLanguage', () => {
  describe('detects crisis language (true positives)', () => {
    const crisisMessages = [
      'I want to kill myself',
      "I'm suicidal and I can't take it anymore",
      'I took an overdose of pills',
      "I'm going to end my life tonight",
      'I just want to die',
      'My friend mentioned suicide',
      'There is no reason to live',
        'Everyone would be better off dead',
      'I have a plan to kill myself',
      'I cut myself when I feel overwhelmed', // 'cut myself' substring
      'I want to harm myself',
    ];

    it.each(crisisMessages)('flags: %j', (msg) => {
      expect(detectCrisisLanguage(msg)).toBe(true);
    });

    it('is case-insensitive', () => {
      expect(detectCrisisLanguage('I WANT TO DIE')).toBe(true);
      expect(detectCrisisLanguage('Suicide')).toBe(true);
      expect(detectCrisisLanguage('END IT ALL')).toBe(true);
    });

    it('matches as a substring inside a longer sentence', () => {
      expect(detectCrisisLanguage('lately I have been feeling suicidal and empty')).toBe(true);
    });
  });

  describe('does not flag ordinary or high-risk (non-crisis) text (true negatives)', () => {
    const safeMessages = [
      'I am feeling really down today',
      'I love mindfulness and meditation',
      'Can someone recommend a therapist in Dhaka?',
      'I had a great session with my counselor',
      '',
      'feeling a bit anxious about exams',
    ];

    it.each(safeMessages)('does not flag: %j', (msg) => {
      expect(detectCrisisLanguage(msg)).toBe(false);
    });

    it('does NOT treat HIGH_RISK keywords as crisis (distinct severity tiers)', () => {
      // These belong to HIGH_RISK_KEYWORDS, not CRISIS_KEYWORDS. detectCrisisLanguage
      // must return false for distress that is not an explicit crisis statement.
      expect(detectCrisisLanguage('I feel so depressed and hopeless')).toBe(false);
      expect(detectCrisisLanguage('I feel worthless sometimes')).toBe(false);
      expect(detectCrisisLanguage("I just can't go on like this")).toBe(false);
    });
  });

  it('CRISIS_KEYWORDS and HIGH_RISK_KEYWORDS are disjoint (no overlap that would blur tiers)', () => {
    const crisis = new Set(CRISIS_KEYWORDS);
    HIGH_RISK_KEYWORDS.forEach((k) => expect(crisis.has(k)).toBe(false));
  });

  it('every CRISIS_KEYWORD is itself detected', () => {
    CRISIS_KEYWORDS.forEach((k) => {
      expect(detectCrisisLanguage(`... ${k} ...`)).toBe(true);
    });
  });
});
