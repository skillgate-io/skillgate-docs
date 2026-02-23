import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise',
  description: 'Enterprise onboarding path for security, legal, procurement, and deployment teams.',
};

const sections = [
  {
    href: '/enterprise/security',
    label: 'Security',
    desc: 'Threat model, identity controls, and incident readiness artifacts for security review.',
  },
  {
    href: '/enterprise/compliance',
    label: 'Compliance',
    desc: 'AI-BOM inventory workflows, EU AI Act evidence, and signed runtime audit trails.',
  },
  {
    href: '/enterprise/deployment',
    label: 'Deployment',
    desc: 'SaaS, private relay, air-gap, and local deployment modes with rollout guidance.',
  },
  {
    href: '/enterprise/procurement',
    label: 'Procurement',
    desc: 'Commercial checklist, legal review path, and onboarding steps for buyers.',
  },
];

export default function EnterprisePage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Enterprise</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Enterprise
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Resources for security, legal, procurement, and platform teams evaluating SkillGate for
          organization-wide deployment.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px', marginBottom: '40px' }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="card-link">
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</div>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>Enterprise features</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: 2.2, paddingLeft: '20px' }}>
        {[
          'SSO / SAML / OIDC identity integration.',
          'RBAC scopes for team-level policy authority.',
          'Private relay and air-gap deployment modes.',
          'Signed runtime session artifacts for compliance audit.',
          'AI-BOM (CycloneDX) import and validation.',
          'Organization-scoped capability budgets.',
          'SLA-backed support with dedicated escalation contacts.',
        ].map((item) => (
          <li key={item} style={{ fontSize: '0.9rem' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
