import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'verify — CLI Reference',
  description: 'Verify a signed SkillGate attestation report.',
};

export default function VerifyPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CLI Reference</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>verify</code>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Verify a signed Ed25519 attestation report produced by <code>skillgate scan --sign</code>.
        </p>
      </div>

      <CodeBlock
        language="text"
        code={`skillgate verify <report-file> [options]

Arguments:
  report-file    Path to the signed JSON report file`}
      />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>Options</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Flag</th>
              <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { flag: '--public-key <path>', desc: 'Path to the Ed25519 public key. Defaults to ~/.skillgate/keys/default.pub.' },
              { flag: '--output <format>', desc: 'Output format: human (default) or json.' },
            ].map((row, i) => (
              <tr key={row.flag} style={{ borderBottom: i < 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{row.flag}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Examples</h2>
      <CodeBlock language="bash" code={`# Verify with the default key\nskillgate verify report.json\n\n# Verify with a specific public key\nskillgate verify report.json --public-key ./keys/team.pub`} />

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginTop: '32px', marginBottom: '12px' }}>How it works</h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
        The report is serialized as canonical JSON (sorted keys, no whitespace), hashed with SHA-256, and the signature is verified
        against the public key. A successful verify confirms the report has not been modified since it was signed.
      </p>
    </div>
  );
}
