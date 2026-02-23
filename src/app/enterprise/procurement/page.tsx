import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Procurement',
  description: 'Procurement checklist and onboarding path for enterprise SkillGate programs.',
};

export default function EnterpriseProcurementPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Enterprise</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Enterprise Procurement
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Commercial review and onboarding checklist for legal, procurement, security, and platform stakeholders.
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Procurement checklist</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px', marginBottom: '32px' }}>
        {[
          'Commercial terms and support scope documentation.',
          'SLA targets for availability and support response windows.',
          'Data Processing Agreement (DPA) and security addendum review.',
          'Data retention scope and deletion process.',
          'Escalation contacts and support tier model.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Onboarding path</h2>
      <ol style={{ color: 'var(--text-muted)', lineHeight: 2.4, paddingLeft: '24px', marginBottom: '32px' }}>
        {[
          'Security review with platform owner and governance team.',
          'Pilot rollout in one repository with agreed acceptance criteria.',
          'Contracted expansion to organization-wide enforcement lanes.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ol>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Contact</h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
        Reach the SkillGate team at{' '}
        <a href="mailto:support@skillgate.io" style={{ color: 'var(--accent)' }}>support@skillgate.io</a>{' '}
        to start an enterprise evaluation or request security documentation.
      </p>
    </div>
  );
}
