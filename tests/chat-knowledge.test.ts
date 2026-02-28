/**
 * Tests for the SkillGate Docs knowledge retrieval system.
 * Validates that relevant chunks are returned above threshold and
 * irrelevant queries return nothing (grounding threshold enforcement).
 */

import { describe, it, expect } from 'vitest';
import { retrieveChunks, hasGrounding, KNOWLEDGE_CORPUS } from '../src/lib/chat-knowledge';

// ─── Corpus integrity ─────────────────────────────────────────────────────

describe('corpus integrity', () => {
  it('has entries for all major sections', () => {
    const sections = new Set(KNOWLEDGE_CORPUS.map((c) => c.section));
    expect(sections.has('Getting Started')).toBe(true);
    expect(sections.has('CLI Reference')).toBe(true);
    expect(sections.has('Detection Rules')).toBe(true);
    expect(sections.has('Policy')).toBe(true);
    expect(sections.has('Integrations')).toBe(true);
    expect(sections.has('Enterprise')).toBe(true);
  });

  it('every chunk has required fields', () => {
    for (const chunk of KNOWLEDGE_CORPUS) {
      expect(chunk.id, `${chunk.id} missing id`).toBeTruthy();
      expect(chunk.title, `${chunk.id} missing title`).toBeTruthy();
      expect(chunk.url, `${chunk.id} missing url`).toBeTruthy();
      expect(chunk.content.length, `${chunk.id} content too short`).toBeGreaterThan(50);
      expect(chunk.keywords.length, `${chunk.id} no keywords`).toBeGreaterThan(0);
    }
  });

  it('all urls start with /', () => {
    for (const chunk of KNOWLEDGE_CORPUS) {
      expect(chunk.url.startsWith('/'), `${chunk.id} has bad url`).toBe(true);
    }
  });
});

// ─── Retrieval — should find results ──────────────────────────────────────

describe('retrieveChunks — relevant queries', () => {
  it('finds install/quickstart chunk', () => {
    const results = retrieveChunks('how do I install skillgate');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.chunk.id);
    expect(ids.some((id) => ['quickstart', 'installation'].includes(id))).toBe(true);
  });

  it('finds scan command chunk', () => {
    const results = retrieveChunks('skillgate scan command flags');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.id).toBe('cli-scan');
  });

  it('finds policy resolution order chunk', () => {
    const results = retrieveChunks('policy resolution order preset');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.chunk.id);
    expect(ids.some((id) => ['policy', 'concepts'].includes(id))).toBe(true);
  });

  it('finds GitHub Actions integration', () => {
    const results = retrieveChunks('github actions integration SARIF');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.id).toBe('integrations-github-actions');
  });

  it('finds Python SDK chunk', () => {
    const results = retrieveChunks('python sdk enforce decorator');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.id).toBe('integrations-python-sdk');
  });

  it('finds detection rules chunk', () => {
    const results = retrieveChunks('SG-SHELL rule subprocess detection');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.chunk.id);
    expect(ids.some((id) => ['rules-shell', 'rules'].includes(id))).toBe(true);
  });

  it('finds exact rule-id chunk', () => {
    const results = retrieveChunks('SG-SHELL-001');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.chunk.title.includes('SG-SHELL-001'))).toBe(true);
  });

  it('finds enterprise compliance', () => {
    const results = retrieveChunks('EU AI Act compliance audit cyclonedx');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.id).toBe('enterprise-compliance');
  });

  it('returns scores between 0 and 1', () => {
    const results = retrieveChunks('skillgate scan');
    for (const { score } of results) {
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(1);
    }
  });

  it('results are sorted by score descending', () => {
    const results = retrieveChunks('policy yaml schema preset');
    for (let i = 1; i < results.length; i++) {
      expect(results[i].score).toBeLessThanOrEqual(results[i - 1].score);
    }
  });

  it('returns at most 5 chunks', () => {
    const results = retrieveChunks('skillgate scan install policy rules');
    expect(results.length).toBeLessThanOrEqual(5);
  });
});

// ─── Retrieval — grounding threshold enforcement ───────────────────────────

describe('retrieveChunks — grounding threshold (hallucination trap)', () => {
  it('returns empty for completely off-topic queries', () => {
    const results = retrieveChunks('what is the weather in london');
    expect(results.length).toBe(0);
  });

  it('returns empty for crypto price questions', () => {
    const results = retrieveChunks('bitcoin ethereum price today');
    expect(results.length).toBe(0);
  });

  it('returns empty for movie questions', () => {
    const results = retrieveChunks('best movies to watch netflix');
    expect(results.length).toBe(0);
  });

  it('returns empty for empty query', () => {
    expect(retrieveChunks('')).toEqual([]);
    expect(retrieveChunks('   ')).toEqual([]);
  });
});

// ─── hasGrounding helper ───────────────────────────────────────────────────

describe('hasGrounding', () => {
  it('returns true for supported SkillGate topics', () => {
    expect(hasGrounding('how to run skillgate scan')).toBe(true);
    expect(hasGrounding('github actions integration')).toBe(true);
    expect(hasGrounding('ed25519 signing attestation')).toBe(true);
    expect(hasGrounding('SG-SHELL-001')).toBe(true);
  });

  it('returns false for off-topic queries', () => {
    expect(hasGrounding('recipe for chocolate cake')).toBe(false);
    expect(hasGrounding('current stock price')).toBe(false);
  });
});
