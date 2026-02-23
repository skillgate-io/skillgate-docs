import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'approval — CLI Reference',
  description: 'Create and verify signed approval files for reviewer quorum enforcement in runtime flows.',
};

export default function ApprovalPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>approval</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Sign and verify approval files. Each approval ties a skill ID, hash, and environment to a named reviewer.
          Use with <code>skillgate run --approval-file</code> to enforce quorum gates before runtime commands execute.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate approval sign [OPTIONS]
skillgate approval verify <approval-file> [OPTIONS]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>approval sign</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Creates a signed approval file. Pass <code>--reviewer</code> multiple times to add multiple reviewers.
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
              ['--skill-id', 'Yes', '', 'Skill identifier to approve.'],
              ['--skill-hash', 'Yes', '', 'SHA-256 content hash of the skill.'],
              ['--reviewer', 'Yes', '', 'Reviewer identifier. Repeat for multiple reviewers.'],
              ['--env', 'No', 'prod', 'Target environment for this approval.'],
              ['--output', 'No', '.skillgate/approvals/approval.json', 'Output path for the signed approval file.'],
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

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>approval verify</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Verifies a signed approval file against expected skill ID, hash, environment, and reviewer count.
        Exits with code 1 if any check fails.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag / Arg', 'Required', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['approval-file', 'Yes', '', 'Path to the signed approval file to verify.'],
              ['--skill-id', 'Yes', '', 'Expected skill identifier.'],
              ['--skill-hash', 'Yes', '', 'Expected skill content hash.'],
              ['--env', 'No', 'prod', 'Expected environment.'],
              ['--required-reviewers', 'No', '2', 'Minimum unique reviewers required.'],
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
      <CodeBlock language="bash" code={`# Two reviewers sign an approval for a skill
skillgate approval sign \\
  --skill-id my-agent-skill \\
  --skill-hash <sha256> \\
  --reviewer sec-engineer-a \\
  --reviewer sec-engineer-b \\
  --env prod \\
  --output .skillgate/approvals/approval.json

# Verify the approval meets the quorum requirement
skillgate approval verify .skillgate/approvals/approval.json \\
  --skill-id my-agent-skill \\
  --skill-hash <sha256> \\
  --required-reviewers 2

# Use in a runtime gate
skillgate run \\
  --env prod \\
  --skill-id my-agent-skill \\
  --skill-hash <sha256> \\
  --approval-file .skillgate/approvals/approval.json \\
  --required-reviewers 2 \\
  -- codex exec "deploy"`} />
    </div>
  );
}
