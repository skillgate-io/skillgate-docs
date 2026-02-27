import { describe, expect, it } from 'vitest';
import { checkRateLimit, resetRateLimit, resolveClientId } from '../src/lib/chat-rate-limit';

describe('resolveClientId', () => {
  it('prefers trusted Netlify edge IP header', () => {
    const req = new Request('https://docs.skillgate.io/api/chat', {
      headers: {
        'x-nf-client-connection-ip': '203.0.113.42',
        'x-forwarded-for': '10.0.0.5',
      },
    });

    expect(resolveClientId(req)).toBe('ip:203.0.113.42');
  });

  it('ignores spoofable x-forwarded-for when trusted edge headers are missing', () => {
    const req = new Request('https://docs.skillgate.io/api/chat', {
      headers: {
        'x-forwarded-for': '198.51.100.99',
        'x-real-ip': '198.51.100.10',
        'user-agent': 'test-agent',
      },
    });

    expect(resolveClientId(req)).toMatch(/^fp:/);
    expect(resolveClientId(req)).not.toContain('198.51.100.99');
  });
});

describe('checkRateLimit', () => {
  it('blocks after max requests in the current window', () => {
    const clientId = 'ip:198.51.100.1';
    resetRateLimit(clientId);

    for (let i = 0; i < 10; i += 1) {
      expect(checkRateLimit(clientId).allowed).toBe(true);
    }

    const blocked = checkRateLimit(clientId);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
    resetRateLimit(clientId);
  });
});
