import { describe, expect, it } from 'vitest';
import { SEARCH_INDEX, searchIndex } from '../src/lib/search-index';
import { NAV } from '../src/lib/nav';

describe('search index coverage', () => {
  it('includes every nav route at least once', () => {
    const indexedHrefs = new Set(SEARCH_INDEX.map((entry) => entry.href));
    for (const section of NAV) {
      for (const item of section.items) {
        expect(indexedHrefs.has(item.href), `missing ${item.href} (${item.label})`).toBe(true);
      }
    }
  });

  it('returns rule-id hits for SG-SHELL-001', () => {
    const results = searchIndex('SG-SHELL-001');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((entry) => entry.title.includes('SG-SHELL-001'))).toBe(true);
  });

  it('returns relevant command docs for auth query', () => {
    const results = searchIndex('auth login');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((entry) => entry.href === '/cli/auth')).toBe(true);
  });
});
