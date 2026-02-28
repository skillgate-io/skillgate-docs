// Security guardrails for the SkillGate Docs Assistant.
// Pattern-based detection - runs before LLM call, no ML required.

import type { RefusalReason } from '@/types/chat';

export interface GuardrailResult {
  blocked: boolean;
  reason?: RefusalReason;
  /** Human-readable description for server-side logging only - never sent to client. */
  _logDetail?: string;
}

/**
 * Run all guardrail checks against a user message.
 * Returns the first matching block reason, or { blocked: false } if clean.
 */
export function checkGuardrails(message: string): GuardrailResult {
  const lower = message.toLowerCase();

  // 1. Prompt injection
  if (matchesAny(lower, INJECTION_PATTERNS)) {
    return { blocked: true, reason: 'prompt_injection', _logDetail: 'injection pattern' };
  }

  // 2. Jailbreak attempt
  if (matchesAny(lower, JAILBREAK_PATTERNS)) {
    return { blocked: true, reason: 'jailbreak_attempt', _logDetail: 'jailbreak pattern' };
  }

  // 3. Data exfiltration
  if (matchesAny(lower, EXFILTRATION_PATTERNS)) {
    return { blocked: true, reason: 'data_exfiltration', _logDetail: 'exfiltration pattern' };
  }

  // 4. Unsafe / harmful request
  if (matchesAny(lower, UNSAFE_PATTERNS)) {
    return { blocked: true, reason: 'unsafe_request', _logDetail: 'unsafe pattern' };
  }

  return { blocked: false };
}

/**
 * Scan a retrieved doc chunk for injection markers that could hijack the LLM.
 * Returns sanitized content with markers replaced by safe placeholders.
 */
export function sanitizeChunk(content: string): string {
  let out = content;
  for (const pattern of CHUNK_INJECTION_PATTERNS) {
    out = out.replace(pattern, '[content filtered]');
  }
  return out;
}

/**
 * Detect off-topic questions that cannot be grounded in SkillGate docs.
 * Used after grounding check fails to decide refusal reason.
 */
export function isOffTopic(message: string): boolean {
  const lower = message.toLowerCase();
  return matchesAny(lower, OFF_TOPIC_PATTERNS);
}

// ─── Patterns ─────────────────────────────────────────────────────────────

const INJECTION_PATTERNS: RegExp[] = [
  /ignore.{0,30}instructions?/i,
  /disregard\s+(your|all|previous|prior)\s+(instructions?|rules?|context)/i,
  /forget\s+(everything|all|your)\s+(above|previous|prior|instructions?)/i,
  /\bstop\s+being\s+(a|an)\s+(assistant|bot|ai)\b/i,
  /new\s+instructions?\s*:/i,
  /\[system\]/i,
  /\[end\s+(of\s+)?(instructions?|prompt|system)\]/i,
  /override\s+(your|all|the)\s+(instructions?|system|rules?)/i,
  /\bsystem\s*prompt\s*[:=]/i,
  /###\s*(instruction|system|override)/i,
  /<<\s*sys\s*>>/i,
  /<\|im_start\|>/i,
  /\bdan\b.{0,20}\bjailbreak\b/i,
  /prior\s+instructions?/i,
  /all\s+prior\s+(instructions?|rules?)/i,
];

const JAILBREAK_PATTERNS: RegExp[] = [
  /pretend\s+(you\s+are|to\s+be)\s+(not\s+an?\s+|a\s+different|an?\s+unrestricted)/i,
  /act\s+as\s+if\s+you\s+have\s+no\s+(restrictions?|limits?|rules?|policies|content\s+policy)/i,
  /\bact\s+as\s+(if\s+you\s+were|a\s+different|an?\s+unrestricted|an?\s+ai\s+with)\b/i,
  /you\s+are\s+now\s+(called|named|a\s+|an?\s+)/i,
  /\byou\s+have\s+no\s+(restrictions?|limits?|guidelines?|rules?|policies)\b/i,
  /\bno\s+(restrictions?|limits?|rules?|policies|content\s+filter)\b/i,
  /roleplay\s+as\s+(an?\s+)?((different|evil|uncensored|unrestricted|rogue)\s+)?((ai\s+assistant)|ai|assistant|bot)/i,
  /\bdan\s+mode\b/i,
  /\bjailbreak\b/i,
  /do\s+anything\s+now/i,
  /enable\s+(developer|jailbreak|god|evil|unrestricted)\s+mode/i,
  /\byou\s+are\s+(free|allowed|permitted)\s+to\s+(ignore|bypass|disregard)\b/i,
];

const EXFILTRATION_PATTERNS: RegExp[] = [
  /show\s+(me\s+)?(your|the)\s+(system\s+prompt|initial\s+instructions?|hidden\s+instructions?|rules?|prompt)/i,
  /repeat\s+(your|the)\s+((initial|hidden)\s+)?(instructions?|rules?|system\s+prompt|prompt|context)/i,
  /what\s+(are\s+)?(your|the)\s+((hidden|initial)\s+)?(instructions?|rules?|system\s+prompt|context|docs?)/i,
  /print\s+(your|the)\s+(system\s+prompt|instructions?|rules?|context)/i,
  /output\s+((the|your)\s+)?(full\s+contents?\s+of\s+)?(your|the)?\s*(system\s+prompt|instructions?|context\s+window)/i,
  /reveal\s+(your|the)\s+(system\s+prompt|instructions?|rules?|context)/i,
  /reveal\s+the\s+retrieved\s+(chunks?|documents?|context)(\s+used.*)?/i,
  /\bcontext\s+window\b.{0,30}\b(show|print|output|reveal|display)\b/i,
  /what\s+documents?\s+(were\s+)?(retrieved|used|given|loaded)\b/i,
  /show\s+(me\s+)?the\s+retrieved\s+(chunks?|documents?|context)/i,
];

const UNSAFE_PATTERNS: RegExp[] = [
  /how\s+to\s+(hack|exploit|attack|compromise|crack|break\s+into)\b/i,
  /\b(malware|ransomware|keylogger|trojan|backdoor|rootkit)\b.{0,30}(create|build|write|code|generate)/i,
  /(create|write|generate|build)\b.{0,30}\b(malware|ransomware|keylogger|trojan|backdoor|rootkit)\b/i,
  /\b(ddos|dos\s+attack|denial\s+of\s+service)\b/i,
  /bypass\s+(security|authentication|authorization|2fa|mfa|captcha)/i,
];

// Patterns to strip from retrieved doc chunks before passing to LLM
const CHUNK_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(previous|above|all|prior)\s+(instructions?|rules?)/gi,
  /\[system\]/gi,
  /\[end\s+(of\s+)?(instructions?|prompt)\]/gi,
  /<\|im_start\|>/gi,
  /<<\s*sys\s*>>/gi,
];

const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(weather|forecast|temperature|climate)\b/i,
  /\b(stock|crypto|bitcoin|ethereum|trading|investment|finance)\b/i,
  /\b(recipe|cooking|food|restaurant|meal)\b/i,
  /\b(sports?|football|basketball|soccer|baseball)\b/i,
  /\b(movie|film|tv show|television|netflix|streaming)\b/i,
  /\b(music|song|album|artist|band|spotify)\b/i,
  /\b(news|politics|election|president|government)\b/i,
  /\b(travel|hotel|flight|vacation|tourism)\b/i,
  /who\s+is\s+(the\s+)?(president|prime\s+minister|ceo|founder)\b(?!.*(skillgate|openclaw))/i,
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}
