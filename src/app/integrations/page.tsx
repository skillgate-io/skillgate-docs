import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Integrate SkillGate with GitHub Actions, GitLab CI, and other CI/CD platforms.',
};

const INTEGRATIONS = [
  {
    href: '/integrations/github-actions',
    title: 'GitHub Actions',
    desc: 'Gate your CI pipeline with a single workflow step. Uploads SARIF results to the GitHub Security tab.',
    status: 'Available',
  },
  {
    href: '/integrations/gitlab-ci',
    title: 'GitLab CI',
    desc: 'Add SkillGate to your .gitlab-ci.yml pipeline with a ready-made include template.',
    status: 'Available',
  },
];

export default function IntegrationsPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Integrations</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          CI/CD Integrations
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate integrates natively with major CI/CD platforms. Block deployments on policy violations and surface findings directly in pull request reviews.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        {INTEGRATIONS.map((integ) => (
          <Link
            key={integ.href}
            href={integ.href}
            style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: '16px', padding: '20px 24px',
              borderRadius: '10px', border: '1px solid var(--border)',
              background: 'var(--sidebar-bg)', textDecoration: 'none',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '4px' }}>{integ.title}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{integ.desc}</div>
            </div>
            <span style={{
              fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px',
              borderRadius: '4px', background: 'var(--callout-tip-bg)',
              color: '#16a34a', border: '1px solid var(--callout-tip-border)',
              whiteSpace: 'nowrap', alignSelf: 'flex-start',
            }}>{integ.status}</span>
          </Link>
        ))}
      </div>

      <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--sidebar-bg)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        <strong style={{ color: 'var(--text)' }}>Other platforms</strong> — SkillGate works anywhere you can run a shell command.
        Use <code>skillgate scan --enforce --quiet</code> and check the exit code.
        Exit 0 means pass; exit 1 means violation.
      </div>
    </div>
  );
}
