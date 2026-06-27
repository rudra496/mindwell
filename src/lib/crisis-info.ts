import { verifiedCrisisHotlines } from "@/data/verified-crisis-hotlines";

/**
 * Single source of truth for the crisis numbers shown across the UI.
 *
 * MindWell's primary audience is Bangladesh, so the Bangladesh hotline is
 * shown FIRST everywhere, with the US/international line as a secondary.
 *
 * Numbers are resolved from `verifiedCrisisHotlines` so there is only ONE
 * place to update them. Hardcoding crisis numbers in components is what
 * previously produced contradictions — e.g. two DIFFERENT numbers for the same
 * Bangladesh hotline (01779-554391 in the top bar vs 09678 676 777 in the
 * footer) and US-only 988 prompts on a Bangladesh-first product. For a
 * mental-health app, an inconsistent or wrong crisis number is a clinical risk.
 *
 * If real geolocation is added later, swap the "primary/secondary" selection
 * based on the visitor's locale; the underlying data stays the same.
 */

function findByOrg(countryCode: string, organization: string) {
  return verifiedCrisisHotlines.find(
    (h) => h.countryCode === countryCode && h.organization === organization,
  );
}

const bd = findByOrg("BD", "Kaan Pete Roi");
const bdNimh = findByOrg("BD", "National Mental Health Helpline (NIMH)");
const us = findByOrg("US", "988 Suicide & Crisis Lifeline");

/** Convert a local BD number like "01779-554391" into a dialable tel: link. */
function bdTel(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "").replace(/^0/, "");
  return `tel:+880${digits}`;
}

/** Primary hotline — Bangladesh (the product's main audience). */
export const CRISIS_BANGLADESH = {
  country: "Bangladesh",
  organization: bd?.organization ?? "Kaan Pete Roi",
  phone: bd?.phone ?? "01779-554391",
  hours: bd?.hours ?? "24/7",
  tel: bdTel(bd?.phone ?? "01779-554391"),
} as const;

/** Secondary Bangladesh line (NIMH). */
export const CRISIS_BANGLADESH_NIMH = {
  organization: bdNimh?.organization ?? "National Mental Health Helpline (NIMH)",
  phone: bdNimh?.phone ?? "16789",
} as const;

/** International / US hotline (shown as the secondary line). */
export const CRISIS_US = {
  country: "United States",
  organization: us?.organization ?? "988 Suicide & Crisis Lifeline",
  phone: us?.phone ?? "988",
  tel: "tel:988",
} as const;

/** Emergency services numbers (not hotlines) — country-standard, well-known. */
export const EMERGENCY = {
  BD: "999",
  US: "911",
} as const;
