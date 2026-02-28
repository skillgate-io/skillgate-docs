// Docs-grounded knowledge corpus for the SkillGate Docs Assistant.
// Corpus is derived from SEARCH_INDEX to keep chat retrieval aligned with docs indexing.

import { SEARCH_INDEX } from '@/lib/search-index';

export interface KnowledgeChunk {
  id: string;
  title: string;
  section: string;
  content: string;
  url: string;
  anchor?: string;
  keywords: string[];
  indexedAt: string;
}

const INDEXED_AT = process.env.SKILLGATE_DOCS_INDEXED_AT ?? '2026-02-27';

export const KNOWLEDGE_CORPUS: KnowledgeChunk[] = SEARCH_INDEX.map((entry) => ({
  id: slugify(entry.href, entry.title),
  title: entry.title,
  section: entry.section,
  content: `${entry.title}. ${entry.description} Section: ${entry.section}. Path: ${entry.href}.`,
  url: entry.href,
  keywords: entry.keywords ?? [],
  indexedAt: INDEXED_AT,
}));

const GROUNDING_THRESHOLD = 0.11;
const TOP_K = 5;

export function retrieveChunks(query: string): { chunk: KnowledgeChunk; score: number }[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  if (!tokens.some((token) => DOMAIN_TOKENS.has(token) || RULE_ID_TOKEN.test(token))) return [];

  const scored = KNOWLEDGE_CORPUS.map((chunk) => {
    const chunkTokens = tokenize([chunk.title, chunk.section, chunk.content, ...chunk.keywords].join(' '));
    const score = computeScore(tokens, chunkTokens, chunk);
    return { chunk, score };
  });

  return scored
    .filter(({ score }) => score >= GROUNDING_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);
}

export function hasGrounding(query: string): boolean {
  return retrieveChunks(query).length >= 1;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function computeScore(queryTokens: string[], docTokens: string[], chunk: KnowledgeChunk): number {
  const querySet = new Set(queryTokens);
  const docSet = new Set(docTokens);
  const keywordSet = new Set(chunk.keywords.flatMap(tokenize));
  const titleSet = new Set(tokenize(chunk.title));
  let score = 0;

  for (const token of queryTokens) {
    if (keywordSet.has(token)) score += 0.45;
    else if (titleSet.has(token)) score += 0.35;
    else if (docSet.has(token)) score += 0.15;
  }

  const looksLikeCliIntent =
    querySet.has('command') ||
    querySet.has('commands') ||
    querySet.has('flag') ||
    querySet.has('flags');
  if (looksLikeCliIntent && chunk.section === 'CLI Reference') {
    score += 0.25;
  }
  if (querySet.has('scan') && chunk.url === '/cli/scan') {
    score += 0.2;
  }

  return queryTokens.length > 0 ? score / queryTokens.length : 0;
}

function slugify(href: string, title: string): string {
  const normalizedHref = href.replace(/^\/+/, '').replace(/\//g, '-');
  if (normalizedHref) return normalizedHref;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'do', 'for', 'from',
  'has', 'have', 'he', 'how', 'i', 'if', 'in', 'is', 'it', 'its', 'me',
  'my', 'not', 'of', 'on', 'or', 'so', 'that', 'the', 'this', 'to', 'use',
  'was', 'we', 'what', 'when', 'where', 'which', 'who', 'will', 'with', 'you',
]);

const DOMAIN_TOKENS = new Set([
  'skillgate', 'cli', 'scan', 'verify', 'policy', 'rules', 'integration', 'integrations',
  'github', 'gitlab', 'sarif', 'ed25519', 'attestation', 'mcp', 'codex', 'claude',
  'openclaw', 'sdk', 'python', 'vscode', 'runtime', 'enterprise', 'compliance',
  'security', 'governance', 'skillgate.yml', 'sg-shell', 'sg-net', 'sg-fs', 'sg-eval',
  'sg-cred', 'sg-inj', 'sg-obf', 'quickstart', 'installation', 'doctor', 'auth', 'keys',
  'gateway', 'approval', 'bom', 'reputation', 'drift', 'retroscan', 'hunt', 'hooks',
]);

const RULE_ID_TOKEN = /^sg-[a-z]+-\d+$/i;
