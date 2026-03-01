import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'run - CLI Reference',
  description: 'Wrap an agent CLI with runtime gateway policy enforcement, capability limits, and signed session artifacts.',
};

const flags = [
  ['--env', 'dev', 'Runtime environment: dev, ci, prod, strict.'],
  ['--skill-id', '', 'Skill identifier for AI-BOM runtime validation.'],
  ['--skill-hash', '', 'Skill content hash for AI-BOM runtime validation.'],
  ['--scan-attestation', '', 'SkillGate scan attestation marker for AI-BOM gate.'],
  ['--bom-store', '.skillgate/bom/approved.json', 'Path to approved AI-BOM store JSON.'],
  ['--enable-top-guard / --disable-top-guard', 'enabled', 'Enable Tool Output Poisoning guard on command output.'],
  ['--top-outcome', '', 'Override TOP outcome: annotate, sanitize, or block.'],
  ['--artifact', '', 'Write signed runtime session artifact to this path.'],
  ['--reputation-store', '.skillgate/reputation/reputation.json', 'Path to signed reputation graph JSON.'],
  ['--org-id', '', 'Organization identifier for scoped capability budgets.'],
  ['--approval-file', '', 'Signed approval file path for reviewer quorum enforcement.'],
  ['--required-reviewers', '0', 'Minimum unique reviewers required in approval file.'],
];

export default function RunPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>run</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Wrap any agent CLI with runtime gateway enforcement. Checks policy, approvals, reputation, and
          capability budgets before the command runs. Writes a signed session artifact with the full decision trail.
        </p>
      </div>

      <CodeBlock language="bash" code="skillgate run [OPTIONS] -- <agent-cli-command>" />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Options</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Flag', 'Default', 'Description'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flags.map(([flag, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '-'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Environments</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Environment', 'Behavior'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['dev', 'Warnings only. BOM and reputation checks are advisory.'],
              ['ci', 'Enforces policy. BOM gate active. Blocks on critical findings.'],
              ['prod', 'Full enforcement. Reputation check required. Approval file checked.'],
              ['strict', 'All gates enforced. Minimum reviewers required. TOP guard blocks.'],
            ].map(([env, behavior]) => (
              <tr key={env} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)' }}>{env}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{behavior}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Basic CI wrap
skillgate run --env ci -- codex exec "review changed files"

# Full prod enforcement with BOM, reputation, and approval quorum
skillgate run \\
  --env prod \\
  --skill-id my-agent-skill \\
  --skill-hash <sha256> \\
  --scan-attestation valid \\
  --approval-file .skillgate/approvals/approval.json \\
  --required-reviewers 2 \\
  --artifact .skillgate/runtime/session.json \\
  -- codex exec "deploy release"

# Wrap with TOP guard blocking on detected output poisoning
skillgate run --env prod --top-outcome block -- my-agent-cli run`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>Reputation store troubleshooting</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.7 }}>
        If runtime output includes <code>SG-REP-MISS</code>, initialize a local signed store first.
      </p>
      <CodeBlock language="bash" code={`# One-time setup
skillgate reputation init --store .skillgate/reputation/reputation.json

# Run with local store
skillgate run --env prod --reputation-store .skillgate/reputation/reputation.json -- codex exec "review"`} />
    </div>
  );
}
