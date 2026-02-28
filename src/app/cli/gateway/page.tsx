import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'gateway - CLI Reference',
  description: 'Native agent gateway integration: pre-execution checks and tool output poisoning scans.',
};

export default function GatewayPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>gateway</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Native hook commands for agent frameworks. Use <code>gateway check</code> to run preflight checks
          before a tool executes, and <code>gateway scan-output</code> to inspect tool output for injection
          attempts before it re-enters the LLM context.
        </p>
      </div>

      <CodeBlock language="bash" code={`skillgate gateway check --command "<tool-command>" [OPTIONS]
skillgate gateway scan-output [OPTIONS]`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>gateway check</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Runs pre-execution checks against a planned tool command. Validates BOM, approval, reputation, and
        capability budgets. Exits with code 1 if the command should be blocked.
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
              ['--command', 'Yes', '', 'Planned tool command string to check.'],
              ['--env', 'No', 'dev', 'Runtime environment: dev, ci, prod, strict.'],
              ['--skill-id', 'No', '', 'Skill identifier for AI-BOM validation.'],
              ['--skill-hash', 'No', '', 'Skill content hash for AI-BOM validation.'],
              ['--scan-attestation', 'No', '', 'SkillGate scan attestation marker.'],
              ['--bom-store', 'No', '.skillgate/bom/approved.json', 'Path to approved AI-BOM store JSON.'],
              ['--artifact', 'No', '', 'Write signed gateway check artifact to this path.'],
              ['--reputation-store', 'No', '.skillgate/reputation/reputation.json', 'Path to signed reputation graph JSON.'],
              ['--org-id', 'No', '', 'Organization identifier for scoped capability budgets.'],
              ['--approval-file', 'No', '', 'Signed approval file for quorum enforcement.'],
              ['--required-reviewers', 'No', '0', 'Minimum unique reviewers required.'],
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

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>gateway scan-output</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        Scans tool output for Tool Output Poisoning (TOP) attempts before the text is fed back to an LLM.
        Provide output via <code>--output-text</code> or <code>--output-file</code>.
      </p>
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
            {[
              ['--env', 'dev', 'Runtime environment: dev, ci, prod, strict.'],
              ['--output-text', '', 'Output text to scan.'],
              ['--output-file', '', 'Path to file containing output text to scan.'],
              ['--top-outcome', '', 'Override TOP outcome: annotate, sanitize, or block.'],
              ['--artifact', '', 'Write signed output-scan artifact to this path.'],
            ].map(([flag, def, desc]) => (
              <tr key={flag} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{flag}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{def || '—'}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Pre-execution check for a shell command in prod
skillgate gateway check \\
  --command "bash -lc 'git push origin main'" \\
  --env prod \\
  --skill-id my-deploy-skill \\
  --approval-file .skillgate/approvals/approval.json \\
  --required-reviewers 2

# Scan tool output before returning it to the LLM
OUTPUT=$(bash -lc 'cat /tmp/result.txt')
skillgate gateway scan-output \\
  --output-text "$OUTPUT" \\
  --env prod \\
  --top-outcome block

# Scan output from a file
skillgate gateway scan-output \\
  --output-file /tmp/tool-output.txt \\
  --env ci \\
  --top-outcome annotate`} />
    </div>
  );
}
