import { describe, it, expect } from 'vitest';
import {
  CRISIS_BANGLADESH,
  CRISIS_BANGLADESH_NIMH,
  CRISIS_US,
  EMERGENCY,
} from '@/lib/crisis-info';
import { verifiedCrisisHotlines } from '@/data/verified-crisis-hotlines';

/**
 * crisis-info is the single source of truth for the crisis numbers shown across
 * the UI (P0 #3). These tests pin it to the values that appear on the live site
 * and — critically — prove the lookup actually resolves from the verified
 * dataset (so a rename/edit in the data file surfaces here instead of silently
 * falling back).
 */
describe('crisis-info (single source of truth)', () => {
  it('resolves the Bangladesh primary hotline from the verified dataset', () => {
    expect(CRISIS_BANGLADESH.country).toBe('Bangladesh');
    expect(CRISIS_BANGLADESH.organization).toBe('Kaan Pete Roi');
    expect(CRISIS_BANGLADESH.phone).toBe('01779-554391');
    expect(CRISIS_BANGLADESH.hours).toBe('24/7');
  });

  it('builds a dialable tel: link for the BD number', () => {
    // local "01779-554391" -> international "+8801779554391"
    expect(CRISIS_BANGLADESH.tel).toBe('tel:+8801779554391');
  });

  it('resolves the Bangladesh NIMH secondary line', () => {
    expect(CRISIS_BANGLADESH_NIMH.phone).toBe('16789');
  });

  it('resolves the US 988 lifeline from the verified dataset', () => {
    expect(CRISIS_US.country).toBe('United States');
    expect(CRISIS_US.organization).toBe('988 Suicide & Crisis Lifeline');
    expect(CRISIS_US.phone).toBe('988');
    expect(CRISIS_US.tel).toBe('tel:988');
  });

  it('exposes country-standard emergency numbers', () => {
    expect(EMERGENCY.BD).toBe('999');
    expect(EMERGENCY.US).toBe('911');
  });

  it('the resolved BD/US entries really exist in verifiedCrisisHotlines (no silent fallback)', () => {
    const hasBD = verifiedCrisisHotlines.some(
      (h) =>
        h.countryCode === 'BD' &&
        h.organization === CRISIS_BANGLADESH.organization &&
        h.phone === CRISIS_BANGLADESH.phone,
    );
    const hasUS = verifiedCrisisHotlines.some(
      (h) =>
        h.countryCode === 'US' &&
        h.organization === CRISIS_US.organization &&
        h.phone === CRISIS_US.phone,
    );
    expect(hasBD).toBe(true);
    expect(hasUS).toBe(true);
  });
});
