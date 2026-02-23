import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Product overview and capability model for SkillGate.',
};

export default function ProductPage() {
  return (
    <div style={{ maxWidth: '720px' }} className="sg-prose">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Product</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
          Product
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          SkillGate follows a clear pipeline so teams can understand and trust each release decision.
        </p>
      </div>

      <h2>Pipeline</h2>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '28px', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
        {['Parse', 'Analyze', 'Score', 'Enforce', 'Report', 'Sign'].map((step, index) => (
          <div
            key={step}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '10px 12px',
              background: 'var(--sidebar-bg)',
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{index + 1}.</span>
            {step}
          </div>
        ))}
      </div>

      <h2>Core modules</h2>
      <div style={{ display: 'grid', gap: '12px', marginBottom: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {[
          ['Scanner', 'Identifies risky patterns in skill code and attached artifacts.'],
          ['Policy engine', 'Applies environment-specific guardrails.'],
          ['Reporting', 'Produces readable output for developers and reviewers.'],
          ['Verification', 'Supports signed reports for audit workflows.'],
        ].map(([title, desc]) => (
          <div key={title} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
            <p style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>{title}</p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>

      <h2>Capability by tier</h2>
      <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px' }}>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
          <li>Free: local scans and basic findings.</li>
          <li>Pro: expanded findings and policy controls.</li>
          <li>Team/Enterprise: CI integrations and governance workflows.</li>
        </ul>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Final packaging and availability can change before public launch.
      </p>
    </div>
  );
}
