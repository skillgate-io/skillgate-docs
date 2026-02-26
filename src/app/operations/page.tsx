import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Operations',
  description: 'Operational runbook for reliable agent safety checks in local development and CI.',
};

export default function OperationsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Operations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Operations Runbook
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Use this runbook to keep SkillGate protections healthy in daily operations. It covers service health, access status, provider trust, and CI behavior.
        </p>
      </div>

      <h2>Daily health checks</h2>
      <CodeBlock
        language="bash"
        code={`# Sidecar health and entitlements
curl -sS http://127.0.0.1:8000/v1/health
curl -sS http://127.0.0.1:8000/v1/entitlements

# Auth state
skillgate auth status

# Runtime smoke
skillgate run --env ci -- codex exec "list changed files"`}
      />

      <h2>CI guard checks</h2>
      <CodeBlock
        language="bash"
        code={`# Wrapper enforcement check
python scripts/quality/check_wrapper_enforcement.py --workflows .github/workflows

# Codex startup governance
skillgate codex --ci --output sarif --directory . exec "run policy checks"`}
      />

      <h2>Incident triage flow</h2>
      <ol>
        <li>Capture the denial reason and command context from SARIF or JSON output.</li>
        <li>Confirm whether the block came from policy, access state, settings change, or provider trust.</li>
        <li>Run focused command checks with <code>skillgate gateway check</code> and <code>skillgate mcp inspect</code>.</li>
        <li>Document remediation and re-run guarded command.</li>
      </ol>

      <h2>Common remediations</h2>
      <ul>
        <li>Unexpected config change detected: review and approve only intentional updates.</li>
        <li>Permission scope expanded: revert the change or update baseline after review.</li>
        <li>Provider no longer trusted: verify checksum changes, then re-approve if valid.</li>
        <li>Session/access issue: refresh auth and verify account status before retrying.</li>
      </ul>

      <h2>Performance guardrails</h2>
      <ul>
        <li>Sidecar latency target: P95 at or below 20ms.</li>
        <li>MCP gateway overhead target: P95 at or below 25ms.</li>
        <li>Codex bridge overhead target: P95 at or below 30ms.</li>
      </ul>
    </div>
  );
}
