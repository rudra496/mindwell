import { describe, it, expect } from 'vitest';
import disordersData from '@/data/disorders.json';
import {
  DISORDER_CLUSTERS,
  getClustersWithCounts,
  getDisordersForCluster,
  getUncategorizedDisorders,
} from '@/lib/disorder-clusters';

const all = (disordersData as Array<{ slug?: string; category?: string }>).filter(
  (d) => d?.slug && d?.category,
);

describe('disorder clusters', () => {
  it('every disorder is covered by exactly one cluster (no orphans, no double counts)', () => {
    expect(getUncategorizedDisorders()).toEqual([]);
    const totalInClusters = getClustersWithCounts().reduce((s, c) => s + c.count, 0);
    expect(totalInClusters).toBe(all.length);
  });

  it('each cluster has at least one condition', () => {
    for (const c of getClustersWithCounts()) {
      expect(c.count).toBeGreaterThan(0);
    }
  });

  it('cluster categories do not overlap (a category maps to one cluster)', () => {
    const seen = new Set<string>();
    for (const c of DISORDER_CLUSTERS) {
      for (const cat of c.categories) {
        expect(seen.has(cat)).toBe(false);
        seen.add(cat);
      }
    }
  });

  it('getDisordersForCluster returns only conditions in that cluster categories', () => {
    for (const c of DISORDER_CLUSTERS) {
      const ds = getDisordersForCluster(c.id);
      expect(ds.length).toBeGreaterThan(0);
      for (const d of ds) {
        expect(c.categories).toContain(d.category);
      }
    }
  });

  it('unknown cluster id returns empty', () => {
    expect(getDisordersForCluster('does-not-exist')).toEqual([]);
  });
});
