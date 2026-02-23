import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Security',
  description: 'Security controls, identity model, and incident readiness for enterprise SkillGate deployments.',
};

export default function EnterpriseSecurityPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Enterprise</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Enterprise Security
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Security controls, identity boundaries, and incident readiness for enterprise review.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Security review pack</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Architecture and data flow documentation.',
          'Threat model and hardening controls.',
          'Identity model: SSO, SAML, and OIDC integration with RBAC scopes.',
          'Incident response process and notice templates.',
          'Subprocessor inventory and update process.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Hardening controls</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', fontSize: '0.875rem', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar-bg)' }}>
              {['Control', 'Details'].map((h) => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Static-only analysis', 'Skill code is never executed during scanning.'],
              ['Ed25519 attestations', 'Signed scan reports with canonical JSON hashing.'],
              ['Key isolation', 'Signing keys stored in ~/.skillgate/keys, never transmitted.'],
              ['TLS 1.3', 'All hosted API communication encrypted in transit.'],
              ['Rate limiting', 'Per-tier request limits enforced at the API layer.'],
              ['Signed runtime artifacts', 'Every gateway session produces a verifiable lineage artifact.'],
            ].map(([ctrl, detail]) => (
              <tr key={ctrl} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap' }}>{ctrl}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text-muted)' }}>{detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Disclosure</h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
        Security issues can be reported to{' '}
        <a href="mailto:support@skillgate.io" style={{ color: 'var(--accent)' }}>support@skillgate.io</a>.
        Include reproduction steps and impact assessment. We confirm receipt within one business day.
      </p>
    </div>
  );
}
