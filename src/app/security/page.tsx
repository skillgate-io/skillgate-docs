import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security',
  description: 'Threat model, hardening controls, and responsible disclosure process for SkillGate.',
};

export default function SecurityPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>More</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Security
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Security defaults are strict. Data handling is explicit, outcomes are predictable, and there
          are no silent bypasses.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Baseline controls</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Local scan mode never executes skill code. Analysis is purely static.',
          'Policy decisions are deterministic and testable — the same input always produces the same output.',
          'Ed25519-signed attestations provide verifiable proof of report integrity.',
          'Hosted API uses request IDs, typed error responses, and per-tier rate limiting.',
          'All hosted communication uses TLS 1.3. Dependencies are pinned with hashes.',
          'Private signing keys never leave the local machine. API keys are never included in scan reports.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Data handling</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Data type', 'Stays local', 'Leaves device'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Skill source code', 'Always', 'Never'],
              ['Scan findings', 'Always', 'Only if you run submit-scan explicitly'],
              ['Signing keys', 'Always', 'Never'],
              ['API keys', 'In env var or config', 'Never in reports'],
              ['Reputation submissions', 'In outbox file', 'Only when you sync manually'],
            ].map(([type, local, remote]) => (
              <tr key={type} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', color: 'var(--text)' }}>{type}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{local}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{remote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Responsible disclosure</h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
        Report security issues to{' '}
        <a href="mailto:support@skillgate.io" style={{ color: 'var(--accent)' }}>support@skillgate.io</a>{' '}
        with reproduction steps and impact assessment.
      </p>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
        We confirm receipt within one business day and send status updates at each milestone.
      </p>
    </div>
  );
}
