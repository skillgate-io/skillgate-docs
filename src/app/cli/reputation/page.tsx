import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'reputation - CLI Reference',
  description: 'Initialize, verify, check, and submit signed reputation records so runtime decisions can use trusted shared risk signals.',
};

export default function ReputationPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>reputation</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Work with the signed reputation graph. Verify graph integrity, evaluate a bundle hash against
          known verdicts, and submit anonymized verdicts to the local outbox for later synchronization.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate reputation init [OPTIONS]
skillgate reputation verify <store>
skillgate reputation check [OPTIONS]
skillgate reputation submit [OPTIONS]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>First-time setup</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.7 }}>
        Run one command to create a signed baseline store before your first runtime or scan workflow.
        This avoids <code>SG-REP-MISS</code> and makes reputation checks available immediately.
      </p>
      <CodeBlock language="bash" code={`# Run once per repository
skillgate reputation init --store .skillgate/reputation/reputation.json

# Optional: verify integrity before using it in CI or runtime
skillgate reputation verify .skillgate/reputation/reputation.json`} />
      <p style={{ color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.7 }}>
        If your team stores reputation data in a shared location, keep using that path with{' '}
        <code>--reputation-store</code> in <code>scan</code> and <code>run</code>.
      </p>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>reputation init</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Creates a signed baseline reputation store. If no keypair exists yet, SkillGate creates one
        automatically so you can continue without extra setup steps.
      </p>
      <CodeBlock language="bash" code={`skillgate reputation init --store .skillgate/reputation/reputation.json
skillgate reputation init --store /secure/shared/reputation.json --key-dir /secure/keydir`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>reputation verify</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Verifies the Ed25519 signature of a signed reputation JSON store. Use this to confirm the
        graph has not been tampered with before using it in policy enforcement.
      </p>
      <CodeBlock language="bash" code="skillgate reputation verify .skillgate/reputation/reputation.json" />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '24px', marginBottom: '12px' }}>reputation check</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Evaluates a bundle hash against the signed reputation graph. Returns the verdict and confidence
        score for the bundle in the specified environment.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Required', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['--bundle-hash', 'Yes', '', 'SHA-256 bundle hash to evaluate.'],
              ['--env', 'No', 'prod', 'Environment: dev, ci, prod, strict.'],
              ['--store', 'No', '.skillgate/reputation/reputation.json', 'Path to signed reputation JSON.'],
            ].map(([flag, req, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontSize: '0.78rem', color: req === 'Yes' ? 'var(--accent)' : 'var(--text-muted)' }}>{req}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>reputation submit</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Creates a signed, anonymized verdict record and appends it to the local outbox. Submissions are
        anonymized by default. The outbox can be synced with the hosted reputation service separately.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Required', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['--bundle-hash', 'Yes', '', 'SHA-256 bundle hash.'],
              ['--verdict', 'Yes', '', 'Verdict: known_safe, suspicious, or known_malicious.'],
              ['--confidence', 'No', '0.8', 'Confidence score from 0.0 to 1.0.'],
              ['--reason', 'No', '', 'Short reason for the verdict.'],
              ['--anonymized / --full', 'No', 'anonymized', 'Submit anonymized record (no bundle name or source).'],
              ['--outbox', 'No', '.skillgate/reputation/submissions.ndjson', 'Local submission outbox file.'],
              ['--key-dir', 'No', '', 'Signing key directory override.'],
            ].map(([flag, req, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontSize: '0.78rem', color: req === 'Yes' ? 'var(--accent)' : 'var(--text-muted)' }}>{req}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Verify the reputation graph is intact
skillgate reputation verify .skillgate/reputation/reputation.json

# Check a bundle hash against the graph
skillgate reputation check \\
  --bundle-hash <sha256> \\
  --env prod \\
  --store .skillgate/reputation/reputation.json

# Submit an anonymized suspicious verdict
skillgate reputation submit \\
  --bundle-hash <sha256> \\
  --verdict suspicious \\
  --confidence 0.9 \\
  --reason "Detected credential exfil pattern in static analysis" \\
  --anonymized

# Submit a known_safe verdict
skillgate reputation submit \\
  --bundle-hash <sha256> \\
  --verdict known_safe \\
  --confidence 1.0`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Common command sequences</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.7 }}>
        Use these ordered sequences when onboarding teams to reputation-backed enforcement.
      </p>
      <CodeBlock language="bash" code={`# Scenario 1: first-time local setup
skillgate reputation init --store .skillgate/reputation/reputation.json
skillgate scan ./skills/my-skill --reputation-store .skillgate/reputation/reputation.json

# Scenario 2: CI with strict checks
skillgate reputation verify .skillgate/reputation/reputation.json
skillgate scan ./skills/my-skill --enforce --policy production --reputation-store .skillgate/reputation/reputation.json

# Scenario 3: runtime gate with shared reputation
skillgate run --env prod --reputation-store .skillgate/reputation/reputation.json -- codex exec "review"`} />
    </div>
  );
}
